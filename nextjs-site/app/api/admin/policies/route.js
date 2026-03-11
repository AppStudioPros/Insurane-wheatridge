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
  
  let query = supabase.from('policies').select('*').order('created_at', { ascending: false })
  if (clientId) query = query.eq('client_id', clientId)
  
  const { data, error } = await query
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [])
}

export async function POST(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  
  const { data, error } = await supabase.from('policies').insert({
    client_id: body.client_id,
    policy_number: body.policy_number,
    policy_type: body.policy_type,
    carrier: body.carrier || 'Farmers Insurance',
    status: body.status || 'active',
    start_date: body.start_date || null,
    end_date: body.end_date || null,
    premium_amount: body.premium_amount || null,
    coverage_summary: body.coverage_summary || null,
  }).select().single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PATCH(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  if (!body.id) return Response.json({ error: 'ID required' }, { status: 400 })
  
  const { id, ...updates } = body
  const { data, error } = await supabase.from('policies').update(updates).eq('id', id).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return Response.json({ error: 'ID required' }, { status: 400 })
  
  const { error } = await supabase.from('policies').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
