<?php namespace App\Controllers;

use Config\Email;
use CodeIgniter\Controller;
use Myth\Auth\Entities\User;
use App\Models\UserModel;

// Este archivo es una extencion del archivo de config q esta en vendor auth lo cree para poder setear todo lo necesario para Ventas Nube
use Myth\Auth\Controllers\AuthController as MythAuthController;

class AuthController extends MythAuthController
{
	protected $auth;
	/**
	 * @var Auth
	 */
	protected $config;
	/**
	 * @var \CodeIgniter\Session\Session
	 */
	protected $session;

	public function __construct()
	{
		// Most services in this controller require
		// the session to be started - so fire it up!
		$this->session = service('session');
		$this->config = config('Auth');
		$this->auth = service('authentication');
	}

	//--------------------------------------------------------------------
	// Login/out
	//--------------------------------------------------------------------

	/**
	 * Displays the login form, or redirects
	 * the user to their destination/home if
	 * they are already logged in.
	 */
	public function login()
	{
		// No need to show a login form if the user
		// is already logged in.
		if ($this->auth->check())
		{
			$redirectURL = session('redirect_url') ?? site_url('/');
			unset($_SESSION['redirect_url']);
			return redirect()->to($redirectURL);
		}
        // Set a return URL if none is specified
        $_SESSION['redirect_url'] = session('redirect_url') ?? previous_url() ?? site_url('/');
		return $this->_render($this->config->views['login'], ['config' => $this->config]);
	}

	/**
	 * Attempts to verify the user's credentials
	 * through a POST request.
	 */
	public function attemptLogin()
	{
		$rules = [
			'login'	=> 'required',
			'password' => 'required',
		];
		if ($this->config->validFields == ['email'])
		{
			$rules['login'] .= '|valid_email';
		}

		if (! $this->validate($rules))
		{
			return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
		}

		$login = $this->request->getPost('login');
		$password = $this->request->getPost('password');
		$remember = (bool)$this->request->getPost('remember');

		$type = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

		// Try to log them in...
		if (! $this->auth->attempt([$type => $login, 'password' => $password], $remember))
		{
			return redirect()->back()->withInput()->with('error', $this->auth->error() ?? lang('Auth.badAttempt'));
		}

		// Is the user being forced to reset their password?
		if ($this->auth->user()->force_pass_reset === true)
		{
			return redirect()->to(route_to('reset-password') .'?token='. $this->auth->user()->reset_hash)->withCookies();
		}

		//$redirectURL = session('redirect_url') ?? site_url('/');
		$redirectURL = session('redirect_url') ?? site_url('/workspace');//Redirecciono al home workspace para q inicie secion en diferentes WS
		unset($_SESSION['redirect_url']);

		// Agrego la ID del workspace a la session para construir las vistas
		$newdata = [
			'workspace_email' => $login,
			'workspace_id' => 'null',
		];
		$this->session->set($newdata);
		return redirect()->to($redirectURL)->withCookies()->with('message', lang('Auth.loginSuccess'));
	}

	/**
	 * Log the user out.
	 */
	public function logout()
	{
		if ($this->auth->check())
		{
			$this->auth->logout();
		}
		return redirect()->to(site_url('/workspace/login'));
	}

/*	public function _session()
	{
		if (!logged_in()) {
            return redirect()->to('login');
        }
        $model = new OwnerModel(); //traigo al modelo		
        $data['owner'] = $model->getOwner(); //cargo la data en un array
        return view('body/body.hbs', $data);
	}
*/
	//--------------------------------------------------------------------
	// Register
	//--------------------------------------------------------------------

	/**
	 * Displays the user registration page.
	 */
	public function register()
	{
        // check if already logged in.
		if ($this->auth->check())
		{
			return redirect()->back();
		}

        // Check if registration is allowed
		if (! $this->config->allowRegistration)
		{
			return redirect()->back()->withInput()->with('error', lang('Auth.registerDisabled'));
		}

		return $this->_render($this->config->views['register'], ['config' => $this->config]);
	}

