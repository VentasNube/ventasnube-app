////-----(FUNCIONES PARA CREAR LAS VISTAAS DEL BODY y NAVEGACION AJAX-----////

////// ============== BODY ventasnube APP  2021  ============================= //////
// 1 TRAIGO LOS DOCUMENTOS CON LA INFORMACIOND E LA ESTRUCTURA 
//// --- Top Bar ---- Left Nav --- Cart -- Fav -- Search --- acount --  buy 

//var ws_info = ws_info;
//###--- Conection y Sync a la base de datos local ---#####

var ws_info_db = 'ws_info_' + ws_id;

//alert(ws_id);

async function ws_module_config() {
    // var ws_info_db = 'ws_info_' + ws_id;
    try {
        L_ws_info_db = new PouchDB(ws_info_db, { skip_setup: false });
        //sincronizo
        L_ws_info_db.sync(url_R_db + ws_info_db, { live: true, retry: true, });
        //Variable global con las DB de serach local
        if (offline_mode) {
            // Si esta activo el modo offline
            // Creo la db local
            L_ws_info_db = await new PouchDB(ws_info_db);

            //Conecto a la DB LOCAL
            L_ws_info_db = new PouchDB(ws_info_db, { skip_setup: false });
            //sincronizo
            L_ws_info_db.sync(url_R_db + ws_info_db, { live: true, retry: true, });

            // ws_info_db = L_ws_info_db;
            //sync.cancel(); // whenever you want to cancel
            // DOC DE CONFIG
            ws_info = await L_ws_info_db.get('ws_module_config', { include_docs: true, descending: true });
            // DOC DE LEGUAJE
            ws_lang_data_doc = await L_ws_info_db.get('ws_lang_sp', { include_docs: true, descending: true });
            // DOC DE MODULOS
           // ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
            //Mapeo el objeto
            var ws_lang = ws_lang_data_doc;
            //SETEO EL ARRAY CON EL IDIOMA
            ws_lang_data = ws_lang['ws_lang_es'];
            //Envio los datos a la funciones y imprimo
            //Aca activo o desactivo los modulos principales 
            get_top_bar(ws_info, ws_lang_data);
            get_nav_cart(ws_info, ws_lang_data);
            get_search_module(ws_info, ws_lang_data);
            get_left_nav(ws_left_nav);

            console.log(ws_left_nav);
            // alert('OFFLINE MODE ON')
            Snackbar.show({
                text: 'Modo offline activado',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'bottom-left',
                duration: 50000
            });
        } else {
            // Si no esta activo el modo offline

            // Conecto a db info
            L_ws_info_db = await new PouchDB(url_R_db + ws_info_db, { skip_setup: false });

            //sincronizo con la local DB
            L_ws_info_db.sync(ws_info_db, { live: true, retry: true, });


            // DOC DE CONFIG
            ws_info = await L_ws_info_db.get('ws_module_config', { include_docs: true, descending: true });
            // DOC DE LEGUAJE
            ws_lang_data_doc = await L_ws_info_db.get('ws_lang_sp', { include_docs: true, descending: true });
            // DOC DE MODULOS
            ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
            // Mapeo el objeto
            var ws_lang = ws_lang_data_doc;
            // SETEO EL ARRAY CON EL IDIOMA
            ws_lang_data = ws_lang['ws_lang_es'];
            // Envio los datos a la funciones y imprimo
            // Aca activo o desactivo los modulos principales 
            get_top_bar(ws_info, ws_lang_data);
            get_nav_cart(ws_info, ws_lang_data);
            get_search_module(ws_info, ws_lang_data);
            get_left_nav(ws_left_nav);

            console.log('ws_left_nav');
            console.log(ws_left_nav);
            // alert('OFFLINE MODE Off')
            Snackbar.show({
                text: 'Modo offline desactivado',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'bottom-left',
                duration: 50000
            });
        }
    } catch (err) {
        //console.log(err);
        Snackbar.show({
            text: err.reason,
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-left',
            duration: 50000
        });
    }
}

