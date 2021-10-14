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
    document.cookie = name + "=" + value + expires + "; path=/workspace";
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

// Leemos la cookie seteada para offline mode
var ws_offline = readCookie("ws_offline");

if (ws_offline == 'true') {
    var offline_mode = true; 
    $('.offline_mode').attr('checked', ''); //Cambio el atributo no chekeado
} else if (ws_offline == 'false') {
    var offline_mode = null; 
    $('.offline_mode').removeAttr('checked'); //Cambio el atributo no chekeado
}


var url_R_db = 'http://localhost:5984/'; //URL global de couchDB REMOTO

// Leemos la cookie seteada en el ws
var ws_id = readCookie ('ws_select');
var u_email = readCookie ('user_email');
var u_name = readCookie ('u_name');
// Leemos la cookie seteada en el userDB
var userDb = readCookie ('userDb');
//var user_db = readCookie ('userDb');
var u_db = readCookie("userDb");
var userCtx = '';

//Chek workspace seteado en la cokie sino redirecciono al home
if (!ws_id) {
    window.location = "/workspace/home";
}

this.user_data = {
    user_db: u_db,
    user_name: u_name,
    user_email: u_email,
    url_db: url_R_db + u_db,
    user_ws: ws_id
}

//alert(ws_id);

//Creo y conecto con userDB local 
user_db = new PouchDB(u_db, { skip_setup: false });
// FUNCION SESSION DE USUARIO
async function user_session() {
    try {
        user_db = new PouchDB(url_R_db + u_db, { skip_setup: false });
        //sincronizo
        user_db.sync(u_db, { live: true, retry: true, }); 
        //FILTRO SI ESTA MODO OFFLINE O MODO ONLINE ACTIVADO
        if (offline_mode) {
             //Conecto a la DB LOCAL
             user_db = new PouchDB(url_R_db + u_db, { skip_setup: false });
            // sincronizo
            // user_db.sync(url_R_db + u_db, { live: true, retry: true, }); 
            // user_db = L_user_db;
            //Creo el array de user Data
            Snackbar.show({
                text: '<span class="material-icons">wifi_off</span>  Modo offline activado ',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'top-left',
                duration: 50000
            });

        } else {

        //Conecto a la DB remota de UserDB si no esta modo offline activado
        //Conecto a la DB LOCAL
        user_db = new PouchDB(url_R_db + u_db, { skip_setup: false });
        //sincronizo
        user_db.sync(u_db, { live: true, retry: true, }); 
        //user_db = L_user_db;
        Snackbar.show({
            text: 'Bienvenido ' + u_name + '!',
            actionText: 'ok',
            actionTextColor: "#0575e6",
            pos: 'bottom-center'
        });
    }
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

Snackbar.show({
    text: 'Bienvenido' + u_name + 'ws_id:'+ws_id,
    actionText: 'ok',
    actionTextColor: "#0575e6",
    pos: 'bottom-center'
});

user_session();
// FUNCION LOGOUT
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
