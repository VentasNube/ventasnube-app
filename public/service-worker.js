
importScripts('/public/app/v4.0/plugins/workbox-cdn/releases/6.1.5/workbox-sw.js');

const version = 1221212121212211231121112121211222121225212422;
const expectedCaches = ['ventasnube-v-' + version];

self.addEventListener('install', event => {
  self.skipWaiting();
});
 
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V-' + version + ' Se actualizo con exito!');
    })
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

workbox.setConfig({
  debug: false
});

workbox.core.setCacheNameDetails({
  prefix: 'ventasnube',
  suffix: 'v1' + version,
  precache: 'ventasnube-precache',
  runtime: 'ventasnube-runcache'
});

// Resto del código...
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
  { url: '/public/app/v4.0/plugins/iCheck/square/blue.css', revision: version },

  { url: 'public/app/v4.0/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css', revision: version },
  { url: 'public/app/v4.0/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js', revision: version },
  
  // Fuentes js plugins
  { url: '/public/app/v4.0/plugins/jQuery/jquery-3.1.1.min.js', revision: version },
  { url: '/public/app/v4.0/plugins/moments/moments.js', revision: version },
  { url: '/public/app/v4.0/dist/bootstrap/js/bootstrap.min.js', revision: version },
  { url: '/public/app/v4.0/plugins/snackbar-master/dist/snackbar.js', revision: version },
  { url: '/public/app/v4.0/plugins/iCheck/icheck.min.js', revision: version },

  // Fuentes js Handelbar POUCHDB
  { url: '/public/app/v4.0/plugins/handlebars/4.7.6.handlebars.js', revision: version },
  { url: '/public/app/v4.0/plugins/pouchdb/pouchdb-8/pouchdb-8.0.1.min.js', revision: version },
  { url: '/public/app/v4.0/plugins/pouchdb/js/pouchdb.min.js', revision: version },
  { url: '/public/app/v4.0/plugins/pouchdb/js/pouchdb.authentication.min.js', revision: version },

  // Fuentes js plugins
  { url: '/public/app/v4.0/plugins/validate/jquery.validate.js', revision: version },
  { url: 'https://cdn.jsdelivr.net/npm/muuri@0.9.5/dist/muuri.min.js', revision: version },
  { url: 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.3', revision: version },

  //Funciones Compilador y maqueta
  { url: '/public/app/v4.0/dist/js/workspace/app/ventas_nube_compilator.js', revision: version },
  { url: '/public/app/v4.0/dist/js/workspace/app/ventas_nube_app.js', revision: version },
  { url: '/public/app/v4.0/dist/js/workspace/app/ventas_nube_session.js', revision: version },
  { url: '/public/app/v4.0/dist/js/workspace/setting/ventas_nube_setting.js', revision: version },

  //MODULOS
  //Funciones body
  { url: '/public/app/v4.0/dist/js/workspace/body/ventas_nube_body.js', revision: version },
  //Funciones Cart
  { url: '/public/app/v4.0/dist/js/workspace/cart/ventas_nube_cart.js', revision: version },
  //Funciones Search
  { url: '/public/app/v4.0/dist/js/workspace/search/ventas_nube_search.js', revision: version },
  //Acccount 
  { url: '/public/app/v4.0/dist/js/workspace/account/ventas_nube_account.js ', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/account/account_menu.hbs', revision: version },
  //Catalog
  { url: '/public/app/v4.0/dist/js/workspace/catalog/ventas_nube_catalog.js ', revision: version },
  //Board
  { url: '/public/app/v4.0/dist/js/workspace/board/ventas_nube_board.js ', revision: version },
  //Contact
  { url: '/public/app/v4.0/dist/js/workspace/contact/ventas_nube_contact.js ', revision: version },
  //Box
  { url: '/public/app/v4.0/dist/js/workspace/box/ventas_nube_box.js ', revision: version },
  //Config
  
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
  
  { url: '/public/app/v4.0/dist/hbs/workspace/search/card/card_search_product.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/search/card/card_search_contact.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/search/card/card_search_order.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/search/card/card_search_service.hbs', revision: version },

  //Config
  { url: '/public/app/v4.0/dist/hbs/workspace/setting/general.hbs', revision: version },

  //CATALOG
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/nav_bar.hbs', revision: version },
  // { url: '/public/app/v4.0/dist/hbs/workspace/catalog/catalog_items.hbs', revision: version },
  // { url: '/public/app/v4.0/dist/hbs/workspace/catalog/form_new_product.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/catalog.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/card_product.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_view_item.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/card_product_variant.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/card_product_var_select.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/card_view_product_variant.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_new_price_get_list.hbs', revision: version },
  
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/list_product.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/card_product_get_variant.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_new_stock_get_list.hbs', revision: version },

 // PRODUCTO
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/config/catalog_config.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_edit_item_cat_list.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_edit_item_model_list.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_edit_item_trade_list.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/edit/catalog_new_variation.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/edit/catalog_edit_item.hbs', revision: version },
  // { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_create_product.hbs', revision: version },
  // { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/create/catalog_create_product_variation.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/create/catalog_create_variation.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/create/catalog_create_product.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/create/product_upload_img_pop.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/catalog/product/edit/new_price.hbs', revision: version },

  //BOARD
  { url: '/public/app/v4.0/dist/hbs/workspace/board/popup/new_board.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/board/popup/new_group.hbs', revision: version },
  
  { url: '/public/app/v4.0/dist/hbs/workspace/board/card/card_order.hbs', revision: version },

  { url: '/public/app/v4.0/dist/hbs/workspace/board/popup/edit_group.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/board/nav_bar.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/board/board.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/board/board_group.hbs', revision: version },
  
  { url: '/public/app/v4.0/dist/hbs/workspace/board/order_main.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/board/order_item.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/board/order_total_items.hbs', revision: version },


  //CONTACT
  { url: '/public/app/v4.0/dist/hbs/workspace/contact/popup/new_contact.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/contact/popup/edit_contact.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/contact/subjet_contact_list.hbs', revision: version },

  { url: '/public/app/v4.0/dist/hbs/workspace/contact/nav_bar.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/contact/contact.hbs', revision: version },
  { url: '/public/app/v4.0/dist/hbs/workspace/contact/card_contact.hbs', revision: version },
  

   //BOX
   { url: '/public/app/v4.0/dist/hbs/workspace/box/popup/new_mov.hbs', revision: version },
   { url: '/public/app/v4.0/dist/hbs/workspace/box/popup/edit_mov.hbs', revision: version },
   { url: '/public/app/v4.0/dist/hbs/workspace/box/nav_bar.hbs', revision: version },
   { url: '/public/app/v4.0/dist/hbs/workspace/box/box.hbs', revision: version },
   { url: '/public/app/v4.0/dist/hbs/workspace/box/card_mov.hbs', revision: version },

   { url: '/public/app/v4.0/dist/hbs/workspace/box/list_mov.hbs', revision: version },
   
 

]);

workbox.routing.registerRoute(
  /ruta\/al\/archivo\/config.json/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'ventasnube-config-' + version,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

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