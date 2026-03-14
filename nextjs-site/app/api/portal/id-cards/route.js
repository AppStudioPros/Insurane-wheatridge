import { getClientId } from '@/lib/portal-auth'
import { supabaseGet } from '@/lib/supabase-rest'

export const dynamic = "force-dynamic"

export async function GET(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseGet('id_cards', {
    client_id: `eq.${clientId}`,
    order: 'created_at.desc',
    select: '*,policy:policy_id(carrier)',
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Flatten the carrier from the joined policy onto each card
  const cards = (data ?? []).map(card => ({
    ...card,
    carrier: card.policy?.carrier || 'Farmers Insurance',
    policy: undefined,
  }))

  return Response.json(cards, { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' } })
}
