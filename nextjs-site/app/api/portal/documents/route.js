import { supabase } from '@/lib/supabase'
import { getClientId } from '@/lib/portal-auth'

export const dynamic = "force-dynamic"

export async function GET(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [])
}

export async function POST(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const category = formData.get('category') || 'other'
    const notes = formData.get('notes') || ''

    if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const fileType = file.type.includes('pdf') ? 'pdf' : 'image'

    // Store as base64 data URL in file_url
    const dataUrl = `data:${file.type};base64,${base64}`

    const { data, error } = await supabase
      .from('documents')
      .insert({
        client_id: clientId,
        file_name: file.name,
        file_url: dataUrl,
        file_type: fileType,
        category,
        uploaded_by: 'client',
        notes,
      })
      .select()
      .single()

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json(data)
  } catch (err) {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
