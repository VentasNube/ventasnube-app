<?= $this->extend($config->viewLayout) ?>
<?= $this->section('main') ?>


        <div class="row justify-content-md-center align-items-center">
            <form class="form-signin col-10 col-sm-8 col-md-6 col-xl-4 text-center" id="formLogin" method="POST" action="<?= site_url('login'); ?>" accept-charset="UTF-8">
                <a href="<?php echo site_url(); ?>">
                    <img class="mb-4 mt-2" src="<?php echo $owner['owner_img']; ?>" width="auto" height="120px">
                </a>
                <h3 class="text-muted"><?= lang('Auth.login') ?></h3>
                <?= view('home\login\_message_block') ?>
                <div class="text-left">
                    <div class="form-group text-left">
                        <label for="inputEmail" class="bmd-label-floating"><?= lang('Auth.email') ?></label>
                        <input id="email" type="email" name="login" value="<?= old('email') ?>" class="form-control" required="" autofocus="">
                        <span class="bmd-help"><?= lang('Auth.email') ?></span>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword" class="bmd-label-floating"><?= lang('Auth.password') ?></label>
                        <input required minlength="5" type="password" name="password" value="" class="form-control" required="">
                    </div>
                </div>
                <?= csrf_field() ?>
                <button class="mb-2 mt-4 btn btn-lg btn-primary btn-block" type="submit"><?= lang('Auth.login') ?></button>
               
                <a href="<?= route_to('register') ?>">
                    <p class="mt-4 mb-3 text-muted"><?= lang('Auth.needAnAccount') ?></p>
                </a>

                <a href="<?= site_url('forgot'); ?>">
                    <p ><?= lang('Auth.forgotYourPassword') ?></p>
                </a>
            </form>
        </div>

<?= $this->endSection() ?>


