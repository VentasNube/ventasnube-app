<link href="<?php echo base_url(); ?>public/plugins/iCheck/square/blue.css" rel="stylesheet">

<div class="modal fade modal-primary" id="new-board" tabindex="-1" role="dialog" aria-labelledby="presu-orden" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <!--button type="button" class="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true">×</span>
                     </button-->
                <div class="modal-nav">
                    <span class="back-arrow" data-dismiss="modal" aria-label="Close">
                        <span class="material-icons">arrow_back</span>
                    </span>
                    <span class="modal-title">
                        Configura tu nuevo tablero
                    </span>
                    <!--span class="modal-title pull-right">
                        <span class="material-icons">receipt</span>
                       
                    </span-->
                </div>
            </div>
            <form class="" action="post">
                <div id="modal-body" class="modal-body text-left col-sm-12 col-md-12 col-xs-12">
                    <!--tabs-main--->
                    <div id="new-board-step-1" class="">

                        <div class="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            <h3 class="">
                                Que tipo de actividad vas a realizar en este tablero?
                            </h3>

                            <p>
                                <input type="radio" name="board-type" class="radio-chek" id="radio-1">
                                <label for="radio-1">Comprar productos para mi catalogo a mis contactos.</label>
                            </p>
                            <p>
                                <input type="radio" name="board-type" class="radio-chek" id="radio-2">
                                <label for="radio-2">Vender productos del catalogo a mis de clientes.</label>
                            </p>
                            <p>
                                <input type="radio" name="board-type" class="radio-chek" id="radio-3">
                                <label for="radio-3">Vender productos del catalogo por mi tienda en Ventas Nube.</label>
                            </p>
                            <p>
                                <input type="radio" name="board-type" class="radio-chek" id="radio-4">
                                <label for="radio-4"> Atender a mis clientes como pacientes para ofrecer mis servicios.</label>
                            </p>
                            <p>
                                <input type="radio" name="board-type" class="radio-chek" id="radio-5">
                                <label for="radio-5"> Atender los objetos o pacientes de mis clientes, para ofrecer mis servicios.</label>
                            </p>
                        </div>
                        <div id="board-type-radio-4" class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                La especialidad?
                            </label>
                            <button type="button" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                <span bg-color="" id="bt-select-type" class="btn btn-default">
                                    Seleccionar
                                    <span class="fa fa-chevron-down"></span>
                                </span>
                            </button>
                            <ul class="dropdown-menu md">
                                <!-- Con pull-right mueve para la derecha o hizquierda el poper-->
                                <li class="header">La especialidad</li>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <li><a board-type="btn-primary" href="#" class="board-type btn-status btn btn-primary text"> <span class="material-icons">airline_seat_flat </span><small> Medica</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type btn-status btn btn-primary text"> <span class="material-icons">face </span><small> Estetica</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type btn-status btn btn-primary text"> <span class="material-icons">fitness_center </span><small> Entrenamiento</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type btn-status btn btn-primary text"> <span class="material-icons">sentiment_very_dissatisfied </span><small> Psicologica</small></a></li>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <li><a board-type="btn-primary" href="#" class="board-type btn-status btn btn-primary text"> <span class="material-icons">restaurant </span><small> Nutricional</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type btn-status btn btn-primary text"> <span class="material-icons">school </span><small> Academica</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type btn-status btn btn-primary text"> <span class="material-icons">multiline_chart </span><small> Financiera</small></a></li>
                                </div>
                            </ul>
                            <input hidden id="bg-select" class="form-control" type="hidden" name="bg-color" value="btn-primary" />
                        </div>
                        <div id="board-type-radio-5" class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Que vas a atender?
                            </label>
                            <button type="button" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                <span board-type="" id="bt-select-type-2" class="btn btn-default">
                                    Seleccionar
                                    <span class="fa fa-chevron-down"></span>
                                </span>
                            </button>
                            <ul class="dropdown-menu md">
                                <!-- Con pull-right mueve para la derecha o hizquierda el poper-->
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <li><a board-type="btn-primary" href="#" class=" board-type-2 btn-status btn btn-primary text"> <span class="material-icons">devices_other </span><small> Equipos electronicos</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">kitchen </span><small> Electro domesticos</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">drive_eta </span><small> Vehiculos</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">weekend </span><small> Muebles</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">local_laundry_service </span><small> Ropa</small></a></li>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <li><a board-type="btn-primary" href="#" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">watch </span><small> Joyas </small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">extension </span><small> Piezas</small></a></li>
                                    <li><a board-type="btn-primary" href="#" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">domain </span><small> Inmueble</small></a></li>
                                    <li><a board-type="btn-secondary" href="#" class="type-2 board-type-2 btn-status btn btn-primary text"> <span class="material-icons">airline_seat_flat </span><small> Personas</small></a></li>
                                    <li><a board-type="btn-secondary" href="#" class="type-2 board-type-2 btn-status btn btn-primary text"> <span class="material-icons">pets </span><small> Animales</small></a></li>
                                </div>
                            </ul>
                            <input hidden id="board-type" class="form-control" type="hidden" name="bg-color" value="" />
                        </div>
                        <div id="new-board-detail-1">
                            <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <label>
                                    Como lo vas a llamar?
                                </label>
                                <input id="new-board-name" class="form-control" type="text" placeholder="Compras, ventas etc.. " name="board-name" value="" />
                            </div>

                            <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <label>
                                    Selecciona un color
                                </label>
                                <button type="button" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <span id="bg-select-lis" class="btn btn-default">
                                        <span id="bg-select-icon" class="material-icons">
                                            palette
                                        </span>
                                        <span id="bg-select-text"> Seleccionar</span>
                                        <span class="fa fa-chevron-down"></span>
                                    </span>
                                </button>
                                <ul class="dropdown-menu">
                                    <!-- Con pull-right mueve para la derecha o hizquierda el poper-->
                                    <li class="header">
                                        Colores
                                    </li>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <li><a bg-color="btn-primary" href="#" class="bg-color btn-status btn btn-primary text"> <span class="material-icons">brightness_1 </span><small></small></a></li>
                                        <li><a bg-color="btn-secondary" href="#" class="bg-color btn-status btn btn-secondary text"> <span class="material-icons">brightness_1</span><small></small></a></li>
                                        <li><a bg-color="btn-dark" href="#" class="bg-color btn-status btn btn-dark text"> <span class="material-icons">brightness_1</span><small></small></a></li>
                                        <li><a bg-color="btn-yellow" href="#" class="bg-color btn-status btn btn-yellow text"> <span class="material-icons"> brightness_1</span><small></small></a></li>
                                        <li><a bg-color="btn-success" href="#" class="bg-color btn-status btn btn-success text"> <span class="material-icons">brightness_1</span><small></small></a></li>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <li><a bg-color="btn-info" href="#" class="bg-color btn-status btn btn-info text"> <span class="material-icons">brightness_1</span><small></small></a></li>
                                        <li><a bg-color="btn-danger" href="#" class="bg-color btn-status btn btn-danger text"> <span class="material-icons">brightness_1</span><small></small></a></li>
                                        <li><a bg-color="btn-gray " href="#" class="bg-color btn-status btn  btn-gray text"> <span class="material-icons">brightness_1</span><small></small></a></li>
                                        <li><a bg-color="btn-warning" href="#" class="bg-color btn-status btn btn-warning text"> <span class="material-icons">brightness_1</span><small></small></a></li>
                                        <li><a bg-color="btn-brown" href="#" class="bg-color btn-status btn btn-brown text"> <span class="material-icons">brightness_1</span><small></small></a></li>
                                    </div>
                                </ul>
                                <input hidden id="bg-select" class="form-control" type="hidden" name="bg-color" value="btn-primary" />
                            </div>

                        </div>
                    </div>

                    <div id="new-board-step-objects" class="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <h4>Edita la informacion que pides de los equipos</h4>

                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Tipo
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Tipo " name="or-type" value="Tipo" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Marca
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Marca" name="or-trade" value="Marca" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Modelo
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Modelo" name="or-model" value="Modelo" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Color
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Color" name="or-color" value="Color" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Numero de serie
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Numero de serie" name="or-serial" value="Numero de serie" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Fecha de fabricacion
                            </label>
                            <input class="form-control" type="text" placeholder="Fecha de fabricacion " name="or-type-time" value="" />
                        </div>
                    </div>
                    <div id="new-board-step-patients" class="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h4>Editar la informacion que le pides a los pacientes</h4>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Tipo
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Tipo " name="or-type" value="" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Nombre y apellido
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Marca" name="or-trade" value="" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Raza
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Modelo" name="or-model" value="" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Especie
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Modelo" name="or-model" value="" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                color
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Modelo" name="or-model" value="" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                sexo
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Modelo" name="or-model" value="" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Documento
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Numero de serie" or-serial" value="" />
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>
                                Fecha de Nacimiento
                            </label>
                            <input id="" class="form-control" type="text" placeholder="Compras, ventas etc.. " name="or-type-time" value="" />
                        </div>
                    </div>

                </div>
                <div class="modal-footer col-sm-12 col-md-12 col-xs-12">
                    <button type="button" class="btn btn-default ">
                        <span class="">Cancelar</span>
                    </button>
                    <button id="btn-previous" type="button" class="btn btn-default  ">
                        <span class="">Volver</span>
                    </button>
                    <button disabled id="btn-next" type="submit" class="btn btn-primary ">
                        <span class="">Continuar</span>
                    </button>
                    <!--button id="modal-submit" type="button md rot" class="btn btn-primary"><span class="material-icons">monetization_on</span> Guradar</button-->
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Maskmoney.js -->
<script src="<?php echo base_url(); ?>public/plugins/iCheck/icheck.min.js"></script>

