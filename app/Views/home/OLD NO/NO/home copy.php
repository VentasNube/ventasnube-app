<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Material Design Bootstrap</title>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
  <!-- Bootstrap core CSS -->
  <link href="<?php echo base_url();?>public/assets/css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="<?php echo base_url();?>public/assets/css/mdb.min.css" rel="stylesheet">
    <!-- VentasNubeSkin.css --><link rel="stylesheet" href="<?php echo base_url() ?>public/dist/css/VentasNubeSkin.css">                                                                       
                                                                     

  <link href="https://mdbootstrap.com/api/snippets/static/download/MDB-Pro_4.12.0/js/mdb.min.js" rel="stylesheet">
  
  <!-- Your custom styles (optional) -->
  <link href="<?php echo base_url();?>public/assets/css/style.css" rel="stylesheet">
  
  <style>
  .navbar {
  	z-index: 1040;
}
.side-nav {
  margin-top: 57px !important;
}

.double-nav .breadcrumb-dn p {
    color: #fff;
}

@media (min-width: 1200px){
.fixed-sn main {
    margin-left: 20% !important;
    margin-right: 20% !important;
  }
}
  
  </style>
</head>
<body>
	
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<a href="#" class="btn btn-success">Agregar Cliente</a>
			</div>
			<div class="col-md-4 col-md-offset-2">
				<div class="form-group has-feedback has-feedback-left">				  
				    <input type="text" class="form-control" name="busqueda" placeholder="Buscar algo" />
				    <i class="glyphicon glyphicon-search form-control-feedback"></i>
				</div>				
			</div>			
		</div>
		<br>
		<div class="row">
			<div class="col-md-12">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<h4>Lista de Productos</h4>
					</div>
					<div class="panel-body">
						
						<p>
							<strong>Mostrar por : </strong>
							<select name="cantidad" id="cantidad">
                                <option value="1">1</option>
                                <option value="2">2</option>
								<option value="10">10</option>
							</select>
						</p>
						<table id="tbclientes" class="table table-bordered">
							<thead>
								<tr>
									<th>#</th>
									<th>Codigo</th>
									<th>Nombres</th>
									<th>Apellidos</th>
									<th>DNI</th>
									<th>Email</th>
									<th>Celular</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<div class="text-center paginacion  justify-content-center">
							
                        </div>
					</div>
				</div>
			</div>
		</div>
    </div>
    <body class="fixed-sn light-blue-skin">

