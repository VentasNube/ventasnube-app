<?php

return [

    // Home indexes
    'hometittle' => 'Vende en la Nube!',
    'homesubtittle' => 'Da el salto a la nube y empieza gratis',
    'homesubmit' => 'Probar gratis por 30 dias',
    'homeslogan' => 'Probar gratis por 30 dias y lleva tu negocio a otro nivel',



     // body modules name 
     'm_name_board' => 'Tableros',
     'm_name_catalog' => 'Catalogo',
     'm_name_box' => 'Caja',
     'm_t_name_my_box' => 'Mi caja',
     'm_t_name_all_box' => 'Todas las cajas',
     'm_name_contact' => 'Contactos',     
     'm_name_report' => 'Reportes',
     'm_name_stats' => 'Estadisticas',
     
         
    // Login/out    
    'login'					    => 'Ingresar',
    'logout'				    => 'Salir',
    'forgotYourPassword'	    => 'Olvidastes tu contraseña?',
    'loggedInWelcome'           => 'Bienvenido {0}!',

    // Exceptions
    'invalidModel'              => 'Se debe cargar el modelo {0} antes de usarlo.',
    'userNotFound'              => 'No se puede localizar al usuario con ID = {0, number}.',
    'noUserEntity'              => 'Se debe proporcionar la entidad de usuario para la validación de la contraseña.', //todo: translate
    'tooManyCredentials'        => 'Sólo se puede valir contra 1 credencial además de la contraseña.',
    'invalidFields'             => 'El campo "{0}" no puede utilizarse para validar credenciales.',
    'unsetPasswordLength'       => 'Se debe setear la variable `minimumPasswordLength` en la configuración.',
    'unknownError'              => 'Perdón, ocurrió un problema queriendo enviar el correo. Por favor intentá mas tarde.',
    'notLoggedIn'               => 'Se debe ingresar al sistema antes de poder acceder a esa página.',
    'notEnoughPrivilege'        => 'No tenés los permisos necesarios para poder acceder a esta página.',

    // Registration
    'registerDisabled'          => 'La creación de cuentas de usuario está deshabilitada.',
    'registerSuccess'           => '¡Bienvenido! Por favor ingrese sus credenciales.',
    'registerCLI'               => 'Nueva usuario creada: {0}, # {1}', //todo: translate


     // Registration
     'registration' 			=> 'Registro',
     'name' 					=> 'Nombre',
     'last_name' 			    => 'Apellido',
     'movil_phone' 			    => 'Numero de celular',
     'id_name' 			        => 'Documento',
     'birthday' 			    => 'Cumpleaños',
     'email' 				    => 'Correo electrónico',
     'password'				    => 'Contraseña',
     'passwordAgain'			=> 'Repetir contraseña',
     'register'				    => 'Registrarse',
     'alreadyRegistered'		=> '¿Ya registrado? ¡Iniciar sesión!',

    // Activation
    'activationNoUser'          => 'No se pudo localizar a un usuario con ese código de activación.', // translate
    'activationSubject'         => 'Activa tu cuenta', // translate
    'activationSuccess'         => 'Confirme su cuenta haciendo clic en el enlace de activación en el correo electrónico que le hemos enviado.', // translate
    'activationResend'          => 'Vuelva a enviar el mensaje de activación una vez más.', // translate
    'notActivated'              => 'Esta cuenta de usuario aún no está activada.', // translate
    'errorSendingActivation'    => 'Error al enviar el mensaje de activación a: {0}', // translate

    // Login
    'badAttempt'                => 'No se pudo ingresar al sistema. Por favor, chequee sus credenciales.',
    'loginSuccess'              => '¡Bienvenido nuevamente!',
    'invalidPassword'           => 'No se pudo ingresar al sistema. Por favor, chequee sus credenciales.',

    // Forgotten Passwords
    'forgotDisabled'            => 'Se ha desactivado la opción de restablecimiento de contraseña.', // translate
    'forgotNoUser'              => 'No se pudo localizar un usuario con ese correo electrónico.',
    'forgotSubject'             => 'Instrucciones para resetear la contraseña',
    'resetSuccess'              => 'El cambio de contraseña fue correcto. Por favor ingrese con su nueva contraseña.',
    'forgotEmailSent'           => 'Se ha enviado un código de seguridad a su e-mail. Ingréselo en el cuadro siguiente para continuar.',
    'errorEmailSent'            => 'No se puede enviar un correo electrónico con las instrucciones para restablecer la contraseña a: {0}', // translate
    'errorResetting'            => 'No se pueden enviar instrucciones de restablecimiento a {0}', // translate
     // Forgotten password
     'forgottenPassword'		=> 'Olvidastes tu contraseña?',
     'forgottenEmail'		    => 'Escribe el correo electrónico que usaste para registrarte en Ventas Nube.',
     'typeEmail'				=> 'Escribe tu e-mail',
     'setNewPassword'		    => 'Recuperar cuenta',

    // Passwords
    'errorPasswordLength'       => 'La contraseña debe tener al menos {0, number} caracteres.',
    'suggestPasswordLength'     => 'Las frases - de hasta 255 caracteres - hacen que las contraseñas sean mas seguras y fáciles de recordar.',
    'errorPasswordCommon'       => 'La contraseña no puede tan débil.',
    'suggestPasswordCommon'     => 'La contraseña fue contrastada contra 65.000 de uso habitual y las que fueron hackeadas.',
    'errorPasswordPersonal'     => 'Las contraseñas no pueden contener información personal.',
    'suggestPasswordPersonal'   => 'Variaciones de su e-mail o usuario no deben usar como contraseñas.',
    'errorPasswordTooSimilar'   => 'La contraseña es demasiado similar al nombre de usuario.',  //todo: translate
    'suggestPasswordTooSimilar' => 'No utilice partes de su nombre de usuario en su contraseña.',  //todo: translate
    'errorPasswordPwned'        => 'La contraseña {0} ha sido expuesta debido a una violación de datos y se ha visto {1, number} veces en {2} contraseñas comprometidas.',//todo: translate
    'suggestPasswordPwned'      => '{0} nunca debe usarse como contraseña. Si lo está utilizando en cualquier lugar, cámbielo inmediatamente.', //todo: translate
    'errorPasswordEmpty'        => 'Se requiere una contraseña.',
    'passwordChangeSuccess'     => 'Contraseña cambiada',
    'userDoesNotExist'          => 'No se cambió la contraseña. El usuario no existe',
    'resetTokenExpired'         => 'Lo siento. Su token de reinicio ha caducado.', //todo: translate

    // Groups
    'groupNotFound'             => 'No se puede localizar al grupo: {0}.',

    // Permissions
    'permissionNotFound'        => 'No se puede localizar el permiso: {0}',

    // Banned
    'userIsBanned'              => 'El usuario está deshabilitado. Contacte al administrador',

    // Too many requests
    'tooManyRequests'           => 'Demasiadas solicitudes. Espere {0, number} segundos.', // translate

    // Login views
    'home'                      => 'Ingresar',
    'current'                   => 'actual',
    'forgotPassword'            => '¿Olvidaste tu contraseña?',
    'enterEmailForInstructions' => 'Ingresá tu correo electrónico y te serán reenviadas instrucciones para poder resetear tu contraseña.',
    'email'                     => 'e-Mail',
    'emailAddress'              => 'Dirección de e-Mail',
    'sendInstructions'          => 'Enviar Instrucciones',
    'loginTitle'                => 'Ingresar',
    'loginAction'               => 'Ingresar',
    'rememberMe'                => 'Recordarme',
    'needAnAccount'             => '¿Necesitás una cuenta?',
    'forgotYourPassword'        => '¿Olvidaste tu contraseña?',
    'password'                  => 'Contraseña',
    'repeatPassword'            => 'Repetir Contraseña',
    'emailOrUsername'           => 'e-Mail o Nombre de Usuario',
    'username'                  => 'Nombre de usuario',
    'register'                  => 'Crear Usuario',
    'signIn'                    => 'Ingresar',
    'alreadyRegistered'         => '¿Ya registrado?',
    'weNeverShare'              => 'No divulgaremos tu correo electrónico con nadie mas.',
    'resetYourPassword'         => 'Resetea tu contraseña',
    'enterCodeEmailPassword'    => 'Ingresá el código que recibiste en tu e-mail, tu dirección de email, y tu nueva contraseña.',
    'token'                     => 'Código',
    'newPassword'               => 'Nueva Contraseña',
    'newPasswordRepeat'         => 'Repetir Contraseña',
    'resetPassword'             => 'Resetear Contraseña',
];
