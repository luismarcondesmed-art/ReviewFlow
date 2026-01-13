const CACHE_NAME = 'reviewflow-v7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png'
];

// Install Event: Cache core assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event: Clean up old caches immediately to prevent serving stale app versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // Strategy 1: Network First for HTML/Navigation (Ensure fresh updates)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // Strategy 2: Stale-While-Revalidate for static assets (Images, Fonts, etc)
  if (
    url.pathname.match(/\.(png|jpg|jpeg|svg|json|woff2|ico)$/) ||
    ASSETS.includes(url.pathname)
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {
           // Network failed, rely on cache
        });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Strategy 3: Cache First for JS/CSS (Vite hashes filenames, so if the name changes, it's new)
  if (url.pathname.match(/\.(js|css)$/)) {
      event.respondWith(
          caches.match(event.request).then((cachedResponse) => {
              if (cachedResponse) return cachedResponse;
              return fetch(event.request).then((networkResponse) => {
                  if (networkResponse && networkResponse.status === 200) {
                      const responseClone = networkResponse.clone();
                      caches.open(CACHE_NAME).then((cache) => {
                          cache.put(event.request, responseClone);
                      });
                  }
                  return networkResponse;
              });
          })
      );
      return;
  }

  // Strategy 4: Default (Network only for API/others)
  event.respondWith(fetch(event.request));
});