'use client'
import { useState, useEffect } from 'react'
import PortalLayout, { usePortalAuth } from '@/components/portal-layout'
import { Upload, FileText, Image, Eye, Plus, X, Download } from 'lucide-react'

const CATEGORIES = [
  { value: 'id', label: 'ID' },
  { value: 'proof_of_residence', label: 'Proof of Residence' },
  { value: 'claim_photo', label: 'Claim Photo' },
  { value: 'signature', label: 'Signature' },
  { value: 'other', label: 'Other' },
]

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
function formatShortDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function DocModal({ doc, onClose }) {
  if (!doc) return null
  const isImage = doc.file_type === 'image' || /\.(jpg|jpeg|png|gif|webp)$/i.test(doc.file_name || '')
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Document Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-xs text-gray-500">File Name</span><p className="font-medium truncate">{doc.file_name}</p></div>
            <div><span className="text-xs text-gray-500">File Type</span><p className="font-medium uppercase">{doc.file_type || '—'}</p></div>
            <div><span className="text-xs text-gray-500">Category</span><p className="font-medium capitalize">{(doc.category || 'other').replace(/_/g, ' ')}</p></div>
            <div><span className="text-xs text-gray-500">Uploaded</span><p className="font-medium">{formatDate(doc.created_at)} by {doc.uploaded_by}</p></div>
          </div>
          {doc.notes && <div><span className="text-xs text-gray-500">Notes</span><p className="text-sm mt-1">{doc.notes}</p></div>}
          {doc.file_url && isImage && (
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <img src={doc.file_url} alt={doc.file_name} className="w-full max-h-64 object-contain bg-gray-50" />
            </div>
          )}
          {doc.file_url && !isImage && (
            <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-500">
              <FileText size={24} className="mx-auto mb-2 text-red-400" />
              PDF Document — use Download or View to open
            </div>
          )}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            {doc.file_url && (
              <>
                <a href={doc.file_url} download={doc.file_name} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-[#073d7a] transition">
                  <Download size={14} /> Download
                </a>
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-gray-200 transition">
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

export default function DocumentsPage() {
  const { client, ready, logout, authFetch } = usePortalAuth()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [category, setCategory] = useState('other')
  const [notes, setNotes] = useState('')
  const [file, setFile] = useState(null)
  const [selectedDoc, setSelectedDoc] = useState(null)

  const fetchDocs = async () => {
    const t = sessionStorage.getItem('portal_token')
    if (!t) return
    try {
      const r = await fetch('/api/portal/documents?_t=' + Date.now(), { headers: { Authorization: 'Bearer ' + t }, cache: 'no-store' })
      if (!r.ok) return
      const d = await r.json()
      setDocs(d ?? [])
    } catch (e) {}
    setLoading(false)
  }

  useEffect(() => { if (ready) fetchDocs() }, [ready])
  useEffect(() => {
    if (!ready) return
    const id = setInterval(fetchDocs, 5000)
    return () => clearInterval(id)
  }, [ready])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    form.append('category', category)
    form.append('notes', notes)
    
    const res = await authFetch('/api/portal/documents', { method: 'POST', body: form })
    if (res?.ok) {
      setShowUpload(false)
      setFile(null)
      setNotes('')
      setCategory('other')
      fetchDocs()
    }
    setUploading(false)
  }

  if (!ready) return null

  return (
    <PortalLayout client={client} logout={logout}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition flex items-center gap-2"
        >
          <Plus size={16} /> Upload
        </button>
      </div>

      {showUpload && (
        <form onSubmit={handleUpload} className="bg-white rounded-xl border border-gray-100 p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Upload Document</h3>
            <button type="button" onClick={() => setShowUpload(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File (PDF, JPG, PNG)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={e => setFile(e.target.files[0])}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-[#0954a5] file:font-medium hover:file:bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0954a5]"
            >
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0954a5]"
              placeholder="Any additional notes..."
            />
          </div>
          <button
            type="submit"
            disabled={!file || uploading}
            className="bg-[#0954a5] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition disabled:opacity-60"
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : docs.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No documents uploaded yet.</div>
      ) : (
        <div className="space-y-3">
          {docs.map(doc => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="w-full bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 text-left hover:shadow-md transition"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                doc.file_type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'
              }`}>
                {doc.file_type === 'pdf' ? <FileText size={20} /> : <Image size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{doc.file_name}</p>
                <p className="text-xs text-gray-500">
                  {CATEGORIES.find(c => c.value === doc.category)?.label || doc.category} | {formatShortDate(doc.created_at)} | by {doc.uploaded_by}
                </p>
                {doc.notes && <p className="text-xs text-gray-400 mt-0.5">{doc.notes}</p>}
              </div>
              <Eye size={18} className="text-[#0954a5] shrink-0" />
            </button>
          ))}
        </div>
      )}

      <DocModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </PortalLayout>
  )
}
