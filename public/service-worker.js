importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

    const version = 3111111111332441112;
    const expectedCaches = ['ventasnube-v-' + version];

      self.addEventListener('install', event => {
        self.skipWaiting(); //Con este comando salto el dialogo de espera una vez q se instala una version 
      });

      self.addEventListener('activate', event => {

      });

      self.addEventListener('message', function (event) {
        if (event.data.action === 'skipWaiting') {
          self.skipWaiting();
        }
      });
      
/*
    self.addEventListener('message', function(event){
        msg = event.data;
        console.log("SW Received Message: " + msg);
        // if (msg==='clearCache') {
          console.log('Clearing Workbox Cache.');
          WorkBoxCache = new workbox.expiration.Plugin;
          WorkBoxCache.expirationPlugin.deleteCacheAndMetadata();
                //WorkBoxCacheServer.clear();
            //  }
         if (event.data.action === 'skipWaiting') {
          self.skipWaiting();
        }
    });
*/
     /* self.addEventListener('activate', (event) => {
        var cacheKeeplist = ['v2'];
      
        event.waitUntil(
          caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
              if (cacheKeeplist.indexOf(key) === -1) {
                return caches.delete(key);
              }
          })
        );
      });
    */

    workbox.core.setCacheNameDetails({
        prefix: 'ventasnube',
        suffix: 'v1'+version,
        precache: 'ventasnube-precache',
        runtime: 'ventasnube-runcache'
    });

    workbox.precaching.precacheAndRoute([
         // { url: '/', revision: version },
        //{ url: '/login', revision: version },
        //{ url: '/workspace/home', revision: version }, 
        { url: '/workspace/app/?type=catalog', revision: version },
        { url: '/workspace/app', revision: version }, //Con este / explicita que mostrar cuando no hay coneccion a la red y devuelve el contenido
        //{ url: '/workspace/login', revision: version },
        { url: '/public/app/v4.0/dist/img/favicon.ico', revision: version },
        { url: '/public/app/v4.0/dist/js/manifest.json', revision: version },
        // fuentes css y plugins
         

        { url: 'https://fonts.gstatic.com/s/materialicons/v114/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: version },
       // { url: 'https://fonts.gstatic.com/s/materialicons/v111/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: version },
       // { url: 'https://fonts.gstatic.com/s/materialicons/v109/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: version },
        { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: version },
        { url: '/public/app/v4.0/dist/bootstrap/css/bootstrap.css', revision: version },
        { url: '/public/app/v4.0/dist/css/skins/skin-ventas-nube.css', revision: version },
        { url: '/public/app/v4.0/dist/css/VentasNubeSkin.css', revision: version },
        { url: '/public/app/v4.0/plugins/snackbar-master/dist/snackbar.css', revision: version },
        { url: 'public/app/v4.0/plugins/snackbar-master/dist/snackbar.min.css', revision: version },
        // Fuentes js plugins
        { url: '/public/app/v4.0/plugins/jQuery/jquery-3.1.1.min.js', revision: version },
        { url: '/public/app/v4.0/plugins/moments/moments.js', revision: version },
        { url: '/public/app/v4.0/dist/bootstrap/js/bootstrap.min.js', revision: version },
        { url: '/public/app/v4.0/plugins/snackbar-master/dist/snackbar.js', revision: version },
        // Fuentes js plugins
        { url: '/public/app/v4.0/plugins/handlebars/4.7.6.handlebars.js', revision: version },
        { url: '/public/app/v4.0/plugins/pouchdb/js/pouchdb.min.js', revision: version },
        { url: '/public/app/v4.0/plugins/pouchdb/js/pouchdb.authentication.min.js', revision: version },
       // Fuentes js plugins
        { url: '/public/app/v4.0/plugins/validate/jquery.validate.js', revision: version },
        { url: 'https://cdn.jsdelivr.net/npm/muuri@0.9.0/dist/muuri.min.js', revision: version },
        { url: 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.3', revision: version },
        //Funciones Compilador y maqueta
        { url: '/public/app/v4.0/dist/js/workspace/app/ventas_nube_compilator.js', revision: version },
        { url: '/public/app/v4.0/dist/js/workspace/app/ventas_nube_app.js', revision: version },
        { url: '/public/app/v4.0/dist/js/workspace/app/ventas_nube_session.js', revision: version },
    
        //MODULOS
        //Funciones body
        { url: '/public/app/v4.0/dist/js/workspace/body/ventas_nube_body.js', revision: version },
        //Funciones Cart
        { url: '/public/app/v4.0/dist/js/workspace/cart/ventas_nube_cart.js', revision: version },
        //Funciones Search
        { url: '/public/app/v4.0/dist/js/workspace/search/ventas_nube_search.js', revision: version },
        //Acccount 
        { url: '/public/app/v4.0/dist/js/workspace/account/ventas_nube_account.js ', revision: version },
         //Catalog
         { url: '/public/app/v4.0/dist/js/workspace/catalog/ventas_nube_catalog.js ', revision: version },

        //Templates body de Top bar y left bar
        { url: '/public/app/v4.0/dist/hbs/workspace/body/top_bar.hbs', revision: version },
        { url: '/public/app/v4.0/dist/hbs/workspace/body/left_nav.hbs', revision: version },
        //Templates de cart
        { url: '/public/app/v4.0/dist/hbs/workspace/cart/cart_main.hbs', revision: version },
        { url: '/public/app/v4.0/dist/hbs/workspace/cart/cart_item.hbs', revision: version },
        { url: '/public/app/v4.0/dist/hbs/workspace/cart/cart_total_items.hbs', revision: version },
        //Templates de Favoritos
        { url: '/public/app/v4.0/dist/hbs/workspace/cart/fav_item.hbs', revision: version },
        //Template de Search Module
        { url: '/public/app/v4.0/dist/hbs/workspace/search/search_module.hbs', revision: version },
        { url: '/public/app/v4.0/dist/hbs/workspace/search/card_product.hbs', revision: version },
        { url: '/public/app/v4.0/dist/hbs/workspace/search/card_product_var_select.hbs', revision: version },
        { url: '/public/app/v4.0/dist/hbs/workspace/search/card_product_variant.hbs', revision: version },
          //Template de catalog

       
          { url: '/public/app/v4.0/dist/hbs/workspace/catalog/nav_bar.hbs', revision: version },
         // { url: '/public/app/v4.0/dist/hbs/workspace/catalog/catalog_items.hbs', revision: version },
         // { url: '/public/app/v4.0/dist/hbs/workspace/catalog/form_new_product.hbs', revision: version },
          { url: '/public/app/v4.0/dist/hbs/workspace/catalog/catalog.hbs', revision: version },
          { url: '/public/app/v4.0/dist/hbs/workspace/catalog/card_product.hbs', revision: version },
          { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_view_item.hbs', revision: version },
          { url: '/public/app/v4.0/dist/hbs/workspace/catalog/card_product_variant.hbs', revision: version },
          { url: '/public/app/v4.0/dist/hbs/workspace/catalog/card_product_var_select.hbs', revision: version },
          { url: '/public/app/v4.0/dist/hbs/workspace/catalog/card_view_product_variant.hbs', revision: version },
          
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