<!--Double navigation-->
<header>
  <!-- Sidebar navigation -->
  <div id="slide-out" class="side-nav sn-bg-4 fixed">
    <ul class="custom-scrollbar">
      <!-- Logo -->
      <li>
        <div class="logo-wrapper waves-light">
          <a href="#"><img src="https://mdbootstrap.com/img/logo/mdb-transparent.png" class="img-fluid flex-center"></a>
        </div>
      </li>
      <!--/. Logo -->
      <!--Social-->
      <li>
        <ul class="social">
          <li><a href="#" class="icons-sm fb-ic"><i class="fab fa-facebook"> </i></a></li>
          <li><a href="#" class="icons-sm pin-ic"><i class="fab fa-pinterest"> </i></a></li>
          <li><a href="#" class="icons-sm gplus-ic"><i class="fab fa-google-plus"> </i></a></li>
          <li><a href="#" class="icons-sm tw-ic"><i class="fab fa-twitter"> </i></a></li>
        </ul>
      </li>
      <!--/Social-->
      <!--Search Form-->
      <li>
        <form class="search-form" role="search">
          <div class="form-group md-form mt-0 pt-1 waves-light">
            <input type="text" class="form-control" placeholder="Search">
          </div>
        </form>
      </li>
      <!--/.Search Form-->
      <!-- Side navigation links -->
      <li>
        <ul class="collapsible collapsible-accordion">
          <li><a class="collapsible-header waves-effect arrow-r"><i class="fas fa-chevron-right"></i> Submit
              blog<i class="fas fa-angle-down rotate-icon"></i></a>
            <div class="collapsible-body">
              <ul>
                <li><a href="#" class="waves-effect">Submit listing</a>
                </li>
                <li><a href="#" class="waves-effect">Registration form</a>
                </li>
              </ul>
            </div>
          </li>
          <li><a class="collapsible-header waves-effect arrow-r"><i class="far fa-hand-pointer"></i>
              Instruction<i class="fas fa-angle-down rotate-icon"></i></a>
            <div class="collapsible-body">
              <ul>
                <li><a href="#" class="waves-effect">For bloggers</a>
                </li>
                <li><a href="#" class="waves-effect">For authors</a>
                </li>
              </ul>
            </div>
          </li>
          <li><a class="collapsible-header waves-effect arrow-r"><i class="far fa-eye"></i> About<i class="fas fa-angle-down rotate-icon"></i></a>
            <div class="collapsible-body">
              <ul>
                <li><a href="#" class="waves-effect">Introduction</a>
                </li>
                <li><a href="#" class="waves-effect">Monthly meetings</a>
                </li>
              </ul>
            </div>
          </li>
          <li><a class="collapsible-header waves-effect arrow-r"><i class="far fa-envelope"></i> Contact me<i
                class="fas fa-angle-down rotate-icon"></i></a>
            <div class="collapsible-body">
              <ul>
                <li><a href="#" class="waves-effect">FAQ</a>
                </li>
                <li><a href="#" class="waves-effect">Write a message</a>
                </li>
                <li><a href="#" class="waves-effect">FAQ</a>
                </li>
                <li><a href="#" class="waves-effect">Write a message</a>
                </li>
                <li><a href="#" class="waves-effect">FAQ</a>
                </li>
                <li><a href="#" class="waves-effect">Write a message</a>
                </li>
                <li><a href="#" class="waves-effect">FAQ</a>
                </li>
                <li><a href="#" class="waves-effect">Write a message</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
      <!--/. Side navigation links -->
    </ul>
    <div class="sidenav-bg mask-strong"></div>
  </div>
  <!--/. Sidebar navigation -->
  <!-- Navbar -->
  <nav class="navbar fixed-top navbar-toggleable-md navbar-expand-lg double-nav">
    <!-- SideNav slide-out button -->
    <div class="float-left">
      <a href="#" data-activates="slide-out" class="button-collapse"><i class="fa fa-bars"></i></a>
    </div>
    <!-- Breadcrumb-->
    <div class="breadcrumb-dn mr-auto">
      <p>Material Design for Bootstrap</p>
    </div>
    <ul class="nav navbar-nav nav-flex-icons ml-auto">
      <li class="nav-item">
        <a class="nav-link"><i class="fa fa-envelope"></i> <span class="clearfix d-none d-sm-inline-block">Contact</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link"><i class="fa fa-comments-o"></i> <span class="clearfix d-none d-sm-inline-block">Support</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link"><i class="fa fa-user"></i> <span class="clearfix d-none d-sm-inline-block">Account</span></a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- /.Navbar -->
</header>
<!--/.Double navigation-->

<!--Main Layout-->
<main>
  <div class="container-fluid mt-5">
    <h2>Advanced Double Navigation with fixed SideNav under fixed Navbar:</h2>
    <br>
    <h5>1. Fixed side menu, hidden on small devices.</h5>
    <h5>2. Fixed Navbar. It will always stay visible on the top, even when you scroll down.</h5>
    <div style="height: 2000px"></div>
  </div>
</main>
<!--Main Layout-->

