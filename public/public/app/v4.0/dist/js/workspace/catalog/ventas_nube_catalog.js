
/////////////////////////////////
// CATALOGO ( PRODUCTOS ) 2023 //
/////////////////////////////////
var all_items_array = {};
var search_fuse = null;
//userCtx
//CONCETO CON LA DB
var ws_catalog_db = 'ws_collections_' + ws_id;

//console.log('userCtx DATA CATALOGO:',userCtx);
//CREO LA DB
//L_catalog_db = new PouchDB(ws_search_db, { skip_setup: true });

//CREO LA DB CATALOGO
L_catalog_db = new PouchDB(ws_catalog_db, { skip_setup: true });
// SYNC LOCAL CON REMOTO
L_catalog_db.sync(url_R_db + ws_catalog_db, {
    live: true,
    retry: true,
    skip_setup: true
});

// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_all_catalog_intems(ws_id, filter) {
    let response = await L_catalog_db.query(
        'get/seach', {
        include_docs: true,
        descending: true
    }
    ); //Conceto con la vista de diseno
    if (response.rows) {
        const rows = response.rows;
        //  console.log('Respuesta Origial'); // []
        // console.log(response.rows);
        // alert(ws_id);
        //Filtro los items de este espacio de trabajo 
        //  var filter = 'Remera';
        /*   var filtered = rows.filter( 
                row => row.value.tags === 'Remera'
             ); 
        //FILTROS
        console.log('filtered ppppp');
        console.log(filtered);
        */
        // new_items = {}; //creo el array con la variable global
        all_items_array = await rows.map(item => {
            new_items = {};
            // Mapeo el array
            new_items['name'] = item.value.name;
            new_items['cats'] = item.value.cats;
            new_items['tags'] = item.value.tags;
            new_items['sku'] = item.value.sku;
            new_items['attribute_combinations'] = item.value.attribute_combinations;
            new_items['doc'] = item.value;
            //Formateo el array final
            //  all_items_map_array = {
            //     item:new_items
            // }
            return new_items;
        });

        //Imprimo el resultado en patalla
        print_catalog_item(all_items_array);
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
                "name",
                "sku",
                "tags",
                "cat"
            ]
        };
        var myIndex = Fuse.createIndex(options.keys, all_items_array);
        // initialize Fuse with the index
        search_fuse = new Fuse(all_items_array, options, myIndex);
    }
    else {
        //return all_cart_item(false);
    }
}

// TRAIGO LA BARRA DE BUSQUEDA
function get_nav_catalog(ws_info, ws_lang_data) {
    var ws_catalog_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/nav_bar.hbs', '#nav_bar_compiled', ws_catalog_data);
    //alert('cargo el bucador');
    // $('#cart_user_input').focus();
    console.log('NAV BAR CATALOG');
};
// TRAIGO LOS PRODUCTOS DEL CATALOGO
function get_items_catalog(ws_id) {



    var ws_catalog = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/catalog_items.hbs', '#content_catalog_commpiled', ws_catalog);
    // $('#cart_user_input').focus();
    //console.log('GET ITEMS CATALOG');
}

// TARJETAS DE PRODUCTOS
//Tomo el array documents y los busco el input con fuse.js y compilo la vista de los productos 
function print_catalog_item(new_items) {
    var search_result = {
        search_product: new_items,
        price_list: price_doc.price_list,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles,
    }
    console.log(search_result);
    if (new_items.length > 0) {
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/card_product.hbs', '#content_catalog_commpiled', search_result);
    } else {
        $('#card_product_result_items').html('<h3 class="padding-20 text-left" >Sin resultados... </h3>');
    }
}

//Tomo el array documents y los busco el input con fuse.js y compilo la vista de los productos 
async function search_catalog_item(search_val) {
    //Armo el array para renderizar los items
    var new_items_search = search_fuse.search(search_val, { sortFn: (a, b) => { a > b }, limit: 18 }); //Sort odena de mayor a menor segun el resultado A>b b<A
    //Mapeo el resultado fuera de item
    search_all_items_map_array = await new_items_search.map(it => {
        new_items = {};
        // Mapeo el array
        new_items['name'] = it.item.name;
        new_items['cats'] = it.item.cats;
        new_items['tags'] = it.item.tags;
        new_items['sku'] = it.item.sku;
        new_items['attribute_combinations'] = it.item.attribute_combinations;
        new_items['doc'] = it.item.doc;

        //Formateo el array final
        return new_items;
    });
    if (search_all_items_map_array.length > 0) {
        print_catalog_item(search_all_items_map_array);
    } else {
        $('#card_product_result_items').html('<h3 class="padding-20 text-left" >Sin resultados... </h3>');
    }
}

//Boton cambiar lista de precio
function cat_variations_price(element) {
    //    $(".card_item_select_price").click(function () {
    var card_item_price = $(element).html();
    var card_product_val = $(element).find('label').html();
    $(element).parent().parent().parent().find(".card_item_selected_price").html(card_item_price);
    $(element).parent().parent().parent().parent().parent().find(".card_product_val").val(card_product_val);
    //    alert(card_product_val);
    //  });
}

//Boton setear variacion
function cat_variations_set(element) {
    // console.log(elemento);
    event.preventDefault();
    var buton_state = $('.open_detail .material-icons', element).html();
    var product_id = $(element).attr('product_id');
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
function cat_variations_get(element) {
    let product_id = $(element).attr('product_id');
    let variant_id = $(element).attr('variant_id');
    let url_template = '/public/app/v4.0/dist/hbs/workspace/catalog/card_product_variant.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
    let id_copiled = '#cat_variant_' + product_id; // ID DE COMPILACION // 
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
function cat_variations_select(element) {
    event.preventDefault();
    let product_id = $(element).attr('product_id'); //Id del producto selccionado
    let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
    let url_template = '/public/app/v4.0/dist/hbs/workspace/catalog/card_product_var_select.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
    let id_copiled = '#cat_card_id_' + product_id; // ID DE COMPILACION //
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
        // renderHandlebarsTemplate(url_template, id_copiled, variant_array);
        //Actualizo el boton variables
        //  console.log("var_doc");
        //  console.log(variant_array);
    });
}

// ARMO LA URL DEL NAVEGADOR
async function post_url_history(module, id) {
    try {
        var product_id = $(element).attr('product_id');
        var variant_id = $(element).attr('variant_id');
        var product_doc = await L_catalog_db.get(product_id);
        var var_doc = product_doc.variations.find(response => response.id == variant_id);
        var product_doc_array = {
            product_doc: product_doc,
            product_variant: var_doc,
            name: product_doc.name,
            tags: product_doc.tags,
            // sku:product_doc.variations[variant_id].sku.value,
            price_list: price_doc.price_list,
            ws_lang_data: ws_lang_data,
            category_list: category_list

        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_view_item.hbs', '#right_main', product_doc_array);
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
    } catch (err) {
        console.log(err);
    }
}

// FUNCION PARA ARMAR LA VISTA DE UN PRODUCTO NORMAL 
async function catalog_view_item(element) {
    try {
        var product_id = $(element).attr('product_id');
        var variant_id = $(element).attr('variant_id');
        var product_doc = await L_catalog_db.get(product_id);
        var var_doc = product_doc.variations.find(response => response.id == variant_id);
        var product_doc_array = {
            product_doc: product_doc,
            product_variant: var_doc,
            name: product_doc.name,
            tags: product_doc.tags,
            price_list: price_doc.price_list,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            category_list: category_list
        }
        // console.log('price_doc.price_lis',price_doc.price_list);
        // console.log('var_doc.price_list',var_doc.price_list);
        // alert('Haaaaaaa');
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_view_item.hbs', '#right_main', product_doc_array);
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        var m_url = '?type=catalog&?t=product&?id=' + product_id + '&?v=' + variant_id;
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion      
    } catch (err) {
        console.log(err);
    }
}

// FUNCION QUE CREA LA VISTA TOMANDO LOS PARAMETROS DEL LA URL
async function catalog_view_item_url(m_id, m_var_id) {
    try {
        var product_id = m_id;
        var variant_id = m_var_id;
        var product_doc = await L_catalog_db.get(product_id);
        var var_doc = product_doc.variations.find(response => response.id == variant_id);
        var product_doc_array = {
            product_doc: product_doc,
            product_variant: var_doc,
            name: product_doc.name,
            tags: product_doc.tags, // Etiquetas
            // sku:product_doc.variations[variant_id].sku.value,
            price_list: price_doc.price_list,   //Lista de precios
            ws_lang_data: ws_lang_data, //Documento de lenguaje
            user_roles: user_Ctx.userCtx.roles // User roles
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_view_item.hbs', '#right_main', product_doc_array);
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        // var m_name = $(this).attr('s_url_t_m'); //Trae Pacht url /pacht/    
        // var m_url = url_app +'?type=catalog?=' + m_name; // Armo la url completa del linck
        //  history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion        
    } catch (err) {
        console.log(err);
    }
}

async function coun_items_cart() {



}

// FUNCION PARA EDITAR PRODUCTO
async function catalog_edit_itemNOOL(element) {
    try {
        var product_id = $(element).attr('product_id');
        var variant_id = $(element).attr('variant_id');
        var new_category_list = await L_catalog_db.get('category_list');
        var new_trade_list = await L_catalog_db.get('trade_list');
        var new_model_list = await L_catalog_db.get('model_list');

        var attributes = await L_catalog_db.get('attributes');

        var price_doc = await L_catalog_db.get('price_list');
        var currency_doc = await L_catalog_db.get('currency_list');

        var product_doc = await L_catalog_db.get(product_id);
        var var_doc = product_doc.variations.find(response => response.id == variant_id);

        var product_doc_array = {
            product_doc: product_doc,
            product_variant: var_doc,
            name: product_doc.name,
            tags: product_doc.tags,
            price_list: price_doc.price_list,
            currency_list: currency_doc.currency_list,
            currency_default: currency_doc.currency_default,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            category_list: new_category_list,
            trade_list: new_trade_list,
            model_list: new_model_list,
            attributes_list: attributes,
        }

        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/edit/catalog_edit_item.hbs', '#right_main', product_doc_array);
       // renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/edit/catalog_new_variation.hbs', '#edit_variations_main', product_doc_array);
        // console.log('product_doc_array', product_doc_array);
        // alert('Holaaaaaa');
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        var m_url = '?type=catalog&?t=edit&?id=' + product_id + '&?v=' + variant_id;
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion     
        // return item_print;
    } catch (err) {
        console.log(err);
    }
}

// FUNCION PARA EDITAR PRODUCTO
async function catalog_edit_item(element) {
    try {
        var product_id = $(element).attr('product_id');
        var variant_id = $(element).attr('variant_id');
        var new_category_list = await L_catalog_db.get('category_list');
        var new_trade_list = await L_catalog_db.get('trade_list');
        var new_model_list = await L_catalog_db.get('model_list');

        var price_doc = await L_catalog_db.get('price_list');
        var currency_doc = await L_catalog_db.get('currency_list');
        var attributes = await L_catalog_db.get('attributes');

        var product_doc = await L_catalog_db.get(product_id);
        var var_doc = product_doc.variations.find(response => response.id == variant_id);
        var product_doc_array = {
            product_doc: product_doc,
            product_variant: var_doc,
            name: product_doc.name,
            tags: product_doc.tags,
            price_list: price_doc.price_list,
            currency_list: currency_doc.currency_list,
            currency_default: currency_doc.currency_default,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            category_list: new_category_list,
            trade_list: new_trade_list,
            model_list: new_model_list,
            attributes_list: attributes,
        }
            renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/edit/catalog_edit_item.hbs', '#right_main', product_doc_array, function () {
                let parentElement_nav = document.querySelector('#edit_variations_main');
                let id_compiled_nav = '#' + parentElement_nav.id;
                console.log('id_compiled_nav UUUAAAAAA', id_compiled_nav);
                if (id_compiled_nav) {
                    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/edit/catalog_new_variation.hbs', id_compiled_nav, product_doc_array, function () {
                        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
                        $('#right_main').removeClass('move-right');
                        var m_url = '?type=catalog&?t=edit&?id=' + product_id + '&?v=' + variant_id;
                        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion     
                        coun_items_cart();
                        //  createCookie('board-now-' + ws_id, board_name, 30);//CREO UNA COKIE CON EL ULTIMO NOMBRE DE LA BOARD
                        //    coun_items_broup(board_name);
                        //   scrollerMove();
                        //   get_board_onscroll(board_name);//activa el evento scroll para graer mas ordenes
                    });
                }
            })
    } catch (err) {
        console.log(err);
    }
}

