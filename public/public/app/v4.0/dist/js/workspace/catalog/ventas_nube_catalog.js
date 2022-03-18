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
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/nav_bar.hbs', '#nav_bar_compiled', ws_catalog_data);
    //alert('cargo el bucador');
    // $('#cart_user_input').focus();
    console.log('NAV BAR CATALOG');
};

function get_items_catalog(ws_id) {
    var ws_catalog = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/catalog_items.hbs', '#content_catalog_commpiled', ws_catalog);
    // $('#cart_user_input').focus();
    //console.log('GET ITEMS CATALOG');
}

function form_new_product(ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
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
        price_list: price_doc.price_list
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
            // sku:product_doc.variations[variant_id].sku.value,
            price_list: price_doc.price_list,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            category_list: category_list
        }

        console.log('Catalog_view_item OK ONE2 2222222');
        console.log(category_list);

        console.log('catalog_view_item OK ONE AAAAAAA');

        console.log('catalog_view_item OKK ONE');
        // console.log(product_doc_array);
        console.log(user_Ctx.userCtx.roles);
        console.log('product_doc_array');
        console.log(product_doc_array);

        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_view_item.hbs', '#right_main', product_doc_array);
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        // var m_name = 'catalog' //Trae Pacht url /pacht/    
        //var m_url = url_app +'?type=catalog&?=' + m_name; // Armo la url completa del linck
        var m_url = '?type=catalog&?t=product&?id=' + product_id + '&?v=' + variant_id;
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion        

    } catch (err) {
        console.log(err);
    }
}
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
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        // var m_name = $(this).attr('s_url_t_m'); //Trae Pacht url /pacht/    
        // var m_url = url_app +'?type=catalog?=' + m_name; // Armo la url completa del linck
        //  history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion        
    } catch (err) {
        console.log(err);
    }
}
async function catalog_edit_item(element) {
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
            user_roles: user_Ctx.userCtx.roles,
            category_list: category_list

        }

        console.log(category_list);

        console.log('catalog_view_item OK ONE AAAAAAA');
        // console.log(product_doc_array);
        console.log(user_Ctx.userCtx.roles);
        console.log('product_doc_array AAAAAAA');
        console.log(product_doc_array);

        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_edit_item.hbs', '#right_main', product_doc_array);
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        // var m_name = 'catalog' //Trae Pacht url /pacht/    
        //var m_url = url_app +'?type=catalog&?=' + m_name; // Armo la url completa del linck
        var m_url = '?type=catalog&?t=edit&?id=' + product_id + '&?v=' + variant_id;
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion        

    } catch (err) {
        console.log(err);
    }
}

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
        ws_lang_data: ws_lang_data
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
/* TAGS FUNCIONES */
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
                    $(element).val('');
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

//Tomo el enter si esta en el input
function add_new_cat_press(e, element) {
    var key = e.keyCode || e.which;
    if (key == 13) {
        add_new_cat(element);
    }
}

//CATEGORIAS
// Agrego un Categoria
async function add_new_cat(element) {    
    try {
        // Datos del cocumento y el id 
        // Traigo el documento a editar
        let doc_id = 'category_list';
        //let input_id = $(element).attr('input_id');
        // Efecto y verificacion del tag
        let new_cat_val = $(element).val();
        // Selecciono las clases
        let class_item = $('.chips_item');
        // Me aseguro q sea un stringd
        let new_cat = String(new_cat_val);
        // Filtro si el input esta bacio
        if (new_cat != '') {
            // Me aseguro q sea un string
            let doc_id_s = String(doc_id);
            let doc = await L_catalog_db.get(doc_id_s);
            // Verigico q el item a agregar ya no este repetido
            const tag_index = doc.category_list.findIndex((element) => element == new_cat);
            // Si encuentra un duplicado devuelve el indice del array para mostrar en pantalla el error
            if (tag_index >= 0) {
                $(class_item[tag_index]).css("color", "red");
            }
            else {
                //si esta todo ok cargo el nuevo valor al final del array
                //Cargo el nuevo resultado al final del array con push
                const arr_number = doc.category_list.length - 1;
                console.log(arr_number);
                var new_item = {
                        id:arr_number,
                        value:new_cat
                }
                console.log(arr_number);
                console.log(new_item);
                const count = doc.category_list.push(new_item);
                //Envio los datos editados al documento
                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
                });
                if (response) {
                    //Imprimo el item en la pantalla 
                    $(element).prev('div').append('<div class="chips_item  s-card-cat pull-left" val_text="' + new_cat + '" > <a doc_id="' + doc._id + '" new_tag="' + new_cat + '"  input_id="tags" val_text="' + new_cat + '" href="#" onclick="dell_tag(this)"><span class="button material-icons text-s lh-n">  highlight_off</span> </a><span class="chips_text">' + new_cat + '</span></div>');
                    //limpio el imput 
                    $(element).val('');
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

// Traigo las categorias, 
async function get_all_tag(element) {
    try {
        //Datos del cocumento y el id
        let doc = await L_catalog_db.get('category_list');
        let cat_list = doc['category_id'];
        //var array = ws_module_array.ws_left_nav.m;
        //Hago una consulta al array de modulos con permisos y lo comparo con el que estaba en el link
        for (var i=0; i<cat_list.length; i++) { 
            //Si el nombre del modulo esta en el listado de permisos de
            $(element).children('option').html("<option value="+ cat_list[i].id+">"+cat_list[i].value +"</option>");
        }
    }catch (err) {
        console.log(err);
    }
}

// Elimino una Categoria
async function dell_cat(element) {
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

//Boton variables y las Renderizo
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

//Boton variables y las Renderizo
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

//Boton variables y las Renderizo
function catalog_dell_cat(element) {
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

// SUB CATEGORIAS
async function cat_edit_product(element) {

    try {
        //traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const variant_id = $(element).attr('variant_id');
        const input_id = $(element).attr('input_id');
        const new_value = $(element).val();

        var doc_id_s = String(doc_id);
        var doc = await L_catalog_db.get(doc_id_s);
        console.log('DOCUMENTO A EDITAR1');
        console.log(doc);

        if (variant_id) {
            var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
            const value = item[input_id]; //Traigo el ojeto especifico 
            value.value = new_value; //Edito el valor del value por el valor nuevo
            console.log('VARIANTE EDITADA 1');
            console.log(doc);
        } else {
            doc[input_id] = new_value;
            console.log('Descripcion EDITADA 2');
            console.log(doc);
        }

        if (doc) {
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// trae todos los datos del doc y los pega en la raiz
            });
            console.log('DOC DATA RESPONSE EDITADO 3');
            console.log(doc);
            console.log(response);
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
            console.log('DOC DATA RESPONSE EDITADO');
            console.log(doc);
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
}

/* Animacion botones selectores wich Editar producto */
/*
$("li.bg-color").click(function () {
    var bgColor = $(this).attr('bg-color');
    $("#bg-select-color").removeClass();
    $("#bg-select-color").addClass('btn ' + bgColor + ' line');
    $("#bg-select").val(bgColor);
    $("#bg-select-color").attr('bg-color', bgColor);
    // $("#bg-select-color").attr('bg-color').html(bgColor);
})
    .mouseout(function () {
        $("span", this).first().text("panorama_fish_eye");
        // $("p", this).last().text(++i);
    })
    .mouseover(function () {
        $("span", this).first().text("check_circle");
    });

*/


