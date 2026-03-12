// Direct REST client — bypasses supabase-js RLS issues
export async function supabaseGet(table, params = {}) {
  const url = new URL(`${process.env.SUPABASE_URL}/rest/v1/${table}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  
  const res = await fetch(url.toString(), {
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { data: null, error: err }
  }
  return { data: await res.json(), error: null }
}

export async function supabaseInsert(table, row) {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(row),
    cache: 'no-store',
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { data: null, error: err }
  }
  const data = await res.json()
  return { data: Array.isArray(data) ? data[0] : data, error: null }
}

export async function supabaseUpdate(table, match, updates) {
  const url = new URL(`${process.env.SUPABASE_URL}/rest/v1/${table}`)
  Object.entries(match).forEach(([k, v]) => url.searchParams.set(k, `eq.${v}`))
  
  const res = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(updates),
    cache: 'no-store',
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { data: null, error: err }
  }
  return { data: await res.json(), error: null }
}
