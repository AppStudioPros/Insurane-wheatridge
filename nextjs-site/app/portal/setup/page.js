'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

function SetupForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!token) { setError('No invite token provided.'); setLoading(false); return }
    fetch(`/api/portal/setup?token=${token}`)
      .then(r => r.json().then(d => ({ ok: r.ok, data: d })))
      .then(({ ok, data }) => {
        if (ok) setFirstName(data.first_name)
        else setError(data.error || 'Invalid invite link')
        setLoading(false)
      })
      .catch(() => { setError('Something went wrong'); setLoading(false) })
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPw) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setError(''); setSubmitting(true)
    try {
      const res = await fetch('/api/portal/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, phone: phone || null, address: address || null }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Setup failed'); setSubmitting(false); return }
      sessionStorage.setItem('portal_token', data.token)
      sessionStorage.setItem('portal_client', JSON.stringify(data.client))
      router.push('/portal/dashboard')
    } catch {
      setError('Something went wrong'); setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  )

  if (error && !firstName) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid Invite</h1>
        <p className="text-gray-500 mb-6">{error}</p>
        <a href="/portal" className="text-[#0954a5] font-medium hover:underline">Go to Login</a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-[#0954a5] to-[#073d7a] px-6 py-10 text-center">
            <CheckCircle className="mx-auto text-blue-200 mb-3" size={40} />
            <h1 className="text-2xl font-bold text-white">Welcome, {firstName}!</h1>
            <p className="text-blue-200 text-sm mt-2">Set up your Insurance Wheat Ridge account</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0954a5] pr-12 text-gray-900" placeholder="Create a password" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} value={confirmPw} onChange={e => setConfirmPw(e.target.value)} required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0954a5] pr-12 text-gray-900" placeholder="Confirm password" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-gray-400">(optional)</span></label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0954a5] text-gray-900" placeholder="(303) 555-1234" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-gray-400">(optional)</span></label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0954a5] text-gray-900" placeholder="123 Main St, Wheat Ridge, CO" />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={submitting}
              className="w-full bg-[#0954a5] text-white py-3 rounded-lg font-semibold hover:bg-[#073d7a] transition disabled:opacity-60">
              {submitting ? 'Setting up...' : 'Create My Account'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          Already have an account? <a href="/portal" className="text-[#0954a5] hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default function PortalSetupPage() {
  return <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>}><SetupForm /></Suspense>
}
