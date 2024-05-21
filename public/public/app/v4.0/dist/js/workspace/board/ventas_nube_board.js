////// BOARDS MODULE 2023 ////////////


var ws_board_db = 'ws_boards_' + ws_id;

var board_group_info = null;
var ws_left_nav_data = null;
var ws_lang_data = null;
var module_info = null;
//// VARIABLES GLOBALES 

/// BOARD TARJETAS TRAE LAS ORDENES
var columnGrids = [];
var boardElements = null;
var boardGrid = null;
var muuri = null;
var nextStartkey = ['open', 'order', 'sell'];
var nextStartkeyDocid = null;
var isLoading = false;
var boardsInitialized = false;
var isFetching = false; // Este es el semáforo o el bloqueo.
var totalDocs = null;

/*var nextStartkey = ['order', 'sell'];
var nextStartkeyDocid = null;
var isLoading = false;
var boardsInitialized = false;
var columnGrids = [];
var boardElements =  null;
var boardGrid =  null;
*/

var ws_offline = true;

if (ws_offline) {
    url_db_board = ws_board_db;
    // const L_board_db = new PouchDB(ws_board_db, { skip_setup: true });
} else {
    url_db_board = url_R_db + ws_board_db;
    // const L_board_db = new PouchDB(url_R_db + ws_board_db, { skip_setup: true });
}
//console.log('ws_offline', url_db_board);

L_board_db = new PouchDB(ws_board_db, { skip_setup: true });
L_board_db.sync(url_R_db + ws_board_db, {
    live: true,
    retry: true,
    skip_setup: true
});

//creo la variable user_Ctx por si hay cambios en el codigo

//COFIGURACION Y DOC NECESARIOS PARA TODOS LOS BOARDS
async function ws_board_start() {
    try {

        board_name = readCookie('board-now-' + ws_id); // LEO LA COKIE PARA SABER EN Q MODULO ESTABA
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
        //   get_top_bar(ws_info, ws_lang_data, user_Ctx); // Imprimo el top bar
        //  get_left_nav(ws_left_nav, ws_lang_data, user_Ctx);// Traigo y imprimo el documento de navegacion lateral 
        // get_right_nav(ws_info, ws_lang_data); // Imprimo el cart
        //  get_right_cart(ws_info, ws_lang_data, user_Ctx);
        // get_nav_cart(ws_info, ws_lang_data);//Imprimo el cart
        //get_search_module(ws_info, ws_lang_data, user_Ctx); // Imprimo el search 
        //  put_left_nav_doc() // Actualizo o envio la cokkie de navegacion lateral
        // check_url_module(ws_left_nav, ws_lang_data, user_Ctx); // Chequeo y cargo el modulo segun la url actual y la cargo

    } catch (err) {
        // put_left_nav_doc(); //Si hay un error vuelvo a traer el documento actualizado
        console.log('ERROR BOARD START', err)
        Snackbar.show({
            text: err.reason,
            actionText: '<span class="material-icons">refresh</span> Refresh ',
            actionTextColor: "#0575e6",
            duration: Snackbar.LENGTH_INDEFINITE,
            action: () => { updateDocuments() }
        });
    }
}
/*
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
*/
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

/// CREAR NUEVO TABLERO 2023
/// NEW BOARD POPUP START
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
            text: err,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });
    }
}

