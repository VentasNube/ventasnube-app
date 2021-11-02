//Funciones que pueden servir para Importar productos desde otra base de datos
// CARGO LOS PRODUCTOS DE SQL EN LA DB LOCAL y COUCHDB
function charge_all_docs_local(remote_items) {
    L_search_db.bulkDocs({ docs: remote_items },
        function(err, response) {
            // handle err or response
        });
}
all_items_array = {};
search_fuse = null;
// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_all_catalog_intems(ws_id, filter) {
    // Traigo los resultados de una vista
    let response = await L_search_db.query(
        'get/seach',  {
          include_docs: true,
          descending: true 
        }
     ); //Conceto con la vista de diseno
   if(response.rows){
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
   else{
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

/**** Nuevo catalogo ****/
//Cargo la variable catalog 

function get_nav_catalog(ws_info,ws_lang_data) {
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

////----()---/////
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
function  print_catalog_item(new_items) {
   var search_result = {
       search_product: new_items,
       price_list: price_doc.price_list
   }
   console.log(search_result);
   if (new_items.length > 0) {
       renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/card_product.hbs',  '#content_catalog_commpiled', search_result);
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
    let id_copiled = '#variant_' + product_id; // ID DE COMPILACION // 
    L_search_db.get(product_id, function(err, doc) {
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
    let id_copiled = '#card_id_' + product_id; // ID DE COMPILACION //
    //Busco el doc por id actualizado y hago la carga de datos
    L_search_db.get(product_id, function(err, doc) {
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
        console.log("var_doc");
        console.log(variant_array);
    });
}

//Efecto para mostrar el boton de etidar en la tarjetas
function cat_card_edit_variant() {

}

$(document).on('click', '.catalog_edit_item', function (event) {
    //$('#master_popup').modal('show');
    // get_catalog_new_item();
    //  catalog_edit_item()
    catalog_view_item(product_id)
    alert('catalog_edit_item()'+product_id);
});

$(document).on('click', '.catalog_new_item', function (event) {
       //  $('#master_popup').modal('show');
       // get_catalog_new_item();
       catalog_edit_item();
       alert('catalog_new_item');
});

$(document).on('click', '.view_item', function (element) {
        var product_id = $(this).attr('product_id');
        catalog_view_item(product_id);
});

async function  catalog_view_item(product_id) {
      try {
        var product_doc = await L_search_db.get(product_id);
            var product_doc_array = {
                product_doc: product_doc,
                price_list: price_doc.price_list,
                ws_lang_data: ws_lang_data,
            }
            renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_view_item.hbs',  '#right_main', product_doc_array);
            createCookie('left_nav_open_ws_' + ws_id, false), 30;
            $('#right_main').removeClass('move-right');
        } catch (err) {
        console.log(err);
      }
}

function  catalog_edit_item(product_id, product_rev) {
    var product_data_doc = null;
    var product_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        product_data:product_data_doc
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_edit_item.hbs',  '#right_main_compiled', product_data);
}

function  catalog_new_item() {
    //  var result = fuse.search(search_val, { limit: 18 });
    //Armo el array para renderizar los items
    ///// IMPRIME ////
    user_db.get('product_',function(err, doc) {
        if (err) {msj_alert(err); }
        user_db.put({
          _id: 'product_' + ws_id ,
          _rev: doc._rev,
          ws_left_nav: ws_left_nav
        }, function(err, response) {
           if(response) {
           // createCookie('ws_install-' + ws_id, true), 30;
           }
          else if (err) {
            Snackbar.show({
                   text:  err.reason,
                   width: '475px',
                    actionTextColor: '#ff0000',
                    actionText: 'Refrezcar',
                    pos: 'bottom-center',
                   onActionClick: function(element) {
                       //Set opacity of element to 0 to close Snackbar
                       $(element).css('opacity', 0);
                       location.reload();
                       //newWorker.postMessage({ action: 'install' });
                       //alert('Refrezcar pagina!');
                   }
                });
            return console.log(err);
         }
        });
      });

    var product_data_doc = null;
    var product_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        product_data:product_data_doc
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_view_item.hbs',  '#right_main_compiled', product_data);
}

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
    search_catalog_item(search_val ,all_items_array)
});

function get_catalog(ws_id) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/catalog.hbs', '#content_compiled', ws_cart);
    get_nav_catalog();
    get_all_catalog_intems();
}
 