<?php

namespace App\Controllers;

use App\Models\OwnerModel;
use App\Models\UserModel;

class Account extends BaseController
{

    function index()
    {
        if (!logged_in()) {
            return redirect()->to('login');
        }
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array
        return view('body/body.hbs', $data);
    }

    ////******* FIN CURL PRUEBAS *********/////
    public function user_data()
    {
        if (!logged_in()) {
           // return redirect()->to('login');
            $data = array(
                'user' => null,
                'user_id' =>null,
                'result' => false
            );
            echo json_encode($data);
        } else {
            $user_id =  user_id();
            $Owner = new OwnerModel(); //traigo el modelo		
            $User = new UserModel(); //traigo el modelo		
            $data = array(
                //'owner' => [$Owner->getOwner()],
                // 'user' => $User->getUser($user_id),
                'user_name' => $User->getUser($user_id),
                'user_id' =>$user_id,
                'result' => true
            );
            echo json_encode($data);
        }
    }

    public function account_m_data()
    {
        if (!logged_in()) {
            return redirect()->to('login');
        } else {
            $user_id =  user_id();
            $Owner = new OwnerModel(); //traigo el modelo		
            $User = new UserModel(); //traigo el modelo		
            $data = array(
                //'owner' => [$Owner->getOwner()],
                'user' => [$User->getUser($user_id)],
                //'user_id' =>$user_id,
                'result' => true
            );
            echo json_encode($data);
        }
    }

    public function account_m_template()
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
        //Los permisos del topo bar son solo de login por que todos los usuarios pueden ver el mismo topbar
        else {
            return view('account/profile.hbs');
        }
    }

/*
    public function confirmNewAccount()
    {
        if (!logged_in()) {
            return redirect()->to('login');
        };

        // $data['title'] = 'Halaman User';
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array

        return view('body/body.hbs', $data);
        //return view('body/body.hbs');
    }


    public function favorite()
    {
        if (!logged_in()) {
            return redirect()->to('login');
        };

        // $data['title'] = 'Halaman User';
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array

        return view('body/body.hbs', $data);
        //return view('body/body.hbs');
    }

    public function Cart()
    {
        if (!logged_in()) {
            return redirect()->to('login');
        };

        // $data['title'] = 'Halaman User';
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array

        return view('body/body.hbs', $data);
        //return view('body/body.hbs');
    }

    public function Config()
    {
        if (!logged_in()) {
            return redirect()->to('login');
        };

        // $data['title'] = 'Halaman User';
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array

        return view('body/body.hbs', $data);
        //return view('body/body.hbs');
    }

    */
}
