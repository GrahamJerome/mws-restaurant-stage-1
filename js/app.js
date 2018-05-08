navigator.serviceWorker.register('js/sw.js').then(function(reg) {
	console.log('service worker loaded.');
}).catch(function(err) {
	console.log('service worker failed.');
});