/// EDITAR LAS MONEDAS EN EL FORMULARIO
// SELECCIONO
async function catalog_product_select_currency(element, new_model) {
    let item_value_id = $(element).attr('item_value_id');
    var item_value = $(element).attr('item_value');
    var item_value_name = $(element).attr('item_value_name');
    // var product_id = $(element).attr('doc_id');
    var variant_id = $(element).attr('variant_id');
    try {
        //console.log(item_value_id,variant_id,item_value);
        $('#catalog_product_selected_currency_' + variant_id).attr('item_value_id', item_value_id);
        $('#catalog_product_selected_currency_' + variant_id).attr('item_value', item_value);
        $('#catalog_product_selected_currency_' + variant_id).html(item_value);

        $('#catalog_product_selected_currency_title_value' + variant_id).html(item_value);
        $('#catalog_product_selected_currency_title' + variant_id).html(item_value_name);
        //traigo el documento a editar
    } catch (err) {
        console.log(err);
    }

}

// FUNCION QUE CREA LA VISTA TOMANDO LOS PARAMETROS DEL LA URL
async function catalog_edit_item_url(product_id, variant_id) {
    try {
        var product_id = product_id;
        var variant_id = variant_id;
        var new_category_list = await L_catalog_db.get('category_list');
        var new_trade_list = await L_catalog_db.get('trade_list');
        var new_model_list = await L_catalog_db.get('model_list');
        var price_doc = await L_catalog_db.get('price_list');
        var currency_doc = await L_catalog_db.get('currency_list');
        var attributes = await L_catalog_db.get('attributes');

        var product_doc = await L_catalog_db.get(product_id);
        var var_doc = product_doc.variations.find(response => response.id == variant_id);
        var product_doc_array = {
            product_doc: product_doc,
            product_variant: var_doc,
            name: product_doc.name,
            tags: product_doc.tags,
            price_list: price_doc.price_list,
            currency_list: currency_doc.currency_list,
            currency_default: currency_doc.currency_default,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            category_list: new_category_list,
            trade_list: new_trade_list,
            model_list: new_model_list,
            attributes_list: attributes
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/edit/catalog_edit_item.hbs', '#right_main', product_doc_array);
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        var m_url = '?type=catalog&?t=edit&?id=' + product_id + '&?v=' + variant_id;
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion     
        return item_print;
    } catch (err) {
        return false;
        console.log(err);
    }
}

//Leer sub categorias
//Crear sub categorias
//Eliminar sub categorias
/****  VARIATIONS VIEW ITEM 2021  *******/
//Boton cambiar lista de precio
function view_item_variations_price(element) {
    //    $(".card_item_select_price").click(function () {
    var card_item_price = $(element).html();
    var card_product_val = $(element).find('label').html();
    $(element).parent().parent().parent().find(".card_item_selected_price").html(card_item_price);
    $(element).parent().parent().parent().parent().parent().find(".card_product_val").val(card_product_val);
    //    alert(card_product_val);
    //  });
}

//Boton variables y las Renderizo
function view_item_variations_get(element) {
    let product_id = $(element).attr('product_id');
    let variant_id = $(element).attr('variant_id');
    let url_template = '/public/app/v4.0/dist/hbs/workspace/catalog/card_view_product_variant.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
    let id_copiled = '#view_item_variant_' + product_id; // ID DE COMPILACION // 
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
function view_item_variations_select(element) {

    // let product_id = $(element).attr('product_id'); //Id del producto selccionado
    //  let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
    //  alert('Mando al la variante' + element);
    catalog_view_item(element);
}

/***  FIN VIEW ITEM */

$(document).on('click', '.catalog_edit_item', function (event) {
    //$('#master_popup').modal('show');
    // get_catalog_new_item();
    //  catalog_edit_item()
    catalog_view_item(product_id)
    alert('catalog_edit_item()' + product_id);
});

$(document).on('focusin', '.catalog_search', function (element) {
    // cat_get_all_item_punchDb();
    //  cat_search_item_js();
    get_all_catalog_intems();
});

$(document).on('keyup', '.catalog_search', function () {
    var search_val = $(this).val();
    var btn_filter = $(this).prev('.search_cat_btn').find('span').attr('search_m_t_name');
    //search_catalog_item(search_m_input);
    console.log('all_items_array llll222');
    console.log(all_items_array);
    console.log('all_items_array llll2222');
    console.log(search_val);
    search_catalog_item(search_val, all_items_array)
});

$(document).on('click', '.view_variant', function (element) {
    var product_id = $(this).attr('product_id');
    catalog_view_item(product_id);
});

// TRAIGO EL CATALOGO Y IMPRIMO
async function get_catalog(ws_id) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/catalog.hbs', '#content_compiled', ws_cart);
    get_nav_catalog();
    get_all_catalog_intems();
}

async function put_catalog(doc_id, my_doc) {
    try {
        var doc = await L_catalog_db.get(doc_id);
        var response = await L_catalog_db.put({
            _id: mydoc,
            _rev: doc._rev,
            doc: my_doc
        });
        return response;
    } catch (err) {
        console.log(err);
        // return response
    }
}

//////////////////////////////
// NUEVO ( PRODUCTO ) 2023 //
//////////////////////////////

// TRAE EL FORMULARIO
async function catalog_new_item(element) {
    try {
        var new_category_list = await L_catalog_db.get('category_list');
        var new_trade_list = await L_catalog_db.get('trade_list');
        var new_model_list = await L_catalog_db.get('model_list');
        var price_doc = await L_catalog_db.get('price_list');
        var tax_doc = await L_catalog_db.get('tax_list');
        var currency_doc = await L_catalog_db.get('currency_list');
        var attributes = await L_catalog_db.get('attributes');
        
        var user_roles_permisions = user_Ctx.userCtx.roles;
        // console.log('user_roles_permisions', user_roles_permisions);

        var product_doc_array = {
            price_list: price_doc.price_list,
            tax_list:tax_doc,
            currency_list: currency_doc.currency_list,
            ws_lang_data: ws_lang_data,
            user_roles: user_roles_permisions,
            category_list: new_category_list,
            trade_list: new_trade_list,
            model_list: new_model_list,
            attributes_list: attributes
        }
        console.log('tax_doc CCCCC', product_doc_array)
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/create/catalog_create_product.hbs', '#right_main', product_doc_array);
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        var m_url = '?type=catalog&?t=new';
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion     
        return;
    } catch (err) {
        console.log(err);
    }
}

// BOTON CREAR PRODUCTO
$(document).on('click', '.catalog_new_item', function (event) {
    //  $('#master_popup').modal('show');
    // get_catalog_new_item();
    catalog_new_item();

});

// Crear variable (Carga todos los datos generales en un nuevo documento con el nombre y crea 1 sola variable )

///////////////////////////////////////////////
// NUEVA VARIABLE EN NUEVO ( PRODUCTO ) 2023 //
//////////////////////////////////////////////

// AGREGAR variable al producto 
async function catalog_new_item_new_product(element) {

    try {
        const new_doc_name = $("#catalog_new_product_name_input").val(); //Id del documento a editar
        const new_doc_time = new Date(); //Id del documento a editar
        const new_doc_author = user_Ctx.userCtx.name; //Id del documento a editar
        const new_doc_workspace_id = ws_id; //Id del documento a editar
        // Seleccionar el elemento div con el id "new_prod_tag_main" y la clase "chips_items_main"
        const divTags = document.querySelector('div#new_prod_tag_main.chips_items_main');
        //Cat
        const new_doc_cat_value = $('#catalog_select_cat_value').html();
        const new_doc_cat_id = $('#catalog_select_cat_value').attr('catalog_select_cat_value');
        //Trade
        const new_doc_trade_value = $('#catalog_select_trade_value').html();
        const new_doc_trade_id = $('#catalog_select_trade_value').attr('catalog_select_trade_value');
        //Trade
        const new_doc_model_value = $('#catalog_select_model_value').html();
        const new_doc_model_id = $('#catalog_select_model_value').attr('catalog_select_model_value');
        const category = { id: new_doc_cat_id, value: new_doc_cat_value };
        const trade = { id: new_doc_trade_id, value: new_doc_trade_value };
        const model = { id: new_doc_model_id, value: new_doc_model_value };
        const type = $('#new_type_value_select').attr('type_order');
        console.log('TYPE ITEM :', type);
        // Obtener el texto de cada hijo del elemento div
        const textoTags = [];
        divTags.childNodes.forEach(childNode => {
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                const span = childNode.querySelector('span.chips_text');
                if (span) {
                    textoTags.push(span.textContent);
                }
            }
        });
        const new_doc_tags = textoTags
        var doc_id_s = String(new_doc_name); //Combierto el id del doc en un string
        var new_doc_id_random = Math.floor(Math.random() * (+'1000000' - +'1')) + +'1';

        var tax_doc = await L_catalog_db.get('tax_list');
        var price_doc = await L_catalog_db.get('price_list');
        var currency_doc = await L_catalog_db.get('currency_list');


        let currency_select = currency_doc.currency_default;
        let tax_select = tax_doc.tax;

        let textoSinEspacios = new_doc_name.replace(/\s+/g, '-');

        const new_doc_id = textoSinEspacios + "-" + new_doc_id_random;
        var new_variant_id = Math.floor(Math.random() * (+'1000' - +'1')) + +'1';
        // Documento variable template
        var variations = [{
            "id": new_variant_id,
            currency_select,
            tax_select,
            "sku": {
                "id": "EAN",
                "value": ""
            },
            "pictures": [
                {
                    "max": "/public/app/v4.0/dist/img/catalog/product-thumbnail.png",
                    "min": "/public/app/v4.0/dist/img/catalog/product-thumbnail.png"
                }
            ],
            "attribute_combinations": [
                {
                    "id": "COLOR",
                    "id_name": "Color",
                    "name": "Roja",
                    "value": "EF5350"
                },
                {
                    "id": "SIZE",
                    "id_name": "Talle",
                    "name": "Medium",
                    "value": "M"
                }
            ],

            "price_list": [
                {
                    "id": 1,
                    "value": 100,
                    "currency": {
                        "id": "ARS",
                        "value": "$"
                    },
                }
            ],
            "stock_invetary": [
                {
                    "id": 311,
                    "create": "2023-06-15T04:54:29.744Z",
                    "in_datetime": "2023-06-15T04:54:29.744Z",
                    "update_datetime": "2023-06-15T04:54:29.744Z",
                    "updateUser": "smartmobile.com.ar@gmail.com",
                    "type": "in",
                    "in_stock": 50,
                    "out_stock": 0,
                    "real_stock": 50,
                    "cost_price": 1000,
                    "currency_id": "2",
                    "currency_value": "$",
                    "currency_name": "Peso Argentino",
                    "location_id": 1
                }
            ],

            "sold_quantity": 0,
            "description": {
                "status": true,
                "value": "Nueva Descripcion"
            },
            "color": {
                "status": false,
                "value": "#4f78ba"
            },
            "size": {
                "status": false,
                "value": ""
            },
            "status": {
                "status": true,
                "value": ""
            }
        }];
        // Documento template producto
        var response = await L_catalog_db.put({
            _id: new_doc_id,
            "name": new_doc_name,
            "author": new_doc_author,
            "start_time": new_doc_time,
            "workspace_id": new_doc_workspace_id,
            "last_update_at": [
                {
                    "username": new_doc_author,
                    "datetime": new_doc_time
                }
            ],
            "status": "active",
            "condition": "new",
            "type": type,
            "tags": new_doc_tags,
            category,
            trade,
            model,
            "cost_price": [
                {
                    id: 1,
                    value: 1000,
                    id_stock_invetary: 311
                }
            ],
            "available_quantity": null,
            "sold_quantity": null,
            "limit_discount": null,
            "permalink": null,
            "descriptions": [
                null
            ],
            variations,
        });
        if (response) {
            //Imprimo el item en la pantalla 
            // $(element).prev('div').append('<div class="chips_item  s-card-cat pull-left" val_text="" > <a    href="#" onclick="dell_tag(this)"><span class="button material-icons text-s lh-n">  highlight_off</span> </a><span class="chips_text"> Se creo'+ new_doc_id +'</span></div>');

            var product_doc = await L_catalog_db.get(new_doc_id);
            var new_category_list = await L_catalog_db.get('category_list');
            var new_trade_list = await L_catalog_db.get('trade_list');
            var new_model_list = await L_catalog_db.get('model_list');
            var price_doc = await L_catalog_db.get('price_list');
            var currency_doc = await L_catalog_db.get('currency_list');
            var user_roles_permisions = user_Ctx.userCtx.roles;

            //  console.log('user_roles_permisions', user_roles_permisions);

            var product_doc_array = {
                product_doc: product_doc,
                price_list: price_doc.price_list,
                currency_list: currency_doc.currency_list,
                ws_lang_data: ws_lang_data,
                user_roles: user_roles_permisions,
                category_list: new_category_list,
                trade_list: new_trade_list,
                model_list: new_model_list,
                attributes_list: attributes
            }

            renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/create/catalog_create_variation.hbs', '#create_prod_new_variations_main', product_doc_array);

            Snackbar.show({
                text: 'Se creo con exito!' + new_doc_id,
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });

            console.log('product_doc', product_doc_array);
            // alert('Holaaaaaa');
            createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
            $('#right_main').removeClass('move-right');
            var m_url = '?type=catalog&?t=create_item&?id=' + new_doc_id + '&?v=' + new_variant_id;
            history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion 
            //new_variations_main
        } else {
            //Si no se grabo tira un error en pantalla
            $(element).css("color", "red");
        }
    } catch (err) {
        console.log(err);
    }

}

