'use client'
import { useState, useEffect } from 'react'
import PortalLayout, { usePortalAuth } from '@/components/portal-layout'
import { Send, Plus, X } from 'lucide-react'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function MessagesPage() {
  const { client, ready, logout, authFetch } = usePortalAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)

  const fetchMessages = () => {
    authFetch('/api/portal/messages').then(r => r?.json()).then(d => {
      setMessages(d ?? [])
      setLoading(false)
    })
  }

  useEffect(() => { if (ready) fetchMessages() }, [ready])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!body.trim()) return
    setSending(true)
    const res = await authFetch('/api/portal/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, body }),
    })
    if (res?.ok) {
      setShowNew(false)
      setSubject('')
      setBody('')
      fetchMessages()
    }
    setSending(false)
  }

  if (!ready) return null

  return (
    <PortalLayout client={client} logout={logout}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        <button
          onClick={() => setShowNew(!showNew)}
          className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition flex items-center gap-2"
        >
          <Plus size={16} /> New Message
        </button>
      </div>

      {showNew && (
        <form onSubmit={handleSend} className="bg-white rounded-xl border border-gray-100 p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">New Message</h3>
            <button type="button" onClick={() => setShowNew(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Subject (optional)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0954a5]"
          />
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Type your message..."
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0954a5] resize-none"
          />
          <button
            type="submit"
            disabled={!body.trim() || sending}
            className="bg-[#0954a5] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition disabled:opacity-60 flex items-center gap-2"
          >
            <Send size={14} /> {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No messages yet. Start a conversation!</div>
      ) : (
        <div className="space-y-3">
          {messages.map(msg => {
            const isAgent = msg.sender === 'agent'
            return (
              <div key={msg.id} className={`rounded-xl p-4 ${isAgent ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-gray-100'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isAgent ? 'bg-[#0954a5] text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {isAgent ? 'Agent' : 'You'}
                    </span>
                    {msg.subject && <span className="text-sm font-medium text-gray-700">{msg.subject}</span>}
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(msg.created_at)}</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.body}</p>
              </div>
            )
          })}
        </div>
      )}
    </PortalLayout>
  )
}
