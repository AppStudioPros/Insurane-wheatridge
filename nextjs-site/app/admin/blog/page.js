'use client'
import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { ArrowLeft, Plus, Edit, Trash2, Eye, Save, Send, FileText, X, Image as ImageIcon, Clock } from 'lucide-react'

const BlogEditor = dynamic(() => import('@/components/blog-editor'), { ssr: false })

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'auto', label: 'Auto Insurance' },
  { value: 'home', label: 'Home Insurance' },
  { value: 'life', label: 'Life Insurance' },
  { value: 'business', label: 'Business Insurance' },
  { value: 'renters', label: 'Renters Insurance' },
  { value: 'tips', label: 'Tips & Advice' },
  { value: 'news', label: 'Industry News' },
  { value: 'local', label: 'Wheat Ridge / Local' },
]

const TEMPLATES = [
  { value: 'standard', label: '📝 Standard Article', desc: 'Featured image + body text', content: '<h2>Introduction</h2><p>Start with a compelling hook that draws readers in...</p><h2>Main Point</h2><p>Develop your key argument or information here...</p><h2>Key Takeaways</h2><ul><li>First takeaway</li><li>Second takeaway</li><li>Third takeaway</li></ul><h2>Conclusion</h2><p>Wrap up and include a call to action...</p>' },
  { value: 'guide', label: '📋 Step-by-Step Guide', desc: 'Numbered sections with headers', content: '<h2>What You Need to Know</h2><p>Brief overview of what this guide covers and why it matters...</p><h2>Step 1: Getting Started</h2><p>Explain the first step in detail...</p><h2>Step 2: Next Steps</h2><p>Continue with the process...</p><h2>Step 3: Final Steps</h2><p>Wrap up the process...</p><h2>Common Mistakes to Avoid</h2><ul><li>Mistake one and how to avoid it</li><li>Mistake two and how to avoid it</li></ul><h2>Need Help?</h2><p>Contact us at (303) 464-1911 for personalized guidance.</p>' },
  { value: 'faq', label: '❓ FAQ Format', desc: 'Question & answer style', content: '<p>We hear these questions all the time. Here are clear, honest answers from your local insurance expert.</p><hr /><h3>What does this type of insurance cover?</h3><p>Answer this question thoroughly and clearly...</p><hr /><h3>How much does it typically cost?</h3><p>Give helpful context about pricing factors...</p><hr /><h3>Do I really need this coverage?</h3><p>Be honest about when it matters and when it might not...</p><hr /><h3>How do I file a claim?</h3><p>Walk through the process step by step...</p><hr /><h3>Still have questions?</h3><p>Call us at (303) 464-1911 or <a href="/contact">send us a message</a>. We are happy to help.</p>' },
  { value: 'comparison', label: '⚖️ Comparison', desc: 'Side-by-side breakdown', content: '<h2>Overview</h2><p>When choosing between these options, it helps to understand the key differences...</p><h2>Option A</h2><h3>Pros</h3><ul><li>Pro one</li><li>Pro two</li></ul><h3>Cons</h3><ul><li>Con one</li><li>Con two</li></ul><h2>Option B</h2><h3>Pros</h3><ul><li>Pro one</li><li>Pro two</li></ul><h3>Cons</h3><ul><li>Con one</li><li>Con two</li></ul><h2>Which One Is Right for You?</h2><p>Help the reader decide based on their situation...</p><h2>Let Us Help You Choose</h2><p>Every situation is different. <a href="/contact">Contact us</a> for a free consultation to find the right coverage for your needs.</p>' },
  { value: 'blank', label: '✨ Blank', desc: 'Start from scratch', content: '' },
]

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80)
}

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}


// Compress image before upload (Vercel has 4.5MB limit)
async function compressImage(file, maxWidth = 1600, quality = 0.8) {
  if (file.size < 1024 * 1024) return file // Skip if under 1MB
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let w = img.width, h = img.height
      if (w > maxWidth) { h = (h * maxWidth) / w; w = maxWidth }
      canvas.width = w; canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }))
      }, 'image/jpeg', quality)
    }
    img.src = URL.createObjectURL(file)
  })
}

