import { getSupabase } from '@/lib/supabase'

export const dynamic = "force-dynamic"

function authorized(request) {
  const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
  return auth === process.env.ADMIN_PASSWORD
}

export async function POST(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  
  const form = await request.formData()
  const file = form.get('file')
  if (!file) return Response.json({ error: 'No file' }, { status: 400 })
  
  const sb = getSupabase()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const fileName = `blog/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  
  const buf = Buffer.from(await file.arrayBuffer())
  
  const { error } = await sb.storage.from('blog-images').upload(fileName, buf, {
    contentType: file.type,
    upsert: false,
  })
  
  if (error) {
    // Try creating the bucket if it doesn't exist
    if (error.message?.includes('not found') || error.statusCode === 404) {
      await sb.storage.createBucket('blog-images', { public: true })
      const { error: retryErr } = await sb.storage.from('blog-images').upload(fileName, buf, {
        contentType: file.type,
        upsert: false,
      })
      if (retryErr) return Response.json({ error: retryErr.message }, { status: 500 })
    } else {
      return Response.json({ error: error.message }, { status: 500 })
    }
  }
  
  const { data: urlData } = sb.storage.from('blog-images').getPublicUrl(fileName)
  
  return Response.json({ url: urlData.publicUrl })
}
