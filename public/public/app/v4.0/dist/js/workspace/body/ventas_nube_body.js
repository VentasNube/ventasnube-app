////-----(FUNCIONES PARA CREAR LAS VISTAAS DEL BODY y NAVEGACION AJAX-----////

////// ============== BODY ventasnube APP  2021  ============================= //////
// 1 TRAIGO LOS DOCUMENTOS CON LA INFORMACIOND E LA ESTRUCTURA 
//// --- Top Bar ---- Left Nav --- Cart -- Fav -- Search --- acount --  buy 

//###--- Conection y Sync a la base de datos local ---#####
var ws_info_db = 'ws_info_' + ws_id;
var ws_info = null;
var ws_lang_data = null;
//Creo la base de datos local info_db
L_ws_info_db = new PouchDB(ws_info_db, { skip_setup: true });
//sincronizo
//Creo y conecto con userDB local 
L_ws_info_db.sync(url_R_db+ws_info_db, {
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

 async function ws_module_config() {
                try {
                        ws_info = await L_ws_info_db.get('ws_module_config', { include_docs: true, descending: true });
                        // DOC DE LEGUAJE
                        ws_lang_data_doc = await L_ws_info_db.get('ws_lang_sp', { include_docs: true, descending: true });
                        //Mapeo el objeto
                        var ws_lang = ws_lang_data_doc;
                        //SETEO EL ARRAY CON EL IDIOMA
                        ws_lang_data = ws_lang['ws_lang_es'];
                        //Envio los datos a la funciones y imprimo

                        console.log('WS INFOOOOOOOOOOOO');
                        console.log(ws_info);
                        console.log('WS ws_lang_dataAAAAA');
                        console.log(ws_lang_data);

                        get_top_bar(ws_info, ws_lang_data);
                        get_nav_cart(ws_info, ws_lang_data);
                        get_search_module(ws_info, ws_lang_data);
                        get_left_nav_doc(user_db , ws_lang_data);//Traigo y imprimo el documento de navegacion lateral 
                        put_left_nav_doc();
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
 ////----(1 LEFT NAV)---/////
 //Creo el doc y lo guardo el la db
function put_left_nav_doc() {
    $.ajax({
        url: "/body/left_nav",
        type: "POST",
        dataType: "json",
        success: function (ws_left_nav) {
            if (ws_left_nav.result == true) { 
                        console.log('Solicitud ajax ws_left_nav ok! '+ ws_id);
                        ///// IMPRIME ////
                        user_db.get('ws_left_nav_' + ws_id, function(err, doc) {
                            if (err) {msj_alert(err); }
                            user_db.put({
                              _id: 'ws_left_nav_' + ws_id,
                              _rev: doc._rev,
                              ws_left_nav: ws_left_nav
                            }, function(err, response) {
                               if(response) {
                                //Si se guara el documento guardo una cookie de que ya fue instalado el wscada vez q cargo la pagina por primera vez q caduque todos los dias
                                // alert('put left nev doc');
                                createCookie('ws_install-' + ws_id, true), 30;
                                //Si se carga el left nav ya se carga como instalada la app en una COchkie q uso para comprobar
                               }
                              else if (err) {
                               // msj_alert(err);
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
                             //   msj_alert('Se actualizo el left_nav_doc','top-center');
                             console.log('se actualizo el left bar doc')
                             // handle response
                            });
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
//Leo el doc y imprimo la vista
function get_left_nav_doc(user_db , ws_lang_data) {
              //    alert('Traigo el doc y imprimo la vista');
                user_db.get('ws_left_nav_' + ws_id, function (err, doc) {
                    // response.userCtx.name is the current user        
                    if (doc) {
                        var ws_left_nav_doc = {
                            ws_left_nav: doc,
                            ws_lang_data: ws_lang_data
                        }
                        console.log('ws_left_nav_ :');
                        console.log(doc);
                        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/body/left_nav.hbs', '#left_nav_compiled', doc);
                        //  console.log ('No se encuentra el documento en la userdb');
                    }else if(err){
                      //  console.log('Error al traer ws_left_nav doc');
                      put_left_nav_doc(); //Si no se encuentra el docuento lo creamos nuevo
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
};

/// ENVIO LOS PARAMETROS DEL MODULO Y LO COMPILADO
////----(2 TOP BAR)---/////
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




//// BOTON SELECT MODULO LEFT BAR //
// Logica q trae el modulos con handelbars no el linck
/*
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
*/

//ARMA LOS MODULOS DESDE EL BODY PARA TRAER TODOS LOS TEMPLATES Y DATA DE CADA CONTROLADOR
function get_content_module( m_name , m_id, m_t_id, id_copiled ) {
   // var url_now = getUrl();
  //  var m_id = url_now.m_id;
  //  var m_t_id = url_now.m_t_id;
   // var m_name = url_now.pacht_m_url; //CONTROLADOR PRINCIPAL DE LA URL
    //  alert(pacht)
    /// ACA DEBERIA ARMAR LA DATA DEPENDIENDO LO QUE LE ENVIO

    var url_public = url_public;
   
    var url_doc = pacht + '_m_data'; //NOMBRE DE CONTROLADOR DATA

    var url_db = url_R_db + 'ws_'+ s_url_t_m + ws_id; //NOMBRE que arma la conexion a las bases de datos

    var url_hbs = url_site + url_hbs + s_url_t_m + '/' + s_url_t_m + '.hbs'; //NOMBRE CONTROLADOR TEMPLATE   
    
    var doc_name = url_R_db + 'ws_'+ s_url_t_m + ws_id;

    var id_c_copiled = '#content_compiled'; // ID DE COMPILACION // 

    console.log('Get all content module in body' + controler_c_data + '/' + controler_c_template + '/' + id_c_copiled);
    get_module_compile(url_db, url_hbs, id_c_copiled); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
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

    var m_name = $(this).attr('s_url_t_m'); //Trae Pacht url /pacht/    
    var m_url = '/workspace?type=' + m_name; // Armo la url completa del linck
    history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion                
    //  get_nav_bar(m_id, m_t_id); // Recargo los datos del modulos al copilador handelbars del modulo.
   
    alert('Traigo el modulo ' + m_id + '--' + m_t_id + '' + m_name);

    get_content_module(m_name , m_id, m_t_id, id_copiled);

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


ws_module_config();


