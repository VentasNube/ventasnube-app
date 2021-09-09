<?=$this->extend('admin/templates/index');?>

<?=$this->section('page-content');?>
<div class="container-fluid">

<h1 class="h3 mb-4 text-gray-800">Modulos Disponibles</h1>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Modulos</a>
        </li>

    </ul>
            <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div class="row">

                        <?php foreach ($modules as $m): ?>

                                <div class="col-3 col-md-3">
                                    <div class="card mb-3" style="max-width: 540px;">
                                        <div class="row no-gutters">
                                            <div class="col-md-12">
                                                <div class="card-body">
                                                        <div class="col-md-12">                                                           
                                                            <h3 > 

                                                            </strong> 
                                                              
                                                                <i class="material-icons"> 
                                                                    <?php echo $m->m_icon ?></i>

                                                                     <?php echo $m->m_name ?>                                                          
                                                            
                                                            </strong> 
                                                            </h3>

                                                            <ul class="">
                                                               <li>Id:  (<?php echo $m->m_id ?>) </li>
                                                               <li>Name:  (<?php echo $m->m_name ?>) </li>
                                                               <li>UrlDb:  (<?php echo $m->m_url ?>) </li>
                                                               <li>Posicion:  (<?php echo $m->m_position ?>) </li>
                                                               <li>Estado:  (<?php echo $m->m_type_action ?>) </li>
                                                            </ul>

                                                            <!--button type="button"  class="delete_ws btn btn-danger" ws_id=""  data-toggle="modal" data-target="#delete_ws">
                                                            Eliminar
                                                            </button-->

                                                            <button type="button" class="edit_module_ws btn btn-primary" m_id="<?php echo $m->m_id ?>"  m_url="<?php echo $m->m_url ?>"   m_position="<?php echo $m->m_position ?>" m_color="<?php echo $m->m_color ?>" m_name="<?php echo $m->m_name ?>" m_icon="<?php echo $m->m_icon ?>" data-toggle="modal" data-target="#edit_module_ws">
                                                                Editar
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
                Quieres eliminar este mododulo?

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

<div class="modal fade" id="edit_module_ws" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <form action="/admin/edit_modules" method="post" >
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar modulo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">

            <input type="m_id" name="m_id" class="form-control" id="m_id"  hidden="">
                        
            <div class="form-group">
                <label for="exampleInputEmail1">m_name</label>
                <input type="m_name" name="m_name" class="form-control" id="m_name" aria-describedby="m_name" placeholder="Enter email">
                <small id="m_name" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">m_icon</label>
                <input type="m_icon" name="m_icon" class="form-control" id="m_icon" aria-describedby="m_icon" placeholder="Enter email">
                <small id="m_icon" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">m_color</label>
                <input type="m_color" name="m_color" class="form-control" id="m_color" aria-describedby="m_color" placeholder="m_color">
                <small id="m_color" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1"> m_url</label>
                <input type="m_url" name="m_url" class="form-control" id="m_url" aria-describedby="m_url" placeholder="m_url">
                <small id="m_color" class="form-text text-muted"></small>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1"> m_position</label>
                <input type="m_position" name="m_position"  class="form-control" id="m_position" aria-describedby="m_position" placeholder="m_position">
                <small id="m_position" class="form-text text-muted"></small>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit"  class="btn btn-primary">Guadar</button>
        </div>
        </form>
    </div>
  </div>
</div>

<script type="text/javascript">

</script>

<?=$this->endSection();?>