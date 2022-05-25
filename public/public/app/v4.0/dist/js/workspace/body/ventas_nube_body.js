////-----(FUNCIONES PARA CREAR LAS VISTAAS DEL BODY y NAVEGACION AJAX-----////

////// ============== BODY ventasnube APP  2021  ============================= //////
// 1 TRAIGO LOS DOCUMENTOS CON LA INFORMACIOND E LA ESTRUCTURA 
//// --- Top Bar ---- Left Nav --- Cart -- Fav -- Search --- acount --  buy 

//###--- Conection y Sync a la base de datos local ---#####
//ws_info_db = 'ws_info_' + ws_id;
ws_info = null; // Doc con la info y configuracion del Ws
ws_lang_data = null; //Doc con el lenguaje
ws_left_nav = null; //DOC con los modulo

//Creo la base de datos local info_db
/*
L_ws_info_db = new PouchDB(ws_info_db, { skip_setup: true });
user_Ctx = null;
//sincronizo
//Creo y conecto con userDB local 
L_ws_info_db.sync(url_R_db+ws_info_db, {
    live: true,
    retry: true,
    // skip_setup: true
}).on('change', function (change) {
    $('#cloud_sync_icon').html("<i class='material-icons material-icon-spinner'> sync</i>");
    // document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons material-icon-spinner'> sync</i>";
  }).on('paused', function (info) {
    $('#cloud_sync_icon').html("<i class='material-icons'> cloud_sync</i>");
    // document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons'> cloud_sync</i>";
  }).on('active', function (info) {
    $('#cloud_sync_icon').html("<i class='material-icons'> cloud_sync</i>");
    // document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons'> cloud_sync</i>";
  }).on('error', function (err) {
    $('#cloud_sync_icon').html("<i class='material-icons'> sync_problem</i>");
    //  document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons'> sync_problem</i>";
  });
/*
  user_db.getSession(function (err, response) {
    if (err) {
        console.log('ERROR DE SESSION');
        console.log(err);
        // network error
    } else if (!response.userCtx.name) {
        console.log('esponse.userCtx');
        console.log(esponse.userCtx);
        // nobody's logged in
       // setTimeout(function () { window.location = "/login"; }, 2000);
    } else {
        var userCtx = response.userCtx;
        console.log('USER SESSSIONNNN AAAA BBBBB ');
        console.log(userCtx);
        return userCtx;
    }
});
*/

