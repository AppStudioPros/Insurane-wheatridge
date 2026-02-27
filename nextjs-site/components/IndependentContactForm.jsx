'use client'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

const COVERAGE_TYPES = [
  'Auto Insurance',
  'Home Insurance',
  'Renters Insurance',
  'Life Insurance',
  'Business Insurance',
  'Other',
]

export default function IndependentContactForm({ apiEndpoint = '/api/independent-contact' }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = {
      name:          form.elements.namedItem('name').value,
      email:         form.elements.namedItem('email').value,
      phone:         form.elements.namedItem('phone').value,
      insuranceType: form.elements.namedItem('insuranceType').value,
      message:       form.elements.namedItem('message').value,
      website:       form.elements.namedItem('website')?.value ?? '',
    }

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? 'Something went wrong.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="text-green-500 mb-4" size={48} />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Received!</h3>
        <p className="text-gray-600">
          Thank you for reaching out. Jubal will review your situation and get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', opacity: 0, height: 0, width: 0, zIndex: -1, pointerEvents: 'none' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="(303) 000-0000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Type Needed</label>
          <select
            name="insuranceType"
            defaultValue="Other"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
          >
            {COVERAGE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your situation</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Briefly describe what you're looking for or why you need alternative coverage..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <Send size={18} />
        {loading ? 'Sending...' : 'Send My Inquiry'}
      </button>
    </form>
  )
}