/// PUT NUEVO BOARD 
async function put_new_board(board_name, data) {
    try {
        //  const currentDateTime = new Date().toLocaleString('es-ES');
        const docId = 'board_group_' + board_name; // Generar un ID único
        let doc = {};
        var board_name
        const group_id = 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2);
        //  const group_id = 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2);
        if (board_name == 'sell') {
            var board_group = [
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Nuevas pedidos',
                    "color": "bg-green"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Presupuestos',
                    "color": "bg-red"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Aceptados',
                    "color": "bg-red"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Finalizados',
                    "color": "bg-green"
                }
            ]
        } else if (board_name == 'purcharse') {
            var board_group = [
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Nuevas compras',
                    "color": "bg-green"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Pedidos',
                    "color": "bg-red"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Finalizados',
                    "color": "bg-green"
                }
            ]
        } else if (board_name == 'service_order') {
            var board_group = [
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Presupuestar',
                    "color": "bg-green"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Presupuestados',
                    "color": "bg-yellow"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Aceptados',
                    "color": "bg-green"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'En curso',
                    "color": "bg-purple"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Finalizados',
                    "color": "bg-blue"
                }
            ]
        } else if (board_name == 'service_turn') {
            var board_group = [
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Nuevos',
                    "color": "bg-green"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Asignados',
                    "color": "bg-red"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
                    "name": 'Para hoy',
                    "color": "bg-green"
                },
                {
                    "id": 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2),
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
            "status": "open",
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

/// Creo nuevo grupo de ordenes
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

/// EDITAR GROUP POPUP
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

/// NEW BOARD POPUP START
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

/// EDIT BOARD GROUP EDITO
async function new_board_group_put(element) {
    try {
        const parametroUrl = await getUrlVal('t');
        const board_name = $(element).attr('board_name');
        //const group_id = $(element).attr('group_id');

        const group_id = 'board_group_id' + new Date().getTime() + Math.random().toString().slice(2);

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
async function board_edit_group(element) {
    try {
        const modal = document.getElementById('master_popup');
        const board_type_name = $(element).attr('board_type_name'); //Id del documento a edita
        console.log('board_type_name EEEEEE', board_type_name);
        const group_id = $(element).attr('group_id'); //Id del documento a edita
        //  const parametroUrl = await getUrlVal('t');
        var board_name = board_name;
        // var board_type_name = parametroUrl;
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
        const board_type_name = $(element).attr('board_name'); //Id del documento a edita
        const group_id = $(element).attr('group_id'); //Id del documento a edita
        const docId = 'board_group_' + board_type_name; // Generar un ID único
        const doc = await L_board_db.get(docId); // Verificar si el documento ya existe
        // Valores seleccionados del formulario
        const board_group_name = $('input[name=board_group_name]').val();
        const board_group_color = $("#bg-select-color-group").attr('bg-color');
        const board_group_web_acept = $('input:checkbox[name=board_group_web_acept]:checked').val();
        const board_group_stock = $('input:checkbox[name=board_group_stock]:checked').val();
        const board_group_sell = $('input:checkbox[name=board_group_sell]:checked').val();
        const board_group_deliver = $('input:checkbox[name=board_group_deliver]:checked').val();
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

            get_board(board_type_name);
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

/// VACIA EL CARRITO
async function delete_cart_items(products) {
    // Obtén los documentos que quieres eliminar
    const productIds = products.map(product => product.id);
    let docs = await user_db.allDocs({
        keys: productIds,
        include_docs: true
    });

    // Marca los documentos para la eliminación
    let deletedDocs = docs.rows.map(row => ({
        _id: row.id,
        _rev: row.doc._rev,
        _deleted: true
    }));

    // Elimina los documentos
    let response = await user_db.bulkDocs(deletedDocs);
    if (response) {
        get_cart(ws_id);
    }
}

/// NUEVAS FUNCIONES CREAR ORDEN
async function new_order(element) {
    try {
        const category_id = $(element).attr('category_id');
        const total_neto = $('#total_cart_neto').html();
        const total_product = $('#total_neto_prod').html();
        const total_discount = $('#total_neto_discount').html();
        const total_service = $('#total_neto_service').html();
        const total_tax = $('#total_neto_tax').html();
        const contact_id = $('#cart_button_new_order').attr('contact_id');
        // console.log(' NEW ORDER contact_id',contact_id);
        if (contact_id == null) {
            Snackbar.show({
                text: 'Falta seleccionar el contacto!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 50000
            });

            //Hago los efectos en el buscador
            $('#cart_user_input').css('background-image', 'linear-gradient(0deg, #ff0e0e 2px, rgba(213, 0, 0, 0) 0), linear-gradient(0deg, rgba(0, 0, 0, .26) 1px, transparent 0)');
            $('#cart_user_input').focus();
            $('#contact_auto_subjet').addClass('open');
        } else {

            let timestamp = Date.now().toString().slice(-5);  // Get the last 5 digits of the Unix timestamp
            let letters = Array(2).fill(1).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');  // Generate 2 random letters
            const order_id_new = letters + '-' + timestamp;
            // Asigna el número de orden nuevo al documento de la orden
            //order_arr.order_id = order_id_new;
            //const productItems = document.querySelectorAll('#total_cart_neto');
            const doc_id = `${Date.now().toString()}_${Math.random().toString(36).substring(2, 15)}_order_${category_id}`;
            const workspace_id = ws_id;
            const board_group_conf = await L_board_db.get('board_group_' + category_id);
            const board_group = board_group_conf.board_group;
            const board_group_first = board_group[0];
            const group_id = board_group_first.id;
            const entry_date = { hour, minutes } = await getDateTimeMinutes();
            const due_date = { hour, minutes } = await getDateTimeMinutes();
            var comments = '';
            //  const products = await get_cart_product();

            var products = await get_cart_products(ws_id);



            console.log('AAAHUUUUUU  products', products);

            const contact_doc = await L_contact_db.get(contact_id, { include_docs: true, descending: true });
            const customer = {
                id: contact_doc._id,
                first_name: contact_doc.first_name,
                last_name: contact_doc.last_name,
                address: contact_doc.document_number,
                phone: contact_doc.phone,
                email: contact_doc.email,
                price_list: contact_doc.price_list
            };

            var order_arr = {
                _id: doc_id,
                type: 'order',
                category_id: category_id,
                workspace_id: workspace_id,
                status: 'open',
                seen: false,
                author: userCtx.name,
                group_id: group_id,
                order_id: order_id_new, // Inicialmente se establece como null
                group_position: '1',
                customer: customer,
                products: products,
                comments: comments,
                priority: {
                    id: '1',
                    value: 'urgente'
                },
                entry_date: entry_date,
                due_date: due_date,
                collaborators: [
                    {
                        name: userCtx.name,
                        email: userCtx.email,
                        role: userCtx.role
                    }
                ],
                total_service: total_service,
                total_product: total_product,
                total_tax: total_tax,
                total_discount: total_discount,
                total: total_neto,
                payment_history: [
                    {
                        id: 123,
                        payment_id: '21312312',
                        payment_method: 'Credit Card',
                        update_datetime: '18/3/2021 18:45:10',
                        user: userCtx.email,
                        total_tax: 21.00,
                        total_discount: 12.95,
                        total: 339.95,
                        currency: {
                            id: 'ARS',
                            value: '$'
                        }
                    }
                ],
                equipment: [
                    {
                        update_datetime: '18/3/2021 18:45:10',
                        user: 'smartmobile.com@gmail.com',
                        type: 'Notebook',
                        trade: 'Samsung',
                        model: 'np300',
                        serial: '',
                        addon: 'cargador bateria',
                    }
                ],

                failure: [
                    {
                        update_datetime: '18/3/2021 18:45:10',
                        user: 'smartmobile.com@gmail.com',
                        name: 'No enciende no carga',
                    }
                ],

                solutions: [
                    {
                        update_datetime: '18/3/2021 18:45:10',
                        user: 'smartmobile.com@gmail.com',
                        name: 'Hay que reparar la palaca madre',
                    }
                ],
                activity: [
                    {
                        update_datetime: '18/3/2021 18:45:10',
                        user: 'smartmobile.com@gmail.com',
                        type: 'msj',
                        content: 'El cliente dejo una contrasena 123421'
                    }
                ],

                update_history: [
                    {
                        update_datetime: '18/3/2021 18:45:10',
                        user: 'smartmobile.com@gmail.com',
                    }
                ],

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
            //  let timestamp = Date.now().toString().slice(-5);  // Get the last 5 digits of the Unix timestamp
            //  let letters = Array(2).fill(1).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');  // Generate 2 random letters
            //  const order_id_new = letters + '-' + timestamp;
            // Asigna el número de orden nuevo al documento de la orden
            // order_arr.order_id = order_id_new;
            // Incrementa el número de orden actual en la base de datos local
            // Crea la orden en la base de datos local
            let response = await L_board_db.put(order_arr);
            if (response.ok) {

                //Limpio elimino los items del carrito

                delete_cart_items(products);

                //Trae el doc actualizado y pega en el DOM la tarjeta y crea el MUURI kamban
                const doc = await L_board_db.get(response.id); // Verificar si el documento ya existe
                var card_data = { doc: doc };
                var board_gorup_id = doc.group_id;
                var groupIndex = itemContainers.findIndex(container => container.id === board_gorup_id); //Agrego el grid al grupo de ordenes
                var grid = columnGrids[groupIndex];

                add_new_card('/public/app/v4.0/dist/hbs/workspace/board/card/card_order.hbs', card_data, board_gorup_id, grid);

                // get_board(category_id);
                coun_items_broup(category_id);
                Snackbar.show({
                    text: 'Se creó la orden con éxito!',
                    actionText: 'OK',
                    actionTextColor: "#0575e6",
                    pos: 'bottom-right',
                    duration: 50000
                });
            }

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
async function get_board_onscroll(board_name) {
    try {

        //  const category_id = await getUrlVal('t');
        // alert('get_board_onscroll');
        // alert(board_name)

        let paginationData = await add_new_item_DOM(L_board_db, nextStartkey, nextStartkeyDocid, columnGrids, board_name);
        if (paginationData) {
            nextStartkey = paginationData.nextStartkey;
            nextStartkeyDocid = paginationData.nextStartkeyDocid;
            if (!nextStartkey) {

            }
        } else {
            console.error("No se pudo obtener los siguientes elementos.");

        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        isLoading = false;
    }
}

///NUEVAS ORDENES 2023
// CREAR NUEVA ORDEN EN LA DB
/// NEW ORDER CREO EL ARRAY COMPLETO DE LA ORDEN
async function get_board_onscrollOLDOK() {
    window.onscroll = async function () {
        if (isLoading) return;
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            isLoading = true;
            try {
                let paginationData = await add_new_item_DOM(L_board_db, nextStartkey, nextStartkeyDocid, columnGrids);
                if (paginationData) {
                    nextStartkey = paginationData.nextStartkey;
                    nextStartkeyDocid = paginationData.nextStartkeyDocid;
                    if (!nextStartkey) {
                        window.onscroll = null;
                    }
                } else {
                    console.error("No se pudo obtener los siguientes elementos.");
                    window.onscroll = null;
                }
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                isLoading = false;
            }
        }
    };
}
/*
async function get_total_orders_group() {
    let result = await L_board_db.query('order_view/by_type_category_status', options);
}
*/
// Cuento los items totales en cada grupo
async function coun_items_broup(board_type_name) {
    try {
        var grupos_arr = await L_board_db.get('board_group_' + board_type_name);
        const grupos = grupos_arr.board_group;
        // console.log('grupos',grupos);
        await L_board_db.createIndex({
            index: {
                fields: ['type', 'status', 'category_id']
            }
        });
        // Buscar documentos que necesitan actualización
        grupos.forEach(async function (grupo) {
            const group_id = grupo.id;
            const elementoSuma = document.querySelector('.board-item-conunt_' + group_id);
            //  console.log(`.board-item-conunt_${group_id}`);
            const result_items = await L_board_db.find({
                selector: {
                    type: 'order',
                    status: "open",
                    category_id: board_type_name,
                    group_id: group_id
                },
                limit: 1000  // Aumenta este número según sea necesario
            });
            //   console.log('result', result_items);
            const totalOrdenes = result_items.docs.length;
            elementoSuma.innerHTML = totalOrdenes.toString();
        });
    }
    catch (err) {
        console.log(err);
        Snackbar.show({
            text: err,
            actionText: 'Ok',
            actionTextColor: "#0575e6",
        });
    }
}

// CREO EL BOARD 
async function get_board(board_name) {
    try {
        // Obtener la sesión actual
        userCtx_rol = user_Ctx.userCtx.roles;
        board_group_info = await L_board_db.get('board_group_' + board_name);
        const board_group = board_group_info.board_group;
        const board_data = {
            module_info: board_group_info,
            board_group: board_group,
            module_name: 'board',
            board_group_info: board_group_info,
            board_type_name: board_name,
            ws_lang_data: ws_lang_data,
            ws_left_nav_data: ws_left_nav_data,
            user_roles: userCtx_rol,
        };

        // console.log('BOARD DATA', board_data);
        let parentElement = document.querySelector('#content_compiled');
        let id_compiled = '#' + parentElement.id;
        if (id_compiled) {
            renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/board.hbs', id_compiled, board_data, function () {
                let parentElement_nav = document.querySelector('#nav_bar_compiled');
                let id_compiled_nav = '#' + parentElement_nav.id;
                if (id_compiled_nav) {
                    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/nav_bar.hbs', id_compiled_nav, board_data, function () {
                        createCookie('board-now-' + ws_id, board_name, 30);//CREO UNA COKIE CON EL ULTIMO NOMBRE DE LA BOARD
                        coun_items_broup(board_name);
                        scrollerMove();
                        get_board_onscroll(board_name);//activa el evento scroll para graer mas ordenes
                    });
                }
            });
        } else {
            console.log('NO SE ENCUENTRA parentElement:', parentElement);
        }
    }
    catch (err) {
        console.log(err);
        Snackbar.show({
            text: err.name,
            actionText: 'Ok',
            actionTextColor: "#0575e6",
        });
        new_board_star_intro(board_name)

    }
}

////// CREAR ORDEN ///////
// CART PRODUCT RECORRO EL CART Y ARMO LA LISTA DE PRODUCTOS
async function get_cart_productNOOLD() {
    const productItems = document.querySelectorAll('#product_cart_items .s-card-actv-item');
    const products = [];

    for (const item of productItems) {
        //  const div_id = item.querySelector('.s-card-actv-item');
        const _id = item.getAttribute('id');
        const productImg = item.querySelector('.s-card-mini-img img').getAttribute('src');
        const productName = item.querySelector('.s-card-actv-item-name').childNodes[0].nodeValue.trim();
        const cost_price = item.getAttribute('cost_price');
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
            _id: _id,
            product_id: productName,
            name: productName,
            variation_id: productName,
            product_img: productImg,
            price: price,
            cost_price: cost_price,
            tax: tax,
            quantity: quantity,
            discount: discount,
            subtotal: subtotal
        };
        products.push(product);
    }

    return products;
}


// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_cart_products(ws_id, board_name) {
    board_name = readCookie('board-now-' + ws_id);
    let response = await user_db.query(
        'get-cart-' + ws_id + '/cart-item-' + board_name, {
        include_docs: true,
        descending: true
    }
    ); //Conceto con la vista de diseno
    if (response.rows) {
        const result = response.rows;
        return result;
    }
    else {
        return false;
    }
}


async function get_cart_product() {
    const productItems = document.querySelectorAll('#product_cart_items .s-card-actv-item');
    const products = [];

    for (const item of productItems) {
        //  const div_id = item.querySelector('.s-card-actv-item');
        const _id = item.getAttribute('id');
        const productImg = item.querySelector('.s-card-mini-img img').getAttribute('src');
        const productName = item.querySelector('.s-card-actv-item-name').childNodes[0].nodeValue.trim();
        const cost_price = item.getAttribute('cost_price');
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
            _id: _id,
            product_id: productName,
            name: productName,
            variation_id: productName,
            product_img: productImg,
            price: price,
            cost_price: cost_price,
            tax: tax,
            quantity: quantity,
            discount: discount,
            subtotal: subtotal
        };
        products.push(product);
    }

    return products;
}

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


/// UPDATE 2024 /////
// TRAE EL FORMULARIO


// EDICION GENERAL DE IMPUTS EN VARIABLE Y GENERAL
async function order_edit(element) {

    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        const input_id = $(element).attr('input_id'); //EL id del OBJETO a editar
        const input_value = $(element).attr('input_value'); //EL id del OBJETO a editar
        const new_value = $(element).val(); //EL VALOR DEL NUEVO OBJETO 
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_board_db.get(doc_id_s); //Traigo el documento
        // Si el objeto a editar esta dentro de una variable
        //  var doc = await L_catalog_db.get(doc_id);
        /*     if(  input_id == 'shipping'){
                 var objet_id = doc[input_id].find(response => response.[input_value] == new_value);// Traigo el elemento por la id variant
 
             }*/
        var new_objet = {
            id: newDate,
            value: new_value,
            updateUser: userName,
            updateDate: newDate,
        };

        doc[input_id] = new_objet; //Si existe el objeto Edito el valor del value por el valor nuevo

        //ENVIO El NUEVO DOCUMENTO EDITADO
        if (doc) {
            var response = await L_board_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// trae todos los datos del doc y los pega en la raiz
            });

            if (response) {
                Snackbar.show({
                    text: 'Se edito la orden con éxito!',
                    actionText: 'OK',
                    actionTextColor: "#0575e6",
                    pos: 'bottom-right',
                    duration: 5000
                });
            }
            else {
                Snackbar.show({
                    text: 'No se pudo editar la orden!',
                    actionText: 'OK',
                    actionTextColor: "#0575e6",
                    pos: 'bottom-right',
                    duration: 5000
                });
            }

        }
    } catch (err) {
        console.log(err);
    }

}// EDICION GENERAL DE IMPUTS EN VARIABLE Y GENERAL


