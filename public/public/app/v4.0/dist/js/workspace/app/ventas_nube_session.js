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
    document.cookie = name + "=" + value + expires + "; path=" + url_app_path;
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
const ws_id = readCookie('ws_select');
const u_email = readCookie('user_email');
const u_name = readCookie('u_name');
// Leemos la cookie seteada en el userDB
const userDb = readCookie('userDb');
//var user_db = readCookie ('userDb');
const u_db = readCookie("userDb");

//Configuracion global de mododal


$('#master_modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})

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
const ws_install = readCookie('ws_install-' + ws_id);
function chek_ws_updates() {
    // var cart_open = readCookie("cart_open_ws_"+ws_id);
    const ws_install = readCookie('ws_install-' + ws_id);
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
        var delay = 10000;
        setTimeout(function () {
            location.reload();
            // window.location = "/account";
        }, delay);
    }
}
chek_ws_updates();

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

// FUNCION LOGOUT
function logout() {
    user_db.logOut(function (err, response) {
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

//Creo y conecto con userDB local 
user_db = new PouchDB(u_db, { skip_setup: true });

//getSession();

user_db.sync(url_R_db + userDb, {
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
    if (err) {
        $('#cloud_sync_icon').html("<i class='material-icons'> sync_problem</i>");
        //   document.getElementById("cloud_sync_icon").innerHTML = "<i class='material-icons'> sync_problem</i>"
        //logout()
        var msj_error = "Hay un error inesperado";
        if (err.status === 401) {
            msj_error = '<i class="material-icons"> sync_problem</i> Tu sesion a expirado...';
        }
        if (err.status != 401) {
            msj_error = err.name;
        }
        //Imprimo el Mensaje de error en pantalla
        $('#master_modal').modal('show', function (event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            // var recipient = button.data('whatever') // Extract info from data-* attributes
            var recipient = 'Tu sesion expiro'; // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this)
            modal.find('.modal-title').text(recipient)
            // modal.find('.modal-body input').val(recipient)
            modal.find('.modal-body').html("<button type='button' onclick='logout()' class='btn xl btn-secondary '>Login</button>");
        });
        Snackbar.show({
            text: msj_error,
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Ingresar',
            actionTextColor: "#4CAF50",
            onActionClick: function (element) {     //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
                logout()
            }
        });

    }
});

var userCtx = '';
//Creo y conecto con userDB local 
u_session = new PouchDB(url_R_db, { skip_setup: true });
async function _session(ws_lang_data) {
    userCtx = await u_session.get('_session', { include_docs: true });
    return userCtx;
}

// Funcion para traer la hora minutoso segundos 
// se usa asi
// const { hour, minutes } = await getDateTimeMinutes();
/// 

async function getDateTime() {
let dateTimeStr = new Date(); // este es el formato original DD/MM/YYYY HH:MM:SS
let [day, month, yearTime] = dateTimeStr.split("/");
let [year, time] = yearTime.split(" ");
let isoDateTimeStr = `${year}-${month}-${day}T${time}Z`; // esto da "2021-03-18T18:45:10Z"
//const hour = currentDate.getHours();
//const minutes = currentDate.getMinutes();
console.log(isoDateTimeStr);
return { isoDateTimeStr };
}   

async function getDateTimeMinutes() {
    try {
      const currentDate = new Date();
      const hour = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      
      return { hour, minutes };
    } catch (error) {
      throw new Error('Error while retrieving date, hour, and minutes: ' + error.message);
    }
  }

  
_session();

