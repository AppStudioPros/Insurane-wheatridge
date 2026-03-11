import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { buildInviteEmail } from '@/lib/invite-email'
import crypto from 'crypto'

export const dynamic = "force-dynamic"

function authorized(request) {
  const auth = request.headers.get('Authorization') ?? ''
  return auth.replace('Bearer ', '') === process.env.ADMIN_PASSWORD
}

export async function GET(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: clients, error } = await supabase
    .from('clients')
    .select('id, email, first_name, last_name, phone, address, status, invite_sent_at, created_at')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  const { data: policies } = await supabase.from('policies').select('client_id')
  const counts = {}
  ;(policies ?? []).forEach(p => { counts[p.client_id] = (counts[p.client_id] || 0) + 1 })

  const result = (clients ?? []).map(c => ({ ...c, policy_count: counts[c.id] || 0 }))
  return Response.json(result)
}

export async function POST(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  if (!body.email || !body.first_name || !body.last_name) {
    return Response.json({ error: 'Email, first name, and last name required' }, { status: 400 })
  }

  const invite_token = crypto.randomUUID()

  const { data, error } = await supabase
    .from('clients')
    .insert({
      email: body.email.toLowerCase().trim(),
      first_name: body.first_name.trim(),
      last_name: body.last_name.trim(),
      status: 'pending',
      invite_token,
      invite_sent_at: new Date().toISOString(),
    })
    .select('id, email, first_name, last_name, status, created_at')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Send invite email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const email = buildInviteEmail(body.first_name.trim(), invite_token)
    await resend.emails.send({
      from: email.from,
      to: [body.email.toLowerCase().trim()],
      subject: email.subject,
      html: email.html,
    })
  } catch (emailErr) {
    console.error('Failed to send invite email:', emailErr)
    // Client is created but email failed — admin can resend
  }

  return Response.json({ ...data, invite_sent: true })
}

export async function PATCH(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  if (!body.id) return Response.json({ error: 'Client ID required' }, { status: 400 })

  const updates = {}
  if (body.first_name) updates.first_name = body.first_name
  if (body.last_name) updates.last_name = body.last_name
  if (body.email) updates.email = body.email.toLowerCase().trim()
  if (body.phone !== undefined) updates.phone = body.phone
  if (body.address !== undefined) updates.address = body.address
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', body.id)
    .select('id, email, first_name, last_name, phone, address, status')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return Response.json({ error: 'Client ID required' }, { status: 400 })

  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