// AGREGAR variable al producto 
async function catalog_new_item_new_variant(element) {

    try {

        const new_doc_name = $("#catalog_new_product_name_input").val(); //Id del documento a editar
        const new_doc_tags = $("#catalog_new_product_name_tags").val(); //Id del documento a editar

        const new_doc_cat = $("#catalog_new_product_name_tags").val(); //Id del documento a editar
        const new_doc_trade = $("#catalog_new_product_name_tags").val(); //Id del documento a editar
        const new_doc_model = $("#catalog_new_product_name_tags").val(); //Id del documento a editar

        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        //  const variant_id = $(element).attr('variant_id'); // EL ID DE LA VARIABLE
        //Compruebo si el input se habilita con un input true false, O si no tiene checkbox
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento actualizado
        var new_variant_id = Math.floor(Math.random() * (+'1000' - +'1')) + +'1';
        // var new_variant_id = doc.variations.length + 1; //Cuento el numero variables q hau y le sumo uno para dar el nuevo numero de id
        var doc_varian_id = doc.variations.find(response => response.id == new_variant_id);// Compruebo q el id no exista

        if (!doc_varian_id) {

            var new_variant = {
                "id": new_variant_id,
                "tax": [
                    {
                        "id": "0",
                        "value": "21"
                    },
                    {
                        "id": "1",
                        "value": "10"
                    }
                ],
                "sku": {
                    "status": true,
                    "value": ""
                },
                "pictures": [
                    {
                        "max": "/public/img/catalog/product/max/remera_azul.jpg",
                        "min": "/public/img/catalog/product/max/remera_azul.jpg"
                    }
                ],
                "attribute_combinations": [
                    {
                        "id": "COLOR",
                        "id_name": "Color",
                        "name": "Roja",
                        "value": "EF5350"
                    },
                    {
                        "id": "SIZE",
                        "id_name": "Talle",
                        "name": "Medium",
                        "value": "M"
                    }
                ],
                "price_list": [
                    {
                        "id": 1,
                        "value": 150
                    },
                    {
                        "id": 2,
                        "value": 100
                    }
                ],
                "stock_invetary": [

                ],
                "sold_quantity": 0,
                "description": {
                    "status": true,
                    "value": "Nueva Descripcion"
                },
                "color": {
                    "status": false,
                    "value": "#4f78ba"
                },
                "size": {
                    "status": false,
                    "value": ""
                },
                "status": {
                    "status": true,
                    "value": ""
                }
            };
            //   console.log('ANTES DE EDITAR');
            //   console.log(doc.variations);
            doc.variations.push(new_variant);
            //  console.log('DESPUES DE EDITAR CON PUSH');
            //  console.log(doc.variations);
            //ENVIO El NUEVO DOCUMENTO EDITADO
            if (doc) {
                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// trae todos los datos del doc y los pega en la raiz
                });
                if (response) {
                    var print_item = await catalog_edit_item_url(doc_id, new_variant_id);// Refrezco la vista de las variables de nuevo
                    // console.log('PRINT ITEM BORRADO')
                    //console.log(print_item)
                    return print_item;
                }
            }
        } else {

        }
    } catch (err) {
        console.log(err);
    }

}
// ELIMINAR
async function catalog_new_item_delete_variant(element) {

    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        const variant_id = $(element).attr('variant_id'); // EL ID DE LA VARIABLE
        //Compruebo si el input se habilita con un input true false, O si no tiene checkbox
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento actualizado
        var new_variations = doc.variations.filter(response => response.id != variant_id); //Traigo el array variant filtrado por el variant_id que quiero eliminar
        doc.variations = new_variations;
        //ENVIO El NUEVO DOCUMENTO EDITADO
        if (doc) {
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// trae todos los datos del doc y los pega en la raiz
            });
            if (response) {
                catalog_edit_item_url(doc_id, variant_id);// Refrezco la vista de las variables de nuevo
            }
        }
    } catch (err) {
        console.log(err);
    }

}
// EDITAR 
async function catalog_new_item_edit_variations(element) {

    try {
        //traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const variant_id = $(element).attr('variant_id');
        const input_id = $(element).attr('input_id');
        const new_value = $(element).val();
        var doc_id_s = String(doc_id);
        var doc = await L_catalog_db.get(doc_id_s);
        //Busco dentro de las variables
        if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            const value = item[input_id]; //Traigo el ojeto especifico 
            value.value = new_value; //Edito el valor del value por el valor nuevo
        }
        else {
            doc[input_id] = new_value;
        }
        if (item) {
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,
            });
            // console.log('DOC DATA RESPONSE EDITADO');
            //  console.log(doc);
            //  console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
}

//////////////////////////////
// EDITAR ( PRODUCTO ) 2023 //
//////////////////////////////
// CRUD #TAGS 2023

// INPUT ENTER 
function add_new_tag_press(e, element) {
    var key = e.keyCode || e.which;
    if (key == 13) {
        add_new_tag(element);
    }
}
// AGREGO
async function add_new_tag(element) {
    try {
        // Datos del cocumento y el id 
        // Traigo el documento a editar
        let doc_id = $(element).attr('doc_id');
        let input_id = $(element).attr('input_id');
        // Efecto y verificacion del tag
        let new_tag_val = $(element).val();
        // Selecciono las clases
        let class_item = $('.chips_item');
        // Me aseguro q sea un stringd
        let new_tag = String(new_tag_val);
        // Filtro si el input esta bacio
        if (new_tag != '') {
            // Me aseguro q sea un string
            let doc_id_s = String(doc_id);
            let doc = await L_catalog_db.get(doc_id_s);
            // Verigico q el item a agregar ya no este repetido
            const tag_index = doc.tags.findIndex((element) => element == new_tag);
            // Si encuentra un duplicado devuelve el indice del array para mostrar en pantalla el error
            if (tag_index >= 0) {
                $(class_item[tag_index]).css("color", "red");
            }
            else {
                //si esta todo ok cargo el nuevo valor al final del array
                //Cargo el nuevo resultado al final del array con push
                const count = doc.tags.push(new_tag);
                //Envio los datos editados al documento
                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
                });
                if (response) {
                    //Imprimo el item en la pantalla 
                    $(element).prev('div').append('<div class="chips_item  s-card-cat pull-left" val_text="' + new_tag + '" > <a doc_id="' + doc._id + '" new_tag="' + new_tag + '"  input_id="tags" val_text="' + new_tag + '" href="#" onclick="dell_tag(this)"><span class="button material-icons text-s lh-n">  highlight_off</span> </a><span class="chips_text">' + new_tag + '</span></div>');

                    //limpio el imput 
                    //   $(element).val('');
                } else {
                    //Si no se grabo tira un error en pantalla
                    $(element).css("color", "red");
                }
            }
        }
        else {
            $(element).css("color", "red");
        }
    } catch (err) {
        console.log(err);
        $(element).css("color", "red");
    }
}
// ELIMINO
async function dell_tag(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let new_tag = $(element).attr('new_tag');
        //Efecto y verificacion del tag
        let doc_id_s = String(doc_id);
        //Traigo el documento actualizado
        let doc = await L_catalog_db.get(doc_id_s);
        //Filtro los resultados del array menos el que quiero eliminar
        const tags = doc.tags.filter(tag => tag !== new_tag);
        //Reemplazo el array por el filtrado
        doc.tags = tags;
        //Guardo los cambios
        if (doc) {
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// trae todos los datos del doc y los pega en la raiz
            });
            if (response) {
                //Limpio el item de la pantalla
                $(element).parent('div').remove();
            } else {
                //Si no se grabo tira un error en pantalla
                $(element).parent('div').css("color", "red");
            }
        }
    } catch (err) {
        console.log(err);
    }
}


// CRUD CATEGORIAS 2023 
// AGREGO
async function add_new_cat(element) {
    try {
        var doc_id = $(element).attr('doc_id');
        var new_cat_val = $(element).val();
        //  var input_value = $(element).attr('input_value');
        //var input_id = $(element).attr('doc_id');
        var new_cat = String(new_cat_val);
        // .toLowerCase()
        // Filtro si el input esta bacio
        if (new_cat) {
            let doc_id_s = String('category_list');  // Me aseguro q sea un string
            let doc = await L_catalog_db.get(doc_id_s);
            const tag_index = doc.category_list.find((objeto) => objeto.value == new_cat);  // Verigico q el item a agregar ya no este repetido
            if (tag_index) {
                Snackbar.show({
                    text: ' <span class="material-icons">category</span> La categoria ' + new_cat_val + ' ya existe!',
                    width: '475px',
                    pos: 'bottom-right',
                    actionTextColor: "#4CAF50",
                });
            }
            else {
                var arr_number_id = Math.floor(Math.random() * (+'10000000' - +'1')) + +'1'; // Creo el id aleatorio
                var arr_number_id_valid = doc.category_list.find(response => response.id == arr_number_id);// Compruebo q el id no exista
                if (!arr_number_id_valid) {
                    var new_item = {
                        id: arr_number_id,
                        value: new_cat,
                        //sub_category: []
                    }
                }
                //doc[input_id] = {'id':input_value,'value':new_value} ;//BUSCO EL OBJETO Y LO EDITO
                var new_doc = doc.category_list.unshift(new_item);  //Envio los datos editados al documento

                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
                });
                if (response) {
                    // load_all_cat(doc_id,arr_number_id );
                    // catalog_edit_item_url(doc_id, 1);


                    Snackbar.show({
                        text: 'La categoria ' + new_cat_val + ' se agrego!',
                        actionText: 'ok',
                        pos: 'bottom-right',
                        actionTextColor: "#0575e6",
                    });
                    catalog_edit_item_url(doc_id, 1);
                } else {
                    alert("no se actualizo");
                }
            }
        }
        else {
            Snackbar.show({
                text: ' La categoria no puede estar bacia',
                width: '475px',
                pos: 'bottom-right',
                actionTextColor: "#4CAF50"
            });
        }
    } catch (err) {

    }
}
// TRAIGO LAS CATEGORIAS
function catalog_get_cat(element) {
    let product_id = $(element).attr('product_id');
    let variant_id = $(element).attr('variant_id');
    let url_template = '/public/app/v4.0/dist/hbs/workspace/catalog/card_view_product_variant.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
    let id_copiled = '#view_item_variant_' + product_id; // ID DE COMPILACION // 
    L_catalog_db.get(product_id, function (err, doc) {
        if (err) { return console.log(err); }
        const variant_array = {
            variant_id: variant_id,
            _id: doc._id,
            _rev: doc._rev,
            variations: doc.variations,
            name: doc.name,
        }
        renderHandlebarsTemplate(url_template, id_copiled, variant_array);
    });
}
/// BUSCADOR 
async function add_new_cat_press(e, element) {
    var key = e.keyCode || e.which;
    //tomo el key code para saber si es el enter o un caracter
    if (key == 13) {
        // alert($(element).val());
        add_new_cat(element);
        catalog_edit_item_url($(element).attr('doc_id'));
        $('#edit-item-description-body').addClass('in');
    } else {
        //Si el evento de teclado no es 13 que lo busque en el doc de las categorias y traiga el resultado mas parecido con find
        var doc_id = $(element).attr('doc_id');
        var new_cat_val = $(element).val();
        var select_div_id = "#select_category_list_" + doc_id;
        var new_cat = String(new_cat_val);
        if (new_cat) {
            let doc_id_s = String(doc_id);  // Me aseguro q sea un string
            let doc = await L_catalog_db.get('category_list');
            //Filstro con una busqueda que incluya las palabras que ingreso al input
            const filterItems = query => {
                return doc.category_list.filter((el) =>
                    el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
                );
            }
            // creo un array con los datos del producto y la lista de categorias actualizadas
            var cat_list_search = {
                _id: doc_id,
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                cat_find_list: filterItems(new_cat)
            }
            //renderizo las categorias nuevas filtradas
            var item_print = await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_edit_item_cat_list.hbs', select_div_id, cat_list_search);
        }
    }
}
/// SELECCIONO y GUARDO CATEGORIA
async function catalog_product_edit_category(element) {
    const doc_id = $(element).attr('doc_id'); //Id del documento a editar
    const input_value = $(element).attr('input_value'); //Id del documento a edita
    let input_id = $(element).attr('input_id');
    let new_value = $(element).attr('new_value');
    var doc_id_s = String(doc_id); //Combierto el id del doc en un string
    var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
    doc[input_id] = { 'id': input_value, 'value': new_value };//BUSCO EL OBJETO Y LO EDITO
    var response = await L_catalog_db.put({
        _id: doc._id,
        _rev: doc._rev,
        ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
    });
    if (response.ok) {
        $('#catalog_select_cat_value').attr('catalog_select_cat_value', new_value);
        $('#catalog_select_cat_value').html(new_value);
        $('#catalog_select_cat_tittle').html(new_value);
    }
    // catalog_edit_item_url(doc_id, 1);
}

