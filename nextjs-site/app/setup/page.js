'use client'
import { useState } from 'react'

const SQL = `-- Insurance Wheat Ridge - Database Setup
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  password_hash TEXT,
  status TEXT DEFAULT 'pending',
  invite_token TEXT,
  invite_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS policies (
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
);

CREATE TABLE IF NOT EXISTS id_cards (
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
);

CREATE TABLE IF NOT EXISTS documents (
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
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE id_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON policies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON id_cards FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON documents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON messages FOR ALL USING (true) WITH CHECK (true);`

const TABLES = ['clients', 'policies', 'id_cards', 'documents', 'messages']

export default function SetupPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [checking, setChecking] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const login = (e) => { e.preventDefault(); setAuthed(true); setError('') }

  const copySQL = () => {
    navigator.clipboard.writeText(SQL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const checkTables = async () => {
    setChecking(true); setResults(null)
    try {
      const res = await fetch('/api/setup-db', { headers: { Authorization: 'Bearer ' + password } })
      const data = await res.json()
      if (res.ok) setResults(data); else setError(data.error || 'Check failed')
    } catch { setError('Failed to check tables') }
    setChecking(false)
  }

  if (!authed) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={login} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-gray-900 text-center">Database Setup</h1>
        <p className="text-sm text-gray-500 text-center">Enter admin password to continue</p>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900" placeholder="Admin password" />
        <button type="submit" className="w-full bg-[#0954a5] text-white py-3 rounded-lg font-semibold">Continue</button>
      </form>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#0954a5] to-[#073d7a] px-6 py-6 text-white">
            <h1 className="text-xl font-bold">Database Setup</h1>
            <p className="text-blue-200 text-sm mt-1">Insurance Wheat Ridge - Supabase Tables</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="font-semibold text-blue-900 mb-2">Instructions</h2>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Copy the SQL below</li>
                <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline font-medium">Supabase Dashboard</a></li>
                <li>Open your project → SQL Editor</li>
                <li>Paste the SQL and click &ldquo;Run&rdquo;</li>
                <li>Come back here and click &ldquo;Check Tables&rdquo; to verify</li>
              </ol>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">SQL Script</h3>
                <button onClick={copySQL} className={`px-4 py-2 rounded-lg font-medium text-sm transition ${copied ? 'bg-green-500 text-white' : 'bg-[#0954a5] text-white hover:bg-[#073d7a]'}`}>
                  {copied ? '✓ Copied!' : 'Copy SQL'}
                </button>
              </div>
              <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-xs max-h-96 overflow-y-auto">{SQL}</pre>
            </div>
            <div>
              <button onClick={checkTables} disabled={checking} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60">
                {checking ? 'Checking...' : 'Check Tables'}
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {results && (
                <div className="mt-4 space-y-2">
                  {TABLES.map(t => (
                    <div key={t} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${results[t] ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      <span className="text-lg">{results[t] ? '✓' : '✗'}</span>
                      <span className="font-medium">{t}</span>
                      <span className="text-sm">{results[t] ? '— exists' : '— not found'}</span>
                    </div>
                  ))}
                  {Object.values(results).every(v => v) && <p className="text-green-700 font-semibold mt-2">🎉 All tables are set up!</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
