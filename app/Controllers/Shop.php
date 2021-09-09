<?php

namespace App\Controllers;

use App\Models\OwnerModel;

class Shop extends BaseController
{
	public function  index()
	{	
		if (logged_in()) {
			return redirect()->to('/');
		}
		$model = new OwnerModel(); //traigo al modelo		
		$data['owner'] = $model->getOwner(); //cargo la data en un array
		echo view('home/nav', $data);
		echo view('shop/shop', $data);
		return view('home/footer', $data);
		
	}
	
	public function login()
	{
		if (logged_in()) {
			return redirect()->to('/');
		}
		//return view('auth/login');
		$model = new OwnerModel(); //traigo al modelo		
		$data['owner'] = $model->getOwner(); //cargo la data en un array
		echo view('home/login/head', $data);
		//echo view('login/login', $data);
		return view('home/login/login', $data);
	}

	public function register()
	{
		if (logged_in()) {
			return redirect()->to('login');
		}
		//return view('auth/login');
		$model = new OwnerModel(); //traigo al modelo		
		$data['owner'] = $model->getOwner(); //cargo la data en un array
		echo view('home/login/head', $data);
		//echo view('login/login', $data);
		return view('shop/register', $data);
	}

	public function forgot()
	{
		if (logged_in()) {
			return redirect()->to('user');
		}
		//return view('auth/login');
		$model = new OwnerModel(); //traigo al modelo		
		$data['owner'] = $model->getOwner(); //cargo la data en un array
		echo view('home/login/head', $data);
		//echo view('login/login', $data);
		return view('home/login/forgot', $data);
	}

	public function resetPassword()
	{
		if (logged_in()) {
			return redirect()->to('user');
		}
		//return view('auth/login');
		$model = new OwnerModel(); //traigo al modelo		
		$data['owner'] = $model->getOwner(); //cargo la data en un array
		echo view('home/login/head', $data);
		//echo view('login/login', $data);
		return view('home/login/reset-pasword', $data);
	}

	//--------------------------------------------------------------------
}