/// SELECCIONO y GUARDO MARCA
async function catalog_product_edit_trade(element) {
    const doc_id = $(element).attr('doc_id'); //Id del documento a editar
    const input_value = $(element).attr('input_value'); //Id del documento a edita
    let input_id = $(element).attr('input_id');
    let new_value = $(element).attr('new_value');
    var doc_id_s = String(doc_id); //Combierto el id del doc en un string
    var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
    doc[input_id] = { 'id': input_value, 'value': new_value };//BUSCO EL OBJETO Y LO EDITO
    var response = await L_catalog_db.put({
        _id: doc._id,
        _rev: doc._rev,
        ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
    });
    if (response.ok) {
        $('#catalog_select_trade_value').attr('catalog_select_trade_value', new_value);
        $('#catalog_select_trade_value').html(new_value);
        $('#catalog_select_trade_tittle').html(new_value);
    }
    // catalog_edit_item_url(doc_id, 1);
}

/// SELECCIONO y GUARDO MODELO
async function catalog_product_edit_model(element) {
    const doc_id = $(element).attr('doc_id'); //Id del documento a editar
    const input_value = $(element).attr('input_value'); //Id del documento a edita
    let input_id = $(element).attr('input_id');
    let new_value = $(element).attr('new_value');
    var doc_id_s = String(doc_id); //Combierto el id del doc en un string
    var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
    doc[input_id] = { 'id': input_value, 'value': new_value };//BUSCO EL OBJETO Y LO EDITO
    var response = await L_catalog_db.put({
        _id: doc._id,
        _rev: doc._rev,
        ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
    });
    if (response.ok) {
        $('#catalog_select_model_value').attr('catalog_select_model_value', new_value);
        $('#catalog_select_model_value').html(new_value);
        $('#catalog_select_model_tittle').html(new_value);
    }
    // catalog_edit_item_url(doc_id, 1);
}


////////////////////////////////////
// CREAR NUEVO ( PRODUCTO ) 2023 //
///////////////////////////////////
/// CRUD #TAGS 2023
// INPUT ENTER
function catalog_add_new_tag_press(e, element) {
    var key = e.keyCode || e.which;
    if (key == 13) {
        catalog_add_new_tag(element);
    }
}
// AGREGO
async function catalog_add_new_tag(element) {
    try {
        // Datos del cocumento y el id 
        let new_tag_val = $(element).val();
        let new_tag = String(new_tag_val);
        // Filtro si el input esta bacio
        if (new_tag != '') {
            let catalog_new_tag_item = $('.catalog_new_tag_item_input_' + new_tag);
            var tag_item = $(".catalog_new_tag_item").toArray().length;
            // var tag_item_array = $(".catalog_new_tag_item").text().toArray();
            //  var tag_item_array_chips_text = $(".chips_text").toArray();
            //console.log(tag_item_array);
            // Si encuentra un duplicado devuelve el indice del array para mostrar en pantalla el error
            if (tag_item >= 3) {
                Snackbar.show({
                    text: 'No puedes agregar mas de ' + tag_item + ' categorias!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            } else if (catalog_new_tag_item.length == 0) {
                $(element).prev('div').append('<div class="catalog_new_tag_item_input_' + new_tag + ' catalog_new_tag_item  s-card-cat pull-left" val_text="' + new_tag + '" > <a new_tag="' + new_tag + '"  input_id="tags" val_text="' + new_tag + '" href="#" onclick="catolog_dell_new_tag(this)"><span class="button material-icons text-s lh-n">  highlight_off</span> </a><span class="chips_text">' + new_tag + '</span></div>');
            }
            else {
                //si esta todo ok cargo el nuevo valor al final del array
                $('.catalog_new_tag_item_input_' + new_tag).css("color", "red");
            }
        }
        else {
            $(element).css("color", "red");
        }
    } catch (err) {
        console.log(err);
        $(element).css("color", "red");
    }
}
// ELIMINO
async function catolog_dell_new_tag(element) {
    try {
        //Limpio el item de la pantalla
        $(element).parent('div').remove();
    } catch (err) {
        console.log(err);
    }
}

// CRUD CATEG0RIAS CREAR PRODUCTO #TAGS 2023
// BUSCO
async function catalog_search_cat(e, element) {
    //traigo el resultado mas parecido con find
    var doc_id = $(element).attr('doc_id');
    var new_cat_val = $(element).val();
    var select_div_id = "#catalog_select_new_cat_list";
    var new_cat = String(new_cat_val);
    if (new_cat) {
        // let doc_id_s = String(doc_id);  // Me aseguro q sea un string
        let doc = await L_catalog_db.get('category_list'); //Filstro con una busqueda que incluya las palabras que ingreso al input

        const filterItems = query => {
            return doc.category_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }

        var search_list = filterItems(new_cat);

        if (search_list.length >= 1) {
            // creo un array con los datos del producto y la lista de categorias actualizadas
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: search_list
            }
            //renderizo las categorias nuevas filtradas

        } else if (search_list == null) {
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: doc.category_list
            }
        }
        else {
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                no_result: true
            }
        }
        // console.log('CAT LIST LIST LISTTTT', cat_list_search);
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_edit_item_cat_list.hbs', select_div_id, cat_list_search);


    }

}
///  LISTADO EN FORM NUEVO PRODUCTO
async function catalog_search_new_prod_cat(e, element) {
    //traigo el resultado mas parecido con find
    var doc_id = $(element).attr('doc_id');
    var new_cat_val = $(element).val();
    var select_div_id = "#catalog_select_new_cat_list";
    var new_cat = String(new_cat_val);
    if (new_cat) {
        // let doc_id_s = String(doc_id);  // Me aseguro q sea un string
        let doc = await L_catalog_db.get('category_list'); //Filstro con una busqueda que incluya las palabras que ingreso al input

        const filterItems = query => {
            return doc.category_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }

        var search_list = filterItems(new_cat);

        if (search_list.length >= 1) {
            // creo un array con los datos del producto y la lista de categorias actualizadas
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: search_list
            }
            //renderizo las categorias nuevas filtradas

        } else if (search_list == null) {
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: doc.category_list
            }
        }
        else {
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                no_result: true
            }
        }
        // console.log('CAT LIST LIST LISTTTT', cat_list_search);
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_new_item_cat_list.hbs', select_div_id, cat_list_search);
    }
}
// ELIMINO
async function catalog_dell_cat(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar la categoria ' + value + ' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function (element) {
                //Efecto y verificacion del tag
                let doc_id_s = String(doc_id);
                //Traigo el documento actualizado
                console.log(doc_id_s);
                let doc = await L_catalog_db.get('category_list');
                console.log(doc);
                //Filtro los resultados del array menos el que quiero eliminar
                const new_cat_list = doc.category_list.filter(word => word.value != value);
                //Reemplazo el array por el filtrado
                console.log(new_cat_list);
                doc.category_list = new_cat_list;

                console.log(doc.category_list);
                //Guardo los cambios
                if (doc) {
                    var response = await L_catalog_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc,// trae todos los datos del doc y los pega en la raiz
                    });
                    if (response) {
                        //Limpio el item de la pantalla
                        catalog_edit_item_url(doc_id, 1);
                        $(element).parent('li').remove();
                    } else {
                        //Si no se grabo tira un error en pantalla
                        $(element).parent('li').css("color", "red");
                    }
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}
// AGREGO
async function catalog_add_new_cat(element) {
    try {
        var doc_id = $(element).attr('doc_id');
        var new_cat_val = $('#catalog_new_cat_input').val();
        //  var input_value = $(element).attr('input_value');
        //var input_id = $(element).attr('doc_id');
        var new_cat = String(new_cat_val);
        // .toLowerCase()
        // Filtro si el input esta bacio
        if (new_cat) {
            let doc_id_s = String('category_list');  // Me aseguro q sea un string
            let doc = await L_catalog_db.get(doc_id_s);
            const tag_index = doc.category_list.find((objeto) => objeto.value == new_cat);  // Verigico q el item a agregar ya no este repetido
            if (tag_index) {
                Snackbar.show({
                    text: ' <span class="material-icons">category</span> La categoria ' + new_cat_val + ' ya existe!',
                    width: '475px',
                    pos: 'bottom-right',
                    actionTextColor: "#4CAF50",
                });
            }
            else {
                var arr_number_id = Math.floor(Math.random() * (+'10000000' - +'1')) + +'1'; // Creo el id aleatorio
                var arr_number_id_valid = doc.category_list.find(response => response.id == arr_number_id);// Compruebo q el id no exista
                if (!arr_number_id_valid) {
                    var new_item = {
                        id: arr_number_id,
                        value: new_cat,
                        sub_category: []
                    }
                }
                //doc[input_id] = {'id':input_value,'value':new_value} ;//BUSCO EL OBJETO Y LO EDITO
                var new_doc = doc.category_list.unshift(new_item);  //Envio los datos editados al documento

                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
                });
                if (response) {
                    // load_all_cat(doc_id,arr_number_id );
                    // catalog_edit_item_url(doc_id, 1);
                    $('#catalog_select_cat_value').html(new_cat);
                    $('#catalog_select_cat_value').attr('catalog_select_cat_value', arr_number_id);

                    Snackbar.show({
                        text: 'La categoria ' + new_cat_val + ' se agrego!',
                        actionText: 'ok',
                        pos: 'bottom-right',
                        actionTextColor: "#0575e6",
                    });

                    catalog_select_new_cat(element, new_cat);
                } else {
                    alert("no se actualizo");
                }
            }
        }
        else {
            Snackbar.show({
                text: ' La categoria no puede estar bacia',
                width: '475px',
                pos: 'bottom-right',
                actionTextColor: "#4CAF50"
            });
        }
    } catch (err) {

    }
}
// SELECCIONO
async function catalog_select_new_cat(element, new_cat) {
    let item_value_id = $(element).attr('item_value_id');
    var new_item = new_cat;
    if (new_item) {
        var item_value = new_item;
    } else {
        var item_value = $(element).attr('item_value');
    }
    try {
        $('#catalog_select_cat_value').attr('catalog_select_cat_value', item_value_id);
        $('#catalog_select_cat_value').html(item_value);
        $('#catalog_select_cat_tittle').html(item_value);
        //traigo el documento a editar
    } catch (err) {
        console.log(err);
    }

}

// CRUD MARCAS 2023
// BUSCO 
async function catalog_search_trade(e, element) {

    //traigo el resultado mas parecido con find
    var doc_id = $(element).attr('doc_id');
    var new_trade_val = $(element).val();
    var select_div_id = "#catalog_select_new_trade_list";
    var new_trade = String(new_trade_val);
    if (new_trade) {
        // let doc_id_s = String(doc_id);  // Me aseguro q sea un string
        let doc = await L_catalog_db.get('trade_list'); //Filstro con una busqueda que incluya las palabras que ingreso al input

        const filterItems = query => {
            return doc.trade_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }

        var search_list = filterItems(new_trade);

        if (search_list.length >= 1) {
            // creo un array con los datos del producto y la lista de categorias actualizadas
            var trade_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                trade_find_list: search_list
            }
            //renderizo las categorias nuevas filtradas

        } else if (search_list == null) {
            var trade_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: doc.category_list
            }
        }
        else {
            var trade_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                no_result: true
            }
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_edit_item_trade_list.hbs', select_div_id, trade_list_search);


    }

}

