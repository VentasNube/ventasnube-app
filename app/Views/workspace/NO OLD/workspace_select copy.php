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
    <link href="/public/assets/css/material-kit.css?v=2.0.6" rel="stylesheet" />
    <!-- CSS Just for demo purpose, don't include it in your project -->
    <link href="/public/assets/css/VentasNubeStyle.css" rel="stylesheet">

<link href="/public/plugins/iCheck/square/blue.css" rel="stylesheet">

    <!-- snack-bar.ccs -->
    <link rel="stylesheet" href="/public/plugins/snackbar-master/dist/snackbar.min.css">
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

.form-check .form-check-label span {
    display: block;
    position: absolute;
    left: -1px;
    top: -1px;
    transition-duration: 0.2s;
    vertical-align: middle;
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
</head>
<body class="ws_config_tuto_body profile-page sidebar-collapse landing-page">
    <nav class="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
        <div class="container">
        <div class="navbar-translate">
            <a class="navbar-brand" href="<?php echo base_url(); ?>">
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

    <main class="ws_config_tuto_main">
        <!-- main content -->
        <div class="jumbotron pd-vn paral mb-0 " style="background-image: url('/public/assets/img/banner--ventas-Nube.png');">
            <div class="jumbo-main">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 375 390" style="    margin: -100px auto; max-width:500px;" xml:space="preserve">
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
                <h1 style="margin: -130px 0 0 0; padding:0px!important; font-size: 50px;" class="font-weight-bold padding-0 display-3">
                    <?=lang('Ws_setup.ws_config_tittle')?>
                </h1>
                <h2  style="  text-transform: capitalize; margin: -25px 0 0 0; padding:0px!important;" class="text-center padding-0 display-3">
                    <?php echo $user['username'] . ' ' . $user['lastname']; ?>
                </h2>
                <p >
                <button step_porcent_attr="25"  class="mx-auto text-center step_1 btn-round btn btn-secondary btn-raised btn-lg">
                                             <?=lang('Ws_setup.ws_config_button')?>
                </button>
                </p>
              </div>

        </div>
        <div>
        <img style="margin: -11% 0 0 0;" class="mx-auto d-block img-fluid" src="/public/assets/img/nuves-landigpage.png" alt="">
        <form id="ws_new_form" method="POST" action="<?=route_to('register');?>" accept-charset="UTF-8" onsubmit="registerButton.disabled = true; return true;">

            <div id="ws_step_1" step_porcent_attr="33" step_id="1" class="ws_step ws_in container">
                    <h2 class="mb-0 featurette-heading"><?=lang('Ws_setup.ws_config_sub_tittle')?></h2>
                    <h3 class="m-0 text-muted"><?=lang('Ws_setup.ws_config_step_1_tittle')?></h3>
                    <br>
                    <div class="row">
                            <div class="col-md-8">
                                <div style="padding: 50px 0; margin: 20px 0 0 0;" class=" form-group">
                                    <label style="font-size: 30px; height: 50px;" class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_1_input')?></label>
                                    <input id="ws_name" style="font-size: 40px; height: 50px;"  value="" required minlength="3" type="text" name="ws_name" class="focus-in form-control">

                                </div>
                                <button bg-color=""  id="bg-select-color" type="button" class="ws_input dropdown-toggle btn btn-primary btn-raised btn-lg " data-toggle="dropdown"
                                                    aria-expanded="true">
                                                        <span id="bg-select-color" class="material-icons">
                                                        palette
                                                        </span>
                                                        <span id="bg-select-text"> <?=lang('Ws_setup.ws_config_step_2_input_2')?></span>
                                </button>

                                <ul class="dropdown-menu mini">
                                                    <li ws_color='bg-primary' bg-color="btn-primary" class="bg-color btn-status btn btn-primary "> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-secondary' bg-color="btn-secondary" class="bg-color btn-status btn btn-secondary"> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-dark' bg-color="btn-dark" class="bg-color btn-status btn btn-dark"><span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-success' bg-color="btn-success" class="bg-color btn-status btn btn-success "><span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-danger' bg-color="btn-danger" class="bg-color btn-status btn btn-danger"> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-warning' bg-color="btn-warning" class="bg-color btn-status btn btn-warning "> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-white' bg-color="btn-white" class="bg-color btn-status btn btn-white"> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-info' bg-color="btn-info" class="bg-color btn-status btn btn-info"> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <!--li ws_color='bg-dark' bg-color="btn-gray " class="bg-color btn-status btn  btn-gray "> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-dark' bg-color="btn-warning" class="bg-color btn-status btn btn-warning "> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-dark' bg-color="btn-brown" class="bg-color btn-status btn btn-brown"> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-dark' bg-color="btn-green-dark" class="bg-color btn-status btn btn-green-dark"> <span
                                                            class="material-icons">panorama_fish_eye</span></li>
                                                    <li ws_color='bg-dark' bg-color="btn-fuchsia" class="bg-color btn-status btn btn-fuchsia"> <span
                                                            class="material-icons">panorama_fish_eye</span></li-->
                                </ul>
                                <input hidden="" id="ws_color"  value="" type="text" name="ws_color" >
                            </div>
                            <div class="text-center col-md-4">
                                <div class="form-group">
                                        <img class="ws_avatar_img" style="" id='ws_logo' src="data:image/png;base64,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" height="200" alt="Image preview...">
                                        <br>
                                        <input hidden=""  id='ws_avatar_img' name="ws_avatar_img" type="textarea">


                                        <button name="registerButton" type="submit" class="btn btn-secondari btn-raised btn-lg ">
                                        <input   id='ws_logo_input' style="z-index:1;" type="file" accept="image/*" onchange="importFileandPreview()">
                                        <?=lang('Ws_setup.ws_config_step_1_input_2')?>
                                        </button>
                                </div>
                            </div>

                    </div>
                <hr class="featurette-divider">
                <!-- /END THE FEATURETTES -->
            </div>

            <div id="ws_step_2" step_porcent_attr="66" step_id="2" class="ws_step ws_out container ">
                <div class="row">
                <div class="col-md-12 align-self-center">
                    <h2 class="mb-0 featurette-heading"><?=lang('Ws_setup.ws_config_step_2_tittle')?></h2>
                    <h3 class="m-0 text-muted"><?=lang('Ws_setup.ws_config_step_2_sub_tittle')?></h3>
                        <div class="container">
                            <div class="row">
                                        <div class="col-md-6 col-12 form-group">
                                            <label class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_email')?></label>
                                            <input required  minlength="3" name="ws_email" type="email"  class="form-control">
                                        </div>
                                        <div class="col-md-6 col-12 form-group">
                                            <label class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_web')?></label>
                                            <input minlength="7" type="text" name="ws_web" class="form-control">
                                        </div>
                                        <div class="col-md-6 col-12 form-group">
                                            <label class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_whatsaap')?></label>
                                            <input minlength="8" type="number" name="ws_whatsaap" class="form-control">
                                        </div>
                                        <div class="col-md-6 col-12 form-group">
                                            <label class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_phone')?></label>
                                            <input minlength="6" type="phone" name="ws_phone" class="form-control">
                                        </div>
                                        <h3 class="row col-md-12"><span class="text-muted"><?=lang('Ws_setup.ws_config_step_2_addres_tittle')?></span></h3>

                                        <div class="col-md-4 form-group">
                                            <label class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_country')?></label>
                                            <input minlength="3" type="text" name="ws_country" class="form-control">
                                        </div>


                                        <div class="col-md-4 form-group">
                                            <label class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_zone')?></label>
                                            <select class="form-control" name="ws_zona_h" value="">
                                                <?=view('workspace/ws_hour_zone')?>

                                            </select>
                                        </div>

                                        <div class="col-md-4 form-group">
                                            <label style="" class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_state')?></label>
                                            <input minlength="3" type="text" name="ws_state" class="form-control">
                                        </div>
                                        <div class="col-md-4 form-group">
                                            <label  class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_city')?></label>
                                            <input  minlength="3" type="text" name="ws_city" class="form-control">
                                        </div>
                                        <div class="col-md-6 col-6 form-group">
                                            <label class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_street')?></label>
                                            <input minlength="3" type="text" name="ws_street" class="form-control">
                                        </div>
                                        <div class="col-md-2 col-6 form-group">
                                            <label class=" bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_number')?></label>
                                            <input minlength="3" type="number" name="ws_number" class="form-control">
                                        </div>
                                        <div class="col-md-2 col-6 form-group">
                                            <label class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_float')?></label>
                                            <input minlength="3" type="text" name="ws_float" class="form-control">
                                        </div>
                                        <div class="col-md-2 col-6 form-group">
                                            <label class="bmd-label-floating"><?=lang('Ws_setup.ws_config_step_2_input_cp')?></label>
                                            <input  minlength="3" type="text" name="ws_cp" class="form-control">
                                        </div>

                                        </br>
                            </div>
                        </div>
                </div>
                </div>
            </div>

            <div id="ws_step_3" step_porcent_attr="100" step_id="3" class="ws_step ws_out container ">
                <div class="row featurette">
                <div class="col-md-12 align-self-center" style="background-image: url(/public/dist/img/tuto/board-edit-group.svg)!important;      background-repeat: no-repeat!important;    background-size: 230px 230px!important;  background-position: 94% 15% !important; " >
                    <h2 class="mb-0 featurette-heading"><?=lang('Ws_setup.ws_config_step_3_tittle')?></h2>
                    <h3 class="m-0 text-muted"><?=lang('Ws_setup.ws_config_step_3_sub_tittle')?></h3>
                    </br>
                        <div class="col-12 container">
                            <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input checked type="checkbox" name="ws_collections" value="ws_collections" class="checkbox" id="ws_collections">
                                                <label for="ws_collections" class="chek_box_label radio-check-lg bmd-label-floating">
                                                <span class="material-icons">
                                                <?=lang('Ws_setup.ws_config_step_3_input_6_icon')?>
                                                </span>
                                                <?=lang('Ws_setup.ws_config_step_3_input_6')?></label>
                                            </div>
                                        </div>

                                      

                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="checkbox" value="">
                                                <?=lang('Ws_setup.ws_config_step_3_input_6')?>
                                                <span class="form-check-sign">
                                                    <span class="check"></span>
                                                </span>
                                            </label>
                                        </div>
                                        
                                        <div class="form-check">
                                            <span class="material-icons icon-xl">
                                                <?=lang('Ws_setup.ws_config_step_3_input_6_icon')?>
                                            </span>
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="checkbox" value="">
                                                <?=lang('Ws_setup.ws_config_step_3_input_6')?>
                                                <span class="form-check-sign">
                                                    <span class="check"></span>
                                                </span>
                                               
                                            </label>
                                        </div>

                                                

                                        <div class="col-12">
                                            <div class="form-group">
                                                <input checked type="checkbox" name="ws_contact" value="ws_contact" class="checkbox" id="ws_contact">
                                                <label for="ws_contact" class="chek_box_label radio-check-lg bmd-label-floating">
                                                <span class="material-icons">
                                                <?=lang('Ws_setup.ws_config_step_3_input_7_icon')?>
                                                </span>
                                                <?=lang('Ws_setup.ws_config_step_3_input_7')?></label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input checked type="checkbox" name="ws_buy" value="ws_buy" class="checkbox" id="ws_buy">
                                                <label for="ws_buy" class="chek_box_label radio-check-lg bmd-label-floating">
                                                <span class="material-icons">
                                                <?=lang('Ws_setup.ws_config_step_3_input_1_icon')?>
                                                </span>
                                                <?=lang('Ws_setup.ws_config_step_3_input_1')?></label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input checked type="checkbox" name="ws_sell" value="ws_sell" class="checkbox" id="ws_sell">
                                                <label for="ws_sell" style="" class="chek_box_label radio-check-lg bmd-label-floating">
                                                <span class="material-icons">
                                                <?=lang('Ws_setup.ws_config_step_3_input_2_icon')?>
                                                </span>
                                                <?=lang('Ws_setup.ws_config_step_3_input_2')?></label>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <div class="form-group">
                                                <input checked type="checkbox" name="ws_order_app" value="ws_order_app" class="checkbox" id="ws_order_app">
                                                <label for="ws_order_app"class="chek_box_label radio-check-lg bmd-label-floating">
                                                <span class="material-icons">
                                                <?=lang('Ws_setup.ws_config_step_3_input_3_icon')?>
                                                </span>
                                                <?=lang('Ws_setup.ws_config_step_3_input_3')?></label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input checked type="checkbox" name="ws_box" value="ws_box" class="checkbox" id="ws_box">
                                                <label for="ws_box" class="chek_box_label radio-check-lg bmd-label-floating">
                                                <span class="material-icons">
                                                <?=lang('Ws_setup.ws_config_step_3_input_10_icon')?>
                                                </span>
                                                <?=lang('Ws_setup.ws_config_step_3_input_10')?>
                                            </label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input checked type="checkbox" name="ws_reports" value="ws_reports" class="checkbox" id="ws_reports">
                                                <label for="ws_reports" class="chek_box_label radio-check-lg bmd-label-floating">

                                                <span class="material-icons">
                                                <?=lang('Ws_setup.ws_config_step_3_input_9_icon')?>
                                                    </span>
                                                <?=lang('Ws_setup.ws_config_step_3_input_9')?></label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input checked  type="checkbox" name="ws_statistics" value="ws_statistics" class="checkbox" id="ws_statistics">
                                                <label for="ws_statistics" class="chek_box_label radio-check-lg bmd-label-floating">
                                                <span class="material-icons">

                                                <?=lang('Ws_setup.ws_config_step_3_input_8_icon')?>
                                                </span>
                                                <?=lang('Ws_setup.ws_config_step_3_input_8')?></label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input type="checkbox" name="ws_pro_service" value="ws_pro_service" class="checkbox" id="ws_pro_service">
                                                <label for="ws_pro_service" class="chek_box_label radio-check-lg bmd-label-floating">
                                                <span class="material-icons">
                                                <?=lang('Ws_setup.ws_config_step_3_input_4_icon')?>
                                                </span>
                                                <?=lang('Ws_setup.ws_config_step_3_input_4')?></label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-group">
                                                <input type="checkbox" name="ws_tecnic_service" value="ws_tecnic_service" class="checkbox" id="ws_tecnic_service">
                                            <label for="ws_tecnic_service" class="chek_box_label radio-check-lg bmd-label-floating">
                                            <span class="material-icons">
                                            <?=lang('Ws_setup.ws_config_step_3_input_5_icon')?>
                                                </span>
                                            <?=lang('Ws_setup.ws_config_step_3_input_5')?></label>
                                            </div>
                                        </div>
                                        </br>
                                    </br>
                            </div>
                        </div>
                </div>
                </div>
            </div>

        </form>
        <!--div id="ws_step_4" step_porcent_attr="100" step_id="4" class="ws_step ws_out container ">
            <div class="row">
                <div class="col-md-12 align-self-center" >
                    <h2 class="mb-0 featurette-heading"><?=lang('Ws_setup.ws_config_step_4_tittle')?></h2>
                    <h3 class="m-0 text-muted"><?=lang('Ws_setup.ws_config_step_4_sub_tittle')?></h3>
                    </br>

                        <div class="col-12 container">
                            <div class="row">
                                        <div class="col-12">
                                            <div style="" class="form-group">
                                                <input checked bg-color="btn-danger" type="radio" name="box-config" value="" class="radio-check" id="checkbox-22">
                                                <label for="checkbox-22" style="" class="chek_box_label radio-check-lg bmd-label-floating"><?=lang('Ws_setup.ws_config_step_4_input_2')?></label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div style="" class="form-group">
                                                <input bg-color="btn-danger" type="radio" name="box-config" value="" class="radio-check" id="checkbox-11">
                                                <label for="checkbox-11"  class="chek_box_label radio-check-lg bmd-label-floating"><?=lang('Ws_setup.ws_config_step_4_input_1')?></label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div style="" class="form-group">
                                                <input  bg-color="btn-danger" type="radio" name="box-config" value="" class="radio-check" id="checkbox-33">
                                                <label for="checkbox-33" style="" class="chek_box_label radio-check-lg bmd-label-floating"><?=lang('Ws_setup.ws_config_step_4_input_3')?></label>
                                            </div>
                                        </div>

                            </div>
                        </div>
                        </br>

                </div>
            </div>
        </div-->
                                    </br>
                                    </br>
                                    </br>
                                    </br>
                                    </br>
                                    </br>
        <div class="nav_bar_bottom">
            <div class="content">
                                <div class="time_line">
                                        <span></span>
                                        <div class="progress progress-line-primary">
                                            <div id="progress-bar" class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">

                                            </div>
                                        </div>
                                </div>
                                <div class="button_nav float-right">
                                           <button step_porcent_attr="25" name="prev" id='step_1'  class="step_1 float-left btn-round btn btn-secondary btn-raised btn-lg">
                                             <?=lang('Ws_setup.ws_config_button')?>
                                            </button>
                                            <button hidden=""  id="nav_prev" name="prev"  class="float-left btn-round btn btn-secondary btn-raised btn-lg line ">
                                                <?=lang('Ws_setup.ws_config_button_2')?>
                                            </button>
                                            <button hidden="" id="nav_next" name="nex" class="float-left btn-round btn btn-primary btn-raised btn-lg ">
                                                <?=lang('Ws_setup.ws_config_button_1')?>
                                            </button>
                                            <button hidden="" id="nav_finish" class="float-left btn-round btn btn-primary btn-raised btn-lg ">
                                                <?=lang('Ws_setup.ws_config_button_3')?>
                                            </button>
                                </div>
            </div>
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
<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
<!--   Core JS Files   -->
<script src="/public/assets/js/core/jquery.min.js" type="text/javascript"></script>
<script src="/public/assets/js/core/popper.min.js" type="text/javascript"></script>
<script src="/public/assets/js/core/bootstrap-material-desing.js" type="text/javascript"></script>
<script src="/public/plugins/iCheck/icheck.min.js"></script>
<script src="/public/assets/js/plugins/moment.min.js"></script>
<!--	Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker -->
<script src="/public/assets/js/plugins/bootstrap-datetimepicker.js" type="text/javascript"></script>
<!--  Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/ -->
<script src="/public/assets/js/plugins/nouislider.min.js" type="text/javascript"></script>
<!-- snack-bar.JS -->
<script src="/public/plugins/snackbar-master/dist/snackbar.min.js"></script>
<!--  Validate    -->
<script src="/public/plugins/validate/validate.js"></script>
<!-- Control Center for Material Kit: parallax effects, scripts for the example pages etc -->
<script src="/public/assets/js/material-kit.js?v=2.0.6" type="text/javascript"></script>
<script>
 //$(document).ready(function() {

   $(".step_1").on("click", function(e) {
        var posicion = $("#ws_step_1").offset().top;
        var margin = posicion - 100;
        $("html, body").animate({
          scrollTop: margin
        }, 1000);
        var step_porcent = parseInt($(this).attr('step_porcent_attr'));//Porcentaje
        var porcent = step_porcent+'%';
        $('#progress-bar').css("width",porcent);
        $("#ws_name").focus();

        $('#nav_next').removeAttr('hidden');
        $('#step_1').attr('hidden','');
       // $('#nav_prev').show();
    });

    var step_id_attr = 0;

    function next_step(step_id_attr){

        var step_id_attr = parseInt(step_id_attr) //Tomo el numero del atributo que tiene el step
        var nex_step = step_id_attr + 1;//Le sumo un numero mas

        var step_next_id = '#ws_step_'+nex_step;//creo el id del step
        var step_now_id =  '#ws_step_'+step_id_attr;

        var posicion = $(step_next_id).offset().top; //Tomo la posicion en pixeles para desplazar el scroll
        var margin = posicion - 100;
        //Move scroll position
        $("html, body").animate({
          scrollTop: margin
        }, 1000);
        //Add clas IN
        $(step_next_id).removeClass('ws_out');
        $(step_next_id).addClass('ws_in');
        //Remove IN
        $(step_now_id).removeClass('ws_in');
        $(step_now_id).addClass('ws_out');
        //Progress bar
        var step_porcent = parseInt($(step_next_id).attr('step_porcent_attr'));//Porcentaje
        var porcent = step_porcent+'%';

        if(step_porcent == 100){
            $('#nav_next').attr('hidden','');
            $('#nav_finish').removeAttr('hidden');
        }else{
            $('#nav_finish').attr('hidden','');
            $('#nav_next').removeAttr('hidden');
            $('#nav_prev').removeAttr('hidden');
        }
        $('#progress-bar').css("width",porcent);
        //$('#nav_prev').removeAttr('hidden');
    }

    function prev_step(step_id_attr){

        var step_id_attr = parseInt(step_id_attr) //Tomo el numero del atributo que tiene el step
        var nex_step = step_id_attr - 1;//Le sumo un numero mas

        var step_next_id = '#ws_step_'+nex_step;//creo el id del step
        var step_now_id =  '#ws_step_'+step_id_attr;

        var posicion = $(step_next_id).offset().top; //Tomo la posicion en pixeles para desplazar el scroll
        var margin = posicion - 100;
        //Move scroll position
        $("html, body").animate({
        scrollTop: margin
        }, 1000);
        //Add clas IN
        $(step_next_id).removeClass('ws_out');
        $(step_next_id).addClass('ws_in');
        //Remove IN
        $(step_now_id).removeClass('ws_in');
        $(step_now_id).addClass('ws_out');
        //Progress bar
        var step_porcent =parseInt($(step_next_id).attr('step_porcent_attr'));//Porcentaje
        var porcent = step_porcent+'%';

        if(step_porcent == 100){
            $('#nav_next').attr('hidden','');
            $('#nav_finish').removeAttr('hidden');
        }else{
            $('#nav_finish').attr('hidden','');
            $('#nav_next').removeAttr('hidden');
            $('#nav_prev').removeAttr('hidden');
        }
        $('#progress-bar').css("width",porcent);
    }

    $("#nav_next").on("click", function(e) {
        var step_id_attr = $('.ws_config_tuto_body').find('.ws_in').attr('step_id');//Numero id
        var val_ws_name =  $('#ws_name').val();
        var val_ws_name_length = val_ws_name.length;
        // alert( val_ws_name_length);
        if(val_ws_name_length >= 4){
            next_step(step_id_attr);
        }else{
            Snackbar.show({
                text: 'El nombre es necesario y debe tener al menos 4 caracteres',
                actionText: 'ok',
                actionTextColor: "#0575e6",
             });
             $('#ws_name').focus();
        }
    });

    $("#nav_prev").on("click", function(e) {
        var step_id_attr = $('.ws_config_tuto_body').find('.ws_in').attr('step_id');//Numero id
        var val_ws_name =  $('#ws_name').val();
        var val_ws_name_length = val_ws_name.length;
        // alert( val_ws_name_length);
        if(val_ws_name_length >= 4){
            prev_step(step_id_attr);
        }else{
            Snackbar.show({
                text: 'El nombre es necesario y debe tener al menos 4 caracteres',
                actionText: 'ok',
                actionTextColor: "#0575e6",
             });
             $('#ws_name').focus();
        }
    });

    function importFileandPreview(){
            var preview = document.querySelector('#ws_logo');
            var file    = document.querySelector('#ws_logo_input').files[0];
            var reader  = new FileReader();
            reader.addEventListener("load", function () {
                preview.src = reader.result;
                //alert(preview.src);
                $('#ws_avatar_img').val(preview.src);
               // document.getElementById("srcAttribute").innerHTML = "<b>src attribute:</b> " + preview.src.substring(0,40) + '... +' + preview.src.length + ' more characters';
            }, false);
            if (file) {
                reader.readAsDataURL(file);
            }
    }

    $('.checkbox').iCheck({
        checkboxClass: 'icheckbox_square-blue',
      //  radioClass: 'iradio_square-blue',
        handle: '',
        increaseArea: '20%' // optional
    });

    $('.radio-check').iCheck({
       // checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        handle: '',
        increaseArea: '20%' // optional
    });

    $("li.bg-color").click(function () {
        var bgColor = $(this).attr('bg-color');
        var ws_color = $(this).attr('ws_color');
        $("#bg-select-color").removeClass();
       // $("#bg-select-color").addClass('btn ' + bgColor + ' line');

        $("#bg-select-color").addClass('btn btn-raised btn-lg  ' + bgColor);
        $("#bg-select").val(bgColor);
        $("#bg-select-color").attr('bg-color', bgColor);
        $('#ws_color').val(ws_color);
        //alert(ws_color);
        // $("#bg-select-color").attr('bg-color').html(bgColor);
    })

    .mouseout(function () {
            $("span", this).first().text("panorama_fish_eye");
    })
    .mouseover(function () {
            $("span", this).first().text("check_circle");
    });

  /*  $("#nav_finish").validate({
            rules: {
                ws_name: {
                required: true
                }
            },
            messages: {
                ws_name: {
                required: 'Ingresar nombre'
                }
            },
            submitHandler: function(form) {
                alert(enviando)
                $(this).html(' <i class="fas fa-spinner fa-pulse"></i>')
                //Tomo los datos del form
                var dados = $(form).serialize();
                $.ajax({
                type: "POST",
                url: "/workspace/ws_new",
                data: dados,
                dataType: 'json',
                success: function(data) {
                    if (data.result == true) {
                    $('#notificacion').modal('show')
                    $('#msjTitle').html('Muy bien!');
                    $('#msj').html(data.msj);
                    $('#btn-ok').html(' <i class="fas fa-spinner fa-pulse"></i>')
                    $("#btn-ok").attr("data-dismiss", "");
                    //$("#btn-ok").attr("href", "<?php echo base_url(); ?>");
                    } else {
                    var msj = data.msj;
                    $('#btn-submit').html('Comerzar mis 30 dias gratis!')
                    $('#notificacion').modal('show')
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
*/

function validaForm(){
    // Campos de texto
 /*   if($("#nombre").val() == ""){
        alert("El campo Nombre no puede estar vacío.");
        $("#nombre").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#apellidos").val() == ""){
        alert("El campo Apellidos no puede estar vacío.");
        $("#apellidos").focus();
        return false;
    }
    if($("#direccion").val() == ""){
        alert("El campo Dirección no puede estar vacío.");
        $("#direccion").focus();
        return false;
    }
    // Checkbox
    if(!$("#mayor").is(":checked")){
        alert("Debe confirmar que es mayor de 18 años.");
        return false;
    }*/

    return true; // Si todo está correcto
}
    //var dados = $(form).serialize();
    $("#nav_finish").click( function() {     // Con esto establecemos la acción por defecto de nuestro botón de enviar.
        if(validaForm()){                               // Primero validará el formulario.
            $.post("/workspace/ws_new",$('#ws_new_form').serialize(),function(res){
                $("#formulario").fadeOut("slow");   // Hacemos desaparecer el div "formulario" con un efecto fadeOut lento.
                if(res){
                    Snackbar.show({
                        text: 'Se enviaron los datos correctamente',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                   // $("#exito").delay(500).fadeIn("slow");      // Si hemos tenido éxito, hacemos aparecer el div "exito" con un efecto fadeIn lento tras un delay de 0,5 segundos.
                } else {
                    Snackbar.show({
                        text: 'Tuvimos un error y no se envio',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
                   // $("#fracaso").delay(500).fadeIn("slow");    // Si no, lo mismo, pero haremos aparecer el div "fracaso"
                }
            });
        }
    });

  </script>


</html>