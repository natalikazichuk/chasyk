// CHASIK: офлайн-кэш. Сначала сеть (чтобы обновления приходили), без сети — кэш.
const CACHE = 'chasyk-v10';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './img/m-wave.webp', './img/m-sleep.webp', './img/m-school.webp', './img/m-sport.webp'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }) // всегда сверяться с сервером, иначе обновления застревают
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