async function catalog_search_new_pro_trade(e, element) {

    //traigo el resultado mas parecido con find
    var doc_id = $(element).attr('doc_id');
    var new_trade_val = $(element).val();
    var select_div_id = "#catalog_select_new_trade_list";
    var new_trade = String(new_trade_val);
    if (new_trade) {
        // let doc_id_s = String(doc_id);  // Me aseguro q sea un string
        let doc = await L_catalog_db.get('trade_list'); //Filstro con una busqueda que incluya las palabras que ingreso al input

        const filterItems = query => {
            return doc.trade_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }

        var search_list = filterItems(new_trade);

        if (search_list.length >= 1) {
            // creo un array con los datos del producto y la lista de categorias actualizadas
            var trade_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                trade_find_list: search_list
            }
            //renderizo las categorias nuevas filtradas

        } else if (search_list == null) {
            var trade_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: doc.category_list
            }
        }
        else {
            var trade_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                no_result: true
            }
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_new_item_trade_list.hbs', select_div_id, trade_list_search);


    }

}
// SELECCIONO
async function catalog_select_new_trade(element, new_item) {

    var item_value_id = $(element).attr('item_value_id');
    var new_item = new_item;
    if (new_item) {
        var item_value = new_item;
    } else {
        var item_value = $(element).attr('item_value');
    }
    try {
        // console.log('id',item_value_id);
        //  console.log('value',item_value);
        //alert('item_value_id',item_value_id);
        $('#catalog_select_trade_value').attr('catalog_select_trade_value', item_value_id);
        $('#catalog_select_trade_value').html(item_value);
        $('#catalog_select_trade_tittle').html(item_value);
        $('#catalog_select_trade_tittle').attr('item_value_id', item_value_id);


    } catch (err) {
        console.log(err);
    }
}
// AGREGO
async function catalog_add_new_trade(element) {
    try {
        var doc_id = $(element).attr('doc_id');
        var new_trade_val = $('#catalog_new_trade_input').val();
        var new_trade = String(new_trade_val);
        // .toLowerCase()
        // Filtro si el input esta bacio
        if (new_trade) {
            let doc_id_s = String('trade_list');  // Me aseguro q sea un string
            let doc = await L_catalog_db.get(doc_id_s);
            const tag_index = doc.trade_list.find((objeto) => objeto.value == new_trade);  // Verigico q el item a agregar ya no este repetido
            if (tag_index) {
                Snackbar.show({
                    text: ' <span class="material-icons">category</span> La marca ' + new_trade_val + ' ya existe!',
                    width: '475px',
                    pos: 'bottom-right',
                    actionTextColor: "#4CAF50",
                });
            }
            else {
                var arr_number_id = Math.floor(Math.random() * (+'10000000' - +'1')) + +'1'; // Creo el id aleatorio
                var arr_number_id_valid = doc.trade_list.find(response => response.id == arr_number_id);// Compruebo q el id no exista
                if (!arr_number_id_valid) {
                    var new_item = {
                        id: arr_number_id,
                        value: new_trade,
                        sub_category: []
                    }
                }
                //doc[input_id] = {'id':input_value,'value':new_value} ;//BUSCO EL OBJETO Y LO EDITO
                var new_doc = doc.trade_list.unshift(new_item);  //Envio los datos editados al documento

                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
                });
                if (response) {
                    // load_all_cat(doc_id,arr_number_id );
                    // catalog_edit_item_url(doc_id, 1);
                    $('#catalog_select_trade_value').html(new_trade);
                    $('#catalog_select_trade_value').attr('catalog_select_trade_value', arr_number_id);

                    Snackbar.show({
                        text: 'La marca ' + new_trade_val + ' se agrego!',
                        actionText: 'ok',
                        pos: 'bottom-right',
                        actionTextColor: "#0575e6",
                    });
                    catalog_select_new_trade(element, new_trade);
                    //catalog_search_trade(e, element);
                    //  catalog_edit_item_url(doc_id, 1);
                } else {
                    alert("no se actualizo");
                }
            }
        }
        else {
            Snackbar.show({
                text: ' La categoria no puede estar bacia',
                width: '475px',
                pos: 'bottom-right',
                actionTextColor: "#4CAF50"
            });
        }
    } catch (err) {

    }
}
// ELIMINO 
async function catalog_dell_tradeOLD(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar la marca ' + value + ' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function (element) {
                //Efecto y verificacion del tag
                let doc_id_s = String(doc_id);
                //Traigo el documento actualizado
                console.log(doc_id_s);
                let doc = await L_catalog_db.get('trade_list');
                console.log(doc);
                //Filtro los resultados del array menos el que quiero eliminar
                const new_cat_list = doc.trade_list.filter(word => word.value != value);
                //Reemplazo el array por el filtrado
                console.log(new_trade_list);
                doc['trade_list'] = new_trade_list;
                //Guardo los cambios
                if (doc) {
                    var response = await L_catalog_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc,// trae todos los datos del doc y los pega en la raiz
                    });
                    if (response) {
                        //Limpio el item de la pantalla
                        catalog_edit_item_url(doc_id, 1);
                        $(element).parent('li').remove();
                    } else {
                        //Si no se grabo tira un error en pantalla
                        $(element).parent('li').css("color", "red");
                    }
                }
                //user_db.remove(item_cart_id, item_cart_rev);   //Set opacity of element to 0 to close Snackbar                    
                //$('#' + item_cart_id).remove();
                // $(element).css('opacity', 0);      
            }
        });
    } catch (err) {
        console.log(err);
    }
}

// ELIMINO
async function catalog_dell_trade(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar la Marca ' + value + ' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function (element) {
                //Efecto y verificacion del tag
                let doc_id_s = String(doc_id);
                //Traigo el documento actualizado
                console.log(doc_id_s);
                let doc = await L_catalog_db.get('trade_list');
                console.log(doc);
                //Filtro los resultados del array menos el que quiero eliminar
                const new_trade_list = doc.trade_list.filter(word => word.value !== value);
                //Reemplazo el array por el filtrado
                console.log(new_trade_list);
                doc.trade_list = new_trade_list;

                console.log(doc.trade);
                //Guardo los cambios
                if (doc) {
                    var response = await L_catalog_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc,// trae todos los datos del doc y los pega en la raiz
                    });
                    if (response) {
                        //Limpio el item de la pantalla
                        //catalog_edit_item_url(doc_id, 1);
                        $(element).parent('li').remove();
                    } else {
                        //Si no se grabo tira un error en pantalla
                        $(element).parent('li').css("color", "red");
                    }
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

// CRUD MODELOS 2023
// BUSCADOR
async function catalog_search_model(e, element) {
    //traigo el resultado mas parecido con find
    var doc_id = $(element).attr('doc_id');
    var new_model_val = $(element).val();
    var select_div_id = "#catalog_select_new_model_list";
    var new_model = String(new_model_val);
    if (new_model) {
        // let doc_id_s = String(doc_id);  // Me aseguro q sea un string
        let doc = await L_catalog_db.get('model_list'); //Filstro con una busqueda que incluya las palabras que ingreso al input

        const filterItems = query => {
            return doc.model_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }

        var search_list = filterItems(new_model);

        if (search_list.length >= 1) {
            // creo un array con los datos del producto y la lista de categorias actualizadas
            var list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                model_find_list: search_list
            }
        } else if (search_list == null) {
            var list_search = {
                ws_lang_data: ws_lang_data,
                doc_id: doc_id,
                user_roles: user_Ctx.userCtx.roles,
                model_find_list: doc.model_list
            }
        }
        else {
            var list_search = {
                ws_lang_data: ws_lang_data,
                doc_id: doc_id,
                user_roles: user_Ctx.userCtx.roles,
                no_result: true
            }
        }

        console.log('list_search', list_search);
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_edit_item_model_list.hbs', select_div_id, list_search);
    }
}

async function catalog_search_new_pro_model(e, element) {
    //traigo el resultado mas parecido con find
    var doc_id = $(element).attr('doc_id');
    var new_model_val = $(element).val();
    var select_div_id = "#catalog_select_new_model_list";
    var new_model = String(new_model_val);
    if (new_model) {
        // let doc_id_s = String(doc_id);  // Me aseguro q sea un string
        let doc = await L_catalog_db.get('model_list'); //Filstro con una busqueda que incluya las palabras que ingreso al input

        const filterItems = query => {
            return doc.model_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }

        var search_list = filterItems(new_model);

        if (search_list.length >= 1) {
            // creo un array con los datos del producto y la lista de categorias actualizadas
            var list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                model_find_list: search_list
            }
        } else if (search_list == null) {
            var list_search = {
                ws_lang_data: ws_lang_data,
                doc_id: doc_id,
                user_roles: user_Ctx.userCtx.roles,
                model_find_list: doc.model_list
            }
        }
        else {
            var list_search = {
                ws_lang_data: ws_lang_data,
                doc_id: doc_id,
                user_roles: user_Ctx.userCtx.roles,
                no_result: true
            }
        }

        console.log('list_search', list_search);
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/list/catalog_new_item_model_list.hbs', select_div_id, list_search);
    }
}

// SELECCIONO
async function catalog_select_new_model(element, new_model) {
    let item_value_id = $(element).attr('item_value_id');
    var new_item = new_model;
    if (new_item) {
        var item_value = new_item;
    } else {
        var item_value = $(element).attr('item_value');
    }
    try {
        $('#catalog_select_model_value').attr('catalog_select_model_value', item_value_id);
        $('#catalog_select_model_value').html(item_value);
        $('#catalog_select_model_tittle').html(item_value);
        //traigo el documento a editar
    } catch (err) {
        console.log(err);
    }

}
// AGREGO
async function catalog_add_new_model(element) {
    try {
        //var doc_id = $(element).attr('doc_id');
        var new_model_val = $('#catalog_new_model_input').val();
        var new_model = String(new_model_val);
        // .toLowerCase()
        // Filtro si el input esta bacio
        if (new_model) {
            let doc_id_s = String('model_list');  // Me aseguro q sea un string
            let doc = await L_catalog_db.get(doc_id_s);
            const tag_index = doc.model_list.find((objeto) => objeto.value == new_model);  // Verigico q el item a agregar ya no este repetido
            if (tag_index) {
                Snackbar.show({
                    text: ' <span class="material-icons">category</span> La marca ' + new_model_val + ' ya existe!',
                    width: '475px',
                    pos: 'bottom-right',
                    actionTextColor: "#4CAF50",
                });
            }
            else {
                var arr_number_id = Math.floor(Math.random() * (+'10000000' - +'1')) + +'1'; // Creo el id aleatorio
                var arr_number_id_valid = doc.model_list.find(response => response.id == arr_number_id);// Compruebo q el id no exista
                if (!arr_number_id_valid) {
                    var new_item = {
                        id: arr_number_id,
                        value: new_model,
                        sub_category: []
                    }
                }
                //doc[input_id] = {'id':input_value,'value':new_value} ;//BUSCO EL OBJETO Y LO EDITO
                var new_doc = doc.model_list.unshift(new_item);  //Envio los datos editados al documento

                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
                });
                if (response) {
                    // load_all_cat(doc_id,arr_number_id );
                    // catalog_edit_item_url(doc_id, 1);
                    $('#catalog_select_model_value').html(new_model);
                    $('#catalog_select_model_value').attr('catalog_select_model_value', arr_number_id);

                    Snackbar.show({
                        text: 'El modelo ' + new_model_val + ' se agrego!',
                        actionText: 'ok',
                        pos: 'bottom-right',
                        actionTextColor: "#0575e6",
                    });
                    catalog_select_new_model(element, new_model);
                    //catalog_select_new_model(element, new_model);
                } else {
                    alert("no se actualizo");
                }
            }
        }
        else {
            Snackbar.show({
                text: ' El modelo no puede estar bacio',
                width: '475px',
                pos: 'bottom-right',
                actionTextColor: "#4CAF50"
            });
        }
    } catch (err) {

    }
}
// ELIMINO
async function catalog_dell_modelNO(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar el modelo ' + value + ' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function (element) {
                //Efecto y verificacion del tag
                let doc_id_s = String(doc_id);
                //Traigo el documento actualizado
                console.log(doc_id_s);
                let doc = await L_catalog_db.get('model_list');
                console.log(doc);
                //Filtro los resultados del array menos el que quiero eliminar
                const new_model_list = doc.model_list.filter(word => word.value != value);
                //Reemplazo el array por el filtrado
                console.log(new_model_list);
                doc['model_list'] = new_model_list;
                //Guardo los cambios
                if (doc) {
                    var response = await L_catalog_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc,// trae todos los datos del doc y los pega en la raiz
                    });
                    if (response) {
                        //Limpio el item de la pantalla
                        catalog_edit_item_url(doc_id, 1);
                        $(element).parent('li').remove();
                    } else {
                        //Si no se grabo tira un error en pantalla
                        $(element).parent('li').css("color", "red");
                    }
                }
                //user_db.remove(item_cart_id, item_cart_rev);   //Set opacity of element to 0 to close Snackbar                    
                //$('#' + item_cart_id).remove();
                // $(element).css('opacity', 0);      
            }
        });
    } catch (err) {
        console.log(err);
    }
}



