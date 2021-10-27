////-----(FUNCIONES PARA CREAR LAS VISTAAS DEL BODY y NAVEGACION AJAX-----////

////// ============== BODY ventasnube APP  2021  ============================= //////
// 1 TRAIGO LOS DOCUMENTOS CON LA INFORMACIOND E LA ESTRUCTURA 
//// --- Top Bar ---- Left Nav --- Cart -- Fav -- Search --- acount --  buy 

//###--- Conection y Sync a la base de datos local ---#####
ws_info_db = 'ws_info_' + ws_id;
ws_info = null; // Doc con la info y configuracion del Ws
ws_lang_data = null; //Doc con el lenguaje
ws_left_nav = null; //DOC con los modulo
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
                         // DOC DE CONFIGURACION GENERAL
                        ws_info = await L_ws_info_db.get('ws_module_config', { include_docs: true, descending: true });
                        // DOC DE NAVEGACION
                        ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
                        // DOC DE LEGUAJE
                        ws_lang_data_doc = await L_ws_info_db.get('ws_lang_sp', { include_docs: true, descending: true });
                        //Mapeo el objeto
                        var ws_lang = ws_lang_data_doc;
                        //SETEO EL ARRAY CON EL IDIOMA
                        ws_lang_data = ws_lang['ws_lang_es'];
                        //Envio los datos a la funciones y imprimo

                        get_top_bar(ws_info, ws_lang_data); //Imprimo el top bar
                        get_left_nav(ws_left_nav , ws_lang_data);//Traigo y imprimo el documento de navegacion lateral 
                        get_nav_cart(ws_info, ws_lang_data);//Imprimo el cart
                        get_search_module(ws_info, ws_lang_data); //Imprimo el search 
                        put_left_nav_doc()//Actualizo o envio la cokkie de navegacion lateral
                        check_url_module(ws_left_nav, ws_lang_data);//Chequeo y cargo el modulo segun la url actual y la cargo

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
                                //alert('Se actualizo el Left Nav doc');
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
function get_left_nav(ws_left_nav , ws_lang_data) {
              var ws_left_nav_doc = {
                  ws_left_nav: ws_left_nav,
                  ws_lang_data: ws_lang_data
              }
              console.log('ws_left_nav_ :AAAAAA');
              console.log(ws_left_nav);
              console.log(ws_left_nav_doc);
              renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/body/left_nav.hbs', '#left_nav_compiled', ws_left_nav);
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

//ARMA LOS MODULOS DESDE EL BODY PARA TRAER TODOS LOS TEMPLATES Y DATA DE CADA CONTROLADOR
function check_url_module(ws_left_nav , ws_lang_data) {
    var m_id = getParameterByName('m'); //Trae el modulo id
    var m_t_id = getParameterByName('t'); //Trae el Tipo de modulo id
    var m_name = getParameterByName('type'); //Trae el nombre del tipo de modulo
    check_content_module(m_name, ws_left_nav, ws_lang_data); //Envio el nomrbre de la url el array del leftnav el ws_lang_data al controlador q arma cekea los permisos
}


//ARMA LOS MODULOS DESDE EL BODY PARA TRAER TODOS LOS TEMPLATES Y DATA DE CADA CONTROLADOR
function check_content_module(ws_module_name, ws_left_nav, ws_lang_data) {
    const ws_module_array = ws_left_nav.ws_left_nav.m;
    const ws_module_type_array = ws_left_nav.ws_left_nav.m_t;
    var array = ws_module_array;
    //Hago una consulta al array de modulos con permisos y lo comparo con el que estaba en el link
    for (var i=0; i<array.length; i++) { 
        if(array[i].m_url === ws_module_name ){
            ws_module_select = array[i].m_url;
          return  get_module_function(ws_module_select);
        }
    }

};

//Es el filtro comparativo de los modulos y activador de funciones
function get_module_function(ws_module_select) {
         const ws_m_s = ws_module_select;
        if(ws_m_s == 'catalog'){
            get_catalog();
         //  get_items_catalog();
        }else if(ws_m_s == 'box'){
            alert('TRAIGO EL box');
           // get_box();
        }
        else if(ws_m_s == 'board'){
            alert('TRAIGO EL board');
           // get_box();
        }
};


//// BOTON SELECT MODULO LEFT BAR //
// Logica q trae el modulos con handelbars no el linck
$(document).on('click', 'a.l_nav_m', function (event) {
    var m_name = $(this).attr('s_url_t_m'); //Trae Pacht url /pacht/    
    var m_url = '/workspace?type=' + m_name; // Armo la url completa del linck
    history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion          
    check_content_module(m_name, ws_left_nav, ws_lang_data);
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
 //   get_nav_bar(m_id, m_t_id); // Recargo los datos del modulos al copilador handelbars del modulo.
    // get_board_group(m_id, m_t_id);
    get_content_module();
});

////----(OTRAS COSAS)----/////
//Efecto material de los Label imput 2021
////----( EJECUTO TODAS LAS FUNCIONES UNA VEZ Q SE BAJE EL .HBS  )----/////
$(document).ready(function (ws_left_nav , ws_lang_data) {
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


