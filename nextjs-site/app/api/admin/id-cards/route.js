import { supabase } from '@/lib/supabase'

export const dynamic = "force-dynamic"

function authorized(request) {
  const auth = request.headers.get('Authorization') ?? ''
  return auth.replace('Bearer ', '') === process.env.ADMIN_PASSWORD
}

export async function GET(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get('client_id')
  
  let query = supabase.from('id_cards').select('*').order('created_at', { ascending: false })
  if (clientId) query = query.eq('client_id', clientId)
  
  const { data, error } = await query
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [], { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' } })
}

export async function POST(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  
  const { data, error } = await supabase.from('id_cards').insert({
    client_id: body.client_id,
    policy_id: body.policy_id || null,
    card_type: body.card_type,
    insured_name: body.insured_name,
    policy_number: body.policy_number,
    effective_date: body.effective_date || null,
    expiration_date: body.expiration_date || null,
    vehicle_info: body.vehicle_info || null,
    coverage_details: body.coverage_details || null,
  }).select().single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PATCH(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  if (!body.id) return Response.json({ error: 'ID required' }, { status: 400 })
  
  const { id, ...updates } = body
  const { data, error } = await supabase.from('id_cards').update(updates).eq('id', id).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return Response.json({ error: 'ID required' }, { status: 400 })
  
  const { error } = await supabase.from('id_cards').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
