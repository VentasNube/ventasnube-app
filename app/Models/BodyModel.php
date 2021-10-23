<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\I18n\Time; // LIBRERIA PARA MANEJAR LAS FECHAS TIEMPO https://codeigniter4.github.io/userguide/libraries/time.html#instantiating

class BodyModel extends Model//Crea el nombre de el modelo

{

    public function __construct()
    {
        parent::__construct();
        $db = \Config\Database::connect();
    }


    protected $table = 'modules'; //Trae los datos de la tabla owner
    //protected $table      = 'users';
    // protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = true;
    //  protected $allowedFields = ['name', 'email'];
    protected $useTimestamps = false;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';
    //  protected $validationRules    = [];
    //  protected $validationMessages = [];
    //  protected $skipValidation     = false;

/*
    /// TRAE TODOS LOS MODULOS QUE TIENE USER PERMISION EL USUARIO(Se usa para la navegacion lateral)
    public function get_group($user_id = false)
    {
        // $group_id = 2;
        $db = \Config\Database::connect();
        $builder = $db->table('auth_groups_users');
        // $builder->db->table('blog');
        $builder->select('*');
        //  $builder->join(' module.m_id', ' module.m_id = modules_group_permission.m_id');
        //$builder->join('modules_group_permission', 'modules_group_permission.m_id = module.m_id');
        // $builder->orderBy('m_position', 'Asc');
        $builder->where('user_id', $user_id);
        $query = $builder->get()->getResultArray();
        // lang('Auth.loginSuccess');
        foreach ($query as $row) {
            $group_id = $row['group_id'];
        }
        return $group_id;
    }

    /// GET MODULE PLAN
    public function get_m_plan($plan_id = false)
    {
        // $group_id = 2;
        $db = \Config\Database::connect();
        $builder = $db->table('module');
        $builder->select('*');
        $builder->join('modules_group_permission', 'modules_group_permission.m_id = module.m_id');
        $builder->orderBy('m_position', 'Asc');
        $builder->where('a_p_g', $group_id);
        $query = $builder->get()->getResultArray();
        // lang('Auth.loginSuccess');
        if ($query) {
            foreach ($query as $row) {
                //   $group_id = $row['group_id'];
                $row_m[] = array(
                    'm_id' => $row['m_id'],
                    'm_type_action' => $row['m_type_action'],
                    'm_color' => $row['m_color'],
                    //Con el uso de lang puedo cambiar el texto de los botones internamente
                    'm_name' => lang('Body.' . $row['m_name'] . ''),
                    'm_url' => $row['m_url'],
                    'm_icon' => $row['m_icon'],
                );
            }
            //return   json_encode($row_m);
            return $row_m;
        } else {
            return false;
        }
    }

    ///  TRAE TODOS el Group ID (NO SE DONDE SE USA LO REEMPLAZE POR GET_M)
    public function get_user_workspace_permission($user_id = false, $ws_id = false)
    {

        $db = \Config\Database::connect();
        $module_db = $db->table('users_workspace_permission');
        $module_db->select('*');

        $module_db->join('module', 'module.m_id = users_workspace_permission.module_id');
        $module_db->join('auth_permissions', 'auth_permissions.id = users_workspace_permission.auth_permissions_id');

        $module_db->where('user_id', $user_id);
        $module_db->where('ws_id', $ws_id);
        //$module_db->where('module_type_id >=', 0);

        //    $query = $plans_db->get()->getResult();
        $query = $module_db->get()->getResultArray();

        if ($query) {
            foreach ($query as $row) {
                if ($row['module_type_id'] == 0) {
                    $row_m[] = array(
                        'm_id' => $row['m_id'],
                        'm_type_action' => $row['m_type_action'],
                        'm_color' => $row['m_color'],
                        'm_name' => lang('Body.' . $row['m_name'] . ''), //Con el uso de lang puedo cambiar el texto de los botones internamente
                        'm_url' => $row['m_url'],
                        'm_icon' => $row['m_icon'],
                        // 'm_t_position' => $row['m_t_position'],
                    );
                }
            }
            return $row_m;
        } else {
            return false;
        }
    }
*/
    ////***** FUNCIONES 2021 finales NO SE SI SE USA  */
    
