import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Jubal2026'

export const dynamic = 'force-dynamic'

async function sbFetch(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    cache: 'no-store',
  })
  return res.json()
}

export async function GET(request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (token !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // Get recent unread messages from clients (sender = client, not admin)
    const messages = await sbFetch('messages?sender_type=eq.client&read=eq.false&order=created_at.desc&limit=20')

    // For each message, get client info
    const clientIds = [...new Set((messages || []).map(m => m.client_id).filter(Boolean))]
    let clients = []
    if (clientIds.length > 0) {
      clients = await sbFetch(`clients?id=in.(${clientIds.join(',')})&select=id,first_name,last_name`)
    }
    const clientMap = Object.fromEntries((clients || []).map(c => [c.id, c]))

    const unreadMessages = (messages || []).map(m => {
      const c = clientMap[m.client_id] || {}
      return {
        id: m.id,
        client_id: m.client_id,
        client_name: [c.first_name, c.last_name].filter(Boolean).join(' ') || 'Unknown Client',
        client: { id: c.id, first_name: c.first_name, last_name: c.last_name, email: c.email, status: c.status },
        content: m.content?.substring(0, 80),
        created_at: m.created_at,
      }
    })

    return NextResponse.json({ unreadMessages }, {
      headers: { 'Cache-Control': 'no-store, no-cache' }
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (token !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { messageId } = await request.json()
  if (!messageId) return NextResponse.json({ error: 'Missing messageId' }, { status: 400 })

  const res = await fetch(`${SUPABASE_URL}/rest/v1/messages?id=eq.${messageId}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ read: true }),
  })

  return NextResponse.json({ success: true })
}
