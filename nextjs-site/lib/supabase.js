import { createClient } from '@supabase/supabase-js'

// Lazy singleton — only instantiated on first use (runtime, not build time)
let _client = null

export function getSupabase() {
  if (!_client) {
    _client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  }
  return _client
}

// Convenience proxy so existing `supabase.from(...)` calls still work
export const supabase = new Proxy({}, {
  get(_, prop) {
    return (...args) => getSupabase()[prop](...args)
  }
})
