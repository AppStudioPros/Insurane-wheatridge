'use client'
import { useState, useEffect, useCallback } from 'react'
import { LogOut, RefreshCw, Users, MessageSquare, Phone, Mail, Calendar } from 'lucide-react'

const SESSION_KEY = 'iwr_admin_token'

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const STATUS_COLORS = {
  new:       'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  closed:    'bg-green-100 text-green-700',
}

function StatusBadge({ status, table, id, token, onUpdate }) {
  const [loading, setLoading] = useState(false)
  const next = { new: 'contacted', contacted: 'closed', closed: 'new' }

  const cycle = async () => {
    setLoading(true)
    const newStatus = next[status]
    await fetch('/api/admin/data', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ table, id, status: newStatus }),
    })
    onUpdate()
    setLoading(false)
  }

  return (
    <button
      onClick={cycle}
      disabled={loading}
      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize cursor-pointer hover:opacity-80 transition ${STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-600'}`}
    >
      {loading ? '…' : status}
    </button>
  )
}

function InquiryRow({ item, token, onUpdate }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-gray-900 truncate">{item.name || '—'}</span>
            <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{item.source}</span>
            {item.insurance_type && (
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{item.insurance_type}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
            {item.email && <a href={`mailto:${item.email}`} className="flex items-center gap-1 hover:text-blue-600"><Mail size={12} />{item.email}</a>}
            {item.phone && <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:text-blue-600"><Phone size={12} />{item.phone}</a>}
            <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(item.created_at)}</span>
          </div>
          {item.message && (
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mt-1 italic">"{item.message}"</p>
          )}
        </div>
        <StatusBadge status={item.status} table="inquiries" id={item.id} token={token} onUpdate={onUpdate} />
      </div>
    </div>
  )
}

function LeadRow({ item, token, onUpdate }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 mb-1">{item.first_name || '—'}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
            {item.email && <a href={`mailto:${item.email}`} className="flex items-center gap-1 hover:text-blue-600"><Mail size={12} />{item.email}</a>}
            {item.phone && <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:text-blue-600"><Phone size={12} />{item.phone}</a>}
            <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(item.created_at)}</span>
          </div>
        </div>
        <StatusBadge status={item.status} table="leads" id={item.id} token={token} onUpdate={onUpdate} />
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [token,   setToken]   = useState(null)
  const [pw,      setPw]      = useState('')
  const [pwErr,   setPwErr]   = useState('')
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [tab,     setTab]     = useState('inquiries')

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved) setToken(saved)
  }, [])

  const fetchData = useCallback(async (t) => {
    setLoading(true)
    const res = await fetch('/api/admin/data', {
      headers: { Authorization: `Bearer ${t}` },
    })
    if (res.ok) {
      setData(await res.json())
      setLoading(false)
      return true
    } else {
      sessionStorage.removeItem(SESSION_KEY)
      setToken(null)
      setLoading(false)
      return false
    }
  }, [])

  useEffect(() => {
    if (token) fetchData(token)
  }, [token, fetchData])

  const login = async (e) => {
    e.preventDefault()
    if (!pw.trim()) return
    setPwErr('')
    setLoading(true)
    const ok = await fetchData(pw)
    if (ok) {
      sessionStorage.setItem(SESSION_KEY, pw)
      setToken(pw)
    } else {
      setPwErr('Incorrect password. Please try again.')
      setLoading(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setToken(null)
    setData(null)
  }

  // Login screen
  if (!token || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 px-6 py-8 text-center">
              <h1 className="text-xl font-bold text-white">Insurance Wheat Ridge</h1>
              <p className="text-blue-200 text-sm mt-1">Admin Dashboard</p>
            </div>
            <form onSubmit={login} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin password"
                />
              </div>
              {pwErr && <p className="text-red-500 text-sm">{pwErr}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const inquiries = data.inquiries ?? []
  const leads     = data.leads     ?? []
  const newCount  = inquiries.filter(i => i.status === 'new').length + leads.filter(l => l.status === 'new').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Admin Dashboard</h1>
            <p className="text-blue-200 text-xs">Insurance Wheat Ridge</p>
          </div>
          <div className="flex items-center gap-3">
            {newCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {newCount} new
              </span>
            )}
            <button onClick={() => fetchData(token)} className="text-blue-200 hover:text-white transition">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={logout} className="text-blue-200 hover:text-white transition">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
              tab === 'inquiries' ? 'bg-blue-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            <MessageSquare size={15} />
            Inquiries
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === 'inquiries' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {inquiries.length}
            </span>
          </button>
          <button
            onClick={() => setTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
              tab === 'leads' ? 'bg-blue-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            <Users size={15} />
            Leads
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === 'leads' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {leads.length}
            </span>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading...</div>
        ) : tab === 'inquiries' ? (
          inquiries.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No inquiries yet.</div>
          ) : (
            <div className="space-y-3">
              {inquiries.map(item => (
                <InquiryRow key={item.id} item={item} token={token} onUpdate={() => fetchData(token)} />
              ))}
            </div>
          )
        ) : (
          leads.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No leads yet.</div>
          ) : (
            <div className="space-y-3">
              {leads.map(item => (
                <LeadRow key={item.id} item={item} token={token} onUpdate={() => fetchData(token)} />
              ))}
            </div>
          )
        )}

        <p className="text-center text-xs text-gray-300 mt-8">
          Tap a status badge to cycle: new → contacted → closed
        </p>
      </div>
    </div>
  )
}
