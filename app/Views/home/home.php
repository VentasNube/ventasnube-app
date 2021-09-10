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
/*  body {
  display: flex;
  height: 100vh;

  align-items: center;
  justify-content: center;
}
*/
.btn-liquid {
  display: inline-block;
  position: relative;
  width: 240px;
  height: 60px;
  border-radius: 27px;
  color: #fff;
  font: 700 14px/60px "Droid Sans", sans-serif;
  letter-spacing: 0.05em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  /*padding:5px;*/
}

.btn-liquid .inner {
  position: relative;
  color: #fff;
  z-index: 2;
}

.btn-liquid canvas {
  background-color: transparent!important;
  position: absolute;
  top: -50px;
  right: -50px;
  bottom: -50px;
  left: -50px;
  z-index: 1;
  border-radius: 100%;
}

</style>



<main class="">
  <!-- main content -->
  <div class="jumbotron pd-vn paral mb-0 " style="background-image: url('<?php echo base_url();?>/public/app/v4.0/assets/img/banner--ventas-Nube.png');">
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

     <div style="z-index: 999;    position: relative;  display: block;">

      <h1 style="margin: -192px 0 0 0;font-size: 50px; " class="font-weight-bold padding-0 display-3">
        <?=lang('Auth.hometittle')?>
      </h1>
      <!--p class="lead ">Lleva tu negocio a otro nivel</p-->

      <div class="col-lg-12 text-center ">
        <h2 style="z-index: 999;    position: relative;  display: block;"> <?=lang('Auth.homesubtittle')?></h2>

        <p class="lead">
          <a id="irasignup" href="#" class="btn-liquid">
          <span class="inner"><?=lang('Auth.homesubmit')?></span>
        </a>
        </p>
       <!--a class="btn btn-info btn-lg btn-md purple-gradient text-white" id="irasignup" href="#" role="button"> <?=lang('Auth.homesubmit')?></a></p-->
      </div>
      <!--img class="mx-auto d-block" src="/public/assets/img/cohete.png" alt=""--->

      </div>
      <img class="mx-auto d-block img-fluid" src="<?php echo base_url();?>/public/app/v4.0/assets/img/nuves-landigpage.png" alt="">

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
          <img src="<?php echo base_url();?>/public/app/v4.0/assets/img/G-cloud.png" alt="">
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
        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" style="width: 500px; height: 500px;" src="<?php echo base_url();?>/public/app/v4.0/assets/img/Imagenes-web-1.png" data-holder-rendered="true">
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
        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="<?php echo base_url();?>/public/app/v4.0/assets/img/Imagenes-web-2.png" data-holder-rendered="true" style="width: 500px; height: 500px;">
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
        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="<?php echo base_url();?>/public/app/v4.0/assets/img/Imagenes-web-3.png" data-holder-rendered="true" style="width: 500px; height: 500px;">
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
        <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="<?php echo base_url();?>/public/app/v4.0/assets/img/Imagenes-web-4.png" data-holder-rendered="true" style="width: 500px; height: 500px;">
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
        <h1 class="text-center h1-singup"><?=lang('Auth.homesubtittle')?></h1>
        <h3 class="text-center h3-singup"><?=lang('Auth.homeslogan')?></h3>

        <?=view('App\Views\home\_message_block.php')?>
        <form method="POST" action="<?=route_to('register');?>" accept-charset="UTF-8" onsubmit="registerButton.disabled = true; return true;">
          <?=csrf_field()?>
          <div class="row">

            <div class="col-md-6">
              <div class="form-group">
                <label class="bmd-label-floating"><?=lang('Auth.name')?></label>
                <input value="<?=old('username')?>" required minlength="3" type="username" name="username" class="focus-in form-control">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="bmd-label-floating"><?=lang('Auth.email')?></label>
                <input value="<?=old('email')?>" id="email" name="email" type="email" class="form-control">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="bmd-label-floating"><?=lang('Auth.password')?></label>
                <input required minlength="5" type="password" name="password" value="" class="form-control">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="bmd-label-floating"><?=lang('Auth.passwordAgain')?></label>
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
        <img class="featurette-image float-right" src="<?php echo base_url();?>/public/app/v4.0/assets/img/footer.png" data-holder-rendered="true" style="width: 500px; height: 500px;">
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


