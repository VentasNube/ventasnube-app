<?php

namespace App\Config;
// Este archivo es una extencion del archivo de config q esta en vendor auth lo cree para poder setear todo lo necesario para Ventas Nube
use Myth\Auth\Config\Auth as MythAuth;

class Auth extends MythAuth
{

    /**
     * --------------------------------------------------------------------
     * Default User Group
     * --------------------------------------------------------------------
     *
     * The name of a group a user will be added to when they register,
     * i.e. $defaultUserGroup = 'guests'.
     *
     * @var string
     * 
     * Este archi
     */
    // public $defaultUserGroup = 'client';
  //  public $defaultUserGroup = 'client';
    //public $adminUserGroup = 'admin';
   // public $clientUserGroup = 'client'; // Cree una nueva variable para pasarle a la configuracion, para crear un usuario cliente


   /** CONFIGURACION DE GUPOS DE PERMISOS PARA TODA LA APP CENTRALIZA las variables para todos los controladores */
    public $adminUserGroup = 1; //admin de ventas nube completo. Administracion de cuentas pagos y usuarios

    public $shopUserGroup = 2; // shop permiso para los clientes que compran en ventas nube. (Tiene permisos para ver cart, myOrders)
  
    public $planStarterFreeUserGroup = 3; //plan-starter-free  Plan incial por 30 dias puede ser el admin de su workspace por 30 dias
    public $planStarterUserGroup = 4; //Tiene permisos para ver cart, favoritos,myOrders,  boards, contacts, catalog, stats, reports, shops.
    public $planProfessionalUserGroup = 5; //Tiene permiso para ver cart,favoritos, myOrders, board, catalog, contact
    public $planBusinessUserGroup = 6; //Tiene permiso para ver cart, favoritos,myOrders,  boards, contacts, catalog, stats,
   
    /**
     * --------------------------------------------------------------------
     * Views used by Auth Controllers
     * --------------------------------------------------------------------
     *
     * @var array
     */

    /*public $views = [
        'login'           => 'App\Views\home\login\login',
        'register'        => 'App\Views\home\login\register',
        'forgot'          => 'App\Views\home\login\forgot',
        'reset'           => 'App\Views\home\login\reset',
        'emailForgot'     => 'Views\home\emails\forgot',
        'emailActivation' => 'App\Views\home\emails\activation',
    ];*/

    /**
	 * --------------------------------------------------------------------
	 * Authentication
	 * --------------------------------------------------------------------
	 *
	 * Fields that are available to be used as credentials for login.
	 *
	 * @var string[]
	 */
	public $validFields = [
		'email',
        'username',
       // 'lastname',
	];

    /* protected $allowedFields = [
        'email', 'username', 'password_hash', 'reset_hash', 'reset_at', 'reset_expires', 'activate_hash',
        'status', 'status_message', 'active', 'force_pass_reset', 'permissions', 'deleted_at',
        'firstname', 'lastname', 'phone',
    ];

    protected $validationRules = [
        'email'         => 'required|valid_email|is_unique[users.email,id,{id}]',       
         'username'      => 'required|alpha_numeric_punct|min_length[3]',        
        //  'lastname'      => 'required|alpha_numeric_punct|min_length[3]',
        // 'phone'      => 'required|alpha_numeric|min_length[9]', 
        'phone'      => 'required',    
        'password_hash' => 'required',
    ];*/

    /**
	 * --------------------------------------------------------------------
	 * Additional Fields for "Nothing Personal"
	 * --------------------------------------------------------------------
	 *
	 * The `NothingPersonalValidator` prevents personal information from
	 * being used in passwords. The email and username fields are always
	 * considered by the validator. Do not enter those field names here.
	 *
	 * An extend User Entity might include other personal info such as
	 * first and/or last names. `$personalFields` is where you can add
	 * fields to be considered as "personal" by the NothingPersonalValidator.
	 *
	 * For example:
     *  $personalFields = ['firstname', 'lastname'];
	 *
	 * @var string[]
	 */
    //  public $personalFields = [];

    public    $personalFields = ['firstname', 'lastname','phone'];

	/**
	 * --------------------------------------------------------------------
	 * Require Confirmation Registration via Email
	 * --------------------------------------------------------------------
	 *
	 * When enabled, every registered user will receive an email message
	 * with an activation link to confirm the account.
	 *
	 * @var string Name of the ActivatorInterface class
	 */
	public $requireActivation = 'Myth\Auth\Authentication\Activators\EmailActivator';

	/**
	 * --------------------------------------------------------------------
	 * Allow Password Reset via Email
	 * --------------------------------------------------------------------
	 *
	 * When enabled, users will have the option to reset their password
	 * via the specified Resetter. Default setting is email.
	 *
	 * @var string Name of the ResetterInterface class
	 */
	public $activeResetter = 'Myth\Auth\Authentication\Resetters\EmailResetter';

}
