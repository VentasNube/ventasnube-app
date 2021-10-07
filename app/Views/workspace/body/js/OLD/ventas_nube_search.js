/*! VentasNube search.js
 * ================
 * Main JS application file for VentasNube v3. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive VentasNube plugins.
 *
 * @Author  ventas Nube
 * @Support <http://www.ventasnube.com>
 * @Email   <http://www.ventasnube.com>
 * @version 3.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//* Inicio de logica search que usa CouchDB para alamacenar productos busacados


//Traer los item leyendo de la pounchDB
function load_product_seach() {
    db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
        readCartItemSearch(doc.rows);
    });
}

//Creo los items apartir del documento obtenido en la DB
function readCartItemSearch(todos) {
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
        console.log('A VER SI ANDAAAAAAA 1 -- --' + todo.doc['card_product_quantity']);
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
    //console.log('TODOS TODo-3 ------- ----' + JSON.stringify(todos));
    createSeachListItem(array_cart_items, total_neto_prod, total_cart_neto, total_neto_service, total_neto_discount, total_neto_tax, total_neto_pay);
}

//Hago los calculos de los items y los renderizo en el template
function createSeachListItem(array_cart_items, total_neto_prod, total_cart_neto, total_neto_service, total_neto_discount, total_neto_tax, total_neto_pay) {
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

// NUEVAS FUNCIONES FINALES

// CARGO LOS PRODUCTOS DE SQL EN LA DB LOCAL y COUCHDB
function charge_all_docs_local(remote_items) {
    db.bulkDocs({ docs: remote_items },
        function(err, response) {
            // handle err or response
        });
}

//// FUNCION PARA TRAER TODAS LAS CONSULTAS DE MODULOS GET EN AJAX CON SU TEMPLATE Y SU CONTRUCTOR /////
function get_items_sql_db(controler_data, data) { // Ejemplo : body, top_bar, top_bar_template, ##top_nav-bar-copiled
    // ID DE COMPILACION //      
    var id_copiled = $(id_copiled);
    var search_m_input = '*';
    //// CONTRUCTOR de URLS /// 
    var controler_data = 'search/search_item_data_sql'; //NOMBRE DE CONTROLADOR DATA
    //  var controler_template = 'search_card_product_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#card_product_result_items'; // ID DE COMPILACION //  
    // console.log('GET MODULO DOMAIN: ' + domain_pacht);
    var data = search_m_input;
    $.ajax({
        url: 'search/search_item_data_sql', //Trae todos los modulos de usuario de la secion
        data: data,
        type: "POST",
        dataType: "json",
        success: function(response) {
            if (response) { ///// IMPRIME ////     
                charge_all_docs_local(response);
                console.log(response);
            } else {
                return response, // Devulevo el array resultado    
                    Snackbar.show({
                        text: 'No hay resultados',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
            };
        }
    });
};

///----(Busco los datos en la PouncDB y compilo la vista)-----/
function get_search_items(data) {
    var pacht = 'search'; //CONTROLADOR PRINCIPAL
    var controler_data = 'search_card_product_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'search_card_product_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#card_product_result_items'; // ID DE COMPILACION //  
    //var data = search_m_input;
    console.log(data);
    get_search_items_ajax_db(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};

// get_items_sql_db(); //Cargo toda la lista de productos de sql a couchdb
// CReo variables locales
var documents = 'No hay documentos';
var fuse = '';

//Tomo los datos de pouch y creo un array personalizado y lo cargo en la variable global documents
function get_all_item_punchDb() {
    db.allDocs({
        include_docs: true,
        // attachments: true,
        //   startkey: data,
        //  endkey: data + '\ufff0',
        //limit: 18,
        // key:data
        //inclusive_end:data
        // endkey: RegExp(data, 'i')
    }).then(function(result) {
        var new_array = [];
        var items = result.rows;
        var i = 0;
        //   console.log(items)
        for (i = 0; i < items.length; i++) {
            // hacer algo con a[i];
            var new_item = {
                name: items[i].doc.descricao,
                cat: items[i].doc.cat,
                doc: items[i].doc
            }
            new_array.push(new_item);
        }
        documents = new_array; //Array Formateado
        var options = {
            // isCaseSensitive: false,
            // includeScore: false,
            // shouldSort: true,
            // includeMatches: false,
            // findAllMatches: false,
            // minMatchCharLength: 1,
            // location: 0,
            // threshold: 0.6,
            // distance: 100,
            // useExtendedSearch: false,
            // ignoreLocation: false,
            // ignoreFieldNorm: false,
            keys: [
                "name",
                "cat"
            ]
        };
        // var options = { keys: ['title', 'author.firstName'] }
        //Create the Fuse index
        var myIndex = Fuse.createIndex(options.keys, documents);
        // initialize Fuse with the index
        fuse = new Fuse(documents, options, myIndex);
        //fuse = new Fuse(documents, options);
        //console.log(fuse);
    }).catch(function(err) {
        console.log(err);
    });
}
//tomo el array documents y los recorro con fuse.js y compilo la vista
function search_item_js(search_val) {
    //console.log(fuse);
    var url_template = 'search/search_card_product_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#card_product_result_items'; // ID DE COMPILACION // 
    // console.log('cargo fuse' + fuse);
    var result = fuse.search(search_val, { limit: 18 });
    //fuse.search(this.itemTitle, {limit: 20});
    var search_result = {
        search_product: result
    }
    if (result.length > 0) {
        renderHandlebarsTemplate(url_template, id_copiled, search_result);
        //   console.log(result);
    } else {
        $('#card_product_result_items').html('<h3 class="padding-20 text-left" >Sin resultados... </h3>')
    }
}

//Input de busqueda 
$("input[name=searchInput]").focusin(function(documents) {
    event.preventDefault();
    console.log('Creo el array con los items de PounchDb');
    get_all_item_punchDb();
});
$("input[name=searchInput]").keyup(function() {
    event.preventDefault();
    var search_m_input = $(this).val();
    var btn_filter = $(this).prev('.search_cat_btn').find('span').attr('search_m_t_name');
    search_item_js(search_m_input);
});

//Botones de tipos de busqueda 
$(document).on('click', '.search_button_cat', function(event) {
    var search_cat_selected_btn = $(this).html();
    var search_cat_selected = $(this).attr('search_cat');
    var search_cat_input = $('.search_cat_btn').html();

    $('.search-title').find('.search_button_cat').removeClass('active');
    $(this).addClass('active');

    //alert(search_cat_selected_btn);
    $('.search_cat_btn').html(search_cat_selected_btn);
    //$('#searchInput').val('');
    $('#searchInput').focus();
});

$(document).on('click', '.search_button_board_li', function(event) {
    var search_cat_selected_btn = $(this).html();

    var search_cat_selected_btn_print = $(this).parent().find('.search_m_t').html();

    var search_cat_selected = $(this).attr('search_cat');

    var search_cat_input = $('.search_cat_btn').html();
    var search_cat_btn = $('.search_cat_btn').html();

    $('.search-title').find('.search_button_board').removeClass('active');
    $('.search-title').find('.search_button_board').addClass('active');
    // $(this).addClass('active');
    // alert(search_cat_selected_btn);
    $('.search_button_board').html(search_cat_selected_btn_print + ' <i class="hidden-xs hidden-sm material-icons">expand_more</i>');
    $('.search_cat_btn').html(search_cat_selected_btn_print);
    // $('#searchInput').val('');
    $('#searchInput').focus();
});