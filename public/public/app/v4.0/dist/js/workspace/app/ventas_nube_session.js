//###########################################################################################
// Creo una variable global con el objeto [ user_data:{} ]
// Donde guardo los datos de la sesion para poder usar los datos en toda la app
// El user_DB y el user_ws[ID] lo guardo con la la cokie con php 1 vez para traer los datos
//############################################################################################
//Uso this.a = 0; para declarar variables globales
//############################################################################################
//Global variables
//##########################################################


// ***** CONFIGURACIONES GLOBALES *****//
const url_site = 'http://localhost'
const url_app_path = '/workspace/app'

const url_app = 'http://localhost/workspace/app'
const url_R_db = 'http://localhost:5984/'; //URL global de couchDB REMOTO
const url_hbs = '/public/app/v4.0/dist/hbs/workspace/'; //URL global de couchDB REMOTO
const url_js = '/public/app/v4.0/dist/js/workspace/';

//Creamos la cookie donde almacenamos el workspace que abrio la session
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path="+url_app_path;
}

//Limpiamos la cookie por una nueva
function eraseCookie(name) {
    createCookie(name, "", -1);
}

// Leemos las cookies
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
const ws_id = readCookie ('ws_select');
const u_email = readCookie ('user_email');
const u_name = readCookie ('u_name');
// Leemos la cookie seteada en el userDB
const userDb = readCookie ('userDb');
//var user_db = readCookie ('userDb');
const u_db = readCookie("userDb");
var userCtx = '';

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
function chek_ws_updates() {
   // var cart_open = readCookie("cart_open_ws_"+ws_id);
    const ws_install = readCookie ('ws_install-' + ws_id);
        if (ws_install == 'true') {
            $('#modal_master').addClass('hidden');
            Snackbar.show({
                text: 'Bienvenido ' + u_name + ' VentasNube esta actualizado!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'bottom-center'
            });
        } else {
            // $('#modal_master').removeClass('move-right');
            var delay = 15000;
            setTimeout(function(){ 
                 location.reload();
                // window.location = "/account";
                 }, delay);
        }
}
chek_ws_updates() ;

//Creo y conecto con userDB local 
u_session = new PouchDB(url_R_db, { skip_setup: true });
 // DOC DE CONFIGURACION GENERAL PERMISOS Y SESIONES
 // FORMATO DE ROLES POR MODULO PERMISOS PARA TODOS LOS MODULOS:
            //1 owner  PUEDE LEER, ESCRIBIR, EDITAR, ELIMINAR, NOMBRAR owner...
            //2 admin  PUEDE LEER, ESCRIBIR, EDITAR, ELIMINAR, AGREGAR COLAB...
            //3 edit   PUEDE LEER, ESCRIBIR, EDITAR
            //4 write  PUEDE LEER, ESCRIBIR,
            //5 reed   PUEDE LEER
 // owner : ws_xxxxx_modulo_OWNER
 // ADMIN: ws_xxxxx_modulo_admin
 // LECTURA: ws_xxxxx_modulo_reed
 // ESCRITURA: ws_xxxxx_modulo_write
 // EDICION:  ws_xxxxx_modulo_edit  
 // ELMINACION: ws_xxxxx_modulo_delet

//Varianble global user_data
/*
var module = 'catalog';
var reed = 'ws_'+ ws_id +'_'+module +'_reed';
var write = 'ws_'+ ws_id +'_'+ module + '_write';
var edit = 'ws_'+ ws_id +'_'+ module + '_edit';
var del = 'ws_'+ ws_id +'_'+ module + '_del';
var admin = 'ws_'+ ws_id +'_'+ module +'_admin';
*/

//Creo y conecto con userDB local 
user_db = new PouchDB(u_db, { skip_setup: true });

//getSession();

user_db.sync(url_R_db+userDb, {
    live: true,
    retry: true,
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
    if(err){
        $('#cloud_sync_icon').html("<i class='material-icons'> sync_problem</i>");
    //   document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons'> sync_problem</i>"
    //logout()
    }
    if (err.name === 'Unauthorized') {
        Snackbar.show({
            text: '<i class="material-icons"> sync_problem</i> Tu sesion a expirado...',
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
        
    // conflict!
    }
    if (err.name === 'conflict') {
        Snackbar.show({
            text: err.name,
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
    // conflict!
    } else {
        //$('#cloud_sync_icon').html("<i class='material-icons'> sync_problem</i>");
        Snackbar.show({
            text: err.name,
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
    // some other error
    }
  });




  async function _session(){
    userCtx = await u_session.get('_session', { include_docs: true});
    console.log("userCtx remota");
    console.log(userCtx);
 }



 _session();

// FUNCION LOGOUT
function logout() {
    user_db.logOut(function(err, response) {
        if (response) {
            Snackbar.show({
                text: 'Cerrando sesion ' + response.name,
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            window.location = "/workspace/logout";
        } else if (err) {
            if (err) {
                // name or password incorrect
                Snackbar.show({
                    text: err,
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
                window.location = "/workspace/logout";
            }
        }
    });
};

//Boton Offline

/*

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
//user_db.debug.enable('*'); //Activo el depurador de cuchdb
//user_session();

user_db.getSession(function (err, response) {
    if (err) {
        // network error
    } else if (!response.userCtx.name) {
        // nobody's logged in
       // setTimeout(function () { window.location = "/login"; }, 2000);
    } else {
        // response.userCtx.name is the current user
        $.ajax({
        url: "/body/user_data",
        // dataType: "html",
        //data: data,
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (response.result == true) { ///// IMPRIME ////
                window.location = "/account";
            }else{
                logout()
                //setTimeout(function () { window.location = "/account"; }, 2000);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                setTimeout(function () { window.location = "/account"; }, 7000);
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
