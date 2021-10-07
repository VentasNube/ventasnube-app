<?php

namespace App\Controllers;

use App\Models\WorkspaceModel;

class Admin extends BaseController
{
    protected $db, $builder;
    protected $WorkspaceModel;
    protected $request;

    public function __construct()
    {
        $this->db = \Config\Database::connect();
        $this->users = $this->db->table('users');
        $this->workspace = $this->db->table('user_workspace');

        $this->WorkspaceModel = new WorkspaceModel();
        $this->request = \Config\Services::request();
        $this->session = service('session');

        $authorize = $auth = service('authorization');
    }

    public function index()
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        return redirect()->to('admin/users');
    }

    // USUARIOS
    public function users($user_id = 0)
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        $db = \Config\Database::connect();
        $ws_db = $db->table('users');
        $ws_db->select('*');
        // $ws_db->join('auth_groups_users', 'auth_groups_users.user_id = users.id');
        //  $ws_db->join('auth_groups', 'auth_groups.id = auth_groups_users.group_id');
        $query_ws_db = $ws_db->get();
        //  $authorize = $auth = service('authorization');
        //  $groups = $authorize->groups();
        $data['title'] = 'Detalle de workspace';
        //  $data['groups'] = $groups; // Creo el array
        $data['users'] = $query_ws_db->getResult(); // Creo el array
        return view('admin/index', $data);
    }

    // USERS
    public function user($user_id = 0)
    {
        $db = \Config\Database::connect();
        /*if ( !logged_in() || !in_groups('admin') ) {
        // $previus_url == previous_url();
        return redirect()->to(base_url('/login'));
        //return redirect()->to($previus_url);
        } */
        $data['title'] = 'Detalle de usuario';
        // CONSULTA DE USERS
        $this->users->select('*');
        $this->users->join('auth_groups_users', 'auth_groups_users.user_id = users.id');
        $this->users->join('auth_groups', 'auth_groups.id = auth_groups_users.group_id');
        $this->users->where('users.id', $user_id);
        $query_users = $this->users->get();
        $data['user'] = $query_users->getRow(); // Creo e array

        // CONSULTA DE WORKSPACE

        $ws_db = $db->table('users_workspace');
        $ws_db->select('*');
        $ws_db->join('workspace', 'workspace.workspace_id = users_workspace.workspace_id');
        $ws_db->where('user_id', $user_id);

        $query_ws_db = $ws_db->get();

        $authorize = $auth = service('authorization');
        $groups = $authorize->groups();

        $data['workspace'] = $query_ws_db->getResult(); // Creo el array
        $data['groups'] = $groups; // Creo el array

        if (empty($data['user'])) {
            return redirect()->to('/admin');
        }
        return view('admin/user', $data);
    }

    public function delete_user($user_id = 0)
    {
        if (!logged_in() || !in_groups('admin')) {
            // $previus_url == previous_url();
            return redirect()->to(base_url('/login'));
            //return redirect()->to($previus_url);
        }
        $db = \Config\Database::connect();
        $ws_db = $db->table('users');
        $ws_db->where('user_id', $user_id);
        //  $Workspace = $ws_db->delete(['workspace_id' => $workspace_id]);
        $return = ['msj' => 'Usuario eliminado con exito!', 'result' => true];
        return json_encode($return);
    }

    public function reset_pass_user($user = 0)
    {
        //  $user->useModel( new \Myth\Auth\Models\UserModel() );
        //  $user = $auth = service('authorization');
        //  $user->forcePasswordReset();
        //  $response = $userModel->save($user);
        //  return json_encode($response);
    }

    public function activate_user($user = 0)
    {
        //  $user->useModel( new \Myth\Auth\Models\UserModel() );
        //  $user = $auth = service('authorization');
        //  $user->forcePasswordReset();
        //  $response = $userModel->save($user);
        //  return json_encode($response);
    }

    // GET user AJAX PARA DATATABLE
    public function get_users()
    {
        if (!logged_in() || !in_groups('admin')) {
            // $previus_url == previous_url();
            return redirect()->to(base_url('/login'));
            //return redirect()->to($previus_url);
        }
        $workspace_id = $this->request->getPost("ws_id");
        $user_name = $this->request->getPost("user_name");
        //$this->users->select('users.id as userid, username, email, name');
        $this->users->select('*');
        $this->users->join('auth_groups_users', 'auth_groups_users.user_id = users.id');
        $this->users->join('auth_groups', 'auth_groups.id = auth_groups_users.group_id');
        $query = $this->users->get();
        $users = $query->getResult();
        //   $query = $db->query("YOUR QUERY");
        foreach ($query->getResultArray() as $user) {
            $items[] = [
                $user['user_id'],
                $user['username'],
                $user['name'],
                $user['email'],
                $user['active'],
                $user['created_at'],
                //  $defaultContent['<button type='button' class='form btn btn-primary btn-xs '> <span class='glyphicon glyphicon-search'></span></button>']
            ];
        }
        $data['data'] = $items;
        return json_encode($data);
    }

    public function removeUserFromGroup($user_id = 0)
    {
        if (!logged_in() || !in_groups('admin')) {
            // $previus_url == previous_url();
            return redirect()->to(base_url('/login'));
        }
        $group_id = $this->request->getPost("group_id");
        $authorize = $auth = service('authorization');
        $authorize->removeUserFromGroup($user_id, $group_id);

        $return = ['msj' => 'Salio todo bien se eliminaron los permisos', 'result' => true];
        return json_encode($return);
    }

    public function addUserFromGroup($user_id = 0)
    {
        if (!logged_in() || !in_groups('admin')) {
            // $previus_url == previous_url();
            return redirect()->to(base_url('/login'));
            //return redirect()->to($previus_url);
        }
        $user_id = $this->request->getPost("user_id"); //Ordenes de ventas
        $group_id = $this->request->getPost("group_id"); //Ordenes de ventas
        $authorize = $auth = service('authorization');
        // $authorize->addPermissionToGroup($permission_id, $group_id);
        $authorize->addUserToGroup($user_id, $group_id);
        $return = ['msj' => 'Salio todo bieen se agregaron los permisos', 'result' => true];
        // $return = ['msj' => 'Algo salio mal!', 'result' => false];
        return json_encode($return);
    }

    // WORKSPACE
    public function workspaces($user_id = 0)
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        //$user_id = $this->request->uri->getSegment(3);
        $db = \Config\Database::connect();
        $ws_db = $db->table('workspace');
        $ws_db->select('*');
        $ws_db->join('users_workspace', 'users_workspace.workspace_id = workspace.workspace_id');
        //$ws_db->join('users', 'users.id = workspace.workspace_id');
        $query_ws_db = $ws_db->get();
        $authorize = $auth = service('authorization');
        $groups = $authorize->groups();
        $data['title'] = 'Detalle de workspace';
        $data['groups'] = $groups; // Creo el array
        $data['workspace'] = $query_ws_db->getResult(); // Creo el array
        // $data['user'] = $user_id;
        return view('admin/workspaces', $data);
        //   return json_encode($data);
    }
    
    //Elimino el WS Completo de todos lados
    public function ws_delete_db($workspace_id = 0)
    {
       
        // || $Workspace === false
        if (!logged_in() || !in_groups('admin')) {
            // $previus_url == previous_url();
            return redirect()->to(base_url('/login'));
            //return redirect()->to($previus_url);
        } else {
            $db = \Config\Database::connect();
            $workspace_id = $this->request->getPost("ws_id");
            // $user_id = user_id(); //Usuario
            //   $Workspace = $this->WorkspaceModel->get_ws_id_user_id($user_id, $workspace_id);            
            $ws_db = $db->table('workspace');
            $ws_user = $db->table('users_workspace');
            $users_workspace_permission = $db->table('users_workspace_permission');
            $db->transBegin();
            //Elimino el workspace de sql
            $Workspace = $ws_db->delete(['workspace_id' => $workspace_id]);
            //Elimino los permisos de SQL
            $users_ws_per = $users_workspace_permission->delete(['ws_id' => $workspace_id]);
            $ws_user = $ws_user->delete(['workspace_id' => $workspace_id]);


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
            // $Workspace = $this->WorkspaceModel->dell('workspace', 'workspace_id', $workspace_id); //Creo el workspace
            // $ws_user = $this->WorkspaceModel->dell('users_workspace', 'workspace_id', $workspace_id); //Asigno el usuario propietario para ese nuevo workspace

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
            if ($db->transStatus() === false) {
                $db->transRollback();
                $return = ['msj' => 'No ingresastes el workspace ID o algo salio mal y no se pudo Eliminar!', 'result' => false];
                return json_encode($return);
            } else {
                $db->transCommit();
                $return = ['msj' => 'Salio todo bieen se eliminaron! [' . $response_code . '] DBS DBS ELiminadas:' . $db_delete . ' DBS Error 404:' . $db_error, 'result' => true];
                // $return = ['msj' => 'Algo salio mal!', 'result' => false];
                return json_encode($return);
                //$return = ['msj' => 'Se creo todo con exito!', 'result' => true];
                // return json_encode($return);
            }
        }
    }

    //MODULES
    // GET user AJAX PARA DATATABLE
    public function payments($user_id = 0)
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        $data['title'] = 'Pagos de servicios';
        return view('admin/payments', $data);
        //   return json_encode($data);
    }

    public function get_payments()
    {
        if (!logged_in() || !in_groups('admin')) {
            // $previus_url == previous_url();
            return redirect()->to(base_url('/login'));
            //return redirect()->to($previus_url);
        }
        $workspace_id = $this->request->getPost("ws_id");
        $user_name = $this->request->getPost("user_name");

        $db = \Config\Database::connect();
        $plan_payment_db = $db->table('plan_payment');
        $plan_payment_db->select('*');

        $plan_payment_db->join('workspace', 'workspace.workspace_id = plan_payment.workspace_id');
        //  $ws_db->join('users_workspace', 'users_workspace.workspace.id = plan_payment.workspace_id');

        $query =  $plan_payment_db->get();
        //   $users = $query->getResult();
        //   $query = $db->query("YOUR QUERY");
        foreach ($query->getResultArray() as $pay) {
            $items[] = [
                $pay['id'],
                $pay['workspace_id'],
                $pay['expiration_date'],
                $pay['insert_date'],
                $pay['workspace_name'],
                $pay['workspace_plan'],
                $pay['workspace_status'],
                //  $defaultContent['<button type='button' class='form btn btn-primary btn-xs '> <span class='glyphicon glyphicon-search'></span></button>']
            ];
        }

        $data['data'] = $items;
        return json_encode($data);
    }

    // PLANES
    public function edit_plan($plan_id = 0)
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        $uri = service('uri');
        $db = \Config\Database::connect();
        //$uri_val = isset($uri->getSegment(4));
        // $plan_id = $uri->getSegment(4);
        $plan_id = $uri->getSegment(3);

        $modules_db = $db->table('module_plan');
        $modules_db->select('*');
        // $plans_db->join('module_plan', 'module_plan.plan_id = plans.id');
        $modules_db->join('module', 'module.m_id = module_plan.module_id');
        $modules_db->where('plan_id', $plan_id);
        $query = $modules_db->get()->getResult();

        $modules_list_db = $db->table('module');
        $modules_list_db->select('*');
        $query_modules_list = $modules_list_db->get()->getResult();

        $data['title'] = 'Modulos del plan';
        $data['modules'] = $query;
        $data['plan_id'] = $plan_id;
        $data['modules_list'] = $query_modules_list;

        // return json_encode( $query);
        return view('admin/edit_plan', $data);
    }

    public function plans()
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        $db = \Config\Database::connect();
        $plans_db = $db->table('plans');
        $plans_db->select('*');
        $query = $plans_db->get()->getResult();
        $data = [
            'plans' => $plans_db->get()->getResult(),
            'title' => 'Planes disponibles workspace',
        ];
        return view('admin/plans', $data);
    }

    public function add_module_plan()
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        $db = \Config\Database::connect();
        $module_id = $this->request->getPost("module_id");
        $plan_id = $this->request->getPost("plan_id");

        $modules_db = $db->table('module_plan');
        $modules_db->select('*');
        $modules_db->where('plan_id', $plan_id);
        $modules_db->where('m_id', $module_id);
        $query = $modules_db->get()->getResult();

        if (!$query) {
            $data = [
                'plan_id' => $plan_id,
                'module_id' => $module_id,
            ];
            $ws_db = $db->table('module_plan');
            $result = $ws_db->insert($data);
            return redirect()->to(base_url('admin/edit_plan/' . $plan_id));

        } else {
            // return redirect()->to(base_url('admin/edit_plan/'. $plan_id));
            // $result =  $ws_db->insert($data);
        }

    }

    public function dell_module_plan()
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }

        //  $previus_url == previous_url();
        //   return redirect()->to(base_url('/login'));
        //   return redirect()->to($previus_url);

        $db = \Config\Database::connect();
        $module_id = $this->request->getPost("module_id");
        $module_plan_id = $this->request->getPost("module_plan_id");
        $plan_id = $this->request->getPost("plan_id");

        $modules_db = $db->table('module_plan');
        $result = $modules_db->delete(['id' => $module_plan_id]);

        //Elimino el workspace de sq
        // $ws_db->delete('workspace_id' => $workspace_id);
        // $Workspace =  $modules_db->delete(['module_id' => $module_id]);
        //   return json_encode($module_id . $module_plan_id .$plan_id_now);
        return redirect()->to(base_url('admin/edit_plan/' . $plan_id));
    }

    public function new_plan()
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        $db = \Config\Database::connect();
        /*   $ws_db = $db->table('modules_group_permission');
        $ws_db->select('*');
        $ws_db->groupBy("a_p_g");
        $ws_db->join('auth_groups', 'auth_groups.id =  modules_group_permission.a_p_g');
        //  $ws_db->join('auth_groups', 'auth_groups.id = auth_groups_users.group_id');
        $query_ws_db = $ws_db->get();*/
        $authorize = $auth = service('authorization');
        $groups = $authorize->groups();
        $data['title'] = 'Detalle de workspace';
        $data['groups'] = $groups; // Creo el array
        $data['plans'] = $query_ws_db->getResult(); // Creo el array*/
        return json_encode($data);
    }

    //MODULES
    public function modules()
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        $db = \Config\Database::connect();
        $ws_db = $db->table('module');
        $ws_db->select('*');
        //$ws_db->join('auth_groups', 'auth_groups.id =  modules_group_permission.a_p_g ');
        //  $ws_db->join('modules', 'modules.m_id = modules_group_permission.m_id');
        //  $ws_db->join('workspace', 'workspace.workspace_id = modules_group_permission.a_p_g');
        //  $ws_db->where('user_id', $user_id);
        $query_ws_db = $ws_db->get();
        $data['title'] = 'Modulos disponibles';
        $data['modules'] = $query_ws_db->getResult();
        // $data['plans'] = $query_ws_db->getResult(); // Creo el array
        //    $data['groups'] = $groups; // Creo el array

        return view('admin/modules', $data);
    }

    public function edit_modules()
    {
        if (!logged_in() || !in_groups('admin')) {
            return redirect()->to(base_url('/login'));
        }
        $db = \Config\Database::connect();
        $m_id = $this->request->getPost("m_id");
        $m_name = $this->request->getPost("m_name");
        $m_board = $this->request->getPost("m_board");
        $m_icon = $this->request->getPost("m_icon");
        $m_color = $this->request->getPost("m_color");
        $m_url = $this->request->getPost("m_url");
        $m_position = $this->request->getPost("m_position");
        $data = [
            'm_name' => $m_name,
            'm_icon' => $m_icon,
            'm_color' => $m_color,
            'm_url' => $m_url,
            'm_position' => $m_position,
        ];
        $ws_db = $db->table('module');
        $result = $ws_db->update($data, ['m_id' => $m_id]);
        ## Update record
        if ($result) {
            //session()->setFlashdata('message', 'Updated Successfully!');
            // session()->setFlashdata('alert-class', 'alert-success');
            return redirect()->to(base_url('admin/modules/'));
        } else {
            return json_encode($result);
        }
    }


}
