/*! VentasNube store cart.js 3.0
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

//###########################################################################
//Inicializacion de APP WPA OFFLINE  2021
//Instalacion de Dases de datos y documentos.
//###########################################################################

/*
//Inserto un solo item
async function insert_cart_item() {
    // $('.cart_n').text(total_quantity_cart_item);
    //Renderizo vista.
    await insert_template('cart/cart_new_item_template', '#product_cart_items', cart_items);
}
*/


// Creo los arrays con los datos de la BD
async function all_cart_item_Ok2(todos) {
    try {
        let array_cart_items = [];
        let cart_item = [];
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


        //  let result = awaitasync(todo) => {

        let result = await Promise.all(todos.map(async(todo) => {
            let prod_img = todo.doc.img.min;
            //calculos matematicos para armar el Carrito
            var card_product_quantity = todo.doc['count'];
            //Valores
            var card_product_val = todo.doc['price'];
            var card_product_val_sub_tot = card_product_val * card_product_quantity;
            //Descuentos
            var card_product_discount = todo.doc['discount'];
            var card_product_discount_tot_val = Math.round((card_product_discount / 100) * card_product_val_sub_tot);
            var card_product_val_sub_tot_des = Math.round(card_product_val_sub_tot - card_product_discount_tot_val);
            //Cargo los datos del array
            var cart_item = {
                _id: todo.doc['_id'],
                _rev: todo.doc['_rev'],
                card_product_id: todo.doc['sku'],
                card_product_img_url: prod_img,
                card_product_name: todo.doc['name'],
                card_product_val: todo.doc['price'],
                card_product_val_sub_tot: todo.doc['price'],
                card_product_discount: card_product_discount,
                card_product_discount_tot_val: card_product_discount_tot_val,
                card_product_val_sub_tot_des: card_product_val_sub_tot_des,
                card_product_quantity: card_product_quantity,
                card_product_list: todo.doc['price_list'],
            };
            var cart_items = {
                item_product: [cart_item],
            };
            //Creao el array 
            array_cart_items.push(cart_item);
            total_quantity_cart_item = array_cart_items.length;
            //Sumas de tototales
            total_neto_prod += +card_product_val_sub_tot_des;
            total_cart_neto += +(card_product_val_sub_tot_des + total_neto_service);
            total_neto_service += +total_neto_service;
            total_neto_discount += +card_product_discount_tot_val;
            //console.log('TOTAL DE ITEMS EN EL CARRITO' + JSON.stringify(total_cart_neto));
            //await renderHandlebarsTemplate('cart/cart_new_item_template', '#product_cart_items', cart_items);
            // await insert_template('cart/cart_new_item_template', '#product_cart_items', cart_items);
            //  await insert_template('cart/cart_new_item_template', '#product_cart_items', cart_items);
            //   $('.cart_n').text(total_quantity_cart_item);
            //  $('#total_neto_prod').text(total_cart_neto);
        }));

        var cart_items = {
            items_product: array_cart_items,
        };
        // reo todos los items en un solo render asi es mas rapido
        await renderHandlebarsTemplate('cart/cart_nav_items_template', '#product_cart_items', cart_items);

        $('.cart_n').text(total_quantity_cart_item);
        $('#total_cart_neto').text(total_cart_neto);
        $('#total_neto_prod').text(total_neto_prod);
        $('#total_neto_service').text(total_neto_service);
        $('#total_neto_discount').text(total_neto_discount);
        $('#total_neto_tax').text(total_neto_tax);
        $('#total_neto_pay').text(total_neto_pay);

        //total_cart_list_items(total_quantity_cart_item, total_neto_prod, total_cart_neto, total_neto_service, total_neto_discount, total_neto_tax, total_neto_pay);
        //  console.log('TOTAL DE ITEMS EN EL CARRITO' + JSON.stringify(total_quantity_cart_item));
        //console.log('TODOS TODo-3 ------- ----' + JSON.stringify(cart_item));
    } catch (err) {
        console.log(err);
    }
}


