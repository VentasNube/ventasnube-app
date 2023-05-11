

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
    // console.log('NAV BAR BOARD');
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

var all_items_array = {};
var search_fuse = null;

// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_all_board_intems(ws_id, filter) {
    // Traigo los resultados de una vista
    let response = await L_board_db.query(
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
function get_nav_board(ws_info, ws_lang_data) {
    var ws_catalog_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/nav_bar.hbs', '#nav_bar_compiled', ws_catalog_data);
    //alert('cargo el bucador');
    // $('#cart_user_input').focus();
    // console.log('NAV BAR BOARD');
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


////----( VISTA BOARD GROUP   )----/////
function get_board_groupOLD(m_id, m_t_id) {
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
    //get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};

async function get_board_group(ws_id) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/board_group.hbs', '#content_board_group_compiled', ws_cart);
}

// TRAIGO EL BOARD Y IMPRIMO
async function get_board(ws_id) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/board.hbs', '#content_compiled', ws_cart);
    get_nav_board();
    get_board_group();
}

// FUNCION QUE CREA LA VISTA TOMANDO LOS PARAMETROS DEL LA URL
async function board_view_item_url() {
    try {
        get_board(ws_id);
    } catch (err) {
        console.log(err);
    }
}

/////BOARDS 2023 NEW FUNCTIONS ////
///FUNCIONES BOARD 2023

///OLD FUNCTIONS PARA COMPROBAR
////CONTRUCTO DE DIV CONTENDOR DE LOS BOARD GROUP, TOMA CONFIGURA EL With DE .board-group
function get_board_group_size() {
    var board_group_size = $('.board-group').width(); //Tomo el ancho total del div contenedor
    var board_column_size = $('.board-column').first('.board-group').width();//Tomo el ancho de los grupos de ordenes
    var number_column = $('.board-column').length;//Tomo la cantidad de grupos que hay
    var colum_size = board_column_size + 20;
    var board_new_group_size = colum_size * number_column;
    $('.board-group').width(board_new_group_size);
    console.log(board_new_group_size);
    //  var divs = document.getElementsByClassName(".board-column").length;
    //  console.log("Hay " + divs + " Etapas");
    //  alert(board_new_group_size);
}
$(document).on('click', '#edit_board_group_btn', function (event) {
    //  alert('holaaaa');
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var m_s_id = $(this).attr('m_s_id'); //Trae modulo id

    // alert(m_s_id);
    var pacht = 'board'; //CONTROLADOR PRINCIPAL
    var controler_data = 'edit_board_group_template_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'edit_board_group_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#master_popup'; // ID DE COMPILACION //  
    var data = {
        m_id: m_id,
        m_t_id: m_t_id,
        m_s_id: m_s_id,
    }
    console.log(data);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
    $('#master_popup').modal('show');
});

function datetimePiker() {
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY/MM/DD HH:mm',
        //   format: 'DD/MM/YYYY HH:mm',
        // Y-m-d H:i:s
        lang: 'es',
        weekStart: 1,
        nowText: 'HOY',
        cancelText: 'CANCELAR',
        shortTime: true,
        nowButton: true,
        switchOnClick: true
    });
}

scrollerMove();
get_board_group_size()