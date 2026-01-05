// NEW NAME: cosmic-v2
// This change forces your phone to delete the old version and get the new buttons.
const CACHE_NAME = 'cosmic-v2'; 
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// INSTALL: Force the new version to take over immediately
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVATE: Delete any old caches (like v1 or doll-receipts)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// FETCH: Serve from cache if available, otherwise go to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
