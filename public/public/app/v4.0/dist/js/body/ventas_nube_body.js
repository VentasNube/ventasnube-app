////-----(FUNCIONES PARA CREAR LAS VISTAAS DEL BODY y NAVEGACION AJAX-----////

// Traigo a configuracion del documento /ws_info_77/ws_module_config
/*
(async() => {
    var init = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    };
    //  alert(data);
    try {
        var response = await fetch('/body/left_nav', init); //Busca los permisos de los modulos
        var datos = await response.json();

        if (datos.result == true) {
            try {
                //  ws_left_nav = await L_ws_info_db.put('ws_left_nav' + ws_id, { include_docs: true, descending: true });
                var doc = await L_user_db.get('ws_left_nav_' + ws_id); //Busco el doc de left nav de el ws
                if (doc) {
                    var response = await L_user_db.put({
                        _id: 'ws_left_nav_' + ws_id,
                        _rev: doc._rev,
                        ws_left_nav: datos
                    });
                    //  alert('response PUT')
                } else {
                    var response = await L_user_db.put({
                        _id: 'ws_left_nav_' + ws_id,
                        ws_left_nav: datos
                    });
                }
                //  console.log(ws_left_nav);
                return get_left_nav(ws_left_nav);
            } catch (err) {
                console.log(err);
            }

        } else {
            Snackbar.show({
                text: datos.msj,
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            throw new Error(response.statusText);
        }
    } catch (err) {
        Snackbar.show({
            text: "Error al realizar la petición left nav: " + err.message,
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
        console.log("Error al realizar la petición left nav: " + err.message);
    }
})();
*/

////// ============== BODY ventasnube APP  2021  ============================= //////
// 1 TRAIGO LOS DOCUMENTOS CON LA INFORMACIOND E LA ESTRUCTURA 
//// --- Top Bar ---- Left Nav --- Cart -- Fav -- Search --- acount --  buy 

/*
(async() => {
    var init = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    };
    //  alert(data);
    try {
        var response = await fetch('/body/left_nav', init); //Busca los permisos de los modulos
        var datos = await response.json();

        if (datos.result == true) {
            try {
                //  ws_left_nav = await L_ws_info_db.put('ws_left_nav' + ws_id, { include_docs: true, descending: true });
                var doc = await L_user_db.get('ws_left_nav_' + ws_id); //Busco el doc de left nav de el ws
                if (doc) {
                    var response = await L_user_db.put({
                        _id: 'ws_left_nav_' + ws_id,
                        _rev: doc._rev,
                        ws_left_nav: datos
                    });
                    //  alert('response PUT')
                } else {
                    var response = await L_user_db.put({
                        _id: 'ws_left_nav_' + ws_id,
                        ws_left_nav: datos
                    });
                }
                //  console.log(ws_left_nav);
                return get_left_nav(ws_left_nav);
            } catch (err) {
                console.log(err);
            }

        } else {
            Snackbar.show({
                text: datos.msj,
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            throw new Error(response.statusText);
        }
    } catch (err) {
        Snackbar.show({
            text: "Error al realizar la petición left nav: " + err.message,
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
        console.log("Error al realizar la petición left nav: " + err.message);
    }
})();

*/

// Realiza la conexion a las bases de datos una por una, y devuelve un resultado con un error o un objeto del modulo, icono, name, id,

//Funcion chek _session

/*
var doc = await L_user_db.get('ws_left_nav_' + ws_id); //Busco el doc de left nav de el ws
L_user_db.getSession(function (err, response) {
    if (err) {
        // network error
    } else if (!response.userCtx.name) {
        // nobody's logged in
       // setTimeout(function () { window.location = "/login"; }, 2000);
    } else {
        // response.userCtx.name is the current user        
        $.ajax({
        url: "/body/left_nav",
        // dataType: "html",
        //data: data,
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (response.result == true) { ///// IMPRIME ////
               // window.location = "/account";
            }else{
             //   logout()
                //setTimeout(function () { window.location = "/account"; }, 2000);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
               // setTimeout(function () { window.location = "/account"; }, 2000);
                Snackbar.show({
                    text: 'Debes iniciar sesion',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
            }
    });

    }
});
*/






