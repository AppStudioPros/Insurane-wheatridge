'use client'
import { useState, useEffect } from 'react'
import PortalLayout, { usePortalAuth } from '@/components/portal-layout'
import { Car, Home, Heart, Briefcase, Building, ChevronDown, ChevronUp, FileText, Image, Eye, Download, X } from 'lucide-react'

const TYPE_ICONS = { auto: Car, home: Home, life: Heart, business: Briefcase, renters: Building, condo: Building }
const STATUS_COLORS = { active: 'bg-green-100 text-green-700', expired: 'bg-gray-100 text-gray-600', cancelled: 'bg-red-100 text-red-700' }

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function formatFullDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function DocModal({ doc, onClose }) {
  if (!doc) return null
  const isImage = doc.file_type === 'image' || /\.(jpg|jpeg|png|gif|webp)$/i.test(doc.file_name || doc.name || '')
  const fileName = doc.file_name || doc.name || 'Document'
  const fileUrl = doc.file_url || doc.url
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Document Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-xs text-gray-500">File Name</span><p className="font-medium truncate">{fileName}</p></div>
            <div><span className="text-xs text-gray-500">File Type</span><p className="font-medium uppercase">{doc.file_type || doc.type || '—'}</p></div>
            {doc.category && <div><span className="text-xs text-gray-500">Category</span><p className="font-medium capitalize">{doc.category.replace(/_/g, ' ')}</p></div>}
            {doc.created_at && <div><span className="text-xs text-gray-500">Uploaded</span><p className="font-medium">{formatFullDate(doc.created_at)}{doc.uploaded_by ? ` by ${doc.uploaded_by}` : ''}</p></div>}
          </div>
          {doc.notes && <div><span className="text-xs text-gray-500">Notes</span><p className="text-sm mt-1">{doc.notes}</p></div>}
          {fileUrl && isImage && (
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <img src={fileUrl} alt={fileName} className="w-full max-h-64 object-contain bg-gray-50" />
            </div>
          )}
          {fileUrl && !isImage && (
            <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-500">
              <FileText size={24} className="mx-auto mb-2 text-red-400" />
              PDF Document — use Download or View to open
            </div>
          )}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            {fileUrl && (
              <>
                <a href={fileUrl} download={fileName} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-[#073d7a] transition">
                  <Download size={14} /> Download
                </a>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-gray-200 transition">
                  <Eye size={14} /> View
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PoliciesPage() {
  const { client, ready, logout, authFetch } = usePortalAuth()
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [selectedDoc, setSelectedDoc] = useState(null)

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
                    <div className="sm:hidden mb-3 pt-3">
                      {p.premium_amount && <p className="font-semibold text-gray-900">${Number(p.premium_amount).toLocaleString()}/yr</p>}
                      <p className="text-xs text-gray-400">{formatDate(p.start_date)} - {formatDate(p.end_date)}</p>
                    </div>

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

                    {p.documents && p.documents.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Policy Documents</h4>
                        <div className="space-y-2">
                          {p.documents.map(doc => {
                            const isImage = doc.type === 'image' || /\.(jpg|jpeg|png|gif|webp)$/i.test(doc.name || '')
                            return (
                              <button
                                key={doc.id}
                                onClick={() => setSelectedDoc(doc)}
                                className="w-full flex items-center gap-2 text-sm text-[#0954a5] hover:text-blue-700 bg-blue-50 rounded-lg px-3 py-2 transition hover:bg-blue-100 text-left"
                              >
                                {isImage ? <Image size={16} className="shrink-0" /> : <FileText size={16} className="shrink-0" />}
                                <span className="truncate">{doc.name || 'Policy Document'}</span>
                                <Eye size={14} className="shrink-0 ml-auto opacity-60" />
                              </button>
                            )
                          })}
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

      <DocModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </PortalLayout>
  )
}
