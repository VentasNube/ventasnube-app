<?=$this->extend('admin/templates/index');?>

<?=$this->section('page-content');?>



<!-- favicon.ico -->


<div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800"><?php echo $title ?></h1>

    <div class="row">
        <div class="col-lg-12">
        <table id="payment_ws" class="tables display table" style="width:100%">
        <thead>
                <tr>
                    <th>ID</th>
                    <th>workspace_id</th>
                    <th>Fecha de vencimiento</th>
                    <th>Fecha de pago</th>
                    <th>Nombre</th>
                    <th>Plan</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>ID</th>
                    <th>workspace_id</th>
                    <th>Fecha de vencimiento</th>
                    <th>Fecha de pago</th>
                    <th>Nombre</th>
                    <th>Plan</th>
                    <th>Estado</th>
                </tr>
            </tfoot>
        </table>
        
        </div>
    </div>

</div>

<?=$this->endSection();?>