     ///  FILTRA LOS ESPACIOS DE TRABAJO Y VERIFICA QUE NO ESTE VENCIDO EL PAGO DEL SERVICIO
     public function get_ws($ws_id_hex = false)
     {
         helper('date');
         $ws_zona_h = 'America/Argentina/Buenos_Aires';
         $now = now($ws_zona_h);
         // $time = Time::parse( $now, $ws_zona_h);
         $time = Time::now($ws_zona_h, 'en_US');
         $data_now = $time->toDateString();     // 2016-03-09
         //sumo 1 mes
         // $ws_plan_expiration = date("Y-m-d H:i:s", strtotime($data_now . "+ 1 month"));
         ///FIN FECHA
         $db = \Config\Database::connect();
         $plans_db = $db->table('workspace');
         $plans_db->select('*');
         $plans_db->where('workspace_id_hex', $ws_id_hex);
         //$plans_db->where('workspace_status <=', 2);  
         //  $plans_db->where('workspace_plan_expiration >', $data_now);        
         // $query = $plans_db->get()->getResult();
         $query = $plans_db->get()->getResultArray();

         if ($query) {
           foreach ($query as $row) {
                    $ws_expiration =  date("Y-m-d", strtotime($row['workspace_plan_expiration']));
                    $workspace_status = $row['workspace_status'];
                    //Compruebo q la fecha este vigente y envio el msj al cliente para q regularice la cuenta.
                    if ($data_now >= $ws_expiration){
                        $msj_status = 'El pago de tu cuota vence: '.$ws_expiration.' regulariza el pago para que no se suspenda tu cuenta!';
                        $return = false;  
                    }
                    //Hago comprobacion de q estado esta la cuenta y cargo el msj
                    else if($workspace_status === '2'){
                        $msj_status = 'Tu cuenta gratis esta activa y vence:'.$ws_expiration;
                        $return = true; 
                    }
                    else{
                        $msj_status = 'Tu cuenta esta activa! y tu cuota vence:'.$ws_expiration;
                        $return = true; 
                       // return $ws_plan;  
                    }
                    $ws_plan = [
                        'workspace_id' => $row['workspace_id'],
                        'workspace_plan' => $row['workspace_plan'],
                        'workspace_name' => $row['workspace_name'],
                        'workspace_plan_expiration' => $ws_expiration,
                        'workspace_status'=> $workspace_status,
                        'msj'=> $msj_status,                        
                        'time_now'=> $now,
                        'return' => $return,
                       // 'active' => $return,
                    ];
                    return $ws_plan;                    
             }
            /// return $query;
         }else{
            return false;

         }
     }

    ///  TRAE TODOS LOS MODULOS AUTORIZADOS DEL USUARIO EN UN ARRAY (Se usa para la navegacion lateral)
    public function get_m($user_id = null, $ws_id_hex = null)
    {
  
          $db = \Config\Database::connect();
          $module_db = $db->table('users_workspace_permission');
          $module_db->select('*');

          //Uno los modulos con los id module de user permission 
          // $module_db->join('module', 'module.m_id = module_plan.module_id');

          //Uno los modulos con los id module de user permission
          $module_db->join('module', 'module.m_id = users_workspace_permission.module_id');
          //Uno los modulos con los id module de user permission 
          $module_db->join('module_plan', 'module_plan.module_id = users_workspace_permission.module_id');
          //Uno los modulos con los id module de user permission 
          // $module_db->join('auth_permissions', 'auth_permissions.id = users_workspace_permission.auth_permissions_id');
          //Uno los espacios de trabajos y sus planes id para filtrar los modulos que devuelve
          $module_db->where('user_id', $user_id);
          $module_db->where('ws_id_hex', $ws_id_hex);
          //comento el plan por qno es el id
          //$module_db->where('plan_id', $ws_plan_id);
          $module_db->groupBy('module.m_id');
          // $module_db->orderBy('m_position','ASC');
          // $module_db->where('module_type_id >=', 0);
          $query = $module_db->get()->getResultArray();
  
          if ($query) {
              foreach ($query as $row) {
                // Poner un filtro que solo imprima los modulos y no los tipos de modulos
                  if ($row['module_type_id'] == 0) {
                      $row_m[] = array(
                          'm_id' => $row['m_id'],
                          'm_type_action' => $row['m_type_action'],
                          'm_color' => $row['m_color'],
                          'm_name' => lang('Body.' . $row['m_name'] . ''), //Con el uso de lang puedo cambiar el texto de los botones internamente
                          'm_url' => $row['m_url'],
                          'm_icon' => $row['m_icon'],
                          // 'm_t_position' => $row['m_t_position'],
                      );
                  }
              }
              return $row_m;
          } else {
              return false;
          }
    }

