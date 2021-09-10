<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Ventas Nube</title>
  <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <!-- VentasNubeSkin.css -->
    <!-- Material Design for Bootstrap fonts and icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">  
    <!-- Your custom styles (optional) -->    
    <link href="<?php echo base_url();?>/public/app/v4.0/assets/css/material-kit.css?v=2.0.6" rel="stylesheet" />
    <!-- CSS Just for demo purpose, don't include it in your project -->
    <link href="<?php echo base_url();?>/public/app/v4.0/assets/css/VentasNubeStyle.css" rel="stylesheet">
</head>
<body class="profile-page sidebar-collapse">
	<!-- Navbar -->
  <!-- Barra Lateral derecha -->
  <body class="landing-page sidebar-collapse">
  <nav class="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
    <div class="container">
      <div class="navbar-translate">
        <a class="navbar-brand" href="<?php echo base_url();?>">
          <div class="logo-image">
          <img src="<?php echo $owner['owner_img']; ?>" class=" img-fluid logo-nav-bar">
            
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
          <li class="nav-item">
                <a href="<?php echo base_url('login'); ?>" class="nav-link btn btn-primary btn-round purple-gradient btn-xs text-white" type="button">            
                    <i class="fas fa-user-circle"></i>
                    <?= lang('Auth.login') ?>     
                </a>
          </li>
          <li class="nav-item">
               <a id="btn-premium" class="nav-link btn btn-primary btn-round peach-gradient btn-xs text-white" href="<?php echo base_url('register'); ?>"  type="button">
                <i class="fas fa-crown"></i>
                <?= lang('Auth.register') ?>       
               </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="" data-placement="bottom" href="https://www.instagram.com/ventasnube_com/" target="_blank" data-original-title="Seguinos en instagram">
              <i class="fab fa-2x fa-instagram"></i>
            </a>
          </li>
          <!--li class="nav-item">
            <a class="nav-link" rel="tooltip" title="" data-placement="bottom" href="https://www.facebook.com/CreativeTim" target="_blank" data-original-title="Like us on Facebook">
             <i class="fab fa-2x fa-facebook-square"></i>
            </a>
          </li-->
          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="" data-placement="bottom" href="<?php echo base_url();?>/shop" target="_blank" data-original-title="Ir a la tienda">
              <i class="fas fa-2x fa-shopping-cart"></i>
            </a>
          </li>
       
          <li class="dropdown nav-item">
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" >
              <i class="fas fa-question-circle"></i> Ayuda
            </a>
               <div class="dropdown-menu dropdown-with-icons">
                  <a href="<?php echo base_url();?>tienda/blog" class="dropdown-item">
                    <i class="fas fa-clipboard-list"></i> Documentacion
                  </a>
                  <a href="https://www.youtube.com/channel/UCVw8bUjP2btGFprVGXCjRaA" class="dropdown-item">
                    <i class="fab fa-youtube"></i> Nuestro canal
                  </a>
                  <a href="<?php echo base_url();?>tienda/contacto" class="dropdown-item">
                      <i class="fas fa-comment-dots"></i>  Contactanos
                  </a>
               </div>
          </li>
         </ul>
      </div>
    </div>
  </nav>