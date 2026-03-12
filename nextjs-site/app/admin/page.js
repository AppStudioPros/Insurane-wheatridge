'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { LogOut, RefreshCw, Users, MessageSquare, Phone, Mail, Calendar, Plus, Trash2, Edit, ChevronLeft, FileText, CreditCard, Upload, Send, X, Eye, Car, Home, Heart, Briefcase, Building, Download, Save, BarChart3, Globe, Monitor, Smartphone, MapPin, Bell } from 'lucide-react'

const SESSION_KEY = 'iwr_admin_token'

function formatDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
function formatShortDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-green-100 text-green-700',
}
const POLICY_STATUS_COLORS = { active: 'bg-green-100 text-green-700', expired: 'bg-gray-100 text-gray-600', cancelled: 'bg-red-100 text-red-700' }
const POLICY_TYPES = ['auto', 'homeowners', 'renters', 'life', 'business', 'umbrella', 'flood', 'health', 'condo']
const TYPE_ICONS = { auto: Car, home: Home, life: Heart, business: Briefcase, renters: Building, condo: Building }
const POLICY_TYPE_LABELS = { auto: 'Auto', homeowners: 'Homeowners', renters: 'Renters', life: 'Life', business: 'Business / Commercial', umbrella: 'Umbrella', flood: 'Flood', health: 'Health', condo: 'Condo / HOA' }
const DOC_CATEGORIES = ['id', 'proof_of_residence', 'claim_photo', 'signature', 'other']

