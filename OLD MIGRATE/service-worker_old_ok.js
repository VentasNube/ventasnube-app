importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        skipWaiting();
    }
});






// This will work!

var version_app = 2;
workbox.precaching.precacheAndRoute([
    //Templates de Top bar y left bar
    { url: 'http://localhost/body/top_bar_template', revision: version_app },
    { url: 'http://localhost/body/left_nav_template', revision: version_app },

    //Templates de cart
    { url: 'http://localhost/cart/cart_nav_template', revision: version_app },
    { url: 'http://localhost/cart/cart_nav_items_template', revision: version_app },

    //Templates de Favoritos
    { url: 'http://localhost/cart/fav_item_template', revision: 5 },
    // { url: 'http://localhost/cart/cart_nav_items_template', revision: 4 },

    //Template de Search Module
    { url: 'http://localhost/search/search_m_template', revision: 5 },
    { url: 'http://localhost/search/search_card_product_template', revision: 5 },
    { url: 'http://localhost/search/search_card_product_var_select_template', revision: 5 },
    { url: 'http://localhost/search/search_card_product_variant_template', revision: 5 },

    //Template de Acount Module
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