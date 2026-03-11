import { supabase } from '@/lib/supabase'

export const dynamic = "force-dynamic"

function authorized(request) {
  const auth = request.headers.get('Authorization') ?? ''
  const token = auth.replace('Bearer ', '')
  return token === process.env.ADMIN_PASSWORD
}

export async function POST(request) {
  if (!authorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const queries = [
    `CREATE TABLE IF NOT EXISTS clients (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS policies (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      policy_number TEXT NOT NULL,
      policy_type TEXT NOT NULL,
      carrier TEXT DEFAULT 'Farmers Insurance',
      status TEXT DEFAULT 'active',
      start_date DATE,
      end_date DATE,
      premium_amount DECIMAL,
      coverage_summary TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS id_cards (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
      card_type TEXT NOT NULL,
      insured_name TEXT NOT NULL,
      policy_number TEXT NOT NULL,
      effective_date DATE,
      expiration_date DATE,
      vehicle_info TEXT,
      coverage_details JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS documents (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      policy_id UUID REFERENCES policies(id),
      file_name TEXT NOT NULL,
      file_url TEXT NOT NULL,
      file_type TEXT,
      category TEXT,
      uploaded_by TEXT DEFAULT 'client',
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS messages (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      sender TEXT NOT NULL,
      subject TEXT,
      body TEXT NOT NULL,
      read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`
  ]

  const results = []
  for (const sql of queries) {
    const { error } = await supabase.rpc('exec_sql', { query: sql }).catch(() => ({}))
    // fallback: try raw POST
    if (error) {
      const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ query: sql }),
      })
      results.push({ sql: sql.substring(0, 40), status: res.ok ? 'ok' : 'failed' })
    } else {
      results.push({ sql: sql.substring(0, 40), status: 'ok' })
    }
  }

  return Response.json({ 
    message: 'Database setup attempted. If exec_sql RPC is not available, run the SQL manually in Supabase dashboard.',
    results,
    manual_sql: queries.join(';\n\n') + ';'
  })
}
