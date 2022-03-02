<?=$this->extend('admin/templates/index');?>

<?=$this->section('page-content');?>
<div class="container-fluid">

<h1 class="h3 mb-4 text-gray-800">Espacios de trabajo</h1>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Workspaces</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Vencimientos</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Pagos</a>
        </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <div class="row">
                    <?php foreach ($workspace as $ws): ?>

                    <div class="col-4 col-md-4">
                        <div class="card mb-3" style="max-width: 540px;">
                            <div class="row no-gutters">
                                <div class="col-md-12">
                                        <div class="card-body">
                                            <div class="row no-gutters">
                                                <div class="col-md-4">
                                                    <img style="width: 100px;" src="data:image/jpeg;base64<?=$ws->workspace_img?>" />
                                                </div>
                                                <div class="col-md-8">
                                                    <h3><?= $ws->workspace_name;?> (<?= $ws->workspace_id;?>) </h3>
                                                    <h3>(<?= $ws->workspace_id_hex;?>)</h3>
                                                    <li class="list-group-item"> <strong> Vencimiento:</strong> </br> <?=$ws->workspace_plan_expiration;?></li>
                                                </div>
                                            </div>
                                            <div class="col-md-12">

                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item"> <strong> Plan vencimiento:</strong> <?=$ws->workspace_plan_expiration;?></li>

                                                    <li class="list-group-item"><strong>Tipo de plan:</strong>
                                                    
                                                    </li>
                                                </ul>

                                                <button type="button"  class="delete_ws btn btn-danger" ws_id="<?=$ws->workspace_id;?>"  data-toggle="modal" data-target="#delete_ws">
                                                Eliminar
                                                </button>

                                                <button type="button" class="update_ws btn btn-warning" ws_id_ex="<?= $ws->workspace_id_hex;?>" user_id="<?=$ws->user_id;?>"   ws_id="<?=$ws->user_workspace_id;?>"  data-toggle="modal" data-target="#update_ws">
                                                    Actualizar
                                                </button>

                                                <button class="btn btn-primary pull-right"> Bloquear
                                                </button>

                                            </div>
                                        </div>
                                        
                                </div>
                            </div>
                        </div>
                    </div>

                    <?php endforeach;?>
                </div>
            </div>
    </div>
    </div>
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

        </div>
        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
        </div>
    <!-- Page Heading -->
    </div>



<div class="modal fade" id="delete_ws" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <form id="dell_ws" action="post">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Eliminar Workspace</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Quieres eliminar este espacio de trabajo y todos sus datos?
                <imput id="del_ws_id" name="ws_id" class="" value="" >
                <imput id="user_id" name="user_id" class="" value="" >
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button id="dell_ws_submit" type="button" class="btn btn-primary">Eliminar</button>
            </div>
        </form>
    </div>
  </div>
</div>

<div class="modal fade" id="update_ws" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Actualizar este Workspace</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form id="formUpadate" action="post">
      <div class="modal-body">
       Puedes actualizar los documentos de configuracion a la ultima plantilla.
            <div class="form-group">
                 <imput id="update_ws_id" name="ws_id" class="" value="" >
                 <imput id="user_id" name="user_id" class="" value="" >
            </div>


            <div class="row no-gutters">
                                                <div class="col-md-6">
                                                <h4>Doc Lenguaje :</h4>
                                                <h4>Doc diseno get :</h4> 
                                                <h4>Doc diseno get cart:</h4> 
                                                <h4>Doc barra lateral:</h4>  
                                                </div>
                                                <div class="col-md-6">
                                                <button id="update_ws_submit"   type="button" class="btn btn-primary"> ( ws_app_lang ) </button><br>
            <button id=""   type="button" class="btn btn-primary">(	_design/get )</button><br>
             <button id=""   type="button" class="btn btn-primary">( _design/get_cart_ws )</button><br>
           <button id=""   type="button" class="btn btn-primary">( ws_left_nav_xxxx )</button><br>              
         </div>
                                            </div>



         
      </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button id="update_ws_submit"   type="button" class="btn btn-primary">Actualizar</button>
        </div>
      </form>
    </div>
  </div>
</div>


<?=$this->endSection();?>