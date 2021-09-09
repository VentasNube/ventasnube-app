<body class="body-singup" style="background-image: url('<?php echo site_url(); ?>/public/assets/img/footer.png');">

    <main class="main-singup">
        <div class="row d-flex justify-content-center main-singup">

            <div class="col-md-5 ml-auto mr-auto">
                <div class="row justify-content-center">

                    <a class="navbar-brand" href="<?php echo base_url(); ?>">
                        <div class="logo-image">
                            <?php
                            if ($emisor[0]->logo_text_2_active == 1) {
                                echo $emisor[0]->logo_text_2;
                            } else {
                            ?>
                                <img src="<?php echo $emisor[0]->url_logo2; ?>" class=" img-fluid logo-nav-bar">
                            <?php } ?>

                        </div>
                    </a>
                </div>
                <h1 class="text-center h1-singup">Da el salto a la nube y empieza gratis</h1>
                <h3 class="text-center h3-singup">Probá 30 días gratis y lleva tu negocio a otro nivel.</h3>
                <form id="singup" class="form-singup" method="post" action="<?php echo base_url() ?>micuenta/signupV">
                    <div class="row">



                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="bmd-label-floating">Nombre de tu negocio</label>
                                <input type="name" name="name" class="focus-in form-control" autofocus="">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="bmd-label-floating">Tu Email</label>
                                <input id="email" name="email" type="email" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="bmd-label-floating">Contrase&ntilde;a nueva</label>
                                <input type="pass" class="form-control">
                            </div>
                        </div>
                    </div>
                    <!--div class="form-group">
                                                    <label for="exampleMessage" class="bmd-label-floating">Your Message</label>
                                                    <textarea type="email" class="form-control" rows="4" id="exampleMessage"></textarea>
                                                </div-->
                    <div class="row justify-content-center">
                      
                            <button type="submit" class="btn btn-primary btn-raised btn-lg ">
                                Comerzar 30 dias gratis
                            </button>
                      
                    </div>
                </form>
                <div class="text-center">
                    <span class="text-center">Tienes una cuenta? <a href="<?php echo base_url('micuenta/login')   ?>">Iniciar Secion</a>
                    </span>

                </div>

            </div>
            <div class="col-md-4">
                <!--img class="featurette-image float-right" src="<?php echo site_url(); ?>/public/assets/img/footer.png" data-holder-rendered="true" style="width: 500px; height: 500px;"-->
            </div>

        </div>
    </main>

    <div id="notificacion" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Error</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>El usuario o la contra&ntilde;a son incorrectos.</p>
                </div>
                <div class="modal-footer">
                    <a id="btn-ok" type="button" class="btn btn-secondary" data-dismiss="modal">ok</a>
                </div>
            </div>
        </div>
    </div>
</body>
<!--script src="https://www.google.com/recaptcha/api.js?render=6LcwPtYUAAAAAEc3RCJNYR0bb8iQTcdn6Z8GS73U"></script-->


<script>

    /*
$('#singup').click(function () {
      grecaptcha.ready(function() {
          grecaptcha.execute('6LcwPtYUAAAAAEc3RCJNYR0bb8iQTcdn6Z8GS73U', {
            
         action: 'homepage'
         // alert('paso el recapcha y se envio el formulario');
        

          });
      });
});*/


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
                    required: 'Ingresar Nombre'
                },
                email: {
                    required: 'Ingresar Un email valido'
                },
                pass: {
                    required: 'Ingresar una contrase&ntilde;a'
                },
            },
            submitHandler: function(form) {

                //Tomo los datos de email y verifico q sea correcto 
                var dados = $(form).serialize();
                $.ajax({
                    type: "POST",
                    url: "<?php echo base_url(); ?>micuenta/signupV",
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
                            $("#btn-ok").attr("data-dismiss", "modal");
                            $("#btn-ok").attr("href", "<?php echo base_url(); ?>micuenta/signUpA");

                            //$(location).attr('href',url);

                        } else {
                            var msj = data.msj;
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
                $(element).parents('.form-group').addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).parents('.form-group').removeClass('error');
                $(element).parents('.form-group').addClass('success');
            }
        });

        /** Redirecciono cuando leo el cartel del modal **/

    });
</script>

<!-- Section: Block Content -->
<!-- Footer -->