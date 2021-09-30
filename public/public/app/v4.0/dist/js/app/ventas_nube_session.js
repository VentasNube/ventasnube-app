//###########################################################################################
// Creo una variable global con el objeto [ user_data:{} ]
// Donde guardo los datos de la sesion para poder usar los datos en toda la app
// El user_DB y el user_ws[ID] lo guardo con la la cokie con php 1 vez para traer los datos
//############################################################################################
//Uso this.a = 0; para declarar variables globales
//#############################################################################################
//Global variables
//##########################################################
//Creamos la cookie donde almacenamos el workspace que abrio la session
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/account";
}
//Limpiamos la cookie por una nueva
function eraseCookie(name) {
    createCookie(name, "", -1);
}
// Leemos la cookie para configurar la app
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Leemos la cookie seteada en el ws
var ws_id = readCookie("ws_select");

// Leemos la cookie seteada para offline mode
var ws_offline = readCookie("ws_offline");
if (ws_offline == 'true') {
    $('.offline_mode').attr('checked', ''); //Cambio el atributo no chekeado
} else if (ws_offline == 'false') {
    $('.offline_mode').removeAttr('checked'); //Cambio el atributo no chekeado
}

//Chek workspace seteado
if (!ws_id) {
    window.location = "/workspace/home";
}

var url_R_db = 'http://localhost:5984/'; //URL global de couchDB

var u_email = '';
var u_name = '';
var u_db = '';

var ws_setting_doc = '';
var userCtx = '';
var offline_mode = null; //Offline mode swich
// FUNCION SESSION DE USUARIO
/*
async function user_session() {
    try {
        //Creo la variable session y conceto con la DB
        var _session = url_R_db + '_session';
        _session = new PouchDB(url_R_db, { skip_setup: false });
        u_session = await _session.get('_session', { include_docs: true, descending: true }); // Conecto a la USER _session
        userCtx = u_session.userCtx; //Creo la variable global

        u_email = userCtx.name;
        u_name = u_session.firstname;

        u_db = 'userdb-' + nocodelog(userCtx.name); //User Db name
        user_db = new PouchDB(url_R_db + u_db, { skip_setup: false }); // Conecto a la USER DB

        ws_setting_doc = user_db.get('ws_setting_' + ws_id, { include_docs: true, descending: true });
        offline_mode = ws_setting_doc.offline_mode
        // console.log(ws_setting_doc.offline_mode)
        // alert(offline_mode)
        if (offline_mode) {
            L_user_db = new PouchDB(u_db, { skip_setup: false });
            R_user_db = user_db;
            L_user_db.sync(R_user_db, { live: true, retry: true, }); //sincronizo
            //var session = 'http://localhost:5984/__session '; //URL global de couchDB
            Snackbar.show({
                text: '<span class="material-icons">wifi_off</span>  Modo Offline Activado ',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'top-left',
                duration: 50000
            });
            //  alert('User Modo offline');
            // alert('Offline mode:'+offline_mode);
        } else {
            L_user_db = new PouchDB(url_R_db + u_db, { skip_setup: false });
        }
        this.user_data = {
            user_db: u_db,
            user_name: u_email,
            user_email: u_email,
            //user_roll: g_session.userCtx.roles,
            url_db: url_R_db + u_db,
            user_ws: ws_id
        }
        Snackbar.show({
            text: 'Bienvenido ' + u_name + '!',
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-center'
        });
    } catch (err) {
        Snackbar.show({
            text: 'No estas logeado!',
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-center'
        });
       // window.location = "/login";
    }
}*/
async function user_session() {
    try {
        //Creo la variable session y conceto con la DB
        var _session = url_R_db + '_session';
        _session = new PouchDB(url_R_db, { skip_setup: false });

        u_session = await _session.get('_session', { include_docs: true, descending: true }); // Conecto a la USER _session
       
        userCtx = u_session.userCtx; //Creo la variable global
        u_email = userCtx.name; // 
        u_name = u_session.firstname;

        u_db = 'userdb-' + nocodelog(userCtx.name); //User Db name
        user_db = new PouchDB(url_R_db + u_db, { skip_setup: false }); // Conecto a la USER DB

        ws_setting_doc = user_db.get('ws_setting_' + ws_id, { include_docs: true, descending: true });
        offline_mode = ws_setting_doc.offline_mode

        
        // console.log(ws_setting_doc.offline_mode)
        // alert(offline_mode)
        if (offline_mode) {


            L_user_db = new PouchDB(u_db, { skip_setup: false });
            R_user_db = user_db;
            L_user_db.sync(R_user_db, { live: true, retry: true, }); //sincronizo
            //var session = 'http://localhost:5984/__session '; //URL global de couchDB


            Snackbar.show({
                text: '<span class="material-icons">wifi_off</span>  Modo Offline Activado ',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'top-left',
                duration: 50000
            });
            //  alert('User Modo offline');
            // alert('Offline mode:'+offline_mode);
        } else {
          //  L_user_db = new PouchDB(url_R_db + u_db, { skip_setup: false });


        }

        L_user_db = new PouchDB(url_R_db + u_db, { skip_setup: false });

        //Cargo la variable global user_db dependiendo si es modo offline o modo online
        L_user_db = user_db;
        // Creo la variable User_data con los datos de la sesion
        this.user_data = {
            user_db: u_db,
            user_name: u_email,
            user_email: u_email,
            //user_roll: g_session.userCtx.roles,
            url_db: url_R_db + u_db,
            user_ws: ws_id
        }
        Snackbar.show({
            text: 'Bienvenido ' + u_name + '!',
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-center'
        });
    } catch (err) {
        Snackbar.show({
            text: 'No estas logeado!',
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-center'
        });
       // window.location = "/login";
    }
}
user_session();