//###--- Conection y Sync a la base de datos local ---#####
var ws_search_db = 'ws_collections_' + ws_id;
//var ws_info = null;
//var ws_lang_data = null;
//Creo la base de datos local info_db
L_catalog_db = new PouchDB(ws_search_db, { skip_setup: true });
//sincronizo
//Creo y conecto con userDB local 
L_catalog_db.sync(url_R_db+ws_search_db, {
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
                        //userCtx variable global de permisos y roles para filtrar las vistas
                        // DOC DE CONFIGURACION GENERAL
                        ws_info = await L_catalog_db.get('ws_module_config', { include_docs: true, descending: true });
                        // DOC DE NAVEGACION
                        ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });      
                        //Mapeo el contenido del objeto ws_left_nav M
                        ws_left_nav_data = ws_left_nav['ws_left_nav'];
                        console.log(' AAAAAAA LEFTTT DATAAAAAAaaaaaaaaaa aaaaaaaaasasasasassa');
                        console.log(ws_left_nav_data);
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
                        get_top_bar(ws_info, ws_lang_data, user_Ctx); //Imprimo el top bar
                        get_left_nav(ws_left_nav , ws_lang_data , user_Ctx);//Traigo y imprimo el documento de navegacion lateral 
                        // get_right_nav(ws_info, ws_lang_data);//Imprimo el cart
                        get_right_cart(ws_info, ws_lang_data , user_Ctx);
                        // get_nav_cart(ws_info, ws_lang_data);//Imprimo el cart
                        get_search_module(ws_info, ws_lang_data , user_Ctx); //Imprimo el search 
                        put_left_nav_doc()//Actualizo o envio la cokkie de navegacion lateral
                        check_url_module(ws_left_nav, ws_lang_data , user_Ctx);//Chequeo y cargo el modulo segun la url actual y la cargo

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
                        console.log('Solicitud ajax ws_left_nav ok! ws_id:'+ ws_id);
                        // console.log('userCtx L nav doc 1');
                        //console.log(userCtx);
                        ///// IMPRIME ////
                        user_db.get('ws_left_nav_' + ws_id, function(err, doc) {
                            if (err) {
                                msj_alert(err);
                            }
                            user_db.put({
                              _id: 'ws_left_nav_' + ws_id,
                              _rev: doc._rev,
                              ws_left_nav: ws_left_nav,
                              userCtx: userCtx
                            }, function(err, response) {
                            if(response) {
                                //Si se guara el documento guardo una cookie de que ya fue instalado el wscada vez q cargo la pagina por primera vez q caduque todos los dias
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
                                           //Set opacity of element to 0 to close snackba
                                           $(element).css('opacity', 0);
                                           location.reload();
                                           //newWorker.postMessage({ action: 'install' });                                           
                                           //alert('Refrezcar pagina!');
                                       }
                                    });
                                return console.log(err);
                            }
                            //   msj_alert('Se actualizo el left_nav_doc','top-center');
                            //   console.log('userCtx L nav doc 3');
                            //  console.log(userCtx);
                             console.log('Se actualizo el left bar doc');
                             console.log(userCtx);
                             console.log(response);
                             // handle response
                            });
                        });
            }else{
                    console.log('ws_left_nav 2');
                    console.log(ws_left_nav);
                    alert( ws_left_nav.msj+ 'Workspace ID:'+ ws_left_nav.ws_id );
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
function chek_licence_msj(ws_left_nav) {

        //var ret = ws_left_nav['return'];
        console.log('ws_left_nav');
        console.log(ws_left_nav);
        if(ws_left_nav){

            alert('Hola ' + ws_left_nav);
        }else{

        }

};

chek_licence_msj();

//Leo el doc y imprimo la vista
function get_left_nav(ws_left_nav_data , ws_lang_data) {
              var ws_left_nav_doc = {
                  ws_left_nav_data: ws_left_nav_data.ws_left_nav,
                  ws_lang_data: ws_lang_data
              }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/body/left_nav.hbs', '#left_nav_compiled', ws_left_nav_doc);
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
};

////----(3 LEFT NAV CART)---/////
function get_right_nav(ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/cart/cart_main.hbs', '#right_main', ws_cart);
};


function updateHistory(curr) {
    window.location.lasthash.Push(window.location.hash);
    window.location.hash = curr;
}

//LEE LOS PARAMETROS DE LA URL Y LOS ENVIA A UN CHECK de Permisos
async function check_url_module() {
    var m_var_id = getParameterByName('v'); //Trae una variable del modulo idel modulo id
    var m_id = getParameterByName('id'); //Trae el modulo id
    var m_t_id = getParameterByName('t'); //Trae el Tipo de modulo id
    var m_name = getParameterByName('type'); //Trae el nombre del tipo de modulo
    check_content_module(m_name, m_t_id, m_id,m_var_id); //Envio el nomrbre de la url el array del leftnav el ws_lang_data al controlador q arma cekea los permisos
    //check_content_module(m_name, ws_left_nav, ws_lang_data); //Envio el nomrbre de la url el array del leftnav el ws_lang_data al controlador q arma cekea los permisos
}

//Chekea q los modulos del la URL tengan permisos de lectura
async function check_content_module(ws_module_name, m_t_id, m_id, m_var_id) {
    //Traigo el documento actualizado y lo recorro
    ws_module_array = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });   
    var array = ws_module_array.ws_left_nav.m;
    //Hago una consulta al array de modulos con permisos y lo comparo con el que estaba en el link
    for (var i=0; i<array.length; i++) { 
        //Si el nombre del modulo esta en el listado de permisos de
        if(array[i].m_url === ws_module_name ){
            ws_module_select = array[i].m_url;
          return  get_module_function(ws_module_select,m_t_id,m_id,m_var_id);
        }
        else{
        }
    }
};

//Filtra los parametros de la URL y lo relasiona y trae los modulos estan en la URL
async function get_module_function(ws_module_select,m_t_id,m_id,m_var_id) {
         const ws_m_s = ws_module_select;
         //compara si el modulo del la URL y Trae los modulos y las funciones segun la URL
        if(ws_m_s == 'catalog'){
               await get_catalog();
                //Si el tipo de modulo es producto envia los parametros a la funcion constructora
            if( m_t_id == 'product'){
                catalog_view_item_url(m_id,m_var_id, userCtx);
                //updateHistory();
            }
            if( m_t_id == 'edit'){
                catalog_edit_item_url(m_id,m_var_id, userCtx);
                //updateHistory();
            }
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
    var m_url = url_app +'?type=' + m_name; // Armo la url completa del linck
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


ws_module_config();// Ejecuto todas las funciones del espacio de trabajo


