/**
 * Service Worker for PWA Support (Optional)
 * 
 * This enables offline functionality and app-like experience
 * Can be registered later when needed
 * 
 * To enable:
 * 1. Uncomment registration code in main.js
 * 2. Add actual caching strategies
 * 3. Test offline functionality
 */

const CACHE_NAME = 'farm-fresh-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/products.html',
  '/contact.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

