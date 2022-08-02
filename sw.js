const staticCacheName = 'site-static';
const assets = [
    '/',
    '/login.html',
    '/index.html',
    '/style.css',
    '/signup.html',
    '/js/offline.js',
    '/js/homepage.js',
    '/Logos_MyGreen/Logo_Black.png',
    '/Logos_MyGreen/Logo_ColorFull.png',
    'https://fonts.googleapis.com/css2?family=Righteous&family=Urbanist:wght@400;600&display=swap'
];

// Install event
self.addEventListener('install', evt => {
    
    evt.waitUntil(
    
    caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets);
    })

    )
});

// Activate event
self.addEventListener('activate', evt => {

});

// Fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
});
    