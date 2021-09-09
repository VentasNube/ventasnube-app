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

//* Inicio de logica cart que usa index db para alamacenar productos y ler el contenido

//'use strict';
//var ENTER_KEY = 13;
//var newTodoDom = document.getElementById('new-todo');
//var syncDom = document.getElementById('sync-wrapper');
// EDITING STARTS HERE (you dont need to edit anything above this line)

//PLUGIN DE BUSQUEDAS
//var db = require('pouchdb');
//db.plugin(require('pouchdb-find'));


var url_now = getUrl();
var domain = url_now.domain_m_url;
// Traigo los datos de la sesion y lo cargo en la variable 
//var userData =

//var y, userDb;
/*
userDb = getSession();
y = userDb;
alert(y);
*/

function encodeUserDb(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    // alert(result);
    return result;
}

//userDb = 1;
//db = false;
//remoteCouch = false;


//db = false;

//var remoteCouch = 'http://admin:Cou6942233Cou@' + domain + ':5984/ventasnube-01';
//remoteCouch = 'http://localhost:5984/userdb-736d6172746d6f62696c652e636f6d2e617240676d61696c2e636f6d';

//db = new PouchDB('http://localhost:5984/userdb-736d6172746d6f62696c652e636f6d2e617240676d61696c2e636f6d');

//var db_name = 'cart-vn-01';
//var db = new PouchDB('http://localhost:5984/'+db_username, { skip_setup: true });
//db = new PouchDB('http://localhost:5984/', { skip_setup: true });
//db = new PouchDB(remoteCouch, { skip_setup: true });
//+ response.userCtx.roles + response.userCtx._id,
/*db.getSession(function(err, response) {
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
        /* userInfo = {
            userDb: userDb,
            userName: response.userCtx.name,
            userRol: response.userCtx.roles,
        }
        //alert('Alert1' + userDb);
        //console.log('USUARIIOOOOOOOOOOOOOOOOOOOOOOOO' + userInfo.userDb + ' ------' + userInfo.userName + '-------' + userInfo.userRol);
        return userDb;
    }
});
*/

//alert(domain)
//Captura los cambios en la DB en vivo y Actualiza los datos asincronico sin refrezcar la pagina
/*
db.changes({
    since: 'now',
    live: true
}).on('change', load_product_cart); //Cargo la funcion load_product_cart en vivo si hay cambios en la dB!
*/
//Inicializa la sync with the remote server
/*
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
*/
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


//Creo los items apartir del documento obtenido en la DB
function readCartItem(todos) {
    //   alert('lo estoy llamando');
    console.log('lo estoy llamando');
    console.log(todos.doc);
    var array_cart_items = [];
    var cart_item = [];
    //Creo los array
    var total_quantity_prod = 0;
    var total_neto_prod = 0;
    var total_cart_neto = 0;
    var total_neto_service = 0;
    var total_neto_discount = 0;
    //Impuestos
    var total_neto_service = 0;
    var total_neto_tax = 21;
    //Abonado
    var total_neto_pay = 0;
    todos.forEach(function(todo) {
        console.log('Carga carrio');
        console.log(todo.doc);
        //calculos matematicos para armar el Carrito
        var card_product_quantity = todo.doc['card_product_quantity'];
        //Valores
        var card_product_val = todo.doc['card_product_val'];
        var card_product_val_sub_tot = card_product_val * card_product_quantity;
        //Descuentos
        var card_product_discount = todo.doc['card_product_discount'];
        var card_product_discount_tot_val = Math.round((card_product_discount / 100) * card_product_val_sub_tot);
        var card_product_val_sub_tot_des = Math.round(card_product_val_sub_tot - card_product_discount_tot_val);
        //Cargo los datos del array
        var cart_item = {
            _id: todo.doc['_id'],
            _rev: todo.doc['_rev'],
            card_product_id: todo.doc['card_product_id'],
            card_product_img_url: todo.doc['card_product_img_url'],
            card_product_name: todo.doc['card_product_name'],
            card_product_val: todo.doc['card_product_val'],
            card_product_val_sub_tot: todo.doc['card_product_val_sub_tot'],
            card_product_discount: card_product_discount,
            card_product_discount_tot_val: card_product_discount_tot_val,
            card_product_val_sub_tot_des: card_product_val_sub_tot_des,
            card_product_quantity: card_product_quantity,
            card_product_list: todo.doc['card_product_list'],
        };
        //Creao el array 
        array_cart_items.push(cart_item);
        //Sumas de tototales
        total_neto_prod += +card_product_val_sub_tot_des;
        total_cart_neto += +(card_product_val_sub_tot_des + total_neto_service);
        total_neto_service += +total_neto_service;
        total_neto_discount += +card_product_discount_tot_val;
        //  console.log('Cart TODO SOLO 2 ---------' + todo);
    });
    console.log('TODOS TODo-3 ------- ----' + JSON.stringify(todos.doc));
    createCartListItem(array_cart_items, total_neto_prod, total_cart_neto, total_neto_service, total_neto_discount, total_neto_tax, total_neto_pay);
}

