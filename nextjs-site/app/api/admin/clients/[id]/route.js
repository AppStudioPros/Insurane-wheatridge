import { supabase } from '@/lib/supabase'

export const dynamic = "force-dynamic"

function authorized(request) {
  const auth = request.headers.get('Authorization') ?? ''
  return auth.replace('Bearer ', '') === process.env.ADMIN_PASSWORD
}

export async function GET(request, { params }) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const { data, error } = await supabase.from('clients').select('*').eq('id', id).single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PATCH(request, { params }) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await request.json()
  const updates = {}
  if (body.first_name) updates.first_name = body.first_name
  if (body.last_name) updates.last_name = body.last_name
  if (body.email) updates.email = body.email.toLowerCase().trim()
  if (body.phone !== undefined) updates.phone = body.phone
  if (body.address !== undefined) updates.address = body.address
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase.from('clients').update(updates).eq('id', id).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(request, { params }) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
