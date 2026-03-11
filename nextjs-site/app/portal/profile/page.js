'use client'
import { useState, useEffect } from 'react'
import PortalLayout, { usePortalAuth } from '@/components/portal-layout'
import { Save, Lock } from 'lucide-react'

export default function ProfilePage() {
  const { client, ready, logout, authFetch } = usePortalAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({})
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm: '' })

  useEffect(() => {
    if (!ready) return
    authFetch('/api/portal/profile').then(r => r?.json()).then(d => {
      setProfile(d)
      setForm({ first_name: d.first_name, last_name: d.last_name, email: d.email, phone: d.phone || '', address: d.address || '' })
      setLoading(false)
    })
  }, [ready])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    const res = await authFetch('/api/portal/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res?.ok) {
      const d = await res.json()
      setProfile(d)
      // Update sessionStorage
      const c = JSON.parse(sessionStorage.getItem('portal_client') || '{}')
      sessionStorage.setItem('portal_client', JSON.stringify({ ...c, first_name: d.first_name, last_name: d.last_name }))
      setMsg('Profile updated successfully.')
    } else {
      setMsg('Failed to update profile.')
    }
    setSaving(false)
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (pwForm.new_password !== pwForm.confirm) {
      setMsg('Passwords do not match.')
      return
    }
    setSaving(true)
    setMsg('')
    const res = await authFetch('/api/portal/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current_password: pwForm.current_password, new_password: pwForm.new_password }),
    })
    if (res?.ok) {
      setMsg('Password changed successfully.')
      setPwForm({ current_password: '', new_password: '', confirm: '' })
    } else {
      const d = await res.json()
      setMsg(d.error || 'Failed to change password.')
    }
    setSaving(false)
  }

  if (!ready) return null

  const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0954a5]"

  return (
    <PortalLayout client={client} logout={logout}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
      
      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {msg}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-semibold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" value={form.first_name || ''} onChange={e => setForm({...form, first_name: e.target.value})} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" value={form.last_name || ''} onChange={e => setForm({...form, last_name: e.target.value})} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={form.phone || ''} onChange={e => setForm({...form, phone: e.target.value})} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" value={form.address || ''} onChange={e => setForm({...form, address: e.target.value})} className={inputCls} />
            </div>
            <button type="submit" disabled={saving} className="bg-[#0954a5] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition disabled:opacity-60 flex items-center gap-2">
              <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          <form onSubmit={handlePasswordChange} className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2"><Lock size={16} /> Change Password</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" value={pwForm.current_password} onChange={e => setPwForm({...pwForm, current_password: e.target.value})} className={inputCls} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" value={pwForm.new_password} onChange={e => setPwForm({...pwForm, new_password: e.target.value})} className={inputCls} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" value={pwForm.confirm} onChange={e => setPwForm({...pwForm, confirm: e.target.value})} className={inputCls} required />
            </div>
            <button type="submit" disabled={saving} className="bg-[#0954a5] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition disabled:opacity-60 flex items-center gap-2">
              <Lock size={14} /> {saving ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      )}
    </PortalLayout>
  )
}
