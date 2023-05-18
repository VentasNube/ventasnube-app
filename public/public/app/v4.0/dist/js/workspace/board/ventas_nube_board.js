////// BOARDS MODULE 2023 ////////////

var ws_board_db = 'ws_boards_' + ws_id;
ws_left_nav_data = false;
ws_lang_data = false;
module_info = false;
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
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/nav_bar.hbs', '#nav_bar_compiled',module_info);
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
        console.log(err);
    }
}


// TRAIGO EL BOARD Y IMPRIMO
async function get_boardOLDOK(board_name,board_type_name) {
    try {

       // if(!board_name){
        const parametroUrl = await getUrlVal('t');
        // alert(parametroUrl);
        var board_name = board_name;
        var board_type_name = parametroUrl;

        var board_group_conf = await L_board_db.get('board_group_' + board_type_name);
        var board_group = board_group_conf.board_group;

        var board_data = {
            module_info: board_group_conf,
            board_type_name: board_group_conf.name,
            ws_lang_data: ws_lang_data,
            ws_left_nav_data: ws_left_nav_data,
            user_roles: user_Ctx.userCtx.roles,
        }
        console.log("board_data board_data board_data" )
        console.log(board_data)
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/board.hbs', '#content_compiled', board_data);
        get_nav_board(board_data);
        get_board_group(board_group);
      //  calcularAnchoTotalBoard();

    } catch (error) {
          new_board_star_intro(board_type_name);
        if (error.name !== 'not_found') {
            new_board_star_intro(board_type_name);
            throw error;
        }else if(error.name == 'deleted'){
            new_board_star_intro(board_type_name);
            throw error;
        }
    }
}
async function get_board(board_name, board_type_name) {
    let parametroUrl;

    try {
        if (!board_type_name) {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('t')) {
                parametroUrl = urlParams.get('t');
            } else {
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

        console.log("board_data board_data board_data");
        console.log(board_data);

        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/board.hbs', '#content_compiled', board_data);
        get_nav_board(board_data);
        get_board_group(board_group);
        // calcularAnchoTotalBoard();

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


// Calculo el ancho del BOARD dependiendo la cantidad de grupos que hay
/*
async function calcularAnchoTotalBoard() {
    const divs = document.querySelectorAll('.board-column'); // Reemplaza '.mi-div' con el selector correspondiente a tus divs
  
    let totalAncho = 0;
    for (const div of divs) {
      await new Promise(resolve => {
        setTimeout(() => {
          const ancho = div.clientWidth;
          totalAncho += ancho;
          resolve();
        }, 0);
      });
    }
    const totalEnPixels = `${totalAncho}px`;
    const contenedor = document.querySelector('.board-group'); // Reemplaza '.mi-contenedor' con el selector correspondiente a tu div contenedor
    contenedor.style.width = totalEnPixels;
  }
  */
//calcularAnchoTotalBoard();

// PUT NUEVO BOARD 
async function put_new_board(board_name, data) {
    try {
      //  const currentDateTime = new Date().toLocaleString('es-ES');
        const docId = 'board_group_' + board_name; // Generar un ID único
        let doc = {};
         /*
          if (board_name == 'sell') {
  
              new_doc = {
                  "_id": docId,
                  "category_id": board_name,
                  "name": 'Ventas',
                  "name_url": board_name,
                  "icon": board_name,
                  "workspace_id": ws_id,
                  "status": "active",
                  "type": "board_config",
                  data,
                  "board_group": [
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
              }
  
          } else if (board_name == 'purcharse') {
  
              new_doc = {
                  "_id": docId,
                  "category_id": board_name,
                  "name": 'Compras',
                  "name_url": board_name,
                  "icon": board_name,
                  "workspace_id": ws_id,
                  "status": "active",
                  "type": "board_config",
                  data,
                  "board_group": [
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
              }
          } else if (board_name == 'service_order') {
  
              new_doc = {
                  "_id": docId,
                  "category_id": board_name,
                  "name": 'Servicios',
                  "name_url": board_name,
                  "icon": board_name,
                  "workspace_id": ws_id,
                  "status": "active",
                  "type": "board_config",
                  data,
                  "board_group": [
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
              }
          } else if (board_name == 'service_turn') {
  
              new_doc = {
                  "_id": docId,
                  "category_id": board_name,
                  "name": 'Turnos',
                  "name_url": board_name,
                  "icon": board_name,
                  "workspace_id": ws_id,
                  "status": "active",
                  "type": "board_config",
                  data,
                  "board_group": [
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
          }
          */
        
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
            "board_group": [
                {
                    "id": "1",
                    "name": 'Nuevos' ,
                    "color": "bg-green"
                },
                {
                    "id": "2",
                    "name": 'Presupuestos',
                    "color": "bg-red"
                },
                {
                    "id": "3",
                    "name": 'Finalizados' ,
                    "color": "bg-green"
                }
            ],
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
            text: 'Documento guardado exitosamente',
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 5000
        });
        console.log("PUT NEW BOARD");
        console.log(response);
        console.log(new_doc._id);
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
    //  STEP 2   
    //BOARD
    var board_mode = board_type;
    var board_collect_and_close = $('input:radio[name=board_collect_and_close]:checked').val();
    var board_collect_and_deliver = $('input:radio[name=board_collect_and_deliver]:checked').val();
    var board_delivery_place = $('input:radio[name=board_delivery_place]:checked').val();
    //BOX
    var board_control_cash_close_box = $('input:radio[name=board_control_cash_close_box]:checked').val();
    var board_control_stock = $('input:radio[name=board_control_stock]:checked').val();
    var board_control_cash = $('input:radio[name=board_control_cash]:checked').val();
    // STEP 3
    //Documentos facturas
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
                board_collect_and_close:board_collect_and_close,
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

            console.log(' datadatadatadatadata datadata datadata data');
            console.log(data);

            console.log('board_name board_name board_name');
            console.log(board_name);
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


// IMPRIME EL BOARD GRUP
async function get_board_group(board_group) {
    var ws_board = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles,
        board_group: board_group,
        //m_id: m_id,
        // m_t_id : m_t_id
    }
  //  console.log('ws_board');
  //  console.log(ws_board);
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/board/board_group.hbs', '#content_board_group_compiled', ws_board);
}




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



///NUEVAS ORDENES 2023

// CREAR NUEVA ORDEN EN LA DB
async function put_order_sell(doc) {
    try {
        doc._id = 'sales_order_' + new Date().getTime() + Math.random().toString().slice(2); // Generar un ID único
        let response = await L_board_db.put(doc); // Crear un nuevo documento
        // console.log(response);
        // console.log(doc._id);
    } catch (err) {
        console.log(err);
    }
}

/// NEW ORDER CREO EL ARRAY COMPLETO DE LA ORDEN
async function new_order(element) {

    const category_id = $(element).attr('category_id'); //Id del documento a edita
    const doc_id = category_id + '_order_' + new Date().getTime() + Math.random().toString().slice(2);
    const workspace_id = ws_id; //Id del documento a edita
    const group_id = '1'; //Id del documento a edita
    const entry_date = { hour, minutes } = await getDateTimeMinutes();
    const due_date = { hour, minutes } = await getDateTimeMinutes();
    const comments = 'Sin comentarios';
    try {
        const products = await get_cart_product();
        console.log(products); // Puedes hacer lo que desees con los datos, como almacenarlos en una variable


        const customer = {
            id: 'client_id_xxxx',
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
            seen: false,
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
            text: 'Error al obtener los datos:', error,
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-left',
            duration: 50000
        });
        console.error('Error al obtener los datos:', error);
    }
}

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




