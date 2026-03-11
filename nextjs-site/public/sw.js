const CACHE_NAME = 'iw-insurance-v1'
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['/', '/manifest.json'])))
  self.skipWaiting()
})
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))))
  self.clients.claim()
})
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (url.origin !== location.origin) return
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(fetch(request).then((r) => { const c = r.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(request, c)); return r }).catch(() => caches.match(request)))
    return
  }
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((r) => { const c = r.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(request, c)); return r })))
})
