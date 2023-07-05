////-----(FUNCIONES PARA CREAR LAS VISTAAS DEL BODY y NAVEGACION AJAX-----////

////// ============== BODY ventasnube APP  2021  ============================= //////
// 1 TRAIGO LOS DOCUMENTOS CON LA INFORMACIOND E LA ESTRUCTURA 
//// --- Top Bar ---- Left Nav --- Cart -- Fav -- Search --- acount --  buy 

//###--- Conection y Sync a la base de datos local ---#####
ws_info = null; // Doc con la info y configuracion del Ws
ws_lang_data = null; //Doc con el lenguaje
ws_left_nav = null; //DOC con los modulo
ws_left_nav_data = null;



// ACTUALIZO EL HISTORIAL DE NAVEGACION 
function updateHistory(curr) {
    window.location.lasthash.Push(window.location.hash);
    window.location.hash = curr;
}

//LEE LOS PARAMETROS DE LA URL Y LOS ENVIA A UN CHECK de Permisos
function check_url_module() {
    var m_var_id = getParameterByName('v'); //Trae una variable del modulo idel modulo id
    var m_id = getParameterByName('id'); //Trae el modulo id
    var m_t_id = getParameterByName('t'); //Trae el Tipo de modulo id
    // var m_t_name = getParameterByName('t'); //Trae el Tipo de modulo id
    var m_name = getParameterByName('type'); //Trae el nombre del tipo de modulo
    check_content_module(m_name, m_t_id, m_id, m_var_id); //Envio el nomrbre de la url el array del leftnav el ws_lang_data al controlador q arma cekea los permisos
}

//Chekea q los modulos del la URL tengan permisos de lectura
async function check_content_module(ws_module_name, m_t_id, m_id, m_var_id) {
    //Traigo el documento actualizado y lo recorro
    ws_module_array = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
    var array = ws_module_array.ws_left_nav.m;
    //Hago una consulta al array de modulos con permisos y lo comparo con el que estaba en el link
    for (const module of array) {
        if (module.m_url === ws_module_name) {
            ws_module_select = module.m_url;
            return get_module_function(ws_module_select, m_t_id, m_id, m_var_id);
        }
    }
};


/// MODULE CONFIG
async function ws_module_config() {
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
        registerHandlebarsHelpers();
        get_left_nav(ws_left_nav, ws_lang_data, user_Ctx);// Traigo y imprimo el documento de navegacion lateral 
        get_top_bar(ws_info, ws_lang_data,ws_left_nav_data, user_Ctx); // Imprimo el top bar
        get_right_cart(ws_info, ws_lang_data, ws_left_nav_data); 
        get_search_module(ws_info, ws_lang_data, user_Ctx, ws_left_nav_data); // Imprimo el search 
        put_left_nav_doc(); // Actualizo o envio la cokkie de navegacion lateral
        check_url_module(ws_left_nav, ws_lang_data, user_Ctx); // Chequeo y cargo el modulo segun la url actual y la cargo

    } catch (err) {
        put_left_nav_doc(); //Si hay un error vuelvo a traer el documento actualizado
        console.log('ws_module_config() err');
        console.log(err);
        Snackbar.show({
            text: err.reason,
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-left',
            duration: 50000
        });
    }
}

//Filtra los parametros de la URL y lo relasiona y trae los modulos estan en la URL
async function get_module_function(ws_module_select, m_t_id, m_id, m_var_id) {
    const ws_m_s = ws_module_select;
    //compara si el modulo del la URL y Trae los modulos y las funciones segun la URL
    if (ws_m_s == 'catalog') {
        await get_catalog();
            //  alert('traogo el catalogo')
            //  Si el tipo de modulo es producto envia los parametros a la funcion constructora
        if (m_t_id == 'product') {
            catalog_view_item_url(m_id, m_var_id, userCtx);
           // updateHistory();
        }
        if (m_t_id == 'edit') {
            catalog_edit_item_url(m_id, m_var_id, userCtx);
          //  updateHistory();
        }
        if (m_t_id == 'create') {
            catalog_edit_item_url(m_id, m_var_id, userCtx);
          //  updateHistory();
        }
        if (m_t_id == 'new') {
            catalog_new_item(m_id, m_var_id, userCtx);
          //  updateHistory();
        }
        //  get_items_catalog();
    }
    else if (ws_m_s == 'board') {
       //alert('GET MODULE FUNCION OK');
       console.log('GET MODULE FUNCION OK');
       ws_board_start();
       get_board(m_t_id);
       get_right_cart(ws_info, ws_lang_data, ws_left_nav_data); 
        //ws_board_start();
        // get_box();
    }
    else if (ws_m_s == 'contact') {
        //alert('GET MODULE FUNCION OK');
        console.log('GET MODULE CONTACT OK');
        get_contact(m_t_id);
     }
    else if (ws_m_s == 'account') {
        alert('TRAIGO EL account');
    }
    else if (ws_m_s == 'box') {
        alert('TRAIGO EL box');
        // get_box();
    }
};


