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

var email = $('#email').val();
var lastname = $('#ushash').attr('hass');
var username = $('#dbusername').attr('dbusername');
var pass_hash = $('#dbushash').attr('dbushash');
var user_workspace = $('#user_workspace').val();
var db_user_workspace = '' + db_user_workspace + '';
var controler_data = 'body/user_data';
//userHas = userData;



function logOut() {
    db.logOut(function(err, response) {
        if (err) {
            // network error
        } else {
            var data = '';
            var url = "http://localhost/logout";
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                success: function(data) { //una vez que el archivo recibe el request lo procesa y lo devuelve
                    // location.reload(true);
                    var delay = 2000;
                    setTimeout(function() { window.location = "http://localhost/logout"; }, delay);
                    //  setTimeout(alert("Hello "), 10000);
                    // alert('Reloading Page');
                    //   location.reload(true).delay(5000).fadeOut(1000).delay("fast").fadeIn(1000);
                }

            });

            Snackbar.show({
                text: 'Se deslogeo con exito :' + response.userCtx.name,
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
        }
    })
}