export default function AdminBlog() {
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // list | edit | preview | template
  const [current, setCurrent] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  // Auth
  useEffect(() => {
    const t = sessionStorage.getItem('iwr_admin_token')
    if (t) { setToken(t); setAuthed(true) }
  }, [])

  const login = (e) => {
    e.preventDefault()
    sessionStorage.setItem('iwr_admin_token', token)
    setAuthed(true)
  }

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    const t = sessionStorage.getItem('iwr_admin_token')
    if (!t) return
    try {
      const r = await fetch('/api/admin/blog', { headers: { Authorization: `Bearer ${t}` } })
      if (r.ok) setPosts(await r.json())
    } catch (e) {}
    setLoading(false)
  }, [])

  useEffect(() => { if (authed) fetchPosts() }, [authed, fetchPosts])

  // Image upload
  const handleImageUpload = async (file) => {
    const t = sessionStorage.getItem('iwr_admin_token')
    const compressed = await compressImage(file)
    const form = new FormData()
    form.append('file', compressed)
    try {
      const r = await fetch('/api/admin/blog-upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${t}` },
        body: form,
      })
      const d = await r.json()
      if (r.ok && d.url) {
        return d.url
      } else {
        setMsg('Image upload failed: ' + (d.error || 'Unknown error'))
      }
    } catch (e) {
      setMsg('Image upload failed: ' + e.message)
    }
    return null
  }

  // Featured image upload
  const [uploadingFeatured, setUploadingFeatured] = useState(false)
  const handleFeaturedImage = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingFeatured(true)
    const url = await handleImageUpload(file)
    if (url) setCurrent(c => ({ ...c, featured_image: url }))
    setUploadingFeatured(false)
    e.target.value = ''
  }

  // Save post
  const savePost = async (status) => {
    const t = sessionStorage.getItem('iwr_admin_token')
    setSaving(true)
    setMsg('')
    
    const payload = {
      ...current,
      status: status || current.status || 'draft',
      slug: current.slug || slugify(current.title || 'untitled'),
      published_at: current.published_at || (status === 'published' ? new Date().toISOString() : null),
      status: status,
    }
    // If scheduling, ensure we have a future date
    if (status === 'scheduled' && !current.published_at) {
      setMsg('Please set a publish date before scheduling.')
      setSaving(false)
      return
    }
    
    try {
      const method = current.id ? 'PATCH' : 'POST'
      const r = await fetch('/api/admin/blog', {
        method,
        headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (r.ok) {
        const d = await r.json()
        setCurrent(d)
        setMsg(status === 'published' ? 'Published!' : status === 'scheduled' ? '⏰ Scheduled!' : 'Saved as draft.')
        fetchPosts()
        if (status === 'published' || status === 'scheduled') {
          setTimeout(() => { setView('list'); setCurrent(null); setMsg('') }, 1500)
        }
      } else {
        const err = await r.json()
        setMsg('Error: ' + (err.error || 'Failed to save'))
      }
    } catch (e) {
      setMsg('Error saving post.')
    }
    setSaving(false)
  }

  // Delete post
  const deletePost = async (id) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    const t = sessionStorage.getItem('iwr_admin_token')
    await fetch('/api/admin/blog', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchPosts()
  }

  // New post - show template picker
  const newPost = () => {
    setCurrent({
      title: '', slug: '', excerpt: '', content: '', featured_image: '',
      category: 'general', tags: [], status: 'draft', author: 'Jubal Terry',
      meta_title: '', meta_description: '', template: 'standard',
    })
    setView('template')
  }

  const selectTemplate = (tpl) => {
    setCurrent(c => ({ ...c, template: tpl.value, content: tpl.content }))
    setView('edit')
  }

  const editPost = (post) => {
    setCurrent({ ...post })
    setView('edit')
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
          <h2 className="text-xl font-bold text-center">Blog Admin</h2>
          <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="Admin password" className="w-full px-3 py-2 border rounded-lg" />
          <button type="submit" className="w-full bg-[#0954a5] text-white py-2 rounded-lg font-medium">Sign In</button>
        </form>
      </div>
    )
  }

  // Template picker
  if (view === 'template') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
            <ArrowLeft size={16} /> Back to Posts
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Template</h2>
          <p className="text-gray-500 mb-6">Pick a starting structure for your post. You can customize everything after.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEMPLATES.map(tpl => (
              <button
                key={tpl.value}
                onClick={() => selectTemplate(tpl)}
                className="bg-white rounded-xl border border-gray-100 p-5 text-left hover:shadow-md hover:border-[#0954a5] transition group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-[#0954a5] text-lg mb-1">{tpl.label}</h3>
                <p className="text-sm text-gray-500">{tpl.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Preview
  if (view === 'preview' && current) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setView('edit')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft size={16} /> Back to Editor
            </button>
            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">Preview Mode</span>
          </div>
          <article className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {current.featured_image && (
              <img src={current.featured_image} alt={current.title} className="w-full h-64 object-cover" />
            )}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <span className="capitalize">{current.category}</span>
                <span>•</span>
                <span>{current.author || 'Jubal Terry'}</span>
                <span>•</span>
                <span>{formatDate(current.published_at || new Date().toISOString())}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{current.title || 'Untitled Post'}</h1>
              {current.excerpt && <p className="text-lg text-gray-600 mb-6">{current.excerpt}</p>}
              <div className="prose prose-sm sm:prose max-w-none" dangerouslySetInnerHTML={{ __html: current.content }} />
            </div>
          </article>
        </div>
      </div>
    )
  }

  // Editor
  if (view === 'edit' && current) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <button onClick={() => { setView('list'); setCurrent(null); setMsg('') }} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft size={16} /> Back to Posts
            </button>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => setView('preview')} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-gray-200">
                <Eye size={14} /> Preview
              </button>
              <button onClick={() => savePost('draft')} disabled={saving} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-gray-200 disabled:opacity-60">
                <Save size={14} /> {saving ? 'Saving...' : 'Save Draft'}
              </button>
              <button onClick={() => savePost('scheduled')} disabled={saving} className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600 disabled:opacity-60">
                <Clock size={14} /> Schedule
              </button>
              <button onClick={() => savePost('published')} disabled={saving} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 hover:bg-[#073d7a] disabled:opacity-60">
                <Send size={14} /> {saving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>

          {msg && (
            <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${msg.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {msg}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-4">
              <input
                type="text"
                value={current.title}
                onChange={e => setCurrent({ ...current, title: e.target.value, slug: current.id ? current.slug : slugify(e.target.value) })}
                placeholder="Post Title"
                className="w-full px-4 py-3 text-2xl font-bold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0954a5] bg-white"
              />
              <BlogEditor
                content={current.content}
                onChange={(html) => setCurrent(c => ({ ...c, content: html }))}
                onImageUpload={handleImageUpload}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Featured Image */}
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2"><ImageIcon size={14} /> Featured Image</h3>
                {current.featured_image ? (
                  <div className="relative">
                    <img src={current.featured_image} alt="Featured" className="w-full h-32 object-cover rounded-lg" />
                    <button onClick={() => setCurrent({ ...current, featured_image: '' })} className="absolute top-2 right-2 bg-white/90 rounded-full p-1 hover:bg-white">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="block border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-[#0954a5] transition">
                    <ImageIcon size={24} className="mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">{uploadingFeatured ? 'Uploading...' : 'Click to upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFeaturedImage} disabled={uploadingFeatured} />
                  </label>
                )}
              </div>

              {/* Post Settings */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">Post Settings</h3>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">URL Slug</label>
                  <input type="text" value={current.slug} onChange={e => setCurrent({ ...current, slug: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Excerpt</label>
                  <textarea value={current.excerpt} onChange={e => setCurrent({ ...current, excerpt: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="Brief summary for the blog listing..." />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Category</label>
                  <select value={current.category} onChange={e => setCurrent({ ...current, category: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Author</label>
                  <input type="text" value={current.author} onChange={e => setCurrent({ ...current, author: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Publish Date</label>
                  <input type="datetime-local" value={current.published_at ? new Date(current.published_at).toISOString().slice(0, 16) : ''} onChange={e => setCurrent({ ...current, published_at: e.target.value ? new Date(e.target.value).toISOString() : null })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  <p className="text-[10px] text-gray-400 mt-0.5">{current.status === 'scheduled' ? '⏰ Post will auto-publish at this time' : 'Leave blank for current time, or set future date to schedule'}</p>
                </div>
              </div>

              {/* SEO */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">SEO Settings</h3>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Meta Title</label>
                  <input type="text" value={current.meta_title} onChange={e => setCurrent({ ...current, meta_title: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="Custom title for search engines" />
                  <p className="text-[10px] text-gray-400 mt-0.5">{(current.meta_title || current.title || '').length}/60 characters</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Meta Description</label>
                  <textarea value={current.meta_description} onChange={e => setCurrent({ ...current, meta_description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="Description for search results" />
                  <p className="text-[10px] text-gray-400 mt-0.5">{(current.meta_description || '').length}/160 characters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Post list
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <a href="/admin" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-1">
              <ArrowLeft size={14} /> Back to Admin
            </a>
            <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          </div>
          <button onClick={newPost} className="bg-[#0954a5] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition flex items-center gap-2">
            <Plus size={16} /> New Post
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <FileText size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 mb-4">No blog posts yet. Create your first one!</p>
            <button onClick={newPost} className="bg-[#0954a5] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#073d7a] transition">
              Create Post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
                {post.featured_image ? (
                  <img src={post.featured_image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <FileText size={20} className="text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 truncate">{post.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      post.status === 'published' ? 'bg-green-100 text-green-700' : 
                      post.status === 'scheduled' ? 'bg-amber-100 text-amber-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.status}{post.status === 'scheduled' && post.published_at ? ` · ${new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}` : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{post.excerpt || 'No excerpt'}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {post.category} • {formatDate(post.published_at || post.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => editPost(post)} className="p-2 text-gray-400 hover:text-[#0954a5] rounded-lg hover:bg-blue-50">
                    <Edit size={16} />
                  </button>
                  {post.status === 'published' && (
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50">
                      <Eye size={16} />
                    </a>
                  )}
                  <button onClick={() => deletePost(post.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
