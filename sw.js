// Chishti Portal service worker: app shell offline + safe caching.
const V = 'cpa-v4';
const SHELL = ['./', 'index.html', 'extras.js', 'extras2.js', 'data3.js', 'portal-ui.js', 'portal-tools.js', 'portal-pro.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.pathname.startsWith('/api/')) return;                       // AI calls: always live
  if (u.hostname.endsWith('supabase.co')) return;                   // analytics/registrations: always live
  const same = u.origin === location.origin;
  const data = /raw\.githubusercontent\.com|api\.github\.com|data\.jsdelivr\.net|cdn\.jsdelivr\.net\/gh\//.test(u.host + u.pathname);
  if (same && (r.mode === 'navigate' || /\.(html|js)$/.test(u.pathname) || u.pathname.endsWith('/'))) {
    // network first, cache fallback (so updates arrive but offline still works)
    e.respondWith(fetch(r).then(x => { const c = x.clone(); caches.open(V).then(ch => ch.put(r, c)); return x; }).catch(() => caches.match(r).then(m => m || caches.match('index.html'))));
    return;
  }
  if (same || data || /cdnjs|jsdelivr|fonts\.g/.test(u.host)) {
    // stale-while-revalidate
    e.respondWith(caches.match(r).then(m => { const n = fetch(r).then(x => { if (x && x.ok) { const c = x.clone(); caches.open(V).then(ch => ch.put(r, c)); } return x; }).catch(() => m); return m || n; }));
  }
});