// EDICION GENERAL DE IMPUTS EN VARIABLE Y GENERAL
async function order_edit_shippingNO(element) {

    try {

        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        console.log("doc_id", doc_id);
        
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_board_db.get(doc_id_s); //Traigo el documento
        const form = {}; // Objeto para almacenar los datos del formulario
        var shippingArray = {} ;

        console.log("doc AAAAAAAA", doc);
        // Recorrer todos los inputs dentro del formulario
        $('.order_edit_shipping_form input').each(function () {
            const name = $(this).attr('name'); // Obtener el nombre del input
            const value = $(this).val(); // Obtener el valor del input
            // Crear un objeto con el nombre y el valor del input y agregarlo al array
            shippingArray.push({ [name]: value });
        });
        // Agregar otros campos requeridos a cada objeto del array
        shippingArray.forEach(function (item) {
            item.updateUser = userName;
            item.updateDate = newDate;
            item.address = address;
            item.city = city;
            item.postal_code = postal_code;
            item.shipping_date = shipping_date;
            item.shipping_status = shipping_status;
            item.name = name;
            item.phone = phone;
            item.vehicle = vehicle;
        });

        // Convertir el objeto shipping en un array y devolverlo
        var shippingArray = [shipping];
        
        var shipping = shippingArray;
        console.log("shippingArray", shippingArray);
        console.log("shipping AAAAAAAA", shipping);

        // Guardar el documento actualizado
        // const response = await L_board_db.put(doc);
        doc['shipping'] = shipping; //Si existe el objeto Edito el valor del value por el valor nuevo
        console.log(shipping)
        //ENVIO El NUEVO DOCUMENTO EDITADO
        if (doc) {
            var response = await L_board_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// trae todos los datos del doc y los pega en la raiz
            });

            if (response) {
                Snackbar.show({
                    text: 'Se edito la orden con éxito!',
                    actionText: 'OK',
                    actionTextColor: "#0575e6",
                    pos: 'bottom-right',
                    duration: 5000
                });
            }
            else {
                Snackbar.show({
                    text: 'No se pudo editar la orden!',
                    actionText: 'OK',
                    actionTextColor: "#0575e6",
                    pos: 'bottom-right',
                    duration: 5000
                });
            }

        }
    } catch (err) {
        console.log(err);
    }

}// EDICION GENERAL DE IMPUTS EN VARIABLE Y GENERAL


