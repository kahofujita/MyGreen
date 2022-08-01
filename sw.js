const CACHE_NAME = 'cache';
const urlsToCache = [
    '/login.html', '/style.css'
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

// // Cache load
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
