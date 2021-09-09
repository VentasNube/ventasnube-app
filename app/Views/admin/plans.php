<?=$this->extend('admin/templates/index');?>

<?=$this->section('page-content');?>
<div class="container-fluid">

<h1 class="h3 mb-4 text-gray-800">Planes disponibles</h1>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Planes</a>
        </li>

    </ul>
            <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div class="row">
                
                            <?php foreach ($plans as $plan): ?>

                                <div class="col-4 col-md-4">
                                    <div class="card mb-3" style="max-width: 540px;">
                                        <div class="row no-gutters">
                                            <div class="col-md-12">
                                                    <div class="card-body">                                                    
                                                        <div class="col-md-12">
                                                       <h3>
                                                            <span style="font-size: 55px;" class="material-icons"> 
                                                                <?php echo  $plan->icon ?>
                                                            </span>
                                                            <?php echo  $plan->name ?>
                                                    </h3>
                                                        
                                                            <ul class="list-group list-group-flush">
                                                            <li class="list-group-item"> <strong> Id :<?php echo  $plan->id ?> </strong></li>

                                                                <li class="list-group-item"> <strong> Periodo :<?php echo  $plan->periode ?> </strong></li>

                                                                <li class="list-group-item"><strong>Dias periodo:<?php echo  $plan->expiration_days ?></strong></li>
                                                                <li class="list-group-item"><strong>Descripcion:<?php echo  $plan->description ?></strong></li>



                                                            </ul>
                                                            <br>
                                                                                        <!--button type="button"  class="delete_ws btn btn-danger" ws_id=""  data-toggle="modal" data-target="#delete_ws">
                                                             Eliminar
                                                            </button-->
                                                            <a href="edit_plan/<?php echo $plan->id?>" type="button" class="btn btn-primary" >Editar</a>
                                                           
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
                    </div>
            </div>
      



<div class="modal fade" id="delete_plan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <form id="dell_ws" action="post">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Eliminar Plan?</h5>
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

<div class="modal fade" id="change_plan_ws" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar plan</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

<div id='edit_plan'></div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button   type="button" class="btn btn-primary">Eliminar</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">




</script>

<?=$this->endSection();?>