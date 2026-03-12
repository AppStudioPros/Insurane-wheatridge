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
  
  let query = supabase.from('messages').select('*').order('created_at', { ascending: true })
  if (clientId) query = query.eq('client_id', clientId)
  
  const { data, error } = await query
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [], { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' } })
}

export async function POST(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  
  if (!body.client_id || !body.body) {
    return Response.json({ error: 'client_id and body required' }, { status: 400 })
  }

  const { data, error } = await supabase.from('messages').insert({
    client_id: body.client_id,
    sender: 'agent',
    subject: body.subject || null,
    body: body.body,
  }).select().single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
