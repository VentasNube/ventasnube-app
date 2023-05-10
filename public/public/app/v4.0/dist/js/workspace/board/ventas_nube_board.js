////----(1)----/////
// BOARD VISTA  CONFIGURO LOS PARAMETROS DEL MODULO Y LO ENVIO AL COMPILADOR
function get_board_module(search_m_input, m_id) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var pacht = 'board'; //CONTROLADOR PRINCIPAL
    var controler_data = 'board_m_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'board_m_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#content_compiled'; // ID DE COMPILACION //  
    var data = {
        m_id: 1,
        //  search_m_input: search_m_input,
    }
    console.log(data);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};


function get_board_group(m_id, m_t_id) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;

    //  var pacht = url_now.pacht_m_url; //CONTROLADOR PRINCIPAL
    //var controler_m = url_now.pacht_m_url;
    //alert(controler_m);
    //  var controler_data = pacht + '_group_data'; //NOMBRE DE CONTROLADOR DATA
    //  var controler_template = pacht+'_group_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var pacht = 'board'; //CONTROLADOR PRINCIPAL
    var controler_data = 'board_group_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'board_group_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#content_board_group_compiled'; // ID DE COMPILACION //  
    var data = {
        m_id: m_id,
        m_t_id: m_t_id,
        //  search_m_input: search_m_input,
    }
    console.log(data);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};

///----(Search function)-----/
function get_search_board_items(search_m_input, m_id) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var pacht = 'search'; //CONTROLADOR PRINCIPAL
    var controler_data = 'search_card_product_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'search_card_product_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#card_product_result_items'; // ID DE COMPILACION //  
    var data = {
        m_id: m_id,
        search_m_input: search_m_input,
    }
    console.log(data);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};

function scrollerMove() {
    var ventana_ancho = $(window).width();
    var leftPos = $('#scroller').scrollLeft();
    if (ventana_ancho >= 600) {
        var scroll_px = 350;
    } else {
        var scroll_px = 150;
    }
    if (leftPos >= 0) {
        $("#move-left").hide();
    } else {
        $("#move-left").show();
    }
    $("#move-left").click(function () {
        var leftPos = $('#scroller').scrollLeft();
        if (leftPos >= 0) {
            $("#move-right").show();
        } else {
            $("#move-right").hide();
        }
        $("#scroller").animate({
            scrollLeft: leftPos - scroll_px
        }, 200);
    });
    $("#move-right").click(function () {
        var leftPos = $('#scroller').scrollLeft();
        if (leftPos < 0) {
            $("#move-left").hide();
        } else {
            $("#move-left").show();
        }
        $("#scroller").animate({
            scrollLeft: leftPos + scroll_px
        }, 200);
    });
};




//Creo y conecto con userDB local 
board_db = new PouchDB(u_db, { skip_setup: true });

//getSession();

board_db.sync(url_R_db + userDb, {
    live: true,
    retry: true,
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
    if (err) {
        $('#cloud_sync_icon').html("<i class='material-icons'> sync_problem</i>");
        //   document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons'> sync_problem</i>"
        //logout()
        var msj_error = "Hay un error inesperado";
        if (err.status === 401) {
            msj_error = '<i class="material-icons"> sync_problem</i> Tu sesion a expirado...';
        }
        if (err.status != 401) {
            msj_error = err.name;
        }
        //Imprimo el Mensaje de error en pantalla
        $('#master_modal').modal('show', function (event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            // var recipient = button.data('whatever') // Extract info from data-* attributes
            var recipient = 'Tu sesion expiro'; // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this)
            modal.find('.modal-title').text(recipient)
            // modal.find('.modal-body input').val(recipient)
            modal.find('.modal-body').html("<button type='button' onclick='logout()' class='btn xl btn-secondary '>Login</button>");
        });
        Snackbar.show({
            text: msj_error,
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Ingresar',
            actionTextColor: "#4CAF50",
            onActionClick: function (element) {     //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
                logout()
            }
        });

    }
});


///// BOARDS 2023 NEW FUNCTIONS ////
///FUNCIONES BOARD 2023

// TRAIGO LA BARRA DE BUSQUEDA
function get_nav_board(ws_info, ws_lang_data) {
    var ws_catalog_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/nav_bar.hbs', '#nav_bar_compiled', ws_catalog_data);
    //alert('cargo el bucador');
    // $('#cart_user_input').focus();
    console.log('NAV BAR CATALOG');
};
// TRAIGO LAS ORDENES DEL BOARD
function get_items_board(ws_id) {
    var ws_catalog = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/card_order.hbs', '#content_catalog_commpiled', ws_catalog);
    // $('#cart_user_input').focus();
    //console.log('GET ITEMS CATALOG');
}

// TARJETAS DE ORDENES
//Tomo el array documents y los busco el input con fuse.js y compilo la vista de los productos 
function print_board_item(new_items) {
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
async function search_board_item(search_val) {
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

// FUNCION PARA ARMAR LA VISTA DE EDITAR UNA ORDEN 
async function board_view_item(element) {
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
async function board_view_item_url(m_id, m_var_id) {
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


///// BOARDS 2023 NEW FUNCTIONS ////
///FUNCIONES BOARD 2023
//scrollerMove();
//get_board_module();