//var ws_info = ws_info;
//###--- Conection y Sync a la base de datos local ---#####
async function ws_module_config() {
    var ws_info_db = 'ws_info_' + ws_id;
    try {
        //Variable global con las DB de serach local
        if (offline_mode == 1) {
            // Si esta activo el modo offline
            L_ws_info_db = await new PouchDB(ws_info_db); // Creo la db local
            R_ws_info_db = await new PouchDB(url_R_db + ws_info_db, { skip_setup: false }); //Llamo a la db remota
            L_ws_info_db.sync(R_ws_info_db, { live: true, retry: true, }); //sincronizo
            ws_info = await L_ws_info_db.get('ws_module_config', { include_docs: true, descending: true });
        } else {
            // Si no esta activo el modo offline
            // Conecto a db info
            L_ws_info_db = await new PouchDB(url_R_db + ws_info_db, { skip_setup: false });
            // DOC DE CONFIG
            ws_info = await L_ws_info_db.get('ws_module_config', { include_docs: true, descending: true });
            // DOC DE LEGUAJE
            ws_lang_data_doc = await L_ws_info_db.get('ws_lang_sp', { include_docs: true, descending: true });
            // DOC DE MODULOS
            ws_left_nav = await L_user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });

            //Mapeo el objeto
            var ws_lang = ws_lang_data_doc;
            //SETEO EL ARRAY CON EL IDIOMA
            ws_lang_data = ws_lang['ws_lang_es'];
            //Envio los datos a la funciones y imprimo

            get_top_bar(ws_info, ws_lang_data);
            get_nav_cart(ws_info, ws_lang_data);
            get_search_module(ws_info, ws_lang_data);
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

// Realiza la conexion a las bases de datos una por una, y devuelve un resultado con un error o un objeto del modulo, icono, name, id,
async function get_ws_module_db(ws_db_name) {
    const ws_name_db = 'ws_info_' + ws_id;
    try {
        // const ws_db_name = ws_db_name;
        const ws_name_db = 'ws_' + ws_db_name + '_' + ws_id;
        R_ws_module_db = await new PouchDB(url_R_db + ws_name_db, { skip_setup: false });
        ws_module_array = await R_ws_module_db.get('ws_module_config', { include_docs: true, descending: true });

        //  const nombre = await getNombreAsync('mortegac')
        //   alert('get_ws_module_db')
        console.log(ws_module_array)
    } catch (e) {
        console.log(`Error: ${e}`)

    }
}


//PRUEBA DE FUNCION
ws_db_name = 'info';
//alert('holaaaaaa');
get_ws_module_db(ws_db_name);



//Nueva funcion de Left nav

function get_left_nav(ws_left_nav) {
        /* var ws_left_nav_array = {
            ws_left_nav: ws_left_nav_doc,
            ws_lang_data: ws_lang_data
        }*/
        $.ajax({
            url: "/body/left_nav",
            // dataType: "html",
            //data: data,
            type: "POST",
            dataType: "json",
            success: function (left_nav_doc) {
                if (left_nav_doc.result == true) { ///// IMPRIME ////
                    // window.location = "/account";
                    console.log ('CONTENIDO DE LEFT');
                   // console.log (left_nav_doc);
                L_user_db.get('ws_left_nav_' + ws_id, function(err, doc) {
                    // response.userCtx.name is the current user        
                    if (err) { 
                        console.log ('No se encuentra el documento');
                        L_user_db.put({
                            _id: 'ws_left_nav_' + ws_id, 
                            ws_left_nav: left_nav_doc
                          }, function(err, response) {
                            if (err) { return console.log(err); }

                            console.log ('Creo un doc nuevo');
                            // handle response
                          });
                        
                        return console.log(err);
                    
                    }
                    
                  });

                  renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/body/left_nav.hbs', '#left_nav_compiled', left_nav_doc);

                }else{

               //     renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/body/left_nav.hbs', '#left_nav_compiled', ws_left_nav);
                    //   logout()
                    //setTimeout(function () { window.location = "/account"; }, 2000);
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 404) {
                // setTimeout(function () { window.location = "/account"; }, 2000);
                    Snackbar.show({
                        text: 'Debes iniciar sesion',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/body/left_nav.hbs', '#left_nav_compiled', left_nav_doc);
                }
        });

};


get_left_nav();


/// ENVIO LOS PARAMETROS DEL MODULO Y LO COMPILADO
////----(1 TOP BAR)---/////
function get_top_bar(ws_info, ws_lang_data) {
    var ws_top_bar = {
        ws_top_bar: ws_info,
        user: user_data,
        ws_lang_data: ws_lang_data
    }
    console.log('ws_lang_data')
    console.log(ws_top_bar)
        // console.log(ws_top_bar);
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/body/top_bar.hbs', '#top_nav_compiled', ws_top_bar);
};

////----(3 LEFT NAV CART)---/////
function get_nav_cart(ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/cart/cart_main.hbs', '#right_main_compiled', ws_cart);
    // $('#cart_user_input').focus();
};

////----(2 LEFT NAV)---/////

// Imprimo en pantalla los el array con los modulos
function get_left_nav_OLD(ws_left_nav) {
    /* var ws_left_nav_array = {
         ws_left_nav: ws_left_nav_doc,
         ws_lang_data: ws_lang_data
     }*/
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/body/left_nav.hbs', '#left_nav_compiled', ws_left_nav);
};

////----(4 Search Module)---/////
function get_search_module(ws_info, ws_lang_data) {
    var ws_search_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    console.log('search');
    console.log(ws_search_data);
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/search/search_module.hbs', '#search_module_compiled', ws_search_data);
};

//// BOTON SELECT MODULO LEFT BAR //
// Logica q trae el modulos con handelbars no el linck
$(document).on('click', 'a.l_nav_m', function(event) {
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
$(document).on('click', 'a.l_nav_t_m', function(event) {
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
        //get_nav_bar(m_id, m_t_id); // Recargo los datos del modulos al copilador handelbars del modulo.
        // get_board_group(m_id, m_t_id);
    get_content_module();
});

////----(OTRAS COSAS)----/////
//Efecto material de los Label imput 2021
////----( EJECUTO TODAS LAS FUNCIONES UNA VEZ Q SE BAJE EL .HBS  )----/////
$(document).ready(function() {
    window.onload =
        $(".material_input").focusout(function() {
            var input_tex = $(this).children('input').val();
            if (!input_tex) {
                $(this).children('label').css({ "top": "15px", "font-size": "18px" });
                $(this).children('label').children('span').css({ "font-size": "24px" });
                //$(this).prev('label span').css({ "font-size": "10px" });
            }
        });
    $(".material_input").focusin(function() {
        $(this).children('label').css({ "top": "5px", "font-size": "13px" });
        $(this).children('label').children('span').css({ "font-size": "18px" });
    });

});


ws_module_config()


/*
(async () => {
    const rawResponse = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: 1, b: 'Textual content'})
    });
    const content = await rawResponse.json();
  
    console.log(content);
  })();
*/
//Traigo el documento de configuracion del modulo, y devuelvo el ojeto module 

// Realiza la conexion a las bases de datos una por una, y devuelve un resultado con un error o un objeto del modulo, icono, name, id,

/*async function get_ws_module_config(ws_db_name) {
    // var ws_name_db = 'ws_info_' + ws_id;
    try {
        // const ws_db_name = ws_db_name;
        const ws_name_db = 'ws_' + ws_db_name + '_' + ws_id;
        R_ws_module_db = await new PouchDB(url_R_db + ws_name_db, { skip_setup: false });
        ws_module_array = await R_ws_module_db.get('ws_module_config', { include_docs: true, descending: true });

        //  const nombre = await getNombreAsync('mortegac')
        alert('holaaaaaa')
        console.log(ws_module_array)
    } catch (e) {
        console.log(`Error: ${e}`)

    }
}

*/

/*
async function ws_module_auth() {

    //Traigo el doc con los modulos activos del wspace
    var ws_info_db = 'ws_info_' + ws_id;
    try {
        //Variable global con las DB de serach local
        if (offline_mode == 1) {
            // Si esta activo el modo offline
            L_ws_info_db = await new PouchDB(ws_info_db); // Creo la db local
            R_ws_info_db = await new PouchDB(url_R_db + ws_info_db, { skip_setup: false }); //Llamo a la db remota
            L_ws_info_db.sync(R_ws_info_db, { live: true, retry: true, }); //sincronizo
            ws_info = await L_ws_info_db.get('ws_module_config', { include_docs: true, descending: true });
        } else {
            // Si no esta activo el modo offline
            // Conecto a db info
            L_ws_info_db = await new PouchDB(url_R_db + ws_info_db, { skip_setup: false });
            // DOC DE CONFIG
            ws_info = await L_ws_info_db.get('ws_module_config', { include_docs: true, descending: true });
            // DOC DE MODULOS
            ws_left_nav = await L_user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
            // DOC DE LEGUAJE
            ws_lang_data_doc = await L_ws_info_db.get('ws_lang_sp', { include_docs: true, descending: true });

            //Mapeo el objeto
            var ws_lang = ws_lang_data_doc;
            //SETEO EL ARRAY CON EL IDIOMA
            ws_lang_data = ws_lang['ws_lang_es'];
            //Envio los datos a la funciones y imprimo
            get_top_bar(ws_info, ws_lang_data);
            get_nav_cart(ws_info, ws_lang_data);
            get_search_module(ws_info, ws_lang_data);
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
*/
//Hace un bucle for recoore el array con todos los modulos disponibles segun el documento de configuracion, 
//Y si la db le responde Ok le devuelve el objeto de configuracion del modulo con los datos del modulos icono nombre etc
//Cuando le responde ok guarda esos datos de respuesta en un array nuevo con push y lo guarda en un documento en la base de datos del usuario
/*
async function get_ws_module_array(ws_db_name) {
    // var ws_name_db = 'ws_info_' + ws_id;
    try {
        // const ws_db_name = ws_db_name;
        const ws_name_db = 'ws_' + ws_db_name + '_' + ws_id;
        R_ws_module_db = await new PouchDB(url_R_db + ws_name_db, { skip_setup: false });
        ws_module_array = await R_ws_module_db.get('ws_module_config', { include_docs: true, descending: true });

        //  const nombre = await getNombreAsync('mortegac')
        // alert('get_ws_module_array');
        console.log(ws_module_array)
    } catch (e) {
        console.log(`Error: ${e}`)

    }
}


get_ws_module_array();
*/

// Realiza la conexion a las bases de datos una por una, y devuelve un resultado con un error o un objeto del modulo, icono, name, id,
/*
async function check_ws_module_auth(ws_db_name) {
    // var ws_name_db = 'ws_info_' + ws_id;
    try {
        // const ws_db_name = ws_db_name;
        const ws_name_db = 'ws_' + ws_db_name + '_' + ws_id;
        R_ws_module_db = await new PouchDB(url_R_db + ws_name_db, { skip_setup: false });
        ws_module_array = await R_ws_module_db.get('ws_module_config', { include_docs: true, descending: true });

        _session
        //  const nombre = await getNombreAsync('mortegac')
        alert('check_ws_module_auth')
        console.log(ws_module_array)
    } catch (e) {
        console.log(`Error: ${e}`)

    }
}
*/