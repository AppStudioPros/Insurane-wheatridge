import { supabase } from '@/lib/supabase'

export const dynamic = "force-dynamic"

function authorized(request) {
  const auth = request.headers.get('Authorization') ?? ''
  const token = auth.replace('Bearer ', '')
  return token === process.env.ADMIN_PASSWORD
}

export async function GET(request) {
  if (!authorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [{ data: inquiries }, { data: leads }] = await Promise.all([
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
    supabase.from('leads').select('*').order('created_at', { ascending: false }),
  ])

  return Response.json({ inquiries: inquiries ?? [], leads: leads ?? [] })
}

export async function PATCH(request) {
  if (!authorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { table, id, status } = await request.json()
  if (!table || !id || !status) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { error } = await supabase.from(table).update({ status }).eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })

  return Response.json({ success: true })
}
