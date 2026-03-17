import { supabaseGet, supabaseInsert, supabaseUpdate } from '@/lib/supabase-rest'

export const dynamic = "force-dynamic"

function authorized(request) {
  const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
  return auth === process.env.ADMIN_PASSWORD
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80)
}

// GET - list all blog posts
export async function GET(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  
  const { data, error } = await supabaseGet('blog_posts', {
    order: 'created_at.desc',
    select: 'id,title,slug,excerpt,featured_image,category,tags,status,author,template,created_at,updated_at,published_at',
  })
  
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [])
}

// POST - create new blog post
export async function POST(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  
  const body = await request.json()
  const slug = body.slug || slugify(body.title || 'untitled')
  
  const row = {
    title: body.title || 'Untitled Post',
    slug,
    excerpt: body.excerpt || '',
    content: body.content || '',
    featured_image: body.featured_image || null,
    category: body.category || 'general',
    tags: body.tags || [],
    status: ['draft','published','scheduled'].includes(body.status) ? body.status : 'draft',
    author: body.author || 'Jubal Terry',
    meta_title: body.meta_title || '',
    meta_description: body.meta_description || '',
    template: body.template || 'standard',
    published_at: body.published_at || (body.status === 'published' ? new Date().toISOString() : null),
  }
  
  const { data, error } = await supabaseInsert('blog_posts', row)
  if (error) return Response.json({ error: error.message || error }, { status: 500 })
  return Response.json(data)
}

// PATCH - update blog post
export async function PATCH(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  
  const body = await request.json()
  if (!body.id) return Response.json({ error: 'Missing id' }, { status: 400 })
  
  const updates = { updated_at: new Date().toISOString() }
  const fields = ['title', 'slug', 'excerpt', 'content', 'featured_image', 'category', 'tags', 'status', 'author', 'meta_title', 'meta_description', 'template']
  fields.forEach(f => { if (body[f] !== undefined) updates[f] = body[f] })
  
  if (body.status === 'published' && !body.published_at) {
    updates.published_at = new Date().toISOString()
  }
  
  const { data, error } = await supabaseUpdate('blog_posts', { id: body.id }, updates)
  if (error) return Response.json({ error: error.message || error }, { status: 500 })
  return Response.json(Array.isArray(data) ? data[0] : data)
}

// DELETE - delete blog post
export async function DELETE(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  
  const { id } = await request.json()
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })
  
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/blog_posts?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  })
  
  if (!res.ok) return Response.json({ error: 'Failed to delete' }, { status: 500 })
  return Response.json({ success: true })
}
