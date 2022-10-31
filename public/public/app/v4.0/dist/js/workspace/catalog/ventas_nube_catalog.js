//Funciones que pueden servir para Importar productos desde otra base de datos
// CARGO LOS PRODUCTOS DE SQL EN LA DB LOCAL y COUCHDB
function charge_all_docs_local(remote_items) {
    L_catalog_db.bulkDocs({ docs: remote_items },
        function (err, response) {
            // handle err or response
        });
}

all_items_array = {};
search_fuse = null;

// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_all_catalog_intems(ws_id, filter) {
    // Traigo los resultados de una vista
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
        success: function (response) {
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

/**** Nuevo catalogo ****/
//Cargo la variable catalog 
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


/**** NUEVO PRODUCTO */
function form_new_product(ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/form_new_product.hbs', '#right_main_compiled', ws_cart);
    // $('#cart_user_input').focus();
    console.log('FORM NEW PRODUCT');
};

//* CATALOGO 2021 Tarjetas materiales  **/
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

        console.log('VISTA DE PRODUCTO ROLES');
        console.log(user_Ctx.userCtx.roles);
        console.log('VISTA DE PRODUCTO ARRAY');
        console.log(product_doc_array);

        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_view_item.hbs', '#right_main', product_doc_array);
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_new_variation.hbs', '#edit_variations_main', product_doc_array);
      
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        // var m_name = $(this).attr('s_url_t_m'); //Trae Pacht url /pacht/    
        // var m_url = url_app +'?type=catalog?=' + m_name; // Armo la url completa del linck
        //  history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion        
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
            category_list: new_category_list,
            trade_list: new_trade_list,
            model_list: new_model_list,
            attributes_list:attributes
        }

        var item_print = await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_edit_item.hbs', '#right_main', product_doc_array);
        var item_print = await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_new_variation.hbs', '#edit_variations_main', product_doc_array);


       // console.log('product_doc_array', product_doc_array);
        // alert('Holaaaaaa');

        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        var m_url = '?type=catalog&?t=edit&?id=' + product_id + '&?v=' + variant_id;
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion     
        return item_print;   
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
            category_list: new_category_list,
            trade_list: new_trade_list,
            model_list: new_model_list,
            attributes_list:attributes
        }
        var item_print = await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_edit_item.hbs', '#right_main', product_doc_array);
        var item_print = await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_new_variation.hbs', '#edit_variations_main', product_doc_array);
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

$(document).on('click', '.catalog_new_item', function (event) {
    //  $('#master_popup').modal('show');
    // get_catalog_new_item();
    catalog_edit_item();
    alert('catalog_new_item');
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

// EDITAR PRODUCTOS
// TAGS
// Tomo el enter si esta en el input
function add_new_tag_press(e, element) {
    var key = e.keyCode || e.which;
    if (key == 13) {
        add_new_tag(element);
    }
}

// Agrego un tag
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
    }catch (err) {
        console.log(err);
        $(element).css("color", "red");
    }
}

// Elimino un tag
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
        const tags = doc.tags.filter(word => word != new_tag);
        //Reemplazo el array por el filtrado
        doc['tags'] = tags;
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
    }catch (err) {
        console.log(err);
    }
}

//FIN TAGS

// FUNCIONES CATEGORIAS
// Traigo las categorias, 
/*
async function get_all_cat(element) {

var template_obj = "Handlebars <b>{{doesWhat}}</b> precompiled!";
var Handlebars = require("handlebars");
var template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));
$(element).parent('div').css("color", "red");

}
*/

// FUNCIONES EDITAR CATEGORIAS 2022

// Agrego un Categoria
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
                var arr_number_id_valid  = doc.category_list.find(response => response.id == arr_number_id);// Compruebo q el id no exista
                if(!arr_number_id_valid){
                    var new_item = {
                        id:arr_number_id,
                        value:new_cat,
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
    }catch (err) {
     
    }
}

