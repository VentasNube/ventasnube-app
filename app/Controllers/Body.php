<?php

namespace App\Controllers;

use App\Models\BodyModel;
use App\Models\OwnerModel;
use App\Models\UserModel;

class Body extends BaseController
{
    protected $db, $builder;
    public function __construct()
    {
        $this->db = \Config\Database::connect();
        $this->session = service('session');
    }

    //Json con los datos del user
    public function left_nav()
    {   
        if (!logged_in()) {
            return redirect()->to(base_url('/login'));
        }
        else {
              // $Owner = new OwnerModel(); //traigo el modelo
              $User = new UserModel(); //traigo el modelo
              $Body_model = new BodyModel(); //traigo el modelo
              // $ws_id = $this->request->getPost("ws_id");
              //  $ws_id = session('ws_id');
              $ws_id_hex = $this->session->get('ws_id');
              $user_id = user_id();
              $ws_plan = $Body_model->get_ws($ws_id_hex);   //Traigo el 
              
              /*   helper('date');
              $ws_zona_h = $this->request->getPost("ws_zona_h");
              $ws_db_pacht = now($ws_zona_h);
              $now = now($ws_zona_h);
              $data_now = date("M d Y H:i:s", $now);
              //sumo 1 mes
              $ws_plan_expiration = date("Y-m-d H:i:s", strtotime($data_now . "+ 1 month"));
              */
              //  $group_id = $Body_model->get_user_group_id($user_id);  
              //  $workspace_modules = $Body_model->get_user_workspace_permission($user_id, $ws_id);              
              //Chekeo el plan q tiene el WS y veo si esta activo y si tiene lisencia paga
                 
              if($ws_plan['return'] === true ){
                    //Traigo los modulos segun permisos de usuario ws y plan pago
                    $workspace_modules = $Body_model->get_m($user_id, $ws_id_hex);
                    $workspace_modules_type = $Body_model->get_m_t($user_id, $ws_id_hex);

                    $data = array(
                        'm' => $workspace_modules, //Traigo todos los modulos segun los permisos de usuario
                        'm_t' => $workspace_modules_type, //Traigo todos los tipos de modulos segun los permisos de usuario
                        'user_id' => $user_id,
                        'user_name' => $this->session->get('u_name'),
                        'user_email' => $this->session->get('ws_email'),
                        'ws_id' => $ws_id_hex,
                        //'ws_plan_id' =>$ws_plan['ws_plan_id'],
                        'ws_plan' =>  $ws_plan,
                        'ws_plan_name' =>  $ws_plan['workspace_id'],
                        'workspace_plan_expiration' =>  $ws_plan['workspace_plan_expiration'],
                        'result' => true,
                    );
                    return json_encode($data);

              }else{
                $msj =  $ws_plan['msj'];
                $data = array(
                    'm' => '', //Traigo todos los modulos segun los permisos de usuario
                    'm_t' => '',   //Traigo todos los tipos de modulos segun los permisos de usuario
                    //'ws_plan' =>  $ws_plan_id,
                    'user_id' => $user_id,
                    'user_name' => $this->session->get('u_name'),
                    'user_email' => $this->session->get('ws_email'),
                    'ws_id' => $ws_id_hex,
                    'ws_plan_name' =>  $ws_plan,
                    'msj' => $msj,
                    'result' => false,
                );
                return json_encode($data);
              }
            
          }
    }
    /*
    //Json con los datos del user
    public function nav_data()
    {
        $User = new UserModel(); //traigo el modelo
        $Body_model = new BodyModel(); //traigo el modelo
        // $ws_id = $this->request->getPost("ws_id");
        //  $ws_id = session('ws_id');
        $ws_id = $this->session->get('ws_id');
        $user_id = user_id();
        $ws_plan = $Body_model->get_ws($ws_id);   //Traigo el 

        $workspace_modules = $Body_model->get_m($user_id, $ws_id, $ws_plan['workspace_plan']);
        $workspace_modules_type = $Body_model->get_m_t($user_id, $ws_id);
        $data = array(
            'm' => $workspace_modules, //Traigo todos los modulos segun los permisos de usuario
            'm_t' => $workspace_modules_type,   //Traigo todos los tipos de modulos segun los permisos de usuario
            'user_id' => $user_id,
            'ws_id' => $ws_id,
         // 'ws_plan_id' =>$ws_plan['ws_plan_id'],
            'ws_plan' =>  $ws_plan,
            'ws_plan_name' =>  $ws_plan['workspace_id'],
            'workspace_plan_expiration' =>  $ws_plan['workspace_plan_expiration'],
            'result' => true,
        );

        return json_encode($data);

    }
    */
    //Json con los datos del user
    public function user_data()
    {
        if (!logged_in()) {
            return redirect()->to('login');
        } else {
            $user_id = user_id();
            $Owner = new OwnerModel(); //traigo el modelo
            $User = new UserModel(); //traigo el modelo
            $data = array(
                'user' => $User->getUser($user_id),
                //'user_id' =>$user_id,
                'result' => true,
            );
            return json_encode($data);
        }
    }



}
