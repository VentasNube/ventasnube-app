
<body class="login" style="background-image: url(<?php echo base_url();?>/public/app/v4.0/assets/img/banner--ventas-Nube.png)">
    <div class="container">
        <div class="row justify-content-md-center align-items-center">

        <!--form class="form-signin col-10 col-sm-8 col-md-6 col-xl-4 text-center" id="formLogin" method="POST" action="<?=site_url('login');?>" accept-charset="UTF-8"-->
            <form class="form-signin col-10 col-sm-8 col-md-6 col-xl-4 text-center" id="formLogin">

            <!--form class="form-signin col-10 col-sm-8 col-md-6 col-xl-4 text-center" id="formLogin"-->
                <a href="<?php echo site_url(); ?>">
                    <img class="mb-4 mt-2" src="<?php echo base_url(); echo $owner['owner_img']; ?>" width="auto" height="120px">
                </a>
                <h3 class="text-muted"><?=lang('Auth.login')?></h3>
                <?=view('home/login/_message_block')?>
                <div class="text-left">
                    <div class="form-group text-left">
                        <label for="inputEmail" class="bmd-label-floating"><?=lang('Auth.email')?></label>
                        <input id="email" type="email" name="login" value="<?=old('email')?>" class="form-control" required="" autofocus="">
                        <span class="bmd-help"><?=lang('Auth.email')?></span>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword" class="bmd-label-floating"><?=lang('Auth.password')?></label>
                        <input required minlength="5" id="password" type="password" name="password" value="" class="form-control" required="">
                    </div>
                </div>
                <?=csrf_field()?>
                <button id="submit" class="mb-2 mt-4 btn btn-lg btn-primary btn-block" ><?=lang('Auth.login')?></button>

                <a href="<?=route_to('register')?>">
                    <p class="mt-4 mb-3 text-muted"><?=lang('Auth.needAnAccount')?></p>
                </a>

                <a href="<?=site_url('forgot');?>">
                    <p ><?=lang('Auth.forgotYourPassword')?></p>
                </a>
            </form>
        </div>
    </div>

<!-- Jquery-3.1.1.min.js -->
<script type="text/javascript" src="<?php echo base_url();?>/public/app/v4.0/plugins/jQuery/jquery-3.1.1.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js"></script>

<!-- login script auth -->
<script src="<?php echo base_url();?>/public/app/v4.0/plugins/pouchdb/js/pouchdb.authentication.min.js"></script>

<!-- snack-bar.JS -->
<script src="<?php echo base_url();?>/public/app/v4.0/plugins/snackbar-master/dist/snackbar.min.js"></script>
<script>

function validaForm(){
    // Campos de texto
    if($("#email").val() == ""){
        alert("El campo email no puede estar vacío.");
        $("#email").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#password").val() == ""){
        alert("El campo de contrasena no puede estar vacío.");
        $("#password").focus();
        return false;
    }
    return true; // Si todo está correcto
}

/*

function login_one(email, password){
    var db = new PouchDB('http://localhost:5984/', {skip_setup: true});
            db.logIn(email, password, function (err, response) {
                if (err) {
                    if (err.name === 'unauthorized' || err.name === 'forbidden') {
                    // name or password incorrect
                    Snackbar.show({
                        text: 'Por favor, chequee sus credenciales.'+ err.name,
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                    } else {
                    // cosmic rays, a meteor, etc.
                        Snackbar.show({
                            text: err.name,
                            actionText: 'ok',
                            actionTextColor: "#0575e6",
                        });
                    }
                }else{
                        Snackbar.show({
                            text: 'Bienvenido!  ' + response.name,
                            actionText: 'ok',
                            actionTextColor: "#0575e6",
                        });
                }
                });
}
*/
/*
$("#formLogin" ).submit(function( event ) {
    var password =  $("#password").val();
    var email = $("#email").val();
    if ( validaForm() ) {
        login_one(email, password);
        //  var delay = 2000;
        // setTimeout(function(){ window.location = "/account"; }, delay);
        // $( "span" ).text( "Validated..." ).show();
    return;
    }
    $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
    event.preventDefault();
});

*/



var url = "<?=site_url('login');?>";
var db_url = "<?php echo base_url();?>:5984";

var L_user_db = new PouchDB(db_url, {skip_setup: true});

//Funcion logout cdb
function logout() {
        L_user_db.logOut(function (err, response) {
            if (response) {
                Snackbar.show({
                    text: 'Cerrando sesion ' + response.name,
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
                window.location = "/logout";
            } else if (err) {
                if (err) {
                    // name or password incorrect
                    Snackbar.show({
                        text: "No hay conexion a internet",
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                } else {
                    // cosmic rays, a meteor, etc.
                    Snackbar.show({
                        text: "<span class='material-icons'>wifi_off</span> No hay conexion a internet intenta mas tarde",
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                }
            }
        });
    };

//Funcion chek _session
L_user_db.getSession(function (err, response) {
        if (err) {
            // network error
        } else if (!response.userCtx.name) {
            // nobody's logged in
           // setTimeout(function () { window.location = "/login"; }, 2000);
        } else {
            // response.userCtx.name is the current user
            $.ajax({
            url: "/body/user_data",
            // dataType: "html",
            //data: data,
            type: "POST",
            dataType: "json",
            success: function (data) {
                if (response.result == true) { ///// IMPRIME ////
                    window.location = "/account";
                }else{
                    logout()
                    //setTimeout(function () { window.location = "/account"; }, 2000);
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 404) {
                   // setTimeout(function () { window.location = "/account"; }, 2000);
                    Snackbar.show({
                        text: 'Debes iniciar secion',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                }
        });

        }
});



    // Esta parte del código se ejecutará automáticamente cuando la página esté lista.
$("#submit").click( function(event) {     // Con esto establecemos la acción por defecto de nuestro botón de enviar.
     //   preventDefault();
event.preventDefault();
var password =  $("#password").val();
var email = $("#email").val();
var formData = $("#formLogin").serialize();
        if(validaForm()){
            // login(email, password);
            L_user_db.logIn(email, password, function (err, response) {
                if(response.ok){
                            Snackbar.show({
                                text: 'Bienvenido! '+response.name,
                                actionText: 'ok',
                                actionTextColor: "#0575e6",
                                pos: 'top-center'
                            });
                                $.ajax({
                                type: "POST",
                                url: url,
                                data: formData,
                                beforeSend: function () {
                                    //  alert('AAAAAAAAA')
                                    //location.reload().delay(5000);
                                    },
                                success:  function (data) { //una vez que el archivo recibe el request lo procesa y lo devuelve
                                    window.location = "/workspace";
                                }

                            });
                }
                else  if (err) {
                    if (err.name === 'unauthorized' || err.name === 'forbidden') {
                    // name or password incorrect
                    Snackbar.show({
                        text: err.name,
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                    } else {
                    // cosmic rays, a meteor, etc.
                        Snackbar.show({
                            text: err.name,
                            actionText: 'ok',
                            actionTextColor: "#0575e6",
                        });
                    }
                }
                });
            // Primero validará el formulario.
        }
});

</script>
</body>
