/*! VentasNube cart.js 3.0
 * ================
 * Main JS application file for VentasNube v3.0 This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive VentasNube plugins.
 *
 * @Author  Ventas Nube
 * @Support <http://www.ventasnube.com>
 * @Email   <ventasnube.com@gmail.com>
 * @version 3.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

var url_now = getUrl();
var domain = url_now.domain_m_url;
// Traigo los datos de la sesion y lo cargo en la variable 
//var userData =

//var y, userDb;

userDb = db.getSession();

alert(useDb);

function encodeUserDb(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    //alert(result);
    return result;
}

//db = false;
//var remoteCouch = 'http://admin:Cou6942233Cou@' + domain + ':5984/ventasnube-01';
//remoteCouch = 'http://localhost:5984/userdb-736d6172746d6f62696c652e636f6d2e617240676d61696c2e636f6d';
//db = new PouchDB('http://localhost:5984/userdb-736d6172746d6f62696c652e636f6d2e617240676d61696c2e636f6d');
//var db_name = 'cart-vn-01';
//var db = new PouchDB('http://localhost:5984/'+db_username, { skip_setup: true });
//db = new PouchDB('http://localhost:5984/', { skip_setup: true });
//db = new PouchDB(remoteCouch, { skip_setup: true });
//+ response.userCtx.roles + response.userCtx._id,
db.getSession(function(err, response) {
    if (err) {
        // network error
    } else if (!response.userCtx.name) {
        // nobody's logged in
        Snackbar.show({
            text: 'No estas logeado',
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-center'
        });
        window.location = "http://localhost/logout";
    } else {
        Snackbar.show({
            text: 'Login como: ' + response.userCtx.name + '  Permisos: ' + response.userCtx.roles,
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-center'
        });
        //Combierto el nombre de usuarios en exadecimal
        var userExa = encodeUserDb(response.userCtx.name);
        //Creo el user DB
        userDb = 'userdb-' + userExa;
        //var db = new PouchDB('ventasnube-01');
        //Creo un array con todos los datos para usar en toda la app
        userInfo = {
                userDb: userDb,
                userName: response.userCtx.name,
                userRol: response.userCtx.roles,
            }
            //alert('Alert1' + userDb);
            //console.log('USUARIIOOOOOOOOOOOOOOOOOOOOOOOO' + userInfo.userDb + ' ------' + userInfo.userName + '-------' + userInfo.userRol);
        return userDb;
    }
});

//alert(domain)
//Captura los cambios en la DB en vivo y Actualiza los datos asincronico sin refrezcar la pagina

db.changes({
    since: 'now',
    live: true
}).on('change', load_product_cart); //Cargo la funcion load_product_cart en vivo si hay cambios en la dB!

//Inicializa la sync with the remote server
function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = { live: true };
    db.replicate.to(remoteCouch, opts, syncError);
    db.replicate.from(remoteCouch, opts, syncError);
}
// Capturo el error de syncronizacion
function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
}
if (remoteCouch) {
    sync();
}

// Nuevo codigo cart 2020
// Borrar item 

function deleteCartItem(item_cart_id, item_cart_rev) {
    db.remove(item_cart_id, item_cart_rev);
}

// Agregar Item
function add_product(card_product_id, card_product_img_url, card_product_name, card_product_val, card_product_discount, card_product_quantity, card_product_list) {
    // var itemData = [card_product_id, card_product_img_url, card_product_name, card_product_val, card_product_discount, card_product_quantity, card_product_list]
    db.put({
        _id: new Date().toISOString(),
        item_tipe: 'product_cart_item',
        card_product_id: card_product_id,
        card_product_img_url: card_product_img_url,
        card_product_name: card_product_name,
        card_product_val: card_product_val,
        card_product_discount: card_product_discount,
        card_product_quantity: card_product_quantity,
        card_product_list: card_product_list,
        completed: false
    }, function(err, response) {
        if (err) { return console.log(err); }
        // handle response
        load_product_cart();
        Snackbar.show({
            text: '[ ' + card_product_quantity + ' ] ' + card_product_name + ' agregado con exito!',
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
    });
}

//Traer los item leyendo de la pounchDB
//function load_product_cart() {}

//Traer los item leyendo de la pounchDB
function load_product_cart_old() {
    db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
        //Lo pauso para probar el search por que me realentiza todo 
        readCartItem(doc.rows);
        //  console.log(doc.rows);
    });
}


//Escucho los cabios de la base de datos con filtros 
//function get_product_cart_desing() {
function load_product_cart() {
    /*  db.changes({
          //Nombre de vista
          //  since: 'now',
          //  live: true,
          filter: 'get_cart',
          //Filtro de vista
          query_params: { user_name: 'mariano', type: 'cart-item' },
          //Incluye los documentos
          include_docs: true,
      }, function(err, response) {
          if (err) { return console.log(err); }
          // handle result
          else if (response) {
              readCartItem(response.results);
              return console.log(response.results);
          }
      });*/
}