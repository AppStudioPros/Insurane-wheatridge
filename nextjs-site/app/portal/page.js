'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn, Eye, EyeOff } from 'lucide-react'

export default function PortalLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/portal/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }
      sessionStorage.setItem('portal_token', data.token)
      sessionStorage.setItem('portal_client', JSON.stringify(data.client))
      router.push('/portal/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-[#0954a5] to-[#073d7a] px-6 py-10 text-center">
            <h1 className="text-2xl font-bold text-white">Client Portal</h1>
            <p className="text-blue-200 text-sm mt-2">Insurance Wheat Ridge</p>
          </div>
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0954a5] text-gray-900"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0954a5] pr-12 text-gray-900"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0954a5] text-white py-3 rounded-lg font-semibold hover:bg-[#073d7a] transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : <><LogIn size={18} /> Sign In</>}
            </button>
            <p className="text-center text-sm text-gray-400">
              <a href="#" className="hover:text-[#0954a5] transition">Forgot password?</a>
            </p>
            <p className="text-center text-sm text-gray-400 mt-2">
              Don&apos;t have an account? Contact your insurance agent.
            </p>
          </form>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          <a href="/" className="hover:text-[#0954a5] transition">Back to website</a>
        </p>
      </div>
    </div>
  )
}