	/**
	 * Attempt to register a new user.
	 */
	public function attemptRegister()
	{
		// Check if registration is allowed
		if (! $this->config->allowRegistration)
		{
			return redirect()->back()->withInput()->with('error', lang('Auth.registerDisabled'));
		}
		$users = model(UserModel::class);
		// Validate here first, since some things,
		// like the password, can only be validated properly here.
		//'username'  	=> 'required|alpha_numeric_space|min_length[3]|is_unique[users.username]',
		$rules = [
			'username'  	=> 'required|alpha_numeric_space|min_length[3]',
			//'lastname'  	=> 'required|alpha_numeric_space|min_length[3]',
			'email'			=> 'required|valid_email|is_unique[users.email]',
			'password'	 	=> 'required|strong_password',
			'pass_confirm' 	=> 'required|matches[password]',
		];

		if (!$this->validate($rules))
		{
			return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
		}

		// Save the user
		$allowedPostFields = array_merge(['password'], $this->config->validFields, $this->config->personalFields);
		$user = new User(
			$this->request->getPost($allowedPostFields)		
		);
		
			// Tomo los datos del form para crear el usuario en CouchDB	
			helper('date');
			$client = \Config\Services::curlrequest();

			$user_email = $this->request->getPost("email");
            $hex = bin2hex($user_email);//codifico el nombre de usuario en hexadecimal
            $db_user = 'userdb-' . $hex;//codifico el nombre de usuario en hexadecimal

			$url = 'http://admin:Cou6942233Cou@ventasnube-couchdb:5984/_users/org.couchdb.user:'.$user_email;
			$data = [
				'name' => $this->request->getPost("email"),
				'firstname' => $this->request->getPost('username'),				
				'lastname' => $this->request->getPost('lastname'),
				'password' => $this->request->getPost("password"),
				'email' => $this->request->getPost("email"),
				'phone' => $this->request->getPost("phone"),
				'created_at' => now(),
				'type' => 'user',
				'active' => 0,
				'roles' => ['client']
			];
			//Envio el put con los datos del nuevo cliente
			$response = $client->request('PUT', $url, ['json' => $data,'http_errors' => false]);
			$code = $response->getStatusCode(); 
			//Toma la respuesta y si es ok envia un documento de diseno para los get del userdb
			if($code === '200'){
				//Documento de diseno get que trae todos los productos del cart
			$user_desing_get = [
                    '_id' => '_design/get',
                    'views' => [
                        'cart-item' => [
                            "map" => "function(doc) {\nif(doc.type === 'cart-item') {\n        emit(doc.type,{\n          'tipo': doc.type,\n          'price': doc.variant.price,\n          'stock': doc.variant.stock,\n          'discount': doc.variant.discount,\n          'tax': doc.variant.tax\n        });\n    }\n}",
                        ],
                        'fav-item' => [
                            "map" => "function(doc) {\nif(doc.type === 'fav-item') {\n        emit(doc.type,{\n          'tipo': doc.type,\n          'price': doc.variant.price,\n          'stock': doc.variant.stock,\n          'discount': doc.variant.discount,\n          'tax': doc.variant.tax\n        });\n    }\n}",
                            ]
                    ],
           
			];
			$userDb = 'http://admin:Cou6942233Cou@ventasnube-couchdb:5984/'. $db_user .'/_design/get';
			//Envio el put con los datos del nuevo cliente
			$client->request('PUT', $userDb, ['json' => $user_desing_get]);
				
			}
			//return $response;

		$this->config->requireActivation !== false ? $user->generateActivateHash() : $user->activate();

		// Ensure default group gets assigned if set
   	 	/* if (! empty($this->config->planStarterFreeUserGroup)) {
			//$users = $users->withGroup($this->config->defaultUserGroup);
			$users = $users->withGroup(3);
      	}*/
	  	$users = $users->withGroup('plan-starter-free'); // Seteo el grupo de permisos
		if (!$users->save($user))
		{
			return redirect()->back()->withInput()->with('errors', $users->errors());
		}

		if ($this->config->requireActivation !== false)
		{
			$activator = service('activator');
			$sent = $activator->send($user);

			if (!$sent)
			{
				return redirect()->back()->withInput()->with('error', $activator->error() ?? lang('Auth.unknownError'));
			}
			// Success!
			return redirect()->route('login')->with('message', lang('Auth.activationSuccess'));
		}
		// Success!
		return redirect()->route('login')->with('message', lang('Auth.registerSuccess'));
	}

