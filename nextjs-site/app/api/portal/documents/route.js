import { getClientId } from '@/lib/portal-auth'
import { supabaseGet, supabaseInsert } from '@/lib/supabase-rest'

export const dynamic = "force-dynamic"

export async function GET(request) {
  const clientId = getClientId(request)
  if (!clientId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseGet('documents', {
    client_id: `eq.${clientId}`,
    order: 'created_at.desc',
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [], { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' } })
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
    const dataUrl = `data:${file.type};base64,${base64}`

    const { data, error } = await supabaseInsert('documents', {
      client_id: clientId,
      file_name: file.name,
      file_url: dataUrl,
      file_type: fileType,
      category,
      uploaded_by: 'client',
      notes,
    })

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json(data)
  } catch (err) {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
