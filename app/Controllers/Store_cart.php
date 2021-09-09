<?php

namespace App\Controllers;

//use App\Models\OwnerModel;
//use App\Models\UserModel;
use App\Models\WorkspaceModel;

class Store_cart extends BaseController
{
    protected $db, $builder;
    public function __construct()
    {
        $this->db = \Config\Database::connect();
        $session = \Config\Services::session();
        //$session->start();
        $session->start();
    }

     // DATA CART RIGHT NAV
    public function store_cart_nav_data(){
      
        if (!logged_in()) {
            return redirect()->to('login');
        }else {
            // $Owner = new OwnerModel(); //traigo al modelo		
            // $User = new UserModel(); //traigo al modelo            
            // $userId = $auth->id();
             $user_id =  user_id();
             $workspace_id = $_SESSION['workspace_id'];
             $workspace_email = $_SESSION['workspace_email'];

            $data = array(
                'workspace_email' => $workspace_email,
                'workspace_id' => $workspace_id,
                'm_t' => '1',
                'm_now' => '2',
				'result' => true,
			);
            
            echo json_encode($data);
        }
    }
    
    //TEMPLATE DEL CART RIGHT NAV
    public function store_cart_nav_template()
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
            return view('store_cart/store_cart_main.hbs');
        }
    }
    //TEMPLATE DEL CART RIGHT NAV
    public function store_cart_nav_items_template()
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
            return view('store_cart/store_cart_item.hbs');
        }
    }
    //TEMPLATE DEL cart_total_items_template
    public function store_cart_total_items_template()
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
            return view('store_cart/store_cart_total_items.hbs');
        }
	}
/*
    public function ventas_nube_compilator()
    {
        if (!logged_in()) {
            return redirect()->to('login');
        }
        return view('body/js/ventas_nube_compilator.js');
    }
*/
}