async function order_edit_shipping(element) {
    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
      //  console.log("doc_id", doc_id);
        const newDate = new Date(); // Fecha actual del navegador
        const userName = userCtx.userCtx.name;
        const doc_id_s = String(doc_id); // Convierto el id del doc en un string
        const doc = await L_board_db.get(doc_id_s); // Traigo el documento

        // console.log("doc AAAAAAAA", doc);
        // Objeto para almacenar los datos del formulario
        const form = {};
        
        // Recorrer todos los inputs dentro del formulario
        $('.order_edit_shipping_form input').each(function () {
            const name = $(this).attr('name'); // Obtener el nombre del input
            const value = $(this).val(); // Obtener el valor del input
            // Agregar el valor al objeto form con el nombre como clave
            form[name] = value;
        });

        // Agregar otros campos requeridos al objeto form
        form.updateUser = userName;
        form.updateDate = newDate;

        //   console.log("form", form);
        // Guardar los datos del formulario en el documento
        doc.shipping = form;
        // console.log("doc con datos de envío", doc);
        // Guardar el documento actualizado
        const response = await L_board_db.put(doc);

        // Mostrar mensaje de éxito o error
        if (response) {
            Snackbar.show({
                text: 'Se editó la orden con éxito!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        } else {
            Snackbar.show({
                text: 'No se pudo editar la orden!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        }
    } catch (err) {
        console.log(err);
    }
}

async function dell_order_itemOLD(element) {
    try {
        const doc_id = $(element).attr('doc_id'); //Id del documento a editar
      //  console.log("doc_id", doc_id);
        const newDate = new Date(); // Fecha actual del navegador
        const userName = userCtx.userCtx.name;
        const doc_id_s = String(doc_id); // Convierto el id del doc en un string
        const doc = await L_board_db.get(doc_id_s); // Traigo el documento

        // console.log("doc AAAAAAAA", doc);
        // Objeto para almacenar los datos del formulario
        const form = {};
        
        // Recorrer todos los inputs dentro del formulario
       /* $('.order_edit_shipping_form input').each(function () {
            const name = $(this).attr('name'); // Obtener el nombre del input
            const value = $(this).val(); // Obtener el valor del input
            // Agregar el valor al objeto form con el nombre como clave
            form[name] = value;
        });*/

        //form[name] = value;
        // Agregar otros campos requeridos al objeto form
        form.updateUser = userName;
        form.updateDate = newDate;
        //   console.log("form", form);
        // Guardar los datos del formulario en el documento
        doc.shipping = form;
        // console.log("doc con datos de envío", doc);
        // Guardar el documento actualizado
        const response = await L_board_db.put(doc);

        // Mostrar mensaje de éxito o error
        if (response) {
            Snackbar.show({
                text: 'Se editó la orden con éxito!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        } else {
            Snackbar.show({
                text: 'No se pudo editar la orden!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// Elimina un producto de la ORDEN
async function dell_order_itemNO(element) {
    var order_id = $(element).attr('order_id');
    console.log('item_cart_id, item_cart_rev',order_id);
    try {
        // Obtener el documento actualizado del carrito
        const doc = await user_db.get(order_id);
        // Tomar la revisión actualizada
        const item_cart_rev = doc._rev;
        console.log('item_cart_id, item_cart_rev',order_id, item_cart_rev);
        // Eliminar el elemento del carrito utilizando la revisión actualizada
        await user_db.remove(order_id, item_cart_rev);
        
        // La eliminación fue exitosa, actualizar el carrito
        get_cart(ws_id);
    } catch (err) {
        if (err.name === 'conflict') {
            // Hubo un conflicto de actualización, reintentar la eliminación después de un breve retraso
            setTimeout(async () => {
                try {
                    await dell_cart_item(element); // Reintento de la operación
                } catch (err) {
                    console.error('Error al reintentar eliminar el elemento del carrito:', err);
                    Snackbar.show({
                        text: 'Error al eliminar el elemento del carrito',
                        // Otros detalles del Snackbar...
                    });
                }
            }, 1000); // Retraso de 1 segundo antes de reintentar
        } else {
            // Si el error no es un conflicto, manejarlo de otra manera
            console.error('Error al eliminar el elemento del carrito:', err);
            Snackbar.show({
                text: 'Error al eliminar el elemento del carrito',
                // Otros detalles del Snackbar...
            });
        }
    }
}

async function dell_order_item(element) {
    try {
        const order_id = $(element).attr('order_id'); // Id del documento a editar
        const product_id = $(element).attr('product_id'); // Id del documento a editar
        const newDate = new Date(); // Fecha actual del navegador
        const userName = userCtx.userCtx.name;
        const doc_id_s = String(order_id); // Convierto el id del doc en un string
        const doc = await L_board_db.get(doc_id_s); // Traigo el documento
        // Eliminar el producto específico de la matriz de productos
        const productIdToRemove = product_id; // ID del producto a eliminar
        doc.products = doc.products.filter(product => product.doc.variant.product_id !== productIdToRemove);
        // Guardar los datos del formulario en el documento
       // doc.shipping = form;
        // Guardar el documento actualizado
        const response = await L_board_db.put(doc);

        // Mostrar mensaje de éxito o error
        if (response) {
            Snackbar.show({
                text: 'Se editó la orden con éxito!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        } else {
            Snackbar.show({
                text: 'No se pudo editar la orden!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        }
    } catch (err) {
        console.log(err);
    }
}




///PAGO DE ORDEN CREA MOVIMIENTO

async function new_order_pay(element) {
    const doc_id = $(element).attr('doc_id'); //Id del documento a edita
    const doc_id_s = String(doc_id); // Convierto el id del doc en un string
    const doc = await L_board_db.get(doc_id_s); // Traigo el documento
    let timestamp = Date.now().toString().slice(-5);  // Get the last 5 digits of the Unix timestamp
    let letters = Array(2).fill(1).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');  // Generate 2 random letters
    const mov_id_new = letters + '-' + timestamp + '-mov';
    const new_doc_id = `${Date.now().toString()}_${Math.random().toString(36).substring(2, 15)}_order_${doc.category_id}`;
    //const { ws_id, hour, minutes } = doc;
    const entry_date = { hour, minutes } = await getDateTimeMinutes();

    ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });

    // Mapeo el contenido del objeto ws_left_nav M
    ws_left_nav_data = ws_left_nav['ws_left_nav'];
     user_Ctx = ws_left_nav.userCtx;
    // Mapeo el contenido del objeto userCtx
    userCtx = user_Ctx.userCtx;
    try {
        // Map the order document to an array
     let response = await L_box_db.put({
            _id: 'mov_' + new_doc_id, // Unique ID for the order
            type:'box_mov',
            order_id: doc_id,
            mov_id: mov_id_new ,
            status: 'Close',
            entry_date: new Date(), //fecha actual del navegador
            user_name: userCtx.name ,
            client_id: doc.customer.id,
            client: doc.customer,
            total_service: doc.total_service,
            total_products: doc.total_products,
            total_tax: doc.total_tax,
            total_discount: doc.total_discount,
            total: doc.total,
            category:doc.category_id,
            payment_type:'efectivo',
            payment_type_id:'1',
            payment_status:'saldado',
            order_status:'close',
        });

        if (response) {
            Snackbar.show({
                text: 'Realizo el pago '+ '#mov_' + new_doc_id+' con exito!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        } else {
            Snackbar.show({
                text: 'No se pudo realizar el pago!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        }

       // console.log('Order processed and saved successfully in the local database.');
    } catch (error) {
        Snackbar.show({
            text: 'No se pudo realizar el pago!',
            actionText: 'OK',
            actionTextColor: "#0575e6",
            pos: 'bottom-right',
            duration: 5000
        });
        console.error('Error processing and saving the order in the local database:', error);
    }
}



