<?=$this->extend('admin/templates/index');?>

<?=$this->section('page-content');?>



<!-- favicon.ico -->


<div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">Usuarios Registrados</h1>

    <div class="row">
        <div class="col-lg-12">
            <table id="users_table" class="tables table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Plan</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $i = 1;?>
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <th scope="row"><?=$i++;?></th>
                            <td><?=$user->username;?></td>
                            <td><?=$user->email;?></td>
                            <td><?=$user->name;?></td>
                            <td>
                                <a href="<?=base_url('admin/user/' . $user->userid);?>" class="btn btn-info">Ver</a>
                            </td>
                        </tr>
                    <?php endforeach;?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<script>


    </script>
<?=$this->endSection();?>