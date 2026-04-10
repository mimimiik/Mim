const CACHE_NAME = 'mim-cache-v1';
const urlsToCache = [
  '.',
  'index.html',
  'css/main.css',
  'js/app.js',
  'js/auth.js',
  'js/chat.js',
  'js/contacts.js',
  'js/settings.js',
  'js/profile.js',
  'js/ai.js',
  'js/utils.js',
  'manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
