<?php

namespace Config;

// Cree una nueva instancia de nuestra clase RouteCollection.
$routes = Services::routes();

// Cargue primero el archivo de enrutamiento del sistema, para que la aplicación y el ENTORNO
// puede anular según sea necesario.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}


/**
 * --------------------------------------------------------------------
 * Configuración del enrutador
 * --------------------------------------------------------------------
 */

$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/**
 * --------------------------------------------------------------------
 * Definiciones de ruta
 * --------------------------------------------------------------------
 */

// Obtenemos un aumento de rendimiento al especificar el valor predeterminado
// ruta ya que no tenemos que escanear directorios.
// Si agrego una ruta automaticamente la ruta va astar pritegida por el login si le agrego un filtro de rol
// Si no le agrego deberia espesificar en controlador con la calse .
//Ruta de la carpeta para los controladores que vamos usar App\Controllers
$routes->group('', ['namespace' => 'App\Controllers'], function ($routes) {

    //$routes->get('App', 'App::index', ['filter' => 'role:plan-starter-free']);
    //$routes->get('/', 'workspace::index',['filter' => 'login']);
    $routes->get('/', 'Home::index');
    //$routes->get('/myapp', 'Home::app');
    //$routes->get('/', 'Home::plan-starter',['filter' => 'role:plan-starter-free']);
    //ACCOUNT.
    //$routes->get('/account', 'Account::index', ['filter' => 'role:plan-starter-free']);
    $routes->get('/workspace', 'workspace::index');


    // SHOP
    $routes->get('/shop', 'Home::shop');
    // Forgot/register cliente
    $routes->get('/shop/register', 'shop::register');
    $routes->post('/shop/register', 'AuthController::attemptRegisterShop');

    // ADMIN MODULO
    //Filtro las rutas por grupo de usuarios
    /*$routes->group('admin', ['filter' => 'role:admin,superadmin'], function($routes) {
    $routes->get('/admin', 'Admin::index', ['filter' => 'role:admin']);
    //$routes->get('/admin', 'Admin::index', ['filter' => 'role:admin']);
    $routes->get('/admin/(:num)', 'Admin::detail/$1', ['filter' => 'role:admin']);

    });*/

    $routes->get('/admin', 'Admin::index');
    $routes->get('/admin/(:num)', 'Admin::detail/$1');

    // $routes->get('/client', 'Admin::index', ['filter' => 'role:client']);
    // $routes->get('/assets/ventas_nube_body', 'Body::ventas_nube_body',['filter' => 'login']);
    $routes->get('login', 'home::login');
    // $routes->get('login', 'AuthVn::login');
    $routes->post('login', 'AuthController::attemptLogin');
    $routes->get('logout', 'AuthController::logout');

    // Vista Registration
    $routes->get('register', 'home::register');
    // Post Registration
    $routes->post('register', 'AuthController::attemptRegister');

    //New Activation
    $routes->get('activate-account', 'AuthController::activateAccount', ['as' => 'activate-account']);

    //Resend Activation
    $routes->get('resend-activate-account', 'AuthController::resendActivateAccount', ['as' => 'resend-activate-account']);
  
    // Forgot vista
    $routes->get('forgot', 'home::forgot');
    //Resets
    $routes->post('forgot', 'AuthController::attemptForgot');

    //Reset Pasword  Vista 
    $routes->get('reset-password', 'home::resetPassword', ['as' => 'reset-password']);
    //Change new
    $routes->post('reset-password', 'AuthController::attemptReset');

});

/**
 * ------------------------------------------------- -------------------
 * Enrutamiento adicional
 * ------------------------------------------------- -------------------
 *
 * A menudo habrá ocasiones en las que necesite enrutamiento adicional y
 * lo necesita para poder anular cualquier valor predeterminado en este archivo. Medio ambiente
 * rutas basadas es uno de esos momentos. require () archivos de ruta adicionales aquí
 * para que eso suceda.
 *
 * Tendrá acceso al objeto $ route dentro de ese archivo sin
 * necesidad de recargarlo.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
