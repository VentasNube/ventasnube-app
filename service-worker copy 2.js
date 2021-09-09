/*
 *
 *  Air Horner
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

const version = "4.0.2";
const cacheName = `ventasnube_app-${version}`;

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                    `/`,
                    `/body/ventas_nube_body`,
                    `/body/ventas_nube_cart`,
                    `/body/ventas_nube_search`,
                    `/body/top_bar_template`,
                    `/body/left_nav_template`,
                    `/cart/cart_nav_template`,
                    `/cart/cart_nav_items_template`,
                    `/cart/fav_item_template`,
                    `/search/search_m_template`,
                    `/search/search_card_product_template`,
                    `/search/search_card_product_var_select_template`,
                    `/search/search_card_product_variant_template`,
                    `/public/dist/img/favicon.ico`,
                    `/public/dist/js/manifest.json`,
                    `/public/dist/bootstrap/css/bootstrap.css`,
                    `/public/dist/css/skins/skin-ventas-nube.css`,
                    `/public/dist/css/VentasNubeSkin.css`,
                    `/public/plugins/snackbar-master/dist/snackbar.min.css`,
                    `https://fonts.gstatic.com/s/materialicons/v85/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2`,

                    `https://fonts.googleapis.com/icon?family=Material+Icons`,

                    `/public/plugins/jQuery/jquery-3.1.1.min.js`,
                    `/public/plugins/moments/moments.js`,

                    `/public/dist/bootstrap/js/bootstrap.min.js`,
                    `/public/plugins/snackbar-master/dist/snackbar.min.js`,

                    `https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.js`,
                    `https://cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js`,

                    `/public/plugins/pouchdb/js/pouchdb.authentication.min.js`,
                    `/public/plugins/validate/jquery.validate.js`,
                    //   `https://www.google-analytics.com/analytics.js`,

                    // `https://unpkg.com/web-animations-js@2.3.2/web-animations.min.js`,

                    //`https://unpkg.com/muuri@0.8.0/dist/muuri.min.js`,

                    `https://cdn.jsdelivr.net/npm/muuri@0.9.0/dist/muuri.min.js`,

                    `https://cdn.jsdelivr.net/npm/fuse.js@6.4.3`,
                    //`https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js`,
                    `/public/dist/js/ventas_nube_compilator.js`,
                    `/body/ventas_nube_compilator`,
                    `/public/dist/js/ventas_nube_app.js`
                ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
    console.log('Activate:' + version);
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(event.request, { ignoreSearch: true }))
        .then(response => {
            console.log('Fetch:' + version);
            return response || fetch(event.request);
        })
    );
});


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