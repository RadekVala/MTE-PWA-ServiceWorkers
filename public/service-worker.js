console.log('Workbox SW is loaded');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  const appShellStrategy = new workbox.strategies.CacheFirst({
    cacheName: 'my-app-shell-cache',
  });

  // caching of APP SHELL
  // JS
  workbox.routing.registerRoute(
    new RegExp('\\.js$'),
    appShellStrategy
  );
  // CSS
  workbox.routing.registerRoute(
    new RegExp('\\.css$'),
    appShellStrategy
  );
  // Pictures
  workbox.routing.registerRoute(
    new RegExp('\.(?:png|jpg|jpeg|svg|gif)$'),
    appShellStrategy
  );

  // HTML
  workbox.routing.registerRoute(
    new RegExp('\/$'),
    appShellStrategy
  );

  // caching of DATA
  workbox.routing.registerRoute(
    new RegExp('.+/forecast/.+'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'my-data-cache',
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}