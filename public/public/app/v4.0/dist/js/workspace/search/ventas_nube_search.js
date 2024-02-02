/*! VentasNube search.js
 * ================
 * Main JS application file for VentasNube v4. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive VentasNube plugins.
 *
 * @Author  ventas Nube
 * @Support <http://www.ventasnube.com>
 * @Email   <http://www.ventasnube.com>
 * @version 3.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

// Inicio de logica search que usa CouchDB para alamacenar productos busacador
// NUEVAS FUNCIONES FINALES 2021
// Variables Globales
var documents = 'No hay documentos';
var fuse = '';

var search_catalog = null;
var search_contact = null;
var search_board = null;

var category_list = null;
var attributes = null;

async function search_db() {
    try {
        price_doc = await L_catalog_db.get('price_list', { include_docs: true, descending: true });
        //DOC DE CATEGORIAS PRODUCTOS
        category_list = await L_catalog_db.get('category_list', { include_docs: true, descending: true });
        //DOC ATRIBUTOS COLOR, TALLE, PESO, TAMANO
       // attributes = await L_catalog_db.get('attributes', { include_docs: true, descending: true });
       // get_search_module(ws_info, ws_lang_data, ws_left_nav_data)
    } catch (err) {
        Snackbar.show({
            text: err.reason,
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-left',
            duration: 50000
        });
    }
}

////----(4 Search Module)---/////
async function get_search_module(ws_info, ws_lang_data, ws_left_nav_data,board_name) {
    try {
        ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
       //  var board_name = await getUrlVal('t');
       //  var module_name = await getUrlVal('type');

        let module_name = 'board';
      /*  if (board_name === null) {
            board_name = readCookie('board-now-' + ws_id);
        }*/
        board_name = readCookie('board-now-' + ws_id);
        /*if (board_name !== 'sell' && board_name !== 'board' && board_name !== 'service_order'  && board_name !== 'service_turn'  ) {
          board_name = 'sell';
        // alert('No estoy en el board');
        }*/
        // Mapeo el contenido del objeto ws_left_nav M
        ws_left_nav_data = ws_left_nav['ws_left_nav'];
        var ws_search_data = {
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user: user_data,
            module_name: module_name,
            ws_left_nav_data: ws_left_nav_data,
            board_type_name: board_name,
        }
        //console.log('SEARCH ARRAYYY ');
       // console.log('SEACH CONSOLE', ws_search_data);
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/search/search_module.hbs', '#search_module_compiled', ws_search_data);
    }
    catch (err) {
        console.log('ERROR CONSOLE', err);
    }
};

//TODO LOS ITEMS FILTRADOS DEL CART Y ARMO UN ARRA PARA ENVIAR A FUSE
function get_search_catalog_Old(type_order) {

    // type = 'product';
    console.log("type_order SEARCH:", type_order)
    L_catalog_db.query('get/' + type_order, {
        include_docs: false,
        descending: false,
        // attachments: true,
        // startkey: data,
        // endkey: data + '\ufff0',
        // limit: 18,
        // key:data
        // inclusive_end:data
        // endkey: RegExp(data, 'i')
    }).then(function (result) {
        // alert(result);
        // console.log('Proceso el array con get all puch');
        var new_array = [];
        var items = result.rows;       
        
        
        var i = 0;
        //   console.log(items)
        for (i = 0; i < items.length; i++) {
            // hacer algo con a[i];
           
            var new_item = {
                _id:items[i].value._id,
                _rev:items[i].value._rev,
                variant_id:items[i].value.variant_id,
                name: items[i].value.name,
                description:items[i].value.description,
                tipo:items[i].value.tipo,
                price: items[i].value.price,
                cost_price: items[i].value.cost_price,
                available_quantity:items[i].value.available_quantity,
                currency: items[i].value.currency,
                cat: items[i].value.cats,
                tags: items[i].value.tags,
                sku: items[i].value.sku,
                picture_min: items[i].value.picture_min,
                picture_max:  items[i].value.picture_max,
                price_list:items[i].value.price_list,
                //doc: items[i].value
            }            
            new_array.push(new_item);
        }

      //  console.log(' new_array NEWW ARRAY', new_array);
      //   console.log( 'new_item SEARCHHH COMPLETO new_item NEWW ITEM',new_item);
      //   console.log( 'new_item SEARCHHH COMPLETO items',items);
        //  documents = new_array; //Array Formateado
        documents = new_array
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
                "sku",
                "tags",
                "category.value",
                "trade.value",
            ]
        };
        // var options = { keys: ['title', 'author.firstName'] }
        //Create the Fuse index
        var search_catalog_index = Fuse.createIndex(options.keys, documents);
        // initialize Fuse with the index
        search_catalog = new Fuse(documents, options, search_catalog_index);
     //   console.log( 'new_item SEARCHHH COMPLETO search_catalog',search_catalog);
    }).catch(function (err) {
        console.log(err);
    });
}


