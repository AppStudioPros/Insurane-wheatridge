import { getSupabase } from '@/lib/supabase'

export const dynamic = "force-dynamic"

export async function POST(request) {
  const auth = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (auth !== process.env.ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const sb = getSupabase()
  
  // Try to query the table first
  const { error: checkErr } = await sb.from('blog_posts').select('id').limit(1)
  
  if (checkErr && checkErr.code === '42P01') {
    // Table doesn't exist — create via raw SQL using pg_net or direct query
    // Since supabase-js doesn't support raw DDL, we'll create via REST
    const sql = `
      CREATE TABLE IF NOT EXISTS public.blog_posts (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title text NOT NULL,
        slug text UNIQUE NOT NULL,
        excerpt text,
        content text DEFAULT '',
        featured_image text,
        category text DEFAULT 'general',
        tags text[] DEFAULT ARRAY[]::text[],
        status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
        author text DEFAULT 'Jubal Terry',
        meta_title text,
        meta_description text,
        template text DEFAULT 'standard',
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now(),
        published_at timestamptz
      );
      CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
    `
    
    // Use the Supabase Management API
    const projectRef = process.env.SUPABASE_URL?.match(/https:\/\/([^.]+)/)?.[1]
    
    return Response.json({ 
      needsManualSetup: true,
      sql: sql.trim(),
      message: 'Table does not exist. Run the SQL in Supabase Dashboard > SQL Editor.',
      projectRef,
    })
  }
  
  if (checkErr) {
    return Response.json({ error: checkErr.message, code: checkErr.code })
  }
  
  return Response.json({ success: true, message: 'blog_posts table already exists!' })
}
