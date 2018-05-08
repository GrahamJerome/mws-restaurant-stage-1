let staticCacheName = 'restaurant-cache-v2';

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'/',
				'/data/restaurants.json',
				'main.js',
				'dbhelper.js',
				'restaurant_info.js',
				'/css/styles.css',
				'/css/responsive.css'
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') && cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	// console.log('requesting', event.request);

	// let requestUrl = new URL(event.request.url);

	// if (requestUrl.origin === location.origin) {
	// 	if (requestUrl.pathname === '/') {
	// 		event.respondWith(caches.match('/'));
	// 		return;
	// 	}
	// }

	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});