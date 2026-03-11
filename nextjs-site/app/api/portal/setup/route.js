import { supabase } from '@/lib/supabase'
import { hashPassword, createToken } from '@/lib/portal-auth'

export const dynamic = "force-dynamic"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) return Response.json({ error: 'Token required' }, { status: 400 })

  const { data: client, error } = await supabase
    .from('clients')
    .select('id, first_name, status')
    .eq('invite_token', token)
    .single()

  if (error || !client) return Response.json({ error: 'Invalid or expired invite link' }, { status: 404 })
  if (client.status === 'active') return Response.json({ error: 'Account already set up. Please log in.' }, { status: 400 })

  return Response.json({ first_name: client.first_name })
}

export async function POST(request) {
  const body = await request.json()
  const { token, password, phone, address } = body

  if (!token || !password) return Response.json({ error: 'Token and password required' }, { status: 400 })
  if (password.length < 6) return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 })

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('invite_token', token)
    .single()

  if (error || !client) return Response.json({ error: 'Invalid or expired invite link' }, { status: 404 })
  if (client.status === 'active') return Response.json({ error: 'Account already set up' }, { status: 400 })

  const password_hash = await hashPassword(password)

  const updates = {
    password_hash,
    status: 'active',
    invite_token: null,
    updated_at: new Date().toISOString(),
  }
  if (phone) updates.phone = phone
  if (address) updates.address = address

  const { error: updateError } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', client.id)

  if (updateError) return Response.json({ error: updateError.message }, { status: 500 })

  const authToken = createToken(client.id)
  return Response.json({
    token: authToken,
    client: {
      id: client.id,
      email: client.email,
      first_name: client.first_name,
      last_name: client.last_name,
    }
  })
}
