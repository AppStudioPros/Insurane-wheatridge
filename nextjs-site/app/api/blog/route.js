import { supabaseGet } from '@/lib/supabase-rest'

export const dynamic = "force-dynamic"

// GET - list published blog posts (public)
export async function GET(request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get('slug')
  
  if (slug) {
    // Single post by slug
    const { data, error } = await supabaseGet('blog_posts', {
      slug: `eq.${slug}`,
      status: 'eq.published',
      limit: '1',
    })
    if (error || !data?.length) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(data[0])
  }
  
  // List all published posts
  const { data, error } = await supabaseGet('blog_posts', {
    status: 'eq.published',
    order: 'published_at.desc',
    select: 'id,title,slug,excerpt,featured_image,category,tags,author,published_at',
  })
  
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [])
}
