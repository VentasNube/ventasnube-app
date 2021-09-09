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
  <link href="<?php echo base_url();?>public/assets/css/docs.css" rel="stylesheet">
  <link href="<?php echo base_url();?>public/assets/css/style.css" rel="stylesheet">
</head>
<body>
<form class="form-signin">
      <div class="text-center mb-4">
        <img class="mb-4" src="<?php echo $emisor[0]->url_logo; ?>" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Floating labels</h1>
        <p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
      </div>

      <div class="form-label-group">
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <label for="inputPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Recordar
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Registrate gratis</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2020</p>
    </form>

    </body>
</html>