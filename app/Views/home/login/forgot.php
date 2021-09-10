<body class="body-singup" style="background-image: url('<?php echo base_url();?>/public/app/v4.0/assets/img/footer.png');">

    <main class="main-singup">
        <div class="row d-flex justify-content-center main-singup">
            <div class="container m-top-50">
                <div class="row d-flex justify-content-center main-singup">
                    <form class="col-11 col-sm-8 col-md-8 col-xl-8 text-center" id="formLogin" method="POST" action="<?= site_url('forgot'); ?>" accept-charset="UTF-8" onsubmit="submitButton.disabled = true; return true;">
                        <?= csrf_field() ?>
                        <div class="row justify-content-center">
                            <a class="navbar-brand" href="<?php echo base_url(); ?>">
                                <div class="logo-image">
                                    <img width="auto" height="120px" src="<?php echo $owner['owner_img']; ?>" class=" img-fluid logo-nav-bar">
                                </div>
                            </a>
                        </div>                   
                        <div class="col-sm-12 col-sm-offset-2">
                            <h3>
                                <?= lang('Auth.resetYourPassword') ?>
                            </h3>
                            <p>
                                <?= lang('Auth.forgottenEmail') ?>
                            </p>
                        </div>
                        <div class="col-sm-12 form-group text-left">
                            <?= view('home/login/_message_block') ?>
                            <label for="inputEmail" class="bmd-label-floating"><?= lang('Auth.typeEmail') ?></label>
                            <input class="form-control" id="email" name="email" value="<?= old('email') ?>" required="" autofocus="">
                            <span class="bmd-help">Escribe tu email.</span>
                        </div>
                        <br>
                        <button id="save-edit-btn" class="mb-2 mt-4 btn btn-lg btn-primary btn-block" name="submitButton" type="submit"><?= lang('Auth.setNewPassword') ?></button>

                        <!--a href=""><p class="mt-4 mb-3 text-muted">¿Has olvidado tu contraseña?</p></a-->
                    </form>
                </div>
            </div>
        </div>
    </main>
</body>