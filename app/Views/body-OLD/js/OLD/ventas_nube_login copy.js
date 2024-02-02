/*! VentasNube login.js 3.0
 * ================
 * Main JS application file for VentasNube v3.0 This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive VentasNube plugins.
 *
 * @Author  Ventas Nube
 * @Support <http://www.ventasnube.com>
 * @Email   <ventasnube.com@gmail.com>
 * @version 3.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//* Inicio de logica de login pounchdb
var db = false;
//NEW CONECTION LOGIN POUNCH 2021
//var db_name = 'ventasnube-01';
//var db_name = 'cart-ventasnube-01';
var db_name = 'cart-vn-01';
//var db_name = 'userdb-6d617269616e6f';
//var db_name = 'userdb-6d617269616e6f35';

var db = new PouchDB('http://localhost:5984/cart-vn-01', { skip_setup: true });

var usNaAd = 1;

if (usNaAd == 1) {
    //Usuario para logear Admin
    var userName = 'admin';
    var userPws = 'Cou6942233Cou';
} else {
    //Usuario para logear regular
    var userName = 'marianomarchesii2@gmail.com';
    var userPws = '123456';
}

var userNewCouch = 'marianomarchesii4@gmail.com';
var userNewPassCouch = '123456';
var userNewRoles = ['_reed', '_post'];
var userNewEmail = 'marianomarchesii3@gmail.com';

function login(userName, userPws) {
    db.logIn(userName, userPws, function(err, response) {
        if (err) {
            if (err.name === 'unauthorized' || err.name === 'forbidden') {
                // if (err.name === 'unauthorized' || err.name === 'forbidden') {
                Snackbar.show({
                    text: 'El nombre de usuario o password es incorrecto.',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
            }
        }
        if (response) {
            Snackbar.show({
                text: 'Logeado como: ' + response.name,
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'top-right'
            });
        }
    });
}


function logOut() {
    db.logOut(function(err, response) {
        if (err) {
            // network error
        } else {
            Snackbar.show({
                text: 'Se deslogeo con exito :' + response.userCtx.name,
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
        }
    })
}


function getSession() {
    //+ response.userCtx.roles + response.userCtx._id,
    db.getSession(function(err, response) {
        if (err) {
            // network error
        } else if (!response.userCtx.name) {
            // nobody's logged in
            Snackbar.show({
                text: 'No estas logeado',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'bottom-center'
            });
        } else {
            Snackbar.show({
                text: 'Login como: ' + response.userCtx.name + '  Permisos: ' + response.userCtx.roles,
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'bottom-center'
            });
            console.log(response.userCtx);
            // response.userCtx.name is the current user
        }
    });
}
/*
function get_product_seach() {
    db.get('ba83ece1939f778501b4bb9d2b00c343', function(err, doc) {
        if (err) { return console.log(err); }
        // handle doc

        Snackbar.show({
            text: 'Documento de: ' + doc._id + '  Nombre : ' + doc.descricao,
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
        console.log(doc.name);
    });
}
*/
function load_product_seach(product_name) {
    Snackbar.show({
        text: product_name + ' agregado al carrito: ',
        actionText: 'ok',
        actionTextColor: "#0575e6",
    });
}

