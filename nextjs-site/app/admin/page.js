'use client'
import { useState, useEffect, useCallback } from 'react'
import { LogOut, RefreshCw, Users, MessageSquare, Phone, Mail, Calendar, Plus, Trash2, Edit, ChevronLeft, FileText, CreditCard, Upload, Send, X, Eye, Car, Home, Heart, Briefcase, Building } from 'lucide-react'

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
const POLICY_TYPES = ['auto', 'home', 'life', 'business', 'renters', 'condo']
const TYPE_ICONS = { auto: Car, home: Home, life: Heart, business: Briefcase, renters: Building, condo: Building }
const DOC_CATEGORIES = ['id', 'proof_of_residence', 'claim_photo', 'signature', 'other']

// ================= ORIGINAL COMPONENTS =================
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
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', password: '' })
  const [saving, setSaving] = useState(false)
  const [tempPw, setTempPw] = useState(null)

  const fetchClients = async () => {
    const res = await fetch('/api/admin/clients', { headers: { Authorization: `Bearer ${token}` } })
    if (res.ok) setClients(await res.json())
    setLoading(false)
  }
  useEffect(() => { fetchClients() }, [])

  const addClient = async (e) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const data = await res.json()
      setTempPw(data.temp_password)
      setForm({ first_name: '', last_name: '', email: '', phone: '', password: '' })
      fetchClients()
    }
    setSaving(false)
  }

  const deleteClient = async (id) => {
    if (!confirm('Delete this client and all their data?')) return
    await fetch(`/api/admin/clients?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchClients()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Clients</h3>
        <button onClick={() => { setShowAdd(!showAdd); setTempPw(null) }}
          className="bg-[#0954a5] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition flex items-center gap-1">
          <Plus size={14} /> Add Client
        </button>
      </div>

      {tempPw && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-green-800 font-medium">Client created! Temporary password:</p>
          <p className="text-lg font-mono font-bold text-green-900 mt-1">{tempPw}</p>
          <p className="text-xs text-green-600 mt-1">Share this with the client. They can change it in their profile.</p>
        </div>
      )}

      {showAdd && (
        <form onSubmit={addClient} className="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="First Name *" required value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
            <input placeholder="Last Name *" required value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
          </div>
          <input placeholder="Email *" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
          <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
          <input placeholder="Password (leave empty for auto-generated)" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
          <button type="submit" disabled={saving}
            className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60">
            {saving ? 'Creating...' : 'Create Client'}
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
                <div className="font-semibold text-gray-900">{c.first_name} {c.last_name}</div>
                <div className="text-sm text-gray-500 flex flex-wrap gap-x-4">
                  <span>{c.email}</span>
                  <span>{c.policy_count} {c.policy_count === 1 ? 'policy' : 'policies'}</span>
                </div>
              </button>
              <button onClick={() => deleteClient(c.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
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

  const fetchAll = async () => {
    setLoading(true)
    const headers = { Authorization: `Bearer ${token}` }
    const [p, ic, d, m] = await Promise.all([
      fetch(`/api/admin/policies?client_id=${client.id}`, { headers }).then(r => r.json()),
      fetch(`/api/admin/id-cards?client_id=${client.id}`, { headers }).then(r => r.json()),
      fetch(`/api/admin/documents?client_id=${client.id}`, { headers }).then(r => r.json()),
      fetch(`/api/admin/messages?client_id=${client.id}`, { headers }).then(r => r.json()),
    ])
    setPolicies(p ?? [])
    setIdCards(ic ?? [])
    setDocs(d ?? [])
    setMessages(m ?? [])
    setLoading(false)
  }
  useEffect(() => { fetchAll() }, [client.id])

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

function PoliciesTab({ token, clientId, policies, onRefresh }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ policy_number: '', policy_type: 'auto', status: 'active', carrier: 'Farmers Insurance', start_date: '', end_date: '', premium_amount: '', coverage_summary: '' })
  const [saving, setSaving] = useState(false)

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/policies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, client_id: clientId, premium_amount: form.premium_amount ? Number(form.premium_amount) : null }),
    })
    setShowForm(false)
    setForm({ policy_number: '', policy_type: 'auto', status: 'active', carrier: 'Farmers Insurance', start_date: '', end_date: '', premium_amount: '', coverage_summary: '' })
    setSaving(false)
    onRefresh()
  }

  const del = async (id) => {
    if (!confirm('Delete this policy?')) return
    await fetch(`/api/admin/policies?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    onRefresh()
  }

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="bg-[#0954a5] text-white px-3 py-1.5 rounded-lg text-sm font-medium mb-3 flex items-center gap-1">
        <Plus size={14} /> Add Policy
      </button>
      {showForm && (
        <form onSubmit={save} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Policy Number *" required value={form.policy_number} onChange={e => setForm({...form, policy_number: e.target.value})} className={inputCls} />
            <select value={form.policy_type} onChange={e => setForm({...form, policy_type: e.target.value})} className={inputCls}>
              {POLICY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={inputCls}>
              <option value="active">Active</option><option value="expired">Expired</option><option value="cancelled">Cancelled</option>
            </select>
            <input placeholder="Carrier" value={form.carrier} onChange={e => setForm({...form, carrier: e.target.value})} className={inputCls} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input type="date" placeholder="Start Date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} className={inputCls} />
            <input type="date" placeholder="End Date" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} className={inputCls} />
            <input type="number" placeholder="Premium $" value={form.premium_amount} onChange={e => setForm({...form, premium_amount: e.target.value})} className={inputCls} />
          </div>
          <textarea placeholder="Coverage Summary" value={form.coverage_summary} onChange={e => setForm({...form, coverage_summary: e.target.value})} rows={3} className={inputCls} />
          <button type="submit" disabled={saving} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Policy'}
          </button>
        </form>
      )}
      {policies.length === 0 ? <p className="text-gray-400 text-center py-6">No policies.</p> : (
        <div className="space-y-2">
          {policies.map(p => {
            const Icon = TYPE_ICONS[p.policy_type] || Briefcase
            return (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-50 text-[#0954a5] flex items-center justify-center"><Icon size={16} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 capitalize text-sm">{p.policy_type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${POLICY_STATUS_COLORS[p.status] || 'bg-gray-100'}`}>{p.status}</span>
                  </div>
                  <p className="text-xs text-gray-500">#{p.policy_number} | {p.carrier} | ${p.premium_amount || '—'}/yr</p>
                </div>
                <button onClick={() => del(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function IDCardsTab({ token, clientId, idCards, policies, onRefresh }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ card_type: 'auto', insured_name: '', policy_number: '', effective_date: '', expiration_date: '', vehicle_info: '', policy_id: '' })
  const [saving, setSaving] = useState(false)

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/id-cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, client_id: clientId, policy_id: form.policy_id || null }),
    })
    setShowForm(false)
    setForm({ card_type: 'auto', insured_name: '', policy_number: '', effective_date: '', expiration_date: '', vehicle_info: '', policy_id: '' })
    setSaving(false)
    onRefresh()
  }

  const del = async (id) => {
    if (!confirm('Delete this ID card?')) return
    await fetch(`/api/admin/id-cards?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    onRefresh()
  }

  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="bg-[#0954a5] text-white px-3 py-1.5 rounded-lg text-sm font-medium mb-3 flex items-center gap-1">
        <Plus size={14} /> Add ID Card
      </button>
      {showForm && (
        <form onSubmit={save} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <select value={form.card_type} onChange={e => setForm({...form, card_type: e.target.value})} className={inputCls}>
              {POLICY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input placeholder="Insured Name *" required value={form.insured_name} onChange={e => setForm({...form, insured_name: e.target.value})} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Policy Number *" required value={form.policy_number} onChange={e => setForm({...form, policy_number: e.target.value})} className={inputCls} />
            <select value={form.policy_id} onChange={e => setForm({...form, policy_id: e.target.value})} className={inputCls}>
              <option value="">Link to policy (optional)</option>
              {policies.map(p => <option key={p.id} value={p.id}>#{p.policy_number} ({p.policy_type})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-gray-500">Effective</label><input type="date" value={form.effective_date} onChange={e => setForm({...form, effective_date: e.target.value})} className={inputCls} /></div>
            <div><label className="text-xs text-gray-500">Expiration</label><input type="date" value={form.expiration_date} onChange={e => setForm({...form, expiration_date: e.target.value})} className={inputCls} /></div>
          </div>
          <input placeholder="Vehicle Info (e.g. 2023 Toyota Camry)" value={form.vehicle_info} onChange={e => setForm({...form, vehicle_info: e.target.value})} className={inputCls} />
          <button type="submit" disabled={saving} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm disabled:opacity-60">
            {saving ? 'Saving...' : 'Save ID Card'}
          </button>
        </form>
      )}
      {idCards.length === 0 ? <p className="text-gray-400 text-center py-6">No ID cards.</p> : (
        <div className="space-y-2">
          {idCards.map(c => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-green-50 text-green-700 flex items-center justify-center"><CreditCard size={16} /></div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm">{c.insured_name} - <span className="capitalize">{c.card_type}</span></div>
                <p className="text-xs text-gray-500">#{c.policy_number} | {formatShortDate(c.effective_date)} - {formatShortDate(c.expiration_date)}</p>
                {c.vehicle_info && <p className="text-xs text-gray-400">{c.vehicle_info}</p>}
              </div>
              <button onClick={() => del(c.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DocumentsTab({ token, clientId, docs, onRefresh }) {
  const [showUpload, setShowUpload] = useState(false)
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('other')
  const [notes, setNotes] = useState('')
  const [uploading, setUploading] = useState(false)

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

  return (
    <div>
      <button onClick={() => setShowUpload(!showUpload)} className="bg-[#0954a5] text-white px-3 py-1.5 rounded-lg text-sm font-medium mb-3 flex items-center gap-1">
        <Plus size={14} /> Upload Document
      </button>
      {showUpload && (
        <form onSubmit={upload} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFile(e.target.files[0])}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-[#0954a5] file:font-medium" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900">
            {DOC_CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
          </select>
          <input placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
          <button type="submit" disabled={!file || uploading} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm disabled:opacity-60">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      )}
      {docs.length === 0 ? <p className="text-gray-400 text-center py-6">No documents.</p> : (
        <div className="space-y-2">
          {docs.map(d => (
            <div key={d.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3">
              <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${d.file_type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'}`}>
                {d.file_type === 'pdf' ? <FileText size={14} /> : <Upload size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{d.file_name}</p>
                <p className="text-xs text-gray-500">{d.category?.replace(/_/g, ' ')} | {formatShortDate(d.created_at)} | by {d.uploaded_by}</p>
              </div>
              {d.file_url && <a href={d.file_url} target="_blank" rel="noopener noreferrer" className="text-[#0954a5]"><Eye size={16} /></a>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MessagesTab({ token, clientId, messages, onRefresh }) {
  const [body, setBody] = useState('')
  const [subject, setSubject] = useState('')
  const [sending, setSending] = useState(false)

  const send = async (e) => {
    e.preventDefault()
    if (!body.trim()) return
    setSending(true)
    await fetch('/api/admin/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ client_id: clientId, subject, body }),
    })
    setBody('')
    setSubject('')
    setSending(false)
    onRefresh()
  }

  return (
    <div>
      <form onSubmit={send} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
        <input placeholder="Subject (optional)" value={subject} onChange={e => setSubject(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900" />
        <div className="flex gap-2">
          <textarea placeholder="Reply to client..." value={body} onChange={e => setBody(e.target.value)} rows={2}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 resize-none" />
          <button type="submit" disabled={!body.trim() || sending}
            className="bg-[#0954a5] text-white px-4 rounded-lg disabled:opacity-60 self-end">
            <Send size={16} />
          </button>
        </div>
      </form>
      {messages.length === 0 ? <p className="text-gray-400 text-center py-6">No messages.</p> : (
        <div className="space-y-2">
          {messages.map(m => (
            <div key={m.id} className={`rounded-xl p-3 ${m.sender === 'agent' ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-gray-100'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.sender === 'agent' ? 'bg-[#0954a5] text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {m.sender === 'agent' ? 'Agent' : 'Client'}
                </span>
                <span className="text-xs text-gray-400">{formatDate(m.created_at)}</span>
              </div>
              {m.subject && <p className="text-sm font-medium text-gray-700">{m.subject}</p>}
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{m.body}</p>
            </div>
          ))}
        </div>
      )}
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
  const newCount = inquiries.filter(i => i.status === 'new').length + leads.filter(l => l.status === 'new').length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Admin Dashboard</h1>
            <p className="text-blue-200 text-xs">Insurance Wheat Ridge</p>
          </div>
          <div className="flex items-center gap-3">
            {newCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{newCount} new</span>}
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
        ) : tab === 'clients' ? (
          selectedClient ? (
            <ClientDetail token={token} client={selectedClient} onBack={() => setSelectedClient(null)} />
          ) : (
            <ClientList token={token} onSelectClient={setSelectedClient} />
          )
        ) : null}

        {tab !== 'clients' && (
          <p className="text-center text-xs text-gray-300 mt-8">Tap a status badge to cycle: new &rarr; contacted &rarr; closed</p>
        )}
      </div>
    </div>
  )
}
