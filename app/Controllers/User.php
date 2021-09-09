<?php

namespace App\Controllers;
use App\Models\OwnerModel;
class User extends BaseController
{
/*
    function index()
    {
        if (!logged_in()) {
			return redirect()->to('login');
		}
     //   return view('body/body.hbs');
        return redirect()->to('account');
    }
*/
  /*  public function myaccount()
    {
        if (!logged_in()) {
			return redirect()->to('login');
        };
        
       // $data['title'] = 'Halaman User';
        $model = new OwnerModel(); //traigo al modelo		
		$data['owner'] = $model->getOwner(); //cargo la data en un array

        return view('body/body.hbs', $data);
        //return view('body/body.hbs');
    }*/
    
}
