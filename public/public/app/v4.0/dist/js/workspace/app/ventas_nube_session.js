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

// ***** CONFIGURACIONES GLOBALES *****//
const url_site = 'http://localhost'
const url_R_db = 'http://localhost:5984/'; //URL global de couchDB REMOTO
const url_hbs = '/public/app/v4.0/dist/hbs/workspace/'; //URL global de couchDB REMOTO
const url_js = '/public/app/v4.0/dist/js/workspace/';


// Leemos la cookie seteada en el ws
const ws_id = readCookie ('ws_select');
const u_email = readCookie ('user_email');
const u_name = readCookie ('u_name');
// Leemos la cookie seteada en el userDB
const userDb = readCookie ('userDb');
//var user_db = readCookie ('userDb');
const u_db = readCookie("userDb");
const userCtx = '';
//Varianble global user_data

this.user_data = {
    user_db: u_db,
    user_name: u_name,
    user_email: u_email,
    url_db: url_R_db + u_db,
    user_ws: ws_id
}

//Chek workspace seteado en la cokie sino redirecciono al home
if (!ws_id) {
    window.location = "/workspace/home";
}
//Chekeo q se alla instalado todas las bases de datos y en especial la left bar y refrezco para inciar las dbs
const ws_install = readCookie ('ws_install-' + ws_id);
if (!ws_install) {
    // alert('Tenemos que instalar el whorkspace ');
       // window.onload = function () {
       //     alert("window load complete");
      //  }
        var delay = 3000;
        setTimeout(function(){ 
             location.reload();
            // window.location = "/account";
             }, delay);
}
else{
Snackbar.show({
    text: 'Bienvenido' + u_name + ' al WORKSPACE: '+ ws_id,
    actionText: 'ok',
    actionTextColor: "#0575e6",
    pos: 'bottom-center'
});
   // alert('Instalacion con exito! ' + ws_install);
}

//Creo y conecto con userDB local 
user_db = new PouchDB(u_db, { skip_setup: true });

user_db.sync(url_R_db+userDb, {
    live: true,
    retry: true
  }).on('change', function (change) {
    msj_alert('<span class="material-icons">wifi_off</span> Hay nuevos cambios', 'top-left');
    // yo, something changed!
  }).on('paused', function (info) {
    msj_alert('<span class="material-icons">wifi_off</span> Sincronización en pausa no hay internet.', 'bottom-center');
    // replication was paused, usually because of a lost connection
  }).on('active', function (info) {
    msj_alert('<span class="material-icons">wifi</span> Sincronización activa!', 'bottom-center');
    // replication was resumed
  }).on('error', function (err) {
    // totally unhandled error (shouldn't happen)
    msj_alert(err);
  });




  
/*
  db.get('charlie').then(function (charlie) {
    // Within this function, you can do
    // try/catch/return like you normally would,
    // and it will be handled asynchronously!
  }).then(function (result) {
    // If the previous function returned something
    // (or returned undefined), it will show up here
    // as "result".
  }).catch(function (err) {
    // If the previous function threw an error,
    // it will show up here as "err".
  });
*/

  if(offline_mode){
    msj_alert('<span class="material-icons">wifi</span>  Modo offline activado ', 'top-left') 
  }else{
    msj_alert('<span class="material-icons">wifi_off</span>  Modo offline Desactivado ', 'top-left') 
  }



//user_session();
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

/*
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
?*/
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
