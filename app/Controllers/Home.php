<?php

namespace App\Controllers;

use App\Models\OwnerModel;

class Home extends BaseController
{
	public function __construct()
    {
      //  $this->WorkspaceModel = new WorkspaceModel();
      //  $this->request = \Config\Services::request();
        $this->session = service('session');
    }

	
	//Logica del index de la app cuenta como home y home de landingpage
	public function  index()
	{	
			//NO estoy logeado muestro el landingpage 
			$model = new OwnerModel(); //traigo al modelo		
			$data['owner'] = $model->getOwner(); //cargo la data en un array
			echo view('home/nav', $data);
			echo view('home/home', $data);
			return view('home/footer', $data);
          	//  return redirect()->to('login');
	}

	//Logica del index de la app cuenta como home y home de landingpage
	/*public function  index()
	{	
		if (logged_in()) {
			//Si estoy logeado chekeo si hay una cokie con sesion iniciada en un ws actualmente
			$ws_id = session('ws_id');//Chekeo q aya iniciado sesion y seleccionado un ws
			if($ws_id){
				$model = new OwnerModel(); //traigo al modelo		
				$data['owner'] = $model->getOwner(); //cargo la data en un array
				return view('body/body.hbs', $data);
			}else{
				//NO voy al home para seleccionar el espacio de trabajo
				return redirect()->to(base_url('/workspace/home'));
			}
        }else{
			//NO estoy logeado muestro el landingpage 
			$model = new OwnerModel(); //traigo al modelo		
			$data['owner'] = $model->getOwner(); //cargo la data en un array
			echo view('home/nav', $data);
			echo view('home/home', $data);
			return view('home/footer', $data);
          	//  return redirect()->to('login');
		}
	}
*/
	//Logica del index de la app cuenta como home y home de landingpage
	public function  app()
	{	
		if (logged_in()) {//Si estoy logeado chekeo si hay una cokie con sesion iniciada en un ws actualmente
			$ws_id = session('ws_id');//Chekeo q aya iniciado sesion y seleccionado un ws
			if($ws_id){
				$model = new OwnerModel(); //traigo al modelo		
				$data['owner'] = $model->getOwner(); //cargo la data en un array
				return view('body/body.hbs', $data);
			}else{
				//NO voy al home para seleccionar el espacio de trabajo
				return redirect()->to(base_url('/workspace/home'));
			}
        }else{
			$model = new OwnerModel(); //traigo al modelo		
			$data['owner'] = $model->getOwner(); //cargo la data en un array
			echo view('home/login/head', $data);
			//echo view('login/login', $data);
			return view('home/login/login', $data);
		}
	}

	//Vista del login
	public function login()
	{
		if (logged_in()) {
			return redirect()->to('account');
		}
		//return view('auth/login');
		$model = new OwnerModel(); //traigo al modelo		
		$data['owner'] = $model->getOwner(); //cargo la data en un array
		echo view('home/login/head', $data);
		//echo view('login/login', $data);
		return view('home/login/login', $data);
	}
	//Vista registro
	public function register()
	{
		if (logged_in()) {
			return redirect()->to('account');
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
			return redirect()->to('account');
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
			return redirect()->to('account');
		}
		//return view('auth/login');
		$model = new OwnerModel(); //traigo al modelo		
		$data['owner'] = $model->getOwner(); //cargo la data en un array
		echo view('home/login/head', $data);
		//echo view('login/login', $data);
		return view('home/login/reset-pasword', $data);
	}


}