// ELIMINO
async function catalog_dell_model(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar la modelo ' + value + ' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function (element) {
                //Efecto y verificacion del tag
                let doc_id_s = String(doc_id);
                //Traigo el documento actualizado
                console.log(doc_id_s);
                let doc = await L_catalog_db.get('model_list');
                console.log(doc);
                //Filtro los resultados del array menos el que quiero eliminar
                const new_model_list = doc.model_list.filter(word => word.value != value);
                //Reemplazo el array por el filtrado
                console.log(new_model_list);
                doc.model_list = new_model_list;
                console.log(doc.model);
                //Guardo los cambios
                if (doc) {
                    var response = await L_catalog_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc,// trae todos los datos del doc y los pega en la raiz
                    });
                    if (response) {
                        //Limpio el item de la pantalla
                        //catalog_edit_item_url(doc_id, 1);
                        $(element).parent('li').remove();
                    } else {
                        //Si no se grabo tira un error en pantalla
                        $(element).parent('li').css("color", "red");
                    }
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}


// EDICION GENERAL DE IMPUTS EN VARIABLE Y GENERAL
async function cat_edit_product(element) {

    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        const variant_id = $(element).attr('variant_id'); // EL ID DE LA VARIABLE
        const input_id = $(element).attr('input_id'); //EL id del OBJETO a editar
        const new_value = $(element).val(); //EL VALOR DEL NUEVO OBJETO 
        const input_status_html_id = '#' + doc_id + '_' + variant_id + '_' + input_id + '_status'; //Armo la id del checkbox
        const input_html_id = '#' + doc_id + '_' + variant_id + '_' + input_id; // Armo la id del input
        const new_input_status = $(input_status_html_id).is(':checked'); // Compruebo si la propiedad del input esta chekeada o no 
        //Compruebo si el input se habilita con un input true false, O si no tiene checkbox
        if (new_input_status === false) {
            var input_status = true;
            $(input_html_id).prop('disabled', true);
            $(input_html_id).prop('status', true);
        } else if (new_input_status === true) {
            var input_status = false;
            $(input_html_id).prop('disabled', false);
            $(input_html_id).prop('status', false);
        } else {
            var input_status = true;
        }
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
        // Si el objeto a editar esta dentro de una variable
        if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            const new_objet_input = item; //Traigo el ojeto especifico 
            new_objet_input[input_id] = { 'status': input_status, 'value': new_value }; //Si existe el objeto Edito el valor del value por el valor nuevo
        }
        // Si la edicion es fuera de una variable
        else {
            doc[input_id] = new_value;//BUSCO EL OBJETO Y LO EDITO
        }
        //ENVIO El NUEVO DOCUMENTO EDITADO
        if (doc) {
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// trae todos los datos del doc y los pega en la raiz
            });
        }
    } catch (err) {
        console.log(err);
    }

}
/////////////////////////////////
///// DELETE PRODUCTO ////////

// ELIMINO UN PRODUCTO
async function catalog_product_delete(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar este producto?? ' + doc_id + ' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function (element) {

                var doc = await L_catalog_db.get(doc_id);
                var response = await L_catalog_db.remove(doc._id, doc._rev);

                if (response) {
                    Snackbar.show({
                        text: 'Se elimino con exito!!',
                        actionText: 'ok',
                        pos: 'bottom-right',
                        actionTextColor: "#0575e6",
                    });
                } else {
                    Snackbar.show({
                        text: 'Hubo un error y no se elimino!',
                        actionText: 'ok',
                        pos: 'bottom-right',
                        actionTextColor: "#0575e6",
                    });
                }

            }
        });
    } catch (err) {
        console.log(err);
    }
}


