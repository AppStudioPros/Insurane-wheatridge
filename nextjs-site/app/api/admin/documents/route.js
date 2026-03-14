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
  
  let query = supabase.from('documents').select('*').order('created_at', { ascending: false })
  if (clientId) query = query.eq('client_id', clientId)
  
  const { data, error } = await query
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [], { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' } })
}

export async function POST(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file')
  const clientId = formData.get('client_id')
  const category = formData.get('category') || 'other'
  const notes = formData.get('notes') || ''
  const policyId = formData.get('policy_id') || null

  if (!file || !clientId) return Response.json({ error: 'File and client_id required' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const base64 = Buffer.from(bytes).toString('base64')
  const dataUrl = `data:${file.type};base64,${base64}`

  const { data, error } = await supabase.from('documents').insert({
    client_id: clientId,
    file_name: file.name,
    file_url: dataUrl,
    file_type: file.type.includes('pdf') ? 'pdf' : 'image',
    category,
    uploaded_by: 'admin',
    notes,
    policy_id: policyId || null,
  }).select().single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PATCH(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const { id, ...updates } = body
  if (!id) return Response.json({ error: 'id required' }, { status: 400 })
  const { data, error } = await supabase.from('documents').update(updates).eq('id', id).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return Response.json({ error: 'id required' }, { status: 400 })
  const { error } = await supabase.from('documents').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