<script>
    // selecciona el primer elemento <a> con la clase 'external'

    $(document).ready(function() {
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            handle: '',
            increaseArea: '20%' // optional
        });
        $("#new-board-detail-1").hide();
        $("#new-board-step-2").hide();
        $("#board-type-radio-4").hide();
        $("#board-type-radio-5").hide();

        $("#new-board-step-objects").hide();
        $("#new-board-step-patients").hide();

    });


    $('input').on('ifChecked', function(event) {
        var select = $(this);
        var id = select.attr('id');
        $("#new-board-detail-1").show();
        $("#new-board-name").focus();

        if (id == 'radio-4') {
            $("#board-type-radio-4").show();
         //   $("#new-board-step-patients").show();
        } else {
            $("#board-type-radio-4").hide();
            $("#board-type-radio-5").hide();
            $("#new-board-step-objects").hide();
         //   $("#new-board-step-patients").hide();
        }
        if (id == 'radio-5') {
            $("#board-type-radio-5").show();
        } else {
            $("#new-board-step-objects").hide();
            $("#board-type-radio-5").hide();
        }
    });

    /*  if (bgColor == "btn-primary") {
              $("#new-board-step-objects").show();
              $("#new-board-step-patients").hide();
          }else{
              $("#new-board-step-patients").show();
              $("#new-board-step-objects").hide();
          }*/


    $(".board-type-2").click(function() {
        var bgColor = $(this).attr('board-type');
        var bgText = $(this).html();
        var icon =  $(this).children(':first').text();
        $("#bt-select-type-2").html(bgText);
        $("#bg-select-icon").html(icon);
        $("#bt-select-type-2").removeClass();
        $("#bt-select-type-2").addClass('btn ' + bgColor + ' line');
        $("#bt-select-type-2").val(bgColor);
        if (bgColor == "btn-primary") {
            $("#new-board-step-objects").show();
            $("#new-board-step-patients").hide();
        } else {
            $("#new-board-step-patients").show();
            $("#new-board-step-objects").hide();
        }
    });

    $(".board-type").click(function() {
        var bgColor = $(this).attr('board-type');
        var bgText = $(this).html();
        var icon =  $(this).children(':first').text();
        $("#bt-select-type").html(bgText);
        $("#bt-select-type").removeClass();

        $("#bt-select-type").addClass('btn ' + bgColor + ' line');
        $("#bt-select-type").val(bgColor);
        $("#bg-select-icon").html(icon);
    });

    $(".bg-color").click(function() {
        var bgColor = $(this).attr('bg-color');
        // var bgText = $(this).html();
        // $("#bg-select-lis").html(bgText);
        $("#bg-select-lis").removeClass();
        $("#bg-select-lis").addClass('btn ' + bgColor + ' line');
        $("#bg-select").val(bgColor);
    });

    $("#new-board-name").keyup(function() {
        var name = $(this).val();
        //var bgText = $(this).html();
        $("#bg-select-text").html(name);
        // $("#bt-select-type").removeClass();
        //$("#bt-select-type").addClass('btn ' + bgColor + ' line');
        // $("#bt-select-type").val(bgColor);
    });




    $(".item-select").click(function() {
        var bgColor = $(this).attr('item-select');
        var bgText = $(this).html();
        $("#btn-select-3").html(bgText);
        $("#btn-select-3").removeClass();
        $("#btn-select-3").addClass('btn ' + bgColor + ' line');
        $("#input-select-3").val(bgColor);
    });



    $("#btn-next").click(function() {


    });
    $(".equip-btn").click(function() {
        //  $('#searchBox').fadeOut();
        var aparatoid = $(this).attr('or-id');
        //  console.log(orId);
        $('#equip-or').modal('show');
        // $('body').removeClass('search-active');
        $.get("<?php echo base_url(); ?>os/getequiposID", "callback=" + aparatoid + "",
            function(data) {
                var registros = eval(data);
                for (var i = 0; i < registros.length; i++) {
                    var tipo = registros[i]["tipo"];
                    var marca = registros[i]["marca"];
                    var modelo = registros[i]["modelo"];
                    var n_serie = registros[i]["n_serie"];
                    $("#tiposele").val(tipo);
                    $("#marcasele").val(marca);
                    $("#modelosele").val(modelo);
                    $("#n_serialsele").val(n_serie);
                    // Datos de equipo en la Os
                    $("#modeloOs").val(modelo);
                    $("#marcaOs").val(marca);
                    $("#n_serieOs").val(n_serie);
                    $("#tipoEOs").val(tipo);
                };
            }
        );


    });


    $("#searchInput").autocomplete({
        source: "<?php echo base_url(); ?>home/autoCompleteCliente",
        minLength: 1,
        select: function(event, ui) {
            $("#searchInput").val(ui.item.nombre);
        }
    });


    /* GUIA REFERENCIA
        :first - $('.menu-item-text:first').text("Primer Inicio");
        :eq() - $('.menu-item-text:eq(0)').text("Primer Inicio");
        :lt() - $('.menu-item-text:lt(1)').text("Primer Inicio");
        .filter() - $('.menu-item-text').filter(':first').text("Primer Inicio");
        .children() - $('ul a').children(':first').text("Primer Inicio");
        .first() - $('ul a span').first().text("Primer Inicio");
    .

    */
</script>