// Creo los arrays con los datos de la BD
async function all_cart_item(todos) {
    try {
        let array_cart_items = [];
        let cart_item = [];
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
        todos.map(function(todo) {
            let prod_img = todo.doc.img.min;
            //calculos matematicos para armar el Carrito
            var card_product_quantity = todo.doc['count'];
            //Valores
            var card_product_val = todo.doc['price'];
            var card_product_val_sub_tot = card_product_val * card_product_quantity;
            //Descuentos
            var card_product_discount = todo.doc['discount'];
            var card_product_discount_tot_val = Math.round((card_product_discount / 100) * card_product_val_sub_tot);
            var card_product_val_sub_tot_des = Math.round(card_product_val_sub_tot - card_product_discount_tot_val);
            //Cargo los datos del array
            var cart_item = {
                _id: todo.doc['_id'],
                _rev: todo.doc['_rev'],
                card_product_id: todo.doc['sku'],
                card_product_img_url: prod_img,
                card_product_name: todo.doc['name'],
                card_product_val: todo.doc['price'],
                card_product_val_sub_tot: todo.doc['price'],
                card_product_discount: card_product_discount,
                card_product_discount_tot_val: card_product_discount_tot_val,
                card_product_val_sub_tot_des: card_product_val_sub_tot_des,
                card_product_quantity: card_product_quantity,
                card_product_list: todo.doc['price_list'],
            };
            //Creo el array con todos los items
            array_cart_items.push(cart_item);
            total_quantity_cart_item = array_cart_items.length;
            //Sumas de tototales
            total_neto_prod += +card_product_val_sub_tot_des;
            total_cart_neto += +(card_product_val_sub_tot_des + total_neto_service);
            total_neto_service += +total_neto_service;
            total_neto_discount += +card_product_discount_tot_val;
            //console.log('TOTAL DE ITEMS EN EL CARRITO' + JSON.stringify(total_cart_neto));
        });
        //Creo el array nuevo con los items
        var cart_items = {
            items_product: array_cart_items,
        };
        // Imprimo todos los items en un solo render asi es mas rapido
        renderHandlebarsTemplate('cart/cart_nav_items_template', '#product_cart_items', cart_items);
        //console.log('TODOS TODo-3 ------- ----' + JSON.stringify(cart_item));
    } catch (ex) {
        console.error('inner', ex.message);
        throw ex;
    } finally {
        //Finally es la funcion que emite el resultado final despues de esperar todo e codigo ok
        // alert('finally' + total_neto_prod + '----' + total_quantity_cart_item);
        $('.cart_n').text(total_quantity_cart_item);
        $('#total_cart_neto').text(total_cart_neto);
        $('#total_neto_prod').text(total_neto_prod);
        $('#total_neto_service').text(total_neto_service);
        $('#total_neto_discount').text(total_neto_discount);
        $('#total_neto_tax').text(total_neto_tax);
        $('#total_neto_pay').text(total_neto_pay);
        get_cart_change();
        return;
    }
}


async function get_cart() {
    // Traigo los resultados de una vista
    let response = await L_user_db.query('get/cart-item', { include_docs: true, descending: true }); //Conceto con la vista de diseno
    // Renderizo todos los resultados 
    //  alert('GET CART' + response);
    //all_cart_item(response.rows);
    return all_cart_item(response.rows);
}

//Traer los item leyendo de la pounchDB
async function get_cart_change() {
    //  let user_data = await get_user_data(); //Traigo los datos de la seccion
    //  let db = await new PouchDB(user_data.url_db); /// COnectp con la DB
    // Traigo los resultados de una vista
    // let response = await db.query('get/cart-item', { include_docs: true, descending: true }); //Conceto con la vista de diseno
    // Traigo los cambios 
    await L_user_db.changes({
        // filter: '_view',
        //view: 'get/cart-item',
        since: 'now',
        include_docs: true,
        live: true
    }).on('change', function(change) {
        if (change.deleted) {
            // alert('Docuento Eliminado' + change.id);
            //  console.log('Docuento ELIMINADOOOOO ' + JSON.stringify(change.doc) + '\n');
            get_cart();
        } else {
            //  alert('Docuento Agregado' + change.id);
            // console.log('Docuento AGREGADOOOOOOOOO ' + JSON.stringify(change.doc) + '\n');
            get_cart();
        }
    }).on('error', function(err) {
        // handle errors
        console.log('' + err);
    });
}


