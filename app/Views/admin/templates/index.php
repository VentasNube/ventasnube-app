<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title><?=$title;?></title>

    <!-- Custom fonts for this template-->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <!---link href="<?=base_url();?>/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/css/selectize.bootstrap4.css" integrity="sha512-WJ1jnnij6g+LY1YfSmPDGxY0j2Cq/I6PPA7/s4QJ/5sRca5ypbHhFF+Nam0TGfvpacrw9F0OGeZa0ROdNAsaEQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/css/selectize.css" integrity="sha512-85w5tjZHguXpvARsBrIg9NWdNy5UBK16rAL8VWgnWXK2vMtcRKCBsHWSUbmMu0qHfXW2FVUDiWr6crA+IFdd1A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <!-- Custom styles for this template-->
    <link href="<?=base_url();?>/public/css/sb-admin-2.min.css" rel="stylesheet">
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <?=$this->include('admin/templates/sidebar');?>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <?=$this->include('admin/templates/topbar');?>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <?=$this->renderSection('page-content');?>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Ventas Nube <?=date('Y');?></span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="<?=base_url('logout');?>">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript  vendor/twbs/bootstrap/dist  -->
    <script src="<?php echo base_url();?>/public/app/v4.0/vnadmin/assets/jquery/jquery.min.js"></script>
    <script src="<?php echo base_url();?>/public/app/v4.0/vnadmin/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>

    <script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>

    <!--script src="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/js/selectize.min.js" integrity="sha512-JiDSvppkBtWM1f9nPRajthdgTCZV3wtyngKUqVHlAs0d5q72n5zpM3QMOLmuNws2vkYmmLn4r1KfnPzgC/73Mw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script-->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/js/standalone/selectize.js" integrity="sha512-pF+DNRwavWMukUv/LyzDyDMn8U2uvqYQdJN0Zvilr6DDo/56xPDZdDoyPDYZRSL4aOKO/FGKXTpzDyQJ8je8Qw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="<?php echo base_url();?>/public/app/v4.0/vnadmin/assets/app/js/users.js"></script>


    <!-- Core plugin JavaScript-->
    <!--script src="<?=base_url();?>/public/vendor/jquery-easing/jquery.easing.min.js"></script-->
    <!-- Custom scripts for all pages-->
    <script src="<?php echo base_url();?>/public/app/v4.0/vnadmin/assets/app/js/sb-admin-2.min.js"></script>
    <script>

    // MODULO DE PAGOS TATATABLE AJAX
    var table = $('#payment_ws').DataTable( {
        "ajax": "/admin/get_payments",
        "columnDefs": [ {
            "targets": -1,
            "data": null,
            "defaultContent": "<button class='btn btn-info'>Ver</button>"
        } ]
    } );
    
    // 
    $('#payment_ws tbody').on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 5 ] );
    } );

    // TABLA DE USERS
    var table = $('#users_table').DataTable( {
        "ajax": "/admin/get_users",
        "columnDefs": [ {
            "targets": -1,
            "data": null,
            "defaultContent":"<div class='btn-group' role='group'><button id='btnGroupDrop1' type='button' class='btn btn-secondary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Acciones</button><div class='dropdown-menu' aria-labelledby='btnGroupDrop1'><a class='dropdown-item' href='#'>Dropdown link</a><a class='dropdown-item' href='#'>Dropdown link</a></div></div>"
        } ]
    } );

    // BOTON DE OPCIONES
    $('#users_table tbody').on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 5 ] );
        console.log(data);
    } );

    // FUNCIONES PARA ACTUALIZAR LOS ESPACIOS DE TRABAJO

    $(".update_ws" ).click(function() {

        var ws_id_ex = $(this).attr('ws_id_ex');
        var user_id = $(this).attr('user_id');
        var user_email = $(this).attr('user_email');
        $('#update_ws_submit').attr('ws_id_ex', ws_id_ex );
        $('#update_ws_submit').attr('user_id', user_id );
        $('#update_ws_submit').attr('user_email', user_email );
        
    });

    // EDITAR LENGUAJE 
    $("#update_ws_submit" ).click(function() {
            var ws_id_ex = $(this).attr('ws_id_ex');
            var user_id = $(this).attr('user_id');
            var url = "<?=site_url('/admin/ws_lang_update');?>";
            $.ajax({
            data: {
                ws_id_ex:ws_id_ex,
                user_id:user_id
                },
            url: url, //url de donde obtener los datos
            dataType: 'json', //tipo de datos retornados
            type: 'post' //enviar variables como post
            }).done(function (data){
            console.log(data);
            alert('Se actualizo con exito' + data['res'] + 'Datos:' +data);
                //conformar respuesta final
                //  $('#resultado').html('El resultado es: <b>' + data['res'] + '</b>');
            });
    });

       // EDITAR PRODUCTO DE PRUEBA 1
    $("#ws_products_update" ).click(function() {
            var ws_id_ex = $(this).attr('ws_id_ex');
            var user_id = $(this).attr('user_id');
            var url = "<?=site_url('/admin/ws_products_update');?>";
            $.ajax({
                data: {
                        ws_id_ex:ws_id_ex,
                        user_id:user_id
                    },
                url: url, //url de donde obtener los datos
                dataType: 'json', //tipo de datos retornados
                type: 'post' //enviar variables como post
            }).done(function (data){
                
                //  console.log(data);
                //  alert('Se actualizo con exito' + data['res'] + 'Datos:' + data);
                //  conformar respuesta final
                //  $('#resultado').html('El resultado es: <b>' + data['res'] + '</b>');

            });
    });

    // EDITAR PLAN
    $('#edit_plan').selectize({
        plugins: ['remove_button'],
        delimiter: ',',
        persist: false,
        load: function(query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: '/modules/' + encodeURIComponent(query),
                type: 'GET',
                error: function() {
                    callback();
                },
                success: function(res) {
                    callback(res.repositories.slice(0, 10));
                }
            });
        },
        create: function(input) {
            return {
                value: input,
                text: input
            }
        }
    });

    // EDITAR PLAN
    $('#edit_planno').selectize({
        valueField: 'url',
        labelField: 'name',
        searchField: 'name',
        create: false,
        render: {
            option: function(item, escape) {
                return '<div>' +
                    '<span class="title">' +
                        '<span class="name"><i class="icon ' + (item.fork ? 'fork' : 'source') + '"></i>' + escape(item.name) + '</span>' +
                        '<span class="by">' + escape(item.username) + '</span>' +
                    '</span>' +
                    '<span class="description">' + escape(item.description) + '</span>' +
                    '<ul class="meta">' +
                        (item.language ? '<li class="language">' + escape(item.language) + '</li>' : '') +
                        '<li class="watchers"><span>' + escape(item.watchers) + '</span> watchers</li>' +
                        '<li class="forks"><span>' + escape(item.forks) + '</span> forks</li>' +
                    '</ul>' +
                '</div>';
            }
        },
        score: function(search) {
            var score = this.getScoreFunction(search);
            return function(item) {
                return score(item) * (1 + Math.min(item.watchers / 100, 1));
            };
        },
        load: function(query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: '/modules/' + encodeURIComponent(query),
                type: 'GET',
                error: function() {
                    callback();
                },
                success: function(res) {
                    callback(res.repositories.slice(0, 10));
                }
            });
        }
    });


    $(".edit_module_ws").click(function() {
        //alert('sss')
        const m_id = $(this).attr('m_id');
        const m_name = $(this).attr('m_name');
        const m_icon = $(this).attr('m_icon');
        const m_color = $(this).attr('m_color');
        const m_url = $(this).attr('m_url');
        const m_position = $(this).attr('m_position');

        $('#m_id').val(m_id);
        $('#m_name').val(m_name);
        $('#m_icon').val(m_icon);
        $('#m_color').val(m_color);
        $('#m_url').val(m_url);
        $('#m_position').val(m_position);

        // $('#dell_ws_submit').('ws_id', ws_id);
        /*  const controler = 'edit_modules';
        //var ws_id = '';
        var data = {
            m_id: m_id,
            m_name: m_name,
            m_icon: m_icon,
            m_color:m_color,
            m_url:m_url,
            m_position:m_position            
        }
        */
        //alert(m_id +'--' + m_name  +'--' + m_icon  +'--' + m_color  +'--' + m_url);
        //  send_post(controler, data);

    });


</script>

</body>

</html>