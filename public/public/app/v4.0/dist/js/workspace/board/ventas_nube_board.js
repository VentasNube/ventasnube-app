
//###--- Conection y Sync a la base de datos local ---#####
//ws_info = null; // Doc con la info y configuracion del Ws
//ws_lang_data = null; //Doc con el lenguaje

//###--- Conection y Sync a la base de datos local ---#####
var ws_board_db = 'ws_boards_' + ws_id;
//Creo la base de datos local info_db
L_board_db = new PouchDB(ws_board_db, { skip_setup: true });
//sincronizo
//Creo y conecto con userDB local 
L_board_db.sync(url_R_db + ws_board_db, {
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

//Traigo los documentos necesarios generales para BOARD
async function ws_board_config() {
    try {
        // userCtx variable global de permisos y roles para filtrar las vistas
        // DOC DE CONFIGURACION GENERAL
        ws_info = await L_catalog_db.get('ws_module_config', { include_docs: true, descending: true });
        // DOC DE NAVEGACION
        ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
        // Mapeo el contenido del objeto ws_left_nav M
        ws_left_nav_data = ws_left_nav['ws_left_nav'];
        // DOC DE LEGUAJE  DOCUMENTO DE LENGUAJE GUARDADO EN USER DB
        ws_lang_data_doc = await user_db.get('ws_lang_' + ws_id, { include_docs: true, descending: true });
        // Mapeo el objeto
        var ws_lang = ws_lang_data_doc;
        // SETEO EL ARRAY CON EL IDIOMA Con la variable
        // Recorro el objeto y busco el nombre ws_lang_es o ws_lang_us dependiendo lo que configuro el admin
        ws_lang_default = ws_lang['ws_land_default'];
        // Recorro el objeto con la confuracion seteada en el DOC lang por default
        ws_lang_data = ws_lang[ws_lang_default];
        // Envio los datos a la funciones y imprimo
        // Creo la variable userCtx apartir del doc left nav
        user_Ctx = ws_left_nav.userCtx;
        get_top_bar(ws_info, ws_lang_data, user_Ctx); // Imprimo el top bar
        get_left_nav(ws_left_nav, ws_lang_data, user_Ctx);// Traigo y imprimo el documento de navegacion lateral 
        // get_right_nav(ws_info, ws_lang_data); // Imprimo el cart
        get_right_cart(ws_info, ws_lang_data, user_Ctx);
        // get_nav_cart(ws_info, ws_lang_data);//Imprimo el cart
        get_search_module(ws_info, ws_lang_data, user_Ctx); // Imprimo el search 
        put_left_nav_doc() // Actualizo o envio la cokkie de navegacion lateral
        check_url_module(ws_left_nav, ws_lang_data, user_Ctx); // Chequeo y cargo el modulo segun la url actual y la cargo

    } catch (err) {
        put_left_nav_doc(); //Si hay un error vuelvo a traer el documento actualizado
        Snackbar.show({
            text: err.reason,
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-left',
            duration: 50000
        });
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

//FUNCION CREAR ORDEN NUEVA

//EDITAR BOARD
// CREAR BOARD GROUP

async function put_order_sell(doc) {
    try {
        console.log('Antes',doc);
        // Generar un ID único
        doc._id = 'sales_order_' + new Date().getTime() + Math.random().toString().slice(2);
        console.log('Despues',doc);
        // Crear un nuevo documento
        let response = await L_board_db.put(doc);
        console.log(response);
        console.log(doc._id);
    } catch (err) {
        console.log(err);
    }
}


async function new_order(ws_id) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/board_group.hbs', '#content_board_group_compiled', ws_cart);
}


async function put_order(doc) {
    try {
        // Crear un nuevo documento
        let response = await L_board_db.put(doc);
        console.log(response);
        console.log(doc._id);
    } catch (err) {
        console.log(err);
    }
}

// Recorrel el carrito y crea un array con los productos que hay
async function get_cart_product() {
    const productItems = document.querySelectorAll('#product_cart_items .s-card-actv-item');
    const products = [];
    for (const item of productItems) {
      const productImg = item.querySelector('.s-card-mini-img img').getAttribute('src');
      const productName = item.querySelector('.s-card-actv-item-name').textContent.trim();
      const priceText = item.querySelector('.s-card-actv-item-price-right small').textContent.trim();
      const quantity = parseInt(item.querySelector('.card_product_quantity').textContent.trim());

      const priceMatch = priceText.match(/\$(\d+(\.\d+)?)/);
      const price = priceMatch ? parseFloat(priceMatch[1]) : null;
  
      const taxMatch = item.querySelector('.s-card-actv-item-price-left').textContent.match(/IVA\(([^%]+)%\)/);
      const tax = taxMatch ? parseFloat(taxMatch[1]) : null;
  
      const discountMatch = item.querySelector('.s-card-actv-item-price-left').textContent.match(/Des:\(([^%]+)%\)=\(\$(-?\d+(\.\d+)?)\)/);

      const discount = discountMatch ? {
        percentage: parseFloat(discountMatch[1]),
        amount: parseFloat(discountMatch[2])
      } : null;
  
      const subtotal = price * quantity;
  
      const product = {
        product_id: productName,
        name: productName,
        variation_id: productName,
        product_img: productImg,
        price: price,
        tax: tax,
        quantity: quantity,
        discount: discount,
        subtotal: subtotal
      };
  
      products.push(product);
    }
    return products;
  }



/// SELECCIONO y GUARDO MARCA
async function  new_order(element) {

    const category_id = $(element).attr('category_id'); //Id del documento a edita
    const doc_id = category_id+'_order_' + new Date().getTime() + Math.random().toString().slice(2);
    const workspace_id = ws_id; //Id del documento a edita
    const group_id = '1'; //Id del documento a edita
    const entry_date = { hour, minutes } = await getDateTimeMinutes(); 
    const due_date = { hour, minutes } = await getDateTimeMinutes(); 
    const comments = 'Sin comentarios'; 
    try {
        const products = await get_cart_product();
        console.log(products); // Puedes hacer lo que desees con los datos, como almacenarlos en una variable
  

    const customer = {
                    id:'client_id_xxxx',
                    name: 'Customer Name',
                    address: 'Customer Address',
                    phone: 'Customer Phone',
                    email: 'Customer Email'
                     };

    //  var doc_id_s = String(doc_id); //Combierto el id del doc en un string
    var order_arr = {
        // _id: 'sales_order_001',
         _id: doc_id,
         type: 'order',
         category_id: category_id,
         workspace_id: workspace_id,
         status: 'new',
         seen:false,
         author: userCtx.email,
         group_id: 'group_123',
         order_id: '123',
         group_position: '1',
         comments: comments,
         priority: {
             id: '1',
             value: 'urgente'
         },
         entry_date: '2023-05-12',
         due_date: '2023-05-20',
         collaborators: [
             {
                 name: 'smartmobile.com.ar@gmail.com',
                 role: 'Rider'
             },
             {
                 name: 'Collaborator Name 2',
                 role: 'Collaborator Role 2'
             }
         ],
         total_service: 39.95,
         total_product: 39.95,
         total_tax: 39.95,
         total_discount: 39.95,
         total: 39.95,
         payment_history: [
             {
                 id: 123,
                 payment_id: '21312312',
                 payment_method: 'Credit Card',
                 update_datetime: '18/3/2021 18:45:10',
                 user: 'smartmobile.com@gmail.com',
                 total_tax: 21.00,
                 total_discount: 12.95,
                 total: 339.95,
                 currency: {
                     id: 'ARS',
                     value: '$'
                 }
             }
         ],
         update_history: [
             {
                 update_datetime: '18/3/2021 18:45:10',
                 user: 'smartmobile.com@gmail.com',
             },
             {
                 in_datetime: '18/3/2021 18:45:10',
                 update_datetime: '18/3/2021 18:45:10',
             }
         ],
         customer: customer,
         products: products,
         service: [
             {
                 product_id: 'Product 1',
                 name: 'Product 1',
                 variation_id: 'Product 1',
                 product_img: 'Product 1',
                 price: 10.99,
                 tax: 21.00,
                 quantity: 2,
                 discount: 10,
                 subtotal: 21.98
             },
             {
                 service_id: 'Service 2',
                 name: 'Service 2',
                 variation_id: '1',
                 product_img: 'http:.//',
                 price: 100.99,
                 tax: 21.00,
                 quantity: 2,
                 discount: 10,
                 subtotal: 210.98
             }
         ],
         shipping: {
             address: 'Shipping Address',
             city: 'Shipping City',
             postal_code: 'Postal Code',
             shipping_date: '2023-05-15',
             shipping_status: 'pending',
             carrier: {
                 name: 'Carrier Name',
                 phone: 'Carrier Phone',
                 vehicle: 'Carrier Vehicle'
             }
         }
     };
    // Generar un ID único 
   
    put_order(order_arr);
    console.log(order_arr);
   // catalog_edit_item_url(doc_id, 1);
} catch (error) {
    Snackbar.show({
        text:'Error al obtener los datos:', error,
        actionText: 'ok',
        actionTextColor: "#0575e6",
        pos: 'bottom-left',
        duration: 50000
    });
    console.error('Error al obtener los datos:', error);
}
}




