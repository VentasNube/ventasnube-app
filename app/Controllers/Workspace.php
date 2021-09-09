<?php

namespace App\Controllers;

use App\Models\BodyModel;
use App\Models\OwnerModel;
use App\Models\UserModel;
use App\Models\WorkspaceModel;

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
    public function index()
    {
        if (!logged_in()) {
            return redirect()->to(base_url('/login'));
        }
        $user_id = user_id();
        $Workspace = new WorkspaceModel(); //traigo al modelo
        $Workspace = $Workspace->get_all_ws_user($user_id); //cargo la data en un array
        //  $ws_id = session('ws_id');
        //$ws_id = $this->session->set($ws_select_data);

        if ($Workspace) {
            return redirect()->to(base_url('/workspace/home'));
        } else {
            return redirect()->to(base_url('/workspace/welcome'));
        }
    }
    // Vista Home ws
    public function home()
    {
        if (!logged_in()) {
            return redirect()->to(base_url('/login'));
        } else {
            $user_id = user_id();
            $Owner = new OwnerModel(); //traigo el modelo
            $Workspace = new WorkspaceModel(); //traigo al modelo
            $Workspace = $Workspace->get_all_ws_user($user_id); //cargo la data en un array
            //  $ws_id = session('ws_id');//Chekeo q aya iniciado sesion y seleccionado
            if ($Workspace) {
                $User = new UserModel(); //traigo el modelo
                $data['owner'] = $Owner->getOwner(); //cargo la data en un array
                $data['user'] = $User->getUser($user_id); //cargo la data en un array
                $data['ws_user'] = $this->WorkspaceModel->get_all_ws_user($user_id); //cargo la data en un array
                return view('workspace/workspace_home', $data);
            } else {
                return redirect()->to(base_url('/workspace/welcome'));
            }
        }
    }

    //Vista Welcome
    public function welcome()
    {

        if (!logged_in()) {
            return redirect()->to(base_url('/login'));
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
            return redirect()->to(base_url('/login'));
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

    // Creo un nuevo WS Completo
    public function ws_new()
    {
        if (!logged_in()) {
            return redirect()->to(base_url('/login'));
        } else {
            $db = \Config\Database::connect();
            $UserModel = new UserModel(); //traigo el modelo user para pedir datos de la session
            $Owner = new OwnerModel(); //traigo el modelo
            //  $User = new UserModel(); //traigo el modelo
            $Body_model = new BodyModel(); //traigo el modelo
            helper('date');
            $user_id = user_id(); //Usuario
            $user_email = $UserModel->getUserData($user_id, 'email'); //Traigo el email del usuario
            // $user_email = user_email();
            //Permisos de toda la APP Mysql y Couchdb
            //1 owner  PUEDE LEER, CREAR, EDITAR, ELIMINAR, NOMBRAR owner...
            //2 admin  PUEDE LEER, CREAR, EDITAR, ELIMINAR, AGREGAR COLAB...
            //3 edit   PUEDE LEER, CREAR, EDITAR
            //4 save   PUEDE LEER, CREAR,
            //5 reed   PUEDE LEER
            //Comfiguraciones de seguridad y lisencia
            $user_auth_permissions = '_admin'; // Permiso de app
            $ws_plan = 'plan-starter-free'; // Plan starter
            $ws_zona_h = $this->request->getPost("ws_zona_h");
            $ws_db_pacht = now($ws_zona_h);
            $now = now($ws_zona_h);
            $data_now = date("M d Y H:i:s", $now);
            //sumo 1 mes
            $ws_plan_expiration = date("Y-m-d H:i:s", strtotime($data_now . "+ 1 month"));
            // Datos de apariencia de la app
            $ws_name = $this->request->getPost("ws_name");
            $ws_avatar_img = $this->request->getPost('ws_avatar_img');
            $ws_color = $this->request->getPost('ws_color');
            //Datos de contacto
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
                'workspace_status' => '2',//Abono al dia 1 // Prueba gratis 30 dias 2  //Con deuda 2 //Suspendido 4 //Inabilitado 5
                'workspace_zona_h' => $ws_zona_h,
                'workspace_phone' => $ws_phone,
                'workspace_img' => $ws_avatar_img,
                //Datos de lisencia
                // activationSuccess
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
            //Inicio la trasaccion
            $db->transBegin();
            //$Workspace = $this->WorkspaceModel->new_ws($ws_data);
            //Creo el workspace
            $Workspace = $this->WorkspaceModel->insert('workspace', $ws_data); //

            $workspace_id = $db->insertID(); //Tomo el nuevo id del workspace
            //Compruebo q se creo el usuario con exito
            if ($workspace_id) {
                //Habilito el usuario al nuevo workspace
                $ws_user_data = [
                    'workspace_id' => $workspace_id,
                    'user_id' => $user_id,
                    'user_group' => $user_auth_permissions,
                    'user_workspace_status' => 'active',
                    'user_workspace_create_time' => now(),
                ];
                // $ws_user = $this->WorkspaceModel->new_user_ws($ws_user_data); //Asigno el usuario propietario para ese nuevo workspace
                $ws_user = $this->WorkspaceModel->insert('users_workspace', $ws_user_data);
                //Modulos del sistema del (plan-starter)( BASICO)

                $ws_boards =  true;
                $ws_info = true; //Todas las configuracinoes del workspace
                $ws_collections = true; //Catalogo de productos y servicios
                $ws_collections_img = false; //Base de datos de imagenes en formato blob o base64
                $ws_contact = true; //Catalogo de contactos
                $ws_mov = true; //Control de movimientos cajas diario
                $ws_local_sell = true; //Ventas del local

                //Movimientos de caja (plan-professional) (SUMO LOS MODULOS)
                //Ordenes (plan-business)  //Activar dependiendo el modulo seleccionado  Maximo (3)
                $ws_order_buy = $this->request->getPost('ws_order_buy'); //Orden de Compras
                $ws_order_sell = $this->request->getPost("ws_order_sell"); //Ordenes de ventas
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
                // $ws_order_shop = $this->request->getPost("ws_order_shop"); //Ordenes de ventas del la pagina
                //Creo el doc de seguridad para usar en todas las DB

                $ws_security_doc = [
                    'admins' => [
                        'names' => [$user_email],
                        'roles' => [$user_auth_permissions],
                    ],
                    'members' => [
                        'names' => [],
                        'roles' => [],
                    ],
                ];

                //Creo el doc de diseno para hacer las consultas por tipo de doc a la nueva db
                $ws_get_type_doc = [
                    '_id' => '_design/get-type',
                    'filters' => [
                        'myfilter' => 'function(doc, req) {\r\n                return doc.type === req.query.type;\r\n            }',
                    ],
                ];

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
                    '_id' => 'ws_info' . $workspace_id,
                    'author' => $user_email,
                    'type' => 'ws_info',
                    'create_at' => $data_now,
                    'ws_data' => $ws_data,
                    'ws_contact_data' => $ws_contact_data,
                    'ws_module_select' => $ws_module_active,
                ];

                //1 _owner  PUEDE LEER, CREAR, EDITAR, ELIMINAR, NOMBRAR COLAB... (borra la instancia y nombrar _admin)
                //2 _admin  PUEDE LEER, CREAR, EDITAR, ELIMINAR, AGREGAR COLAB...
                //3 _edit   PUEDE LEER, CREAR, EDITAR
                //4 _save   PUEDE LEER, CREAR,
                //5 _reed   PUEDE LEER

                //Creo los documentos por defecto para crear un WS

                $ws_get_type_doc = [
                    '_id' => '_design/get-type',
                    'filters' => [
                        'myfilter' => 'function(doc, req) {\r\n                return doc.type === req.query.type;\r\n            }',
                    ],
                ];

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
                    // 'workspace_created_at' => now(),
                    'workspace_plan_expiration' => $ws_plan_expiration,
                    'workspace_db_pacht' => $ws_db_pacht,
                    'workspace_status' => 'active',
                    'workspace_zona_h' => $ws_zona_h,
                    'workspace_phone' => $ws_phone,
                    'workspace_img' => $ws_avatar_img,
                    'tax' => [
                        [
                            'tax_id' => 'iva',
                            'tax_name' => 'IVA',
                            'tax_value' => '21',
                        ],
                    ],
                    'money' => '$',
                    //Datos de lisencia
                    // activationSuccess
                ];

                $price_list = [
                    '_id' => 'price_list',
                    'type' => 'price_list',
                    'status' => 'active',
                    'price_list' => [
                        [
                            'id' => '1',
                            'value' => 'Consumidor Final',
                            'currency' => [
                                'id' => 'ARS',
                                'value' => '$',
                            ],
                        ],
                        [
                            'id' => '2',
                            'value' => 'Gremio',
                            'currency' => [
                                'id' => 'ARS',
                                'value' => '$',
                            ],
                        ],
                        [
                            'id' => '3',
                            'value' => 'Mayorista',
                            'currency' => [
                                'id' => 'ARS',
                                'value' => '$',
                            ],
                        ],
                        [
                            'id' => '4',
                            'value' => 'Mercado Libre',
                            'currency' => [
                                'id' => 'ARS',
                                'value' => '$',
                            ],
                        ],
                        [
                            'id' => '5',
                            'value' => 'Web',
                            'currency' => [
                                'id' => 'ARS',
                                'value' => '$',
                            ],
                        ],
                    ],
                ];

                $currency_list = [
                    '_id' => 'currency_list',
                    'type' => 'product',
                    'status' => 'active',
                    'currency_list' => [
                        [
                            'id' => 'ARS',
                            'value' => '$',
                        ],
                        [
                            'id' => 'DOLAR',
                            'value' => 'u$s',
                        ],
                        [
                            'id' => 'EUR',
                            'value' => '€',
                        ],
                    ],
                ];

                $category_list = [
                    '_id' => 'category_list',
                    'type' => 'product',
                    'status' => 'active',
                    'category_list' => [
                        [
                            'id' => '1',
                            'value' => 'Gaseosas',
                        ],
                        [
                            'id' => '2',
                            'value' => 'Energizante',
                        ],
                        [
                            'id' => '3',
                            'value' => 'Agua sin gas',
                        ],
                    ],
                ];

                $attributes = [
                    '_id' => 'attributes',
                    'type' => 'attributes_list',
                    'status' => 'active',
                    'attributes_list' => [
                        [
                            'id' => 'COLOR',
                            'value' => 'Consumidor Final',
                        ],
                        [
                            'id' => 'TYPE',
                            'value' => 'Gremio',
                        ],
                        [
                            'id' => 'SIZE',
                            'value' => 'Mayorista',
                        ],
                        [
                            'id' => '4',
                            'value' => 'Mercado Libre',
                        ],
                        [
                            'id' => '5',
                            'value' => 'Web',
                        ],
                    ],
                ];

                $ws_setting = [
                    [
                        '_id' => 'ws_setting_' . $workspace_id,
                        'offline_mode' => 'true',
                    ],
                ];

                //Documento con la info del workspace creado
                $ws_body = [
                    '_id' => 'ws_left_nav_' . $workspace_id,
                    'ws_left_nav' => [
                        'owner' => [$Owner->getOwner()],
                        'ws_data' => $ws_data,
                        'ws_module_select' => $ws_module_active,
                        //OLD 'm' => $Body_model->get_m($group_id),
                        //'m' => $Body_model->get_m($user_id),
                        //  'group_id' => $group_id,
                        'result' => true,
                    ],
                ];
                //DOC del lenguaje
                $ws_lang = [
                    '_id' => 'ws_lang_sp_' . $workspace_id,
                    'ws_lang_es' => [
                        'b_myaccount' => 'Mi cuenta',
                        'b_exit' => 'Salir',
                        'b_search_tittle' => 'Buscar lo que sea..',
                        'b_tittle_workspace' => 'Mis espacios de trabajo',
                        'm_board' => 'Tableros',
                        'm_catalog' => 'Catalogo',
                        'm_box' => 'Caja',
                        'm_my_box' => 'Mi caja',
                        'm_all_box' => 'Todas las cajas',
                        'm_contact' => 'Contactos',
                        'm_reports' => 'Reportes',
                        'm_stats' => 'Estadisticas',
                        'm_cart' => 'Carrito',
                        'm_favorite' => 'Favoritos',
                        'm_myaccount' => 'Mi cuenta',
                        'm_myorders' => 'Mis compras',
                        'm_my_workspace' => 'Mis negocios',
                        'b_ok' => 'Ok',
                        'b_dell' => 'Eliminar',
                        'b_add' => 'Agregar',
                        'b_confirm' => 'Estas seguro?',
                        'b_reload' => 'Reintentar',
                        'b_undo' => 'Deshacer',
                        'b_error' => 'Error',
                        'a_add_confirm' => 'Agregado con exito!',
                        'a_add_conflict' => 'No se pudo agregar!',
                        'a_dell_product' => 'Quieres eliminar el producto?',
                        'a_dell_confirm' => 'Se elimino con exito!',
                        'a_dell_conflict' => 'No se pudo eliminar!',
                        'b_add_order' => 'Crear orden',
                        'm_cart_trash' => 'El carrito esta vacio',
                        'm_cart_all_dellete' => 'El carrito esta vacio',
                        'b_cart_add_product' => 'Agrega productos',
                        'b_add_cart' => 'Agregar al carrito',
                        'm_fav_trash' => 'No tienes favoritos',
                        'b_add_fav' => 'Agregar a favoritos',
                        'b_fav_add_all_items' => 'Agregar todos a favoritos',
                        't_search' => 'Busca lo que sea..',
                        't_cart' => 'Carrito',
                        't_fav' => 'Favoritos',
                        't_new_product' => 'Crear producto',
                        't_total' => 'Total',
                        't_service' => 'Total Servicios',
                        't_product' => 'Total Productos',
                        't_dicount' => 'Total Descuentos',
                        't_tax' => 'Total impuestos',
                        't_pay' => 'Total abonado',
                        'b_product' => 'Productos',
                        'b_service' => 'Servicios',
                        'b_contact' => 'Contactos',
                    ],
                ];

                // Hago las comprobaciones y creo las bases de datos
                //Creo al dB info con sus documentos de diseno y seguridad
                //Modulos del sistema del (plan-starter)
                //  'author' => $user_email,
                $binary = $user_email;
                $hex = bin2hex($binary);
                $db_user = 'userdb-' . $hex;
                $this->WorkspaceModel->curl_put($db_user . "/ws_left_nav_" . $workspace_id, $ws_body); //Creo el doc
                // $this->WorkspaceModel->curl_put($db_user . "/ws_setting_" . $workspace_id, $ws_setting); //Creo el doc

                // $this->WorkspaceModel->curl_put( $db_user . "_design/get". $workspace_id, $user_get_type); //Creo el doc
                if ($ws_info) {
                    $db_name = "ws_info_" . $workspace_id;
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                        $this->WorkspaceModel->curl_put($db_name . "/ws_lang_sp", $ws_lang); //Creo un doc con la informacion del workspace
                }

                // Catalogo de productos
                if ($ws_collections) {
                    $db_name = "ws_collections_" . $workspace_id;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '2',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                        $this->WorkspaceModel->curl_put($db_name . "/price_list", $price_list); //Creo un doc con la informacion del workspace
                        $this->WorkspaceModel->curl_put($db_name . "/category_list", $category_list); //Creo un doc con la informacion del workspace
                        $this->WorkspaceModel->curl_put($db_name . "/currency_list", $currency_list); //Creo un doc con la informacion del workspace
                        $this->WorkspaceModel->curl_put($db_name . "/attributes", $attributes); //Creo un doc con la informacion del workspace
                    }

                }
                //Contactos
                if ($ws_contact) {
                    $db_name = "ws_contact_" . $workspace_id;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '3',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                }
                // Movimientos generales 
                if ($ws_mov) {
                    $db_name = "ws_mov_" . $workspace_id;
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    
                }





                if ($ws_boards) {
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                }
                
                // Ventas locales directas
                if ($ws_local_sell) {
                    $db_name = "ws_local_sell_" . $workspace_id;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '1',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                }

                // Ordenes (plan-business)
                if ($ws_order_sell) {
                    $db_name = "ws_order_sell_" . $workspace_id;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '4',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                }

                //Ordenes de compra productos
                if ($ws_order_buy) {
                    $db_name = "ws_order_buy_" . $workspace_id;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '4',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                }

                //Ordenes de Servicios professionales (plan-business)
                if ($ws_order_pro_service) {
                    $db_name = "ws_order_pro_service_" . $workspace_id;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '3',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                }

                 //Ordenes de Servicios tecnicos (plan-business)
                if ($ws_order_tecnic_service) {
                    $db_name = "ws_order_tecnic_service_" . $workspace_id;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '5',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                }

                //Ordenes del catalogo de pedidos (plan-business-shop)
                if ($ws_order_app) {
                    $db_name = "ws_order_app_" . $workspace_id;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '1',
                        'module_type_id' => '6',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace

                        //Order colection
                        $db_name = "ws_order_app_collections_" . $workspace_id;
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }
                }

                // Control de caja  
                if ($ws_mov_box) {
                    $db_name = "ws_mov_box_" . $workspace_id;
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '4',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];

                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                    if ($result) {
                        $this->WorkspaceModel->curl_put($db_name); //Creo la base de dato
                        $this->WorkspaceModel->curl_put($db_name . "/_security", $ws_security_doc); //Creo la base de datos de seguridad con los roles
                        $this->WorkspaceModel->curl_put($db_name . "/_design/get-type", $ws_get_type_doc); //Creo el documento de diseno par filtrar documentos por tipo
                        $this->WorkspaceModel->curl_put($db_name . "/ws_module_config", $ws_module_config); //Creo un doc con la informacion del workspace
                    }

                }

                // Estadisticas 
                if ($ws_statistics) {
                    $ws_user_workspace_permission = [
                        'ws_id' => $workspace_id,
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
                        'ws_id' => $workspace_id,
                        'user_id' => $user_id,
                        'module_id' => '5',
                        'module_type_id' => '0',
                        'auth_permissions_id' => '1',
                    ];
                    $result = $this->WorkspaceModel->insert('users_workspace_permission', $ws_user_workspace_permission);
                }


            }
            if ($db->transStatus() === false) {
                $db->transRollback();
                $return = ['msj' => 'Algo salio mal y no se pudo crear!' . $db->transStatus(), 'result' => false];
                return json_encode($return);
            } else {
                $db->transCommit();
                $return = ['msj' => 'Se creo todo con exito!', 'result' => true];
                return json_encode($return);
            }

        }
    }

    /* //Elimino el WS Completo de todos lados
public function ws_delete_db()
{
//if (!logged_in() && in_groups('admin')) {

$workspace_id = $this->request->uri->getSegment(3);
$user_id = user_id(); //Usuario
$Workspace = $this->WorkspaceModel->get_ws_id_user_id($user_id, $workspace_id);
// || $Workspace === false
if (!logged_in() ) {
// $previus_url == previous_url();
return redirect()->to(base_url('/login'));
//return redirect()->to($previus_url);
} else {
$db = \Config\Database::connect();
$ws_db = $db->table('workspace');
$ws_user = $db->table('users_workspace');

$db->transBegin();

//Elimino el workspace de sql
// $ws_db->delete('workspace_id' => $workspace_id);
$ws_db->delete(['workspace_id' => $workspace_id]);
$ws_user->delete(['workspace_id' => $workspace_id]);

$ws_info = true; //Todas las configuracinoes del workspace
$ws_collections = true; //Catalogo de productos y servicios
$ws_collections_img = true; //Base de datos de imagenes en formato blob o base64
$ws_contact = true; //Catalogo de contactos
$ws_mov = true; //Control de movimientos cajas diario
$ws_local_sell = true; //Ventas del local

///Movimientos de caja (plan-professional) (SUMO LOS MODULOS)
//Ordenes (plan-business)  //Activar dependiendo el modulo seleccionado  Maximo (3)
$ws_order_buy = true; //Orden de Compras
$ws_order_sell = true; //Ordenes de ventas
$ws_mov_box = true; //Control de movimientos cajas diario
$ws_statistics = true; //Estadisticas (no es una DB)

//Plan (plan-business-service)
//Ordenes de Servicios (plan-business)
$ws_reports = true; //Reportes (No es una DB)
$ws_order_pro_service = true; //Ordenes de servicios profecionales
$ws_order_tecnic_service = true; //Ordenes de servicio tecnico
$ws_order_app = true; //

$Workspace = $this->WorkspaceModel->dell('workspace', 'workspace_id', $workspace_id); //Creo el workspace
$ws_user = $this->WorkspaceModel->dell('users_workspace', 'workspace_id', $workspace_id); //Asigno el usuario propietario para ese nuevo workspace

if ($Workspace || $ws_user) {

$db_delete = 0;
$db_error = 0;
if ($ws_info) {
$db_name = "ws_info_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}

if ($ws_collections) {
$db_name = "/ws_collections_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}

if ($ws_collections_img) {
$db_name = "ws_collections_img_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}

if ($ws_contact) {
$db_name = "ws_contact_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}

if ($ws_mov) {
$db_name = "ws_mov_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}

if ($ws_local_sell) {
$db_name = "ws_local_sell_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}
//Creo las DB dependiendo si fueron seleccionadas
//Ordenes (plan-business)
if ($ws_order_sell) {
$db_name = "ws_order_sell_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}
if ($ws_order_buy) {
$db_name = "ws_order_buy_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}
if ($ws_mov_box) {
$db_name = "ws_mov_box_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}
//Ordenes de Servicios (plan-business)
if ($ws_order_pro_service) {
$db_name = "ws_order_pro_service_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}
if ($ws_order_tecnic_service) {
$db_name = "ws_order_tecnic_service_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}

}
//Ordenes de Servicios (plan-business-shop)
if ($ws_order_app) {
$db_name = "ws_order_app_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
//Order colection
$db_name = "ws_order_app_collections_" . $workspace_id;
$response_code = $this->WorkspaceModel->curl_delete_db($db_name); //Creo la base de dato
if ($response_code = '200') {
$db_delete += 1;
} elseif ($response_code == '404') {
$db_error += 1;
}
}

}

}
if ($db->transStatus() === false) {
$db->transRollback();
$return = ['msj' => 'No ingresastes el workspace ID o algo salio mal y no se pudo Eliminar!', 'result' => false];
return json_encode($return);
} else {
$db->transCommit();
$return = ['msj' => 'Salio todo bieen se eliminaron! [' . $response_code . '] DBS', 'DBS ELiminadas' => $db_delete, 'DBS Error 404' => $db_error, 'result' => true];
// $return = ['msj' => 'Algo salio mal!', 'result' => false];
return json_encode($return);
//$return = ['msj' => 'Se creo todo con exito!', 'result' => true];
// return json_encode($return);
}
}
 */
}
