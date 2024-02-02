<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Ventas Nube</title>
    <!-- Font Awesome -->
    <!--link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"-->
    <!-- VentasNubeSkin.css -->
    <!-- Material Design for Bootstrap fonts and icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
    <!-- Your custom styles (optional) -->
    <link href="/public/app/v4.0/assets/css/material-kit.css?v=2.0.6" rel="stylesheet" />
    <!-- CSS Just for demo purpose, don't include it in your project -->
    <link href="/public/app/v4.0/assets/css/VentasNubeStyle.css" rel="stylesheet">

    <!--link href="/public/app/v4.0/app/v4.0/plugins/iCheck/square/blue.css" rel="stylesheet"-->

    <!-- snack-bar.ccs -->
    <link rel="stylesheet" href="/public/app/v4.0/plugins/snackbar-master/dist/snackbar.min.css">
<style>
  svg:not(:root) {
    margin: 0 auto;
    display: inherit;
  }

  .svg-white-line {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-miterlimit: 10;

  }

  .fire-rocket-group {
    animation-name: rocketFlyUp;
    animation-duration: 1.5s;
    animation-timing-function: cubic-bezier(.80, .20, .70, .85);
    animation-fill-mode: forwards;
  }

  .fire,
  .rocketship {
    animation-name: bouncingRocket;
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(.80, .80, .40, 1);
    animation-delay: 1.5s;
  }

  .fire {
    transform: scale(1.5);
    transform-origin: 50% 50%;
  }

  .cloud-right-wrapper {
    animation-name: cloudMoveLeft;
    animation-duration: 1.8s;
    animation-timing-function: cubic-bezier(.80, .80, .40, 1);
    animation-fill-mode: forwards;
  }

  .cloud-left-wrapper {
    animation-name: cloudMoveRight;
    animation-duration: 1.8s;
    animation-timing-function: cubic-bezier(.80, .80, .40, 1);
    animation-fill-mode: forwards;
  }

  .cloud-left,
  .cloud-right {
    animation-name: bouncingCloud;
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(.80, .80, .40, 1);
    animation-delay: 2.2s;
  }

  .cloud-right {
    animation-direction: reverse;
    animation-delay: 1.2s;
    animation-duration: 2.2s;
  }

  .bolt-left,
  .bolt-right,
  .sparkle-left,
  .sparkle-right {
    animation-name: sparkleScale;
    animation-iteration-count: infinite;
    animation-duration: 1.6s;
    animation-timing-function: cubic-bezier(.80, .20, .70, .85);
    animation-delay: 1.8s;
    transform: scale(0);
    transform-origin: 140px 275px;
  }

  .bolt-right {
    transform-origin: 230px 280px;
    animation-delay: 2.6s;
  }

  .sparkle-left {
    transform-origin: 100px 200px;
    animation-delay: 2.8s;
    animation-timing-function: ease;
  }

  .sparkle-right {
    transform-origin: 245px 250px;
    animation-delay: 2.0s;
    animation-timing-function: ease-out;
  }

  .line-left,
  .line-mid,
  .line-right {
    animation-name: drawLine;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
    animation-delay: 1.8s;
    stroke-dasharray: 65;
    stroke-dashoffset: 65;
    transform: translateY(0px);
    transform-origin: 165px 230px;
  }

  .line-mid {
    animation-delay: 2.8s;
  }

  .line-right {
    animation-delay: 2.2s;
  }

  /** Iconos xl */
  .icon-xl{
    margin: 0 10px 0 0;
    vertical-align: middle;
    font-size: 44px;
  }
  /** Chekbox ***/
  .checkbox label, .radio label, label {
    font-size: 1.5rem;
    }

.form-check .form-check-label {
    cursor: pointer;
    padding-left: 25px;
    position: relative;
    vertical-align: middle;
}

.menu-body {
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 150px 0 0 0!important;
    position: relative;
    display: block;
    /*  padding: 250px 0 0 0;*/
   /* padding: 13% 0 0 0;*/
    overflow: visible;
}

.menu-body-svg{

}

.menu-body-svg-icon{

}


.menu-body-text{
   /* position: absolute;
    margin: 160px 41.40%;*/
    /*  background: #ffff;
    border-radius: 50%;*/
}

  .card-avatar {
    background: #ffff;
    margin: 10px 50px 0;
    border-radius: 50%;
    overflow: hidden;
    padding: 0;
    box-shadow: 0 16px 38px -12px rgb(0 0 0 / 56%), 0 4px 25px 0 rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);
    position:relative;
    display:inline-block;
}


