
	<!-- Navbar -->
<section>
  <!-- Barra Lateral derecha -->
  <div class="bmd-layout-container bmd-drawer-f-r bmd-drawer-overlay">
  <main class="bmd-layout-content">
  <!-- Navbar -->
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img  class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Others/ecommerce3.jpg" alt="First slide">
            <div class="color-gray-dark carousel-caption d-none d-md-block">
              <h1>Oferta</h1>
         
              <p>Iphone 8</p>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Others/ecommerce2.jpg" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Others/ecommerce4.jpg" alt="Third slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
<div class="container">
<!-- Section: Block Content -->
<div class="container my-5">
  <!-- Section: Block Content --> 
      <!--Navbar-->
        <nav class="navbar sticky-top navbar-light bg-primary">
          <div class="container">
            <!--a class="navbar-brand" href="#">Sticky top</a-->
              <!-- Links -->
              <form class="form-inline navbar-brand">
                    <div class="md-form my-0">
                      <input class="form-control mr-sm-2"  name="busqueda" placeholder="Buscar productos" type="text" aria-label="Search">
                    </div>
                  </form>
                  <ul class="navbar-nav">
                  <li class="nav-item">
                      <span class="nav-link" href="#">
                        <strong>Mostrar: </strong>
                        <select name="cantidad" id="cantidad">
                        <option value="1">1</option>
                          <option value="10">10</option>
                          <option value="100">100</option>
                        </select>
                      </span>
                    </li>
                  </ul>
          </div>
        </nav>
        <!--/.Navbar-->
        <!--h3 class="font-weight-bold text-center dark-grey-text mb-5">Electronics</h3-->
        <!-- RESULTADO-->
        <div class="row" id="card-ecommerce">
        </div>
        <!-- PAGINACION-->
        <div class="justify-content-center text-center paginacion">		
        </div>
        
    
  <!-- Section: Block Content -->  
</div>
<!-- Footer -->
</section>
<!-- Central Modal Small -->
<div class="modal fade" id="centralModalSm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"  aria-hidden="true">
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
        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary btn-sm">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>

