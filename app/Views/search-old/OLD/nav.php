<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Home ventas Nube</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <!-- VentasNubeSkin.css -->
    <!-- Material Design for Bootstrap fonts and icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">  
    <!-- Your custom styles (optional) -->   
    <link href="<?php echo base_url();?>public/assets/css/material-kit.css?v=2.0.6" rel="stylesheet" />
    <!-- CSS Just for demo purpose, don't include it in your project -->
    <!--link href="<?php //echo base_url();?>public/assets/css/docs.css" rel="stylesheet"-->
    <link href="<?php echo base_url();?>public/assets/css/style.css" rel="stylesheet">
    <!--link href="<?php echo base_url();?>public/assets/css/demo.css" rel="stylesheet" /-->
</head>
<body class="profile-page sidebar-collapse">
	<!-- Navbar -->
  <!-- Barra Lateral derecha -->
  <body class="landing-page sidebar-collapse">
  <nav class="navbar navbar-expand-lg bg-primary navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
    <div class="container">
        <div class="">
        <!--div class="navbar-translate"-->
            <a class="navbar-brand" href="/presentation.html">
            <?php    if ($emisor[0]->logo_text_2_active == 1) {
                  echo $emisor[0]->logo_text_2;
                } else { ?>  
                <img src="<?php echo $emisor[0]->url_logo2; ?>" class=" img-fluid logo-nav-bar">
             <?php } ?>  
             </a>
          </div>            
            <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
            </button>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a href="#pablo" class="nav-link">link</a>
                </li>
                <li class="nav-item">
                    <a href="#pablo" class="nav-link">link</a>
                </li>
            </ul>

            <form class="form-inline ml-auto">
                <div class="form-group no-border">
                  <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-white btn-just-icon btn-round">
                    <i class="material-icons">search</i>
                </button>
            </form>
        </div>
    </div>
</nav>