//Traigo las actualizaciones filtradas automaticamente
function get_product_cart() {
    var us_name = 'mariano';
    //var type = 'cart-item';
    db.changes({
        //Activa el soket q escha en vivo
        since: 'now',
        live: true,
        //Nombre de vista
        filter: 'get_cart',
        //Filtro de vista
        query_params: { user_name: us_name, type: 'cart-item' },
        //Incluye los documentos
        include_docs: true,
    }, function(err, response) {
        if (err.name === 'forbidden') {
            Snackbar.show({
                text: 'No tienes permisos para ver ver: ' + db_name,
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            // invalid username
            //  return console.log(err);
        } else {
            Snackbar.show({
                text: '// HTTP error, cosmic rays, etc.',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            // HTTP error, cosmic rays, etc.
        }
        // handle result
        if (response) {
            var product_name = 'Speed con vorka';
            Snackbar.show({
                text: product_name + ' agregado al carrito!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            readCartItem(doc.rows);
            return console.log(response.results);
        }
    }).on('change', load_product_seach);
}


/*
load_product_cart(response) {

}
*/
//Escucho los cabios de la base de datos con filtros 
/*
function get_product_cart_desing() {
    db.changes({
        //Nombre de vista
        filter: 'get_cart',
        //Filtro de vista
        query_params: { user_name: 'mariano', type: 'cart-item' },
        //Incluye los documentos
        include_docs: true,
    }, function(err, response) {
        if (err) { return console.log(err); }
        // handle result
        else if (response) {

            readCartItem(response.results);
            return console.log(response.results);
        }
    });
}*/
// Creo el documento de diseno que que filtra los resultados con Map reduce del lado del servidor/
//Se crea una sola vez cuando se crea la nueva instacia
function put_product_cart_desing_get_cart() {
    db.put({
        _id: '_design/get_cart',
        filters: {
            get_cart: function(doc, req) {
                if (doc.user_name === req.query.user_name && doc.type === req.query.type) {
                    return doc;
                }
            }.toString()
        }
    });
}

// Agregar permiso en la DB para nuevos usuarios
//Editamos el _security DOC en La db con un usuario administrador
function put_new_user_permision_db() {
    // Busco el documento y traigo el numero de revision par apoder acutializarlo despues
    db.get('_design/_security', function(err, doc) {
        if (err) { return console.log(err); }
        //Si esta todo ok hago la actualizacion
        db.put({
            _id: '_design/_security',
            _rev: doc._rev,
            // El nuevo array con los datos nuevos
            admins: {
                names: [
                    "mariano", "mariano2"
                ],
                roles: []
            },
            members: {
                names: [
                    "mariano", "mariano2", "mariano3"
                ],
                roles: []
            }
            //    title: "Let's Dance"
        }, function(err, response) {
            if (err) {
                if (err.name === 'conflict') {
                    Snackbar.show({
                        text: 'El usuario ya existe elije otro',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                    // "batman" already exists, choose another username
                } else if (err.name === 'unauthorized' || err.name === 'forbidden') {
                    Snackbar.show({
                        text: 'Nombre de usuario invalido',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                    // invalid username
                }
            }
            if (response) {
                Snackbar.show({
                    text: 'Se creo permiso para el usuario ',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                    pos: 'top-center'
                });

            }
        });
    });
}



function signUp_user(userNewCouch, userNewPassCouch) {
    db.signUp(userNewCouch, userNewPassCouch, {
        //roles: ['_reed'],
        metadata: {
            //roles: ['_reed'],
            // email: userNewEmail,
            birthday: '1932-03-27T00:00:00.000Z',
            likes: ['futbol', 'Cannabis'],
        }
    }, function(err, response) {
        if (err.name === 'conflict') {
            //   alert(err.name);
            Snackbar.show({
                text: 'conflictoooo',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'top-center'
            });
            // invalid username
            //  return console.log(err);
        } else if (err.name === 'unauthorized' || err.name === 'forbidden') {
            //  alert(err.name);
            Snackbar.show({
                text: 'Nombre de usuario invalido',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
            // invalid username
        }
        if (response) {
            Snackbar.show({
                text: 'Se creo el usuario: ' + userNewCouch,
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'top-center'
            });

        }
    });
}

login(userName, userPws);

//signUp_user(userNewCouch, userNewPassCouch);

//put_new_user_permision_db();

get_product_cart();
//get_product_cart_desing();
//getSession();
//logOut();
//put_product_cart_desing_get_cart();
//get_product_cart_desing();

//get_product_seach();
//get_product_cart();
//get_product_cart_desing()
//signUp_Cd(userNewCouch, userNewPassCouch);


//signUp_Cd(userNewCouch, userNewPassCouch);
//loginAdminCo();
//var db = new PouchDB('http://mysite:5984/mydb', {skip_setup: true});

//OLD CONECTION //
/*
var db = new PouchDB('ventasnube-01');
var remoteCouch = 'http://admin:Cou6942233Cou@' + domain + ':5984/ventasnube-01';
*/

//Captura los cambios en la DB en vivo y Actualiza los datos asincronico sin refrezcar la pagina
/*db.changes({
    since: 'now',
    live: true
}).on('change', load_product_seach); //Cargo la funcion load_product_cart en vivo si hay cambios en la dB!
*/
//Inicializa la sync with the remote server
/*
function sync_seach() {
    // syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = { live: true };
    db.replicate.to(remoteCouch, opts, syncError);
    db.replicate.from(remoteCouch, opts, syncError);
}

// Capturo el error de syncronizacion
function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
}

if (remoteCouch) {
    sync_seach();
}
*/