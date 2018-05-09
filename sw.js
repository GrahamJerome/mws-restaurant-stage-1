const staticCache = 'restaurant-cache-v6'

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCache).then(function(cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/restaurant.html',
				'/css/styles.css',
				'/css/responsive.css',
				'/data/restaurants.json',
				'/img/1.jpg',
				'/img/2.jpg',
				'/img/3.jpg',
				'/img/4.jpg',
				'/img/5.jpg',
				'/img/6.jpg',
				'/img/7.jpg',
				'/img/8.jpg',
				'/img/9.jpg',
				'/img/10.jpg',
				'/js/dbhelper.js',
				'/js/main.js',
				'/js/restaurant_info.js',
			]);
		})
	);
});

self.addEventListener('fetch', function (event) {
	// stop it from trying to fetch google maps offline
	if (event.request.url.startsWith('https')) { console.log('No no no'); return; }

	event.respondWith(
	caches.match(event.request).then(function(response) {
			console.log(event.request);
			return response || fetch(event.request);
		}
	));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
	caches.keys().then(function(cacheNames) {
	  return Promise.all(
		cacheNames.filter(function(cacheName) {
		  return cacheName.startsWith('restaurant-') &&
				 cacheName != staticCache;
		}).map(function(cacheName) {
		  return caches.delete(cacheName);
		})
	  );
	})
  );
});