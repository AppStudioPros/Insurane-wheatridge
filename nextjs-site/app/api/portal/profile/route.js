import { supabase } from '@/lib/supabase'
import { getClientId, hashPassword, comparePassword } from '@/lib/portal-auth'

export const dynamic = "force-dynamic"

export async function GET(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('clients')
    .select('id, email, first_name, last_name, phone, address, created_at')
    .eq('id', clientId)
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PATCH(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const updates = {}

  if (body.first_name) updates.first_name = body.first_name
  if (body.last_name) updates.last_name = body.last_name
  if (body.phone !== undefined) updates.phone = body.phone
  if (body.address !== undefined) updates.address = body.address
  if (body.email) updates.email = body.email.toLowerCase().trim()

  if (body.new_password) {
    if (!body.current_password) {
      return Response.json({ error: 'Current password required' }, { status: 400 })
    }
    const { data: client } = await supabase
      .from('clients')
      .select('password_hash')
      .eq('id', clientId)
      .single()
    
    const valid = await comparePassword(body.current_password, client.password_hash)
    if (!valid) return Response.json({ error: 'Current password is incorrect' }, { status: 400 })
    
    updates.password_hash = await hashPassword(body.new_password)
  }

  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', clientId)
    .select('id, email, first_name, last_name, phone, address')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
