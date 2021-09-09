importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

const version = 311112585;
const expectedCaches = ['ventasnube-v-' + version];

self.addEventListener('install', event => {
    console.log('La version:[' + version + '] fue instalada!');

    //getElementById("sw-version").innerHTML = 'La version:[' + version + '] fue instalada!';
    // don't wait
    self.skipWaiting();
    // cache a cow SVG
    /*event.waitUntil(
        //   caches.open('static-v3').then(cache => cache.add('cow.svg'))
    );*/
});

self.addEventListener('activate', event => {
    // delete any caches that aren't in expectedCaches
    /*  event.waitUntil(
          caches.keys().then(keys => Promise.all(
              keys.map(key => {
                  if (!expectedCaches.includes(key)) {
                      return caches.delete(key);
                  }
              })
          )).then(() => {
              console.log('La version:' + version + ' esta activa!');
          })
      );*/
});

workbox.precaching.precacheAndRoute([
    // { url: '/', revision: version },
    //{ url: '/login', revision: version },
    { url: '/account', revision: version }, //Con este / explicita que mostrar cuando no hay coneccion a la red y devuelve el contenido
    { url: '/public/dist/img/favicon.ico', revision: version },
    { url: '/public/dist/js/manifest.json', revision: version },
    // fuentes css y plugins 
    { url: 'https://fonts.gstatic.com/s/materialicons/v85/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: version },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: version },
    { url: '/public/dist/bootstrap/css/bootstrap.css', revision: version },
    { url: '/public/dist/css/skins/skin-ventas-nube.css', revision: version },
    { url: '/public/dist/css/VentasNubeSkin.css', revision: version },
    { url: '/public/plugins/snackbar-master/dist/snackbar.min.css', revision: version },
    // Fuentes js plugins
    { url: '/public/plugins/jQuery/jquery-3.1.1.min.js', revision: version },
    { url: '/public/plugins/moments/moments.js', revision: version },
    { url: '/public/dist/bootstrap/js/bootstrap.min.js', revision: version },
    { url: '/public/plugins/snackbar-master/dist/snackbar.js', revision: version },
    { url: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.js', revision: version },
    { url: 'https://cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js', revision: version },
    { url: '/public/plugins/pouchdb/js/pouchdb.authentication.min.js', revision: version },
    { url: '/public/plugins/validate/jquery.validate.js', revision: version },
    { url: 'https://cdn.jsdelivr.net/npm/muuri@0.9.0/dist/muuri.min.js', revision: version },
    { url: 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.3', revision: version },
    //Funciones Compilador y maqueta
    { url: '/public/dist/js/app/ventas_nube_compilator.js', revision: version },
    { url: '/public/dist/js/app/ventas_nube_app.js', revision: version },
    { url: '/public/dist/js/app/ventas_nube_session.js', revision: version },
    //Funciones body
    { url: '/public/dist/js/body/ventas_nube_body.js', revision: version },
    //Funciones Cart
    { url: '/public/dist/js/cart/ventas_nube_cart.js', revision: version },
    //Funciones Search
    { url: '/public/dist/js/search/ventas_nube_search.js', revision: version },
    //Templates body de Top bar y left bar
    { url: '/public/dist/hbs/body/top_bar.hbs', revision: version },
    { url: '/public/dist/hbs/body/left_nav.hbs', revision: version },
    //Templates de cart
    { url: '/public/dist/hbs/cart/cart_main.hbs', revision: version },
    { url: '/public/dist/hbs/cart/cart_item.hbs', revision: version },
    { url: '/public/dist/hbs/cart/cart_total_items.hbs', revision: version },

    //Templates de Favoritos
    { url: '/public/dist/hbs/cart/fav_item.hbs', revision: version },
    //Template de Search Module
    { url: '/public/dist/hbs/search/search_module.hbs', revision: version },
    { url: '/public/dist/hbs/search/card_product.hbs', revision: version },
    { url: '/public/dist/hbs/search/card_product_var_select.hbs', revision: version },
    { url: '/public/dist/hbs/search/card_product_variant.hbs', revision: version },

]);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        //new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'vnapp-images-' + version,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
        ]
    })
);