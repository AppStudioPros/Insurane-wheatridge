import { supabase } from '@/lib/supabase'
import { getClientId } from '@/lib/portal-auth'

export const dynamic = "force-dynamic"

export async function GET(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // Mark agent messages as read
  await supabase
    .from('messages')
    .update({ read: true })
    .eq('client_id', clientId)
    .eq('sender', 'agent')
    .eq('read', false)

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [])
}

export async function POST(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { subject, body } = await request.json()
  if (!body) return Response.json({ error: 'Message body required' }, { status: 400 })

  const { data, error } = await supabase
    .from('messages')
    .insert({
      client_id: clientId,
      sender: 'client',
      subject: subject || null,
      body,
    })
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