	/**
	 * Attempt to register a new user.
	 */
	public function attemptRegisterShop()
	{
		// Check if registration is allowed
		if (! $this->config->allowRegistration)
		{
			return redirect()->back()->withInput()->with('error', lang('Auth.registerDisabled'));
		}

		$users = model(UserModel::class);

		// Validate here first, since some things,
		// like the password, can only be validated properly here.
		
		//'username'  	=> 'required|alpha_numeric_space|min_length[3]|is_unique[users.username]',
		$rules = [
			'username'  	=> 'required|alpha_numeric_space|min_length[3]',
			//'lastname'  	=> 'required|alpha_numeric_space|min_length[3]',
			'email'			=> 'required|valid_email|is_unique[users.email]',
			'password'	 	=> 'required|strong_password',
			'pass_confirm' 	=> 'required|matches[password]',
		];

		if (! $this->validate($rules))
		{
			return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
		}

		// Save the user
		$allowedPostFields = array_merge(['password'], $this->config->validFields, $this->config->personalFields);
		$user = new User($this->request->getPost($allowedPostFields));

		$this->config->requireActivation !== false ? $user->generateActivateHash() : $user->activate();
		//$users = $users->withGroup($this->config->defaultUserGroup);
		//$users = $users->withGroup($this->config->shopUserGroup);

		$users = $users->withGroup('shop');
	
		if (! $users->save($user))
		{
			return redirect()->back()->withInput()->with('errors', $users->errors());
		}

		if ($this->config->requireActivation !== false)
		{
			$activator = service('activator');
			$sent = $activator->send($user);

			if (! $sent)
			{
				return redirect()->back()->withInput()->with('error', $activator->error() ?? lang('Auth.unknownError'));
			}

			// Success!
			return redirect()->route('login')->with('message', lang('Auth.activationSuccess'));
		}

		// Success!
		return redirect()->route('login')->with('message', lang('Auth.registerSuccess'));
	}


	/**
	 * Attempt to con permiso de grupo para clientes comunes.
	 */
	public function attempShopRegister()
	{
		// Check if registration is allowed
		if (! $this->config->allowRegistration)
		{
			return redirect()->back()->withInput()->with('error', lang('Auth.registerDisabled'));
		}

		$users = model(UserModel::class);
		// Validate here first, since some things,
		// like the password, can only be validated properly here.
		//'username'  	=> 'required|alpha_numeric_space|min_length[3]|is_unique[users.username]',
		$rules = [
			'username'  	=> 'required|alpha_numeric_space|min_length[3]',
			'email'			=> 'required|valid_email|is_unique[users.email]',
			'password'	 	=> 'required|strong_password',
			'pass_confirm' 	=> 'required|matches[password]',
		];

		if (! $this->validate($rules))
		{
			return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
		}

		// Save the user
		$allowedPostFields = array_merge(['password'], $this->config->validFields, $this->config->personalFields);
		$user = new User($this->request->getPost($allowedPostFields));

		$this->config->requireActivation !== false ? $user->generateActivateHash() : $user->activate();
		$users = $users->withGroup($this->config->planStarterFreeUserGroup);
		if (! $users->save($user))
		{
			return redirect()->back()->withInput()->with('errors', $users->errors());
		}

		if ($this->config->requireActivation !== false)
		{
			$activator = service('activator');
			$sent = $activator->send($user);

			if (! $sent)
			{
				return redirect()->back()->withInput()->with('error', $activator->error() ?? lang('Auth.unknownError'));
			}

			// Success!
			return redirect()->route('login')->with('message', lang('Auth.activationSuccess'));
		}

		// Success!
		return redirect()->route('login')->with('message', lang('Auth.registerSuccess'));
	}
	
	
	//--------------------------------------------------------------------
	// Forgot Password
	//--------------------------------------------------------------------

	/**
	 * Displays the forgot password form.
	 */
	public function forgotPassword()
	{
		if (! $this->config->activeResetter)
		{
			return redirect()->route('login')->with('error', lang('Auth.forgotDisabled'));
		}
		return $this->_render($this->config->views['forgot'], ['config' => $this->config]);
	}

	/**
	 * Attempts to find a user account with that password
	 * and send password reset instructions to them.
	 */
	public function attemptForgot()
	{
		if (! $this->config->activeResetter)
		{
			return redirect()->route('login')->with('error', lang('Auth.forgotDisabled'));
		}
		$users = model(UserModel::class);
		$user = $users->where('email', $this->request->getPost('email'))->first();
		if (is_null($user))
		{
			return redirect()->back()->with('error', lang('Auth.forgotNoUser'));
		}
		// Save the reset hash /
		$user->generateResetHash();
		$users->save($user);
		$resetter = service('resetter');
		$sent = $resetter->send($user);
		if (!$sent)
		{
			return redirect()->back()->withInput()->with('error', $resetter->error() ?? lang('Auth.unknownError'));
		}
		
		return redirect()->route('reset-password')->with('message', lang('Auth.forgotEmailSent'));
	}

	/**
	 * Displays the Reset Password form.
	 */
	public function resetPassword()
	{
		if (! $this->config->activeResetter)
		{
			return redirect()->route('login')->with('error', lang('Auth.forgotDisabled'));
		}
		$token = $this->request->getGet('token');
		return $this->_render($this->config->views['reset'], [
			'config' => $this->config,
			'token'  => $token,
		]);
	}

