const CACHE_NAME = 'exchange-buddy-v3';
// Clean up any cache from previous versions of the app
const OLD_CACHE_PREFIXES = ['bitcoin-converter', 'exchange-buddy'];

// Paths are relative to this service worker's location (/exchange-buddy/)
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './converter-styles.css',
    './style.css',
    './bitsSymbol.js',
    './currencies.json',
    './exchange-rates.json',
    './fiat-country-flags.json',
    './manifest.json',
    './icon-192x192.png',
    './icon-512x512.png',
    './fonts/bits-symbol.woff',
    './fonts/bits-symbol.ttf'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames
                    .filter(name => OLD_CACHE_PREFIXES.some(prefix =>
                        name.startsWith(prefix) && name !== CACHE_NAME
                    ))
                    .map(name => caches.delete(name))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;

    // Exchange rates and page navigations: network first (fresh data and UI),
    // falling back to cache when offline
    const isExchangeRates = request.url.includes('exchange-rates.json');
    const isNavigation = request.mode === 'navigate';

    if (isExchangeRates || isNavigation) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(request, copy));
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Everything else: cache first, network fallback
    event.respondWith(
        caches.match(request)
            .then(response => response || fetch(request))
    );
});
