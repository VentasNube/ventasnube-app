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
window.user_data = {
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
user_db.sync(url_R_db + userDb, {
  live: true,
  retry: true,
});

// Creo y conecto con userDB local 
const u_session = new PouchDB(url_R_db, { skip_setup: true });

function _session(callback) {
  u_session.get('_session', { include_docs: true })
    .then(function(result) {
      userCtx = result;
     // console.log('userCtx 1:', userCtx);
      callback(null, userCtx);
    })
    .catch(function(error) {
      callback(error, null);
    });
}

_session(function(error, userCtx_new) {
  if (error) {
    console.error(error);
  //  console.log('_session userCtx:',userCtx);
    // Manejar el error de alguna manera
  } else {
    // Utilizar userCtx dentro de la función de callback
   var userCtx =  userCtx_new;
  // console.log('userCtx',userCtx)
   return userCtx
  }
});


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

/// 2023 UPDATE COMPACTACION DE WORKSPACE
// Variables globales
// Función para realizar la auto compactación de las bases de datos
async function auto_compact_db() {
  try {

    let L_board_db = { compactedFiles: 0, docCount: 0, diskSize: 0 };
    let L_catalog_db = { compactedFiles: 0, docCount: 0, diskSize: 0 };
    let L_contact_db = { compactedFiles: 0, docCount: 0, diskSize: 0 };

    const databasesToCompact = ['board_db', 'catalog_db', 'contact_db'];

    for (const dbName of databasesToCompact) {
      const db = new PouchDB(dbName);
      const info = await db.info();

      if (info.doc_count > 0 && info.disk_size > 0 && info.disk_size / info.doc_count > 500000) {
      //  console.log("Iniciando auto compactación de la base de datos " + dbName + "...");
        $('#ws_panel_settings_compact_result').append('<li>'+ "Iniciando auto compactación de la base de datos <strong>" + dbName + "</strong>..."+'</li>');
        const result = await db.compact();
      //  console.log("Auto compactación completada para la base de datos " + dbName + ".");
        $('#ws_panel_settings_compact_result').append('<li>'+ "Auto compactación completada para la base de datos <strong>" + dbName + "</strong>." +'</li>');
        // Actualizar las variables globales con la información de compactación
        if (dbName === 'board_db') {
          L_board_db.compactedFiles = result.length;
          L_board_db.docCount = info.doc_count;
          L_board_db.diskSize = info.disk_size;
        } else if (dbName === 'catalog_db') {
          L_catalog_db.compactedFiles = result.length;
          L_catalog_db.docCount = info.doc_count;
          L_catalog_db.diskSize = info.disk_size;
        } else if (dbName === 'contact_db') {
          L_contact_db.compactedFiles = result.length;
          L_contact_db.docCount = info.doc_count;
          L_contact_db.diskSize = info.disk_size;
        }
      } else {

        $('#ws_panel_settings_compact_result').append('<li>'+ "No se requiere auto compactación en este momento para la base de datos <strong>" + dbName + "</strong>."+'</li>');
       // console.log("No se requiere auto compactación en este momento para la base de datos " + dbName + ".");
      }
    }
    $('#ws_panel_settings_compact_result').append('<li>'+ "Información de compactación:"+'</li>');
    $('#ws_panel_settings_compact_result').append('<li>'+ "board_db:<blockquote> <p>",  JSON.stringify(L_board_db) +'</blockquote> </p></li>');
    $('#ws_panel_settings_compact_result').append('<li>'+ "catalog_db:<blockquote> <p>",  JSON.stringify( L_catalog_db)+'</blockquote> </p></li>');
    $('#ws_panel_settings_compact_result').append('<li>'+ "contact_db:<blockquote> <p>",  JSON.stringify( L_contact_db)+'</blockquote> </p></li>');

   // console.log("Información de compactación:");
   //console.log("board_db:", L_board_db);
   // console.log("catalog_db:", L_catalog_db);
   // console.log("contact_db:", L_contact_db);
    return {
      success: true
    };
  } catch (error) {
    $('#ws_panel_settings_compact_result').append('<li>'+ "Error durante la auto compactación:<strong>", error+'</strong></li>');
   // console.error("Error durante la auto compactación:", error);
    return {
      error: error,
      success: false
    };
  }
}



  
  