async function userSession() {
    //let response = await db.post({}); // post a new doc
    try {
        let response = await session.getSession(function(err, response) {
            if (err) {
                // network error
                Snackbar.show({
                    text: 'No hay conexion a internet',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                    pos: 'bottom-center'
                });
            } else if (!response.userCtx.name) {
                // nobody's logged in
                Snackbar.show({
                    text: 'La sesion expiro!',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                    pos: 'bottom-center'
                });
                window.location = "http://localhost/logout";
            } else {
                //
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
                //Creo un array con todos los datos para usar en toda la app
                userInfo = {
                        userDb: userDb,
                        userName: response.userCtx.name,
                        userRol: response.userCtx.roles,
                    }
                    //C
                remoteCouch = 'http://localhost:5984/' + userInfo.userDb;
                //user_db = remoteCouch;
                // getCart(remoteCouch);
                load_product_cart(remoteCouch);
            }
        });
        return await response; // find by id
        // return await db.get(response); // find by id
    } catch (err) {
        alert(err);
    }
}

async function getWorkspace(user_db) {
    await db.get('config').catch(function(err) {
        if (err.name === 'not_found') {
            return {
                _id: 'config',
                background: 'blue',
                foreground: 'white',
                sparkly: 'false'
            };
        } else { // hm, some other error
            throw err;
        }
    }).then(function(configDoc) {
        // sweet, here is our configDoc
    }).catch(function(err) {
        // handle any errors
    });
}

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
        // alert('kakakakaka')
    $('#cart_user_input').focus();
    //var load_product_cart();
    get_cart();
    //  load_product_cart()
});


async function deleteCartItem(item_cart_id, item_cart_rev) {
    try {
        L_user_db.remove(item_cart_id, item_cart_rev);
        $('#' + item_cart_id).slideUp();
        get_cart()
    } catch (err) {
        console.log(err);
    }
}
//Tomo los datos del boton delete


$(document).on('click', '.btn-dell-item-cart', function(event) {
    // var id = $(this).closest(".s-card-actv-item").slideUp();
    var item_cart_id = $(this).attr('item_cart_id');
    var item_cart_rev = $(this).attr('item_cart_rev');
    deleteCartItem(item_cart_id, item_cart_rev);
    //  get_cart();
});


/*
$(".btn-dell-item-cart").click(function() {
    //$(this).slideUp();
    var id = $(this).closest(".s-card-actv-item").attr('id');
    var item_cart_id = $(this).attr('item_cart_id');
    var item_cart_rev = $(this).attr('item_cart_rev');
    //alert(id);
    deleteCartItem(item_cart_id, item_cart_rev);
    // get_cart();
});

*/

/*
async function deleteCartItem(item_cart_id, item_cart_rev) {
    try {
        let user_data = await get_user_data(); //Traigo los datos de la seccion
        let db = await new PouchDB(user_data.url_db); /// COnectp con la DB
        await db.remove(item_cart_id, item_cart_rev);
        await get_cart();
        // return 
        //console.log(doc);
    } catch (err) {
        console.log(err);
    }
}

*/

//Abre y cierra el carrito
$(document).on('click', '.cart_button_close', function(event) {
    $('#right_main').addClass('move-right');
    get_cart();
});


// Agregar Item
async function add_product(card_product_id, card_product_img_url, card_product_name, card_product_val, card_product_discount, card_product_quantity, card_product_list) {
    // var itemData = [card_product_id, card_product_img_url, card_product_name, card_product_val, card_product_discount, card_product_quantity, card_product_list]
    await db.put({
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
        // load_product_cart();
        get_cart();
        Snackbar.show({
            text: '[ ' + card_product_quantity + ' ] ' + card_product_name + ' agregado con exito!',
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
    });
}

//get_cart();
/*
get_cart().then(() => {
    //  alert('la puta madre');
    get_cart_change();
    //  alert('Se cargo el then');
}).catch(error => {
    //no se cargo el Carrito
    alert('No se cargo el carrito');
});*/