////----(1 LEFT NAV)---/////
//Creo el doc y lo guardo el la db
function put_left_nav_docOLDOK() {
    // DOC DE NAVEGACION
    ws_left_nav = user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
    if (ws_left_nav) {
    }
    $.ajax({
        url: "/body/left_nav",
        type: "POST",
        dataType: "json",
        success: function (ws_left_nav) {
            if (ws_left_nav.result == true) {
                console.log('Solicitud ajax ws_left_nav ok! ws_id:' + ws_id);
                // console.log('userCtx L nav doc 1');
                console.log(userCtx);
                console.log('ws_left_nav');
                console.log(ws_left_nav);

                ///// IMPRIME ////
                user_db.get('ws_left_nav_' + ws_id, function (err, doc) {
                    if (err) {
                        msj_alert(err);
                        alert('Falta el archivo ws_left_nav');

                        user_db.put({
                            _id: 'ws_left_nav_' + ws_id,
                            ws_left_nav: ws_left_nav,
                            userCtx: userCtx
                        });

                        user_db.changes().on('change', function () {
                            Snackbar.show({
                                text: 'New changes in (Ws_left_nav)',
                                width: '475px',
                                actionTextColor: '#ff0000',
                                actionText: 'Refrezcar',
                                pos: 'bottom-center',
                                onActionClick: function (element) {
                                    $(element).css('opacity', 0);
                                    location.reload();
                                }
                            });
                        });
                    }
                    user_db.put({
                        _id: 'ws_left_nav_' + ws_id,
                        _rev: doc._rev,
                        ws_left_nav: ws_left_nav,
                        userCtx: userCtx
                    }, function (err, response) {
                        if (response) {
                            //Si se guara el documento guardo una cookie de que ya fue instalado el wscada vez q cargo la pagina por primera vez q caduque todos los dias
                            createCookie('ws_install-' + ws_id, true), 30;
                            //Si se carga el left nav ya se carga como instalada la app en una COchkie q uso para comprobar
                        }
                        else if (err) {
                            // msj_alert(err);
                            Snackbar.show({
                                text: err.reason,
                                width: '475px',
                                actionTextColor: '#ff0000',
                                actionText: 'Refrezcar',
                                pos: 'bottom-center',
                                onActionClick: function (element) {
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
                        console.log(ws_left_nav);
                        // handle response
                    });
                });

            } else {
                //console.log('ws_left_nav 2');
                // console.log(ws_left_nav);
                alert(ws_left_nav.msj + 'Workspace ID:' + ws_left_nav.ws_id);
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


function put_left_nav_doc() {
    // DOC DE NAVEGACION
    try {
        // Código que puede generar errores en PouchDB
        // ...
    ws_left_nav = user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
    // Verificar si el documento ya existe y tiene una revisión (_rev)
    if (ws_left_nav && ws_left_nav._rev) {
        // El documento ya existe, mostrar una alerta o realizar alguna acción apropiada
        alert('El documento ya ha sido editado. Se encontró un conflicto de documentos.');
        return;
    }
    //Hago la consulta de permisos al serverer
    fetch("/body/left_nav", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ws_left_nav)
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === true) {
            console.log('SE BUSCAN CAMBIOS EN EL DOCUMENTO LEFT_NAV:');
            console.log(userCtx);
            console.log(data);
           // console.log('ws_left_nav');

            user_db.get('ws_left_nav_' + ws_id, function (err, doc) {
                if (err) {
                    msj_alert(err);
                   // alert('Falta el archivo ws_left_nav');
                    user_db.put({
                        _id: 'ws_left_nav_' + ws_id,
                        ws_left_nav: data,
                        userCtx: userCtx
                    });
                    user_db.changes().on('change', function () {
                        Snackbar.show({
                            text: 'HAY CANBIOS El LEFT NAV',
                            width: '475px',
                            actionTextColor: '#ff0000',
                            actionText: 'Refrescar',
                            pos: 'bottom-center',
                            onActionClick: function (element) {
                                $(element).css('opacity', 0);
                                location.reload();
                            }
                        });
                    });
                } else {
                    user_db.put({
                        _id: 'ws_left_nav_' + ws_id,
                        _rev: doc._rev,
                        ws_left_nav: data,
                        userCtx: userCtx
                    }, function (err, response) {
                        if (response) {
                            createCookie('ws_install-' + ws_id, true, 30);
                        } else if (err) {
                            Snackbar.show({
                                text: err.reason,
                                width: '475px',
                                actionTextColor: '#ff0000',
                                actionText: 'Refrescar',
                                pos: 'bottom-center',
                                onActionClick: function (element) {
                                    $(element).css('opacity', 0);
                                    location.reload();
                                }
                            });
                            console.log(err);
                        }
                        console.log('SE ACTUALIZO EL LEFT NAV');
                        console.log(userCtx);
                        console.log(data);
                       // console.log(response);
                    });
                }
            });
        } else {
            /*Snackbar.show({
                text: err.reason,
                width: '475px',
                actionTextColor: '#ff0000',
                actionText: 'Refrescar',
                pos: 'bottom-center',
                onActionClick: function (element) {
                    $(element).css('opacity', 0);
                    location.reload();
                }
            });*/
            alert(data.msj + 'Workspace ID: ' + data.ws_id);
        }
    })
    .catch(error => {
        Snackbar.show({
            text: error.reason,
            width: '475px',
            actionTextColor: '#ff0000',
            actionText: 'Refrescar',
            pos: 'bottom-center',
            onActionClick: function (element) {
                $(element).css('opacity', 0);
                location.reload();
            }
        });
        if (error.name === 'AbortError') {
            // La solicitud fue cancelada
            return;
        }
        // Manejar errores de Fetch
        console.log('Error de Fetch:', error);
    });
} catch (error) {
    console.error('Se produjo un error en ws_left_nav:', error);
    // Maneja el error según tus necesidades
  }

}


//Leo el doc y imprimo la vista
function get_left_nav(ws_left_nav_data, ws_lang_data) {
    var ws_left_nav_doc = {
        ws_left_nav_data: ws_left_nav_data.ws_left_nav,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/body/left_nav.hbs', '#left_nav_compiled', ws_left_nav_doc);
};

/// ENVIO LOS PARAMETROS DEL MODULO Y LO COMPILADO
////----(2 TOP BAR)---/////
function get_top_bar(ws_info, ws_lang_data, ws_left_nav_data) {
  
    var ws_top_bar = {
        ws_top_bar: ws_info,
        user: user_data,
        ws_lang_data: ws_lang_data,
        ws_left_nav_data:ws_left_nav_data
        
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


//// BOTON TRAE MODULO LEFT BAR //
async function get_module_nav(event) {
    var m_name = $(event).attr('s_url_t_m'); //Trae Pacht url /pacht/    
    var m_url = url_app + '?type=' + m_name; // Armo la url completa del linck
    history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion          
    check_content_module(m_name, ws_left_nav, ws_lang_data);
}
/// FUNCION TRAE MODULE TIPE NAV BAR
async function get_module_type_nav(event) {
    var m_name = $(event).attr('s_url_t_m'); //Trae Pacht url /pacht/
    var m_type_name = $(event).attr('m_t_url'); //Trae Pacht url /pacht/
    //  var m= $(event).attr('s_url_t_m'); //Trae Pacht url /pacht/
    // var m_t_id = $(event).attr('m_t_id'); //Trae Pacht url /pacht/
    var m_url = url_app + '?type=' + m_name+ '&t=' + m_type_name; // Armo la url completa del linck
    history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion
    $('.cart_button').attr('board_name',m_type_name);        
    check_content_module(m_name,m_type_name);
}

////----(OTRAS COSAS)----/////
//Efecto material de los Label imput 2021
////----( EJECUTO TODAS LAS FUNCIONES UNA VEZ Q SE BAJE EL .HBS  )----/////

$(document).ready(function () {
    window.onload = ws_module_config();// Ejecuto todas las funciones del espacio de trabajo
});