async function get_search_catalog(type_order) {
    try {
      console.log("type_order SEARCH:", type_order);
  
      const result = await L_catalog_db.query('get/' + type_order, {
        include_docs: false,
        descending: false,
      });
  
      const items = result.rows;

      console.log('items',items)
      const new_array = items.map(function (item) {
        return {
          _id: item.value._id,
          _rev: item.value._rev,
          variant_id: item.value.variant_id,
          name: item.value.name,
          description: item.value.description,
          tipo: item.value.tipo,
          price: item.value.price,
          cost_price: item.value.cost_price,
          available_quantity: item.value.available_quantity,
          currency: item.value.currency,
          cat: item.value.cats,
          tags: item.value.tags,
          sku: item.value.sku,
          picture_min: item.value.picture_min,
          picture_max: item.value.picture_max,
          price_list: item.value.price_list,
        };
      });
  
      documents = new_array;
  
      const options = {
        keys: [
          "name",
          "sku",
          "tags",
          "category.value",
          "trade.value",
        ],
      };
  
      const search_catalog_index = Fuse.createIndex(options.keys, documents);
      search_catalog = new Fuse(documents, options, search_catalog_index);
      console.log('new_item SEARCHHH COMPLETO search_catalog', search_catalog);
    } catch (err) {
      console.log(err);
    }
  }
  

// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_search_contact(type_order) {
    // Traigo los resultados de una vista

    var type_order = 'by_type_and_status'
    let response = await L_contact_db.query(
        'contact_get/'+type_order, {
        include_docs: true,
        descending: true
    }
    ); //Conceto con la vista de diseno
    if (response.rows) {
        const rows = response.rows;
       // console.log('get_search_contact AAA',rows);

        documents = await rows.map(item => {
            new_items = {};
            // Mapeo el array
            new_items['_id'] = item.value._id;
            new_items['_rev'] = item.value._rev;
            new_items['first_name'] = item.value.first_name;
            new_items['last_name'] = item.value.last_name;
            new_items['phone'] = item.value.phone;
            new_items['email'] = item.value.email;
            new_items['document_number'] = item.value.document_number;
            ////
            new_items['address'] = item.value.address;
            new_items['address_number'] = item.value.address_number;
            new_items['address_floor'] = item.value.address_floor;
            new_items['address_city'] = item.value.address_city;
            new_items['address_state'] = item.value.address_state;
            new_items['address_country'] = item.value.address_country;
            new_items['price_list'] = item.value.price_list;


            return new_items;
        });
    
        //Imprimo el resultado en patalla
        //print_contact_item(all_items_array);
        // CONFIGURO LA VARIABLE GLOBAL FUSE PARA USAR EN TODOS LADOS ya con el array de los resultados
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
            includeScore: true,
            useExtendedSearch: true,
            keys: [
                "first_name",
                "last_name",
                "phone",
                "document_number",
                "email"
            ]
        };
        var search_contact_index = Fuse.createIndex(options.keys, documents);
        // initialize Fuse with the index
        search_contact = new Fuse(documents, options,search_contact_index);
    }
    else {
        //return all_cart_item(false);
    }
}


