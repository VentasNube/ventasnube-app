<?php

namespace App\Controllers;

use App\Models\BodyModel;
use App\Models\OwnerModel;
use App\Models\UserModel;
use App\Models\WorkspaceModel;

use CodeIgniter\Files\File;
use CodeIgniter\HTTP\Traits\Writable;

class Workspace extends BaseController
{
    protected $WorkspaceModel;
    protected $request;

    

    public function __construct()
    {
        $this->WorkspaceModel = new WorkspaceModel();
        $this->request = \Config\Services::request();
        $this->session = service('session');
    }
    //Inicio de WS
    function index()
    {
        return redirect()->to(base_url('/workspace/app'));
    }

    function service_worker()
    {
        if (!logged_in()) {
            return redirect()->to(base_url('/workspace/login'));
        }
        return json_encode(view('/workspace/js/service-worker.js'));
        //return view('/workspace/js/service-worker.js');
    }
    // VISTA APP
    function app()
    {
      //  if (!logged_in()) {
        //    return redirect()->to(base_url('/workspace/login'));
       // }
        $user_id = user_id();
        $Workspace = new WorkspaceModel(); //traigo al modelo
        $Workspace = $Workspace->get_all_ws_user($user_id); //cargo la data en un array
        //  $ws_id = session('ws_id');
        //  $ws_id = $this->session->set($ws_select_data);
      //  if ($Workspace) {
            $model = new OwnerModel(); //traigo al modelo		
            $data['owner'] = $model->getOwner(); //cargo la data en un array
            return view('/workspace/body/body.hbs', $data);
            //   return redirect()->to(base_url('/workspace/home'));
      //  } else {
       //     return redirect()->to(base_url('/workspace/welcome'));
      //  }
    }

    // Vista Home ws
    public function home()
    {
        if (!logged_in()) {
            return redirect()->to(base_url('/workspace/login'));
        } else {
            $user_id = user_id();
            $UserModel = new UserModel(); //traigo el modelo

            $Owner = new OwnerModel(); //traigo el modelo
            $Workspace = new WorkspaceModel(); //traigo al modelo
            $Workspace = $Workspace->get_all_ws_user($user_id); //cargo la data en un array

            $user_email = $UserModel->getUserData($user_id, 'email');
            $user_name = $UserModel->getUserData($user_id, 'username'); //Traigo el email del usuario
            $ws_id = $this->request->getPost("ws_select"); //Traigo e id seleccionado


            if ($Workspace) {
                $User = new UserModel(); //traigo el modelo
                $data['owner'] = $Owner->getOwner(); //cargo la data en un array
                $data['user'] = $User->getUser($user_id); //cargo la data en un array
                $data['ws_user'] = $this->WorkspaceModel->get_all_ws_user($user_id); //cargo la data en un array

                //*** CODIFICO NOMBRE DE ID  workspace a exadecimal ***/
                $hex = bin2hex($user_email); //Transformo el email en hexadecimal por seguridad
                $userDb = 'userdb-' . $hex; //Armo la url de la User BD

                // $data['ws_email'] = $user_email;
                $data['user_data'] = [
                    'u_name' => $user_name,
                    'u_email' => $user_email,
                    'userDb' => $userDb,
                ];

                //$session_data = $this->session->set($ws_select_data);
                //$session_data_return = $this->session->get();

                return view('/workspace/workspace_home', $data);
            } else {
                return redirect()->to(base_url('/workspace/welcome'));
            }
        }
    }

    //Vista Welcome
    public function welcome()
    {
        if (!logged_in()) {
            return redirect()->to(base_url('/workspace/login'));
        } else {
            $user_id = user_id();
            $Owner = new OwnerModel(); //traigo el modelo
            $User = new UserModel(); //traigo el modelo
            //  $model = new OwnerModel(); //traigo al modelo
            $data['owner'] = $Owner->getOwner(); //cargo la data en un array
            $data['user'] = $User->getUser($user_id); //cargo la data en un array
            return view('workspace/workspace_select', $data);
        }
    }

    // Boton Selecciono el ws
    public function ws_select()
    {
        if (!logged_in()) {
            return redirect()->to(base_url('/workspace/login'));
        } else {
            $user_id = user_id();
            //$data['ws_user'] = $this->WorkspaceModel->get_user_all_ws($user_id); //cargo la data en un array
            //$ws_email = $this->request->getPost("ws_email");

            $UserModel = new UserModel(); //traigo el modelo
            $user_email = $UserModel->getUserData($user_id, 'email');
            $user_name = $UserModel->getUserData($user_id, 'username'); //Traigo el email del usuario
            $ws_id = $this->request->getPost("ws_select"); //Traigo e id seleccionado
            //$ws_id = $this->request->getPost("ws_id");

            $ws_select_data = [
                'u_name' => $user_name,
                'ws_email' => $user_email,
                'ws_id' => $ws_id,
            ];
            $session_data = $this->session->set($ws_select_data);

            //$session_data_return = $this->session->get();
            if ($ws_id) {
                $return = ['workspace_id' => $ws_id, 'msj' => 'Se selecciono el WS:' . $ws_id, 'result' => true];
            } else {
                $return = ['workspace_id' => '', 'msj' => 'Hay un problema y no se pudo seleccionar el workspace:', 'result' => false];
            }
            return json_encode($return);
        }
    }

    //TESTER DE RECUEST
    public function ws_collection_get()
    {
        if (!logged_in()) {
            return redirect()->to(base_url('/workspace/login'));
        } else {
            $ws_collection_get = [
                '_id' => '_design/get',
                'views' => [
                    'seach' => [
                        'map' => "function(doc) {\n if(doc.status === 'active' || doc.type === 'product'){\n            var attribute_combinations = new Array();\n   for(var i=0, length=doc.variations.length; i<length; i++){\n      var price_list = doc.variations[0].price_list;\n var stock_list =  doc.variations[0].stock_list;\n  var pictures_min = doc.variations[0].pictures[0].min;\n      var pictures_max = doc.variations[0].pictures[0].max;\n                  var sku = doc.variations[0].sku.value_name;\n                  var variant_id = doc.variations[0].id;\n                  var attribute_combinations = doc.variations[0].attribute_combinations\n               }\n             emit([doc.name],{\n                    '_id': doc._id,\n                    '_rev':doc._rev,\n                    'variant_id':variant_id,\n                    'tipo': doc.type,\n                    'name': doc.name,\n                    'tags': doc.tags,\n                    'currency': doc.currency.value,\n                    'available_quantity': doc.available_quantity,\n                    'sold_quantity': doc.sold_quantity,\n                    'cost_price': doc.cost_price,\n                    'limit_discount': doc.limit_discount,\n                    'price':doc.variations[0].price_list[0].value,\n                    'price_list':price_list,\n  'stock_list':stock_list,\n                    'sku': sku,\n                    'picture_min':pictures_min,\n                    'picture_max':pictures_max,\n 'attribute_combinations':attribute_combinations,\n });\n}\n}\n",
                    ],
                ]
            ];
            $response = $this->WorkspaceModel->curl_put("/ws_collections_323034/_design/get", $ws_collection_get); //Docuento diseno get
            return json_encode($response);
        }
    }

    //Vista del login
    public function login()
    {
        if (logged_in()) {
            return redirect()->to(base_url('/workspace/app'));
        }
        //return view('auth/login');
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array
        echo view('home/login/head', $data);
        //echo view('login/login', $data);
        return view('home/login/login', $data);
    }

    //Log the user out.
    public function logout()
    {
        if ($this->auth->check()) {
            $this->auth->logout();
        }
        return redirect()->to(site_url('/'));
    }

    //Vista registro
    public function register()
    {
        if (logged_in()) {
            return redirect()->to(base_url('/workspace'));
        }
        //return view('auth/login');
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array
        echo view('home/login/head', $data);
        //echo view('login/login', $data);
        return view('home/login/register', $data);
    }

    //Vistra recuperacion de contraseña
    public function forgot()
    {
        if (logged_in()) {
            return redirect()->to(base_url('/workspace'));
        }
        //return view('auth/login');
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array
        echo view('home/login/head', $data);
        //echo view('login/login', $data);
        return view('home/login/forgot', $data);
    }