.card-avatar.md {
    width: 150px!important;
    height: 150px!important;
    /*position:relative;
    display:inline-block;*/
}
.card-avatar img{
    object-fit: contain;
    width: 100%;
    height: 100%;
}
.menu-body-item{
   margin: 0;
    display: inline-flex

}
</style>



</head>

<body class="ws_config_tuto_body profile-page sidebar-collapse landing-page body-singup"  style="background-image: url('/public/app/v4.0/assets/img/footer.png');">
    <nav class="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
        <div class="container">
        <div class="navbar-translate">
            <a class="navbar-brand" href="<?php echo base_url(); ?>">
              <div class="ml-3 logo-image" >
                <img  src="<?php echo $owner['owner_img']; ?>" style=" max-height: 100px;" class=" img-fluid logo-nav-bar">
              </div>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
            <li class="dropdown nav-item">
                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" >
                <?php echo $user['username']; ?>
                </a>
                <div class="dropdown-menu dropdown-with-icons">
                    <a href="<?php echo base_url(); ?>tienda/blog" class="dropdown-item">
                        <i class="fas fa-clipboard-list"></i> Mi cuenta
                    </a>
                    <a href="" class="dropdown-item">
                        <i class="fab fa-youtube"></i> Cerrar sesion
                    </a>
                </div>
            </li>
            </ul>
        </div>
        </div>
    </nav>

    <!--main class="menu-body " style="background-image: url('/public/app/v4.0/app/v4.0/assets/img/banner--ventas-Nube.png');"-->
    <main class="menu-body  menu-body-text ">
        <!-- main content -->
        <div class='align-items-center'>
                            <h2  class="p-0 mt-3 text-center display-4">
                                Donde vas trabajar hoy?
                            </h2>
                            <div class="col-12 mt-12 text-center justify-content-center">
                                <?php if ($ws_user) {foreach ($ws_user as $row) {?>
                                        <div class="menu-body-item">
                                                <a u_name="<?php echo $user_data['u_name'] ?>" user_email='<?php echo $user_data['u_email'] ?>' userDb='<?php echo $user_data['userDb'] ?>' ws_id='<?php echo $row['ws_id_hex']; ?>' class="ws_select" href="#">
                                                    <div class="card-avatar md">
                                                            <img class="img img-circle" src="<?php echo $row['ws_img']; ?>">
                                                    </div>
                                                    <h4  class="p-0 mt-2 text-center display-4">
                                                        <?php echo $row['ws_name']; ?>
                                                    </h4>
                                                </a>
                                        </div>
                                <?php }}?>
                            </div>

                            <div class="col-12  text-center">
                                <a href="/workspace/welcome">
                                      <button step_porcent_attr="25" class="mx-auto mt-5 text-center step_1 btn-round btn btn-secondary btn-raised btn-lg">
                                                  Crear nueva App    <div class="ripple-container"></div>
                                      </button>
                                </a>
                            </div>
        </div>
    </main>

</body>
<!-- JQuery -->
<!--script type="text/javascript" src="<?php echo base_url(); ?>public/assets/js/jquery.min.js"></script> -->
<!-- Bootstrap tooltips -->
<!-- <script type="text/javascript" src="<?php echo base_url(); ?>public/assets/js/popper.min.js"></script>
  <script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js" integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous"></script>
 --->
<!--div class="btn purple-gradient text-white btn-float-up " id="irarriba"><i class="fas fa-chevron-up"></i> SUBIR</div-->
<!--script src="https://code.jquery.com/jquery-1.11.1.min.js"></script-->

<!-- Jquery-3.1.1.min.js -->
<script type="text/javascript" src="/public/app/v4.0/plugins/jQuery/jquery-3.1.1.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js"></script>

<!--   Core JS Files   -->
<script src="/public/app/v4.0/assets/js/core/jquery.min.js" type="text/javascript"></script>
<script src="/public/app/v4.0/assets/js/core/popper.min.js" type="text/javascript"></script>
<script src="/public/app/v4.0/assets/js/core/bootstrap-material-desing.js" type="text/javascript"></script>
<!--script src="/public/app/v4.0/plugins/iCheck/icheck.min.js"></script>
<script src="/public/app/v4.0/assets/js/plugins/moment.min.js"></script-->
<!--	Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker -->
<!--script src="/public/app/v4.0/assets/js/plugins/bootstrap-datetimepicker.js" type="text/javascript"></script-->
<!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
<script src="/public/app/v4.0/assets/js/plugins/nouislider.min.js" type="text/javascript"></script>
<!-- snack-bar.JS -->
<script src="/public/app/v4.0/plugins/snackbar-master/dist/snackbar.min.js"></script>
<!--  Validate    -->
<script src="/public/app/v4.0/plugins/validate/validate.js"></script>
<!-- Control Center for Material Kit: parallax effects, scripts for the example pages etc -->
<script src="/public/app/v4.0/assets/js/material-kit.js?v=2.0.6" type="text/javascript"></script>
<script>

