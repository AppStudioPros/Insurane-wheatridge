import { getClientId } from '@/lib/portal-auth'
import { supabaseGet } from '@/lib/supabase-rest'

export const dynamic = "force-dynamic"

export async function GET(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // Get policies
  const { data: policies, error } = await supabaseGet('policies', {
    client_id: `eq.${clientId}`,
    order: 'created_at.desc',
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Get documents linked to policies
  const policyIds = (policies ?? []).map(p => p.id).filter(Boolean)
  let docs = []
  if (policyIds.length > 0) {
    const { data: docData } = await supabaseGet('documents', {
      policy_id: `in.(${policyIds.join(',')})`,
      select: 'id,file_name,file_url,file_type,policy_id',
    })
    docs = docData ?? []
  }

  // Attach documents to their policies
  const result = (policies ?? []).map(p => ({
    ...p,
    documents: docs.filter(d => d.policy_id === p.id).map(d => ({
      id: d.id,
      name: d.file_name,
      url: d.file_url,
      type: d.file_type,
    })),
  }))

  return Response.json(result, { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' } })
}