//Tomo el array documents y los busco el input con fuse.js y compilo la vista de los productos 
/*
async function  get_search_contactNOOO(search_val) {
    //Armo el array para renderizar los items
    var new_items_search = search_contact_fuse.search(search_val, { sortFn: (a, b) => { a > b }, limit: 18 }); //Sort odena de mayor a menor segun el resultado A>b b<A
    //Mapeo el resultado fuera de item
    search_all_items_map_array = await new_items_search.map(it => {
        console.log('new_items_search',new_items_search)
        new_items = {};
        // Mapeo el array
        new_items['_id'] = it.item._id;
        new_items['_rev'] = it.item._rev;
        new_items['first_name'] = it.item.first_name;
        new_items['last_name'] = it.item.last_name;
        new_items['phone'] = it.item.phone;
        new_items['email'] = it.item.email;
        new_items['document_number'] = it.item.document_number;
        new_items['address'] = it.item.address;
        new_items['address_number'] = it.item.address_number;
        new_items['address_floor'] = it.item.address_floor;
        new_items['address_city'] = it.item.address_city;
        new_items['address_state'] = it.item.address_state;
        new_items['address_country'] = it.item.address_country;
        new_items['price_list'] = it.item.price_list;
        return new_items;
    });

    console.log('search_all_items_map_array',search_all_items_map_array);
    if (search_all_items_map_array.length > 0) {
        print_contact_item(search_all_items_map_array);
    } else {
        $('#card_product_result_items').html('<h3 class="padding-20 text-left" >Sin resultados... </h3>');
    }
}
*/

//TODO LOS ITEMS FILTRADOS DEL CART Y ARMO UN ARRA PARA ENVIAR A FUSE
function get_search_board(type_order) {

    // type = 'product';
   // console.log("type_order SEARCH:", type_order)
    L_board_db.query('get/' + type_order, {
        include_docs: false,
        descending: false,
        // attachments: true,
        // startkey: data,
        // endkey: data + '\ufff0',
        // limit: 18,
        // key:data
        // inclusive_end:data
        // endkey: RegExp(data, 'i')
    }).then(function (result) {
        // alert(result);
        // console.log('Proceso el array con get all puch');
        var new_array = [];
        var items = result.rows;
        var i = 0;
        //   console.log(items)
        for (i = 0; i < items.length; i++) {
            // hacer algo con a[i];
            var new_item = {
                name: items[i].value.name,
                price: items[i].price,
                cost_price: items[i].cost_price,
                currency: items[i].currency,
                cat: items[i].value.cats,
                tags: items[i].value.tags,
                sku: items[i].value.sku,
                attribute_combinations: items[i].value.attribute_combinations,
                doc: items[i].value
                // doc: items[i].doc
            }
            /*  var new_item = {
                  name: items[i].status,
                  cat: items[i].status,
                  sold_quantity: items[i].sold_quantity,
                  cost_price: items[i].cost_price,
                  limit_discount: items[i].limit_discount,
                  sku: items[i].sku,
                  currency: items[i].currency,
                  price: items[i].price,
                  profit_percentage: items[i].profit_percentage,
                  profit_percentage_active: items[i].profit_percentage_active,
                  stock_list: items[i].stock_list,
                  picture_min: items[i].pictures.min,
                  picture_max: items[i].pictures.max
                      // doc: items[i].doc
              }*/
            new_array.push(new_item);
        }


        documents = new_array; //Array Formateado
        var options = {
            keys: [
                "name",
                "sku",
                "tags",
                "cat"
            ]
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
           
        };
        // var options = { keys: ['title', 'author.firstName'] }
        //Create the Fuse index
        var search_board_index = Fuse.createIndex(options.keys, documents);
        // initialize Fuse with the index
        search_board = new Fuse(documents, options,search_board_index);
    }).catch(function (err) {
        console.log(err);
    });
}

//Tomo el array documents y los busco el input con fuse.js y compilo la vista de los productos 
async function search_print_item(search_val) {
    var result = null;
    let type_search = $('#select_type_search').attr("type_search");
    if (type_search == 'search_product' || type_search == 'search_service') {
       // console.log("TYPE SEARCH",type_search);
        var result = search_catalog.search(search_val, { limit: 18 });
        var type_search_card = 'card_'+type_search;
    }
    else if (type_search == 'search_contact') {
        //console.log("TYPE SEARCH", type_search);
        var result = search_contact.search(search_val, { limit: 18 });
        var type_search_card = 'card_'+type_search;
    } else if (
        type_search == 'search_order_sell' || type_search == 'search_order_purchase' ||
        type_search == 'search_order_service_order' || type_search == 'search_order_purchase_service_turn'
    ) {
        var result = search_board.search(search_val, { limit: 18 });
        var type_search_card = 'card_search_order';
    }
    var url_template = '/public/app/v4.0/dist/hbs/workspace/search/card/' + type_search_card + '.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#card_product_result_items'; // ID DE COMPILACION // 
    //var result = fuse.search(search_val, { limit: 18 });
    //Armo el array para renderizar los items
    var search_result = {
        search_result: result,
        type_search:type_search,
        price_list: price_doc.price_list,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles,
    }
    if (result.length > 0) {
        renderHandlebarsTemplate(url_template, id_copiled, search_result);
      //  console.log('search_print_item AAAAA NEWWW ACAA', search_result);
    } else {
        $('#card_product_result_items').html('<h3 class="padding-20 text-left" >Sin resultados... </h3>');
    }
}

