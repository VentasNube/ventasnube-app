
<link rel="stylesheet" href="/public/plugins/intl-tel-input-master/build/css/intlTelInput.css">


<body class="body-singup" style="background-image: url('/public/assets/img/footer.png');">

	<main class="main-singup">
		<div class="row d-flex justify-content-center main-singup">

			<div class="col-md-5 ml-auto mr-auto">
				<div class="row justify-content-center">
					<a class="navbar-brand" href="<?php echo base_url(); ?>">
						<div class="logo-image">
							<img src="<?php echo $owner['owner_img']; ?>" class=" img-fluid logo-nav-bar">
						</div>
					</a>
				</div>

				<h1 class="text-center h1-singup"><?= lang('Auth.homesubtittle') ?></h1>
				<h3 class="text-center h3-singup"><?= lang('Auth.homeslogan') ?></h3>

				<?= view('home\login\_message_block') ?>
				<form method="POST" action="<?= route_to('register'); ?>" accept-charset="UTF-8" onsubmit="registerButton.disabled = true; return true;">
					<?= csrf_field() ?>
					<div class="row">
						<!--div class="col-md-6">
							<div class="form-group">
								<label class="bmd-label-floating"><?= lang('Auth.name') ?></label>
								<input value="<?= old('firstname') ?>" type="name" name="firstname" class="focus-in form-control" autofocus="">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="bmd-label-floating"><?= lang('Auth.last_name') ?></label>
								<input  value="<?= old('lastname') ?>" type="lastname" name="lastname" class="form-control" >
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="bmd-label-floating"><?= lang('Auth.movil_phone') ?></label>
								<input value="<?= old('phone') ?> "   type="phone" id="phone" name="phone" class="form-control" >
							</div>
						</div-->
						<div class="col-md-6">
							<div class="form-group">
								<label class="bmd-label-floating"><?= lang('Auth.name') ?></label>
								<input value="<?= old('username') ?>" type="username" name="username" class="focus-in form-control" autofocus="">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="bmd-label-floating"><?= lang('Auth.email') ?></label>
								<input required type="email" class="form-control <?php if (session('errors.email')) : ?>is-invalid<?php endif ?>" name="email" aria-describedby="emailHelp" placeholder="<?= lang('Auth.email') ?>" value="<?= old('email') ?>">
								<small id="emailHelp" class="form-text text-muted"><?= lang('Auth.weNeverShare') ?></small>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="bmd-label-floating"><?= lang('Auth.password') ?></label>
								<input required minlength="5" type="password" name="password" class="form-control <?php if (session('errors.password')) : ?>is-invalid<?php endif ?>" placeholder="<?= lang('Auth.password') ?>" autocomplete="off">

							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label class="bmd-label-floating"><?= lang('Auth.passwordAgain') ?></label>
								<input required minlength="5" type="password" name="pass_confirm" class="form-control <?php if (session('errors.pass_confirm')) : ?>is-invalid<?php endif ?>" placeholder="<?= lang('Auth.repeatPassword') ?>" autocomplete="off">

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
				<div class="text-center">
					<span class="text-center"><a href="<?= site_url('login'); ?>"><?= lang('Auth.alreadyRegistered') ?></a>
					</span>
				</div>

			</div>
			<div class="col-md-4">
				<!--img class="featurette-image float-right" src="<?php echo site_url(); ?>/public/assets/img/footer.png" data-holder-rendered="true" style="width: 500px; height: 500px;"-->
			</div>
		</div>
	</main>
</body>

<!-- Use as a Vanilla JS plugin -->
<script src="/public/plugins/intl-tel-input-master/build/js/intlTelInput.min.js"></script>

<!-- Use as a jQuery plugin -->
<script src="https://code.jquery.com/jquery-latest.min.js"></script>

<script src="/public/plugins/intl-tel-input-master/build/js/intlTelInput-jquery.min.js"></script>


<script>
$( document ).ready(function() {
// jQuery
$("#phone").intlTelInput({

// options here
initialCountry:"ar",

// display only these countries
//onlyCountries: [],

// number type to use for placeholders
placeholderNumberType:"MOBILE",

// the countries at the top of the list. defaults to united states and united kingdom
preferredCountries: ["ar","us","br" ],



});
});
</script>