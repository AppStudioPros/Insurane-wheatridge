import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { blogPosts } from '@/lib/blog-posts'
import { Calendar, Clock, User, ArrowLeft, Phone, Mail } from 'lucide-react'

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }],
    },
  }
}

function renderContent(content) {
  const lines = content.trim().split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{line.replace('## ', '')}</h2>)
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} className="font-bold text-gray-900 mt-6 mb-2">{line.replace(/\*\*/g, '')}</p>)
    } else if (line.startsWith('**') && line.includes('**')) {
      const parts = line.split(/\*\*/g)
      elements.push(
        <p key={i} className="text-gray-700 leading-relaxed mb-4">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
        </p>
      )
    } else if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        const text = lines[i].replace('- ', '')
        const parts = text.split(/\*\*/g)
        items.push(
          <li key={i} className="text-gray-700">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </li>
        )
        i++
      }
      elements.push(<ul key={`ul-${i}`} className="list-disc pl-6 space-y-2 mb-6">{items}</ul>)
      continue
    } else if (line.startsWith('*—') || line.startsWith('*— ')) {
      elements.push(<p key={i} className="text-gray-500 italic mt-6">{line.replace(/\*/g, '')}</p>)
    } else if (line.includes('[(303)')) {
      elements.push(
        <div key={i} className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8 mb-6">
          <p className="text-lg font-semibold text-gray-900 mb-3">Ready to talk?</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:3034641911" className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
              <Phone size={18} />(303) 464-1911
            </a>
            <a href="mailto:info@insurancewheatridge.com" className="flex items-center gap-2 bg-white text-blue-700 border border-blue-300 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              <Mail size={18} />info@insurancewheatridge.com
            </a>
          </div>
        </div>
      )
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      const parts = line.split(/\*\*/g)
      if (parts.length > 1) {
        elements.push(
          <p key={i} className="text-gray-700 leading-relaxed mb-4">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </p>
        )
      } else {
        elements.push(<p key={i} className="text-gray-700 leading-relaxed mb-4">{line}</p>)
      }
    }
    i++
  }
  return elements
}

export default function BlogPost({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const postIndex = blogPosts.indexOf(post)
  const relatedPosts = blogPosts.filter((_, i) => i !== postIndex).slice(0, 2)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://www.insurancewheatridge.com${post.image}`,
    "datePublished": post.date,
    "author": { "@type": "Person", "name": post.author, "jobTitle": "Farmers Insurance Agent" },
    "publisher": { "@type": "Organization", "name": "Insurance Wheat Ridge" },
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium mb-6"><ArrowLeft size={16} />Back to Blog</Link>

            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium text-xs">{post.category}</span>
              <span className="flex items-center gap-1"><Calendar size={14} />{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Clock size={14} />{post.readTime}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">Farmers Insurance Agent | Wheat Ridge, CO</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-10 aspect-[16/9]">
              <Image src={post.image} alt={post.imageAlt} fill className="object-cover" priority />
            </div>

            <div className="prose-custom">
              {renderContent(post.content)}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                    <div className="relative aspect-[16/10]">
                      <Image src={rp.image} alt={rp.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{rp.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{rp.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
