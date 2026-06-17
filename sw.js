// ETHOS·TX (deploy ethos_tx_new) — RETIRADO. Este deploy quedó obsoleto.
// Service worker "kill-switch": limpia toda la caché, se desregistra y reenvía
// a la versión vigente en https://eddysalvador80.github.io/ethos-tx/
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    try {
      var keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
      await self.registration.unregister();
      var clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(function (c) { c.navigate('./'); });
    } catch (e) {}
  })());
});

// Sin handler de 'fetch': el SW ya no sirve nada cacheado; todo pasa a la red,
// y './index.html' redirige a la app vigente.
