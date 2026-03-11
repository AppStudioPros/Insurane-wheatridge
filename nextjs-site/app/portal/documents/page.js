'use client'
import { useState, useEffect } from 'react'
import PortalLayout, { usePortalAuth } from '@/components/portal-layout'
import { Upload, FileText, Image, Eye, Plus, X } from 'lucide-react'

const CATEGORIES = [
  { value: 'id', label: 'ID' },
  { value: 'proof_of_residence', label: 'Proof of Residence' },
  { value: 'claim_photo', label: 'Claim Photo' },
  { value: 'signature', label: 'Signature' },
  { value: 'other', label: 'Other' },
]

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
  const [preview, setPreview] = useState(null)

  const fetchDocs = () => {
    authFetch('/api/portal/documents').then(r => r?.json()).then(d => {
      setDocs(d ?? [])
      setLoading(false)
    })
  }

  useEffect(() => { if (ready) fetchDocs() }, [ready])

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
            <div key={doc.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                doc.file_type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'
              }`}>
                {doc.file_type === 'pdf' ? <FileText size={20} /> : <Image size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{doc.file_name}</p>
                <p className="text-xs text-gray-500">
                  {CATEGORIES.find(c => c.value === doc.category)?.label || doc.category} | {formatDate(doc.created_at)} | by {doc.uploaded_by}
                </p>
                {doc.notes && <p className="text-xs text-gray-400 mt-0.5">{doc.notes}</p>}
              </div>
              {doc.file_url && (
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-[#0954a5] hover:text-[#073d7a]">
                  <Eye size={18} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-auto p-4">
            <img src={preview} alt="Document preview" className="max-w-full" />
          </div>
        </div>
      )}
    </PortalLayout>
  )
}
