import { blogPosts } from '@/lib/blog-posts'

export default function sitemap() {
  const baseUrl = 'https://www.insurancewheatridge.com'
  const routes = [
    '/', '/about', '/contact', '/blog',
    '/services/auto-insurance', '/services/home-insurance', '/services/life-insurance',
    '/services/business-insurance', '/services/renters-insurance', '/services/condo-insurance',
    '/privacy', '/terms', '/accessibility',
  ]

  const pages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/blog' ? 0.9 : 0.8,
  }))

  const posts = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...pages, ...posts]
}