    ///  TRAE TODOS LOS MODULOS TYPE AUTORIZADOS DEL USUARIO EN UN ARRAY (Se usa para la navegacion lateral)
    public function get_m_t($user_id = null, $ws_id_hex = null)
    {

        $db = \Config\Database::connect();
        $module_db = $db->table('users_workspace_permission');
        $module_db->select('*');

        $module_db->join('module_type', 'module_type.m_t_id = users_workspace_permission.module_type_id');
        // $module_db->join('auth_permissions', 'auth_permissions.id = users_workspace_permission.auth_permissions_id');
        $module_db->where('user_id', $user_id);
        $module_db->where('ws_id_hex', $ws_id_hex);
        $module_db->groupBy('module_type.m_t_id');
        //$module_db->groupBy('module.m_id');
        // $query = $plans_db->get()->getResult();
        $query = $module_db->get()->getResultArray();

        if ($query) {

            foreach ($query as $row) {
                //   $group_id = $row['group_id'];
                if ($row['module_type_id'] != 0) {
                    $row_m[] = array(
                        'm_t_id' => $row['m_t_id'],
                        'm_t_type_action' => $row['m_t_type_action'],
                        'm_t_color' => $row['m_t_color'],
                        'm_t_name' => $row['m_t_name'],
                        'm_t_url' => $row['m_t_url'],
                        'm_t_icon' => $row['m_t_icon'],
                        'm_id' => $row['m_id'],
                        // 'p_id' => $row['p_id'],
                    );
                }
            }
            return $row_m;
        } else {
            return false;
        }
    }


    ////***** finales NO SE SI SE USA  */


/*
    ///  TRAE TODOS LOS MODULOS QUE TIENE USER PERMISION EL USUARIO(Se usa para la navegacion lateral)
    public function get_all_plan($group_id = false)
    {
        // $group_id = 2;
        $db = \Config\Database::connect();
        $builder = $db->table('plans');
        // $builder->select('*');
        //  $builder->join('modules_group_permission', 'modules_group_permission.m_id = module.m_id');
        //   $builder->orderBy('m_position', 'Asc');
        //   $builder->where('a_p_g', $group_id);
        $plans_db = $db->table('plans');
        $plans_db->select('*');
        $plans_db->join('module_plan', 'module_plan.plan_id = plans.id');
        $plans_db->join('module', 'module.m_id = module_plan.module_id');
        $query = $plans_db->get()->getResult();

        $data = [
            'plans' => $plans_db->get()->getResult(),
            'modules' => '',
            'title' => 'Planes disponibles workspace',
        ];

        $plans_db = $db->table('plans');
        $plans_db->select('*');
        // $plans_db->join('module_plan', 'module_plan.plan_id = plans.id');
        // $plans_db->join('module', 'module.m_id = module_plan.module_id');
        $query = $plans_db->get()->getResult();
        $query = $builder->get()->getResultArray();
        // lang('Auth.loginSuccess');

        if ($query) {
            foreach ($query as $row) {
                //   $group_id = $row['group_id'];
                $row_m[] = array(
                    'm_id' => $row['m_id'],
                    'm_type_action' => $row['m_type_action'],
                    'm_color' => $row['m_color'], //Con el uso de lang puedo cambiar el texto de los botones internamente
                    'm_name' => lang('Body.' . $row['m_name'] . ''),
                    'm_url' => $row['m_url'],
                    'm_icon' => $row['m_icon'],
                );
            }
            //return   json_encode($row_m);
            return $row_m;
        } else {
            return false;
        }
    }

    ///  TRAE TODOS EL MODULO ACTUAL SEGUN PARAMETROS USER PERMISION EL USUARIO(Se usa para la navegacion lateral, del boar etc)
   
   */

    public function get_m_now($user_id = false, $m_id = false, $m_t_id = false, $m_t_name = false)
    {
        $this->db->select('*');
        $this->db->where("user_id", $user_id);
        $this->db->where("user_permissions.m_id", $m_id);
        if ($m_id != false) {
            $this->db->where("user_permissions.m_t_id", $m_t_id);
        }
        if ($m_t_id != false) {
            $this->db->where("user_permissions.m_t_id", $m_t_id);
        }
        $this->db->limit('1');
        // $this->db->order_by('m_position', 'ASC');
        $this->db->join('module', 'module.m_id = user_permissions.m_id'); //Uno la tabla de usuarios y sus permisos
        $this->db->join('module_type', 'module_type.m_t_id = user_permissions.m_t_id'); //Uno la tabla de usuarios y sus permisos

        //$this->db->group_by("module_type.m_t_id");
        $query = $this->db->get('user_permissions');
        if ($query->num_rows() > 0) {
            foreach ($query->result_array() as $row) {
                $row_m[] = array(
                    'm_id' => $row['m_id'],
                    'm_t_id' => $row['m_t_id'],
                    'm_name' => $row['m_name'],
                    'm_t_name' => $row['m_t_name'],
                    'm_url' => $row['m_url'],
                    'm_t_url' => $row['m_t_url'],
                    'm_icon' => $row['m_icon'],
                    'm_t_icon' => $row['m_t_icon'],
                    'm_t_color' => $row['m_t_color'],
                    'm_color' => $row['m_color'],
                    'p_id' => $row['p_id'],
                );
            }
            return $row_m;
        } else {
            return false;
        }
    }

}