	/**
	 * Verifies the code with the email and saves the new password,
	 * if they all pass validation.
	 *
	 * @return mixed
	 */
	public function attemptReset()
	{
		if (! $this->config->activeResetter)
		{
			return redirect()->route('login')->with('error', lang('Auth.forgotDisabled'));
		}

		$users = model(UserModel::class);

		// First things first - log the reset attempt.
		$users->logResetAttempt(
			$this->request->getPost('email'),
			$this->request->getPost('token'),
			$this->request->getIPAddress(),
			(string)$this->request->getUserAgent()
		);

		$rules = [
			'token'		=> 'required',
			'email'		=> 'required|valid_email',
			'password'	 => 'required|strong_password',
			'pass_confirm' => 'required|matches[password]',
		];

		if (! $this->validate($rules))
		{
			return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
		}

		$user = $users->where('email', $this->request->getPost('email'))
					  ->where('reset_hash', $this->request->getPost('token'))
					  ->first();

		if (is_null($user))
		{
			return redirect()->back()->with('error', lang('Auth.forgotNoUser'));
		}

        // Reset token still valid?
        if (! empty($user->reset_expires) && time() > $user->reset_expires->getTimestamp())
        {
            return redirect()->back()->withInput()->with('error', lang('Auth.resetTokenExpired'));
        }

		// Success! Save the new password, and cleanup the reset hash.
		$user->password 		= $this->request->getPost('password');
		$user->reset_hash 		= null;
		$user->reset_at 		= date('Y-m-d H:i:s');
		$user->reset_expires    = null;
        $user->force_pass_reset = false;
		$users->save($user);

		//Hago un get a couchdb para traer el id y el rev del user
		$client = \Config\Services::curlrequest();
		helper('date');
		$url = 'http://admin:Cou6942233Cou@ventasnube-couchdb:5984/_users/org.couchdb.user:'.$this->request->getPost("email");
		$query = $client->request('GET', $url);
		//convierto el json en un objeto
		$json = json_decode($query->getBody());
		
				$data = [
					'_id' =>  $json->_id,
					'_rev' => $json->_rev,
					'name' =>  $json->name,
					'firstname' => $json->firstname,			
					'lastname' => $json->lastname,
					'password' => $this->request->getPost("password"),
					'email' => $json->email, 
					'phone' => $json->phone, 
					'created_at' => $json->created_at, 
					'update_at' => now(),
					'type' => $json->type,
					'active' => $json->active,
					'roles' => $json->roles
				];
				//Envio el put con los datos del nuevo cliente			
		
			$client->request('PUT', $url, ['json' => $data ]);
			//return $data;
			return redirect()->route('login')->with('message', lang('Auth.resetSuccess'));
	}

	/**
	 * Activate account.
	 *
	 * @return mixed
	 */
	public function activateAccount()
	{
		$users = model(UserModel::class);
		// First things first - log the activation attempt.
		$users->logActivationAttempt(
			$this->request->getGet('token'),
			$this->request->getIPAddress(),
			(string) $this->request->getUserAgent()
		);
		$throttler = service('throttler');
		if ($throttler->check($this->request->getIPAddress(), 2, MINUTE) === false)
        {
			return service('response')->setStatusCode(429)->setBody(lang('Auth.tooManyRequests', [$throttler->getTokentime()]));
        }
		$user = $users->where('activate_hash', $this->request->getGet('token'))
					  ->where('active', 0)
					  ->first();
		if (is_null($user))
		{
			return redirect()->route('login')->with('error', lang('Auth.activationNoUser'));
		}
		$user->activate();
		$users->save($user);
		return redirect()->route('login')->with('message', lang('Auth.registerSuccess'));
	}

	/**
	 * Resend activation account.
	 *
	 * @return mixed
	 */
	public function resendActivateAccount()
	{
		if ($this->config->requireActivation === false)
		{
			return redirect()->route('login');
		}

		$throttler = service('throttler');

		if ($throttler->check($this->request->getIPAddress(), 2, MINUTE) === false)
		{
			return service('response')->setStatusCode(429)->setBody(lang('Auth.tooManyRequests', [$throttler->getTokentime()]));
		}

		$login = urldecode($this->request->getGet('login'));
		$type = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

		$users = model(UserModel::class);

		$user = $users->where($type, $login)
					  ->where('active', 0)
					  ->first();

		if (is_null($user))
		{
			return redirect()->route('login')->with('error', lang('Auth.activationNoUser'));
		}

		$activator = service('activator');
		$sent = $activator->send($user);

		if (! $sent)
		{
			return redirect()->back()->withInput()->with('error', $activator->error() ?? lang('Auth.unknownError'));
		}

		// Success!
		return redirect()->route('login')->with('message', lang('Auth.activationSuccess'));

	}

	protected function _render(string $view, array $data = [])
	{
		return view($view, $data);
	}
}
