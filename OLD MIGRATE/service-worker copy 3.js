//importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

const version = "4.0.2";
const cacheName = `ventasnube_app-${version}`;
//import { cacheNames } from 'workbox-core';

addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});


// This will work!

//var version_app = 2;
workbox.precaching.precacheAndRoute([

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
    { url: '/public/plugins/snackbar-master/dist/snackbar.min.js', revision: version },
    { url: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.js', revision: version },
    { url: 'https://cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js', revision: version },
    { url: '/public/plugins/pouchdb/js/pouchdb.authentication.min.js', revision: version },
    { url: '/public/plugins/validate/jquery.validate.js', revision: version },
    { url: 'https://cdn.jsdelivr.net/npm/muuri@0.9.0/dist/muuri.min.js', revision: version },
    { url: 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.3', revision: version },
    // Compilador VNAPP js
    //  { url: '/public/dist/js/ventas_nube_compilator.js', revision: version },
    { url: '/body/ventas_nube_compilator', revision: version },
    { url: '/public/dist/js/ventas_nube_app.js', revision: version },

    //Template de Acount Module
    //Template body
    { url: '/body/ventas_nube_body', revision: version },
    { url: '/body/ventas_nube_cart', revision: version },
    { url: '/body/ventas_nube_search', revision: version },
    //Templates body de Top bar y left bar
    { url: '/body/top_bar_template', revision: version },
    { url: '/body/left_nav_template', revision: version },
    //Templates de cart
    { url: '/cart/cart_nav_template', revision: version },
    { url: '/cart/cart_nav_items_template', revision: version },
    //Templates de Favoritos
    { url: '/cart/fav_item_template', revision: version },
    // { url: 'http://localhost/cart/cart_nav_items_template', revision: 4 },
    //Template de Search Module
    { url: '/search/search_m_template', revision: version },
    { url: '/search/search_card_product_template', revision: version },
    { url: '/search/search_card_product_var_select_template', revision: version },
    { url: '/search/search_card_product_variant_template', revision: version },

]);

// Use an explicit cache-first strategy and a dedicated cache for images.
//workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        //new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('/(globalassets|site\.resource)/'),
    //({ request }) => request.destination === 'image',
    // new workbox.strategies.CacheFirst({
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'Assets',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            })
        ]
    })
);
//Registro de templates html
workbox.routing.registerRoute(
    /\.(?:html)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'html-cache',
        plugins: [
            // new workbox.expiration.CacheableResponsePlugin({
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 5 * 60,
            })
        ]
    })
);

// Ensure your build step is configured to include /offline.html as part of your precache manifest.

// Catch routing errors, like if the user is offline
workbox.routing.setCatchHandler(async({ event }) => {
    // Return the precached offline page if a document is being requested
    if (event.request.destination === 'document') {
        return matchPrecache('http://localhost/cart/cart_nav_items_template');
    }
    return Response.error();
});





/*
workbox.routing.registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ request }) => request.mode === 'navigate',
    // Use a Network First caching strategy
    new workbox.strategies.NetworkFirst({
        // Put all cached files in a cache named 'pages'
        cacheName: 'pages',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponse({
                statuses: [200],
            }),

        ],
    }),
);*/

//new workbox.strategies.CacheFirst({
/*
new RegExp('^(http|https)://([a-zA-Z0-9]+\.){1,4}(com|net|io|){1}/'),
new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cnd-assets',
    plugins: [
        new workbox.expiration.ExpirationPlugin({
            maxEntries: 1000,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
    ]
})
*/
/*
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    /\/api\/.*\/*.json/,
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
);

*/