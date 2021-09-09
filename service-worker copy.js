/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 *
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * 
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js')

/*
import {BackgroundSyncPlugin} from 'workbox-background-sync';
import {registerRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

*/
//importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');
if (workbox) {
    //import { CacheableResponsePlugin } from 'workbox-cacheable-response';
    //console.log('Workbox is loaded');
    workbox.precaching.precacheAndRoute([]);

    // Cache global assets (Cacheo Assets propios)
    workbox.routing.registerRoute(
        new RegExp('/(globalassets|site\.resource)/'),
        new workbox.strategies.CacheFirst({
            //    new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'local-resource',
            plugins: [
                // new workbox.cacheableResponse.Plugin({ statuses: [200] }),
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 1000,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );

    workbox.precaching.precacheAndRoute(
        [
            { url: "404.html", revision: "dc3feaa1058d8c1efcea96fefc3153ed" },
            { url: "offline.html", revision: "e0683df2f740244dd3788ae2347e2bb4" }
        ]
    );
    // Cache third party libraries (Cacheo Assets de terceros)
    /* workbox.routing.registerRoute(
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
    );
*/
    // Cache third party libraries (Cacheo Assets de terceros)
    /*   workbox.routing.registerRoute(
        //new RegExp ({url}) => url.pathname.startsWith('/app/v2/'),
        new RegExp('/[^/?]+\\.[^/]+$'),
        // new RegExp('^(http|https)://([a-zA-Z0-9]+\.){1,4}(com|net|io|){1}/'),
        new workbox.strategies.CacheFirst({
            //  new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'local-html',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );
*/
    //Imagenes cache
    workbox.routing.registerRoute(
        // /\.(?:png|gif|jpg|svg)$/,
        new RegExp('\.(?:png|gif|jpg|jpeg|svg)$'),
        // new workbox.strategies.CacheFirst({
        new workbox.strategies.CacheFirst({
            cacheName: 'image-cache',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 1000,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );

} else {
    console.log('Workbox Online!');
}