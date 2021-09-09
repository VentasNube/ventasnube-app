<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-text mx-3">
              <img style="    height: 50px;" src="https://ventasnube.com/public/assets/img/logo-ventasnube.png">
        </div>
    </a>
    <!-- Divider -->
    <hr class="sidebar-divider">
    <!-- Heading -->
    <div class="sidebar-heading">
        Ventasnube Admin
    </div>
    <!-- Nav Item - My Profile -->
    <li class="nav-item">
        <a class="nav-link" href="<?= base_url('/admin/users'); ?>">
            <span class="material-icons"> people</span>
            <span>Usuarios</span></a>
    </li>
    <!-- Nav Item - Edit Profile -->
    <li class="nav-item">
        <a class="nav-link" href="<?= base_url('/admin/workspaces'); ?>">
            <span class="material-icons"> workspaces</span>
            <span>Workspaces</span></a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="<?= base_url('/admin/payments'); ?>">          
            <span class="material-icons"> paid</span>
            <span>Pagos</span>
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="<?= base_url('/admin/plans'); ?>">
            <span class="material-icons"> workspace_premium</span>            
            <span>Planes</span></a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="<?= base_url('/admin/modules'); ?>">
        <span class="h4 material-icons">
        widgets
        </span>
            <span>Modulos</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Nav Item - Logout -->
    <li class="nav-item">
        <a class="nav-link" href="<?= base_url('logout'); ?>">
            <i class="fas fa-fw fa-sign-out-alt"></i>
            <span>Salir</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->


</ul>