function put_left_nav_doc() {
    $.ajax({
        url: "/body/left_nav",
        type: "POST",
        dataType: "json",
        success: function (ws_left_nav) {
            if (ws_left_nav.result == true) { 
                        console.log('Solicitud ajax ws_left_nav ok! '+ ws_id);
                        ///// IMPRIME ////
                        user_db.put({
                            _id: 'ws_left_nav_' + ws_id,
                            ws_left_nav: ws_left_nav
                        }, function (err, response) {
                            if(response) {
                              msj_alert('Se actualizo el left_nav_doc', 'top-bottom');
                            }
                            else if (err) {
                                return console.log(err);
                            }
                        });
            } 
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {

        if (jqXHR.status === 0) {
            msj_alert('Not connect: Verify Network.', 'top-center');
            //response_msj = 'Not connect: Verify Network.';
        } else if (jqXHR.status == 404) {
            msj_alert('Requested page not found [404]', 'top-center');
           // response_msj = 'Requested page not found [404]';
        } else if (jqXHR.status == 500) {
            msj_alert('Internal Server Error [500].', 'top-center');
           // response_msj = 'Internal Server Error [500].';
        } else if (textStatus === 'parsererror') {
            response_msj = 'Requested JSON parse failed.';

        } else if (textStatus === 'timeout') {
            response_msj = 'Time out error.';
        } else if (textStatus === 'abort') {
            response_msj = 'Ajax request aborted';
        } else {
            response_msj = 'Uncaught Error: ' + jqXHR.responseText;
        }
    });
};

put_left_nav_doc();


function get_left_nav_doc(user_db) {
              //    alert('Traigo el doc y imprimo la vista');
                user_db.get('ws_left_nav_' + ws_id, function (err, doc) {
                    // response.userCtx.name is the current user        
                    if (doc) {
                        var ws_left_nav_doc = {
                            ws_left_nav: doc
                        }
                       
                        console.log('ws_left_nav_ :');
                        console.log(doc);
                        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/body/left_nav.hbs', '#left_nav_compiled', doc);
                        //  console.log ('No se encuentra el documento en la userdb');
                    }else{
                        console.log('Error al traer ws_left_nav doc');
                        return console.log(err);        
                    }
                });
};

get_left_nav_doc(user_db);




/// ENVIO LOS PARAMETROS DEL MODULO Y LO COMPILADO
////----(1 TOP BAR)---/////
function get_top_bar(ws_info, ws_lang_data) {
    var ws_top_bar = {
        ws_top_bar: ws_info,
        user: user_data,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/body/top_bar.hbs', '#top_nav_compiled', ws_top_bar);
    console.log('Top bar in');
};

////----(3 LEFT NAV CART)---/////
function get_nav_cart(ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/cart/cart_main.hbs', '#right_main_compiled', ws_cart);
    // $('#cart_user_input').focus();
    console.log('CART in');
};

////----(2 LEFT NAV)---/////
// Imprimo en pantalla los el array con los modulos
//Nueva funcion de Left nav
function get_left_nav(ws_left_nav) {
    /*  var ws_left_nav_array = {
          ws_left_nav: ws_left_nav_doc,
          ws_lang_data: ws_lang_data
      }
  */
    console.log('left nav IN');
    console.log(ws_left_nav_doc);
    var ws_left_nav_doc = {
        ws_left_nav: ws_left_nav
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/body/left_nav.hbs', '#left_nav_compiled', ws_left_nav_doc);
};

////----(4 Search Module)---/////
function get_search_module(ws_info, ws_lang_data) {
    var ws_search_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    console.log('search');
    console.log(ws_search_data);
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/search/search_module.hbs', '#search_module_compiled', ws_search_data);
};

//// BOTON SELECT MODULO LEFT BAR //
// Logica q trae el modulos con handelbars no el linck
$(document).on('click', 'a.l_nav_m', function (event) {
    // var m_t_icon = $(this).children('span.material-icons').text(); //Trae texto html del icono
    //  var m_t_name = $(this).children('span.this_m_t_name').text(); //Trae texto html del btn
    var m_id = $(this).attr('m_id'); //Trae modulo id
    var m_t_id = $(this).attr('m_t_id'); //Trae module tipo id
    //  var s_url = window.location.host; // Trae dominio url www.dominio/
    //  var s_url_t_m = $(this).attr('m_url'); //Trae Pacht url /pacht/
    var s_url_t_m = $(this).attr('s_url_t_m'); //Trae Pacht url /pacht/    
    var m_url = s_url_t_m; // Armo la url completa del linck
    history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion                
    //  get_nav_bar(m_id, m_t_id); // Recargo los datos del modulos al copilador handelbars del modulo.
    get_content_module(m_id, m_t_id, s_url_t_m);
});

//// BOTON SELECT TYPO DE MODULO LEFT BAR///
$(document).on('click', 'a.l_nav_t_m', function (event) {
    // var url_now = getUrl();
    // var m_id = url_now.m_id;
    // var m_t_id = url_now.m_t_id;
    // var pacht = $(this).attr('m_url'); //CONTROLADOR PRINCIPAL
    var m_t_icon = $(this).children('span.material-icons').text(); //Trae texto html del icono
    var m_t_name = $(this).children('span.this_m_t_name').text(); //Trae texto html del btn
    var m_id = $(this).attr('m_id'); //Trae modulo id
    var m_t_id = $(this).attr('m_t_id'); //Trae module tipo id
    var s_url = window.location.host; // Trae dominio url www.dominio/
    var s_url_t_m = $(this).attr('s_url_t_m'); //Trae Pacht url /pacht/
    var m_url = s_url_t_m + '?m=' + m_id + '&?t=' + m_t_id + '&?type=' + m_t_name; // Armo la url completa del linck
    history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion 
    get_nav_bar(m_id, m_t_id); // Recargo los datos del modulos al copilador handelbars del modulo.
    // get_board_group(m_id, m_t_id);
    get_content_module();
});

////----(OTRAS COSAS)----/////
//Efecto material de los Label imput 2021
////----( EJECUTO TODAS LAS FUNCIONES UNA VEZ Q SE BAJE EL .HBS  )----/////
$(document).ready(function () {
    window.onload =
        $(".material_input").focusout(function () {
            var input_tex = $(this).children('input').val();
            if (!input_tex) {
                $(this).children('label').css({ "top": "15px", "font-size": "18px" });
                $(this).children('label').children('span').css({ "font-size": "24px" });
                //$(this).prev('label span').css({ "font-size": "10px" });
            }
        });
    $(".material_input").focusin(function () {
        $(this).children('label').css({ "top": "5px", "font-size": "13px" });
        $(this).children('label').children('span').css({ "font-size": "18px" });
    });

});


ws_module_config()
