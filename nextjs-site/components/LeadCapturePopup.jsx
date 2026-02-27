'use client'
import { useState, useEffect } from 'react'
import { X, Phone } from 'lucide-react'

const STORAGE_KEY = 'iwr_lead_popup_dismissed'
const DELAY_MS = 30000 // 30 seconds

export default function LeadCapturePopup() {
  const [visible, setVisible]     = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)

  useEffect(() => {
    // Don't show if already dismissed or submitted
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = {
      firstName: form.elements.namedItem('firstName').value,
      email:     form.elements.namedItem('email').value,
      phone:     form.elements.namedItem('phone').value,
      website:   form.elements.namedItem('website')?.value ?? '',
    }

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
      localStorage.setItem(STORAGE_KEY, '1')
      setTimeout(() => setVisible(false), 3000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ animation: 'popupEnter 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 px-6 pt-6 pb-5 text-white">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-2 mb-3">
            <Phone size={18} className="text-yellow-300" />
            <span className="text-sm font-semibold text-yellow-300 uppercase tracking-wide">Free Quote</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-1">
            Not Sure What Coverage You Need?
          </h2>
          <p className="text-white/80 text-sm">Let's Talk. Get Your Free Quote Today!</p>
        </div>

        {/* Body */}
        <div className="bg-white px-6 py-5">
          {submitted ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">You're all set!</h3>
              <p className="text-gray-500 text-sm">Jubal will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
              />

              <div>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First Name *"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address *"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (optional)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {error && <p className="text-red-500 text-xs text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-white text-sm transition disabled:opacity-60"
                style={{ background: '#CC0000' }}
              >
                {loading ? 'Sending...' : 'Get My Free Quote →'}
              </button>

              <p className="text-center text-xs text-gray-400">
                No spam. No obligation. Just a real conversation.
              </p>

              <button
                type="button"
                onClick={dismiss}
                className="w-full text-xs text-gray-400 hover:text-gray-600 transition py-1"
              >
                No thanks, I'm all set
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
