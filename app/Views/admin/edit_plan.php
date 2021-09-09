<?=$this->extend('admin/templates/index');?>

<?=$this->section('page-content');?>
<div class="container-fluid">

    <h1 class="h3 mb-4 text-gray-800">Editar modulos del plan</h1>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <!--li class="nav-item">
            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Modulos</a>
        </li-->
        <li class="nav-item">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add_module_plan">
                                                               Agregar Modulo
        </button>

        </li>

    </ul>
            <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div class="row">

                        <?php foreach ($modules as $m): ?>

                                <div class="col-4 col-md-4">
                                    <div class="card mb-3" style="max-width: 540px;">
                                        <div class="row no-gutters">
                                            <div class="col-md-12">
                                                <div class="card-body">
                                                <form action="/admin/dell_module_plan" method="post" >
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
                                                            <input name="plan_id" hidden="" id="plan_id" value="<?php echo $plan_id ?>">
                                                            <input name="module_id" hidden="" id="module_id" value="<?php echo $m->m_id ?>">
                                                            <input name="module_plan_id" hidden="" id="module_plan_id" value="<?php echo $m->id ?>">

                                                            <button type="submit" class="btn btn-primary">
                                                                Eliminar
                                                            </button>

                                                        </div>

                                                              </form>
                                                    </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>
                            <?php endforeach;?>
                        </div>

                        </div>
                    </div>
            </div>




<div class="modal fade" id="delete_module_plan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                Quieres eliminar este mododulo del plan?

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

<div class="modal fade" id="add_module_plan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <form action="/admin/add_module_plan" method="post" >
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar modulo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">

            <input type="m_id" name="m_id" class="form-control" id="m_id"  hidden="">

            <div class="form-group">
                <label for="exampleInputEmail1">Modulo id</label>

                <input name="plan_id" hidden="" id="plan_id" value="<?php echo $plan_id ?>">
                <?php echo $plan_id ?>
                <select name="module_id" id="module_id" class="form-control form-control-lg">
                    <?php foreach ($modules_list as $ml): ?>
                        <option value='<?php echo $ml->m_id ?>'>

                        <?php echo $ml->m_name ?>
                    </option>
                    <?php endforeach;?>
                </select>
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