// ================= ORIGINAL COMPONENTS =================

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto m-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
function StatusBadge({ status, table, id, token, onUpdate }) {
  const [loading, setLoading] = useState(false)
  const next = { new: 'contacted', contacted: 'closed', closed: 'new' }
  const cycle = async () => {
    setLoading(true)
    await fetch('/api/admin/data', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ table, id, status: next[status] }),
    })
    onUpdate()
    setLoading(false)
  }
  return (
    <button onClick={cycle} disabled={loading}
      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize cursor-pointer hover:opacity-80 transition ${STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {loading ? '...' : status}
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
            {item.insurance_type && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{item.insurance_type}</span>}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
            {item.email && <a href={`mailto:${item.email}`} className="flex items-center gap-1 hover:text-blue-600"><Mail size={12} />{item.email}</a>}
            {item.phone && <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:text-blue-600"><Phone size={12} />{item.phone}</a>}
            <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(item.created_at)}</span>
          </div>
          {item.message && <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mt-1 italic">&quot;{item.message}&quot;</p>}
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

// ================= CLIENT MANAGEMENT =================
function ClientList({ token, onSelectClient }) {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [resending, setResending] = useState(null)

  const fetchClients = async () => {
    const res = await fetch('/api/admin/clients', { headers: { Authorization: `Bearer ${token}` } })
    if (res.ok) setClients(await res.json())
    setLoading(false)
  }
  useEffect(() => { if (token) fetchClients() }, [token])

  const addClient = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    const res = await fetch('/api/admin/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (res.ok) {
      setMessage({ type: 'success', text: `Invite sent to ${form.email}!` })
      setForm({ first_name: '', last_name: '', email: '' })
      setShowAdd(false)
      fetchClients()
    } else {
      setMessage({ type: 'error', text: data.error || 'Failed to create client' })
    }
    setSaving(false)
  }

  const resendInvite = async (client) => {
    setResending(client.id)
    const res = await fetch(`/api/admin/clients/${client.id}/resend-invite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) setMessage({ type: 'success', text: `Invite resent to ${client.email}!` })
    else setMessage({ type: 'error', text: 'Failed to resend invite' })
    setResending(null)
    fetchClients()
  }

  const deleteClient = async (id) => {
    if (!confirm('Delete this client and all their data?')) return
    await fetch(`/api/admin/clients?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchClients()
  }

  const CLIENT_STATUS = { pending: 'bg-yellow-100 text-yellow-700', active: 'bg-green-100 text-green-700' }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Clients</h3>
        <button onClick={() => { setShowAdd(!showAdd); setMessage(null) }}
          className="bg-[#0954a5] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition flex items-center gap-1">
          <Plus size={14} /> Add Client
        </button>
      </div>

      {message && (
        <div className={`rounded-lg p-3 mb-4 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {showAdd && (
        <form onSubmit={addClient} className="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">
          <p className="text-sm text-gray-500">An invite email will be sent to the client to set up their account.</p>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="First Name *" required value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
            <input placeholder="Last Name *" required value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
          </div>
          <input placeholder="Email *" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
          <button type="submit" disabled={saving}
            className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60">
            {saving ? 'Sending Invite...' : 'Send Invite'}
          </button>
        </form>
      )}

      {loading ? <p className="text-gray-400 py-8 text-center">Loading...</p> : clients.length === 0 ? (
        <p className="text-gray-400 py-8 text-center">No clients yet.</p>
      ) : (
        <div className="space-y-2">
          {clients.map(c => (
            <div key={c.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center justify-between gap-3">
              <button onClick={() => onSelectClient(c)} className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{c.first_name} {c.last_name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${CLIENT_STATUS[c.status] || 'bg-gray-100 text-gray-600'}`}>{c.status || 'pending'}</span>
                </div>
                <div className="text-sm text-gray-500 flex flex-wrap gap-x-4">
                  <span>{c.email}</span>
                  <span>{formatShortDate(c.created_at)}</span>
                </div>
              </button>
              <div className="flex items-center gap-2">
                {(c.status === 'pending' || !c.status) && (
                  <button onClick={() => resendInvite(c)} disabled={resending === c.id}
                    className="text-[#0954a5] hover:text-[#073d7a] text-xs font-medium px-2 py-1 border border-blue-200 rounded-lg disabled:opacity-50">
                    {resending === c.id ? '...' : 'Resend'}
                  </button>
                )}
                <button onClick={() => deleteClient(c.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ClientDetail({ token, client, onBack }) {
  const [tab, setTab] = useState('policies')
  const [policies, setPolicies] = useState([])
  const [idCards, setIdCards] = useState([])
  const [docs, setDocs] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async (silent = false) => {
    if (!silent) setLoading(true)
    const headers = { Authorization: `Bearer ${token}` }
    const _t = Date.now()
    const opts = { headers, cache: 'no-store' }
    const [p, ic, d, m] = await Promise.all([
      fetch(`/api/admin/policies?client_id=${client.id}&_t=${_t}`, opts).then(r => r.json()),
      fetch(`/api/admin/id-cards?client_id=${client.id}&_t=${_t}`, opts).then(r => r.json()),
      fetch(`/api/admin/documents?client_id=${client.id}&_t=${_t}`, opts).then(r => r.json()),
      fetch(`/api/admin/messages?client_id=${client.id}&_t=${_t}`, opts).then(r => r.json()),
    ])
    setPolicies(p ?? [])
    setIdCards(ic ?? [])
    setDocs(d ?? [])
    setMessages(m ?? [])
    if (!silent) setLoading(false)
  }
  useEffect(() => { fetchAll() }, [client.id])
  useEffect(() => {
    const id = setInterval(() => { fetchAll(true) }, 5000)
    return () => clearInterval(id)
  }, [client.id])

  const tabs = [
    { key: 'policies', label: 'Policies', icon: FileText, count: policies.length },
    { key: 'id-cards', label: 'ID Cards', icon: CreditCard, count: idCards.length },
    { key: 'documents', label: 'Docs', icon: Upload, count: docs.length },
    { key: 'messages', label: 'Messages', icon: MessageSquare, count: messages.length },
  ]

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-[#0954a5] hover:underline mb-4">
        <ChevronLeft size={16} /> Back to Clients
      </button>
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h3 className="font-bold text-gray-900 text-lg">{client.first_name} {client.last_name}</h3>
        <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 mt-1">
          <span>{client.email}</span>
          {client.phone && <span>{client.phone}</span>}
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                tab === t.key ? 'bg-[#0954a5] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}>
              <Icon size={14} /> {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-blue-700 text-white' : 'bg-gray-100'}`}>{t.count}</span>
            </button>
          )
        })}
      </div>

      {loading ? <p className="text-gray-400 py-8 text-center">Loading...</p> : (
        <>
          {tab === 'policies' && <PoliciesTab token={token} clientId={client.id} policies={policies} onRefresh={fetchAll} />}
          {tab === 'id-cards' && <IDCardsTab token={token} clientId={client.id} idCards={idCards} policies={policies} onRefresh={fetchAll} />}
          {tab === 'documents' && <DocumentsTab token={token} clientId={client.id} docs={docs} onRefresh={fetchAll} />}
          {tab === 'messages' && <MessagesTab token={token} clientId={client.id} messages={messages} onRefresh={fetchAll} />}
        </>
      )}
    </div>
  )
}


function AnalyticsTab({ token }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState('30')
  const [error, setError] = useState(null)

  const fetchAnalytics = useCallback(async (r) => {
    try {
      const res = await fetch(`/api/admin/analytics?range=${r || range}&_t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` }, cache: 'no-store'
      })
      if (!res.ok) throw new Error('Failed to fetch analytics')
      const d = await res.json()
      if (d.error) throw new Error(d.error)
      setData(d)
      setError(null)
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }, [token, range])

  useEffect(() => { fetchAnalytics() }, [fetchAnalytics])

  const changeRange = (r) => { setRange(r); setLoading(true); fetchAnalytics(r) }

  const StatCard = ({ icon: Icon, label, value, sub }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">{Icon && <Icon size={14} />}{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  )

  const Bar = ({ value, max, color = 'bg-[#0954a5]' }) => (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${max > 0 ? (value / max) * 100 : 0}%` }} />
    </div>
  )

  if (loading) return <div className="text-center py-12 text-gray-400">Loading analytics...</div>
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>
  if (!data) return <div className="text-center py-12 text-gray-400">No data available</div>

  const { overview, topPages, devices, sources, dailyTrend, locations } = data
  const maxPageViews = Math.max(...topPages.map(p => p.views), 1)
  const maxSourceSessions = Math.max(...sources.map(s => s.sessions), 1)
  const maxLocationSessions = Math.max(...locations.map(l => l.sessions), 1)
  const totalDeviceSessions = devices.reduce((a, d) => a + d.sessions, 0) || 1
  const maxTrendSessions = Math.max(...dailyTrend.map(d => d.sessions), 1)

  const deviceColors = { desktop: 'bg-[#0954a5]', mobile: 'bg-green-500', tablet: 'bg-yellow-500' }
  const deviceIcons = { desktop: Monitor, mobile: Smartphone, tablet: Monitor }

  return (
    <div className="space-y-6">
      {/* Range selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><BarChart3 size={20} /> Website Analytics</h3>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {[['7','7 Days'],['30','30 Days'],['90','90 Days']].map(([v,l]) => (
            <button key={v} onClick={() => changeRange(v)} className={`px-3 py-1 text-xs rounded-md transition-all ${range===v ? 'bg-white shadow text-[#0954a5] font-medium' : 'text-gray-500 hover:text-gray-700'}`}>{l}</button>
          ))}
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon={Users} label="Visitors" value={overview.users} sub={`${overview.newUsers} new`} />
        <StatCard icon={BarChart3} label="Sessions" value={overview.sessions} />
        <StatCard icon={Eye} label="Page Views" value={overview.pageViews} />
        <StatCard label="Bounce Rate" value={`${overview.bounceRate}%`} sub={parseFloat(overview.bounceRate) > 70 ? 'Could improve' : 'Healthy'} />
        <StatCard label="Avg. Visit" value={`${overview.avgSessionDuration}s`} sub={parseInt(overview.avgSessionDuration) > 60 ? 'Good engagement' : 'Quick visits'} />
        <StatCard label="New vs Return" value={`${overview.users > 0 ? Math.round(overview.newUsers/overview.users*100) : 0}% new`} />
      </div>

      {/* Daily trend */}
      {dailyTrend.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Daily Traffic</h4>
          <div className="flex items-end gap-1 h-32">
            {dailyTrend.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="absolute -top-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">{d.date}: {d.sessions} visits</div>
                <div className="w-full bg-[#0954a5] rounded-t transition-all hover:bg-[#0b6ad4]" style={{ height: `${d.sessions > 0 ? Math.max(8, Math.round((d.sessions / maxTrendSessions) * 120)) : 2}px` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>{dailyTrend[0]?.date}</span>
            <span>{dailyTrend[dailyTrend.length-1]?.date}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top pages */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Top Pages</h4>
          <div className="space-y-3">
            {topPages.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700 truncate max-w-[70%]">{p.page}</span>
                  <span className="text-gray-500">{p.views} views</span>
                </div>
                <Bar value={p.views} max={maxPageViews} />
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"><Globe size={14} /> Where Visitors Come From</h4>
          <div className="space-y-3">
            {sources.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{s.source}</span>
                  <span className="text-gray-500">{s.sessions} visits</span>
                </div>
                <Bar value={s.sessions} max={maxSourceSessions} color="bg-green-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"><Monitor size={14} /> Devices</h4>
          <div className="space-y-3">
            {devices.map((d, i) => {
              const pct = ((d.sessions / totalDeviceSessions) * 100).toFixed(0)
              const DIcon = deviceIcons[d.device] || Monitor
              return (
                <div key={i} className="flex items-center gap-3">
                  <DIcon size={16} className="text-gray-400" />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700 capitalize">{d.device}</span>
                      <span className="text-gray-500">{pct}% ({d.sessions})</span>
                    </div>
                    <Bar value={d.sessions} max={totalDeviceSessions} color={deviceColors[d.device] || 'bg-gray-400'} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Locations */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"><MapPin size={14} /> Visitor Locations</h4>
          <div className="space-y-3">
            {locations.map((l, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{l.city}</span>
                  <span className="text-gray-500">{l.sessions} visits</span>
                </div>
                <Bar value={l.sessions} max={maxLocationSessions} color="bg-purple-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400">
        Last updated: {new Date(data.generated).toLocaleString()} · Data from Google Analytics
      </div>
    </div>
  )
}

const _pInputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"
const _pLabelCls = "block text-xs text-gray-500 mb-1"

function TypeFields({ f, setF }) {
  const t = f.policy_type
  const sectionCls = "text-xs font-semibold text-gray-600 border-b border-gray-200 pb-1"
  return (<>
    {/* Shared extra fields */}
    <div className="grid grid-cols-2 gap-3">
      <div><label className={_pLabelCls}>Deductible</label><input value={f.deductible || ''} onChange={e => setF({...f, deductible: e.target.value})} placeholder="e.g. $500" className={_pInputCls} /></div>
      <div><label className={_pLabelCls}>Agent / Broker</label><input value={f.agent_name || ''} onChange={e => setF({...f, agent_name: e.target.value})} placeholder="Agent name" className={_pInputCls} /></div>
    </div>

    {t === 'auto' && (<><p className={sectionCls}>🚗 Auto Details</p>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Vehicles Covered</label><input value={f.vehicles_covered || ''} onChange={e => setF({...f, vehicles_covered: e.target.value})} placeholder="e.g. 2023 Toyota Camry" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>VIN(s)</label><input value={f.vin || ''} onChange={e => setF({...f, vin: e.target.value})} placeholder="Vehicle ID Number" className={_pInputCls} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Drivers Listed</label><input value={f.drivers_listed || ''} onChange={e => setF({...f, drivers_listed: e.target.value})} placeholder="e.g. John, Jane Smith" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Liability (BI/PD)</label><input value={f.liability_bi_pd || ''} onChange={e => setF({...f, liability_bi_pd: e.target.value})} placeholder="e.g. 100/300/100" className={_pInputCls} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className={_pLabelCls}>Collision Deductible</label><input value={f.collision_deductible || ''} onChange={e => setF({...f, collision_deductible: e.target.value})} placeholder="$500" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Comp Deductible</label><input value={f.comp_deductible || ''} onChange={e => setF({...f, comp_deductible: e.target.value})} placeholder="$250" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Uninsured Motorist</label><input value={f.uninsured_motorist || ''} onChange={e => setF({...f, uninsured_motorist: e.target.value})} placeholder="100/300" className={_pInputCls} /></div>
      </div>
    </>)}

    {t === 'homeowners' && (<><p className={sectionCls}>🏠 Homeowners Details</p>
      <div><label className={_pLabelCls}>Property Address</label><input value={f.property_address || ''} onChange={e => setF({...f, property_address: e.target.value})} className={_pInputCls} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Dwelling Coverage</label><input value={f.dwelling_coverage || ''} onChange={e => setF({...f, dwelling_coverage: e.target.value})} placeholder="$350,000" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Personal Property</label><input value={f.personal_property || ''} onChange={e => setF({...f, personal_property: e.target.value})} placeholder="$175,000" className={_pInputCls} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Liability Limit</label><input value={f.liability_limit || ''} onChange={e => setF({...f, liability_limit: e.target.value})} placeholder="$300,000" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Loss of Use</label><input value={f.loss_of_use || ''} onChange={e => setF({...f, loss_of_use: e.target.value})} placeholder="$70,000" className={_pInputCls} /></div>
      </div>
      <div><label className={_pLabelCls}>Special Endorsements</label><input value={f.endorsements || ''} onChange={e => setF({...f, endorsements: e.target.value})} placeholder="e.g. Earthquake, Sewer backup" className={_pInputCls} /></div>
    </>)}

    {t === 'renters' && (<><p className={sectionCls}>🏢 Renters Details</p>
      <div><label className={_pLabelCls}>Property Address</label><input value={f.property_address || ''} onChange={e => setF({...f, property_address: e.target.value})} className={_pInputCls} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Personal Property Coverage</label><input value={f.personal_property || ''} onChange={e => setF({...f, personal_property: e.target.value})} placeholder="$30,000" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Liability Limit</label><input value={f.liability_limit || ''} onChange={e => setF({...f, liability_limit: e.target.value})} placeholder="$100,000" className={_pInputCls} /></div>
      </div>
    </>)}

    {t === 'life' && (<><p className={sectionCls}>❤️ Life Insurance Details</p>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Insured Person</label><input value={f.insured_person || ''} onChange={e => setF({...f, insured_person: e.target.value})} className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Beneficiary</label><input value={f.beneficiary || ''} onChange={e => setF({...f, beneficiary: e.target.value})} className={_pInputCls} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className={_pLabelCls}>Death Benefit</label><input value={f.death_benefit || ''} onChange={e => setF({...f, death_benefit: e.target.value})} placeholder="$500,000" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Policy Type</label><select value={f.life_policy_type || ''} onChange={e => setF({...f, life_policy_type: e.target.value})} className={_pInputCls}><option value="">Select...</option><option value="term">Term</option><option value="whole">Whole Life</option><option value="universal">Universal</option></select></div>
        <div><label className={_pLabelCls}>Term Length</label><input value={f.term_length || ''} onChange={e => setF({...f, term_length: e.target.value})} placeholder="e.g. 20 years" className={_pInputCls} /></div>
      </div>
    </>)}

    {t === 'business' && (<><p className={sectionCls}>💼 Business / Commercial Details</p>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Business Name</label><input value={f.business_name || ''} onChange={e => setF({...f, business_name: e.target.value})} className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Business Type</label><input value={f.business_type || ''} onChange={e => setF({...f, business_type: e.target.value})} placeholder="e.g. LLC, Restaurant" className={_pInputCls} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>General Liability Limit</label><input value={f.gl_limit || ''} onChange={e => setF({...f, gl_limit: e.target.value})} placeholder="$1,000,000" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Property Coverage</label><input value={f.property_coverage || ''} onChange={e => setF({...f, property_coverage: e.target.value})} placeholder="$500,000" className={_pInputCls} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Workers Comp</label><select value={f.workers_comp || ''} onChange={e => setF({...f, workers_comp: e.target.value})} className={_pInputCls}><option value="">N/A</option><option value="yes">Yes</option><option value="no">No</option></select></div>
        <div><label className={_pLabelCls}>Professional Liability</label><input value={f.professional_liability || ''} onChange={e => setF({...f, professional_liability: e.target.value})} placeholder="$1,000,000" className={_pInputCls} /></div>
      </div>
    </>)}

    {t === 'umbrella' && (<><p className={sectionCls}>☂️ Umbrella Details</p>
      <div><label className={_pLabelCls}>Underlying Policies Covered</label><input value={f.underlying_policies || ''} onChange={e => setF({...f, underlying_policies: e.target.value})} placeholder="e.g. Auto + Homeowners" className={_pInputCls} /></div>
      <div><label className={_pLabelCls}>Umbrella Limit</label><input value={f.umbrella_limit || ''} onChange={e => setF({...f, umbrella_limit: e.target.value})} placeholder="$1,000,000" className={_pInputCls} /></div>
    </>)}

    {t === 'flood' && (<><p className={sectionCls}>🌊 Flood Insurance Details</p>
      <div><label className={_pLabelCls}>Property Address</label><input value={f.property_address || ''} onChange={e => setF({...f, property_address: e.target.value})} className={_pInputCls} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Building Coverage</label><input value={f.building_coverage || ''} onChange={e => setF({...f, building_coverage: e.target.value})} placeholder="$250,000" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Contents Coverage</label><input value={f.contents_coverage || ''} onChange={e => setF({...f, contents_coverage: e.target.value})} placeholder="$100,000" className={_pInputCls} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>NFIP Policy Number</label><input value={f.nfip_number || ''} onChange={e => setF({...f, nfip_number: e.target.value})} className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Flood Zone</label><input value={f.flood_zone || ''} onChange={e => setF({...f, flood_zone: e.target.value})} placeholder="e.g. Zone AE" className={_pInputCls} /></div>
      </div>
    </>)}

    {t === 'health' && (<><p className={sectionCls}>🏥 Health Insurance Details</p>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Plan Name</label><input value={f.plan_name || ''} onChange={e => setF({...f, plan_name: e.target.value})} placeholder="e.g. Blue Cross PPO" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Network Type</label><select value={f.network_type || ''} onChange={e => setF({...f, network_type: e.target.value})} className={_pInputCls}><option value="">Select...</option><option value="HMO">HMO</option><option value="PPO">PPO</option><option value="EPO">EPO</option><option value="POS">POS</option></select></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Member ID</label><input value={f.member_id || ''} onChange={e => setF({...f, member_id: e.target.value})} className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Group Number</label><input value={f.group_number || ''} onChange={e => setF({...f, group_number: e.target.value})} className={_pInputCls} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className={_pLabelCls}>Deductible</label><input value={f.health_deductible || ''} onChange={e => setF({...f, health_deductible: e.target.value})} placeholder="$1,500" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Out-of-Pocket Max</label><input value={f.oop_max || ''} onChange={e => setF({...f, oop_max: e.target.value})} placeholder="$6,000" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Copay Amounts</label><input value={f.copay_amounts || ''} onChange={e => setF({...f, copay_amounts: e.target.value})} placeholder="$25/$50" className={_pInputCls} /></div>
      </div>
    </>)}

    {t === 'condo' && (<><p className={sectionCls}>🏘️ Condo / HOA Details</p>
      <div><label className={_pLabelCls}>Property Address</label><input value={f.property_address || ''} onChange={e => setF({...f, property_address: e.target.value})} className={_pInputCls} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Interior/Dwelling Coverage</label><input value={f.interior_coverage || ''} onChange={e => setF({...f, interior_coverage: e.target.value})} placeholder="$100,000" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>Personal Property</label><input value={f.personal_property || ''} onChange={e => setF({...f, personal_property: e.target.value})} placeholder="$50,000" className={_pInputCls} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={_pLabelCls}>Liability Limit</label><input value={f.liability_limit || ''} onChange={e => setF({...f, liability_limit: e.target.value})} placeholder="$300,000" className={_pInputCls} /></div>
        <div><label className={_pLabelCls}>HO6 Endorsements</label><input value={f.ho6_endorsements || ''} onChange={e => setF({...f, ho6_endorsements: e.target.value})} placeholder="e.g. Loss assessment" className={_pInputCls} /></div>
      </div>
    </>)}
  </>)
}


function PoliciesTab({ token, clientId, policies, onRefresh }) {
  const defaultForm = { policy_number: '', policy_type: 'auto', status: 'active', carrier: 'Farmers Insurance', start_date: '', end_date: '', premium_amount: '', coverage_summary: '',
    deductible: '', agent_name: '',
    vehicles_covered: '', vin: '', drivers_listed: '', liability_bi_pd: '', collision_deductible: '', comp_deductible: '', uninsured_motorist: '',
    property_address: '', dwelling_coverage: '', personal_property: '', liability_limit: '', loss_of_use: '', endorsements: '',
    insured_person: '', beneficiary: '', death_benefit: '', life_policy_type: '', term_length: '',
    business_name: '', business_type: '', gl_limit: '', property_coverage: '', workers_comp: '', professional_liability: '',
    underlying_policies: '', umbrella_limit: '',
    building_coverage: '', contents_coverage: '', nfip_number: '', flood_zone: '',
    plan_name: '', member_id: '', group_number: '', network_type: '', health_deductible: '', oop_max: '', copay_amounts: '',
    interior_coverage: '', ho6_endorsements: ''
  }
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({...defaultForm})
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState(null)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [showCarrierMgmt, setShowCarrierMgmt] = useState(false)
  const [newCarrier, setNewCarrier] = useState('')
  const defaultCarriers = ['Farmers Insurance', 'Insurance Wheat Ridge']
  const [customCarriers, setCustomCarriers] = useState(() => {
    if (typeof window !== 'undefined') { try { return JSON.parse(localStorage.getItem('iw_custom_carriers') || '[]') } catch { return [] } }
    return []
  })
  const carrierOptions = [...defaultCarriers, ...customCarriers]
  const addCarrier = () => { if (!newCarrier.trim() || carrierOptions.includes(newCarrier.trim())) return; const u = [...customCarriers, newCarrier.trim()]; setCustomCarriers(u); localStorage.setItem('iw_custom_carriers', JSON.stringify(u)); setNewCarrier('') }
  const removeCarrier = (c) => { const u = customCarriers.filter(x => x !== c); setCustomCarriers(u); localStorage.setItem('iw_custom_carriers', JSON.stringify(u)) }

  const typeSpecificKeys = {
    auto: ['vehicles_covered','vin','drivers_listed','liability_bi_pd','collision_deductible','comp_deductible','uninsured_motorist'],
    homeowners: ['property_address','dwelling_coverage','personal_property','liability_limit','loss_of_use','endorsements'],
    renters: ['property_address','personal_property','liability_limit'],
    life: ['insured_person','beneficiary','death_benefit','life_policy_type','term_length'],
    business: ['business_name','business_type','gl_limit','property_coverage','workers_comp','professional_liability'],
    umbrella: ['underlying_policies','umbrella_limit'],
    flood: ['property_address','building_coverage','contents_coverage','nfip_number','flood_zone'],
    health: ['plan_name','member_id','group_number','network_type','health_deductible','oop_max','copay_amounts'],
    condo: ['property_address','interior_coverage','personal_property','liability_limit','ho6_endorsements'],
  }

  const buildPayload = (f) => {
    const keys = typeSpecificKeys[f.policy_type] || []
    const details = {}
    keys.forEach(k => { if (f[k]) details[k] = f[k] })
    return {
      policy_number: f.policy_number, policy_type: f.policy_type, status: f.status, carrier: f.carrier,
      start_date: f.start_date || null, end_date: f.end_date || null,
      premium_amount: f.premium_amount ? Number(f.premium_amount) : null,
      coverage_summary: JSON.stringify({ text: f.coverage_summary || '', deductible: f.deductible || '', agent_name: f.agent_name || '', ...details }),
    }
  }

  const parseDetails = (p) => {
    let d = {}
    try { d = JSON.parse(p.coverage_summary || '{}'); if (typeof d === 'string') d = {} } catch { d = {} }
    return { ...p, coverage_summary_text: d.text || p.coverage_summary || '', deductible: d.deductible || '', agent_name: d.agent_name || '', ...d }
  }

  const save = async (e) => {
    e.preventDefault(); setSaving(true)
    await fetch('/api/admin/policies', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...buildPayload(form), client_id: clientId }) })
    setShowForm(false); setForm({...defaultForm}); setSaving(false); onRefresh()
  }

  const updatePolicy = async () => {
    setSaving(true)
    await fetch('/api/admin/policies', { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id: selected.id, ...buildPayload(editForm) }) })
    setSaving(false); setEditing(false); setSelected(null); onRefresh()
  }

  const del = async (id) => { if (!confirm('Delete this policy?')) return; await fetch(`/api/admin/policies?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }); setSelected(null); onRefresh() }

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"
  const labelCls = "block text-xs text-gray-500 mb-1"

  // TypeFields defined at module level

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="bg-[#0954a5] text-white px-3 py-1.5 rounded-lg text-sm font-medium mb-3 flex items-center gap-1">
        <Plus size={14} /> Add Policy
      </button>
      {showForm && (
        <form onSubmit={save} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Policy Number *</label><input required value={form.policy_number} onChange={e => setForm({...form, policy_number: e.target.value})} className={inputCls} /></div>
            <div><label className={labelCls}>Policy Type</label><select value={form.policy_type} onChange={e => setForm({...form, policy_type: e.target.value})} className={inputCls}>
              {POLICY_TYPES.map(t => <option key={t} value={t}>{POLICY_TYPE_LABELS[t] || t}</option>)}
            </select></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Status</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={inputCls}>
              <option value="active">Active</option><option value="expired">Expired</option><option value="cancelled">Cancelled</option>
            </select></div>
            <div><label className={labelCls}>Carrier</label>
              <select value={carrierOptions.includes(form.carrier) ? form.carrier : 'Other'} onChange={e => { const v = e.target.value; setForm({...form, carrier: v === 'Other' ? '' : v}) }} className={inputCls}>
                {carrierOptions.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="Other">Other</option>
              </select>
              {!carrierOptions.includes(form.carrier) && <input placeholder="Enter carrier name" value={form.carrier} onChange={e => setForm({...form, carrier: e.target.value})} className={inputCls + " mt-2"} />}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className={labelCls}>Effective Date</label><input type="date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} className={inputCls} /></div>
            <div><label className={labelCls}>Expiration Date</label><input type="date" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} className={inputCls} /></div>
            <div><label className={labelCls}>Premium $</label><input type="number" value={form.premium_amount} onChange={e => setForm({...form, premium_amount: e.target.value})} className={inputCls} /></div>
          </div>
          <TypeFields f={form} setF={setForm} />
          <div><label className={labelCls}>Notes / Coverage Summary</label><textarea value={form.coverage_summary} onChange={e => setForm({...form, coverage_summary: e.target.value})} rows={2} className={inputCls} placeholder="Any additional notes..." /></div>
          <div className="flex items-center gap-3">
            <button type="submit" disabled={saving} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm disabled:opacity-60">{saving ? 'Saving...' : 'Save Policy'}</button>
            <button type="button" onClick={() => setShowCarrierMgmt(!showCarrierMgmt)} className="text-xs text-gray-400 hover:text-gray-600">⚙️ Manage Carriers</button>
          </div>
          {showCarrierMgmt && (
            <div className="bg-white rounded-lg border border-gray-200 p-3 mt-2 space-y-2">
              <p className="text-xs font-medium text-gray-600">Custom Carriers</p>
              <div className="flex gap-2">
                <input placeholder="New carrier name" value={newCarrier} onChange={e => setNewCarrier(e.target.value)} className={inputCls + " flex-1"} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCarrier())} />
                <button type="button" onClick={addCarrier} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-200">Add</button>
              </div>
              {customCarriers.length > 0 && <div className="flex flex-wrap gap-1">{customCarriers.map(c => (
                <span key={c} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{c} <button type="button" onClick={() => removeCarrier(c)} className="text-red-400 hover:text-red-600">×</button></span>
              ))}</div>}
            </div>
          )}
        </form>
      )}
      {policies.length === 0 ? <p className="text-gray-400 text-center py-6">No policies.</p> : (
        <div className="space-y-2">
          {policies.map(p => {
            const Icon = TYPE_ICONS[p.policy_type] || Briefcase
            return (
              <div key={p.id} onClick={() => { const pd = parseDetails(p); setSelected(pd); setEditForm({...defaultForm, ...pd, coverage_summary: pd.coverage_summary_text || ''}); setEditing(false) }} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition">
                <div className="w-8 h-8 rounded bg-blue-50 text-[#0954a5] flex items-center justify-center"><Icon size={16} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">{POLICY_TYPE_LABELS[p.policy_type] || p.policy_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${POLICY_STATUS_COLORS[p.status] || 'bg-gray-100'}`}>{p.status}</span>
                  </div>
                  <p className="text-xs text-gray-500">#{p.policy_number} | {p.carrier} | ${p.premium_amount || '—'}/yr</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={!!selected} onClose={() => { setSelected(null); setEditing(false) }} title={editing ? 'Edit Policy' : 'Policy Details'}>
        {selected && !editing && (() => {
          const d = selected
          const keys = typeSpecificKeys[d.policy_type] || []
          const fieldLabels = { vehicles_covered:'Vehicles',vin:'VIN',drivers_listed:'Drivers',liability_bi_pd:'Liability (BI/PD)',collision_deductible:'Collision Ded.',comp_deductible:'Comp Ded.',uninsured_motorist:'Uninsured Motorist',property_address:'Property Address',dwelling_coverage:'Dwelling',personal_property:'Personal Property',liability_limit:'Liability Limit',loss_of_use:'Loss of Use',endorsements:'Endorsements',insured_person:'Insured Person',beneficiary:'Beneficiary',death_benefit:'Death Benefit',life_policy_type:'Type',term_length:'Term',business_name:'Business',business_type:'Business Type',gl_limit:'GL Limit',property_coverage:'Property Coverage',workers_comp:'Workers Comp',professional_liability:'Prof. Liability',underlying_policies:'Underlying Policies',umbrella_limit:'Umbrella Limit',building_coverage:'Building',contents_coverage:'Contents',nfip_number:'NFIP #',flood_zone:'Flood Zone',plan_name:'Plan',member_id:'Member ID',group_number:'Group #',network_type:'Network',health_deductible:'Deductible',oop_max:'OOP Max',copay_amounts:'Copay',interior_coverage:'Interior Coverage',ho6_endorsements:'HO6 Endorsements' }
          return (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-xs text-gray-500">Policy Number</span><p className="font-medium">#{d.policy_number}</p></div>
                <div><span className="text-xs text-gray-500">Type</span><p className="font-medium">{POLICY_TYPE_LABELS[d.policy_type] || d.policy_type}</p></div>
                <div><span className="text-xs text-gray-500">Status</span><p><span className={`text-xs px-2 py-0.5 rounded-full capitalize ${POLICY_STATUS_COLORS[d.status] || 'bg-gray-100'}`}>{d.status}</span></p></div>
                <div><span className="text-xs text-gray-500">Carrier</span><p className="font-medium">{d.carrier || '—'}</p></div>
                <div><span className="text-xs text-gray-500">Effective Date</span><p className="font-medium">{formatDate(d.start_date)}</p></div>
                <div><span className="text-xs text-gray-500">Expiration Date</span><p className="font-medium">{formatDate(d.end_date)}</p></div>
                <div><span className="text-xs text-gray-500">Premium</span><p className="font-medium">${d.premium_amount || '—'}/yr</p></div>
                {d.deductible && <div><span className="text-xs text-gray-500">Deductible</span><p className="font-medium">{d.deductible}</p></div>}
                {d.agent_name && <div><span className="text-xs text-gray-500">Agent</span><p className="font-medium">{d.agent_name}</p></div>}
              </div>
              {keys.some(k => d[k]) && (
                <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-100 pt-3">
                  {keys.map(k => d[k] ? <div key={k}><span className="text-xs text-gray-500">{fieldLabels[k] || k}</span><p className="font-medium">{d[k]}</p></div> : null)}
                </div>
              )}
              {d.coverage_summary_text && <div className="border-t border-gray-100 pt-3"><span className="text-xs text-gray-500">Notes</span><p className="text-sm mt-1">{d.coverage_summary_text}</p></div>}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button onClick={() => setEditing(true)} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Edit size={14} /> Edit</button>
                <button onClick={() => del(d.id)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          )
        })()}
        {selected && editing && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Policy Number</label><input value={editForm.policy_number} onChange={e => setEditForm({...editForm, policy_number: e.target.value})} className={inputCls} /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Type</label><select value={editForm.policy_type} onChange={e => setEditForm({...editForm, policy_type: e.target.value})} className={inputCls}>{POLICY_TYPES.map(t => <option key={t} value={t}>{POLICY_TYPE_LABELS[t] || t}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Status</label><select value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})} className={inputCls}><option value="active">Active</option><option value="expired">Expired</option><option value="cancelled">Cancelled</option></select></div>
              <div><label className="block text-xs text-gray-500 mb-1">Carrier</label><select value={carrierOptions.includes(editForm.carrier) ? editForm.carrier : 'Other'} onChange={e => { const v = e.target.value; setEditForm({...editForm, carrier: v === 'Other' ? '' : v}) }} className={inputCls}>{carrierOptions.map(c => <option key={c} value={c}>{c}</option>)}<option value="Other">Other</option></select>{!carrierOptions.includes(editForm.carrier) && <input placeholder="Enter carrier name" value={editForm.carrier} onChange={e => setEditForm({...editForm, carrier: e.target.value})} className={inputCls + " mt-2"} />}</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Effective Date</label><input type="date" value={editForm.start_date} onChange={e => setEditForm({...editForm, start_date: e.target.value})} className={inputCls} /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Expiration Date</label><input type="date" value={editForm.end_date} onChange={e => setEditForm({...editForm, end_date: e.target.value})} className={inputCls} /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Premium $</label><input type="number" value={editForm.premium_amount} onChange={e => setEditForm({...editForm, premium_amount: e.target.value})} className={inputCls} /></div>
            </div>
            <TypeFields f={editForm} setF={setEditForm} />
            <div><label className="block text-xs text-gray-500 mb-1">Notes</label><textarea value={editForm.coverage_summary} onChange={e => setEditForm({...editForm, coverage_summary: e.target.value})} rows={2} className={inputCls} /></div>
            <div className="flex gap-2 pt-2">
              <button onClick={updatePolicy} disabled={saving} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 disabled:opacity-60"><Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}</button>
              <button onClick={() => setEditing(false)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}


function IDCardsTab({ token, clientId, idCards, policies, onRefresh }) {
  const ID_CARD_TYPES = ['auto', 'health', 'home']
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ card_type: 'auto', insured_name: '', policy_number: '', effective_date: '', expiration_date: '', vehicle_info: '', policy_id: '', vin: '', insured_drivers: '', liability_limits: '', member_id: '', group_number: '', plan_name: '', pcp_name: '', copay_info: '', rx_bin: '', property_address: '', dwelling_coverage: '', liability_limit: '' })
  const [saving, setSaving] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [editingCard, setEditingCard] = useState(false)
  const [editCardForm, setEditCardForm] = useState({})

  const updateCard = async () => {
    setSaving(true)
    const { vin, insured_drivers, liability_limits, member_id, group_number, plan_name, pcp_name, copay_info, rx_bin, property_address, dwelling_coverage, liability_limit, id, client_id, created_at, coverage_details: _cd, ...base } = editCardForm
    let coverage_details = null
    if (editCardForm.card_type === 'auto') coverage_details = JSON.stringify({ vin, insured_drivers, liability_limits })
    else if (editCardForm.card_type === 'health') coverage_details = JSON.stringify({ member_id, group_number, plan_name, pcp_name, copay_info, rx_bin })
    else if (editCardForm.card_type === 'home') coverage_details = JSON.stringify({ property_address, dwelling_coverage, liability_limit })
    await fetch('/api/admin/id-cards', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: selectedCard.id, ...base, coverage_details }),
    })
    setSaving(false)
    setEditingCard(false)
    setSelectedCard(null)
    onRefresh()
  }

  const resetForm = () => setForm({ card_type: 'auto', insured_name: '', policy_number: '', effective_date: '', expiration_date: '', vehicle_info: '', policy_id: '', vin: '', insured_drivers: '', liability_limits: '', member_id: '', group_number: '', plan_name: '', pcp_name: '', copay_info: '', rx_bin: '', property_address: '', dwelling_coverage: '', liability_limit: '' })

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    const { vin, insured_drivers, liability_limits, member_id, group_number, plan_name, pcp_name, copay_info, rx_bin, property_address, dwelling_coverage, liability_limit, ...base } = form
    let coverage_details = null
    if (form.card_type === 'auto') coverage_details = JSON.stringify({ vin, insured_drivers, liability_limits })
    else if (form.card_type === 'health') coverage_details = JSON.stringify({ member_id, group_number, plan_name, pcp_name, copay_info, rx_bin })
    else if (form.card_type === 'home') coverage_details = JSON.stringify({ property_address, dwelling_coverage, liability_limit })
    await fetch('/api/admin/id-cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...base, coverage_details, client_id: clientId, policy_id: form.policy_id || null }),
    })
    setShowForm(false)
    resetForm()
    setSaving(false)
    onRefresh()
  }

  const del = async (id) => {
    if (!confirm('Delete this ID card?')) return
    await fetch(`/api/admin/id-cards?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    onRefresh()
  }

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"
  const labelCls = "block text-xs text-gray-500 mb-1"

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="bg-[#0954a5] text-white px-3 py-1.5 rounded-lg text-sm font-medium mb-3 flex items-center gap-1">
        <Plus size={14} /> Add ID Card
      </button>
      {showForm && (
        <form onSubmit={save} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Card Type</label>
              <select value={form.card_type} onChange={e => setForm({...form, card_type: e.target.value})} className={inputCls}>
                {ID_CARD_TYPES.map(t => <option key={t} value={t}>{t === 'auto' ? 'Auto' : t === 'health' ? 'Health' : 'Homeowners'}</option>)}
              </select>
            </div>
            <div><label className={labelCls}>Insured Name *</label><input required value={form.insured_name} onChange={e => setForm({...form, insured_name: e.target.value})} className={inputCls} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Policy Number *</label><input required value={form.policy_number} onChange={e => setForm({...form, policy_number: e.target.value})} className={inputCls} /></div>
            <div>
              <label className={labelCls}>Link Existing Policy</label>
              <select value={form.policy_id} onChange={e => setForm({...form, policy_id: e.target.value})} className={inputCls}>
                <option value="">(none)</option>
                {policies.map(p => <option key={p.id} value={p.id}>#{p.policy_number} ({p.policy_type})</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Effective Date</label><input type="date" value={form.effective_date} onChange={e => setForm({...form, effective_date: e.target.value})} className={inputCls} /></div>
            <div><label className={labelCls}>Expiration Date</label><input type="date" value={form.expiration_date} onChange={e => setForm({...form, expiration_date: e.target.value})} className={inputCls} /></div>
          </div>

          {/* AUTO-specific fields */}
          {form.card_type === 'auto' && (<>
            <p className="text-xs font-semibold text-gray-600 border-b border-gray-200 pb-1">Auto Insurance Details</p>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Vehicle Info</label><input placeholder="e.g. 2023 Toyota Camry" value={form.vehicle_info} onChange={e => setForm({...form, vehicle_info: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>VIN</label><input placeholder="Vehicle ID Number" value={form.vin} onChange={e => setForm({...form, vin: e.target.value})} className={inputCls} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Insured Drivers</label><input placeholder="e.g. John Smith, Jane Smith" value={form.insured_drivers} onChange={e => setForm({...form, insured_drivers: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>Liability Limits</label><input placeholder="e.g. 100/300/100" value={form.liability_limits} onChange={e => setForm({...form, liability_limits: e.target.value})} className={inputCls} /></div>
            </div>
          </>)}

          {/* HEALTH-specific fields */}
          {form.card_type === 'health' && (<>
            <p className="text-xs font-semibold text-gray-600 border-b border-gray-200 pb-1">Health Insurance Details</p>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Member ID *</label><input placeholder="Member ID" value={form.member_id} onChange={e => setForm({...form, member_id: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>Group Number</label><input placeholder="Group #" value={form.group_number} onChange={e => setForm({...form, group_number: e.target.value})} className={inputCls} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Plan Name</label><input placeholder="e.g. Blue Cross PPO" value={form.plan_name} onChange={e => setForm({...form, plan_name: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>Primary Care Physician</label><input placeholder="PCP Name" value={form.pcp_name} onChange={e => setForm({...form, pcp_name: e.target.value})} className={inputCls} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Copay Info</label><input placeholder="e.g. $25 office / $50 specialist" value={form.copay_info} onChange={e => setForm({...form, copay_info: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>RX Bin / PCN / Group</label><input placeholder="e.g. 012345 / AB1234 / GRP001" value={form.rx_bin} onChange={e => setForm({...form, rx_bin: e.target.value})} className={inputCls} /></div>
            </div>
          </>)}

          {/* HOMEOWNERS-specific fields */}
          {form.card_type === 'home' && (<>
            <p className="text-xs font-semibold text-gray-600 border-b border-gray-200 pb-1">Homeowners Insurance Details</p>
            <div><label className={labelCls}>Property Address</label><input placeholder="Full property address" value={form.property_address} onChange={e => setForm({...form, property_address: e.target.value})} className={inputCls} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Dwelling Coverage</label><input placeholder="e.g. $350,000" value={form.dwelling_coverage} onChange={e => setForm({...form, dwelling_coverage: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>Liability Limit</label><input placeholder="e.g. $300,000" value={form.liability_limit} onChange={e => setForm({...form, liability_limit: e.target.value})} className={inputCls} /></div>
            </div>
          </>)}

          <button type="submit" disabled={saving} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm disabled:opacity-60">
            {saving ? 'Saving...' : 'Save ID Card'}
          </button>
        </form>
      )}
      {idCards.length === 0 ? <p className="text-gray-400 text-center py-6">No ID cards.</p> : (
        <div className="space-y-2">
          {idCards.map(c => {
            const cd = c.coverage_details ? (typeof c.coverage_details === 'string' ? JSON.parse(c.coverage_details) : c.coverage_details) : {}
            return (
              <div key={c.id} onClick={() => { setSelectedCard(c); setEditingCard(false) }} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 cursor-pointer hover:border-green-200 hover:bg-green-50/30 transition">
                <div className="w-8 h-8 rounded bg-green-50 text-green-700 flex items-center justify-center"><CreditCard size={16} /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm">{c.insured_name} - <span className="capitalize">{c.card_type === 'home' ? 'Homeowners' : c.card_type}</span></div>
                  <p className="text-xs text-gray-500">#{c.policy_number} | {formatShortDate(c.effective_date)} - {formatShortDate(c.expiration_date)}</p>
                  {c.card_type === 'auto' && c.vehicle_info && <p className="text-xs text-gray-400">{c.vehicle_info}{cd.vin ? ` | VIN: ${cd.vin}` : ''}</p>}
                  {c.card_type === 'health' && cd.member_id && <p className="text-xs text-gray-400">Member: {cd.member_id}{cd.group_number ? ` | Group: ${cd.group_number}` : ''}{cd.plan_name ? ` | ${cd.plan_name}` : ''}</p>}
                  {c.card_type === 'home' && cd.property_address && <p className="text-xs text-gray-400">{cd.property_address}{cd.dwelling_coverage ? ` | ${cd.dwelling_coverage}` : ''}</p>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={!!selectedCard} onClose={() => { setSelectedCard(null); setEditingCard(false) }} title={editingCard ? 'Edit ID Card' : 'ID Card Details'}>
        {selectedCard && (() => {
          const cd = selectedCard.coverage_details ? (typeof selectedCard.coverage_details === 'string' ? JSON.parse(selectedCard.coverage_details) : selectedCard.coverage_details) : {}
          return !editingCard ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-xs text-gray-500">Card Type</span><p className="font-medium capitalize">{selectedCard.card_type === 'home' ? 'Homeowners' : selectedCard.card_type}</p></div>
                <div><span className="text-xs text-gray-500">Insured Name</span><p className="font-medium">{selectedCard.insured_name}</p></div>
                <div><span className="text-xs text-gray-500">Policy Number</span><p className="font-medium">#{selectedCard.policy_number}</p></div>
                <div><span className="text-xs text-gray-500">Effective Date</span><p className="font-medium">{formatDate(selectedCard.effective_date)}</p></div>
                <div><span className="text-xs text-gray-500">Expiration Date</span><p className="font-medium">{formatDate(selectedCard.expiration_date)}</p></div>
              </div>
              {selectedCard.card_type === 'auto' && (
                <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-100 pt-3">
                  <div><span className="text-xs text-gray-500">Vehicle</span><p className="font-medium">{selectedCard.vehicle_info || '—'}</p></div>
                  <div><span className="text-xs text-gray-500">VIN</span><p className="font-medium">{cd.vin || '—'}</p></div>
                  <div><span className="text-xs text-gray-500">Insured Drivers</span><p className="font-medium">{cd.insured_drivers || '—'}</p></div>
                  <div><span className="text-xs text-gray-500">Liability Limits</span><p className="font-medium">{cd.liability_limits || '—'}</p></div>
                </div>
              )}
              {selectedCard.card_type === 'health' && (
                <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-100 pt-3">
                  <div><span className="text-xs text-gray-500">Member ID</span><p className="font-medium">{cd.member_id || '—'}</p></div>
                  <div><span className="text-xs text-gray-500">Group Number</span><p className="font-medium">{cd.group_number || '—'}</p></div>
                  <div><span className="text-xs text-gray-500">Plan Name</span><p className="font-medium">{cd.plan_name || '—'}</p></div>
                  <div><span className="text-xs text-gray-500">PCP</span><p className="font-medium">{cd.pcp_name || '—'}</p></div>
                  <div><span className="text-xs text-gray-500">Copay Info</span><p className="font-medium">{cd.copay_info || '—'}</p></div>
                  <div><span className="text-xs text-gray-500">RX Bin/PCN/Group</span><p className="font-medium">{cd.rx_bin || '—'}</p></div>
                </div>
              )}
              {selectedCard.card_type === 'home' && (
                <div className="text-sm border-t border-gray-100 pt-3 space-y-2">
                  <div><span className="text-xs text-gray-500">Property Address</span><p className="font-medium">{cd.property_address || '—'}</p></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><span className="text-xs text-gray-500">Dwelling Coverage</span><p className="font-medium">{cd.dwelling_coverage || '—'}</p></div>
                    <div><span className="text-xs text-gray-500">Liability Limit</span><p className="font-medium">{cd.liability_limit || '—'}</p></div>
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button onClick={() => { setEditingCard(true); setEditCardForm({ ...selectedCard, ...cd }) }} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Edit size={14} /> Edit</button>
                <button onClick={() => { del(selectedCard.id); setSelectedCard(null) }} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-gray-500 mb-1">Card Type</label><select value={editCardForm.card_type} onChange={e => setEditCardForm({...editCardForm, card_type: e.target.value})} className={inputCls}>{ID_CARD_TYPES.map(t => <option key={t} value={t}>{t === 'auto' ? 'Auto' : t === 'health' ? 'Health' : 'Homeowners'}</option>)}</select></div>
                <div><label className="block text-xs text-gray-500 mb-1">Insured Name</label><input value={editCardForm.insured_name || ''} onChange={e => setEditCardForm({...editCardForm, insured_name: e.target.value})} className={inputCls} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-gray-500 mb-1">Policy Number</label><input value={editCardForm.policy_number || ''} onChange={e => setEditCardForm({...editCardForm, policy_number: e.target.value})} className={inputCls} /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Link Existing Policy</label><select value={editCardForm.policy_id || ''} onChange={e => setEditCardForm({...editCardForm, policy_id: e.target.value})} className={inputCls}><option value="">(none)</option>{policies.map(p => <option key={p.id} value={p.id}>#{p.policy_number} ({p.policy_type})</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-gray-500 mb-1">Effective Date</label><input type="date" value={editCardForm.effective_date || ''} onChange={e => setEditCardForm({...editCardForm, effective_date: e.target.value})} className={inputCls} /></div>
                <div><label className="block text-xs text-gray-500 mb-1">Expiration Date</label><input type="date" value={editCardForm.expiration_date || ''} onChange={e => setEditCardForm({...editCardForm, expiration_date: e.target.value})} className={inputCls} /></div>
              </div>
              {editCardForm.card_type === 'auto' && (<>
                <p className="text-xs font-semibold text-gray-600 border-b border-gray-200 pb-1">Auto Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-gray-500 mb-1">Vehicle Info</label><input value={editCardForm.vehicle_info || ''} onChange={e => setEditCardForm({...editCardForm, vehicle_info: e.target.value})} className={inputCls} /></div>
                  <div><label className="block text-xs text-gray-500 mb-1">VIN</label><input value={editCardForm.vin || ''} onChange={e => setEditCardForm({...editCardForm, vin: e.target.value})} className={inputCls} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-gray-500 mb-1">Insured Drivers</label><input value={editCardForm.insured_drivers || ''} onChange={e => setEditCardForm({...editCardForm, insured_drivers: e.target.value})} className={inputCls} /></div>
                  <div><label className="block text-xs text-gray-500 mb-1">Liability Limits</label><input value={editCardForm.liability_limits || ''} onChange={e => setEditCardForm({...editCardForm, liability_limits: e.target.value})} className={inputCls} /></div>
                </div>
              </>)}
              {editCardForm.card_type === 'health' && (<>
                <p className="text-xs font-semibold text-gray-600 border-b border-gray-200 pb-1">Health Details</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-gray-500 mb-1">Member ID</label><input value={editCardForm.member_id || ''} onChange={e => setEditCardForm({...editCardForm, member_id: e.target.value})} className={inputCls} /></div>
                  <div><label className="block text-xs text-gray-500 mb-1">Group Number</label><input value={editCardForm.group_number || ''} onChange={e => setEditCardForm({...editCardForm, group_number: e.target.value})} className={inputCls} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-gray-500 mb-1">Plan Name</label><input value={editCardForm.plan_name || ''} onChange={e => setEditCardForm({...editCardForm, plan_name: e.target.value})} className={inputCls} /></div>
                  <div><label className="block text-xs text-gray-500 mb-1">PCP</label><input value={editCardForm.pcp_name || ''} onChange={e => setEditCardForm({...editCardForm, pcp_name: e.target.value})} className={inputCls} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-gray-500 mb-1">Copay Info</label><input value={editCardForm.copay_info || ''} onChange={e => setEditCardForm({...editCardForm, copay_info: e.target.value})} className={inputCls} /></div>
                  <div><label className="block text-xs text-gray-500 mb-1">RX Bin/PCN/Group</label><input value={editCardForm.rx_bin || ''} onChange={e => setEditCardForm({...editCardForm, rx_bin: e.target.value})} className={inputCls} /></div>
                </div>
              </>)}
              {editCardForm.card_type === 'home' && (<>
                <p className="text-xs font-semibold text-gray-600 border-b border-gray-200 pb-1">Homeowners Details</p>
                <div><label className="block text-xs text-gray-500 mb-1">Property Address</label><input value={editCardForm.property_address || ''} onChange={e => setEditCardForm({...editCardForm, property_address: e.target.value})} className={inputCls} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-gray-500 mb-1">Dwelling Coverage</label><input value={editCardForm.dwelling_coverage || ''} onChange={e => setEditCardForm({...editCardForm, dwelling_coverage: e.target.value})} className={inputCls} /></div>
                  <div><label className="block text-xs text-gray-500 mb-1">Liability Limit</label><input value={editCardForm.liability_limit || ''} onChange={e => setEditCardForm({...editCardForm, liability_limit: e.target.value})} className={inputCls} /></div>
                </div>
              </>)}
              <div className="flex gap-2 pt-2">
                <button onClick={updateCard} disabled={saving} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 disabled:opacity-60"><Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}</button>
                <button onClick={() => setEditingCard(false)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">Cancel</button>
              </div>
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}

function DocumentsTab({ token, clientId, docs, onRefresh }) {
  const [showUpload, setShowUpload] = useState(false)
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('other')
  const [notes, setNotes] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [editingDoc, setEditingDoc] = useState(false)
  const [editDocForm, setEditDocForm] = useState({})
  const [savingDoc, setSavingDoc] = useState(false)

  const upload = async (e) => {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    form.append('client_id', clientId)
    form.append('category', category)
    form.append('notes', notes)
    await fetch('/api/admin/documents', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form })
    setShowUpload(false)
    setFile(null)
    setNotes('')
    setUploading(false)
    onRefresh()
  }

  const updateDoc = async () => {
    setSavingDoc(true)
    await fetch('/api/admin/documents', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: selectedDoc.id, category: editDocForm.category, notes: editDocForm.notes }),
    })
    setSavingDoc(false)
    setEditingDoc(false)
    setSelectedDoc(null)
    onRefresh()
  }

  const delDoc = async (id) => {
    if (!confirm('Delete this document?')) return
    await fetch(`/api/admin/documents?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    setSelectedDoc(null)
    onRefresh()
  }

  const downloadDoc = (doc) => {
    if (!doc.file_url) return
    const a = document.createElement('a')
    a.href = doc.file_url
    a.download = doc.file_name || 'download'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"

  return (
    <div>
      <button onClick={() => setShowUpload(!showUpload)} className="bg-[#0954a5] text-white px-3 py-1.5 rounded-lg text-sm font-medium mb-3 flex items-center gap-1">
        <Plus size={14} /> Upload Document
      </button>
      {showUpload && (
        <form onSubmit={upload} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-[#0954a5] file:font-medium" />
          <select value={category} onChange={e => setCategory(e.target.value)} className={inputCls}>
            {DOC_CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
          </select>
          <input placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} className={inputCls} />
          <button type="submit" disabled={!file || uploading} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm disabled:opacity-60">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      )}
      {docs.length === 0 ? <p className="text-gray-400 text-center py-6">No documents.</p> : (
        <div className="space-y-2">
          {docs.map(d => (
            <div key={d.id} onClick={() => { setSelectedDoc(d); setEditDocForm({ category: d.category || 'other', notes: d.notes || '' }); setEditingDoc(false) }} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3 cursor-pointer hover:border-purple-200 hover:bg-purple-50/30 transition">
              <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${d.file_type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'}`}>
                {d.file_type === 'pdf' ? <FileText size={14} /> : <Upload size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{d.file_name}</p>
                <p className="text-xs text-gray-500">{d.category?.replace(/_/g, ' ')} | {formatShortDate(d.created_at)} | by {d.uploaded_by}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!selectedDoc} onClose={() => { setSelectedDoc(null); setEditingDoc(false) }} title={editingDoc ? 'Edit Document' : 'Document Details'}>
        {selectedDoc && !editingDoc && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-xs text-gray-500">File Name</span><p className="font-medium truncate">{selectedDoc.file_name}</p></div>
              <div><span className="text-xs text-gray-500">File Type</span><p className="font-medium uppercase">{selectedDoc.file_type}</p></div>
              <div><span className="text-xs text-gray-500">Category</span><p className="font-medium capitalize">{selectedDoc.category?.replace(/_/g, ' ')}</p></div>
              <div><span className="text-xs text-gray-500">Uploaded</span><p className="font-medium">{formatDate(selectedDoc.created_at)} by {selectedDoc.uploaded_by}</p></div>
            </div>
            {selectedDoc.notes && <div><span className="text-xs text-gray-500">Notes</span><p className="text-sm mt-1">{selectedDoc.notes}</p></div>}
            {selectedDoc.file_url && selectedDoc.file_type === 'image' && (
              <div className="border border-gray-100 rounded-lg overflow-hidden"><img src={selectedDoc.file_url} alt={selectedDoc.file_name} className="w-full max-h-64 object-contain bg-gray-50" /></div>
            )}
            {selectedDoc.file_url && selectedDoc.file_type === 'pdf' && (
              <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-500">
                <FileText size={24} className="mx-auto mb-2 text-red-400" />
                PDF Document — use Download or View to open
              </div>
            )}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => downloadDoc(selectedDoc)} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Download size={14} /> Download</button>
              {selectedDoc.file_url && <a href={selectedDoc.file_url} target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Eye size={14} /> View</a>}
              <button onClick={() => setEditingDoc(true)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Edit size={14} /> Edit</button>
              <button onClick={() => delDoc(selectedDoc.id)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-1"><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        )}
        {selectedDoc && editingDoc && (
          <div className="space-y-3">
            <div><label className="block text-xs text-gray-500 mb-1">Category</label><select value={editDocForm.category} onChange={e => setEditDocForm({...editDocForm, category: e.target.value})} className={inputCls}>{DOC_CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}</select></div>
            <div><label className="block text-xs text-gray-500 mb-1">Notes</label><textarea value={editDocForm.notes} onChange={e => setEditDocForm({...editDocForm, notes: e.target.value})} rows={3} className={inputCls} /></div>
            <div className="flex gap-2 pt-2">
              <button onClick={updateDoc} disabled={savingDoc} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 disabled:opacity-60"><Save size={14} /> {savingDoc ? 'Saving...' : 'Save Changes'}</button>
              <button onClick={() => setEditingDoc(false)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function MessagesTab({ token, clientId, messages: initialMessages, onRefresh }) {
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef(null)
  const unreadCount = messages.filter(m => m.sender === 'client' && !m.read).length

  useEffect(() => { setMessages(initialMessages) }, [initialMessages])

  const fetchMessages = async () => {
    try {
      const r = await fetch(`/api/admin/messages?client_id=${clientId}&_t=` + Date.now(), {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      if (!r.ok) return
      const d = await r.json()
      if (d) setMessages(d)
    } catch (e) { /* will retry next poll */ }
  }

  useEffect(() => {
    const id = setInterval(fetchMessages, 5000)
    return () => clearInterval(id)
  }, [clientId, token])

  useEffect(() => {
    const handleFocus = () => fetchMessages()
    const handleVisible = () => { if (document.visibilityState === 'visible') fetchMessages() }
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisible)
    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisible)
    }
  }, [clientId, token])

  const send = async (e) => {
    e?.preventDefault?.()
    if (!body.trim()) return
    setSending(true)
    await fetch('/api/admin/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ client_id: clientId, body }),
    })
    setBody('')
    setSending(false)
    fetchMessages()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTime = (d) => new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="flex flex-col" style={{ height: '500px' }}>
      {unreadCount > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 mb-3 text-sm text-orange-700">
          {unreadCount} unread message{unreadCount > 1 ? 's' : ''} from client
        </div>
      )}
      <div className="flex-1 overflow-y-auto rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-1 mb-3">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No messages yet. Send the first message below.</p>
        ) : (
          messages.map(m => {
            const isAgent = m.sender === 'agent'
            return (
              <div key={m.id} className={`flex ${isAgent ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  isAgent
                    ? 'bg-[#0954a5] text-white rounded-br-md'
                    : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md'
                }`}>
                  <div className={`flex items-center gap-2 mb-0.5 ${isAgent ? 'text-blue-100' : 'text-gray-400'}`}>
                    <span className="text-xs font-semibold">{isAgent ? 'You' : 'Client'}</span>
                    <span className="text-xs">{formatTime(m.created_at)}</span>
                  </div>
                  {m.subject && (
                    <p className={`text-sm font-semibold mb-1 ${isAgent ? 'text-white' : 'text-gray-800'}`}>{m.subject}</p>
                  )}
                  <p className={`text-sm whitespace-pre-wrap ${isAgent ? 'text-white' : 'text-gray-700'}`}>{m.body}</p>
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={send} className="flex gap-2">
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
    </div>
  )
}

// ================= MAIN ADMIN PAGE =================
export default function AdminPage() {
  const [token, setToken] = useState(null)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('inquiries')
  const [selectedClient, setSelectedClient] = useState(null)
  const [showNotifs, setShowNotifs] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState([])
  const notifRef = useRef(null)

  // Fetch unread messages across all clients
  useEffect(() => {
    if (!token) return
    const checkMessages = async () => {
      try {
        const res = await fetch(`/api/admin/notifications?_t=${Date.now()}`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
        if (res.ok) { const d = await res.json(); setUnreadMessages(d.unreadMessages || []) }
      } catch(e) {}
    }
    checkMessages()
    const id = setInterval(checkMessages, 10000)
    return () => clearInterval(id)
  }, [token])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const markNotifRead = async (n) => {
    if (n.type === 'inquiry' || n.type === 'lead') {
      const table = n.type === 'inquiry' ? 'inquiries' : 'leads'
      await fetch('/api/admin/data', { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ table, id: n.id, status: 'contacted' }) })
      fetchData(token)
    } else if (n.type === 'message') {
      await fetch(`/api/admin/notifications`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ messageId: n.id }) })
      setUnreadMessages(prev => prev.filter(m => m.id !== n.id))
    }
    if (n.action) n.action()
  }

  const clearAllNotifs = async () => {
    for (const n of notifications) {
      if (n.type === 'inquiry' || n.type === 'lead') {
        const table = n.type === 'inquiry' ? 'inquiries' : 'leads'
        await fetch('/api/admin/data', { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ table, id: n.id, status: 'contacted' }) })
      } else if (n.type === 'message') {
        await fetch(`/api/admin/notifications`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ messageId: n.id }) })
      }
    }
    setUnreadMessages([])
    fetchData(token)
    setShowNotifs(false)
  }


  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved) setToken(saved)
  }, [])

  const fetchData = useCallback(async (t) => {
    setLoading(true)
    const res = await fetch('/api/admin/data', { headers: { Authorization: `Bearer ${t}` } })
    if (res.ok) { setData(await res.json()); setLoading(false); return true }
    sessionStorage.removeItem(SESSION_KEY); setToken(null); setLoading(false); return false
  }, [])

  useEffect(() => { if (token) fetchData(token) }, [token, fetchData])

  const login = async (e) => {
    e.preventDefault()
    if (!pw.trim()) return
    setPwErr(''); setLoading(true)
    const ok = await fetchData(pw)
    if (ok) { sessionStorage.setItem(SESSION_KEY, pw); setToken(pw) }
    else { setPwErr('Incorrect password.'); setLoading(false) }
  }

  const logout = () => { sessionStorage.removeItem(SESSION_KEY); setToken(null); setData(null) }

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
                <div className="relative"><input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} autoFocus
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter admin password" /><button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm">{showPw ? "Hide" : "Show"}</button></div>
              </div>
              {pwErr && <p className="text-red-500 text-sm">{pwErr}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition disabled:opacity-60">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const inquiries = data.inquiries ?? []
  const leads = data.leads ?? []
  const newInquiries = inquiries.filter(i => i.status === 'new')
  const newLeads = leads.filter(l => l.status === 'new')
  const notifications = [
    ...newInquiries.map(i => ({ type: 'inquiry', id: i.id, label: `New inquiry from ${i.name || i.email || 'Unknown'}`, time: i.created_at, action: () => { setTab('inquiries'); setShowNotifs(false) } })),
    ...newLeads.map(l => ({ type: 'lead', id: l.id, label: `New lead: ${l.name || l.email || 'Unknown'}`, time: l.created_at, action: () => { setTab('leads'); setShowNotifs(false) } })),
    ...unreadMessages.map(m => ({ type: 'message', id: m.id, label: `Message from ${m.client_name || 'Client'}`, time: m.created_at, action: () => { setSelectedClient(m.client); setTab('clients'); setShowNotifs(false) } })),
  ].sort((a, b) => new Date(b.time) - new Date(a.time))

  const notifCount = notifications.length
  const notifIcon = { inquiry: '📩', lead: '👤', message: '💬' }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Admin Dashboard</h1>
            <p className="text-blue-200 text-xs">Insurance Wheat Ridge</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative" ref={notifRef}>
              <button onClick={() => setShowNotifs(!showNotifs)} className="text-blue-200 hover:text-white transition relative">
                <Bell size={18} />
                {notifCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white">{notifCount > 9 ? '9+' : notifCount}</span>}
              </button>
              {showNotifs && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <div><span className="text-sm font-semibold text-gray-700">Notifications</span>
                    {notifCount > 0 && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">{notifCount}</span>}</div>
                    {notifCount > 0 && <button onClick={clearAllNotifs} className="text-xs text-blue-600 hover:text-blue-800 font-medium">Clear all</button>}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-sm text-gray-400">All caught up! 🎉</div>
                    ) : notifications.map((n, i) => (
                      <button key={i} onClick={() => markNotifRead(n)} className="w-full text-left px-4 py-3 hover:bg-blue-50 transition border-b border-gray-50 flex items-start gap-3">
                        <span className="text-lg">{notifIcon[n.type] || '🔔'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 truncate">{n.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{n.time ? new Date(n.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => fetchData(token)} className="text-blue-200 hover:text-white transition">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={logout} className="text-blue-200 hover:text-white transition"><LogOut size={18} /></button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-5 flex-wrap">
          {[
            { key: 'inquiries', label: 'Inquiries', icon: MessageSquare, count: inquiries.length },
            { key: 'leads', label: 'Leads', icon: Users, count: leads.length },
            { key: 'clients', label: 'Clients', icon: Users, count: null },
            { key: 'analytics', label: 'Analytics', icon: BarChart3, count: null },
          ].map(t => {
            const Icon = t.icon
            return (
              <button key={t.key} onClick={() => { setTab(t.key); setSelectedClient(null) }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
                  tab === t.key ? 'bg-blue-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                }`}>
                <Icon size={15} /> {t.label}
                {t.count !== null && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'}`}>{t.count}</span>
                )}
              </button>
            )
          })}
        </div>

        {loading && tab !== 'clients' ? (
          <div className="text-center py-16 text-gray-400">Loading...</div>
        ) : tab === 'inquiries' ? (
          inquiries.length === 0 ? <div className="text-center py-16 text-gray-400">No inquiries yet.</div> : (
            <div className="space-y-3">{inquiries.map(item => <InquiryRow key={item.id} item={item} token={token} onUpdate={() => fetchData(token)} />)}</div>
          )
        ) : tab === 'leads' ? (
          leads.length === 0 ? <div className="text-center py-16 text-gray-400">No leads yet.</div> : (
            <div className="space-y-3">{leads.map(item => <LeadRow key={item.id} item={item} token={token} onUpdate={() => fetchData(token)} />)}</div>
          )
        ) : tab === 'analytics' ? (
          <AnalyticsTab token={token} />
        ) : tab === 'clients' ? (
          selectedClient ? (
            <ClientDetail token={token} client={selectedClient} onBack={() => setSelectedClient(null)} />
          ) : (
            <ClientList token={token} onSelectClient={setSelectedClient} />
          )
        ) : null}


      </div>
    </div>
  )
}
