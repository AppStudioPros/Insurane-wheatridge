export default function sitemap() {
  const baseUrl = 'https://www.insurancewheatridge.com'
  const routes = [
    '/', '/about', '/contact',
    '/services/auto-insurance', '/services/home-insurance', '/services/life-insurance',
    '/services/business-insurance', '/services/renters-insurance', '/services/condo-insurance',
    '/privacy', '/terms', '/accessibility',
  ]
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
