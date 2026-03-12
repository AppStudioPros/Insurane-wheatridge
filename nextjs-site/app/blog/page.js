import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { blogPosts } from '@/lib/blog-posts'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Insurance Blog | Tips & Guides for Wheat Ridge Residents',
  description: 'Read helpful insurance tips, guides, and local insights from Jubal Terry, your Farmers Insurance agent in Wheat Ridge, Colorado. Auto, home, life, business, and renters insurance advice.',
}

export default function BlogPage() {
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Insurance Insights</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">Helpful tips, local knowledge, and straightforward advice to help you make smarter insurance decisions.</p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10]">
                  <Image src={featured.image} alt={featured.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">{featured.category}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={14} />{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock size={14} />{featured.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">{featured.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-gray-500"><User size={14} />{featured.author}</span>
                    <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-3 transition-all">Read Article <ArrowRight size={16} /></span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of Posts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">More Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rest.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-[16/10]">
                      <Image src={post.image} alt={post.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><Calendar size={12} />{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{post.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500"><User size={12} />{post.author}</span>
                        <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight size={14} /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Insurance Questions?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">I&apos;m always happy to answer your questions — no pressure, no sales pitch. Just honest advice from your local agent.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:3034641911" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition">(303) 464-1911</a>
            <a href="mailto:info@insurancewheatridge.com" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition">info@insurancewheatridge.com</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