</body>
    
  <!-- JQuery -->
  <script type="text/javascript" src="<?php echo base_url();?>public/assets/js/jquery.min.js"></script>
  <!-- Bootstrap tooltips -->
  <script type="text/javascript" src="<?php echo base_url();?>public/assets/js/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="<?php echo base_url();?>public/assets/js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="<?php echo base_url();?>public/assets/js/mdb.min.js"></script>

 <script type="text/javascript">
  //  $(document).on("ready", main);
    $(document).ready(function main(){
	mostrarDatos("",1,5);
	$("input[name=busqueda]").keyup(function(){
		textobuscar = $(this).val();
		valoroption = $("#cantidad").val();
        mostrarDatos(textobuscar,1,valoroption);
        // alert('hola');
	});
	$("body").on("click",".paginacion li a",function(e){
		e.preventDefault();
		valorhref = $(this).attr("href");
		valorBuscar = $("input[name=busqueda]").val();
		valoroption = $("#cantidad").val();
		mostrarDatos(valorBuscar,valorhref,valoroption);
	});

	$("#cantidad").change(function(){
		valoroption = $(this).val();
		valorBuscar = $("input[name=busqueda]").val();
		mostrarDatos(valorBuscar,1,valoroption);
	});
});
function mostrarDatos(valorBuscar,pagina,cantidad){
	$.ajax({
		url : "<?php echo base_url();?>/tienda/mostrar",
		type: "POST",
		data: {buscar:valorBuscar,nropagina:pagina,cantidad:cantidad},
		dataType:"json",
		success:function(response){
			filas = "";
			$.each(response.produtos,function(key,item){
				filas+="<tr><td>"+item.idProduto+"</td><td>"+item.descricao+"</td><td>"+item.cat+"</td><td>"+item.modelo+"</td><td>"+item.marca+"</td><td>"+item.estoque+"</td><td>"+item.precoVenda+"</td></tr>";
			});

			$("#tbclientes tbody").html(filas);
			linkseleccionado = Number(pagina);
			//total registros
			totalregistros = response.totalregistros;
			//cantidad de registros por pagina
            cantidadregistros = response.cantidad;
            
			numerolinks = Math.ceil(totalregistros/cantidadregistros);
			paginador = "<ul class='pagination pg-blue'>";
			if(linkseleccionado>1)
			{
               // paginador+="<li class='page-item '><a class='page-link' tabindex='-1'>Previous</a></li>";
			//	paginador+="<li class='page-item '><a class='page-link' href='1'>&laquo;</a></li>";
				paginador+="<li class='page-item'><a class='page-link ' href='"+(linkseleccionado-1)+"' '>Anterior</a></li>";

			}
			else
			{
			//	paginador+="<li class='disabled'><a href='#'>&laquo;</a></li>";
			//	paginador+="<li class='disabled'><a href='#'>&lsaquo;</a></li>";
			}
			//muestro de los enlaces 
			//cantidad de link hacia atras y adelante
 			cant = 2;
 			//inicio de donde se va a mostrar los links
			pagInicio = (linkseleccionado > cant) ? (linkseleccionado - cant) : 1;
			//condicion en la cual establecemos el fin de los links
			if (numerolinks > cant)
			{
				//conocer los links que hay entre el seleccionado y el final
				pagRestantes = numerolinks - linkseleccionado;
				//defino el fin de los links
				pagFin = (pagRestantes > cant) ? (linkseleccionado + cant) :numerolinks;
			}
			else {pagFin = numerolinks;}
           
			for (var i = pagInicio; i <= pagFin; i++) {
				if (i == linkseleccionado)
					paginador += "<li class='page-item active'><a class='page-link' href='javascript:void(0)'>"+i+"</a></li>";
				else
					paginador +="<li class='page-item'><a class='page-link' href='"+i+"'>"+i+"</a></li>";
			}
			//condicion para mostrar el boton sigueinte y ultimo
			if(linkseleccionado<numerolinks)
			{
                paginador+="<li class='page-item'><a class='page-link ' href='"+(linkseleccionado+1)+"'>Siguiente</a></li>";

				//paginador+="<li><a href='"+(linkseleccionado+1)+"' >&rsaquo;</a></li>";
				//paginador+="<li class='page-item 2'><a class='page-link' href='"+numerolinks+"'>;&raquo</a></li>";
			}
			else
			{
				//paginador+="<li class='disabled'><a href='#'>&rsaquo;</a></li>";
			//	paginador+="<li class='disabled'><a href='#'>&raquo;</a></li>";
			}
			paginador +="</ul>";
			$(".paginacion").html(paginador);

		}
	});
}
   
</script>

</body>
</html>