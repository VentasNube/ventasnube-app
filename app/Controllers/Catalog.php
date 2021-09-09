<?php

namespace App\Controllers;

//use App\Models\OwnerModel;
//use App\Models\UserModel;
use App\Models\WorkspaceModel;

class Catalog extends BaseController
{
    protected $db, $builder;
    public function __construct()
    {
        $this->db = \Config\Database::connect();
        $session = \Config\Services::session();
        //$session->start();
        $session->start();
    }
/*
    public function search_m_data(){
      
        if (!logged_in()) {
            return redirect()->to('login');
        }else {

            // $Owner = new OwnerModel(); //traigo al modelo		
            // $User = new UserModel(); //traigo al modelo            
            // $userId = $auth->id();
             $user_id =  user_id();
             $workspace_id = $_SESSION['workspace_id'];
             $workspace_email = $_SESSION['workspace_email'];
            //  $workspace_id = $session->name;
            // $search_m_input = $this->input->post("search_m_input"); //Valor a buscar
            // $start = $this->input->post("start"); //Primer item
            // $end = $this->input->post("end"); //Cantidad de items total por pagina

            $data = array(
			    //	'search_product' => $this->Search_model->search_product($search_m_input, $start, $end),
			    //	'm_t' => $this->Body_model->get_m_t($user_id, $m_id),
			    //	'm_now' => $this->Body_model->get_m_now($user_id, $m_id, $m_t_id),
                 //'msj' => 'Lista de busqueda',
                'workspace_email' => $workspace_email,
                'workspace_id' => $workspace_id,
				'result' => true,
			);
            
            echo json_encode($data);
        }
    }

    public function search_m_template()
	{
        if (!logged_in()) {
            echo json_encode(
                array(
                    'result' => false,
                    'msj' => 'No tienes permisos ver este modulo'
                )
            );
            return redirect()->to('login');
        }
        //Los permisos del search bar son solo de login por que todos los usuarios pueden ver el mismo topbar
        else {
            return view('search/search_module.hbs');
        }
	}

    public function ventas_nube_compilator()
    {
        if (!logged_in()) {
            return redirect()->to('login');
        }
        return view('body/js/ventas_nube_compilator.js');
    }
*/
}