/////////////////////////////////////
// CONFIGURACION ( CATALOGO ) 2023 //
/////////////////////////////////////
// ABRE CONFIGURACION
async function catalog_config(tab_id) {
    try {
        var price_list = await L_catalog_db.get('price_list');
        var currency_list = await L_catalog_db.get('currency_list');

        var tax_list = await L_catalog_db.get('tax_list');
        var catalog_config = {
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            price_list: price_list.price_list,
            currency_list: currency_list.currency_list,
            tax_list: tax_list.tax,
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/config/catalog_config.hbs', '#right_main', catalog_config);
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        var m_url = '?type=catalog&?t=config';
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion     
        return;
    } catch (err) {
        console.log(err);
    }
}
// LISTAS DE PRECIOS
// ABRE EDITAR
async function catalog_config_show_edit(element) {
    try {
        //Traigo los valores
        let price_id = $(element).attr('price_id');
        let new_value = $(element).attr('price_value');
        let new_currency_id = $(element).attr('price_currency_id');
        //Filtro los resultados
        const price_id_n = Number(price_id);
        var new_value_n = Number(new_value);
        var new_currency_id_n = Number(new_currency_id);
        //Modifico el dom
        $('#new_price_list_name_value').val(new_value); //Tomo el valor de input
        $('#new_price_list_name_value').attr('price_id', price_id_n); //Grabo el valor en un attr en el input
        $("#new_price_list_money_value option[value='" + new_currency_id_n + "']").attr("selected", true); // cambio el valor del select
        $("#edit_panel_config_name_price_list").first().fadeIn("slow");// Muestro el div con efecto
        $('#new_price_list_name_value').focus(); //llevo el foco al input 

    } catch (err) {
        console.log(err);
    }
}
// EDITAR
async function catalog_config_save_edit(element) {
    try {

        let price_id = $('#new_price_list_name_value').attr('price_id');
        let new_name = $('#new_price_list_name_value').val();
        let new_money_id = $('#new_price_list_money_value').val();
        const price_id_n = Number(price_id);
        var new_name_n = String(new_name);
        var new_money_id_n = Number(new_money_id);
        //PRUEBAS NUEVAS
       // var user_Ctx = userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc = await L_catalog_db.get('price_list');
        var price_array = doc.price_list.find(response => response.id == price_id_n);// Traigo el elemento por la id variant
        //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
        if (price_array) {
            const price = price_array;//Traigo el ojeto especifico 
            price.value = new_name_n; //Edito el valor del value por el valor nuevo
            price.id = price_id_n;//Edito el valor del value por el valor nuevo
            price.currency_id = new_money_id;//Edito el valor del value por el valor nuevo
            price.status = 'active';//Edito el valor del value por el valor nuevo
            price.delete = false;//Edito el valor del value por el valor nuevo
            price.updateDate = newDate;
            price.updateUser = userName;
            //Acutualizo el documento
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
            });
            if (response) {
                var print_item = await catalog_config(); //Refrezco la pantalla
                Snackbar.show({
                    text: 'Se actualizo con exito!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            } else {
                Snackbar.show({
                    text: 'NO actualizo!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            }

        } else {
            Snackbar.show({
                text: 'NO actualizo!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
    }
}
// BLOCKEAR LISTA
async function catalog_config_save_block(element) {
    try {
        //Traigo los valores
        let price_id = $(element).attr('price_id');
        price_status = $(element).attr('price_status');
        //alert(price_status);

        if (price_status === 'active') {
            var price_status = 'inactive';

            // alert(price_status);
        } else {
            var price_status = 'active';
            // alert(price_status);
        }
        //Filtro los resultados
        const price_id_n = Number(price_id);
        //PRUEBAS NUEVAS
       // var user_Ctx = userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc = await L_catalog_db.get('price_list');
        var price_array = doc.price_list.find(response => response.id == price_id_n);// Traigo el elemento por la id variant
        //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
        if (price_array) {
            const price = price_array;//Traigo el ojeto especifico 
            //price.value = new_name_n; //Edito el valor del value por el valor nuevo
            //   price.id = price_id_n;//Edito el valor del value por el valor nuevo
            //   price.currency_id = new_money_id;//Edito el valor del value por el valor nuevo
            price.status = price_status;//Edito el valor del value por el valor nuevo
            //  price.delete = false;//Edito el valor del value por el valor nuevo
            price.updateDate = newDate;
            price.updateUser = userName;
            //Acutualizo el documento
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
            });
            if (response) {
                var print_item = await catalog_config(); //Refrezco la pantalla
                Snackbar.show({
                    text: 'Se actualizo con exito!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            } else {
                Snackbar.show({
                    text: 'NO actualizo!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            }
        } else {
            Snackbar.show({
                text: 'NO actualizo!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
    }
}
// MONEDAS BLOCKEA
async function catalog_config_money_block(element) {
    try {
        //Traigo los valores
        let price_id = $(element).attr('price_id');
        price_status = $(element).attr('price_status');
        //alert(price_status);

        if (price_status === 'active') {
            var price_status = 'inactive';

            // alert(price_status);
        } else {
            var price_status = 'active';
            // alert(price_status);
        }
        //Filtro los resultados
        const price_id_n = Number(price_id);
        //PRUEBAS NUEVAS
        // var user_Ctx = userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc = await L_catalog_db.get('price_list');
        var price_array = doc.price_list.find(response => response.id == price_id_n);// Traigo el elemento por la id variant
        //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
        if (price_array) {
            const price = price_array;//Traigo el ojeto especifico 
            //price.value = new_name_n; //Edito el valor del value por el valor nuevo
            //   price.id = price_id_n;//Edito el valor del value por el valor nuevo
            //   price.currency_id = new_money_id;//Edito el valor del value por el valor nuevo
            price.status = price_status;//Edito el valor del value por el valor nuevo
            //  price.delete = false;//Edito el valor del value por el valor nuevo
            price.updateDate = newDate;
            price.updateUser = userName;
            //Acutualizo el documento
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
            });
            if (response) {
                var print_item = await catalog_config(); //Refrezco la pantalla
                Snackbar.show({
                    text: 'Se actualizo con exito!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            } else {
                Snackbar.show({
                    text: 'NO actualizo!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            }
        } else {
            Snackbar.show({
                text: 'NO actualizo!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
    }
}
// EDITAR MONEDAS
async function catalog_config_show_money_edit(element) {
    try {
        //Traigo los valores
        let price_id = $(element).attr('price_id');
        let new_value = $(element).attr('price_value');
        let new_currency_id = $(element).attr('price_currency_id');
        //Filtro los resultados
        const price_id_n = Number(price_id);
        var new_value_n = Number(new_value);
        var new_currency_id_n = Number(new_currency_id);
        //Modifico el dom
        $('#new_price_list_name_value').val(new_value); //Tomo el valor de input
        $('#new_price_list_name_value').attr('price_id', price_id_n); //Grabo el valor en un attr en el input
        $("#new_price_list_money_value option[value='" + new_currency_id_n + "']").attr("selected", true); // cambio el valor del select
        $("#edit_panel_config_name_price_list").first().fadeIn("slow");// Muestro el div con efecto
        $('#new_price_list_name_value').focus(); //llevo el foco al input 

        $('#new_price_list_name_value').attr('placeholder', 'Porcentaje'); //Grabo el valor en un attr en el input

        // $('#new_name_tax_input').attr('placeholder', 'Nombre'); //Grabo el valor en un attr en el input



    } catch (err) {
        console.log(err);
    }
}

///// CONFIG MONEDAS
// TRAE LOS DATOS
async function catalog_config_show_tax_edit(element) {
    try {

        //Traigo los valores
        let id = $(element).attr('id');
        let new_value = $(element).attr('value');
        let new_name = $(element).attr('name');

        //Filtro los resultados
        const id_n = Number(id);
        var value_n = Number(new_value);
        var name_n = Number(new_name);

        //Modifico el dom
        $('#new_value_tax_edit').val(new_value); //Tomo el valor de input
        $('#new_value_tax_edit').attr('tax_id', id); //Grabo el valor en un attr en el input
        $("#new_name_tax_input").val(new_name); // cambio el valor del select
        $("#edit_panel_config_tax").first().fadeIn("slow");// Muestro el div con efecto
        $('#new_value_tax_edit').focus(); //llevo el foco al input 
        $('#catalog_config_tax_money_send').attr('onclick', 'catalog_config_tax_money_edit(this)'); //Grabo el valor en un attr en el input

        $('#new_value_tax_edit').attr('placeholder', 'Porcentaje'); //Grabo el valor en un attr en el input
        $('#new_name_tax_input').attr('placeholder', 'Nombre'); //Grabo el valor en un attr en el input

    } catch (err) {
        console.log(err);
    }
}
// GUARDAR CAMBIOS
async function catalog_config_tax_money_edit(element) {
    try {

        let id = $('#new_value_tax_edit').attr('tax_id');
        let value = $('#new_value_tax_edit').val();
        let name = $('#new_name_tax_input').val();
        const id_n = Number(id);
        var value_n = String(value);
        var name_n = String(name);
        //PRUEBAS NUEVAS
        //var user_Ctx =  userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc = await L_catalog_db.get('tax_list');
        var tax_array = doc.tax.find(response => response.id == id_n);// Traigo el elemento por la id variant
        var final_id_tax = doc.tax[doc.tax.length - 1].id //Traigo el ultimo id tax
        //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
        if (tax_array) {
            const tax = tax_array;//Traigo el ojeto especifico 
            tax.value = value_n; //Edito el valor del value por el valor nuevo
            //tax.id = name_n;//Edito el valor del value por el valor nuevo
            tax.name = name_n;
            tax.status = 'active';//Edito el valor del value por el valor nuevo
            tax.delete = false;//Edito el valor del value por el valor nuevo
            tax.updateDate = newDate;
            tax.updateUser = userName;
            //Acutualizo el documento
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
            });
            if (response) {
                var print_item = await catalog_config(); //Refrezco la pantalla
                Snackbar.show({
                    text: 'Se actualizo con exito!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            } else {
                Snackbar.show({
                    text: 'NO actualizo!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            }

        } else {
            Snackbar.show({
                text: 'NO actualizo!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
    }
}
///// CONFIG IMPUESTOS 2023

// AGREGO
async function catalog_config_tax_new(element) {
    try {
        let value = $('#new_value_tax_edit').val();
        let name = $('#new_name_tax_input').val();
        $('#new_value_tax_edit').attr('placeholder', 'Porcentaje'); //Grabo el valor en un attr en el input
        $('#new_name_tax_input').attr('placeholder', 'Nombre'); //Grabo el valor en un attr en el input
        var value_n = String(value);
        var name_n = String(name);
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc = await L_catalog_db.get('tax_list'); //Traigo el documento
        var id_tax = doc.tax[doc.tax.length - 1];
        //Si Id_tax es nulo o esta vacio 
        if (id_tax) {
            var new_id = id_tax.id
            var sum_id = new_id + 1;// Veo el ultimo id y le agrego 1
            var final_id = Number(sum_id);
        } else {
            var final_id = 1; //Defino la id 1 como incial
        }
        var new_tax = {
            id: final_id,
            value: value_n,
            name: name_n,
            status: 'active',
            delete: false,
            create: newDate,
            updateDate: newDate,
            updateUser: userName

        };
        var tax_array = doc.tax.push(new_tax);  //Envio los datos editados al documento
        //Envio el documento
        var response = await L_catalog_db.put({
            _id: doc._id,
            _rev: doc._rev,
            ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
        });
        if (response) {
            var print_item = await catalog_config(); //Refrezco la pantalla
            Snackbar.show({
                text: 'Se actualizo con exito!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        } else {
            Snackbar.show({
                text: 'NO actualizo!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// EDITAR 
async function catalog_config_new_tax(element) {
    try {
        //Traigo los valores
        var id = $(element).attr('id');
        let new_value = $(element).attr('value');
        let new_name = $(element).attr('name');
        //Filtro los resultados
        var id_n = Number(id);
        var value_n = Number(new_value);
        var name_n = Number(new_name);
        //Modifico el dom
        var doc = await L_catalog_db.get('tax_list');

        if (id) {
            var tax_array = doc.tax.find(response => response.id == id_n);// Traigo el elemento por la id variant
            var final_id_tax = doc.tax[doc.tax.length - 1]//Traigo el ultimo id tax
            alert(final_id_tax);
        }
        else {
            var final_id_tax = 1;
            var id = 0;
        }

        $('#new_value_tax_edit').val(); //Tomo el valor de input
        $('#new_value_tax_edit').attr('tax_id', id); //Grabo el valor en un attr en el input
        $("#new_name_tax_input").val(new_name); // cambio el valor del select
        $("#edit_panel_config_tax").first().fadeIn("slow");// Muestro el div con efecto
        $('#new_value_tax_edit').focus(); //llevo el foco al input 
        $('#catalog_config_tax_money_send').attr('onclick', 'catalog_config_tax_new(this)'); //Grabo el valor en un attr en el input
        // new_value_tax_edit
        $('#new_value_tax_edit').attr('placeholder', 'Porcentaje'); //Grabo el valor en un attr en el input
        $('#new_value_tax_edit').attr('type', 'number'); //Grabo el valor en un attr en el input
        $('#new_name_tax_input').attr('placeholder', 'Nombre'); //Grabo el valor en un attr en el input

    } catch (err) {
        console.log(err);
    }
}

// ELIMINO
async function catalog_config_tax_delete(element) {
    try {

        //Traigo los valores
        let id = $(element).attr('id');
        const id_n = Number(id);
        var doc = await L_catalog_db.get('tax_list');
        const new_price_list = doc.tax.filter(response => response.id != id_n);
        //Reemplazo el array por el filtrado
        doc.tax = new_price_list;
        //Acutualizo el documento
        var response = await L_catalog_db.put({
            _id: doc._id,
            _rev: doc._rev,
            ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
        });
        if (response) {
            var print_item = await catalog_config(); //Refrezco la pantalla
            Snackbar.show({
                text: 'Se actualizo con exito!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        } else {
            Snackbar.show({
                text: 'NO actualizo!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
    }
}

/*** FIN CONFIGURACION DE CATALOGO  ****/

async function new_price_list(element) {
    try {
        const doc_id = ('price_list');    //traigo el documento a editar
        const price_id = $(element).attr('price_id');
        // let input_id = $(element).attr('input_id');
        //Nuevos valores
        let new_value = $('#new_price_list_value' + variant_id).val();
        let price_list_id = $('#new_price_list_id' + variant_id).val(); //Id del documento a edita

        const doc_id_s = String(doc_id);
        var new_value_s = Number(new_value);
        var price_list_id_s = Number(price_list_id)

        //PRUEBAS NUEVAS
       // var user_Ctx = userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;

        //console.log(user_Ctx, 'USER CTX');
        // console.log(userName, 'USER userName');
        var doc = await L_catalog_db.get(doc_id_s);
        //Busco dentro de las variables
        if (variant_id) {

            var price_list = doc.price_list.find(response => response.id == price_id);// Traigo el elemento por la id variant
            //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
            if (price_list) {
                const price = price_list;//Traigo el ojeto especifico 
                price.value = new_value_s; //Edito el valor del value por el valor nuevo
                price.id = price_list_id_s;//Edito el valor del value por el valor nuevo
                price.updateDate = newDate;
                price.updateUser = userName;
            } else {
                var new_item = {
                    id: price_list_id_s,
                    value: new_value,
                    create: newDate,
                    updateDate: newDate,
                    updateUser: userName

                };
                //  console.log(userName, 'else userName',new_item,'new_item');
                var new_doc = item[input_id].unshift(new_item);  //Envio los datos editados al documento
            }
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
            });
            if (response) {
                Snackbar.show({
                    text: 'El precio se actualizo!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
                catalog_edit_item_url(doc_id, 1);
            } else {
                alert("no se actualizo");
            }
        }
    } catch (err) {
        console.log(err);
    }

}

// AGREGO
async function new_price_var(element) {

    try {
        //traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const variant_id = $(element).attr('variant_id');
        let input_id = $(element).attr('input_id');
        let new_value = $('#new_price_var_' + variant_id).val();
        let price_list_id = $('#price_list_var_' + variant_id).val(); //Id del documento a edita
        const doc_id_s = String(doc_id);
        var new_value_s = Number(new_value);
        var price_list_id_s = Number(price_list_id);

        let currency_id = 'ARS';
        let currency_value = '$';

        var currency = {
            id: currency_id,
            value: currency_value
        };

        //PRUEBAS NUEVAS
       // var user_Ctx = userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc = await L_catalog_db.get(doc_id_s);
        //Busco dentro de las variables
        if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            var price_list = item[input_id].find(response => response.id == price_list_id_s);// Compruebo q el id lista existe 
            //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
            if (price_list) {
                const price = price_list;//Traigo el ojeto especifico 
                price.value = new_value_s; //Edito el valor del value por el valor nuevo
                price.id = price_list_id_s;//Edito el valor del value por el valor nuevo
                price.updateDate = newDate;
                price.updateUser = userName;
                price.currency = currency;

            } else {


                var new_item = {
                    id: price_list_id_s,
                    value: new_value,
                    create: newDate,
                    updateDate: newDate,
                    updateUser: userName,
                    currency: currency

                };

                //  console.log(userName, 'else userName',new_item,'new_item');
                var new_doc = item[input_id].unshift(new_item);  //Envio los datos editados al documento
            }
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
            });
            if (response) {
                // load_all_cat(doc_id,arr_number_id );
                // catalog_edit_item_url(doc_id, 1);
                Snackbar.show({
                    text: 'El precio se actualizo!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
                catalog_edit_item_url(doc_id, 1);
            } else {
                alert("no se actualizo");
            }
        }
    } catch (err) {
        console.log(err);
    }

}

// EDITO
async function edit_price_var(element) {

    try {
        //traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const variant_id = $(element).attr('variant_id');
        const price_id = $(element).attr('price_id');
        const price_value = $(element).attr('price_value');
        $('#new_price_var_' + variant_id).focus();
        $('#new_price_var_' + variant_id).val(price_value);
        $("#price_list_var_" + variant_id + " option[value=" + price_id + "]").attr("selected", true);
    } catch (err) {
        console.log(err);
    }

}

// ELIMINO
async function dell_price_var(element) {
    try {
        // Traigo los valores de los atributos
        const variant_id = $(element).attr('variant_id');
        const input_id = $(element).attr('input_id');
        const new_value = $('#new_price_var_' + variant_id).val();
        const price_list_id = $(element).attr('price_id');
        const price_list_value = $(element).attr('price_value');

        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar el precio' + price_list_value + ' ID: ' + price_list_id + '?',
            width: '475px',
            pos: 'bottom-center',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function (element) {
                //Efecto y verificacion del tag
                let doc_id_s = String(doc_id);
                //Traigo el documento actualizado
                let doc = await L_catalog_db.get(doc_id_s);
                //Filtro los resultados del array menos el que quiero eliminar
                var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
                //var price_list  = item[input_id].find(response => response.id ==  price_list_id);// Compruebo q el id lista existe 
                const new_price_list = item[input_id].filter(response => response.id != price_list_id);
                //Reemplazo el array por el filtrado
                item[input_id] = new_price_list;
                //Guardo los cambios
                if (doc) {
                    var response = await L_catalog_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc,// trae todos los datos del doc y los pega en la raiz
                    });
                    if (response) {
                        //Limpio el item de la pantalla
                        catalog_edit_item_url(doc_id, 1);
                        $(element).parent('li').remove();
                    } else {
                        //Si no se grabo tira un error en pantalla
                        $(element).parent('li').css("color", "red");
                    }
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

////////////////////////////////////////
// MOVIMIENTO STOCK ( PRODUCTO ) 2023 //
////////////////////////////////////////

// Los movimientos no se pueden editar se puen hacer nuevos ingresos y egresos de mercaderia
// Los movimientos de stock se editan de los primeros mas viejos q fueron ingrasados 
// se usa ese precio de costo, para sumar las ganancias
/// EDICION DE PRECIOS DEL PRODUCTO
// LOGICA :
// 1: Recorro los objetos, y busco el ultimo con stock disponible, le descuento el stock al real_stock
// si no alcanza sigo y descuento el objeto con disponible q sigue hasta no tener mas para descontar
// 2 : Por final creo un nuevo objeto con q registra el movimiento, y lo guardo ahi.

/// AGREGAR 
async function add_stock_var(element) {

    try {
        // traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const variant_id = $(element).attr('variant_id');
        let input_id = $(element).attr('input_id');
        let currency_id = $('#catalog_product_selected_currency_' + variant_id).attr('item_value_id'); //Id del documento a edita
        let currency_value = $('#catalog_product_selected_currency_' + variant_id).attr('item_value'); //Id del documento a edita
        let currency_name = $('#catalog_product_selected_currency_' + variant_id).attr('currency_name'); //Id del documento a edita

        let new_value = $('#add_stock_var_' + variant_id).val();
        let new_cost_stock = $('#new_cost_stock_var_' + variant_id).val(); //Id del documento a edita
        var add_stock_variant_id = Math.floor(Math.random() * (+'1000' - +'1')) + +'1';
        // FILTRO LOS INPUT
        const doc_id_s = String(doc_id);
        var new_value_s = Number(new_value);
        var new_cost_stock_s = Number(new_cost_stock);
        // PRUEBAS NUEVAS
       // var user_Ctx = userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc = await L_catalog_db.get(doc_id_s);
        //Hago comprobaciones 
        if (new_cost_stock_s === 0) {
            $('#new_cost_stock_var_' + variant_id).css('border', '3px solid red');
            Snackbar.show({
                text: 'Falta completar el precio',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
        else if (new_value_s === 0) {
            $('#add_stock_var_' + variant_id).css('border', '3px solid red');
            Snackbar.show({
                text: 'Falta completar la cantidad',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
        else if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            var price_list = item[input_id].find(response => response.id == add_stock_variant_id);// Compruebo q el id lista existe 
            //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
            if (price_list) {
                var add_stock_variant_id = Math.floor(Math.random() * (+'100000000' - +'1')) + +'1';
            } else {
                var new_item = {
                    id: add_stock_variant_id,
                    create: newDate,
                    in_datetime: newDate,
                    update_datetime: newDate,
                    updateUser: userName,
                    type: 'in',
                    in_stock: new_value_s,
                    out_stock: 0,
                    real_stock: new_value_s,
                    cost_price: new_cost_stock_s,
                    currency_id: currency_id,
                    currency_value: currency_value,
                    currency_name: currency_name,
                    location_id: 1
                };
                //  console.log(userName, 'else userName',new_item,'new_item');
                var new_doc = item[input_id].unshift(new_item);  //Envio los datos editados al documento
                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
                });
                if (response) {
                    // load_all_cat(doc_id,arr_number_id );
                    // catalog_edit_item_url(doc_id, 1);
                    Snackbar.show({
                        text: 'El stock se actualizo!',
                        actionText: 'ok',
                        pos: 'bottom-right',
                        actionTextColor: "#0575e6",
                    });
                    catalog_edit_item_url(doc_id, 1);
                } else {
                    alert("no se actualizo");
                }

            }

        } else {


        }

    } catch (err) {
        console.log(err);
    }
}

// ELIMINAR
async function dell_stock_var(element) {

    try {
        //traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const variant_id = $(element).attr('variant_id');
        var out_stock_input = $('#dell_stock_var_' + variant_id).val();
        /// ********* HACER UN BUCLE QUE RESTE EL STOCK edite en array y si sobran valores continua con el resto hasta que queda en 0
        // Buscar el ultimo movimiento con stock y descontar y dejarlo con el valor q resta, 
        // si el resultado queda en poitivo sique restando al siguiente array hasta que queda en 0
        const doc_id_s = String(doc_id);
        var out_stock_s = Number(out_stock_input);
        //PRUEBAS NUEVAS
        // var user_Ctx =  userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc = await L_catalog_db.get(doc_id_s);
        // var check_first_date = check_old_date_inventary ;
        // Buscar el objeto (con create mas viejo) con y real_stock >= 1 ( y restar) - out_stock guardar
        // hay que hacer un bucle para poder ir verificando q el real_stock que pare cuando llegue a 0
        // Y continuar con el proximo objeto, repertir el filtro y la operacion hasta q out_stock quede en 0
        var get_variant_id = doc.variations.find(response => response.id == variant_id);
        var stock_invetary = get_variant_id['stock_invetary'];
        var count_out_stock = out_stock_s;
        for (var i = stock_invetary.length - 1; i >= 0; i--) {
            //Compruebo q tenga stock mayor a 1
            var real_stock = stock_invetary[i].real_stock;
            var out_stock = stock_invetary[i].out_stock;
            //si el stock es mayor o igual a 1 tomo ese valor y le resto el out stock
            if (real_stock >= 1 && count_out_stock >= 1) {
                // Hago el descuento uno por uno hasta llegar a 0 y gravo la variable con el resutado
                for (var i2 = count_out_stock - 1; i2 >= 0; i2--) {
                    var real_stock = real_stock - 1;
                    var out_stock = out_stock += 1;
                    var count_out_stock = count_out_stock - 1;
                    //Compruebo que queda stock disponible
                    if (real_stock <= 0) {
                        // Si no hay mas stock paro y guardo el resultado en el array
                        var stock_invetary_new = stock_invetary[i];
                        stock_invetary_new.real_stock = real_stock;
                        stock_invetary_new.out_stock = out_stock;
                        stock_invetary_new.update_datetime = newDate;
                        stock_invetary_new.updateUser = userName;
                        break
                    } else {
                        continue;
                    }
                }
                // EDITO EL ARRAY 
                var stock_invetary_new = stock_invetary[i];
                stock_invetary_new.real_stock = real_stock;
                stock_invetary_new.out_stock = out_stock;
                stock_invetary_new.update_datetime = newDate;
                stock_invetary_new.updateUser = userName;
            }

        }
        //Modifico los datos del array viejo por el nuevo
        var stock_invetary = stock_invetary;
        // Lo guardo
        var response = await L_catalog_db.put({
            _id: doc._id,
            _rev: doc._rev,
            ...doc,
        });
        if (response) {
            // load_all_cat(doc_id,arr_number_id );
            // catalog_edit_item_url(doc_id, 1);
            Snackbar.show({
                text: 'El actualizo el stock!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
            catalog_edit_item_url(doc_id, 1);
        } else {
            alert("no se actualizo");
        }

        console.log('(ARRAY MODIFICADO stock_invetary ):', stock_invetary);
    } catch (err) {
        console.log(err);
    }

}


/// EDICION GENERAL DE IMPUTS CHEKBOX Y SWICHETS
async function cat_edit_chekbox(element) {

    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        const variant_id = $(element).attr('variant_id'); // EL ID DE LA VARIABLE
        const input_id = $(element).attr('input_id'); //EL id del OBJETO a editar
        const new_value = $(element).val(); //EL VALOR DEL NUEVO OBJETO 
        const input_status_html_id = '#' + doc_id + '_' + variant_id + '_' + input_id + '_checkbox'; //Armo la id del checkbox
        const input_html_id = '#' + doc_id + '_' + variant_id + '_' + input_id + '_input'; // Armo la id del input
        const new_input_status = $(input_status_html_id).is(':checked'); // Compruebo si la propiedad del input esta chekeada o no 
        //Compruebo si el input se habilita con un input true false, O si no tiene checkbox
        if (new_input_status === false) {
            var input_status = false;
            $(input_html_id).addClass('bg-gray', true);
            // $(input_html_id).prop('disabled', true);
            // $(input_html_id).prop('status', true);
        } else if (new_input_status === true) {
            var input_status = true;

            $(input_html_id).removeClass('bg-gray');
            //$(input_html_id).prop('disabled', false);
            //$(input_html_id).prop('status', false);
        } else {
            var input_status = true;
        }
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
        // Si el objeto a editar esta dentro de una variable
        if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            const new_objet_input = item; //Traigo el ojeto especifico 
            new_objet_input[input_id] = { 'status': input_status, 'value': new_value }; //Si existe el objeto Edito el valor del value por el valor nuevo
            console.log('DOCUMENTO ACTUALIZADO');
            console.log(input_status);
        }
        // Si la edicion es fuera de una variable
        else {
            doc[input_id] = new_value;//BUSCO EL OBJETO Y LO EDITO
        }
        //ENVIO El NUEVO DOCUMENTO EDITADO
        if (doc) {
            // console.log('EDICION DE:new_value');
            // console.log(new_value);
            //console.log('EDICION DE:new_value');
            //console.log();
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// trae todos los datos del doc y los pega en la raiz
            });

        }
    } catch (err) {
        console.log(err);
    }
}

//////////////////////////////////////
// NUEVA VARIABLE ( PRODUCTO ) 2023 //
//////////////////////////////////////

// AGREGAR
async function cat_new_variant(element) {

    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        //  const variant_id = $(element).attr('variant_id'); // EL ID DE LA VARIABLE
        //Compruebo si el input se habilita con un input true false, O si no tiene checkbox
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento actualizado
        var new_variant_id = Math.floor(Math.random() * (+'1000' - +'1')) + +'1';
        // var new_variant_id = doc.variations.length + 1; //Cuento el numero variables q hau y le sumo uno para dar el nuevo numero de id
        var doc_varian_id = doc.variations.find(response => response.id == new_variant_id);// Compruebo q el id no exista

        if (!doc_varian_id) {

            var new_variant = {
                "id": new_variant_id,
                "tax": [
                    {
                        "id": "0",
                        "value": "21"
                    },
                    {
                        "id": "1",
                        "value": "10"
                    }
                ],
                "sku": {
                    "status": true,
                    "value": ""
                },
                "pictures": [
                    {
                        "max": "/public/app/v4.0/dist/img/catalog/product-thumbnail.png",
                        "min": "/public/app/v4.0/dist/img/catalog/product-thumbnail.png"
                    }
                ],
                "attribute_combinations": [
                    {
                        "id": "COLOR",
                        "id_name": "Color",
                        "name": "Roja",
                        "value": "EF5350"
                    },
                    {
                        "id": "SIZE",
                        "id_name": "Talle",
                        "name": "Medium",
                        "value": "M"
                    }
                ],
                "price_list": [
                    {
                        "id": 1,
                        "value": 0
                    }
                ],
                "stock_invetary": [

                ],
                "sold_quantity": 0,
                "description": {
                    "status": true,
                    "value": "Sin Descripcion"
                },
                "color": {
                    "status": false,
                    "value": "#4f78ba"
                },
                "size": {
                    "status": false,
                    "value": ""
                },
                "status": {
                    "status": true,
                    "value": ""
                }
            };
            //   console.log('ANTES DE EDITAR');
            //   console.log(doc.variations);
            doc.variations.push(new_variant);
            //  console.log('DESPUES DE EDITAR CON PUSH');
            //  console.log(doc.variations);
            //ENVIO El NUEVO DOCUMENTO EDITADO
            if (doc) {
                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// trae todos los datos del doc y los pega en la raiz
                });
                if (response) {
                    var print_item = await catalog_edit_item_url(doc_id, new_variant_id);// Refrezco la vista de las variables de nuevo
                    // console.log('PRINT ITEM BORRADO')
                    //console.log(print_item)
                    return print_item;
                }
            }
        } else {

        }
    } catch (err) {
        console.log(err);
    }

}

// ELIMINAR
async function cat_delete_variant(element) {

    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        const variant_id = $(element).attr('variant_id'); // EL ID DE LA VARIABLE
        //Compruebo si el input se habilita con un input true false, O si no tiene checkbox
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento actualizado
        var new_variations = doc.variations.filter(response => response.id != variant_id); //Traigo el array variant filtrado por el variant_id que quiero eliminar
        doc.variations = new_variations;
        //ENVIO El NUEVO DOCUMENTO EDITADO
        if (doc) {
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// trae todos los datos del doc y los pega en la raiz
            });
            if (response) {
                catalog_edit_item_url(doc_id, variant_id);// Refrezco la vista de las variables de nuevo
            }
        }
    } catch (err) {
        console.log(err);
    }

}

// EDITAR 
async function cat_edit_variations(element) {

    try {
        //traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const variant_id = $(element).attr('variant_id');
        const input_id = $(element).attr('input_id');
        const new_value = $(element).val();
        var doc_id_s = String(doc_id);
        var doc = await L_catalog_db.get(doc_id_s);
        //Busco dentro de las variables
        if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            const value = item[input_id]; //Traigo el ojeto especifico 
            value.value = new_value; //Edito el valor del value por el valor nuevo
        }
        else {
            doc[input_id] = new_value;
        }
        if (item) {
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,
            });
            // console.log('DOC DATA RESPONSE EDITADO');
            //  console.log(doc);
            //  console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
}



////// UPLOAD IMAGEN PRODUCTO ///
async function uploadImage(element) {
    //const fileInput = document.getElementById("fileInput");
    const doc_id = $(element).attr('doc_id');
    const variant_id = $(element).attr('variant_id');
    const input_id = 'pictures';

    const input = document.getElementById('img-file-input-' + variant_id);

    if (input.files.length > 0) {
        //console.log("Se ha cargado un archivo.");
        const file = input.files[0];
        const formData = new FormData();
        formData.append('userfile', file);

        //const preloader = document.getElementById('preloader');
        //preloader.style.display = 'block';

        //$('#preloader').attr('hidden','');
        $('#preloader_finish').hide();
        $('#preloader_up_pic').show();

        try {
            const response = await fetch('img_product_upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            $('#preloader_up_pic').hide();
            $('#preloader_finish').show();

            // preloader.style.display = 'none';
            /// Actualizo el linck del docuemento 
            var doc_id_s = String(doc_id);
            var doc = await L_catalog_db.get(doc_id_s);
            //Busco dentro de las variables
            if (variant_id) {
                var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
                var value = item[input_id]; //Traigo el ojeto especifico 
                value[0] = {
                    max: data.new_name,
                    min: data.new_name
                };
                //Edito el valor del value por el valor nuevo
                if (item) {
                    L_catalog_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc,
                    });
                    $("#img-card-" + variant_id + "-" + doc._id).css("background-image", "url('" + data.new_name + "')");
                    $("#mini-card-img-card-" + variant_id + "-" + doc._id).attr("src", data.new_name);

                    console.log(data.new_name, doc._id, variant_id);
                }
            }
        } catch (error) {
            console.error(error);
            preloader.style.display = 'none';
        }
    } else {
        console.log("No se ha cargado ningún archivo.");
    }

}







