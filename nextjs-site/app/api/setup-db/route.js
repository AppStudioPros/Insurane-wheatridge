import { supabase } from '@/lib/supabase'

export const dynamic = "force-dynamic"

function authorized(request) {
  const auth = request.headers.get('Authorization') ?? ''
  return auth.replace('Bearer ', '') === process.env.ADMIN_PASSWORD
}

export async function GET(request) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const tables = ['clients', 'policies', 'id_cards', 'documents', 'messages']
  const results = {}

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('id').limit(1)
      results[table] = !error
    } catch {
      results[table] = false
    }
  }

  return Response.json(results)
}