//Hago los calculos de los items y los renderizo en el template
function createCartListItem(array_cart_items, total_neto_prod, total_cart_neto, total_neto_service, total_neto_discount, total_neto_tax, total_neto_pay) {
    //Creo las variables para cargarlas con los resultados sumados
    var total_quantity_cart_item = array_cart_items.length;
    if (array_cart_items > 0) {
        var cart_items = {
            items_product: array_cart_items,
        };
    } else {
        var cart_items = {
            items_product: null,
        };
    }
    //Array para items de cart
    var cart_items = {
        items_product: array_cart_items,
    };
    //Array para totales
    var cart_total_items = {
        cart_total_items: {
            total_cart_neto: total_cart_neto,
            total_neto_prod: total_neto_prod,
            total_neto_service: total_neto_service,
            total_neto_discount: total_neto_discount,
            total_neto_tax: total_neto_tax,
            total_neto_pay: total_neto_pay,
        }
    };
    console.log(cart_items);
    console.log(cart_total_items);
    //Actualizo el numero del carrito
    $('.cart-number').text(total_quantity_cart_item);
    //Renderizo vista.
    renderHandlebarsTemplate('cart/cart_nav_items_template', '#product_cart_items', cart_items);
    renderHandlebarsTemplate('cart/cart_total_items_template', '#cart_total_items', cart_total_items);
}


//Tomo los datos del boton delete
$(document).on('click', '.btn-dell-item-cart', function(event) {
    var item_cart_id = $(this).attr('item_cart_id');
    var item_cart_rev = $(this).attr('item_cart_rev');
    var card_product_name = $(this).parents('.s-card-actv-item-name').html();
    var card_product_quantity = $(this).parent().parent().parent().find(".card_product_quantity").text();
    // dell_product(item_cart_id, card_product_name, card_product_quantity);
    deleteCartItem(item_cart_id, item_cart_rev);

});


//Cargp la Nav Cart
function get_nav_cart(pacht, controler_data, controler_template, id_copiled, data) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var pacht = 'cart'; //CONTROLADOR PRINCIPAL
    var controler_data = 'cart_nav_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'cart_nav_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#right_main_compiled'; // ID DE COMPILACION //  
    var data = {
        m_id: m_id,
        m_t_id: m_t_id,
    }
    console.log('Get nav cart' + m_id);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
    $('#cart_user_input').focus();
};

//Abre y cierra el carrito
$(document).on('click', '.cart_button', function(event) {
    $('#right_main').removeClass('move-right');
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var pacht = 'cart'; //CONTROLADOR PRINCIPAL
    var controler_data = 'cart_nav_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'cart_nav_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#right_main_compiled'; // ID DE COMPILACION //  
    var data = {
        m_id: m_id,
        m_t_id: m_t_id,
    }
    $('#cart_user_input').focus();
    load_product_cart();
});