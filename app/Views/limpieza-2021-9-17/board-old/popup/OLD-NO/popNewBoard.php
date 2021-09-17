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
                    <div>
                        <div class="text-left col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h3 class="">
                                Que tipo de actividad vas a realizar en este tablero?
                            </h3>
                            <div class="margin-l-10">
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
                        </div>
                        <div id="new-board-step-1">

                            <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <label>
                                    Como lo vas a llamar?
                                </label>
                                <input id="new-board-name" class="form-control" type="text" placeholder="Compras, ventas etc.. " name="board-name" value="" />
                            </div>
                            <div id="board-type-icon" class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <label>
                                    Elije un icono
                                </label>
                                <button type="button" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <span bg-color="" id="bt-text-icon" class="btn btn-default">
                                        Seleccionar
                                        <span class="fa fa-chevron-down"></span>
                                    </span>
                                </button>
                                <ul class="dropdown-menu mini">
                                    <!-- Con pull-right mueve para la derecha o hizquierda el poper-->
                                    <li class="header">Iconos</li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">local_shipping </span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">local_atm </span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">add_shopping_cart </span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">store </span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">shopping_basket </span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">shopping_cart</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">dashboard</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">monetization_on</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">headset_mic</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">flight_land</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">local_activity</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">directions_bike</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">directions_car</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">restaurant</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">airport_shuttle</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">room_service</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">business_center</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">whatshot</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">cake</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">hot_tub</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">child_friendly</span></li>
                                    <li board-icon="btn-primary" class="board-icon btn-status btn btn-primary text"><span class="material-icons">child_care</span></li>
                                </ul>
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
                                        <li board-type="btn-primary" class="board-type btn-status btn btn-primary text"> <span class="material-icons">airline_seat_flat </span><small> Medica</small></li>
                                        <li board-type="btn-primary" class="board-type btn-status btn btn-primary text"> <span class="material-icons">face </span><small> Estetica</small></a></li>
                                        <li board-type="btn-primary" class="board-type btn-status btn btn-primary text"> <span class="material-icons">fitness_center </span><small> Entrenamiento</small></li>
                                        <li board-type="btn-primary" class="board-type btn-status btn btn-primary text"> <span class="material-icons">sentiment_very_dissatisfied </span><small> Psicologica</small></li>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <li board-type="btn-primary" class="board-type btn-status btn btn-primary text"> <span class="material-icons">restaurant </span><small> Nutricional</small></li>
                                        <li board-type="btn-primary" class="board-type btn-status btn btn-primary text"> <span class="material-icons">school </span><small> Academica</small></li>
                                        <li board-type="btn-primary" class="board-type btn-status btn btn-primary text"> <span class="material-icons">multiline_chart </span><small> Financiera</small></li>
                                    </div>
                                </ul>
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
                                        <li board-type="btn-primary" class=" board-type-2 btn-status btn btn-primary text"> <span class="material-icons">devices_other </span><small> Electronicos</small></li>
                                        <li board-type="btn-primary" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">kitchen </span><small> Electrodomesticos</small></li>
                                        <li board-type="btn-primary" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">drive_eta </span><small> Vehiculos</small></li>
                                        <li board-type="btn-primary" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">weekend </span><small> Muebles</small></li>
                                        <li board-type="btn-primary" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">local_laundry_service </span><small> Ropa</small></li>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <li board-type="btn-primary" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">watch </span><small> Joyas </small></li>
                                        <li board-type="btn-primary" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">extension </span><small> Piezas</small></li>
                                        <li board-type="btn-primary" class="board-type-2 btn-status btn btn-primary text"> <span class="material-icons">domain </span><small> Inmueble</small></li>
                                        <li board-type="btn-secondary" class="type-2 board-type-2 btn-status btn btn-secondary text"> <span class="material-icons">airline_seat_flat </span><small> Personas</small></li>
                                        <li board-type="btn-secondary" class="type-2 board-type-2 btn-status btn btn-secondary text"> <span class="material-icons">pets </span><small> Animales</small></li>
                                    </div>
                                </ul>
                                <input hidden id="board-type" class="form-control" type="hidden" name="bg-color" value="" />
                            </div>
                            <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <label>
                                    Selecciona un color
                                </label>
                                <button type="button" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <span id="bg-select-lis" class="btn btn-default">
                                        <span id="bg-select-color" class="material-icons">
                                            palette
                                        </span>
                                        <span id="bg-select-text"> Seleccionar</span>
                                        <span class="fa fa-chevron-down"></span>
                                    </span>
                                </button>
                                <ul class="dropdown-menu mini">
                                    <!-- Con pull-right mueve para la derecha o hizquierda el poper-->
                                    <li class="header">
                                        Colores
                                    </li>
                                    <li bg-color="btn-primary" class="bg-color btn-status btn btn-primary"><span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-secondary" class="bg-color btn-status btn btn-secondary "><span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-dark" class="bg-color btn-status btn btn-dark"> <span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-yellow" class="bg-color btn-status btn btn-yellow "> <span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-success" class="bg-color btn-status btn btn-success"> <span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-info" class="bg-color btn-status btn btn-info "> <span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-danger" class="bg-color btn-status btn btn-danger"> <span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-gray " class="bg-color btn-status btn  btn-gray "> <span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-warning" class="bg-color btn-status btn btn-warning "> <span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-brown" class="bg-color btn-status btn btn-brown"> <span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-green-dark" class="bg-color btn-status btn btn-green-dark"> <span class="material-icons">panorama_fish_eye</span></li>
                                    <li bg-color="btn-fuchsia" class="bg-color btn-status btn btn-fuchsia"> <span class="material-icons">panorama_fish_eye</span></li>

                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer col-sm-12 col-md-12 col-xs-12">
                    <button type="button" class="btn btn-default ">
                        <span class="">Cancelar</span>
                    </button>
                    <button id="btn-next" type="submit" class="btn btn-primary ">
                        <span class="">Crear</span>
                    </button>
                    <!--button id="modal-submit" type="button md rot" class="btn btn-primary"><span class="material-icons">monetization_on</span> Guradar</button-->
                </div>

                <input hidden id="or_board_finality" class="form-control" type="hidden" name="or_board_finality" value="btn-primary" />

                <input hidden id="or_board_type" class="form-control" type="hidden" name="or_board_type" value="btn-primary" />
                <input hidden id="or_board_color" class="form-control" type="hidden" name="or_board_color" value="btn-primary" />

                <input hidden id="or_board_mode" class="form-control" type="hidden" name="or_board_mode" value="btn-primary" />
                <input hidden id="or_board_finality" class="form-control" type="hidden" name="or_board_finality" value="btn-primary" />
                <input hidden id="or_board_delivery_place" class="form-control" type="hidden" name="or_board_delivery_place" value="btn-primary" />
                <input hidden id="or_board_ collect_and_deliver" class="form-control" type="hidden" name="or_board_ collect_and_deliver" value="btn-primary" />



            </form>
        </div>
    </div>