//Boton cambiar lista de precio
function variations_price(element) {
    //    $(".card_item_select_price").click(function () {
    var card_item_price = $(element).html();
    var card_product_val = $(element).find('label').html();
    $(element).parent().parent().parent().find(".card_item_selected_price").html(card_item_price);
    $(element).parent().parent().parent().parent().parent().find(".card_product_val").val(card_product_val);
    //    alert(card_product_val);
    //  });
}

//Boton setear variacion

function variations_set(element) {
    // console.log(elemento);
    event.preventDefault();
    var buton_state = $('.open_detail .material-icons', element).html();
    var product_id = $(element).attr('product_id');

    var category_name = $(element).attr('category_name');
    if (buton_state == 'add_shopping_cart') {
        $(element).addClass('open');
        //Efecto ripple
        $(element).parent().find(".content").addClass('ripple_efect');
        $(element).parent().find(".content").removeClass('ripple_efect_close');
        //Efecto in de los input
        $(element).parent().find(".card_product_details").addClass('fade-in');
        $(element).parent().find(".card_product_details").removeClass('fade-out');
        $(element).parent().parent().parent().find(".info").addClass('out'); //Oculto el div info
        //Cabio los valores  input 
        $(element).parent().find(".card_product_val").val();
        $(element).parent().find(".card_product_discount").val();
        $(element).parent().find(".card_product_quantity").focus().select();
        //Cambio el icono
        $(".material-icons", element).html('arrow_back');
        //    variations_add_cart(); //ACTIVO Boton agreagar al cart
    } else if (buton_state == 'arrow_back') {
        // $(".material-icons", element).html('add').addClass('chekin-icon');
        $(".material-icons", element).html('add_shopping_cart'); //Cambio el icono del boto
        $(element).parent().parent().parent().find(".info").removeClass('out'); //Muestro el div info
        $(element).removeClass('open'); //Efecto de boton 
        $(element).parent().find(".card_product_details").addClass('fade-out');
        $(element).parent().find(".card_product_details").removeClass('fade-in');
        $(element).parent().find(".content").addClass('ripple_efect_close');
        $(element).parent().find(".content").removeClass('ripple_efect');
    }
    // });

}

//Boton variables y las Renderizo
function variations_get(element) {
    let product_id = $(element).attr('product_id');
    let variant_id = $(element).attr('variant_id');
    // let id_copiled = '#variant_' + product_id; // ID DE COMPILACION // 
    let url_template = '/public/app/v4.0/dist/hbs/workspace/search/card_product_variant.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
    let id_copiled = '#variant_' + product_id; // ID DE COMPILACION // 


    L_catalog_db.get(product_id, function (err, doc) {
        if (err) { return console.log(err); }
        const variant_array = {
            //doc:doc,
            variant_id: variant_id,
            _id: doc._id,
            _rev: doc._rev,
            variations: doc.variations,
            name: doc.name,
            // tags: doc.tags,
            // price_list: price_doc.price_list,
            //  current: doc.price_list,
        }
        //  console.log(element);
        renderHandlebarsTemplate(url_template, id_copiled, variant_array);
    });

}

