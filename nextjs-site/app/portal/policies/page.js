'use client'
import { useState, useEffect } from 'react'
import PortalLayout, { usePortalAuth } from '@/components/portal-layout'
import { Car, Home, Heart, Briefcase, Building, ChevronDown, ChevronUp } from 'lucide-react'

const TYPE_ICONS = { auto: Car, home: Home, life: Heart, business: Briefcase, renters: Building, condo: Building }
const STATUS_COLORS = { active: 'bg-green-100 text-green-700', expired: 'bg-gray-100 text-gray-600', cancelled: 'bg-red-100 text-red-700' }

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PoliciesPage() {
  const { client, ready, logout, authFetch } = usePortalAuth()
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  const fetchPolicies = async () => {
    const t = sessionStorage.getItem('portal_token')
    if (!t) return
    try {
      const r = await fetch('/api/portal/policies?_t=' + Date.now(), { headers: { Authorization: 'Bearer ' + t }, cache: 'no-store' })
      if (!r.ok) return
      const d = await r.json()
      setPolicies(d ?? [])
    } catch (e) {}
    setLoading(false)
  }

  useEffect(() => { if (ready) fetchPolicies() }, [ready])
  useEffect(() => {
    if (!ready) return
    const id = setInterval(fetchPolicies, 5000)
    return () => clearInterval(id)
  }, [ready])

  if (!ready) return null

  return (
    <PortalLayout client={client} logout={logout}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Policies</h2>
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : policies.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No policies found.</div>
      ) : (
        <div className="space-y-3">
          {policies.map(p => {
            const Icon = TYPE_ICONS[p.policy_type] || Briefcase
            const isOpen = expanded === p.id
            return (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : p.id)}
                  className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0954a5] flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 capitalize">{p.policy_type} Insurance</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[p.status] || 'bg-gray-100 text-gray-600'}`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">#{p.policy_number} | {p.carrier}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    {p.premium_amount && (
                      <p className="font-semibold text-gray-900">${Number(p.premium_amount).toLocaleString()}/yr</p>
                    )}
                    <p className="text-xs text-gray-400">{formatDate(p.start_date)} - {formatDate(p.end_date)}</p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 border-t border-gray-50">
                    <div className="sm:hidden mb-3 pt-3">
                      {p.premium_amount && <p className="font-semibold text-gray-900">${Number(p.premium_amount).toLocaleString()}/yr</p>}
                      <p className="text-xs text-gray-400">{formatDate(p.start_date)} - {formatDate(p.end_date)}</p>
                    </div>
                    {p.coverage_summary ? (
                      <div className="bg-gray-50 rounded-lg p-4 mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Coverage Summary</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{p.coverage_summary}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 mt-3">No coverage summary available.</p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </PortalLayout>
  )
}
