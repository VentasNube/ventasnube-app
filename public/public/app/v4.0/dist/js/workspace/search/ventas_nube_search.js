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


//###--- Conection y Sync a la base de datos local ---#####
var ws_search_db = 'ws_collections_' + ws_id;
//var ws_info = null;
//var ws_lang_data = null;
//Creo la base de datos local info_db
L_search_db = new PouchDB(ws_search_db, { skip_setup: true });
//sincronizo
//Creo y conecto con userDB local 
L_search_db.sync(url_R_db+ws_search_db, {
    live: true,
    retry: true,
  //  skip_setup: true
}).on('change', function (change) {
    $('#cloud_sync_icon').html("<i class='material-icons material-icon-spinner'> sync</i>");
  //  document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons material-icon-spinner'> sync</i>";
  }).on('paused', function (info) {
    $('#cloud_sync_icon').html("<i class='material-icons'> cloud_sync</i>");
   // document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons'> cloud_sync</i>";
  }).on('active', function (info) {
    $('#cloud_sync_icon').html("<i class='material-icons'> cloud_sync</i>");
  //  document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons'> cloud_sync</i>";
  }).on('error', function (err) {
    $('#cloud_sync_icon').html("<i class='material-icons'> sync_problem</i>");
 //   document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons'> sync_problem</i>";
  });

async function search_db() {
    try {
            price_doc = await L_search_db.get('price_list', { include_docs: true, descending: true });
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
function get_search_module(ws_info, ws_lang_data) {
    var ws_search_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user: user_data,

    }
    console.log('search ARRAYYY ');
    console.log(ws_search_data);
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/search/search_module.hbs', '#search_module_compiled', ws_search_data);
};

//TODO LOS ITEMS FILTRADOS DEL CART Y ARMO UN ARRA PARA ENVIAR A FUSE
function get_all_item_punchDb() {
    L_search_db.query('get/seach', {
        include_docs: false,
        descending: true
            // attachments: true,
            // startkey: data,
            // endkey: data + '\ufff0',
            //limit: 18,
            // key:data
            //inclusive_end:data
            // endkey: RegExp(data, 'i')
    }).then(function(result) {
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

//Tomo el array documents y los busco el input con fuse.js y compilo la vista de los productos 
function search_item_js(search_val) {
    var url_template = '/public/app/v4.0/dist/hbs/workspace/search/card_product.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#card_product_result_items'; // ID DE COMPILACION // 
    var result = fuse.search(search_val, { limit: 18 });
    //Armo el array para renderizar los items
    var search_result = {
        search_product: result,
        price_list: price_doc.price_list
    }

    if (result.length > 0) {
        renderHandlebarsTemplate(url_template, id_copiled, search_result);
        //  console.log('search_item');
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
    let url_template = '/public/app/v4.0/dist/hbs/workspace/search/card_product_variant.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
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
function variations_select(element) {
    event.preventDefault();
    let product_id = $(element).attr('product_id'); //Id del producto selccionado
    let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
    let url_template = '/public/app/v4.0/dist/hbs/workspace/search/card_product_var_select.hbs'; //NOMBRE CONTROLADOR TEMPLATE      
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
function card_edit_variant() {

}

//Inicio las funciones
search_db();