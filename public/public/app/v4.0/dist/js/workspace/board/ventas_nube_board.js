////// BOARDS MODULE 2023 ////////////

var ws_board_db = 'ws_boards_' + ws_id;
ws_left_nav_data = false;
ws_lang_data = false;
module_info = false;
columnGrids = [];  // Aquí se almacenarán todas las grillas

// CREO LA DB
L_board_db = new PouchDB(ws_board_db, { skip_setup: true });

//SYNCRONIZO LOS DATOS 
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

//COFIGURACION Y DOC NECESARIOS PARA TODOS LOS BOARDS
async function ws_board_config() {
    try {

        const parametroUrl = await getUrlVal('t');
        // alert(parametroUrl);
        var board_name = parametroUrl;
        module_info = await L_board_db.get('board_group_' + board_name);
        // userCtx variable global de permisos y roles para filtrar las vistas
        // DOC DE CONFIGURACION GENERAL
        // ws_info = await L_board_db.get('ws_module_config', { include_docs: true, descending: true });
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

/// Ordenes GET MAP REDUCE FILTRO POR TIPO
async function query_orders_change(orderType) {
    try {
        orderType = 'order'
        catergory_id = 'sell'
        const result = await L_board_db.query('get_orders/getOrders', {
            startkey: orderType,
            endkey: orderType + '\uffff',
            include_docs: true
        });
        const rows = result.rows;
        console.log('QUERY ORDERS rows.doc  rows.doc rows.doc ');
        console.log(rows.doc);
        console.log(result);
        rows.forEach(row => {
            console.log(row.doc);
        });
    } catch (err) {
        // Maneja cualquier error que pueda ocurrir
        console.error(err);
    }
}

async function query_orders(type, category_id) {
    try {

        const result = await L_board_db.changes({
            filter: 'get_orders/order_change_2',
            include_docs: true, // Incluye esta línea
            query_params: { type: type, category_id: category_id } //Envio los paramentros a filtrar 
        });

        const rows = result.rows;
        console.log('QUERRY ORDERR');
        console.log(result);
        if (rows) {
            rows.forEach(row => {
                console.log('QUERRY ORDERR');
                console.log(result);
                console.log(row.doc);
            });
        } else {
            console.log('rows is undefined');
        }

    } catch (err) {
        console.error(err);
    }
}



// TRAIGO LA BARRA DE BUSQUEDA
function get_nav_board(module_info) {

    /*  var ws_board_data = {
          module_info: module_info,
          ws_lang_data: ws_lang_data,
          ws_left_nav_data: ws_left_nav_data,
          user_roles: user_Ctx.userCtx.roles
      }*/
    console.log('module_info module_info module_info module_info');
    console.log(module_info);
    // console.log(ws_catalog_data);
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/nav_bar.hbs', '#nav_bar_compiled', module_info);
};

// ADAPTO LA PANTALLA A LO ANCHO DEL NAVEGADOR O CREO UN SCROlL
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

// DATE TIME PICKER
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
//get_board_group_size()
ws_board_config();
/// FUNCIONES NEW 2023

// CREAR NUEVO TABLERO 2023
// NEW BOARD POPUP START
async function new_board_star_intro(board_type_name) {
    try {
        const modal = document.getElementById('master_popup');
        $(modal).modal('show');
        var data = {
            board_type_name: board_type_name,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/popup/new_board.hbs', '#master_popup', data);
    } catch (err) {
        Snackbar.show({
            text: error.message,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });
    }
}

// TRAIGO EL BOARD Y IMPRIMO
async function get_board(board_name, board_type_name) {
    let parametroUrl;
    try {
        if (!board_type_name) {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('t')) {
                parametroUrl = urlParams.get('t');
            } else {
                $('#master_popup').modal('hide');
                // Manejar el caso en el que el parámetro 't' no está presente en la URL
                // Puedes mostrar un mensaje de error o tomar alguna otra acción apropiada
                return;
            }
        } else {
            parametroUrl = board_type_name;
        }
        const board_group_conf = await L_board_db.get('board_group_' + parametroUrl);
        const board_group = board_group_conf.board_group;
        const board_data = {
            module_info: board_group_conf,
            board_type_name: board_group_conf.name,
            ws_lang_data: ws_lang_data,
            ws_left_nav_data: ws_left_nav_data,
            user_roles: user_Ctx.userCtx.roles,
        };
        await renderHandlebarsTemplatePromise('/public/app/v4.0/dist/hbs/workspace/board/board.hbs', '#content_compiled', board_data);
        await get_nav_board(board_data);
        await get_board_group(board_group);

       /* renderHandlebarsTemplatePromise('/public/app/v4.0/dist/hbs/workspace/board/board.hbs', '#content_compiled', board_data)
        .then(() => {
            board_start_muuri(columnGrids);
            resolve();
        })
        .catch(error => reject(error));
       */
       // paginate_orders(L_board_db);
    
        //  query_orders('board', board_type_name);

    } catch (error) {
        new_board_star_intro(parametroUrl || board_type_name);

        if (error.name !== 'not_found') {
            new_board_star_intro(parametroUrl || board_type_name);
            throw error;
        } else if (error.name === 'deleted') {
            new_board_star_intro(parametroUrl || board_type_name);
            throw error;
        }
    }
}

// PUT NUEVO BOARD 
async function put_new_board(board_name, data) {
    try {
        //  const currentDateTime = new Date().toLocaleString('es-ES');
        const docId = 'board_group_' + board_name; // Generar un ID único
        let doc = {};
        var board_name
        if (board_name == 'sell') {
            var board_group = [
                {
                    "id": "1",
                    "name": 'Nuevas pedidos',
                    "color": "bg-green"
                },
                {
                    "id": "2",
                    "name": 'Presupuestos',
                    "color": "bg-red"
                },
                {
                    "id": "3",
                    "name": 'Aceptados',
                    "color": "bg-red"
                },
                {
                    "id": "4",
                    "name": 'Finalizados',
                    "color": "bg-green"
                }
            ]
        } else if (board_name == 'purcharse') {
            var board_group = [
                {
                    "id": "1",
                    "name": 'Nuevas compras',
                    "color": "bg-green"
                },
                {
                    "id": "2",
                    "name": 'Pedidos',
                    "color": "bg-red"
                },
                {
                    "id": "3",
                    "name": 'Finalizados',
                    "color": "bg-green"
                }
            ]
        } else if (board_name == 'service_order') {
            var board_group = [
                {
                    "id": "1",
                    "name": 'Presupuestar',
                    "color": "bg-green"
                },
                {
                    "id": "2",
                    "name": 'Presupuestados',
                    "color": "bg-yellow"
                },
                {
                    "id": "3",
                    "name": 'Aceptados',
                    "color": "bg-green"
                },
                {
                    "id": "4",
                    "name": 'En curso',
                    "color": "bg-purple"
                },
                {
                    "id": "5",
                    "name": 'Finalizados',
                    "color": "bg-blue"
                }
            ]
        } else if (board_name == 'service_turn') {
            var board_group = [
                {
                    "id": "1",
                    "name": 'Nuevos',
                    "color": "bg-green"
                },
                {
                    "id": "2",
                    "name": 'Asignados',
                    "color": "bg-red"
                },
                {
                    "id": "3",
                    "name": 'Para hoy',
                    "color": "bg-green"
                },
                {
                    "id": "4",
                    "name": 'Finalizados',
                    "color": "bg-green"
                }
            ]
        }
        try {
            doc = await L_board_db.get(docId); // Verificar si el documento ya existe
        } catch (error) {
            if (error.name !== 'not_found') {
                throw error;
            }
        }
        // Aquí puedes actualizar o modificar los datos del documento "doc" si es necesario
        let response;
        new_doc = {
            "_id": docId,
            "category_id": board_name,
            "workspace_id": ws_id,
            "status": "active",
            data,
            board_group
        }
        if (doc._rev) {
            // El documento ya existe, así que se debe actualizar
            new_doc._rev = doc._rev;
            response = await L_board_db.put(new_doc); // Actualizar el documento existente
        } else {
            // El documento no existe, así que se debe crear uno nuevo
            response = await L_board_db.put(new_doc); // Crear un nuevo documento
        }

        // Mostrar mensaje en un snackbar
        Snackbar.show({
            text: 'Se creo el board con exito!',
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 5000
        });
    } catch (error) {
        // Mostrar mensaje de error en un snackbar
        Snackbar.show({
            text: error.message,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });
    }
}

/// BOTON NEXT NEW BOARD
async function btn_next_new_board(board_name, data) {
    //VALORES SELECCIONADOS DEL FOMULARIO    
    //STEP 1
    var board_type = $('input:radio[name=board-type]:checked').val();
    // var board_name = $('input[name=board-name]').val();
    var board_name = $('.new_board_name').html();
    // alert(board_name);
    var board_icon = $("#bt-text-icon").children(':first').text();
    var board_color = $("#bg-select-color").attr('bg-color');
    // STEP 2   
    // BOARD
    var board_mode = board_type;
    var board_collect_and_close = $('input:radio[name=board_collect_and_close]:checked').val();
    var board_collect_and_deliver = $('input:radio[name=board_collect_and_deliver]:checked').val();
    var board_delivery_place = $('input:radio[name=board_delivery_place]:checked').val();
    // BOX
    var board_control_cash_close_box = $('input:radio[name=board_control_cash_close_box]:checked').val();
    var board_control_stock = $('input:radio[name=board_control_stock]:checked').val();
    var board_control_cash = $('input:radio[name=board_control_cash]:checked').val();
    // STEP 3
    // Documentos facturas
    var board_receipt_voucher = $('input[name=or_board_receipt_vouche]').val();
    var board_payment_voucher = $('input[name=or_board_payment_voucher]').val();
    var board_delivery_voucher = $('input[name=or_board_delivery_voucher]').val();
    var board_credit_voucher = $('input[name=or_board_credit_voucher]').val();
    var board_return_voucher = $('input[name=or_board_return_voucher]').val();

    var step = $("#btn-previus").attr('step');
    // console.log(board_type + board_name + board_icon + board_color + step);
    if (board_type != null || board_name != null || board_icon != null || board_color != null) {
        //alert(step);
        if (step == 1) {
            $("#btn-next").text('Continuar');
            $("#btn-previus").attr('step', '2');
            $("#btn-previus").text('Volver');
            $(".btn-previus").removeAttr('data-dismiss');
            $(".btn-previus").removeAttr('aria-label');
            $("#step-1").hide();
            $("#step-2").show();
        } else if (step == 2) {
            $("#btn-previus").attr('step', '3');
            $("#btn-next").text('Finalizar');
            $("#step-2").hide();
            $("#step-3").show();

        }

        else if (step == 3) {
            $("#btn-previus").attr('step', '3');
            $("#btn-next").text('Crear');
            $("#step-2").hide();
            $("#step-3").show();

            //var url_now = getUrl();
            // var m_id = url_now.m_id;
            //var m_t_id = url_now.m_t_id;
            //  var pacht = 'board'; //CONTROLADOR PRINCIPAL
            //  var controler_data = 'new_board_data_post'; //NOMBRE DE CONTROLADOR DATA
            // var controler_template = 'new_board_template'; //NOMBRE CONTROLADOR TEMPLATE      
            var id_copiled = '#master_popup'; // ID DE COMPILACION //  
            var data = {
                //STEP 1
                // m_id: m_id,
                m_t_type_action: board_type,
                m_t_name: board_name,
                m_t_icon: board_icon,
                m_t_color: board_color,
                m_t_url: board_name,
                //  STEP 2
                //BOARD
                board_mode: board_mode,
                board_collect_and_close: board_collect_and_close,
                board_collect_and_deliver: board_collect_and_deliver,
                board_delivery_place: board_delivery_place,
                //BOX
                board_control_cash_close_box: board_control_cash_close_box,
                board_control_stock: board_control_stock,
                board_control_cash: board_control_cash,
                // STEP 3
                board_receipt_voucher: board_receipt_voucher,
                board_payment_voucher: board_payment_voucher,
                board_delivery_voucher: board_delivery_voucher,
                board_credit_voucher: board_credit_voucher,
                board_return_voucher: board_return_voucher,
            };
            put_new_board(board_type, data);
            $('#master_popup').modal('hide');
            Snackbar.show({
                text: 'Se creo el' + board_name + ' tablero con exito!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
        }
        else {
            Snackbar.show({
                text: 'Falta completar los datos',
                actionText: 'Falta completar',
                actionTextColor: "#0575e6",
            });
        }
    };
};


async function new_group_order(element) {

    const category_id = $(element).attr('category_id'); //Id del documento a edita
    const doc_id = category_id + '_order_' + new Date().getTime() + Math.random().toString().slice(2);
    const workspace_id = ws_id; //Id del documento a edita
    const group_id = '1'; //Id del documento a edita
    const entry_date = { hour, minutes } = await getDateTimeMinutes();
    const due_date = { hour, minutes } = await getDateTimeMinutes();
    const comments = 'Sin comentarios';


    var board_type = $('input:radio[name=board-type]:checked').val();
    var board_name = $('input[name=board-name]').val();
    var board_icon = $("#bt-text-icon").children(':first').text();
    var board_color = $("#bg-select-color").attr('bg-color');

    var url_now = getUrl();
    var m_id = url_now.m_id;
    //var m_t_id = url_now.m_t_id;
    var pacht = 'board'; //CONTROLADOR PRINCIPAL
    var controler_data = 'new_board_data_post'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'new_board_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#master_popup'; // ID DE COMPILACION //  
    var data = {
        m_id: m_id,
        m_t_type_action: board_type,
        m_t_name: board_name,
        m_t_icon: board_icon,
        m_t_color: board_color,
        m_t_url: board_name,
        //  m_position: m_position,
        /* or_board_finality:or_board_finality,
         or_board_type:or_board_type,
         or_board_color:or_board_color,
         or_board_icon:or_board_icon,
        */
        //  or_board_mode:or_board_mode,
        //  or_board_delivery_place:or_board_delivery_place,
        //  or_board_collect_and_deliver:or_board_collect_and_deliver,
    }
    console.log(data);

    try {
        const products = await get_cart_product();
        console.log(products); // Puedes hacer lo que desees con los datos, como almacenarlos en una variable

        //  var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var new_board_doc = {
            // _id: 'sales_order_001',
            _id: doc_id,
            type: 'order',
            category_id: category_id,
            workspace_id: workspace_id,
            seen: false,
            author: userCtx.email,
            group_id: 'group_123',
            order_id: '123',
            group_position: '1',
            comments: comments,
            print: {
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
            },
            stock_control_conf: {
                address: 'Shipping Address',
                city: 'Shipping City',

            },

            create_order_conf: {
                address: 'Shipping Address',
                city: 'Shipping City',

            },


            shipping: {
                address: 'Shipping Address',
                city: 'Shipping City',

            },
            collaborators: [
                {
                    id: 'smartmobile.com.ar@gmail.com',
                    name: 'mariano',
                    role: 'Rider'

                },
                {
                    id: 'distripack@gmail.com',
                    name: 'Federico',
                    role: 'Rider'

                }

            ],
            payment_config: [
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
        };
        // Generar un ID único 

        new_board_put(new_board_doc);
        console.log(order_arr);
        // catalog_edit_item_url(doc_id, 1);
    } catch (error) {
        Snackbar.show({
            text: 'Error al obtener los datos:', error,
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-left',
            duration: 50000
        });
        console.error('Error al obtener los datos:', error);
    }
}

async function new_board_put(doc) {
    try {
        console.log('Antes', doc);
        // Generar un ID único
        doc._id = 'ws_order_group' + new Date().getTime() + Math.random().toString().slice(2);
        console.log('Despues', doc);
        // Crear un nuevo documento
        let response = await L_board_db.put(doc);
        console.log(response);
        console.log(doc._id);
    } catch (err) {
        console.log(err);
    }
}

//EDITAR GROUP POPUP
// NEW BOARD POPUP START
async function new_board_group(element, board_type_name) {
    try {
        const modal = document.getElementById('master_popup');
        const group_id = $(element).attr('group_id'); //Id del documento a edita
        const parametroUrl = await getUrlVal('t');
        var board_name = board_name;
        var board_type_name = parametroUrl;
        var board_group_conf = await L_board_db.get('board_group_' + board_type_name);
        var board_group = board_group_conf.board_group;

        const selected_group = board_group.find(group => group.id === group_id);

        const data = {
            board_group: selected_group,
            group_id: group_id,
            board_type_name: board_type_name,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles
        }
        $(modal).modal('show');
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/popup/new_group.hbs', '#master_popup', data);
    }
    catch (err) {
        console.log(err);
        Snackbar.show({
            text: err.name,
            actionText: 'Ok',
            actionTextColor: "#0575e6",
        });
    }
}

// EDIT BOARD GROUP EDITO
async function new_board_group_put(element) {
    try {
        const parametroUrl = await getUrlVal('t');
        const board_name = $(element).attr('board_name');
        //const group_id = $(element).attr('group_id');

        const group_id = new Date().getTime() + Math.random().toString().slice(2);

        const board_type_name = parametroUrl;
        const board_group_name = $('input[name=board_group_name]').val();
        const board_group_color = $("#bg-select-color-group").attr('bg-color');
        const board_group_web_acept = $('input:checkbox[name=board_group_web_acept]:checked').val();
        const board_group_stock = $('input:checkbox[name=board_group_stock]:checked').val();
        const board_group_sell = $('input:checkbox[name=board_group_sell]:checked').val();
        const board_group_deliver = $('input:checkbox[name=board_group_deliver]:checked').val();

        if (board_group_name != null) {
            const docId = 'board_group_' + board_name;
            const doc = await L_board_db.get(docId);
            const board_group = doc.board_group || []; // Si el array no existe, crear uno vacío
            const newGroup = {
                id: group_id,
                name: board_group_name,
                color: board_group_color,
                web_acept: board_group_web_acept,
                stock: board_group_stock,
                sell: board_group_sell,
                deliver: board_group_deliver
            };
            board_group.push(newGroup); // Agregar el nuevo objeto al array
            doc.board_group = board_group;
            const response = await L_board_db.put(doc);
            get_board(board_name, board_type_name);
            $('#master_popup').modal('hide');
            Snackbar.show({
                text: 'Se creó la sección del tablero con éxito!',
                actionText: 'Ok',
                actionTextColor: "#0575e6",
            });
        } else {
            Snackbar.show({
                text: 'Falta completar el nombre',
                actionText: 'Falta completar',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
        Snackbar.show({
            text: err.name,
            actionText: 'Ok',
            actionTextColor: "#0575e6",
        });
    }
}

async function delete_board_group(element, board_type_name) {
    try {
        const modal = document.getElementById('master_popup');
        const group_id = $(element).attr('group_id');
        const board_name = $(element).attr('board_name');
        // const parametroUrl = await getUrlVal('t');
        //const board_type_name = parametroUrl;
        const board_group_conf = await L_board_db.get('board_group_' + board_name);
        const board_group = board_group_conf.board_group;
        // const selected_group = board_group.find(group => group.id === group_id);

        Snackbar.show({
            text: '¿Estás seguro de que deseas eliminar esta etapa?',
            actionText: 'Confirmar',
            actionTextColor: "#0575e6",
            onActionClick: async () => {
                const updated_board_group = board_group.filter(group => group.id !== group_id);
                board_group_conf.board_group = updated_board_group;
                const response = await L_board_db.put(board_group_conf);
                if (response.ok) {
                    get_board(board_name, board_type_name);
                    $('#master_popup').modal('hide');
                    Snackbar.show({
                        text: 'Etapa eliminada con éxito',
                        actionText: 'Ok',
                        actionTextColor: "#0575e6",
                    });
                } else {
                    Snackbar.show({
                        text: 'Error al actualizar el documento',
                        actionText: 'Ok',
                        actionTextColor: "#0575e6",
                    });
                }
            }
        });
    } catch (err) {
        console.log(err);
        Snackbar.show({
            text: err.name,
            actionText: 'Ok',
            actionTextColor: "#0575e6",
        });
    }
}

// EDIT BOARD GROUP POPUP
async function board_edit_group(element, board_type_name) {
    try {
        const modal = document.getElementById('master_popup');
        const group_id = $(element).attr('group_id'); //Id del documento a edita
        const parametroUrl = await getUrlVal('t');
        var board_name = board_name;
        var board_type_name = parametroUrl;
        var board_group_conf = await L_board_db.get('board_group_' + board_type_name);
        var board_group = board_group_conf.board_group;
        const selected_group = board_group.find(group => group.id === group_id);
        const data = {
            board_group: selected_group,
            group_id: group_id,
            board_type_name: board_type_name,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles
        }
        $(modal).modal('show');
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/popup/edit_group.hbs', '#master_popup', data);
    } catch (err) {
        console.log(err);
    }
}
// EDIT BOARD GROUP EDITO
async function edit_board_group_put(element) {
    try {
        var board_name = $(element).attr('board_name'); //Id del documento a edita
        // var board_group_id = $(element).attr('group_id'); //Id del documento a edita
        const parametroUrl = await getUrlVal('t');
        var board_name = board_name;


        const docId = 'board_group_' + board_name; // Generar un ID único
        const doc = await L_board_db.get(docId); // Verificar si el documento ya existe

        const group_id = $(element).attr('group_id'); //Id del documento a edita

        var board_type_name = parametroUrl;
        // Valores seleccionados del formulario
        const board_group_name = $('input[name=board_group_name]').val();
        const board_group_color = $("#bg-select-color-group").attr('bg-color');
        const board_group_web_acept = $('input:checkbox[name=board_group_web_acept]:checked').val();
        const board_group_stock = $('input:checkbox[name=board_group_stock]:checked').val();
        const board_group_sell = $('input:checkbox[name=board_group_sell]:checked').val();
        const board_group_deliver = $('input:checkbox[name=board_group_deliver]:checked').val();
        // const m_s_id = $(this).attr('m_s_id');

        if (board_group_name != null) {
            const board_group = doc.board_group;
            const selected_group = board_group.find(group => group.id === group_id);

            if (selected_group) {
                selected_group.name = board_group_name;
                selected_group.color = board_group_color;
                selected_group.web_acept = board_group_web_acept;
                selected_group.stock = board_group_stock;
                selected_group.sell = board_group_sell;
                selected_group.deliver = board_group_deliver;

            }

            doc._rev = doc._rev;
            const response = await L_board_db.put(doc); // Actualizar el documento existente

            get_board(board_name, board_type_name);
            $('#master_popup').modal('hide');
            Snackbar.show({
                text: 'Se editó la sección del tablero con éxito!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
        } else {
            Snackbar.show({
                text: 'Falta completar el nombre',
                actionText: 'Falta completar',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
        Snackbar.show({
            text: err.name,
            actionText: 'Ok',
            actionTextColor: "#0575e6",
        });
    }
}

///NUEVAS ORDENES 2023
// CREAR NUEVA ORDEN EN LA DB
/// NEW ORDER CREO EL ARRAY COMPLETO DE LA ORDEN
async function new_order(element) {

    const category_id = $(element).attr('category_id'); //Id del documento a edita
    const doc_id = category_id + '_order_' + new Date().getTime() + Math.random().toString().slice(2);
    const workspace_id = ws_id; //Id del documento a edita
    // Comprobacion de datos de grupo 
    const board_group_conf = await L_board_db.get('board_group_' + category_id);
    const board_group = board_group_conf.board_group;

    const board_group_first = board_group[0]; // traigo el primer grupo de ordenes q esta disponible y guardo la id
    //  console.log(board_group_first)
    const group_id = board_group_first.id; //Id del documento a edita
    const entry_date = { hour, minutes } = await getDateTimeMinutes();
    const due_date = { hour, minutes } = await getDateTimeMinutes();
    const comments = 'Sin comentarios';
    try {
        const products = await get_cart_product();
        // console.log(products); // Puedes hacer lo que desees con los datos, como almacenarlos en una variable
        const customer = {
            id: 'client_id_xxxx',
            name: 'Customer Name',
            address: 'Customer Address',
            phone: 'Customer Phone',
            email: 'Customer Email'
        };
        var order_arr = {
            // _id: 'sales_order_001',
            _id: doc_id,
            type: 'order',
            category_id: category_id,
            workspace_id: workspace_id,
            status: 'new',
            seen: false,
            author: userCtx.email,
            group_id: group_id,
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
        let response = await L_board_db.put(order_arr); // Crear un nuevo documento
        if (response.ok) {
            console.log(response)
            Snackbar.show({
                text: 'Se creo la orden con exito!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 50000
            });
        }

    } catch (error) {
        Snackbar.show({
            text: 'Error al obtener los datos:', error,
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-left',
            duration: 50000
        });
        console.error('Error al obtener los datos:', error);
    }
}
/// BOARD TARJETAS TRAE LAS ORDENES




//// VARIABLES GLOBALES 
let nextStartkey = ['order', 'sell'];
let nextStartkeyDocid = null;
let isLoading = false;
var boardsInitialized = false;
var columnGrids = [];
let boardGrid;

/// DETECTA EL SCROLL INFINITO PARA TRAER LAS ORDENES CARDS

// Hago la query y pagino los resultados 
async function paginate_orders(L_board_db, startkey = ['order', 'sell'], startkey_docid = null) {
    const pageSize = 20;  // Número de resultados por página.

    const options = {
        startkey: startkey,
        startkey_docid: startkey_docid,
        limit: pageSize + 1,  // Se agrega 1 para saber si hay una siguiente página.
        include_docs: true,
        descending: false
    };

    const result = await L_board_db.query('order_view/by_type_and_category', options);

    if (result.rows.length > pageSize) {
        // Guarda la última clave y id de documento para la próxima página.
        const lastRow = result.rows[pageSize - 1];
        startkey = lastRow.key;
        startkey_docid = lastRow.id;
        // Elimina la última fila, ya que fue solo para verificar si hay una próxima página.
        result.rows.splice(pageSize, 1);
    } else {
        // No hay más páginas.
        startkey = null;
        startkey_docid = null;
    }

    // Retorna las filas y la próxima startkey y startkey_docid para la paginación.
    return {
        rows: result.rows,
        nextStartkey: startkey,
        nextStartkeyDocid: startkey_docid
    };
}

// Creo la instancia muuri con la carga del tablero
function board_start_muuri(columnGrids) {
    const itemContainers = Array.from(document.querySelectorAll('.board-column-content'));
    for (let i = 0; i < itemContainers.length; i++) {
        if (itemContainers[i]) {
            const muuriGrid = new Muuri(itemContainers[i], {
                items: '.item',
                layoutDuration: 400,
                layoutEasing: 'ease',
                dragEnabled: true,
                dragSort: () => columnGrids,
                dragReleaseDuration: 400,
                dragReleaseEasing: 'ease'
            });
            columnGrids.push(muuriGrid);
            // Si es la primera instancia de Muuri, también la guarda en boardGrid
            if (!boardGrid) {
                boardGrid = muuriGrid;
            }
            console.log(`Grid initialized for itemContainers[${i}]`);
        } else {
            console.error(`No DOM element found for itemContainers[${i}]`);
        
        }
    }
}

function get_board_group(board_group) {
    // ESTA FUNCION DEVUELVE UNA PROMESA CUANDO LA LLAMA CON AWAIT DEESDE UNA FUNCION ASYC QUE ESTA EN GET_BOARD, 
    // LA USO PARA QUE LA FUNCION CONSTRUCTORA QUE LE SIGUE ESPERE A QUE EL DOM SE ALLA CARGADO CON EXITO
    return new Promise((resolve, reject) => {
        var ws_board = {
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            board_group: board_group,
        }
        //VERIFICA Q EL DIB SE ALLA CARGADO AL DOM ANTES DE SEGUIR
       let parentElement = document.querySelector('#content_board_group_compiled');
        if (parentElement) {
            renderHandlebarsTemplatePromise('/public/app/v4.0/dist/hbs/workspace/board/board_group.hbs', '#content_board_group_compiled', ws_board)
                .then(() => {
                    board_start_muuri(columnGrids);
                    resolve();
                })
                .catch(error => reject(error));
        } else {
            console.error("No se encontró el elemento #content_board_group_compiled");
            reject(new Error("No se encontró el elemento #content_board_group_compiled"));
        }
    });
}

// Agrego la tarjeta al muuri
function add_new_item_muuri(newElement) {
        if (!boardGrid) {
          console.error('Board grid has not been initialized yet.');
          return;
        }
    //   const newElement = document.createElement('div');
       // newElement.className = 'board-item';
      //  newElement.textContent = itemContent;
        console.log('newElement');
        console.log(newElement);

        boardGrid.add(newElement);
        // Refresca la grilla y vuelve a organizarla
       // gridInstance.refreshItems(columnGrids).layout();
        boardGrid.refreshItems().layout();
        // Sincroniza el orden de los elementos en el DOM con el orden en la grilla de Muuri
        boardGrid.synchronize();
       // boardGrid.refreshItems().layout();
}

//AGREGO LA NUEVA TARJETA AL DOM
async function add_new_item_DOM(L_board_db, nextStartkey, nextStartkeyDocid, columnGrids) {
    const result = await paginate_orders(L_board_db, nextStartkey, nextStartkeyDocid);
    nextStartkey = result.nextStartkey;
    nextStartkeyDocid = result.nextStartkeyDocid;
    console.log(result);
    for (const row of result.rows) {
        const card_data = {
            doc: row.doc
        };
        // Obtiene el contenedor al que se quiere añadir la nueva tarjeta
        let containerSelector = '#board_card_group_compiled_' + row.doc.group_id;
        let parentElement = document.querySelector(containerSelector);
        // Renderiza la tarjeta.
        let newElement = await renderHandlebarsTemplateReturn('/public/app/v4.0/dist/hbs/workspace/board/card/card_order.hbs', card_data, parentElement);
        // Ya que renderHandlebarsTemplateReturn devuelve el nuevo elemento en un div,
        // se debe añadir el primerChild (la tarjeta) al grid de Muuri
        add_new_item_muuri(newElement.firstChild);
    }

    return {
        nextStartkey: nextStartkey,
        nextStartkeyDocid: nextStartkeyDocid
    };
}

// FUNCION Q CAPTURA EL MOVIMIENTO DEL SCROLL IN

window.onscroll = async function (){
    if (isLoading) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        isLoading = true;
        try {
            const result = await add_new_item_DOM(L_board_db, nextStartkey, nextStartkeyDocid, columnGrids);
            nextStartkey = result.nextStartkey;
            nextStartkeyDocid = result.nextStartkeyDocid;

            if (!nextStartkey) {
                window.onscroll = null;
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            isLoading = false;
        }
    }
};   




//AGREGO LA NUEVA TARJETA A MUURI
function add_new_item_muuriNO(columnGrids, containerSelector,newElement) {
    let containerElement = document.querySelector(containerSelector);
    if (!containerElement) {
        alert(`No DOM element found with selector: ${containerSelector}`)
        throw new Error(`No DOM element found with selector: ${containerSelector}`);
    }
    let gridInstance = columnGrids.find(grid => grid.getElement().isEqualNode(containerElement));
   // const dragStartData = new Map();
   // const dragContainer = document.querySelector('.drag-container');
    let boardGrid;
    //const itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));

    if (!gridInstance) {
        gridInstance = new Muuri(containerSelector, {
            layoutDuration: 400,
            layoutEasing: 'ease',
          //  itemPlaceholderClass: 'board-item-placeholder',
            items: '.board-item',
            dragEnabled: true,
         //   dragContainer: dragContainer,
            fillGaps: true,
            horizontal: false,
            alignRight: false,
            alignBottom: false,
            rounding: false,
            dragSort: function () {
                return columnGrids;
            },
            dragCssProps: {
                touchAction: 'auto',
                userSelect: 'none',
                userDrag: 'none',
                tapHighlightColor: 'rgba(0, 0, 0, 0)',
                touchCallout: 'none',
                contentZooming: 'none'
            }
        })/*
          .on('dragInit', function (item) {
                item.getElement().style.width = item.getWidth() + 'px';
                item.getElement().style.height = item.getHeight() + 'px';
            })
            .on('dragReleaseEnd', function (item) {
                item.getElement().style.width = '';
                item.getElement().style.height = '';
                item.getGrid().refreshItems([item]);
            })
            .on('layoutStart', function () {
                if (boardGrid) {
                    boardGrid.refreshItems().layout();
                }
            });

*/
            columnGrids.push(gridInstance);

    }
    // Actualiza el grid.
    gridInstance.add(newElement);
    // Refresca la grilla y vuelve a organizarla
   // gridInstance.refreshItems(columnGrids).layout();
    gridInstance.refreshItems().layout();
    // Sincroniza el orden de los elementos en el DOM con el orden en la grilla de Muuri
    gridInstance.synchronize();
   // board_start_muuri()
    // gridInstance.refreshItems().layout();
    //  alert('agregar Refresh layout');
}

////// CREAR ORDEN ///////
// CART PRODUCT RECORRO EL CART Y ARMO LA LISTA DE PRODUCTOS
async function get_cart_product() {
    const productItems = document.querySelectorAll('#product_cart_items .s-card-actv-item');

    const products = [];

    for (const item of productItems) {
        const productImg = item.querySelector('.s-card-mini-img img').getAttribute('src');
        const productName = item.querySelector('.s-card-actv-item-name').childNodes[0].nodeValue.trim();
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

////  FUNCION DE CHATGTP 2023 SIN PROBAR ES PARA ACTUALIZAR EL STOCK DE UN DOCUMENTO DESPUES DE UNA VENTA
/// (NO SE USA TODAVIA EXPERIMENTAL)

async function tryUpdate(doc, retryCount = 0) {
    const maxRetries = 5;
    try {
        await db.put(updateDoc(doc));
    } catch (err) {
        if (err.name === 'conflict') {
            if (retryCount < maxRetries) {
                let latestDoc = await db.get(doc._id);
                return await tryUpdate(latestDoc, retryCount + 1);
            } else {
                return Promise.reject('Max retries exceeded for document ' + doc._id);
            }
        } else {
            console.error('Unexpected error in tryUpdate:', err);
            return Promise.reject('Unexpected error updating document');
        }
    }
}

// Supongamos que tienes una función de actualización en tu componente que maneja la interfaz de usuario:
async function updateDocuments() {
    // Lee los documentos a actualizar
    let docs = await Promise.all(docIds.map(id => db.get(id)));

    // Intenta actualizar cada documento
    try {
        let results = await Promise.all(docs.map(doc => tryUpdate(doc)));
    } catch (err) {
        // Si alguna actualización falla, muestra el Snackbar aquí
        Snackbar.show({
            text: err,
            actionText: 'Retry',
            actionTextColor: "#0575e6",
            duration: Snackbar.LENGTH_INDEFINITE,
            action: () => { updateDocuments() }
        });
    }
}

/// (NO SE USA TODAVIA EXPERIMENTAL)


