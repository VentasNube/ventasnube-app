<body class="body-singup" style="background-image: url('<?php echo base_url();?>/public/app/v4.0/assets/img/footer.png');">

    <main class="main-singup">
        <div class="row d-flex justify-content-center main-singup">
            <div class="container m-top-10">
                <div class="row justify-content-center">
                    <a class="navbar-brand" href="<?php echo base_url(); ?>">
                        <div class="logo-image">
                            <img width="auto" height="120px" src="<?php echo $owner['owner_img']; ?>" class=" img-fluid logo-nav-bar">
                        </div>
                    </a>

                </div>
                
                <h2 class="text-center"><?= lang('Auth.resetYourPassword') ?></h2></br>

             
            
                <div class="row d-flex justify-content-center main-singup">
                    <?= view('home/login/_message_block') ?>
                    <form class="col-xs-12 col-md-6 justify-content-center" method="POST" action="<?= site_url('reset-password'); ?>" accept-charset="UTF-8">
                        <?= csrf_field() ?>
                        <p>
                            <label><?= lang('Auth.token') ?></label><br />
                            <input type="text" class="form-control <?php if (session('errors.token')) : ?>is-invalid<?php endif ?>" name="token" placeholder="<?= lang('Auth.token') ?>" value="<?= old('token', $token ?? '') ?>">
                        <div class="invalid-feedback">
                            <?= session('errors.token') ?>
                        </div>
                        </p>
                        <p>
                            <label><?= lang('Auth.email') ?></label><br />
                            <input type="email" class="form-control <?php if (session('errors.email')) : ?>is-invalid<?php endif ?>" name="email" aria-describedby="emailHelp" placeholder="<?= lang('Auth.email') ?>" value="<?= old('email') ?>">
                        <div class="invalid-feedback">
                            <?= session('errors.email') ?>
                        </div>
                        </p>
                        <p>

                            <label for="password"><?= lang('Auth.newPassword') ?></label>
                            <input type="password" placeholder="<?= lang('Auth.newPassword') ?>" class="form-control <?php if (session('errors.password')) : ?>is-invalid<?php endif ?>" name="password">
                        <div class="invalid-feedback">
                            <?= session('errors.password') ?>
                        </div>
                        </p>

                        <p>
                            <label for="pass_confirm"><?= lang('Auth.newPasswordRepeat') ?></label>
                            <input type="password" placeholder="<?= lang('Auth.newPasswordRepeat') ?>" class="form-control <?php if (session('errors.pass_confirm')) : ?>is-invalid<?php endif ?>" name="pass_confirm">
                        <div class="invalid-feedback">
                            <?= session('errors.pass_confirm') ?>
                        </div>
                        </p>
                        <p>
                            <button id="save-edit-btn" class="mb-2 mt-4 btn btn-lg btn-primary btn-block" name="submitButton" type="submit"><?= lang('Auth.resetPassword') ?></button>

                        </p>
                    </form>
                </div>
            </div>
        </div>
    </main>

</body>