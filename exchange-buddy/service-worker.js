const CACHE_NAME = 'bitcoin-converter-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/converter-styles.css',
    '/bitsSymbol.js',
    '/htmx.min.js',
    '/currencies.json',
    '/exchange-rates.json',
    '/fiat-country-flags.json',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
}); 