import { supabase } from '@/lib/supabase'
import { createToken, comparePassword } from '@/lib/portal-auth'

export const dynamic = "force-dynamic"

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 })
    }

    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (error || !client) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const valid = await comparePassword(password, client.password_hash)
    if (!valid) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = createToken(client.id)
    return Response.json({
      token,
      client: {
        id: client.id,
        email: client.email,
        first_name: client.first_name,
        last_name: client.last_name,
      }
    })
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
