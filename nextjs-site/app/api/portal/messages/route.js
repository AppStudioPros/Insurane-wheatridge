import { getClientId } from '@/lib/portal-auth'
import { supabaseGet, supabaseInsert, supabaseUpdate } from '@/lib/supabase-rest'

export const dynamic = "force-dynamic"

export async function GET(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // Mark agent messages as read
  await supabaseUpdate('messages', { client_id: clientId, sender: 'agent', read: false }, { read: true })

  const { data, error } = await supabaseGet('messages', {
    client_id: `eq.${clientId}`,
    order: 'created_at.desc',
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [], { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' } })
}

export async function POST(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { subject, body } = await request.json()
  if (!body) return Response.json({ error: 'Message body required' }, { status: 400 })

  const { data, error } = await supabaseInsert('messages', {
    client_id: clientId,
    sender: 'client',
    subject: subject || null,
    body,
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
