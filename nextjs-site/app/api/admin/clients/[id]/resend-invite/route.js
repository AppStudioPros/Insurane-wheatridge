import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { buildInviteEmail } from '@/lib/invite-email'
import crypto from 'crypto'

export const dynamic = "force-dynamic"

function authorized(request) {
  const auth = request.headers.get('Authorization') ?? ''
  return auth.replace('Bearer ', '') === process.env.ADMIN_PASSWORD
}

export async function POST(request, { params }) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !client) return Response.json({ error: 'Client not found' }, { status: 404 })

  const invite_token = crypto.randomUUID()

  await supabase
    .from('clients')
    .update({ invite_token, invite_sent_at: new Date().toISOString(), status: 'pending' })
    .eq('id', id)

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const email = buildInviteEmail(client.first_name, invite_token)
    await resend.emails.send({
      from: email.from,
      to: [client.email],
      subject: email.subject,
      html: email.html,
    })
  } catch (emailErr) {
    console.error('Failed to resend invite:', emailErr)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return Response.json({ success: true })
}
