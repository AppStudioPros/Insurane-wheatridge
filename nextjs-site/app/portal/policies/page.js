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
                  <div className="px-4 pb-4 border-t border-gray-100">
                    {/* Mobile-only date/premium */}
                    <div className="sm:hidden mb-3 pt-3">
                      {p.premium_amount && <p className="font-semibold text-gray-900">${Number(p.premium_amount).toLocaleString()}/yr</p>}
                      <p className="text-xs text-gray-400">{formatDate(p.start_date)} - {formatDate(p.end_date)}</p>
                    </div>

                    {/* Policy Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Policy Number</p>
                        <p className="text-sm font-medium text-gray-900">#{p.policy_number}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Carrier</p>
                        <p className="text-sm font-medium text-gray-900">{p.carrier || 'Farmers Insurance'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Status</p>
                        <p className="text-sm font-medium text-gray-900 capitalize">{p.status}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Effective Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(p.start_date)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Expiration Date</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(p.end_date)}</p>
                      </div>
                      {p.premium_amount && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Annual Premium</p>
                          <p className="text-sm font-medium text-gray-900">${Number(p.premium_amount).toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    {/* Coverage Summary */}
                    {(() => {
                      const cs = p.coverage_summary
                        ? (typeof p.coverage_summary === 'string'
                          ? (() => { try { return JSON.parse(p.coverage_summary) } catch { return null } })()
                          : p.coverage_summary)
                        : null
                      if (!cs) return null
                      const labels = {
                        deductible: 'Deductible', agent_name: 'Agent', property_address: 'Property Address',
                        interior_coverage: 'Interior Coverage', dwelling_coverage: 'Dwelling Coverage',
                        liability_limit: 'Liability Limit', vin: 'VIN', vehicle_info: 'Vehicle',
                        insured_drivers: 'Insured Drivers', liability_limits: 'Liability Limits',
                        member_id: 'Member ID', group_number: 'Group Number', plan_name: 'Plan Name',
                        pcp_name: 'Primary Care Physician', copay_info: 'Copay', rx_bin: 'RX Bin/PCN',
                        text: 'Notes', assessment: 'Assessment', address: 'Address',
                      }
                      const entries = typeof cs === 'object' && !Array.isArray(cs)
                        ? Object.entries(cs).filter(([_, v]) => v && String(v).trim())
                        : null
                      if (!entries || entries.length === 0) return null
                      return (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Coverage Details</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {entries.map(([key, val]) => (
                              <div key={key}>
                                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                                  {labels[key] || key.replace(/_/g, ' ')}
                                </p>
                                <p className="text-sm text-gray-900">{String(val)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })()}

                    {/* Policy Documents */}
                    {p.documents && p.documents.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Policy Documents</h4>
                        <div className="space-y-2">
                          {p.documents.map(doc => (
                            <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-[#0954a5] hover:text-blue-700 bg-blue-50 rounded-lg px-3 py-2 transition hover:bg-blue-100">
                              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              {doc.name || 'Policy Document'}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {(!p.coverage_summary && (!p.documents || p.documents.length === 0)) && (
                      <p className="text-sm text-gray-400 text-center py-2">No additional details available.</p>
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