// Search Input de categorias
async function add_new_cat_press(e, element) {
    var key = e.keyCode || e.which;
    //tomo el key code para saber si es el enter o un caracter
    if (key == 13) {
       // alert($(element).val());
        add_new_cat(element);
        catalog_edit_item_url($(element).attr('doc_id'));
        $('#edit-item-description-body').addClass('in');
    }else{
        //Si el evento de teclado no es 13 que lo busque en el doc de las categorias y traiga el resultado mas parecido con find
        var doc_id = $(element).attr('doc_id');
        var new_cat_val = $(element).val();
        var select_div_id  = "#select_category_list_"+doc_id;
        var new_cat = String(new_cat_val);
        if (new_cat) {
            let doc_id_s = String(doc_id);  // Me aseguro q sea un string
            let doc = await L_catalog_db.get('category_list');
            //Filstro con una busqueda que incluya las palabras que ingreso al input
            const filterItems = query => {
            return doc.category_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );}
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

// Tomo la seleccion nueva y edito el documento
async function cat_edit_product_category(element){
    const doc_id = $(element).attr('doc_id'); //Id del documento a editar
    const input_value =  $(element).attr('input_value'); //Id del documento a edita

    let input_id = $(element).attr('input_id');
    let new_value = $(element).attr('new_value');

    // const new_value = $(element).val(); //EL VALOR DEL NUEVO OBJETO 
    var doc_id_s = String(doc_id); //Combierto el id del doc en un string
    var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
    
     doc[input_id] = {'id':input_value,'value':new_value} ;//BUSCO EL OBJETO Y LO EDITO
     var response = await L_catalog_db.put({
        _id: doc._id,
        _rev: doc._rev,
        ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
    });
    catalog_edit_item_url(doc_id, 1);
    //  alert('salio todo ok')

};

// Elimino una Categoria
async function catalog_dell_cat(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({  
            text: '<span class="material-icons">delete</span> Quieres eliminar la categoria ' +value+' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
               onActionClick: async function(element) {   
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
                doc['category_list'] = new_cat_list;
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
    }catch (err) {
        console.log(err);
    }
}

// Boton traigo las catgorias
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


/// MARCA 2022


// Agrego un Categoria
async function add_new_trade(element) {    
    try {
        var doc_id = $(element).attr('doc_id');
        var new_trade_val = $(element).val();
        //  var input_value = $(element).attr('input_value');
        //var input_id = $(element).attr('doc_id');
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
                var arr_number_id_valid  = doc.trade_list.find(response => response.id == arr_number_id);// Compruebo q el id no exista
                if(!arr_number_id_valid){
                    var new_item = {
                        id:arr_number_id,
                        value:new_trade,
                       // sub_category: []
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
                    Snackbar.show({
                        text: 'La marca ' + new_trade_val + ' se agrego!',
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
                text: ' La marca no puede estar bacia',
                width: '475px',
                pos: 'bottom-right',
                actionTextColor: "#4CAF50"
            });
        }
    }catch (err) {
     
    }
}

// Search Input de categorias
async function add_new_trade_press(e, element) {
    var key = e.keyCode || e.which;
    //tomo el key code para saber si es el enter o un caracter
    if (key == 13) {
       // alert($(element).val());
        add_new_trade(element);
        catalog_edit_item_url($(element).attr('doc_id'));
        $('#edit-item-description-body').addClass('in');
    }else{
        //Si el evento de teclado no es 13 que lo busque en el doc de las categorias y traiga el resultado mas parecido con find
        var doc_id = $(element).attr('doc_id');
        var new_trade_val = $(element).val();
        var select_div_id  = "#select_trade_list_"+doc_id;
        var new_trade = String(new_trade_val);
        if (new_trade) {
            let doc_id_s = String(doc_id);  // Me aseguro q sea un string
            let doc = await L_catalog_db.get('trade_list');
            //Filstro con una busqueda que incluya las palabras que ingreso al input
            const filterItems = query => {
            return doc.trade_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );}
           // creo un array con los datos del producto y la lista de categorias actualizadas
            var trade_list_search = {
                _id: doc_id,
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                trade_find_list: filterItems(new_trade)
            }
            //renderizo las categorias nuevas filtradas
            var item_print = await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_edit_item_cat_list.hbs', select_div_id, trade_list_search);
      }
    }
}

// Elimino una Categoria
async function catalog_dell_trade(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({  
            text: '<span class="material-icons">delete</span> Quieres eliminar la marca ' +value+' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
               onActionClick: async function(element) {   
                //Efecto y verificacion del tag
                let doc_id_s = String(doc_id);
                //Traigo el documento actualizado
                console.log(doc_id_s);
                let doc = await L_catalog_db.get('trade_list');
                console.log(doc);
                //Filtro los resultados del array menos el que quiero eliminar
                const new_trade_list = doc.trade_list.filter(word => word.value != value);
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
    }catch (err) {
        console.log(err);
    }
}

// Tomo la seleccion nueva y edito el documento
async function catalog_edit_trade(element){
    const doc_id = $(element).attr('doc_id'); //Id del documento a editar
    const input_value =  $(element).attr('input_value'); //Id del documento a edita

    let input_id = $(element).attr('input_id');
    let new_value = $(element).attr('new_value');

    // const new_value = $(element).val(); //EL VALOR DEL NUEVO OBJETO 
    var doc_id_s = String(doc_id); //Combierto el id del doc en un string
    var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
    
     doc[input_id] = {'id':input_value,'value':new_value} ;//BUSCO EL OBJETO Y LO EDITO
     var response = await L_catalog_db.put({
        _id: doc._id,
        _rev: doc._rev,
        ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
    });
    catalog_edit_item_url(doc_id, 1);
    //  alert('salio todo ok')

};


// MODELOS 2022


// Agrego un Categoria
async function add_new_model(element) {    
    try {
        var doc_id = $(element).attr('doc_id');
        var new_model_val = $(element).val();
        //  var input_value = $(element).attr('input_value');
        //var input_id = $(element).attr('doc_id');
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
                var arr_number_id_valid  = doc.model_list.find(response => response.id == arr_number_id);// Compruebo q el id no exista
                if(!arr_number_id_valid){
                    var new_item = {
                        id:arr_number_id,
                        value:new_model,
                       // sub_category: []
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
                    Snackbar.show({
                        text: 'La marca ' + new_model_val + ' se agrego!',
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
                text: ' La marca no puede estar bacia',
                width: '475px',
                pos: 'bottom-right',
                actionTextColor: "#4CAF50"
            });
        }
    }catch (err) {
     
    }
}

// Search Input de categorias
async function add_new_model_press(e, element) {
    var key = e.keyCode || e.which;
    //tomo el key code para saber si es el enter o un caracter
    if (key == 13) {
       // alert($(element).val());
        add_new_model(element);
        catalog_edit_item_url($(element).attr('doc_id'));
        $('#edit-item-description-body').addClass('in');
    }else{
        //Si el evento de teclado no es 13 que lo busque en el doc de las categorias y traiga el resultado mas parecido con find
        var doc_id = $(element).attr('doc_id');
        var new_model_val = $(element).val();
        var select_div_id  = "#select_model_list_"+doc_id;
        var new_model = String(new_model_val);
        if (new_model) {
            let doc_id_s = String(doc_id);  // Me aseguro q sea un string
            let doc = await L_catalog_db.get('model_list');
            //Filstro con una busqueda que incluya las palabras que ingreso al input
            const filterItems = query => {
            return doc.model_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );}
           // creo un array con los datos del producto y la lista de categorias actualizadas
            var model_list_search = {
                _id: doc_id,
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                model_find_list: filterItems(new_model)
            }
            //renderizo las categorias nuevas filtradas
            var item_print = await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_edit_item_cat_list.hbs', select_div_id, model_list_search);
      }
    }
}

// Elimino una Categoria
async function catalog_dell_model(element) {
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({  
            text: '<span class="material-icons">delete</span> Quieres eliminar la marca ' +value+' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
               onActionClick: async function(element) {   
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
    }catch (err) {
        console.log(err);
    }
}

// Tomo la seleccion nueva y edito el documento
async function catalog_edit_model(element){
    const doc_id = $(element).attr('doc_id'); //Id del documento a editar
    const input_value =  $(element).attr('input_value'); //Id del documento a edita

    let input_id = $(element).attr('input_id');
    let new_value = $(element).attr('new_value');

    // const new_value = $(element).val(); //EL VALOR DEL NUEVO OBJETO 
    var doc_id_s = String(doc_id); //Combierto el id del doc en un string
    var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
    
     doc[input_id] = {'id':input_value,'value':new_value} ;//BUSCO EL OBJETO Y LO EDITO
     var response = await L_catalog_db.put({
        _id: doc._id,
        _rev: doc._rev,
        ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
    });
    catalog_edit_item_url(doc_id, 1);
    //  alert('salio todo ok')

};




//   SUB CATERGORIAS 2022
// FUERON ELIMINADAS LAS SUB CATEGORIAS

// FIN FUNCIONES CATEGORIAS

// Boton Agregar catgorias
/*
function catalog_new_cat(element) {
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
*/
// EDICION GENERAL DE IMPUTS EN VARIABLE Y GENERAL
async function cat_edit_product(element) {

    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        const variant_id = $(element).attr('variant_id'); // EL ID DE LA VARIABLE
        const input_id = $(element).attr('input_id'); //EL id del OBJETO a editar
        const new_value = $(element).val(); //EL VALOR DEL NUEVO OBJETO 
        const input_status_html_id = '#'+doc_id+'_'+variant_id+'_'+input_id+'_status'; //Armo la id del checkbox
        const input_html_id = '#'+doc_id+'_'+variant_id+'_'+input_id; // Armo la id del input
        const new_input_status =  $(input_status_html_id).is(':checked'); // Compruebo si la propiedad del input esta chekeada o no 
        //Compruebo si el input se habilita con un input true false, O si no tiene checkbox
        if(new_input_status === false){
            var input_status = true;
            $(input_html_id).prop('disabled', true);
            $(input_html_id).prop('status', true);
        }else if(new_input_status === true){
            var input_status = false;
            $(input_html_id).prop('disabled', false);
            $(input_html_id).prop('status', false);
        }else{
            var input_status = true;
        }
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
        // Si el objeto a editar esta dentro de una variable
        if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            const new_objet_input = item; //Traigo el ojeto especifico 
            new_objet_input[input_id] = {'status':input_status,'value':new_value}; //Si existe el objeto Edito el valor del value por el valor nuevo
        }
        // Si la edicion es fuera de una variable
        else {
         doc[input_id] = new_value ;//BUSCO EL OBJETO Y LO EDITO
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

// CONFIGURACION DE CATALOGO
// EDICION DE LISTA DE PRECIOS GENERAL


/**** NUEVO PRODUCTO */
function form_new_product(ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/form_new_product.hbs', '#right_main_compiled', ws_cart);
    // $('#cart_user_input').focus();
    console.log('FORM NEW PRODUCT');
};

async function catalog_config(element) {
    try {
       var price_list = await L_catalog_db.get('price_list');
       var currency_list = await L_catalog_db.get('currency_list');
        var catalog_config = {
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            price_list :price_list.price_list,
            currency_list:currency_list.currency_list
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/config/catalog_config.hbs', '#right_main_compiled', catalog_config);
    
    } catch (err) {
    console.log(err);
}
}

async function catalog_config_show_edit(element) {
    try {
       var price_list = await L_catalog_db.get('price_list');
       var currency_list = await L_catalog_db.get('currency_list');
        var catalog_config = {
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            price_list :price_list.price_list,
            currency_list:currency_list.currency_list
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/config/catalog_config.hbs', '#right_main_compiled', catalog_config);
    
    } catch (err) {
    console.log(err);
}
}


async function new_price_list(element) {

    try {
    
        const doc_id = ('price_list');    //traigo el documento a editar
        //
        const price_id = $(element).attr('price_id');
        // let input_id = $(element).attr('input_id');
        //Nuevos valores
        let new_value = $('#new_price_list_value'+variant_id).val();
        let price_list_id =  $('#new_price_list_id'+variant_id).val(); //Id del documento a edita

        const doc_id_s = String(doc_id);
        var new_value_s = Number(new_value);
        var price_list_id_s = Number(price_list_id)

            //PRUEBAS NUEVAS
        var user_Ctx =  userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;

        //console.log(user_Ctx, 'USER CTX');
       // console.log(userName, 'USER userName');
       var doc = await L_catalog_db.get(doc_id_s);
        //Busco dentro de las variables
        if (variant_id) {


            var price_list = doc.price_list.find(response => response.id == price_id);// Traigo el elemento por la id variant
            
           // var price_list  = item[input_id].find(response => response.id ==  price_list_id_s);// Compruebo q el id lista existe 
            //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
            
            
            if(price_list){
                const price = price_list;//Traigo el ojeto especifico 
                price.value = new_value_s; //Edito el valor del value por el valor nuevo
                price.id = price_list_id_s;//Edito el valor del value por el valor nuevo
                price.updateDate = newDate;
                price.updateUser = userName;
            }else{
                var new_item = {
                        id:price_list_id_s,
                        value:new_value,
                        create:newDate,
                        updateDate : newDate,
                        updateUser : userName
                            
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



// EDICION DE PRECIOS DEL PRODUCTO
async function new_price_var(element) {

    try {
        //traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const variant_id = $(element).attr('variant_id');
        let input_id = $(element).attr('input_id');
        let new_value = $('#new_price_var_'+variant_id).val();
        let price_list_id =  $('#price_list_var_'+variant_id).val(); //Id del documento a edita

       // let doc_id_s = String('category_list');  // Me aseguro q sea un string
       // let doc = await L_catalog_db.get(doc_id_s);
      //  const tag_index = doc.category_list.find((objeto) => objeto.value == new_cat);  // Verigico q el item a agregar ya no este repetido
  
        // alert(new_value);
        // console.log(new_value);

        const doc_id_s = String(doc_id);
        var new_value_s = Number(new_value);
        var price_list_id_s = Number(price_list_id)

            //PRUEBAS NUEVAS
        var user_Ctx =  userCtx;
            
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;

        //console.log(user_Ctx, 'USER CTX');
       // console.log(userName, 'USER userName');
       var doc = await L_catalog_db.get(doc_id_s);
        //Busco dentro de las variables
        if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            var price_list  = item[input_id].find(response => response.id ==  price_list_id_s);// Compruebo q el id lista existe 
            //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
            if(price_list){
                const price = price_list;//Traigo el ojeto especifico 
                price.value = new_value_s; //Edito el valor del value por el valor nuevo
                price.id = price_list_id_s;//Edito el valor del value por el valor nuevo
                price.updateDate = newDate;
                price.updateUser = userName;
            }else{
                var new_item = {
                        id:price_list_id_s,
                        value:new_value,
                        create:newDate,
                        updateDate : newDate,
                        updateUser : userName
                            
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

// EDICION DE PRECIOS DEL PRODUCTO
// Elimino una Categoria

async function dell_price_var(element) {
    try {
        // Traigo los valores de los atributos
        const variant_id = $(element).attr('variant_id');
        const input_id = $(element).attr('input_id');
        const new_value = $('#new_price_var_'+variant_id).val();
        const price_list_id = $(element).attr('price_id');
        const price_list_value = $(element).attr('price_value');

        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({  
            text: '<span class="material-icons">delete</span> Quieres eliminar el precio' + price_list_value+' ID: '+price_list_id +'?',
            width: '475px',
            pos: 'bottom-center',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
               onActionClick: async function(element) {   
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
    }catch (err) {
        console.log(err);
    }
}

// EDICION DE PRECIOS DEL PRODUCTO
async function edit_price_var(element) {

    try {
        //traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const variant_id = $(element).attr('variant_id');
        const price_id = $(element).attr('price_id');
        const price_value = $(element).attr('price_value');
       $('#new_price_var_'+variant_id).focus();
       $('#new_price_var_'+variant_id).val(price_value);
       $("#price_list_var_"+ variant_id +" option[value="+ price_id +"]").attr("selected",true);

    
    } catch (err) {
        console.log(err);
    }

}


// EDICION GENERAL DE IMPUTS CHEKBOX Y SWICHETS
async function cat_edit_chekbox(element) {

    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        const variant_id = $(element).attr('variant_id'); // EL ID DE LA VARIABLE
        const input_id = $(element).attr('input_id'); //EL id del OBJETO a editar
        const new_value = $(element).val(); //EL VALOR DEL NUEVO OBJETO 
        const input_status_html_id = '#'+doc_id+'_'+variant_id+'_'+input_id+'_checkbox'; //Armo la id del checkbox
        const input_html_id = '#'+doc_id+'_'+variant_id+'_'+input_id +'_input'; // Armo la id del input
        const new_input_status =  $(input_status_html_id).is(':checked'); // Compruebo si la propiedad del input esta chekeada o no 
        //Compruebo si el input se habilita con un input true false, O si no tiene checkbox
        if(new_input_status === false){
            var input_status = false;
            $(input_html_id).addClass('bg-gray', true);
           // $(input_html_id).prop('disabled', true);
           // $(input_html_id).prop('status', true);
        }else if(new_input_status === true){
            var input_status = true;

            $(input_html_id).removeClass('bg-gray');
            //$(input_html_id).prop('disabled', false);
            //$(input_html_id).prop('status', false);
        }else{
            var input_status = true;
        }
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_catalog_db.get(doc_id_s); //Traigo el documento
        // Si el objeto a editar esta dentro de una variable
        if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            const new_objet_input = item; //Traigo el ojeto especifico 
            new_objet_input[input_id] = {'status':input_status,'value':new_value}; //Si existe el objeto Edito el valor del value por el valor nuevo
            console.log('DOCUMENTO ACTUALIZADO');
            console.log(input_status);
        }
        // Si la edicion es fuera de una variable
        else {
         doc[input_id] = new_value ;//BUSCO EL OBJETO Y LO EDITO
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

// CREO NUEVA VARIABLE
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
            
        if(!doc_varian_id){

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
          {
            "id": 123,
            "in_datetime": "18/3/2021 18:45:10",
            "update_datetime": "18/3/2021 18:45:10",
            "quantity": 6,
            "sold_quantity": 2,
            "cost_price": 100
          },
          {
            "id": 231,
            "in_datetime": "18/3/2021 18:45:10",
            "update_datetime": "18/3/2021 18:45:10",
            "quantity": 4,
            "sold_quantity": 2,
            "cost_price": 150
          }
        ],
        "sold_quantity": 2,
        "description": {
          "status": true,
          "value": "Es una descripcion"
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
            if(response){
             var print_item = await catalog_edit_item_url(doc_id,new_variant_id);// Refrezco la vista de las variables de nuevo
            // console.log('PRINT ITEM BORRADO')
             //console.log(print_item)
             return print_item;
            }
            }
        }else{

        }
    } catch (err) {
        console.log(err);
    }

}

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
           if(response){
            catalog_edit_item_url(doc_id,variant_id);// Refrezco la vista de las variables de nuevo
           }
        }
    } catch (err) {
        console.log(err);
    }

}

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