async function ws_mode_offline() {
    var doc = await user_db.get('ws_setting_' + ws_id);
    if (doc) {
        var response = await user_db.put({
            _id: 'ws_setting_' + ws_id,
            _rev: doc._rev,
            ws_setting: ws_setting
        });
        //  alert('response PUT')
    } else {
        var response = await user_db.put({
            _id: 'ws_setting_' + ws_id,
            ws_setting: ws_setting
        });
    }
}

// R_user_db = new PouchDB(u_db);
function logout() {
    L_user_db.logOut(function(err, response) {
        if (response) {
            Snackbar.show({
                text: 'Cerrando sesion ' + response.name,
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            window.location = "/logout";
        } else if (err) {
            if (err) {
                // name or password incorrect
                Snackbar.show({
                    text: "No hay conexion a internet",
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
            } else {
                // cosmic rays, a meteor, etc.
                Snackbar.show({
                    text: "<span class='material-icons'>wifi_off</span> No hay conexion a internet intenta mas tarde",
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
            }
        }
    });
};

//Boton Offline
$(".offline_mode").click(function() {
    if (validaForm()) {
        const ws_offline = $(this).attr('checked'); // Tomo el parametro del atributo
        const name = 'ws_offline'
        if (ws_offline) {
            $(this).removeAttr('checked'); //Cambio el atributo no chekeado
            if (window.confirm("Quieres desactivar el modo offline?")) {
                //window.open("exit.html", "Thanks for Visiting!");
                createCookie(name, false);
            }
        } else {
            $(this).attr('checked');
            if (window.confirm("Quieres activar el modo offline?")) {
                //window.open("exit.html", "Thanks for Visiting!");
                createCookie(name, true);
            }
            //alert('Quieres desactivar el modo offline?');

        }
    }
});

//Funcion chekeo que esten las 2 sesiones abiertas o cierro y redirecciono al _session 
/*
function chek_session() {
    L_user_db.getSession(function(err, response) {
        if (err) {
            // network error
        } else if (!response.userCtx.name) {
            // nobody's logged in
            // setTimeout(function () { window.location = "/login"; }, 2000);
        } else {
            // response.userCtx.name is the current user
            $.ajax({
                url: "/account/user_data",
                // dataType: "html",
                //data: data,
                type: "POST",
                dataType: "json",
                success: function(response) {
                    if (response.result === true) { ///// IMPRIME ////
                        // window.location = "/account";
                        // alert('Estas logeado!');
                        Snackbar.show({
                            text: ' <span class="material-icons">sentiment_very_satisfied</span> Hola ' + response.user_name.username + ' Bienvenido!',
                            actionText: ' <span class="material-icons"> highlight_off </span>',
                            actionTextColor: "#0575e6",
                            pos: 'bottom-center',
                            duration: 5000
                        });
                    } else {
                        // alert('No esta logeado');
                        logout();
                        window.location = "/login";
                    }
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 404) {
                    // setTimeout(function () { window.location = "/account"; }, 2000);
                    Snackbar.show({
                        text: 'Error 404 La pagina no existe',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                }
            });

        }
    });
}
*/


async function getSession() {

    // user_session = await L_user_db.getSession();

    //   user_session = await L_user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
    /*   L_user_db.getSession(function(err, response) {
           if (err) {
               // network error
               get_top_bar();
               get_left_nav();
               // get_nav_cart();
           } else if (!response.userCtx.name) {
               // nobody's logged in
               // alert('no estas logeado')
               window.location = "/login";
               //  setTimeout(function () { window.location = "/login"; }, 2000);
           } else {
               // response.userCtx.name is the current user
               //  get_top_bar();
               // get_left_nav();
               // get_nav_cart();
               ws_module_config();
           }
       });*/

}