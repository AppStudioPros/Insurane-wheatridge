'use client'
import { useState, useEffect, useRef } from 'react'
import PortalLayout, { usePortalAuth } from '@/components/portal-layout'
import { Send } from 'lucide-react'

function formatTime(d) {
  return new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function formatDay(d) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function MessagesPage() {
  const { client, ready, logout, authFetch } = usePortalAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [body, setBody] = useState('')
  const [subject, setSubject] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  const hasMessages = messages.length > 0

  const fetchMessages = async () => {
    const t = sessionStorage.getItem('portal_token')
    if (!t) return
    const r = await fetch('/api/portal/messages', { headers: { Authorization: 'Bearer ' + t } })
    if (!r.ok) return
    const d = await r.json()
    if (d) {
      const sorted = [...d].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      setMessages(sorted)
    }
    setLoading(false)
  }

  useEffect(() => { 
    if (ready) { 
      setLoading(true)
      fetchMessages() 
    }
  }, [ready])

  // Re-fetch when page becomes visible (navigating back)
  useEffect(() => {
    const handleFocus = () => { if (ready) fetchMessages() }
    const handleVisible = () => { if (document.visibilityState === 'visible' && ready) fetchMessages() }
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisible)
    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisible)
    }
  }, [ready])

  useEffect(() => {
    if (!ready) return
    const id = setInterval(() => fetchMessages(), 5000)
    return () => clearInterval(id)
  }, [ready])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e) => {
    e?.preventDefault?.()
    if (!body.trim()) return
    setSending(true)
    const payload = { body }
    if (!hasMessages && subject.trim()) payload.subject = subject
    const t = sessionStorage.getItem('portal_token')
    const res = await fetch('/api/portal/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t },
      body: JSON.stringify(payload),
    })
    if (res?.ok) {
      setBody('')
      setSubject('')
      setTimeout(() => fetchMessages(), 300)
    }
    setSending(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!ready) return null

  const grouped = []
  let lastDay = ''
  messages.forEach(msg => {
    const day = formatDay(msg.created_at)
    if (day !== lastDay) {
      grouped.push({ type: 'day', day })
      lastDay = day
    }
    grouped.push({ type: 'msg', ...msg })
  })

  return (
    <PortalLayout client={client} logout={logout}>
      <div className="flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">Loading...</div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-1 mb-4">
              {!hasMessages && (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                  <p className="text-lg font-medium mb-1">No messages yet</p>
                  <p className="text-sm">Send your first message to start a conversation with your agent.</p>
                </div>
              )}
              {grouped.map((item, i) => {
                if (item.type === 'day') {
                  return (
                    <div key={`day-${i}`} className="flex justify-center my-3">
                      <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200">{item.day}</span>
                    </div>
                  )
                }
                const isAgent = item.sender === 'agent'
                return (
                  <div key={item.id} className={`flex ${isAgent ? 'justify-start' : 'justify-end'} mb-2`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      isAgent
                        ? 'bg-[#0954a5] text-white rounded-bl-md'
                        : 'bg-white border border-gray-200 text-gray-900 rounded-br-md'
                    }`}>
                      <div className={`flex items-center gap-2 mb-0.5 ${isAgent ? 'text-blue-100' : 'text-gray-400'}`}>
                        <span className="text-xs font-semibold">{isAgent ? 'Agent' : 'You'}</span>
                        <span className="text-xs">{formatTime(item.created_at)}</span>
                      </div>
                      {item.subject && (
                        <p className={`text-sm font-semibold mb-1 ${isAgent ? 'text-white' : 'text-gray-800'}`}>{item.subject}</p>
                      )}
                      <p className={`text-sm whitespace-pre-wrap ${isAgent ? 'text-white' : 'text-gray-700'}`}>{item.body}</p>
                    </div>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>

            {!hasMessages && (
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Subject (optional)"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0954a5] mb-2"
              />
            )}

            <form onSubmit={handleSend} className="flex gap-2">
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                rows={1}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0954a5] resize-none"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <button
                type="submit"
                disabled={!body.trim() || sending}
                className="bg-[#0954a5] text-white px-5 rounded-xl font-medium hover:bg-[#073d7a] transition disabled:opacity-60 flex items-center gap-2 text-sm"
              >
                <Send size={16} />
                {sending ? '...' : 'Send'}
              </button>
            </form>
          </>
        )}
      </div>
    </PortalLayout>
  )
}