</div>
<script src="<?php echo base_url(); ?>public/plugins/iCheck/icheck.min.js"></script>

<script>    
    // selecciona el primer elemento <a> con la clase 'external'

    $(document).ready(function() {
        $('#save_all').click(function() {
            $("#loading").show();
            //var checkbox = $('.delete_checkbox:checked');
            var checkbox = $('.select');
            if (checkbox.length > 0) {
                var id_value = [];
                var stock_value = [];
                var stock_minimo = [];
                var precoCompra = [];
                var precoVenda = [];
                var lista_1 = [];
                var lista_2 = [];
                var precoVendaP = [];
                var lista_1P = [];
                var lista_2P = [];
                var precoVendaA = [];
                var lista_1A = [];
                var lista_2A = [];
                var usuario = [];
                $(checkbox).each(function() {
                    id_value.push($(this).attr('idProd'));
                    stock_value.push($("input[name='estoque']", $(this).parents('tr')).val());
                    precoCompra.push($("input[name='precoCompra']", $(this).parents('tr')).val());
                    precoVenda.push($("input[name='precoVenda']", $(this).parents('tr')).val());
                    lista_1.push($("input[name='lista_1']", $(this).parents('tr')).val());
                    lista_2.push($("input[name='lista_2']", $(this).parents('tr')).val());
                    precoVendaP.push($("input[name='precoVendaP']", $(this).parents('tr')).val());
                    lista_1P.push($("input[name='lista_1P']", $(this).parents('tr')).val());
                    lista_2P.push($("input[name='lista_2P']", $(this).parents('tr')).val());
                    precoVendaA.push($("input[name='precoVendaA']", $(this).parents('tr')).val());
                    lista_1A.push($("input[name='lista_1A']", $(this).parents('tr')).val());
                    lista_2A.push($("input[name='lista_2A']", $(this).parents('tr')).val());
                    usuario.push($("input[name='user']", $(this).parents('tr')).val());
                    stock_minimo.push($("input[name='estoqueMinimo']", $(this).parents('tr')).val());
                });
                //   console.log(stock_value);
                $.ajax({
                    url: "<?php echo base_url(); ?>catalogo/save_all",
                    method: "POST",
                    data: {
                        id_value: id_value,
                        stock_value: stock_value,
                        precoCompra: precoCompra,
                        precoVenda: precoVenda,
                        lista_1: lista_1,
                        lista_2: lista_2,
                        precoVendaP: precoVendaP,
                        lista_1P: lista_1P,
                        lista_2P: lista_2P,
                        precoVendaA: precoVendaA,
                        lista_1A: lista_1A,
                        lista_2A: lista_2A,
                        usuario: usuario,
                        stock_minimo: stock_minimo,
                    },
                    success: function() {
                        $to = "";
                        $("#loading").hide();
                        $to += "<div class='alert-toast alert alert-success alert-dismissible'>";
                        $to += "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>";
                        $to += "<h4><i class='icon fa fa-check'></i> Listo!</h4>";
                        $to += "Se guardaron los cambios de " + $(id_value).length + " productos con exito!";
                        $to += "</div>";
                        $("#toast").html($to);
                    }
                })
            } else {
                $("#loading").hide();
                alert('No se guardaron los cambios');
            }
        });
    });

    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        handle: '',
        increaseArea: '20%' // optional
    });

    $("#new-board-step-1").hide();
    $("#board-type-radio-4").hide();
    $("#board-type-radio-5").hide();
    $("#board-type-icon").hide();

    $('input').on('ifChecked', function(event) {
        var select = $(this);
        var id = select.attr('id');
        $("#new-board-detail-1").show();
        $("#new-board-name").focus();
        if (id == 'radio-1' || id == 'radio-2' || id == 'radio-3') {
            $("#board-type-icon").show();
            $("#new-board-step-1").show();

        } else {
            $("#board-type-radio-4").hide();
            $("#board-type-radio-5").hide();
        }
        if (id == 'radio-4') {
            $("#new-board-step-1").show();
            $("#board-type-radio-4").show();
            $("#board-type-icon").hide();
        } else {
            $("#board-type-radio-4").hide();
            $("#board-type-radio-5").hide();
        }
        if (id == 'radio-5') {
            $("#new-board-step-1").show();
            $("#board-type-radio-5").show();
            $("#board-type-icon").hide();
        } else {
            $("#board-type-radio-5").hide();
        }
    });

    $(".board-icon").click(function() {
        var bgColor = $(this).attr('board-icon');
        var bgText = $(this).html();
        var icon = $(this).children(':first').text();
        $("#bt-text-icon").html(bgText);
        $("#bt-text-icon").removeClass();
        $("#bt-text-icon").addClass('btn round  ' + bgColor + ' line');
        $("#bg-select-color").html(icon);
        $("#input-select-icon").val(bgColor);
    });

    $(".board-type").click(function() {
        var bgColor = $(this).attr('board-type');
        var bgText = $(this).html();
        var icon = $(this).children(':first').text();
        $("#bt-select-type").html(bgText);
        $("#bg-select-icon").html(icon);
        $("#bg-select-color").html(icon);
        $("#bt-select-type").removeClass();
        $("#bt-select-type").addClass('btn ' + bgColor + ' line');
        $("#bt-select-type").val(bgColor);
        if (bgColor == "btn-primary") {
            $("#new-board-step-objects").show();
            $("#new-board-step-patients").hide();
        } else {
            $("#new-board-step-patients").show();
            $("#new-board-step-objects").hide();
        }
    });

    $(".board-type-2").click(function() {
        var bgColor = $(this).attr('board-type');
        var bgText = $(this).html();
        var icon = $(this).children(':first').text();
        $("#bt-select-type-2").html(bgText);
        $("#bg-select-icon").html(icon);
        $("#bg-select-color").html(icon);
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

    $("li.bg-color")
        .click(function() {
            var bgColor = $(this).attr('bg-color');
            $("#bg-select-lis").removeClass();
            $("#bg-select-lis").addClass('btn ' + bgColor + ' line');
            $("#bg-select").val(bgColor);
        })
        .mouseout(function() {
            $("span", this).first().text("panorama_fish_eye");
            // $("p", this).last().text(++i);
        })
        .mouseover(function() {
            $("span", this).first().text("check_circle");
        });


    /*  $("a.board-icon")
        .click(function() {
            var bgColor = $(this).attr('bg-color');
            // var bgText = $(this).html();
            // $("#bg-select-lis").html(bgText);
            //  $( "p", this ).first().text( "mouse out" );
            $("#bg-select-lis").removeClass();
            $("#bg-select-lis").addClass('btn ' + bgColor + ' line');
            $("#bg-select").val(bgColor);
            // $("span").find().text("brightness_1");
            //  $("span", this).first().text("check_circle");
            //  $('span:contains("brightness_1")').first().text('Lo encontro');
        })
*/


    $("#new-board-name").keyup(function() {
        var name = $(this).val();
        $("#bg-select-text").html(name);
    });

    $(".item-select").click(function() {
        var bgColor = $(this).attr('item-select');
        var bgText = $(this).html();
        $("#btn-select-3").html(bgText);
        $("#btn-select-3").removeClass();
        $("#btn-select-3").addClass('btn ' + bgColor + ' line');
        $("#input-select-3").val(bgColor);
    });

    $("#btn-next").click(function() {});

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
    */
</script>