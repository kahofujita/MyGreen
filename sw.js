const CACHE_NAME = 'cache';
const urlsToCache = [
    '/login.html', '/style.css', '/js/login.js'
];

// Install
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )}
        ))
    })

// Cache load
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});



self.addEventListener('fetch', function( event ) {
    console.log(`Fetching ${event.request.url}`);
    // nothing fancy going on here.
    });