//Renderizo la variacion nueva en la tarjeta
function variations_select(element) {
    event.preventDefault();
    let product_id = $(element).attr('product_id'); //Id del producto selccionado
    let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
    let url_template = '/public/app/v4.0/dist/hbs/workspace/search/card_product_var_select.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
    let id_copiled = '#card_id_' + product_id; // ID DE COMPILACION //
    //Busco el doc por id actualizado y hago la carga de datos
    L_catalog_db.get(product_id, function (err, doc) {
        if (err) { return console.log(err); }
        //Busco dentro del doc el id seleccionado y cargo el objeto al compilador
        /*const var_doc =  doc.variations.filter(function(element){
            return element.id == variant_id;
        });*/
        //Busco el id en el array con find funcion de flecha
        const var_doc = doc.variations.find(element => element.id == variant_id);
        const variant_array = {
            //doc:doc,
            variant_id: variant_id,
            _id: doc._id,
            _rev: doc._rev,
            item: var_doc,
            name: doc.name,
            tags: doc.tags,
            price_list: price_doc.price_list,
            current: doc.price_list,
        }
        renderHandlebarsTemplate(url_template, id_copiled, variant_array);
        //Actualizo el boton variables
        //  console.log("var_doc");
      //  console.log('variant_array VARIANT ARRAY');
      //  console.log(variant_array);
    });
}

//Efecto para mostrar el boton de etidar en la tarjetas
function card_edit_variant() {
    
}

//TOMA EL FOCUS EN SEARCH ABRE EL MENU
$(document).on('focusin', '.search-input', function (element) {
    let type_search = $('#select_type_search').attr("type_search");
    if (type_search == 'search_product' || type_search == 'search_service') {
        console.log("TYPE SEARCH", type_search);
        get_search_catalog(type_search);//traigo los items del array
    }
    else if (type_search == 'search_contact') {
        console.log("TYPE SEARCH", type_search);
        get_search_contact(type_search);//traigo los items del array
    } else if (type_search == 'search_order_sell' && type_search == 'search_order_sell') {
        console.log("TYPE SEARCH", type_search);
        get_search_board(type_search);//traigo los items del array
    }
});

//Searh Input
$(document).on('keyup', '.search-input', function () {
    var search_input = $(this).val();
   // var btn_filter = $(this).prev('.search_cat_btn').find('span').attr('search_m_t_name');
   // search_item_js(search_input);
    search_print_item(search_input)
});

//Botones de tipos de busqueda 
$(document).on('click', '.search_button_cat', function (event) {
    var search_cat_selected_btn = $(this).html();
    var search_cat_selected = $(this).attr('search_cat');
    $('.search-title').find('.search_button_cat').removeClass('active');
    $(this).addClass('active');
    $('.search_cat_btn').html(search_cat_selected_btn);
    $('#select_type_search').attr("type_search", search_cat_selected);
    $('#searchInput').focus();
});

$(document).on('click', '.search_button_board_li', function (event) {
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
    $('.search_cat_btn').attr("type_search", search_cat_selected_btn_print);
    // $('#searchInput').val('');
    $('#searchInput').focus();
});

/// 2022 
//// BOTON SEARCH ///
async function search_open() {

    $('#searchBox').fadeIn();
    $('#searchInput').focus();
    $('body').addClass('search-active');
    createCookie('search-now-' + ws_id,  true, 30);//CREO UNA COKIE CON EL ULTIMO NOMBRE DE LA BOARD
  //  alert('Nueva BUSQUEDA')
  }
   

function search_close() {
    $('#searchBox').fadeOut();
    $('#searchInput').focus();
    $('body').removeClass('search-active');
    createCookie('search-now-' + ws_id,  false, 30);//CREO UNA COKIE CON EL ULTIMO estado del modulo
}



//Funcion que chekea el ultimo estado del cart
function chek_search_open() {
    var search_open = readCookie("left_nav_open_ws_" + ws_id);
    if (search_open == 'true') {
        search_open();
        alert('open')
        //  $('#right_main').addClass('move-right');
    } else if (search_open == 'false') {
        search_close() 
        //  $('#right_main').removeClass('move-right');
    }
}




$("#search_button_dell").click(function () {
    $('#searchInput').val('');
    $('#searchInput').focus();
});

/*
$(document).on('click', '.search_open', function (event) {
    // get_search_module(textobuscar);
    //  load_product_cart();
    search_open();
});
*/

// $(".search_close").click(function () {

$(document).on('click', '.search_close', function (event) {
    search_close();
});



//Inicio las funciones
search_db();