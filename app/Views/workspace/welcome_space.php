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
    <link href="/public/app/v4.0/app/v4.0/assets/css/material-kit.css?v=2.0.6" rel="stylesheet" />
    <!-- CSS Just for demo purpose, don't include it in your project -->
    <link href="/public/app/v4.0/app/v4.0/assets/css/VentasNubeStyle.css" rel="stylesheet">
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
          <li class="nav-item">
            <a class="nav-link" rel="tooltip" title="" data-placement="bottom" href="/shop" target="_blank" data-original-title="Ir a la tienda">
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


  @keyframes rocketFlyUp {
    from {
      transform: translateY(300px);
    }

    to {
      transform: translateY(0);
    }
  }

  @keyframes bouncingRocket {
    0 {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(5px);
    }

    100 {
      transform: translateY(0px);
    }
  }

  @keyframes cloudMoveLeft {
    from {
      transform: translateX(-100px);
    }

    to {
      transform: translateX(0px);
    }
  }

  @keyframes cloudMoveRight {
    from {
      transform: translateX(80px);
    }

    to {
      transform: translateX(0px);
    }
  }

  @keyframes bouncingCloud {
    0 {
      transform: translateY(0);
    }

    50% {
      transform: translateY(5px);
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes sparkleScale {
    0 {
      transform: scale(0);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes drawLine {
    from {
      stroke-dashoffset: 65;
      opacity: 1;
      transfrom: translateY(0px);
    }

    to {
      stroke-dashoffset: 0;
      opacity: 0;
      transform: translateY(10px);
    }
  }
</style>



<main class="">
  <!-- main content -->
  <div class="jumbotron pd-vn paral mb-0 " style="background-image: url('/public/app/v4.0/assets/img/banner--ventas-Nube.png');">
    <div class="jumbo-main">
    

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 375 390" style="width:500px;" xml:space="preserve">
        <mask id="mask-cloud">
          <circle style="fill:#1f6bff;" cx="186.4" cy="232.9" r="126.4" />
        </mask>
        <mask id="mask-rocket">
          <rect x="60.3" y="-0.8" style="fill:#FFFFFF;" width="250" height="320" />
        </mask>

        <circle style="fill:#744bff;" cx="186.4" cy="232.9" r="126.4" />
        <g class="inner_cloud" mask="url(#mask-cloud)">
          <path style="fill:#1f6bff;" d="M362.9,271.6c-1.7-23.3-22-40.8-45.3-39.1c-3.3,0.2-6.5,0.9-9.7,1.9l0,0c-7.3,2.3-8.6,2.2-15.2-1.7l0,0
			c-20.2-11.7-46.1-4.8-57.8,15.5c-0.8,1.5-1.6,3-2.3,4.5l0,0c-5.9,13.9-8.8,15.2-19.6,17.1c-5.3,0.9-10.2,3.2-14.3,6.6l0,0
			c-4.3,3.6-7.9,3.6-12.5-1.7l0,0c-10.8-12.3-28.1-16.4-43.2-10.2c-8.1,3.3-10.4,3.2-18.3-2.4l0,0c-5.9-4.2-12.9-6.7-20.1-7.4l0,0
			c-6.5-0.6-8.3-2.1-10-8.4l0,0c-6.2-22.5-29.5-35.8-52-29.6s-35.8,29.5-29.6,52c4.6,16.9,19.2,29.2,36.6,30.9l0,0
			c6.5,0.6,8.3,2.1,10,8.4l0,0c6.2,22.5,29.5,35.8,52,29.7c3.2-0.9,6.2-2.1,9.1-3.7l0,0c8.5-4.6,10.8-4.5,18.5-0.3l0,0
			c15.7,8.5,35.2,5,47-8.5l0,0c4.6-5.3,8.2-5.3,12.5-1.7l0,0c12.9,10.8,32.1,9.1,43-3.8l0,0c7-8.3,9.6-10.1,24.2-8.4h0.3h0.2l0,0
			c6,0.7,12,0.2,17.8-1.6l0,0c7.3-2.3,8.6-2.2,15.2,1.7l0,0c20.2,11.7,46.1,4.8,57.8-15.5C361.5,288.5,363.5,280.1,362.9,271.6
			L362.9,271.6z" />
        </g>
        <g class="bolt-left">
          <path style="fill:#FFC95B;" d="M131.5,262.7c0.1-0.1,0.3-0.2,0.4-0.1l4.5,4.8l2-1.2c0,0,0,0,0,0c0.1-0.1,0.3,0,0.3,0.2l3.5,9.7
			c0.1,0.1,0,0.3-0.1,0.4s-0.3,0-0.4-0.1l-4.5-4.7l-1.7,1.1c0,0,0,0,0,0c-0.1,0.1-0.3,0-0.4-0.1l-3.7-9.7
			C131.4,262.9,131.5,262.8,131.5,262.7z" />
        </g>
        <g class="bolt-right">
          <path style="fill:#FFC95B;" d="M245.3,272.1l-7.3,7.8c-0.1,0.1-0.3,0.1-0.4,0c0,0,0,0,0,0l-1.2-1.7l-6.2,2.7c-0.1,0.1-0.3,0.1-0.4-0.1
			c-0.1-0.1-0.1-0.3,0.1-0.4l7.1-7.9c0.1-0.1,0.3-0.1,0.4,0c0,0,0,0,0,0l1.4,1.9l6.2-2.8c0.2,0,0.4,0.1,0.4,0.2
			C245.4,271.9,245.3,272,245.3,272.1z" />
        </g>
        <!--<g class="sparkle-left">
		<path style="fill:#F7D801;" d="M104,203.8c-0.3,0.2-0.6,0.1-0.9-0.1c-2.3-2.6-5.9-3.6-9.2-2.5c-0.4,0.1-0.7-0.1-0.9-0.4
			c-0.1-0.3,0-0.5,0.2-0.7c2.6-2.3,3.7-5.9,2.6-9.2c-0.1-0.3,0-0.6,0.3-0.8c0.3-0.2,0.6-0.1,0.9,0.2c2.3,2.6,5.9,3.6,9.2,2.5
			c0.3-0.1,0.6,0,0.8,0.3c0.2,0.3,0.1,0.6-0.1,0.8c-2.7,2.3-3.7,5.9-2.6,9.2C104.4,203.3,104.3,203.7,104,203.8z"/>
  </g>-->
          <!--<g class="sparkle-right">
      <path style="fill:#F7D801;" d="M243.6,248.2c-0.3-0.1-0.5-0.4-0.5-0.7c0.3-3.5-1.6-6.8-4.7-8.4c-0.3-0.2-0.5-0.6-0.3-0.9
        c0.1-0.2,0.4-0.4,0.7-0.4c3.5,0.3,6.8-1.5,8.4-4.6c0.2-0.3,0.5-0.4,0.8-0.3c0.3,0.1,0.5,0.4,0.5,0.7c-0.3,3.5,1.6,6.8,4.7,8.4
        c0.3,0.1,0.4,0.5,0.3,0.8c-0.1,0.3-0.4,0.5-0.7,0.5c-3.5-0.3-6.8,1.5-8.4,4.6C244.3,248.1,243.9,248.3,243.6,248.2z"/>
  </g>-->
        <g class="cloud-left-wrapper">
          <path class="cloud-left" style="fill:#ffff;" d="M91.6,176c-0.2-3.8-3.3-6.8-7.1-6.8l0,0c-3-0.1-3.3-0.2-5.4-2l0,0c-2.9-2.4-7.2-2.1-9.8,0.6
			l0,0c-1.7,1.8-1.9,2-5.2,2.8l0,0c-4,0.8-6.9,4.2-7,8.3c0,4.7,4.2,8.6,9.3,8.6c0.7,0,1.4-0.1,2.1-0.2l0,0c3.8-0.8,4.3-0.6,6.9,0.8
			l0,0c1.1,0.6,2.3,0.9,3.6,0.9c2.6,0,5.1-1.4,6.3-3.8l0,0c1-2,1.1-2.1,3.1-3.4l0,0h0.1l0,0C90.3,180.4,91.5,178.3,91.6,176z" />

        </g>
        <g class="cloud-right-wrapper">
          <path class="cloud-right" style="fill:#ffff;" d="M320,172.4c0-4.7-4-8.4-9-8.6l0,0c-3.8-0.1-4.2-0.3-6.9-2.5l0,0c-3.7-3-9.1-2.7-12.4,0.7l0,0
			c-2.1,2.2-2.3,2.5-6.5,3.5l0,0c-5,1-8.6,5.3-8.8,10.4c0,6,5.2,10.8,11.7,10.8c0.9,0,1.8-0.1,2.6-0.3l0,0c4.9-1,5.4-0.8,8.6,1l0,0
			c1.4,0.8,2.9,1.2,4.5,1.2c3.3,0.1,6.4-1.8,8-4.7l0,0c1.2-2.5,1.4-2.7,3.9-4.3l0,0l0.1-0.1l0,0C318.4,178,320,175.3,320,172.4z" />

        </g>
        <g class="fire-rocket-mask" mask="url(#mask-rocket)">
          <g class="fire-rocket-group">

            <g class="fire">
              <polygon style="fill:#FFC95C;" points="241.2,365.1 131.5,365.1 178.2,204.8 194.5,204.8 		" />
              <polygon style="opacity:0.5;fill:#F1584E;" points="215.7,365.1 157,365.1 183.6,204.8 189.1,204.8 		" />
            </g>
            <g class="rocketship">
              <path style="fill:#e05edc;" d="M153.1,135.9c0,0-21.7,15.2-31.7,22.6c-9.7,7.3-12.1,15.9-9.3,27.2s10.5,42.8,10.5,42.8h7.2
			c0,0-1.1-24.2,31.7-38.4S153.1,135.9,153.1,135.9z" />
              <path style="fill:#e05edc;" d="M219.6,135.9c0,0,21.7,15.2,31.7,22.6c9.7,7.3,12.1,15.9,9.3,27.2s-10.5,42.8-10.5,42.8H243
			c0,0,1.1-24.2-31.7-38.4S219.6,135.9,219.6,135.9z" />
              <path style="fill:#F4F6FA;" d="M226.6,128.3c0-65.1-29.3-110.4-40.2-110.4h-0.1c-10.9,0-40.2,45.3-40.2,110.4c0,46.5,13.5,76.5,16.7,79.7
			s12.1,3.2,23.1,3.2h0.7c11,0,20-0.1,23.1-3.2S226.6,174.8,226.6,128.3z" />
              <path style="opacity:0.7;fill:#D2D9E8;" d="M226.6,128.3c0-65.1-29.3-110.4-40.2-110.4h-0.1c-10.9,0,27.5,43.6,12.1,132.8
			c-7.9,45.8-35.5,57.4-35.5,57.4c3.2,3.2,12.1,3.2,23.1,3.2h0.7c11,0,20-0.1,23.1-3.2S226.6,174.8,226.6,128.3z" />
              <path style="fill:#e05edc;" d="M218.1,68c-5-28.1-23.3-56.5-31.7-56.5h-0.1c-8.3,0-26.8,28.6-31.7,56.5c0,0,12.3-6.5,31.7-6.5
			S218.1,68,218.1,68z" />
              <rect x="182.3" y="140.2" style="fill:#e05edc;" width="8.2" height="88.4" />
              <circle style="fill:#214a81;" cx="186.4" cy="100.8" r="21.8" />
            </g>
          </g>
        </g>
        <line class="svg-white-line line-left" x1="165" y1="230" x2="165" y2="286" />
        <line class="svg-white-line line-mid" x1="185" y1="240" x2="185" y2="278" />
        <line class="svg-white-line line-right" x1="205" y1="220" x2="205" y2="280" />
        <path class="foreground-cloud" style="fill:#FFFFFF;" d="M320.1,240.5c-23.6-0.2-44,16.4-48.8,39.5l0,0c-1.7,10-6.1,11.3-11.6,11.8c-2,0.1-4,0.3-6,0.6h-0.3l0,0
			c-8.9,1.5-17.1,5.4-23.9,11.3l0,0c-5.2,4.5-14.3,4.5-18.8,0.3l0,0c-14.9-15.6-39.6-16.1-55.1-1.3c-0.6,0.6-1.3,1.2-1.9,1.9l0,0v0
			l0,0c-4.1,4.8-8.5,5-12.9,3.4l0,0c-4.3-1.7-8.8-2.6-13.4-2.6c-1.3,0-2.6,0.1-3.8,0.2l0,0c-12.2,1.4-12.6,0.4-21.9-13.8l0,0
			c-9.1-14-24.7-22.4-41.4-22.4c-27.3,0-49.9,22.1-49.4,49.4c0.7,44.6,130,58.2,165.9,61.1c5.8,0.5,11.6,0.6,17.4,0.4
			c168.6-6.6,175-62,175.1-89.4S347.5,240.7,320.1,240.5z" />

      </svg>

      <h1 style="margin: -192px 0 0 0;font-size: 50px;" class="font-weight-bold padding-0 display-3">
        <?= lang('Auth.hometittle') ?>
      </h1>
      <!--p class="lead ">Lleva tu negocio a otro nivel</p-->

      <div class="col-lg-12 text-center ">
        <h2> <?= lang('Auth.homesubtittle') ?></h2>
        <p class="lead"><a class="btn btn-info btn-lg btn-md purple-gradient text-white" id="irasignup" href="#" role="button"> <?= lang('Auth.homesubmit') ?></a></p>
      </div>
      <!--img class="mx-auto d-block" src="/public/app/v4.0/app/v4.0/assets/img/cohete.png" alt=""--->


      <img class="mx-auto d-block img-fluid" src="/public/app/v4.0/assets/img/nuves-landigpage.png" alt="">

    </div>
  </div>

  <div class="container marketing">
    <!-- Three columns of text below the carousel -->
    <div class="row text-center">
      <div class="col-lg-4 ">
        <div class="rounded-circle text-muted purple-gradient-color"><i style="font-size: 150px;" class="fas fa-shield-alt"></i></div>
        <h2>Seguridad</h2>
        <p>Cifrado de SSL encriptado, y actualizaciones de seguridad constantes.</p>
        <!--p><a class="btn btn-secondary" href="#" role="button">ver mas</a></p-->
      </div><!-- /.col-lg-4 -->
      <div class="col-lg-4">

        <div class="rounded-circle text-muted peach-gradient-color"><i style="font-size: 150px;" class="fas fa-tachometer-alt"></i></div>
        <h2>Velociodad</h2>
        <p>Tu sistema en la nube de google, lo mas veloz y disponible 24/365</p>
        <!--p><a class="btn btn-secondary" href="#" role="button">ver mas</a></p-->
        <a href="https://cloud.google.com/" target="_blanck">
          <img src="/public/app/v4.0/assets/img/G-cloud.png" alt="">
        </a>
      </div><!-- /.col-lg-4 -->
      <div class="col-lg-4">
        <div class="rounded-circle text-muted purple-gradient-color"><i style="font-size: 150px;" class="fab fa-sketch"></i></div>
        <h2>Dise&ntilde;o</h2>
        <p>Descubri el diseno de materiales, adaptativo, atractivo y facil.</p>
        <!--p><a class="btn btn-secondary" href="#" role="button">ver mas</a></p-->
      </div><!-- /.col-lg-4 -->
    </div><!-- /.row -->

    <!-- START THE FEATURETTES -->
    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7 align-self-center">
        <h1 class="featurette-heading">Controla Todo.</h1>
        <h3> <span class="text-muted">Controla tu negocio, estes donde estes!</span></h3>
        <p class="lead">Desde la web, tablet, o smart phone, ventasnube.com es multi plataforma.
          controla todos los movimientos de tu negocio por usuario compras, ventas
          y gastos, tene el historial de precios y mucho mas!</p>
      </div>
      <div class="col-md-5">
        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" style="width: 500px; height: 500px;" src="/public/app/v4.0/assets/img/Imagenes-web-1.png" data-holder-rendered="true">
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7 order-md-2 align-self-center">
        <h1 class="featurette-heading">Tu super catalogo.</h1>
        <h3> <span class="text-muted">Actualiza tus productos de forma facil y rapido!</span></h3>
        <p class="lead">Controla el stock, actualiza los precios masivamente o imprimi y descarga un PDF
          personaliaado con la lista de precios para tus clientes!
          facil y en un solo lugar. ver mas</p>
      </div>
      <div class="col-md-5 order-md-1">
        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="/public/app/v4.0/assets/img/Imagenes-web-2.png" data-holder-rendered="true" style="width: 500px; height: 500px;">
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette ">
      <div class="col-md-7 align-self-center">
        <h1 class="featurette-heading">Vende donde quieras.</h1>
        <h3> <span class="text-muted">En tu local o en la calle, vende mucho mas!</span></h3>
        <p class="lead">Podes generar y hacer ventas en tu local con un lector de barras,
          o desde tu mobil con todos las formas de pago que quieras.
          envia los comprobantes por whatsaap en PDF, ver mas</p>
      </div>
      <div class="col-md-5">
        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="/public/app/v4.0/assets/img/Imagenes-web-3.png" data-holder-rendered="true" style="width: 500px; height: 500px;">
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7 order-md-2 align-self-center">
        <h1 class="featurette-heading">Estadisticas en vivo</h1>
        <h3> <span class="text-muted">El seguimiuento de tus ganancias en tiempo real!</span></h3>
        <p class="lead">Obtene los graficos de ingresos y esgresos, gastos, y compras
          descubri cual es tu ganancia real, filtra entre fechas
          tipos de movimientos y formas de pago. ver mas</p>
      </div>
      <div class="col-md-5 order-md-1">
        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="/public/app/v4.0/assets/img/Imagenes-web-4.png" data-holder-rendered="true" style="width: 500px; height: 500px;">
      </div>
    </div>
    <hr class="featurette-divider">
    <!-- /END THE FEATURETTES -->
    <div id="newPremium" class="container">
      <div class="container my-5">
        <!--Section: Content-->
        <section class="text-center dark-grey-text">
          <!-- Section heading -->
          <i class="text-muted fas fa-crown fa-5x"></i>
          <h3 class="text-muted font-weight-bold pb-2 mb-4">POR QUE SER PREMIUM?</h3>
          <!-- Section description -->
          <h3 class="text-muted w-responsive mx-auto mb-5">
            Tu negocio no puede esperar<br> organiza tu informacion al instante, y no te pierdas de nada!
          </h3>
          <!-- Grid row -->
          <div class="row">
            <!-- Grid column -->
            <div class="col-lg-4 col-md-12 mb-4">
              <!-- Pricing card -->
              <div class="card pricing-card">
                <!-- Price -->
                <div class="price header white-text purple-gradient rounded-top text-white">
                  <h2 class="number">799</h2>
                  <div class="version">
                    <h3 class="mb-0">Inicial</h3>
                  </div>
                </div>
                <!-- Features -->
                <div class="card-body striped mb-1">
                  <ul class="list-unstyled text-left pl-5 align-self-center mr-3">
                    <li>
                      <p class="mt-2"><i class="fas fa-check text-success pr-2"></i>1 usuarios</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Ventas</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Catalogo</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Clientes</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Control de caja</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Compras</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Proovedores</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Niveles de permisos</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Estadisticas en tiempo real</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Informes personalizados</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Pipeline de ventas</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Tienda Online</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Facturacion Afip</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Soporte Personalizado</p>
                    </li>
                  </ul>
                  <button type="button" class="btn btn-lg btn-block btn-primary purple-gradient text-white">Probar gratis 30 dias<div class="ripple-container"></div></button>
                </div>
                <!-- Features -->
              </div>
              <!-- Pricing card -->
            </div>
            <div class="col-lg-4 col-md-12 mb-4">
              <!-- Pricing card -->
              <div class="card pricing-card">
                <!-- Price -->
                <div class="price header white-text green-gradient rounded-top text-white">
                  <h2 class="number">1500</h2>
                  <div class="version">
                    <h3 class="mb-0">Profesional</h3>
                  </div>
                </div>
                <!-- Features -->
                <div class="card-body striped mb-1">
                  <ul class="list-unstyled text-left pl-5 align-self-center mr-3">
                    <li>
                      <p class="mt-2"><i class="fas fa-check text-success pr-2"></i>5 usuarios</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Ventas</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Catalogo</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Clientes</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Control de caja</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Compras</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Proovedores</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Niveles de permisos</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Estadisticas en tiempo real</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Informes personalizados</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Pipeline de ventas</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Tienda Online</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Facturacion Afip</p>
                    </li>
                    <li>
                      <p><i class="fas fa-times text-danger pr-2"></i>Soporte Personalizado</p>
                    </li>
                  </ul>
                  <button type="button" class="btn btn-lg btn-block btn-primary green-gradient text-white">Probar gratis 30 dias<div class="ripple-container"></div></button>
                </div>
                <!-- Features -->
              </div>
              <!-- Pricing card -->
            </div>
            <div class="col-lg-4 col-md-12 mb-4">
              <!-- Pricing card -->
              <div class="card pricing-card">
                <!-- Price -->
                <div class="price header white-text peach-gradient rounded-top text-white">
                  <h2 class="number">2900</h2>
                  <div class="version">
                    <h3 class="mb-0">Empresas</h3>
                  </div>
                </div>
                <!-- Features -->
                <div class="card-body striped mb-1">
                  <ul class="list-unstyled text-left pl-5 align-self-center mr-3">
                    <li>
                      <p class="mt-2"><i class="fas fa-check text-success pr-2"></i>10 usuarios</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Ventas</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Catalogo</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Clientes</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Control de caja</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Compras</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Proovedores</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Niveles de permisos</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Estadisticas en tiempo real</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Informes personalizados</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Pipeline de ventas</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Tienda Online</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Facturacion Afip</p>
                    </li>
                    <li>
                      <p><i class="fas fa-check text-success pr-2"></i>Soporte Personalizado</p>
                    </li>
                  </ul>
                  <button type="button" class="btn btn-lg btn-block btn-primary peach-gradient text-white">Probar gratis 30 dias<div class="ripple-container"></div></button>
                </div>
                <!-- Features -->
              </div>
              <!-- Pricing card -->
            </div>
          </div>
          <!-- Grid row -->
        </section>

        <!--Section: Content-->
      </div>
    </div>
  </div>
  <div class="section-contacts" id="signup">
    <div class="row">
      <div class="col-md-5 ml-auto mr-auto">
        <h1 class="text-center h1-singup"><?= lang('Auth.homesubtittle') ?></h1>
        <h3 class="text-center h3-singup"><?= lang('Auth.homeslogan') ?></h3>

        <?= view('App\Views\home\_message_block.php') ?>
        <form method="POST" action="<?= route_to('register'); ?>" accept-charset="UTF-8" onsubmit="registerButton.disabled = true; return true;">
          <?= csrf_field() ?>
          <div class="row">

            <div class="col-md-6">
              <div class="form-group">
                <label class="bmd-label-floating"><?= lang('Auth.name') ?></label>
                <input value="<?= old('username') ?>" required minlength="3" type="username" name="username" class="focus-in form-control">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="bmd-label-floating"><?= lang('Auth.email') ?></label>
                <input value="<?= old('email') ?>" id="email" name="email" type="email" class="form-control">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="bmd-label-floating"><?= lang('Auth.password') ?></label>
                <input required minlength="5" type="password" name="password" value="" class="form-control">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="bmd-label-floating"><?= lang('Auth.passwordAgain') ?></label>
                <input required minlength="5" type="password" name="pass_confirm" value="" class="form-control">
              </div>
            </div>
          </div>
          <!--div class="form-group">
                                                    <label for="exampleMessage" class="bmd-label-floating">Your Message</label>
                                                    <textarea type="email" class="form-control" rows="4" id="exampleMessage"></textarea>
                                                </div-->
          <div class="row justify-content-center">

            <button name="registerButton" type="submit" class="btn btn-primary btn-raised btn-lg ">
              Comerzar 30 dias gratis
            </button>

          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img class="featurette-image float-right" src="/public/app/v4.0/assets/img/footer.png" data-holder-rendered="true" style="width: 500px; height: 500px;">
      </div>
    </div>
  </div>

  <script src="https://www.google.com/recaptcha/api.js?render=6LcwPtYUAAAAAEc3RCJNYR0bb8iQTcdn6Z8GS73U"></script>

  <div class="btn purple-gradient text-white btn-float-up " id="irarriba"><i class="fas fa-chevron-up"></i> SUBIR</div>
  <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
  <script>
    $(function() {

      $("#detectascroll").on("click", function() {
        //scroll vertical
        var sv = $(document).scrollTop();
        //scroll horizontal
        var sh = $(document).scrollLeft();
        console.log("El scroll es: Vertical->", sv, " Horizontal->", sh);
        $(this).find("span").text("(" + sh + "," + sv + ")");
      });

      $("#scrollelemento").on("click", function() {
        var boton = $(this);
        var elemento = boton.parent();
        //scroll vertical
        var sv = elemento.scrollTop();
        //scroll horizontal
        var sh = elemento.scrollLeft();
        console.log("El scroll del elemento es: Vertical->", sv, " Horizontal->", sh);
        boton.find("span").text("(" + sh + "," + sv + ")");
      });

      /*   $("#animarscroll").on("click", function(){
             var posicion = $("#hastaaqui").offset().top;
             $("html, body").animate({
                 scrollTop: posicion
             }, 2000); 
         });*/
      $(document).on("scroll", function() {
        var desplazamientoActual = $(document).scrollTop();
        var controlArriba = $("#irarriba");
        console.log("Estoy en ", desplazamientoActual);
        if (desplazamientoActual > 100 && controlArriba.css("display") == "none") {
          controlArriba.fadeIn(500);
        }
        if (desplazamientoActual < 100 && controlArriba.css("display") == "block") {
          controlArriba.fadeOut(500);
        }
      });

      $("#irarriba").on("click", function(e) {
        e.preventDefault();
        $("html, body").animate({
          scrollTop: 0
        }, 1000);
      });

      $("#irasignup").on("click", function(e) {
        var posicion = $("#signup").offset().top;
        $("html, body").animate({
          scrollTop: posicion
        }, 2000);
        $("#newname").focus();
      });

      $("#btn-premium").on("click", function(e) {
        var posicion = $("#newPremium").offset().top;
        $("html, body").animate({
          scrollTop: posicion
        }, 2000);
        // $( "#newPremium" ).focus();
      });

    });
  </script>

<div class="py-5 purple-gradient">
  <footer class="container text-white text-left">
    <div class="row">
      <div class="col-12 col-md">
        <a class="" href="#">
          <img style="max-height: 60px; max-height: 110px;  margin-top: -40px;" class="p-0" src="<?php echo $owner['owner_img']; ?>" alt="">
        </a>
        <h4 class="text-small  d-block mb-3 text-white">www.ventasnube.com </h4>
        <small class="d-block mb-3 text-white">Todos los derechos reservados. <br>©2017-2021</small>
      </div>
      <div class="col-6 col-md">
        <h3><i class="fas fa-share-alt"></i> Seguinos</h3>
        <ul class="list-unstyled text-small">
          <li class="footer-item">
            <a class="" rel="tooltip" title="" data-placement="bottom" href="https://www.instagram.com/ventasnube_com/" target="_blank" data-original-title="Follow us on Twitter">
              <i class="fab fa-2x fa-instagram"></i> Instagram
            </a>
          </li>
          <li class="footer-item"> <a href="https://www.youtube.com/channel/UCVw8bUjP2btGFprVGXCjRaA" class="text-white">
              <i class="fab fa-youtube"></i> Nuestro canal
            </a>
          </li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h3><i class="fas fa-question-circle"></i> Ayuda</h3>
        <ul class="list-unstyled text-small">
          <li class="footer-item">
            <a href="<?php echo base_url(); ?>/blog" class="text-white">
              <i class="fas fa-clipboard-list"></i> Preguntas Frecuentes.
            </a>
          </li>
          <li class="footer-item"><a href="<?php echo base_url(); ?>/micuenta/chat" class="text-white">
              <i class="fas fa-comment-dots"></i> Contactanos
            </a></li>
        </ul>
      </div>
    </div>
  </footer>
  <!-- Footer -->
</div>
</div>
</main>
</div>
<!-- Central Modal Small -->
<div class="modal fade" id="centralModalSm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <!-- Change class .modal-sm to change the size of the modal -->
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title w-100" id="myModalLabel">Modal title</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!--Grid row-->
        <div class="row wow fadeIn">
          <!--Grid column-->
          <div class="col-md-6 mb-4">
            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg" class="img-fluid" alt="">
          </div>
          <!--Grid column-->
          <div class="col-md-6 mb-4">
            <!--Content-->
            <div class="p-4">
              <div class="mb-3">
                <a href="">
                  <span class="badge purple mr-1">Category 2</span>
                </a>
                <a href="">
                  <span class="badge blue mr-1">New</span>
                </a>
                <a href="">
                  <span class="badge red mr-1">Bestseller</span>
                </a>
              </div>
              <p class="lead">
                <span class="mr-1">
                  <del>$200</del>
                </span>
                <span>$100</span>
              </p>
              <p class="lead font-weight-bold">Description</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos atque quia ipsa
                sint voluptatibus!
                Beatae sit assumenda asperiores iure at maxime atque repellendus maiores quia sapiente.</p>
              <form class="d-flex justify-content-left">
                <!-- Default input -->
                <input type="number" value="1" aria-label="Search" class="form-control" style="width: 100px">
                <button class="btn btn-primary btn-md my-0 p" type="submit">Add to cart
                  <i class="fas fa-shopping-cart ml-1"></i>
                </button>
              </form>
            </div>
            <!--Content-->
          </div>
          <!--Grid column-->
        </div>
        <!--Grid row-->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary btn-sm">Save changes</button>
      </div>
    </div>
  </div>
</div>
<!-- JQuery -->
<!--script type="text/javascript" src="<?php echo base_url(); ?>public/assets/js/jquery.min.js"></script> -->
<!-- Bootstrap tooltips -->
<!-- <script type="text/javascript" src="<?php echo base_url(); ?>public/assets/js/popper.min.js"></script>
  <script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js" integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous"></script>
 --->
<!--   Core JS Files   -->
<script src="/public/app/v4.0/assets/js/core/jquery.min.js" type="text/javascript"></script>
<script src="/public/app/v4.0/assets/js/core/popper.min.js" type="text/javascript"></script>
<script src="/public/app/v4.0/assets/js/core/bootstrap-material-desing.js" type="text/javascript"></script>
<script src="/public/app/v4.0/assets/js/plugins/moment.min.js"></script>
<!--	Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker -->
<script src="/public/app/v4.0/assets/js/plugins/bootstrap-datetimepicker.js" type="text/javascript"></script>
<!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
<script src="/public/app/v4.0/assets/js/plugins/nouislider.min.js" type="text/javascript"></script>
<!--  Validate    -->
<script src="/public/app/v4.0/plugins/validate/validate.js"></script>
<!-- Control Center for Material Kit: parallax effects, scripts for the example pages etc -->
<script src="/public/app/v4.0/assets/js/material-kit.js?v=2.0.6" type="text/javascript"></script>
<script>
  //$(document).ready(function() { $('.carousel').carousel(); $('body').bootstrapMaterialDesign(); });
</script>

<script>
  $(document).ready(function() {
    // $('#email').focus();
    $("#singup").validate({
      rules: {
        name: {
          required: true
        },
        email: {
          required: true
        },
        pass: {
          required: true
        },
      },
      messages: {
        name: {
          required: 'Ingresar nombre'
        },
        email: {
          required: 'Ingresar un email valido'
        },
        pass: {
          required: 'Ingresar una contrase&ntilde;a'
        },
      },
      submitHandler: function(form) {
        $('#btn-submit').html(' <i class="fas fa-spinner fa-pulse"></i>')
        //Tomo los datos de email y verifico q sea correcto 
        var dados = $(form).serialize();
        $.ajax({
          type: "POST",
          url: "/admin/signupV",
          data: dados,
          dataType: 'json',
          success: function(data) {
            if (data.result == true) {
              // console.log(msj);
              //Tomo los datos de email y reseto el pasword y envio un email.
              //window.location.href = "/activate";
              $('#notificacion').modal('show')
              $('#msjTitle').html('Muy bien!');
              $('#msj').html(data.msj);
              $('#btn-ok').html(' <i class="fas fa-spinner fa-pulse"></i>')
              $("#btn-ok").attr("data-dismiss", "");
              $("#btn-ok").attr("href", "<?php echo base_url(); ?>micuenta/login");
            } else {
              var msj = data.msj;
              $('#btn-submit').html('Comerzar 30 dias gratis')
              $('#notificacion').modal('show')
              $('#msjTitle').html('Error!');
              $('#msj').html(msj);
            }
          }
        });
        return false;
      },
      errorClass: "help-inline",
      errorElement: "span",
      highlight: function(element, errorClass, validClass) {
        $(element).parents('.form-group').addClass('has-danger');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).parents('.form-group').removeClass('has-danger');
        $(element).parents('.form-group').addClass('has-success');
      }
    });

    /** Redirecciono cuando leo el cartel del modal **/
  });
</script>


</body>

</html>