/**BOTON LOCO  */
$(function() {
  // Vars
  var pointsA = [],
    pointsB = [],
    $canvas = null,
    canvas = null,
    context = null,
    vars = null,
    points = 8,
    viscosity = 20,
    mouseDist = 70,
    damping = 0.05,
    showIndicators = false;
    mouseX = 0,
    mouseY = 0,
    relMouseX = 0,
    relMouseY = 0,
    mouseLastX = 0,
    mouseLastY = 0,
    mouseDirectionX = 0,
    mouseDirectionY = 0,
    mouseSpeedX = 0,
    mouseSpeedY = 0;

  /**
   * Get mouse direction
   */
  function mouseDirection(e) {
    if (mouseX < e.pageX)
      mouseDirectionX = 1;
    else if (mouseX > e.pageX)
      mouseDirectionX = -1;
    else
      mouseDirectionX = 0;

    if (mouseY < e.pageY)
      mouseDirectionY = 1;
    else if (mouseY > e.pageY)
      mouseDirectionY = -1;
    else
      mouseDirectionY = 0;

    mouseX = e.pageX;
    mouseY = e.pageY;

    relMouseX = (mouseX - $canvas.offset().left);
    relMouseY = (mouseY - $canvas.offset().top);
  }
  $(document).on('mousemove', mouseDirection);

  /**
   * Get mouse speed
   */
  function mouseSpeed() {
    mouseSpeedX = mouseX - mouseLastX;
    mouseSpeedY = mouseY - mouseLastY;

    mouseLastX = mouseX;
    mouseLastY = mouseY;

    setTimeout(mouseSpeed, 50);
  }
  mouseSpeed();

  /**
   * Init button
   */
  function initButton() {
    // Get button
    var button = $('.btn-liquid');
    var buttonWidth = button.width();
    var buttonHeight = button.height();

    // Create canvas
    $canvas = $('<canvas></canvas>');
    button.append($canvas);

    canvas = $canvas.get(0);
    canvas.width = buttonWidth+100;
    canvas.height = buttonHeight+100;
    context = canvas.getContext('2d');

    // Add points

    var x = buttonHeight/2;
    for(var j = 1; j < points; j++) {
      addPoints((x+((buttonWidth-buttonHeight)/points)*j), 0);
    }
    addPoints(buttonWidth-buttonHeight/5, 0);
    addPoints(buttonWidth+buttonHeight/10, buttonHeight/2);
    addPoints(buttonWidth-buttonHeight/5, buttonHeight);
    for(var j = points-1; j > 0; j--) {
      addPoints((x+((buttonWidth-buttonHeight)/points)*j), buttonHeight);
    }
    addPoints(buttonHeight/5, buttonHeight);

    addPoints(-buttonHeight/10, buttonHeight/2);
    addPoints(buttonHeight/5, 0);
    // addPoints(x, 0);
    // addPoints(0, buttonHeight/2);

    // addPoints(0, buttonHeight/2);
    // addPoints(buttonHeight/4, 0);

    // Start render
    renderCanvas();
  }

  /**
   * Add points
   */
  function addPoints(x, y) {
    pointsA.push(new Point(x, y, 1));
    pointsB.push(new Point(x, y, 2));
  }

  /**
   * Point
   */
  function Point(x, y, level) {
    this.x = this.ix = 50+x;
    this.y = this.iy = 50+y;
    this.vx = 0;
    this.vy = 0;
    this.cx1 = 0;
    this.cy1 = 0;
    this.cx2 = 0;
    this.cy2 = 0;
    this.level = level;
  }

  Point.prototype.move = function() {
    this.vx += (this.ix - this.x) / (viscosity*this.level);
    this.vy += (this.iy - this.y) / (viscosity*this.level);

    var dx = this.ix - relMouseX,
      dy = this.iy - relMouseY;
    var relDist = (1-Math.sqrt((dx * dx) + (dy * dy))/mouseDist);

    // Move x
    if ((mouseDirectionX > 0 && relMouseX > this.x) || (mouseDirectionX < 0 && relMouseX < this.x)) {
      if (relDist > 0 && relDist < 1) {
        this.vx = (mouseSpeedX / 4) * relDist;
      }
    }
    this.vx *= (1 - damping);
    this.x += this.vx;

    // Move y
    if ((mouseDirectionY > 0 && relMouseY > this.y) || (mouseDirectionY < 0 && relMouseY < this.y)) {
      if (relDist > 0 && relDist < 1) {
        this.vy = (mouseSpeedY / 4) * relDist;
      }
    }
    this.vy *= (1 - damping);
    this.y += this.vy;
  };


  /**
   * Render canvas
   */
  function renderCanvas() {
    // rAF
    rafID = requestAnimationFrame(renderCanvas);

    // Clear scene
    context.clearRect(0, 0, $canvas.width(), $canvas.height());
    context.fillStyle = '#fff';
    context.fillRect(0, 0, $canvas.width(), $canvas.height());

    // Move points
    for (var i = 0; i <= pointsA.length - 1; i++) {
      pointsA[i].move();
      pointsB[i].move();
    }

    // Create dynamic gradient
    var gradientX = Math.min(Math.max(mouseX - $canvas.offset().left, 0), $canvas.width());
    var gradientY = Math.min(Math.max(mouseY - $canvas.offset().top, 0), $canvas.height());
    var distance = Math.sqrt(Math.pow(gradientX - $canvas.width()/2, 2) + Math.pow(gradientY - $canvas.height()/2, 2)) / Math.sqrt(Math.pow($canvas.width()/2, 2) + Math.pow($canvas.height()/2, 2));

    var gradient = context.createRadialGradient(gradientX, gradientY, 300+(300*distance), gradientX, gradientY, 0);
    gradient.addColorStop(0, '#102ce5');
    gradient.addColorStop(1, '#E406D6');

    // Draw shapes
    var groups = [pointsA, pointsB]

    for (var j = 0; j <= 1; j++) {
      var points = groups[j];

      if (j == 0) {
        // Background style
        context.fillStyle = '#1370ff';
      } else {
        // Foreground style
        context.fillStyle = gradient;
      }

      context.beginPath();
      context.moveTo(points[0].x, points[0].y);

      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var nextP = points[i + 1];
        var val = 30*0.552284749831;

        if (nextP != undefined) {
          // if (nextP.ix > p.ix && nextP.iy < p.iy) {
          //  p.cx1 = p.x;
          //  p.cy1 = p.y-val;
          //  p.cx2 = nextP.x-val;
          //  p.cy2 = nextP.y;
          // } else if (nextP.ix > p.ix && nextP.iy > p.iy) {
          //  p.cx1 = p.x+val;
          //  p.cy1 = p.y;
          //  p.cx2 = nextP.x;
          //  p.cy2 = nextP.y-val;
          // }  else if (nextP.ix < p.ix && nextP.iy > p.iy) {
          //  p.cx1 = p.x;
          //  p.cy1 = p.y+val;
          //  p.cx2 = nextP.x+val;
          //  p.cy2 = nextP.y;
          // } else if (nextP.ix < p.ix && nextP.iy < p.iy) {
          //  p.cx1 = p.x-val;
          //  p.cy1 = p.y;
          //  p.cx2 = nextP.x;
          //  p.cy2 = nextP.y+val;
          // } else {

            p.cx1 = (p.x+nextP.x)/2;
            p.cy1 = (p.y+nextP.y)/2;
            p.cx2 = (p.x+nextP.x)/2;
            p.cy2 = (p.y+nextP.y)/2;

            context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
          //  continue;
          // }

          // context.bezierCurveTo(p.cx1, p.cy1, p.cx2, p.cy2, nextP.x, nextP.y);
        } else {
nextP = points[0];
            p.cx1 = (p.x+nextP.x)/2;
            p.cy1 = (p.y+nextP.y)/2;

            context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
        }
      }

      // context.closePath();
      context.fill();
    }

    if (showIndicators) {
      // Draw points
      context.fillStyle = '#000';
      context.beginPath();
      for (var i = 0; i < pointsA.length; i++) {
        var p = pointsA[i];

        context.rect(p.x - 1, p.y - 1, 2, 2);
      }
      context.fill();

      // Draw controls
      context.fillStyle = '#f00';
      context.beginPath();
      for (var i = 0; i < pointsA.length; i++) {
        var p = pointsA[i];

        context.rect(p.cx1 - 1, p.cy1 - 1, 2, 2);
        context.rect(p.cx2 - 1, p.cy2 - 1, 2, 2);
      }
      context.fill();
    }
  }

  // Init
  initButton();
});

  </script>
  <!-- Section: Block Content -->
  <!-- Footer -->