/*
function nocodelog(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    // alert(result);
    return result;
}
*/

var url = "<?=site_url('login');?>";
var db_url = "http://localhost:5984";
//Variables globales
var u_db = '';
var u_session = '';

/*
var userCtx = '' ; //Datos del user
var info  = '' ;  // Info del la sesion
var roles  = ''; // Roles del user
var ok  = ''; // Estado de la sesion activa
async function user_session(){
  try {

        _session = await new PouchDB(db_url, { skip_setup: false });
        u_session = await _session.get('_session', { include_docs: true, descending: true }); // Conecto a la USER _session
        // Cargo las variables
        userCtx = u_session.userCtx; //Datos del user
        roles = u_session.userCtx.roles; // Roles del user
        info = u_session.info;  // Info del la sesion
        ok = u_session.ok; // Estado de la sesion activa

        u_db = 'userdb-' + nocodelog(userCtx.name); //User Db name
        user_db = await new PouchDB(db_url + u_db, { skip_setup: false }); // Conecto a la USER DB

        $(".ws_select").click( function() {
          ws_select();
        });


        console.log('_session');
        console.log(userCtx);
        console.log(roles);
        console.log(info);



    }catch (err) {
            Snackbar.show({
                text: 'No estas logeado!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
                pos: 'bottom-center'
            });
          //  window.location = "/login";
    }
}
*/
//console.log(user_now);


    function validaForm(){
        // Campos de texto
        if($("#ws_name").val() == ""){
            alert("El campo Nombre no puede estar vacío.");
            $("#ws_name").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
            return false;
        }
        return true; // Si todo está correcto
    }
    //Envio form



/*
async function ws_select(){
    if(validaForm()){
        const ws_select = $(this).attr('ws_id');
        const data = new URLSearchParams('ws_id='+ws_select);
        u_session = await user_db.get('ws_select', { include_docs: true, descending: true }); // Conecto a la USER _session
        console.log('user_db');
        console.log(user_db)
        //var doc = await user_db.get('ws_setting_' + ws_id);
        if (u_session) {
            var response = await user_db.put({
                _id: 'ws_select' ,
                _rev: u_session._rev,
                ws_select: ws_select
            });
           // _session();
            //  alert('response PUT')
        } else {
            var response = await user_db.put({
                _id: 'ws_select' ,
                _rev: u_session._rev,
                ws_select: ws_select
            });
        }
      }
    }
*/

function readCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
}
return null;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/workspace/app";
}


/*
$(".ws_select").click( function() {
        if(validaForm()){
                        const ws_id = $(this).attr('ws_id');
                        const userDb = $(this).attr('userDb');
                        const user_email = $(this).attr('user_email');
                        const u_name = $(this).attr('u_name');
                        
                        ///// IMPRIME la Cokie ////
                        createCookie ('ws_select',ws_id);
                        createCookie ('userDb',userDb);
                        createCookie ('user_email',user_email);
                        createCookie ('u_name',u_name);
                        
                        $(location).attr('href','/workspace');
        }
});
*/
$(".ws_select").click( function() {
        if(validaForm()){

                        const ws_id = $(this).attr('ws_id');
                        const userDb = $(this).attr('userDb');
                        const user_email = $(this).attr('user_email');
                        const u_name = $(this).attr('u_name');

          $.ajax({
                url: "/workspace/ws_select",
                // dataType: "html",
                data: { ws_select: ws_id, userDb: userDb },
                type: "POST",
                dataType: "json",
                success: function(response) {
                    if (response.result === true) { ///// IMPRIME ////
                        // window.location = "/account";
                        ///// IMPRIME la Cokie ////
                        createCookie ('ws_select',ws_id);
                        createCookie ('userDb',userDb);
                        createCookie ('user_email',user_email);
                        createCookie ('u_name',u_name);
                        $(location).attr('href','/workspace/app');                       
                    } else {
                        // alert('No esta logeado');
                       // logout();
                        window.location = "/workspace/login";
                    }
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 404) {
                    // setTimeout(function () { window.location = "/account"; }, 2000);
                    Snackbar.show({
                        text: 'Error 404 La pagina no existe',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                }
            });


        }
});





</script>


</html>