    //Vista de reset de pasword
    public function resetPassword()
    {
        if (logged_in()) {
            return redirect()->to(base_url('/workspace'));
        }
        //return view('auth/login');
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array
        echo view('home/login/head', $data);
        //echo view('login/login', $data);
        return view('home/login/reset-pasword', $data);
    }
   
   
    //FUNCIONES 2022 Edicion roles de usuarios a WS y eliminacion
    // Creo un nuevo WS Completo
    public function ws_new()
    {
        if (!logged_in()) {
            return redirect()->to(base_url('/workspace/login'));
        } else {
            $db = \Config\Database::connect();
            $UserModel = new UserModel(); // traigo el modelo user para pedir datos de la session
            $Owner = new OwnerModel(); // traigo el modelo
            // $User = new UserModel(); // traigo el modelo
            // $Body_model = new BodyModel(); // traigo el modelo

            helper('date');       // Libreria de tiempo 

            $user_id = user_id(); // Usuario
            $user_email = $UserModel->getUserData($user_id, 'email'); // Traigo el email del usuario

            // Permisos de toda la APP Mysql y Couchdb se relacionan en la tabla (auth_permissions);
            // 1 owner  PUEDE LEER, CREAR, EDITAR, ELIMINAR, NOMBRAR COLABORADORES Y ADMINISTRADORES
            // 2 admin  PUEDE LEER, CREAR, EDITAR, ELIMINAR, AGREGAR COLABORADORES AL MODULO
            // 3 edit   PUEDE LEER, CREAR, EDITAR
            // 4 save   PUEDE LEER, CREAR,
            // 5 reed   PUEDE LEER

            // Comfiguraciones de seguridad y lisencia
            // SETEO  GRUPOS y ROLES de toda la app msql y couchdb

            // Los ws_plan identifican al grupo q pertenece el usuario se divide en:

            // ID: 1 ( admin ) Administracion de ( cuentas pagos y usuarios )( SOY YO EL QUE TIENE LA LLAVE DE TODO y TODOS LOS WS );
            // ID: 2 ( shop ) Tiene permisos para ver ( cart, myOrders) ( Solo en base de datos del usuario couchdb: userdb-email_exadecimal  );
            // ID: 3 ( plan-starter-free ) Plan incial por 30 dias puede ser el Owner de su workspace por 30 dias con todas las funcionalidades ( cart, favoritos, myOrders,  boards, contacts, catalog, stats, reports, shops);
            // ID: 4 ( plan-starter ) Tiene permiso para ver ( cart, favoritos, myOrders, board, catalog, contact );
            // ID: 5 ( plan-professional ) Tiene permiso para ver :( cart, favoritos, myOrders,  boards, contacts, catalog, stats,);
            // ID: 6 ( plan-business ) Tiene permiso para ver : ( cart, favoritos, myOrders,  boards, contacts, catalog, stats, reports, shops);

            $ws_plan = 'plan-starter-free'; // Plan starter inicial q se crea de prueba
            $ws_rol = 'owner'; // Rol principal en el ws que se crea
            $ws_rol_id = '1';

            /////////////////////////////////////////////////////////////////

            $ws_zona_h = $this->request->getPost("ws_zona_h");
            $ws_db_pacht = now($ws_zona_h);
            $now = now($ws_zona_h);
            $data_now = date("M d Y H:i:s", $now);

            // Sumo 1 mes
            $ws_plan_expiration = date("Y-m-d H:i:s", strtotime($data_now . "+ 1 month"));
            
            // Datos de apariencia de la app
            $ws_name = $this->request->getPost("ws_name");
            $ws_avatar_img = $this->request->getPost('ws_avatar_img');
            $ws_color = $this->request->getPost('ws_color');
           
            // Datos de contacto
            $ws_email = $this->request->getPost("ws_email");
            $ws_web = $this->request->getPost('ws_web');
            $ws_whatsaap = $this->request->getPost('ws_whatsaap');
            $ws_phone = $this->request->getPost("ws_phone");
            $ws_country = $this->request->getPost("ws_country");
            $ws_email = $this->request->getPost("ws_email");
            $ws_state = $this->request->getPost('ws_state');
            $ws_city = $this->request->getPost('ws_city');
            $ws_street = $this->request->getPost("ws_street");
            $ws_number = $this->request->getPost("ws_number");
            $ws_float = $this->request->getPost('ws_float');
            $ws_cp = $this->request->getPost("ws_cp");
            

            // 
            $ws_data = [
                'workspace_name' => $ws_name,
                'workspace_img' => $ws_avatar_img,
                'workspace_phone' => $ws_phone,
                'workspace_plan' => $ws_plan,
                'workspace_color' => $ws_color,
                'workspace_web' => $ws_web,
                //Datos de contacto
                // 'workspace_created_at' => now(),
                'workspace_plan_expiration' => $ws_plan_expiration,
                'workspace_db_pacht' => $ws_db_pacht,
                'workspace_status' => '2', //Abono al dia 1 // Prueba gratis 30 dias 2  //Con deuda 2 //Suspendido 4 //Inabilitado 5
                'workspace_zona_h' => $ws_zona_h,
                'workspace_phone' => $ws_phone,
                'workspace_img' => $ws_avatar_img,
                //Datos de lisencia
                // ActivationSuccess
            ];

            // 

            $ws_contact_data = [
                'ws_name' => $ws_name,
                //'ws_avatar_img' => $ws_avatar_img,
                'ws_color' => $ws_color,
                //Datos de contacto
                'ws_email' => $ws_email,
                'ws_web' => $ws_web,
                'ws_whatsaap' => $ws_whatsaap,
                'ws_phone' => $ws_phone,
                'ws_country' => $ws_country,
                'ws_email' => $ws_email,
                'ws_state' => $ws_state,
                'ws_city' => $ws_city,
                'ws_street' => $ws_street,
                'ws_number' => $ws_number,
                'ws_float' => $ws_float,
                'ws_cp' => $ws_cp,
                //Datos de lisencia
                //'ws_created_at' => now(),
            ];

            // Inicio la trasaccion
            $db->transBegin();
            // Creo el workspace
            $Workspace = $this->WorkspaceModel->insert('workspace', $ws_data); //Creo el Workspace n msql
            $workspace_id_dec = $db->insertID(); //Tomo el nuevo id del workspace
            
            //*** CODIFICO NOMBRE DE ID  workspace a exadecimal ***/
            $workspace_id_hex = bin2hex($workspace_id_dec); //Transformo el email en hexadecimal por seguridad
            
            // ACTUALIZO EL ID HEXA EN LA TABLA WORKSPACE
            $ws_data_update = [
                'workspace_id_hex' => $workspace_id_hex
            ];
            
            //Grabo la id exadecimal en la tabla de worksapces
            $Workspace_id_hex_post = $this->WorkspaceModel->edit('workspace', $ws_data_update, 'workspace_id', $workspace_id_dec);
            
            // Compruebo q se creo el usuario con exito
            if ($Workspace_id_hex_post) {

                // Habilito el usuario al nuevo workspace
                $ws_user_data = [
                    'workspace_id' => $workspace_id_dec,
                    'workspace_id_hex' => $workspace_id_hex,
                    'user_id' => $user_id,
                    'user_group' => $ws_rol,
                    'user_workspace_status' => 'active',
                    'user_workspace_create_time' => now(),
                ];

                //ASIGNO UN LOS PERMISOS DE USARIOS PARA EL WORKSPACE
                $ws_user = $this->WorkspaceModel->insert('users_workspace', $ws_user_data);
                // Modulos del sistema del (plan-starter)( BASICO)
                $ws_info = true; //Todas las configuracinoes del workspace
                $ws_collections = true; //Catalogo de productos y servicios
                $ws_contact = true; //Catalogo de contactos
                $ws_boards =  true;
                $ws_mov = true; //Control de movimientos cajas diario
                $ws_local_sell = true; //Ventas del local
                //Movimientos de caja (plan-professional) (SUMO LOS MODULOS)
                //Ordenes (plan-business)  //Activar dependiendo el modulo seleccionado  Maximo (3)
                $ws_order_buy = $this->request->getPost('ws_buy'); //Orden de Compras
                $ws_order_sell = $this->request->getPost("ws_sell"); //Ordenes de ventas
                $ws_mov_box = $this->request->getPost("ws_box"); //Control de movimientos cajas diario
                $ws_statistics = $this->request->getPost("ws_statistics"); //Estadisticas (no es una DB)
                //Plan (plan-business-service)
                //Ordenes de Servicios (plan-business)
                $ws_reports = $this->request->getPost('ws_reports'); //Reportes (No es una DB)
                $ws_order_pro_service = $this->request->getPost('ws_pro_service'); //Ordenes de servicios profecionales
                $ws_order_tecnic_service = $this->request->getPost("ws_tecnic_service"); //Ordenes de servicio tecnico
                //Plan (shop) (plan-business-shop)
                $ws_order_app = $this->request->getPost('ws_order_app'); //Guardo los productos que se muestran en el catalogo web
                //Plan (shop) (plan-business-shop)

                //Creamos el contenido de los documentos json
                $ws_module_active = [
                    'ws_info' => $ws_info,
                    'ws_collections' => $ws_collections,
                    'ws_contact' => $ws_contact,
                    'ws_mov' => $ws_mov,
                    'ws_local_sell' => $ws_order_sell,
                    'ws_mov_box' => $ws_mov_box,
                    //Modulos de ordenes
                    'ws_order_buy' => $ws_order_buy,
                    'ws_order_app' => $ws_order_app,
                    'ws_order_pro_service' => $ws_order_pro_service,
                    'ws_order_tecnic_service' => $ws_order_tecnic_service,
                    //Modulos de reportes y estadisticas
                    'ws_reports' => $ws_reports,
                    'ws_statistics' => $ws_statistics,
                ];

                //Documento con la info del workspace creado
                $ws_doc_info = [
                    '_id' => 'ws_info' . $workspace_id_hex,
                    'author' => $user_email,
                    'type' => 'ws_info',
                    'create_at' => $data_now,
                    'ws_data' => $ws_data,
                    'ws_contact_data' => $ws_contact_data,
                    'ws_module_select' => $ws_module_active,
                ];

                //1 owner  PUEDE LEER, CREAR, EDITAR, ELIMINAR, NOMBRAR COLAB... (borra la instancia y nombrar _admin)
                //2 admin  PUEDE LEER, CREAR, EDITAR, ELIMINAR, AGREGAR COLAB...
                //3 edit   PUEDE LEER, CREAR, EDITAR
                //4 save   PUEDE LEER, CREAR,
                //5 reed   PUEDE LEER

                //Creo los documentos por defecto para crear un WS
                $ws_validate_doc_admin = [
                    "_id" => "_design/_admin_edit",
                    "filters" => [
                        "validate_doc_update" => "function(newDoc, oldDoc, userCtx) {\r\n                if (userCtx.roles.indexOf(\"_admin\") === -1 && userCtx.roles.indexOf(role) === -1) {\r\n                    throw ({ prohibido: \"Solo usuarios con rol\" + rol + \"o un administrador puede modificar esta base de datos\" });\r\n                }\r\n            }",
                    ],
                ];

                $ws_validate_doc_edit = [
                    "_id" => "_design/validate_edit_doc",
                    "validate_doc_update" => "function(newDoc, oldDoc, userCtx)  var role = '_edit';  if (userCtx.roles.indexOf('_admin') === -1 && userCtx.roles.indexOf(role) === -1) { { {throw({forbidden : 'Solo usuarios con el rol!'+rol+'o un administrador pueden editar'});}}",
                ];

                $ws_validate_doc_save = [
                    "_id" => "_design/validate_save_doc",
                    "validate_doc_update" => "function(newDoc, oldDoc, userCtx)  var role = '_save';  if (userCtx.roles.indexOf('_admin') === -1 && userCtx.roles.indexOf(role) === -1) { { {throw({forbidden : 'Solo usuarios con el rol!'+rol+'o un administrador pueden editar'});}}",
                ];

                $ws_get_type_doc = [
                    '_id' => '_design/get',
                    'filters' => [
                        'myfilter' => 'function(doc, req) {\r\n                return doc.type === req.query.type;\r\n            }',
                    ],
                ];

               

                /* ========== 
                USER DB
                Edit:10/10/21
                FUCIONES PARA CREAR LAS DBS DEL USUARIO
                CON SUS DOCUMENTOS Y CONFUGURACIONES INCIALES 
                ======== */

                //DOCUMETO CON CONFIGURACION DEL ESPACIO DE TRABAJO
                $ws_setting = [
                    '_id' => 'ws_setting_' . $workspace_id_hex,
                    'ws_setting' => [
                        'offline_mode' => 'true',
                    ],
                ];

                //Documento con la info del workspace creado
                $ws_body = [
                    '_id' => 'ws_left_nav_' . $workspace_id_hex,
                    'ws_left_nav' => [
                        'owner' => [$Owner->getOwner()],
                        'ws_data' => $ws_data,
                        'ws_module_select' => $ws_module_active,
                        //  OLD 'm' => $Body_model->get_m($group_id),
                        //  'm' => $Body_model->get_m($user_id),
                        //  'group_id' => $group_id,
                        'result' => true,
                    ],
                ];

                //Busco la rev del docuemnto para poder actualizarlo   
             //   $doc_rev = $this->WorkspaceModel->curl_get_rev($db_user . "/ws_lang_". $workspace_id_hex); 
                $ws_lang = [
                    '_id' => 'ws_lang_' . $workspace_id_hex,
                   // '_rev'=> $doc_rev,
                    'ws_update' => now(),
                    'ws_update_user' => $user_email,
                    'ws_land_default' => 'ws_lang_es',
                    'ws_lang_es' =>  lang('ws_app_lang.ws_lang_es'),//Traigo la plantilla con los objetos dentro de la carpeta LENGUAJE
                    'ws_lang_us' =>  lang('ws_app_lang.ws_lang_us'), // ASI puedo llevar un orden mucho mejor para centralizar los formatos
                  ];

                 //Documento de diseno que trae todos los productos del cart
                 $user_get = [
                    '_id' => '_design/get-type',
                    'views' => [
                        'cart-item' => [
                            "map" => "function(doc) {\nif(doc.type === 'cart-item') {\n        emit(doc.type,{\n          'tipo': doc.type,\n          'price': doc.variant.price,\n          'stock': doc.variant.stock,\n          'discount': doc.variant.discount,\n          'tax': doc.variant.tax\n        });\n    }\n}",
                        ],
                        'fav-item' => [
                            "map" => "function(doc) {\nif(doc.type === 'fav-item') {\n        emit(doc.type,{\n          'tipo': doc.type,\n          'price': doc.variant.price,\n          'stock': doc.variant.stock,\n          'discount': doc.variant.discount,\n          'tax': doc.variant.tax\n        });\n    }\n}",
                        ]
                    ],
                ];

                //Transformo el email en hexadecimal por seguridad
                $hex = bin2hex($user_email);
                //Armo la url de la User BD
                $db_user = 'userdb-' . $hex;
                //HAGO LOS PUT A COUCHDB CON CONFIGURACIONES EN LA DB USER
                $this->WorkspaceModel->curl_put($db_user . "/ws_left_nav_" . $workspace_id_hex, $ws_body); //Creo el doc
                $this->WorkspaceModel->curl_put($db_user . "/ws_setting_" . $workspace_id_hex, $ws_setting); //Creo el doc
                $this->WorkspaceModel->curl_put($db_user . "/ws_lang_". $workspace_id_hex, $ws_lang); //Creo un doc con la informacion del workspace
                $this->WorkspaceModel->curl_put($db_user . "/_design/get", $user_get); //Docuento diseno get
            
                /* ========== 
                    DB COLLECTION
                    Edit:10/10/21
                    LA DB COLLECTION GUARDA LOS DOCUMENTOS DE PRODUCTOS LISTA DE PRECIOS CATEGORIAS
                    ATRIBUTOS Y LOS DOCUMENTOS DE LOS PRODUCTOS DEL CATALOGO
                    ======== */

                //DB de catalogo productos y sericios

                if ($ws_collections) {
                    $db_name = "ws_collections_" . $workspace_id_hex;
                    $module_name = "catalog";

                    // SETEO LOS PERMISOS 
                    $ws_module_name = "catalog";
                    $module_id = '2';
                    $module_type_id = '0';

                    // Agrego permiso s 
                    $ws_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'module_id' => $module_id,
                        'module_type_id' => $module_type_id,
                        'user_id' => $user_id,
                        'auth_permissions_id' => $ws_rol_id
                    ];

                    // Creo el documento de diseño q filtra los permisos q otorgan a los usuarios para hacer update 
                    $ws_validate_doc_save = [
                        "_id" => "_design/validate_save_doc",
                        "validate_doc_update" => "function(newDoc, oldDoc, userCtx)  var role = '_save';  if (userCtx.roles.indexOf('_admin') === -1 && userCtx.roles.indexOf(role) === -1) { { {throw({forbidden : 'Solo usuarios con el rol!'+rol+'o un administrador pueden editar'});}}",
                    ];

                    $ws_collection_get = [
                        '_id' => '_design/get',
                        'views' => [
                            'seach'=> [
                                'map'=> "function(doc) {\n if(doc.status === 'active' || doc.type === 'product'){\n   for(var i=0, length=doc.variations.length; i<length; i++){\n                var price_list = doc.variations[0].price_list;\n                 var stock_list =  doc.variations[0].stock_list;\n                 var pictures_min = doc.variations[0].pictures[0].min;\n                 var pictures_max = doc.variations[0].pictures[0].max;\n                 var sku = doc.variations[0].sku.value_name;\n                 var variant_id = doc.variations[0].id;\n                 var attribute_combinations = doc.variations[0].attribute_combinations\n               }\n             emit([doc.name],{\n                    '_id': doc._id,\n                    '_rev':doc._rev,\n                    'variant_id':variant_id,\n                    'tipo': doc.type,\n                    'name': doc.name,\n                    'tags':  doc.tags,\n                    'currency':null,\n                    'available_quantity': null,\n                    'sold_quantity': null,\n                    'cost_price': null,\n                    'limit_discount': null,\n                    'price':null,\n                    'price_list':price_list,\n                    'stock_list':stock_list,\n                    'sku': sku,\n                    'picture_min':pictures_min,\n                    'picture_max':pictures_max,\n                    'attribute_combinations':attribute_combinations,\n });\n}\n}\n"
                            ],
                        ]
                    ];

                    // DOC CON CONFIGURACIONES DEL CATALOGO 
                    // DOC CONFIGURACION DEL WORKSPACE FOTO DATOS DE CONTACTO DE CONFIGURACION DE FACTURA 
                    $ws_module_config = [
                        '_id' => 'ws_module_config',
                        'type' => 'ws_module_config',
                        'author' => $user_email,
                        'create_at' => $data_now,
                        'workspace_name' => $ws_name,
                        'workspace_img' => $ws_avatar_img,
                        'workspace_phone' => $ws_phone,
                        'workspace_plan' => $ws_plan,
                        'workspace_color' => $ws_color,
                        'workspace_web' => $ws_web,
                        //Datos de contacto
                        'workspace_created_at' => now(),
                        'workspace_plan_expiration' => $ws_plan_expiration,
                        'workspace_db_pacht' => $ws_db_pacht,
                        'workspace_status' => 'active',
                        'workspace_zona_h' => $ws_zona_h,
                        'tax' => [
                            [
                                'id' => '0',
                                'name' => 'IVA 21',
                                'value' => '21',
                            ],   [
                                'id' => '1',
                                'name' => 'IVA 10',
                                'value' => '10',
                            ],
                        ],
                        'money' => '$',
                        //Datos de lisencia
                        // activationSuccess
                    ];

                    // LISTA DE PRECIOS
                    $price_list = [
                        '_id' => 'price_list',
                        'type' => 'price_list',
                        'status' => 'active',
                        'price_list' => [
                            [
                                'id' => 1,
                                'value' => 'Consumidor Final',
                                'currency_id' => 1,
                                'status'=> true,
                                'delete'=> false,
                                'currency' => [
                                    'id' => 'ARS',
                                    'value' => '$',
                                ],
                            ],
                            [
                                'id' => 2,
                                'value' => 'Gremio',
                                'currency_id' => 1,
                                'status'=> true,
                                'delete'=> false,
                                'currency' => [
                                    'id' => 'ARS',
                                    'value' => '$',
                                ],
                            ],
                            [
                                'id' => '3',
                                'value' => 'Mayorista',
                                'currency_id' => 1,
                                'status'=> true,
                                'delete'=> false,
                                'currency' => [
                                    'id' => 'ARS',
                                    'value' => '$',
                                ],
                            ],
                            [
                                'id' => '4',
                                'value' => 'Mercado Libre',
                                'currency_id' => 3,
                                'status'=> true,
                                'delete'=> false,
                                'currency' => [
                                    'id' => 'ARS',
                                    'value' => '$',
                                ],
                            ],
                            [
                                'id' => '5',
                                'value' => 'Web',
                                'currency_id' => 2,
                                'status'=> true,
                                'delete'=> false,
                                'currency' => [
                                    'id' => 'ARS',
                                    'value' => '$',
                                ],
                            ],
                        ],
                    ];

                    //MONEDAS
                    $currency_list = [
                        '_id' => 'currency_list',
                        'type' => 'product',
                        'status' => 'active',
                        'currency_sell_default_id' => 1,
                        'currency_link_status' => 1,

                        'currency_default' => [
                            'id' => 2,
                            'value' => '$',
                            'currency_name' =>'Peso Argentino'
                        ],
                        'currency_list' => [
                            
                            [
                                'id' => 1,
                                'value' => 'u$s',
                                'currency_name' =>'Dolar Americano',
                                'currency_link_id' =>1,
                                'currency_link_value' =>1
                            ],
                            [
                                'id' => 2,
                                'value' => '$',
                                'currency_name' =>'Peso Argentino',
                                'currency_link_id' =>1,
                                'currency_link_value' =>1
                            ],
                            [
                                'id' => 3,
                                'value' => '€',
                                'currency_name' =>'Euro Europa',
                                'currency_link_id' =>1,
                                'currency_link_value' =>1
                            ],
                        ],
                    ];

                    $tax_list = [
                        '_id' => 'tax__list',
                        'type' => 'tax',
                        'status' => 'active',
                        'tax__sell_default_id' => 1,
                        'tax__link_status' => 1,

                        'tax' => [
                            [
                                'id' => '0',
                                'name' => 'IVA 21',
                                'value' => '21',
                            ],   [
                                'id' => '1',
                                'name' => 'IVA 10',
                                'value' => '10',
                            ], [
                                'id' => '3',
                                'name' => 'IVA exento',
                                'value' => '0',
                            ]
                        ],
                    ];
                    
                    //CATEGORIAS Y SUB CATEGORIAS
                    $category_list = [
                        '_id' => 'category_list',
                        'type' => 'product',
                        'status' => 'active',
                        'category_list' => [
                            [
                                'id' => '1',
                                'value' => 'Bebidas',
                                'sub_category' => [
                                    
                                    [
                                        'id' => '1',
                                        'value' => 'Aguas',
                                        'status' => 'true'
                                    ],
                                    [
                                        'id' => '2',
                                        'value' => 'Jugos',
                                        'status' => 'true',
                                    ], 
                                    [
                                        'id' => '3',
                                        'value' => 'Sin Azucar',
                                        'status' => 'true',
                                    ],
                                    [
                                        'id' => '4',
                                        'value' => 'Sin gas',
                                        'status' => 'true',
                                    ],
                                    [
                                        'id' => '5',
                                        'value' => 'Zero 250cc',
                                        'status' => 'true',
                                    ],
                                    [
                                        'id' => '6',
                                        'value' => 'Energizante',
                                        'status' => 'true',
                                    ],
                                    [
                                        'id' => '7',
                                        'value' => 'Zero 250cc',
                                        'status' => 'true',
                                    ]

                                ],
                            ],
                            [
                                'id' => '2',
                                'value' => 'Galletitas',
                                'sub_category' => [
                                    
                                    [
                                        'id' => '1',
                                        'value' => 'Dulces',
                                        'status' => 'true'
                                    ],
                                    [
                                        'id' => '2',
                                        'value' => 'Saladas',
                                        'status' => 'true',
                                    ], 
                                    [
                                        'id' => '3',
                                        'value' => 'Chocolate',
                                        'status' => 'true',
                                    ],
                                    [
                                        'id' => '4',
                                        'value' => 'Bainilla',
                                        'status' => 'true',
                                    ],
                                    [
                                        'id' => '5',
                                        'value' => 'Semillas',
                                        'status' => 'true',
                                    ],
                                    [
                                        'id' => '6',
                                        'value' => 'Arroz',
                                        'status' => 'true',
                                    ]

                                ],
                            ],
                        ],
                    ];

                    //Marca
                    $trade_list = [
                        '_id' => 'trade_list',
                        'type' => 'trade_list',
                        'status' => 'active',
                        'trade_list' => [
                            [
                                'id' => '1',
                                'value' => 'coca cola',
                                'models' => [
                                    [
                                        'id' => '1',
                                        'value' => 'Zero 2.5L',
                                        'status' => 'true'
                                    ],[
                                        'id' => '2',
                                        'value' => 'Zero 1.5L',
                                        'status' => 'true'
                                    ],[
                                        'id' => '3',
                                        'value' => 'Zero 250cc',
                                        'status' => 'true'
                                    ]
                                ],
                            ],
                            [
                                'id' => '2',
                                'value' => 'Speed',
                                'models' => [
                                    [
                                        'id' => '2',
                                        'value' => 'Speed 550cc',
                                        'status' => 'true'
                                    ], [
                                        'id' => '3',
                                        'value' => 'Speed 250cc',
                                        'status' => 'true'
                                    ]
                                ],
                            ],
                            [
                                'id' => '2',
                                'value' => 'Villa Vicencio',
                                'models' => [
                                    [
                                        'id' => '2',
                                        'value' => 'Botella 2.4L',
                                        'status' => 'true'
                                    ], [
                                        'id' => '3',
                                        'value' => 'Botella 1.4L',
                                        'status' => 'true'
                                    ],[
                                        'id' => '4',
                                        'value' => 'Botella 500cc',
                                        'status' => 'true'
                                    ]
                                ],
                            ],
                        ],
                    ];

                    //Modelo
                    $model_list = [
                        '_id' => 'model_list',
                        'type' => 'model_list',
                        'status' => 'active',
                        'model_list' => [
                            [
                                'id' => '1',
                                'value' => 'Zero azucar 1.5l'
                            ],
                            [
                                'id' => '2',
                                'value' => 'Original 250cc'
                            ],
                            [
                                'id' => '3',
                                'value' => 'Sin gas 1.5l'
                            ],
                        ],
                    ];
                    //ATRIBUTOS
                    $attributes = [
                        '_id' => 'attributes',
                        'type' => 'attributes_list',
                        'status' => 'active',
                        'size' => [
                                    [
                                        'id'=> '1',
                                        'status' => 'true',
                                        'value' => 'xs'
                                    ],
                                     [
                                        'id'=> '2',
                                        'status' => 'true',
                                        'value' => 's'
                                    ],
                                    [
                                        'id'=> '3',
                                        'status' => 'true',
                                        'value' => 'm'
                                    ],
                                    [
                                        'id'=> '4',
                                        'status' => 'true',
                                        'value' => 'l'
                                    ],
                                    [
                                        'id'=> '5',
                                        'status' => 'true',
                                        'value' => 'xl'
                                    ],
                                    [
                                        'id'=> '6',
                                        'status' => 'true',
                                        'value' => 'xxl'
                                    ]
                                ]
                    ];
                    //PRODUCTOS DE EJEMPLO
                    $product_01 = [
                        '_id' => 'product-1',
                        'name' => 'Remera colores',
                        'type' => 'product',

                        'tags' => [
                            'Remera',
                            'Lisa',
                            'Adidas'
                        ],
                        'currency' => [
                            'id' => 'ARS',
                            'value' => '$'
                        ],
                        'status' =>  [
                            'value'=> 'active'
                        ],
                        'available_quantity' => 10,
                        'sold_quantity' => 0,
                        'limit_discount' => 0,

                        'permalink' => 'http=>//loalhost/shop/servenet/red-boll-free',
                        'catalog_product_id' => null,

                        'category_id' => 1,
                        // 'sub_category_id' => 1,
                        'trade' => [
                        'id' => 'adi',
                        'value' => 'adidas'
                        ],
                        'model' => [
                            'id' => 'adi',
                            'value' => 'scote v'
                            ],
                        'workspace_id' => 77,
                        'condition' => 'not_specified',
                        'author' => 'smartmobile.com.ar@gmail.com',
                       /* 'attributes' => [
                            [
                                'id' => 'TYPE',
                                'name' => 'Tipo de Ventilador',
                                'value_id' => '291719',
                                'value_name' => 'Botella 50cc',
                                'attribute_group_id' => 'DFLT',
                                'attribute_group_name' => 'type'
                            ],
                            [
                                'id' => 'BRAND',
                                'name' => 'Marca',
                                'value_id' => '3',
                                'value_name' => 'Corona',
                                'attribute_group_id' => 'MAIN',
                                'attribute_group_name' => 'Marca'
                            ]
                        ],*/
                        'variations' => [
                            [
                                'id' => 1,
                                'descriptions' => ['value' => 'Hermoso poder editar la descripción'],
                                'pictures' => [
                                    [
                                        'max' => '/public/img/catalog/product/max/remera_blanca.jpg',
                                        'min' => '/public/img/catalog/product/max/remera_blanca.jpg'
                                    ]
                                ],
                                'size' => [
                                    'status' => 'true',
                                    'value' => 'xl'
                                ],
                                'color' => [
                                    'status' => 'true',
                                    'value' => '#0000'
                                ],
                                'sku' => [
                                    'id' => 'EAN',
                                    'value' => '1231256345345'
                                ],
                               
                                'attribute_combinations' => [
                                    [
                                        'id' => 'COLOR',
                                        'id_name' => 'Color',
                                        'name' => 'Roja',
                                        'value' => 'EF5350'
                                    ],
                                    [
                                        'id' => 'SIZE',
                                        'id_name' => 'Talle',
                                        'name' => 'Medium',
                                        'value' => 'M'
                                    ]
                                ],
                                'price_list' => [
                                    [
                                        'id' => 1,
                                        'value' => 2550
                                    ],
                                    [
                                        'id' => 2,
                                        'value' => 3350
                                    ]
                                    ],
                                'tax'=>[
                                    [
                                      'id'=> '0',
                                      'value'=>'21'
                                      ]
                                    ,
                                      [
                                      'id' => '1',
                                      'value' => '10'
                                      ]
                                ],
                                'stock_invetary' => [
                                    [
                                        'id' => 123,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 6,
                                        'sold_quantity' => 2,
                                        'cost_price' => 100
                                    ],
                                    [
                                        'id' => 231,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 4,
                                        'sold_quantity' => 2,
                                        'cost_price' => 150
                                    ]
                                ],
                                'sold_quantity' => 2
                            ],
                            [
                                'id' => 2,
                                'descriptions' => ['value' => 'Hermoso poder editar la descripción'],
                                'pictures' => [
                                    [
                                        'max' => '/public/img/catalog/product/max/remera_amarilla.jpg',
                                        'min' => '/public/img/catalog/product/max/remera_amarilla.jpg'
                                    ]
                                ],
                                'size' => [
                                    'status' => 'true',
                                    'value' => 'xl'
                                ],
                                'color' => [
                                    'status' => 'true',
                                    'value' => '#0000'
                                ],
                                'sku' => [
                                    'id' => 'EAN',
                                    'value' => '1231256345345'
                                ],
                                'attribute_combinations' => [
                                    [
                                        'id' => 'COLOR',
                                        'id_name' => 'Color',
                                        'name' => 'Azul',
                                        'value' => '0575e6'
                                    ],
                                    [
                                        'id' => 'SIZE',
                                        'id_name' => 'Talle',
                                        'name' => 'Medium',
                                        'value' => 'M'
                                    ]
                                ],
                                'tax'=>[
                                    [
                                      'id'=> '0',
                                      'value'=>'21'
                                      ]
                                    ,
                                      [
                                      'id' => '1',
                                      'value' => '10'
                                      ]
                                ],
                                'price_list' => [
                                    [
                                        'id' => 1,
                                        'value' => 1100
                                    ],
                                    [
                                        'id' => 2,
                                        'value' => 1200
                                    ]
                                ],
                                'stock_invetary' => [
                                    [
                                        'id' => 123,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 4,
                                        'quantity_' => 4,
                                        'cost_price' => 100
                                    ],
                                    [
                                        'id' => 231,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 2,
                                        'cost_price' => 150
                                    ]
                                ],
                                'sold_quantity' => 2
                            ],
                            [
                                'id' => 3,
                                'descriptions' => ['value' => 'Hermoso poder editar la descripción'],
                                'pictures' => [
                                    [
                                        'max' => '/public/img/catalog/product/max/remera_azul.jpg',
                                        'min' => '/public/img/catalog/product/max/remera_azul.jpg'
                                    ]
                                ],
                                'size' => [
                                    'status' => 'true',
                                    'value' => 'xl'
                                ],
                                'color' => [
                                    'status' => 'true',
                                    'value' => '#0000'
                                ],
                                'sku' => [
                                    'id' => 'EAN',
                                    'value' => '1231256345345'
                                ],
                                'attribute_combinations' => [
                                    [
                                        'id' => 'COLOR',
                                        'id_name' => 'Color',
                                        'name' => 'Azul',
                                        'value' => '0575e6'
                                    ],
                                    [
                                        'id' => 'SIZE',
                                        'id_name' => 'Talle',
                                        'name' => 'Medium',
                                        'value' => 'M'
                                    ]
                                ],
                                'tax'=>[
                                    [
                                      'id'=> '0',
                                      'value'=>'21'
                                      ]
                                    ,
                                      [
                                      'id' => '1',
                                      'value' => '10'
                                      ]
                                ],
                                'price_list' => [
                                    [
                                        'id' => 1,
                                        'value' => 1100
                                    ],
                                    [
                                        'id' => 2,
                                        'value' => 1200
                                    ]
                                ],
                                'stock_invetary' => [
                                    [
                                        'id' => 123,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 4,
                                        'quantity_' => 4,
                                        'cost_price' => 100
                                    ],
                                    [
                                        'id' => 231,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 2,
                                        'cost_price' => 150
                                    ]
                                ],
                                'sold_quantity' => 2
                            ]
                        ],
                        'last_update_at' => [
                            [
                                'username' => 'smartmobile.com.ar@gmail.com',
                                'datetime' => '18/3/2021 18:45:10'
                            ],
                            [
                                'username' => 'otrousuario@gmail.com',
                                'datetime' => '18/3/2021 18:45:10'
                            ]
                        ],
                        'start_time' => '2017-03-10T21:18:09.588Z',
                        'stop_time' => '2037-03-05T21:18:09.588Z',
                        'end_time' => '2037-03-05T21:18:09.588Z',
                        'expiration_time' => '2017-05-29T21:18:09.651Z',
                        'shipping' => [
                            'mode' => 'not_specified',
                            'local_pick_up' => false,
                            'free_shipping' => false,
                            'methods' => [],
                            'dimensions' => null,
                            'tags' => [
                                'me2_available'
                            ],
                            'logistic_type' => 'not_specified'
                        ]
                    ];
                    
                    $product_02 = [
                        '_id' => 'product-2',
                        'name' => 'Adidas fit remera ',
                        'status' =>  [
                            'value'=> 'active'
                        ],
                        'type' => 'product',
                        'tags' => [
                            'Remera',
                            'Lisa',
                            'Adidas'
                        ],
                        'currency' => [
                            'id' => 'ARS',
                            'value' => '$'
                        ],
                        'available_quantity' => 10,
                        'sold_quantity' => 0,
                        'limit_discount' => 0,
                        'permalink' => 'http=>//loalhost/shop/servenet/red-boll-free',
                        'catalog_product_id' => null,
                        'category_id' => 1,
                        'sub_category_id' => 1,
                        'workspace_id' => 77,
                        'condition' => 'not_specified',
                        'author' => 'smartmobile.com.ar@gmail.com',
                        'descriptions' => [
                            'Cerveza corona 750cc'
                        ],
                        'attributes' => [
                            [
                                'id' => 'TYPE',
                                'name' => 'Tipo de Ventilador',
                                'value_id' => '291719',
                                'value_name' => 'Botella 50cc',
                                'attribute_group_id' => 'DFLT',
                                'attribute_group_name' => 'type'
                            ],
                            [
                                'id' => 'BRAND',
                                'name' => 'Marca',
                                'value_id' => '3',
                                'value_name' => 'Adidas',
                                'attribute_group_id' => 'MAIN',
                                'attribute_group_name' => 'Marca'
                            ]
                        ],
                        'variations' => [
                            [
                                'id' => 1,
                                'descriptions' => ['value' => 'Hermoso poder editar la descripción'],
                                'pictures' => [
                                    [
                                        'max' => '/public/img/catalog/product/max/remera_azul.jpg',
                                        'min' => '/public/img/catalog/product/max/remera_azul.jpg'
                                    ]
                                ],
                                'size' => [
                                    'status' => 'true',
                                    'value' => 'xl'
                                ],
                                'color' => [
                                    'status' => 'true',
                                    'value' => '#0000'
                                ],
                                'sku' => [
                                    'id' => 'EAN',
                                    'value' => '1231256345345'
                                ],
                                'attribute_combinations' => [
                                    [
                                        'id' => 'COLOR',
                                        'id_name' => 'Color',
                                        'name' => 'Azul',
                                        'value' => '0575e6'
                                    ],
                                    [
                                        'id' => 'SIZE',
                                        'id_name' => 'Talle',
                                        'name' => 'Medium',
                                        'value' => 'M'
                                    ]
                                ],
                                'tax'=>[
                                    [
                                      'id'=> '0',
                                      'value'=>'21'
                                      ]
                                    ,
                                      [
                                      'id' => '1',
                                      'value' => '10'
                                      ]
                                ],
                                'price_list' => [
                                    [
                                        'id' => 1,
                                        'value' => 1100
                                    ],
                                    [
                                        'id' => 2,
                                        'value' => 1200
                                    ]
                                ],
                                'stock_invetary' => [
                                    [
                                        'id' => 123,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 4,
                                        'quantity_' => 4,
                                        'cost_price' => 100
                                    ],
                                    [
                                        'id' => 231,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 2,
                                        'cost_price' => 150
                                    ]
                                ],
                                'sold_quantity' => 2
                            ],
                            [
                                'id' => 2,
                                'descriptions' => ['value' => 'Hermoso poder editar la descripción'],
                                'pictures' => [
                                    [
                                        'max' => '/public/img/catalog/product/max/remera_amarilla.jpg',
                                        'min' => '/public/img/catalog/product/max/remera_amarilla.jpg'
                                    ]
                                ],
                                'size' => [
                                    'status' => 'true',
                                    'value' => 'xl'
                                ],
                                'color' => [
                                    'status' => 'true',
                                    'value' => '#0000'
                                ],
                                'sku' => [
                                    'id' => 'EAN',
                                    'value' => '1231256345345'
                                ],
                                'attribute_combinations' => [
                                    [
                                        'id' => 'COLOR',
                                        'id_name' => 'Color',
                                        'name' => 'Azul',
                                        'value' => '0575e6'
                                    ],
                                    [
                                        'id' => 'SIZE',
                                        'id_name' => 'Talle',
                                        'name' => 'Medium',
                                        'value' => 'M'
                                    ]
                                ],
                                'tax'=>[
                                    [
                                      'id'=> '0',
                                      'value'=>'21'
                                      ]
                                    ,
                                      [
                                      'id' => '1',
                                      'value' => '10'
                                      ]
                                ],
                                'price_list' => [
                                    [
                                        'id' => 1,
                                        'value' => 1100
                                    ],
                                    [
                                        'id' => 2,
                                        'value' => 1200
                                    ]
                                ],
                                'stock_invetary' => [
                                    [
                                        'id' => 123,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 4,
                                        'quantity_' => 4,
                                        'cost_price' => 100
                                    ],
                                    [
                                        'id' => 231,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 2,
                                        'cost_price' => 150
                                    ]
                                ],
                                'sold_quantity' => 2
                            ],
                            [
                                'id' => 3,
                                'descriptions' => ['value' => 'Hermoso poder editar la descripción'],
                                'pictures' => [
                                    [
                                        'max' => '/public/img/catalog/product/max/remera_azul.jpg',
                                        'min' => '/public/img/catalog/product/max/remera_azul.jpg'
                                    ]
                                ],'size' => [
                                    'status' => 'true',
                                    'value' => 'xl'
                                ],
                                'color' => [
                                    'status' => 'true',
                                    'value' => '#0000'
                                ],
                                'sku' => [
                                    'id' => 'EAN',
                                    'value' => '1231256345345'
                                ],
                                'attribute_combinations' => [
                                    [
                                        'id' => 'COLOR',
                                        'id_name' => 'Color',
                                        'name' => 'Azul',
                                        'value' => '0575e6'
                                    ],
                                    [
                                        'id' => 'SIZE',
                                        'id_name' => 'Talle',
                                        'name' => 'Medium',
                                        'value' => 'M'
                                    ]
                                ],
                                'tax'=>[
                                    [
                                      'id'=> '0',
                                      'value'=>'21'
                                      ]
                                    ,
                                      [
                                      'id' => '1',
                                      'value' => '10'
                                      ]
                                ],
                                'price_list' => [
                                    [
                                        'id' => 1,
                                        'value' => 1100
                                    ],
                                    [
                                        'id' => 2,
                                        'value' => 1200
                                    ]
                                ],
                                'stock_invetary' => [
                                    [
                                        'id' => 123,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 4,
                                        'quantity_' => 4,
                                        'cost_price' => 100
                                    ],
                                    [
                                        'id' => 231,
                                        'in_datetime' => '18/3/2021 18:45:10',
                                        'update_datetime' => '18/3/2021 18:45:10',
                                        'quantity' => 2,
                                        'cost_price' => 150
                                    ]
                                ],
                                'sold_quantity' => 2
                            ]
                        ],
                        'last_update_at' => [
                            [
                                'username' => 'smartmobile.com.ar@gmail.com',
                                'datetime' => '18/3/2021 18:45:10'
                            ],
                            [
                                'username' => 'otrousuario@gmail.com',
                                'datetime' => '18/3/2021 18:45:10'
                            ]
                        ],
                        'start_time' => '2017-03-10T21:18:09.588Z',
                        'stop_time' => '2037-03-05T21:18:09.588Z',
                        'end_time' => '2037-03-05T21:18:09.588Z',
                        'expiration_time' => '2017-05-29T21:18:09.651Z',
                        'shipping' => [
                            'mode' => 'not_specified',
                            'local_pick_up' => false,
                            'free_shipping' => false,
                            'methods' => [],
                            'dimensions' => null,
                            'tags' => [
                                'me2_available'
                            ],
                            'logistic_type' => 'not_specified'
                        ]
                    ];

                     //ORDEN DE EJEMPLO
                  
                    $order_01 = [
                        '_id' => 'sales_order_001',
                        'type' => 'order',
                        'category_id' => 'sell',
                        'status' => 'pending',
                        'workspace_id' => 77,
                        'author' => 'smartmobile.com.ar@gmail.com',
                        'group_id' => 'group_123',
                        'order_id' => '123',
                        'group_position' => '1',
                        'priority' => [
                            'id' => '1',
                            'value' => 'urgente'
                        ],
                        'entry_date' => '2023-05-12',
                        'due_date' => '2023-05-20',
                        'collaborators' => [
                            [
                                'name' => 'Collaborator Name 1',
                                'role' => 'Collaborator Role 1'
                            ],
                            [
                                'name' => 'Collaborator Name 2',
                                'role' => 'Collaborator Role 2'
                            ]
                            ],
                            

                            'payment_history' => [
                                [
                                    'id' => 123,
                                    'payment_id' => '21312312',
                                    'payment_method' => 'Credit Card',
                                    'update_datetime' => '18/3/2021 18:45:10',
                                    'user' => 'smartmobile.com@gmail.com',
                                    'total_tax' => 21.00,
                                    'total_discount' => 12.95,
                                    'total' => 339.95,
                                    'currency' => [
                                        'id' => 'ARS',
                                        'value' => '$'
                                    ],
                                ],
                         
                            ],

                        'comments' => 'Additional information or comments about the order',

                        'update_history' => [
                            [
                                'id' => 123,
                                'update_datetime' => '18/3/2021 18:45:10',
                                'user' => 'smartmobile.com@gmail.com',
                            ],
                            [
                                'id' => 231,
                                'in_datetime' => '18/3/2021 18:45:10',
                                'update_datetime' => '18/3/2021 18:45:10',
                                'quantity' => 4,
                                'sold_quantity' => 2,
                                'cost_price' => 150
                            ]
                        ],

                        'priority' => [
                            'id' => '1',
                            'value' => 'high'
                        ],
                        'customer' => [
                            'name' => 'Customer Name',
                            'address' => 'Customer Address',
                            'phone' => 'Customer Phone',
                            'email' => 'Customer Email'
                        ],
                        'products' => [
                            [
                                'product_id' => 'Product 1',
                                'name' => 'Product 1',
                                'variation_id' => 'Product 1',
                                'product_img' => 'Product 1',
                                'price' => 10.99,
                                'tax' => 21.00,
                                'quantity' => 2,
                                'discount' => 10,
                                'subtotal' => 21.98
                            ],
                            [
                                'name' => 'Product 2',
                                'price' => 5.99,
                                'quantity' => 3,
                                'subtotal' => 17.97
                            ]
                        ],
                        'service' => [
                            [
                                'product_id' => 'Product 1',
                                'name' => 'Product 1',
                                'variation_id' => 'Product 1',
                                'product_img' => 'Product 1',
                                'price' => 10.99,
                                'tax' => 21.00,
                                'quantity' => 2,
                                'discount' => 10,
                                'subtotal' => 21.98
                            ],
                            [
                                'service_id' => 'Service 2',
                                'name' => 'Service 2',
                                'variation_id' => '1',
                                'product_img' => 'http:.//',
                                'price' => 100.99,
                                'tax' => 21.00,
                                'quantity' => 2,
                                'discount' => 10,
                                'subtotal' => 210.98
                            ]
                        ],
                        'total_service' => 39.95,
                        'total_product' => 39.95,
                        'total_tax' => 39.95,
                        'total_discount' => 39.95,
                        'total' => 39.95,
                        'shipping' => [
                            'address' => 'Shipping Address',
                            'city' => 'Shipping City',
                            'postal_code' => 'Postal Code',
                            'shipping_date' => '2023-05-15',
                            'shipping_status' => 'pending',
                            'carrier' => [
                                'name' => 'Carrier Name',
                                'phone' => 'Carrier Phone',
                                'vehicle' => 'Carrier Vehicle'
                            ]
                        ],
                      

                    ];

                    //SI SE CREARON CON EXITO CREO LA DB CATALOGO EN COUCHDB
                    $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                    //Agrego el rol del modulo admin al cliente que lo crea

                    // SEGURIDAD TODOS LOS DOCUMENTOS POR CADA MODULO DB
                    $ws_validate_doc_edit = [
                        "_id" => "_design/validate_edit_doc",
                        "validate_doc_update" => "function(newDoc, oldDoc, userCtx)  var role = '" . $module_name . "_edit" . $workspace_id_hex . "';  if (userCtx.roles.indexOf('_admin') === -1 && userCtx.roles.indexOf(role) === -1) { { {throw({forbidden : 'Solo usuarios con el rol!'+rol+'o un administrador pueden editar'});}}",
                    ];

                    $ws_security_doc = [
                        'admins' => [
                            'names' => [$user_email],
                            'roles' => [
                                $ws_module_name . '_' . $ws_rol . '_' . $workspace_id_hex
                            ],
                        ],
                        'members' => [
                            'names' => [],
                            'roles' => [
                                $ws_module_name . '_save_' . $workspace_id_hex,
                                $ws_module_name . '_edit_' . $workspace_id_hex,
                                $ws_module_name . '_reed_' . $workspace_id_hex
                            ],
                        ],
                    ];

                    $doc_security_roll = [
                        "_id" => "_design/doc_security",
                        "validate_doc_update" => "function (newDoc, oldDoc, userCtx) {
                            var isAdmin = userCtx.roles.indexOf('_admin') !== -1;
                            var isOwner = userCtx.roles.indexOf('owner') !== -1;
                            var isEdit = userCtx.roles.indexOf('edit') !== -1;
                            var isWrite = userCtx.roles.indexOf('write') !== -1;
                            var isReed = userCtx.roles.indexOf('reed') !== -1;
                            var isWsConfigDoc = newDoc._id.startsWith('ws_config_');
                            var isLoggedIn = userCtx.name !== null;
                            
                            if (isAdmin || isOwner) {
                              // El administrador o el propietario tienen acceso completo
                              if (newDoc._deleted) {
                                // Permitir eliminar documentos a los propietarios y administradores
                                return;
                              }
                              return; // Permitir editar documentos a los propietarios y administradores
                            }
                            
                            if (isEdit) {
                              // El usuario con el rol 'edit' puede ver y editar documentos propios y de otros
                              if (newDoc._deleted) {
                                // Restringir eliminación a propietarios y administradores solamente
                                throw({ forbidden: 'No tienes permiso para eliminar este documento.' });
                              }
                              return; // Permitir ver y editar documentos propios y de otros
                            }
                            
                            if (isWrite) {
                              // El usuario con el rol 'write' puede ver y editar sus propios documentos, pero no eliminarlos
                              if (newDoc._deleted) {
                                // Restringir eliminación a propietarios y administradores solamente
                                throw({ forbidden: 'No tienes permiso para eliminar este documento.' });
                              }
                              if (oldDoc && oldDoc._id === newDoc._id && oldDoc._rev === newDoc._rev) {
                                // El usuario puede editar su propio documento
                                return;
                              }
                              throw({ forbidden: 'No tienes permiso para editar este documento.' });
                            }
                            
                            if (isReed) {
                              // El usuario con el rol 'reed' solo puede ver documentos y no puede editar ni crear
                              if (newDoc._deleted) {
                                // Restringir eliminación a propietarios y administradores solamente
                                throw({ forbidden: 'No tienes permiso para eliminar este documento.' });
                              }
                              if (!oldDoc) {
                                // Restringir la lectura de documentos a propietarios y administradores solamente
                                throw({ forbidden: 'No tienes permiso para leer este documento.' });
                              }
                              throw({ forbidden: 'No tienes permiso para editar este documento.' });
                            }
                            
                            if (isWsConfigDoc && isLoggedIn) {
                              // Permitir lectura de documentos a todos los usuarios logeados
                              if (!oldDoc) {
                                // Restringir la lectura de documentos a propietarios y administradores solamente
                                throw({ forbidden: 'No tienes permiso para leer este documento.' });
                              }
                              throw({ forbidden: 'No tienes permiso para editar este documento.' });
                            }
                            
                            // Restricción para todos los demás usuarios
                            throw({ forbidden: 'No tienes permiso para acceder a este documento.' });
                        }"
                    ];

                    $ws_collection_get = [
                        '_id' => '_design/get',
                        'views' => [
                            'seach' => [
                                'map' => "function(doc) {\n if(doc.status === 'active' || doc.type === 'product'){\n            var attribute_combinations = new Array();\n   for(var i=0, length=doc.variations.length; i<length; i++){\n      var price_list = doc.variations[0].price_list;\n var stock_list =  doc.variations[0].stock_list;\n  var pictures_min = doc.variations[0].pictures[0].min;\n      var pictures_max = doc.variations[0].pictures[0].max;\n                  var sku = doc.variations[0].sku.value_name;\n                  var variant_id = doc.variations[0].id;\n                  var attribute_combinations = doc.variations[0].attribute_combinations\n               }\n             emit([doc.name],{\n                    '_id': doc._id,\n                    '_rev':doc._rev,\n                    'variant_id':variant_id,\n                    'tipo': doc.type,\n                    'name': doc.name,\n                    'tags': doc.tags,\n                    'currency': doc.currency.value,\n                    'available_quantity': doc.available_quantity,\n                    'sold_quantity': doc.sold_quantity,\n                    'cost_price': doc.cost_price,\n                    'limit_discount': doc.limit_discount,\n                    'price':doc.variations[0].price_list[0].value,\n                    'price_list':price_list,\n  'stock_list':stock_list,\n                    'sku': sku,\n                    'picture_min':pictures_min,\n                    'picture_max':pictures_max,\n 'attribute_combinations':attribute_combinations,\n });\n}\n}\n",
                            ],
                        ]
                    ];


                    //$ws_module_name = "catalog";
                    $this->WorkspaceModel->add_rol($workspace_id_hex, 'catalog', 'admin', $user_email); //AGREGO EL ROL NUEVO DE ESE MODULO AL DOC DEL USUARIO

                    //ASIGNO UN LOS PERMISOS DE USARIOS PARA EL WORKSPACE
                    $this->WorkspaceModel->insert('users_workspace_permission', $ws_permission);

                    // CREO EL DOC DE SEGURIDAD CON LOS USUARIOS Y LOS ROLES Q SE PERMITEN
                    $this->WorkspaceModel->curl_put($db_name . '/_security', $ws_security_doc); //Creo la base de datos de seguridad con los roles

                    // DOC DISEÑO PARA HACER GET CON FILTROS
                    $this->WorkspaceModel->curl_put($db_name . "/_design/get", $ws_collection_get); //Docuento diseno get

                    //DOC COFIGURACIONES
                    $this->WorkspaceModel->curl_put($db_name . '/ws_module_config', $ws_module_config); //Creo un doc con la informacion del workspace
                    $this->WorkspaceModel->curl_put($db_name . '/price_list', $price_list); //Creo un doc con la informacion del workspace
                    $this->WorkspaceModel->curl_put($db_name . '/category_list', $category_list); //Creo un doc con la informacion del workspace
                    $this->WorkspaceModel->curl_put($db_name . '/currency_list', $currency_list); //Creo un doc con la informacion del workspace
                    $this->WorkspaceModel->curl_put($db_name . '/attributes', $attributes); //Creo un doc con la informacion del workspace
                    $this->WorkspaceModel->curl_put($db_name . '/trade_list', $trade_list); //Creo un doc con la informacion las listas de marcas
                    $this->WorkspaceModel->curl_put($db_name . '/model_list', $model_list); //Creo un doc con la informacion las listas de modelos
                    $this->WorkspaceModel->curl_put($db_name . '/tax_list', $tax_list); //Creo un doc con la informacion las listas de modelos
                    //DOC EJEMPLO PRODUCTOS
                    $this->WorkspaceModel->curl_put($db_name . '/product_01', $product_01); //Creo un doc con la informacion del workspace
                    $this->WorkspaceModel->curl_put($db_name . '/product_02', $product_02); //Creo un doc con la informacion del workspace
                   
                    //Creo una carpeta para subir las fotos del catalog
                }
                // ECHO EL 4/5/23
                //BOARDS ORDENES DE VENTA TODAS FILTRADAS POR TIPO, VENTA, COMPRA, SERVICIO, TURNO
                if ($ws_boards) {
                    
                    $order_view = [
                        "_id" => "_design/order_view",
                        "views" => [
                            "by_type_and_category" => [
                                "map" => "function(doc) { if (doc.type === 'order') { emit([doc.type, doc.category_id], doc); } }"
                            ],
                            "by_type_category_status" => [
                                "map" => "function(doc) {
                                    if (doc.type === 'order' && doc.category_id === 'sell' && doc.status === 'open') {
                                        emit([doc.status, doc.type, doc.category_id], {
                                            _id:doc._id,
                                            type: doc.type,
                                            category_id: doc.category_id,
                                            group_id: doc.group_id,
                                            status: doc.status,
                                            order_id: doc.order_id,
                                            entry_date: doc.entry_date,
                                            due_date: doc.due_date,
                                            customer: doc.customer,
                                            collaborators: doc.collaborators
                                        });
                                    }
                                }"
                            ],
                            "by_order_index"=> [
                                "map"=>"function(doc) { if(doc.order_index) emit(doc.order_index, null); }"
                                ]
                        ]
                    ];
                    $db_name = 'ws_boards_' . $workspace_id_hex;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '1', //EL modulo que es
                        'module_type_id' => '0', //el tipo de modulo
                        'auth_permissions_id' => '1',//Nivel de permiso 1 mas alto 
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . '/_security', $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . '/_design/get', $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo

                        $this->WorkspaceModel->curl_put($db_name . '/_design/order_view', $order_view); //Creo el documento de diseno par filtrar documentos por tipo
                        //$this->WorkspaceModel->curl_put($db_name . '/ws_module_config', $ws_module_config); //Creo un doc con la informacion del workspace
                        
                      //  $this->WorkspaceModel->curl_put($db_name . '/order_index', $order_index); //Documento de indice q usan los demas para consultar 
                        $this->WorkspaceModel->curl_put($db_name . '/order_01', $order_01); //Creo un doc con la informacion de la primera orden
                        
                    }
                }




                // ECHO EL 4/5/23
                    /* ========== 
                    INFO DB
                    Edit:10/10/21
                    LA DB INFO GUARDA LAS CONFIGURACIONES DEL WS Y FILTRA LOS PERMISOS PARA PODER EDITAR 
                    LOS DOCUMENTOS DE CONFIFURACION POR UN ADMINISTRADOR
                ======== */
                //BD con configuracion del workspace
                /*if ($ws_info) {
                    $db_name = "ws_info_" . $workspace_id_hex;
                    $ws_module_name = "info";
                    $ws_security_doc = [
                        'admins' => [
                            'names' => [$user_email],
                            'roles' => [
                                $ws_module_name . '_' . $ws_rol . '_' . $workspace_id_hex
                            ],
                        ],
                        'members' => [
                            'names' => [],
                            'roles' => [
                                $ws_module_name . '_save_' . $workspace_id_hex,
                                $ws_module_name . '_edit_' . $workspace_id_hex,
                                $ws_module_name . '_reed_' . $workspace_id_hex
                            ],
                        ],
                    ];
                    $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                    $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                    $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    $this->WorkspaceModel->curl_put($db_name . "/ws_lang_sp", $ws_lang); //Creo un doc con la informacion del workspace
                    $this->WorkspaceModel->add_rol($workspace_id_hex, 'info', 'admin', $user_email); //AGREGO EL ROL NUEVO DE ESE MODULO AL DOC DEL USUARIO
                }
                */
                //Tableros
                if ($ws_boards) {
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo                 
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                }
                // Ventas locales directas
                if ($ws_local_sell) {
                    $db_name = 'ws_local_sell_' . $workspace_id_hex;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '1',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                  /*  if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . '/_security', $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . '/_design/get-type', $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . '/ws_module_config', $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                    */
                }
                // Ordenes (plan-business)
                if ($ws_order_sell) {
                    $db_name = 'ws_order_sell_' . $workspace_id_hex;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '1',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                 /*   if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . '/_security', $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . '/_design/get', $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . '/ws_module_config', $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                    */
                }
                //Ordenes de compra productos
                if ($ws_order_buy) {
                    $db_name = "ws_order_buy_" . $workspace_id_hex;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '2',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                /*    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . '/_security', $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . '/_design/get', $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . '/ws_module_config', $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                    */
                }
                //Ordenes de Servicios tecnicos (plan-business)
                if ($ws_order_tecnic_service) {
                    $db_name = "ws_order_tecnic_service_" . $workspace_id_hex;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '3',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                   /* if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                    */
                }
                  //Ordenes de Servicios professionales (plan-business)
                if ($ws_order_pro_service) {
                    $db_name = "ws_order_pro_service_" . $workspace_id_hex;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '5',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    /*   if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                    */
                }
                //Ordenes del catalogo de pedidos (plan-business-shop)
                if ($ws_order_app) {
                    $db_name = "ws_order_app_" . $workspace_id_hex;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '5',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                /*    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace

                        //Order colection
                        $db_name = "ws_order_app_collections_" . $workspace_id_hex;
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                    */
                }
                 //Contactos
                if ($ws_contact) {
                    $db_name = 'ws_contact_' . $workspace_id_hex;


                    $ws_contact_doc = [
                        "_id" => "001",
                        "type" => "contact",
                        "list_id" => "123",
                        "status" => "open",
                        "entry_date" => "2023-06-01",
                        "due_date" => "2023-06-30",
                        "name" => "John Doe",
                        "email" => "john.doe@example.com",
                        "phones" => [
                          [
                            "type" => "mobile",
                            "number" => "1234567890",
                            "areaCode" => "+1"
                          ],
                          [
                            "type" => "home",
                            "number" => "0987654321",
                            "areaCode" => "+1"
                          ]
                        ],
                        "addresses" => [
                          [
                            "type" => "home",
                            "street" => "Main St",
                            "city" => "Anytown",
                            "state" => "Anystate",
                            "zip" => "12345",
                            "country" => "Country"
                          ],
                          [
                            "type" => "work",
                            "street" => "Other St",
                            "city" => "Othercity",
                            "state" => "Otherstate",
                            "zip" => "67890",
                            "country" => "Othercountry"
                          ]
                        ],
                        "tax_info" => [
                          "tax_id" => "123456789",
                          "vat_id" => "987654321",
                          "registered_name" => "John Doe",
                          "registered_address" => "Main St, Anytown, Anystate, 12345, Country"
                          // ... agregar más campos según sea necesario
                        ]
                        // ... agregar más campos según sea necesario
                      ];


                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '3',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . '/_security', $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . '/_design/get', $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . '/', $ws_contact_doc); //Creo un doc con la informacion del workspace
                    }
                }

                // Control de caja  
                if ($ws_mov_box) {
                    $db_name = "ws_mov_box_" . $workspace_id_hex;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '4',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];

                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    /*  if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                    */
                }
                // Estadisticas 
                if ($ws_statistics) {
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '6',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                }
                // Reportes
                if ($ws_reports) {
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '5',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                }

                  // Movimientos generales 
                  /*
                if ($ws_mov) {
                    $db_name = 'ws_mov_' . $workspace_id_hex;
                   $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id_dec,
                        'ws_id_hex' => $workspace_id_hex,
                        'user_id' => $user_id,
                        'module_id' => '5',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];
                   // $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                    $this->WorkspaceModel->curl_put($db_name . '/_security', $ws_security_doc); //Creo la base de datos de seguridad con los roles
                    $this->WorkspaceModel->curl_put($db_name . '/_design/get', $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                   // $this->WorkspaceModel->curl_put($db_name . '/ws_module_config', $ws_module_config); //Creo un doc con la informacion del workspace
                }
                */
            }
            if ($db->transStatus() === false) {
                $db->transRollback();
                $return = ['msj' => 'Algo salio mal y no se pudo crear!' . $db->transStatus(), 'result' => false];
                return json_encode($return);
            } else {
                $db->transCommit();


                $msj = ['msj' => 'Felicitades! se creo tu espacio ' . $ws_name . ' con exito!', 'result' => true];
                return json_encode($msj);

                // return json_encode($msj);
            }
        }
    }

    public function dell_rol()
    {
        $WorkspaceModel = new WorkspaceModel(); //traigo al modelo
        //   $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
        $workspace_id_hex = '313636';
        $user_email = 'smartmobile.com.ar@gmail.com';
        $response = $WorkspaceModel->dell_rol($workspace_id_hex, 'info', 'admin', $user_email); //AGREGO EL ROL NUEVO DE ESE MODULO AL DOC DEL USUARIO
        //  $response = 'Hola';           
        return $response;
    }

    public function add_rol()
    {
        $WorkspaceModel = new WorkspaceModel(); //traigo al modelo
        //   $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
        $workspace_id_hex = '313636';
        $user_email = 'smartmobile.com.ar@gmail.com';
        $response = $WorkspaceModel->add_rol($workspace_id_hex, 'info', 'admin', $user_email); //AGREGO EL ROL NUEVO DE ESE MODULO AL DOC DEL USUARIO
        //  $response = 'Hola';           
        return $response;
    }
    //Funciones 2023
    function up_pic_async() {
        $config = [
            'upload_path' => './archivos/fotos/',
            'allowed_types' => 'jpg|jpeg|png',
            'max_size' => '5000',
            'file_ext_tolower' => true,
            'encrypt_name' => true
        ];
    
        $this->load->library('upload', $config);
    
        if (!$this->upload->do_upload('foto')) {
            $error = $this->upload->display_errors();
            echo json_encode(['status' => 'error', 'message' => $error]);
            return;
        }
        
        

        $data = $this->upload->data();
        $ruta = $data['file_name'];

        $newName = $file->getRandomName(); 
    
        $titulo = $this->input->post('titulo');
        $descripcion = $this->input->post('descripcion');
    
        // Verificar que el tamaño del archivo sea menor a 5MB
        $fileSize = filesize($ruta);
        if ($fileSize > 5000000) {
            unlink($ruta);
            echo json_encode(['status' => 'error', 'message' => 'El tamaño del archivo es demasiado grande']);
            return;
        }
    
        // Verificar que el tipo de archivo sea imagen JPEG o PNG
        $fileType = mime_content_type($ruta);
        if ($fileType !== 'image/jpeg' && $fileType !== 'image/png') {
            unlink($ruta);
            echo json_encode(['status' => 'error', 'message' => 'Solo se permiten archivos de imagen JPEG o PNG']);
            return;
        }
    
        // Mover el archivo a una carpeta segura
        $carpetaDestino = './archivos/fotos/';
        $nombreArchivo = uniqid() . '_' . $data['orig_name'];
        $rutaFinal = $carpetaDestino . $nombreArchivo;
        if (!move_uploaded_file($ruta, $rutaFinal)) {
            echo json_encode(['status' => 'error', 'message' => 'Error al mover el archivo']);
            return;
        }
    
        // Eliminar el archivo temporal
        unlink($ruta);
    
        // Validar los datos de entrada
        $titulo = filter_input(INPUT_POST, 'titulo', FILTER_SANITIZE_STRING);
        $descripcion = filter_input(INPUT_POST, 'descripcion', FILTER_SANITIZE_STRING);
    
        // Insertar los datos en la base de datos
        $data = [
            'titulo' => $titulo,
            'descripcion' => $descripcion,
            'foto' => $nombreArchivo
        ];
        $this->db->insert('fotos', $data);
    
        echo json_encode(['status' => 'success', 'message' => 'Archivo cargado correctamente']);
    }
    public function img_product_upload()
    {
    if (!logged_in()) {
        return redirect()->to(base_url('/workspace/login'));
    } else {

        $validationRule = [
            'userfile' => [
                'label' => 'Image File',
                'rules' => [
                    'uploaded[userfile]',
                    'is_image[userfile]',
                    'mime_in[userfile,image/jpg,image/jpeg,image/gif,image/png,image/webp]',
                    'max_size[userfile,10000]',
                    //'max_dims[userfile,1024,768]',
                ],
            ],
        ];

        if (!$this->validate($validationRule)) {
            $data = ['errors' => $this->validator->getErrors()];
            return $this->response->setJSON($data);
        }
        $ws_id = session('ws_id');
        $img = $this->request->getFile('userfile');
        $name = $img->getName();
        $newName = $img->getRandomName(); 

        // Obtener el nombre de la imagen vieja
        $variant_id = $this->request->getPost('variant_id');
        $doc_id = $this->request->getPost('doc_id');
        $oldImgPath = './public/img/catalog/ws_collection_'.$ws_id.'/'.$variant_id.'-'.$doc_id.'.jpg';

        // Iniciar una transacción
        $db = db_connect();
        $db->transStart();

        try {
            // Eliminar la imagen vieja si es necesario
            if ($name != $newName && file_exists($oldImgPath)) {
                unlink($oldImgPath);
            }

            // Mover la nueva imagen
            $img->move('./public/img/catalog/ws_collection_'.$ws_id, $newName);

            // Actualizar la información del producto
            $data = [
                'success' => 'Image uploaded successfully',
                'new_name' => '/public/img/catalog/ws_collection_'.$ws_id.'/'. $newName,
                'path' => '/public/img/catalog/ws_collection_'.$ws_id.'/'. $newName
            ];
        } catch (\Exception $e) {
            // En caso de error, deshacer la transacción y enviar el mensaje de error
            $db->transRollback();
            $data = [
                'error' => $e->getMessage(),
            ];
        }

        // Finalizar la transacción
        $db->transComplete();

        return $this->response->setJSON($data);
    }
    }


}
