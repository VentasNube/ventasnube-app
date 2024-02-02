<script id="user-auto-subjet-template" type="text/x-handlebars-template">
    {{#each users}}
        <li class="select-autosubjet-item" item="{{{users_id}}}">
            <div class="round-icon user md" data-toggle="tooltip" data-placement="bottom" data-original-title="{{{name}}}">{{{trimString name}}}</div>
            <span>{{{email}}}</span>
        </li>
    {{/each}}
</script>
<script id="popNewCollaborator-template" type="text/x-handlebars-template">
    <div class="modal fade modal-primary" id="popNewCollaborator" tabindex="-1" role="dialog" aria-hidden="false"  data-backdrop="static" data-keyboard="false" aria-labelledby="modalCliente">
        <div class="modal-dialog modal-lg" role="document">
            <form id="formNewCollaborator" action="" method="post">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-nav">
                            <span class="back-arrow" data-dismiss="modal" aria-label="Close">
                                <span class="material-icons">arrow_back</span>
                            </span>
                            <span class="modal-title">
                                Agregar colaborador
                            </span>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="margin-t-20 padding-0 col-lg-8 col-md-8 col-sm-8 col-xs-7">
                            <div class="input-group text-left">
                                <span class="input-group-addon"><i class="material-icons">group_add</i></span>
                                    <li id="bag-new-user" userId="1" class="badge md gray">
                                        <div class="round-icon user md" role="button"  data-toggle="tooltip" data-placement="top"  data-original-title="{{name}}">M </div>
                                        <span></span> 
                                        <button id="btn-del-new-coll" type="button" class="btn md btn-round btn-default text" data-toggle="dropdown" aria-expanded="true">  
                                                <span class="material-icons">cancel</span>
                                        </button> 
                                    </li>    
                                <input type="email" class="form-control userSubjet" value="" name="userSubjet" placeholder="Buscar Correo electronico...">
                                <div id="user-auto-subjet" class="auto-subjet">
                                    <ul class="ul-auto-subjet">
                                    
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="margin-t-20  col-lg-4 col-md-4 col-sm-4 col-xs-5 text-left">
                            <div  class="btn-group">
                                <button id="per-select-btn" permId="1" type="button" class=" select-btn btn xl btn-more  dropdown-toggle btn-primary text" data-toggle="dropdown" aria-expanded="true">
                                    <span>Editor</span> 
                                    <i class="material-icons">arrow_drop_down</i>
                                </button>
                                <ul class="dropdown-menu pull-right">
                                    {{#each permissions}}
                                        <li class="margin-5"><a class="select-per" selected="{{p_id}}" href="#" role="button"  data-toggle="tooltip" data-placement="top" data-original-title="{{p_description}}"> <span></span> {{{p_name}}} </a></li>
                                    {{/each}}
                                </ul>                   
                            </div>
                        </div>
                    
                        <div class="margin-t-20 padding-0 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <ul class="text-left  padding-10">
                                    {{#each collaborators}}
                                    <li class="badge md gray margin-10">
                                        <div class="round-icon user md" role="button"  data-toggle="tooltip" data-placement="top"  data-original-title="{{name}}">M </div>
                                        <span>{{{email}}}</span> 
                                        <div class="select-btn btn-group">
                                            <button type="button" class=" btn xs btn-more  dropdown-toggle btn-primary text" data-toggle="dropdown" aria-expanded="true">                              
                                                <span> {{{p_name}}}</span> 
                                                <span class="material-icons">expand_more</span>
                                            </button>   
                                            <ul class="dropdown-menu pull-right">
                                                {{#each ../permissions}}
                                                <li class="margin-5"><a class="select-per" selected="{{p_id}}" href="#" role="button"  data-toggle="tooltip" data-placement="top" data-original-title="{{p_description}}"> <span></span> {{{p_name}}} </a></li>                                
                                                {{/each}}
                                                <li role="separator" class="divider"></li>
                                                <li class="margin-5"><a class="del-per" selected="delete" href="#" role="button"  data-toggle="tooltip" data-placement="top" data-original-title="Eliminar colaborador"> <span></span> Eliminar</a></li>                            
                                            </ul>                   
                                        </div>
                                    </li>                                    
                                    {{/each}}
                            </ul>                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer col-sm-12 col-md-12 col-xs-12">
                    <button type="button" class="btn  btn-default " data-dismiss="modal">Cancelar</button>
                    <button id="save-new-coll" type="submit" class="btn btn-primary ">Enviar</button>
                </div>
            </form>
        </div>
    </div>
</script>

<script>
    // Constructor PopNewCollaborator
    $(document).ready(function() {
      $(document).on('click', 'a.buttonNewCollaborator', function(event) {
            var moduleName = $(this).attr('moduleName');
            var url_m_t_name = getParameterByName('type');
            var m_id = getParameterByName('m');
            var m_t_id  = getParameterByName('t');
            //alert(moduleName);
            $.ajax({
                url: "<?php echo base_url(); ?>users/collaborators",
                type: "POST",
                dataType: "json",
                data: {
                    moduleName: url_m_t_name,
                    moduleType: m_t_id,
                  //  moduleSeccion:moduleSeccion,
                },
                success: function(response) {
                    if (response.result == true) {
                        // Grab the template script
                        //Helper que imprime el primer caracter igual a substring php
                        Handlebars.registerHelper('trimString', function(passedString) {
                            var theString = passedString.substring(0, 1);
                            return new Handlebars.SafeString(theString)
                        });
                        Handlebars.registerHelper("if", function(conditional, options) {
                            if (conditional) {
                                return options.fn(this);
                            } else {
                                return options.inverse(this);
                            }
                        });
                        ///// COPILADOR ////
                        var theTemplateScript = $("#popNewCollaborator-template").html(); //Trae el template en html                   
                        var theTemplate = Handlebars.compile(theTemplateScript); //Compila el template html
                        var theCompiledHtml = theTemplate(response); //Trae los datos de ajax y los llevo al template
                        ///// IMPRIME ////
                        $('.popNewCollaborator').html(theCompiledHtml); //imprime el resultado  copilado en el template a un div   

                        ///// HIDDEN ALL POPUPS ////
                        $("#popNewCollaborator").modal("show");
                        $("#per-select-btn").hide();
                        $("#bag-new-user").hide();

                        // Es el ato subjet de los usuarios tendria que tenes un permiso especial para verse lo Agregue al controlador solo Administradores de ese modulo, o el Propietario
                        $(".userSubjet").keyup(function() {
                            var search = $(this).val();
                            $.ajax({
                                url: "<?php echo base_url(); ?>users/autosubjet",
                                type: "POST",
                                dataType: "json",
                                data: {
                                    search: search,
                                },
                                success: function(users) {
                                    if (users == null) {
                                        $(".userSubjet").next().hide();
                                    } else {
                                        $(".userSubjet").next().show();
                                        var theTemplateScript2 = $("#user-auto-subjet-template").html(); //Trae el template en html                   
                                        var theTemplate = Handlebars.compile(theTemplateScript2); //Compila el template html
                                        var response = response; //Trae los datos de ajax a la variable data
                                        var theCompiledHtml2 = theTemplate(users); //Trae los datos de ajax
                                        $('.ul-auto-subjet').html(theCompiledHtml2); //imprime el resultado  copilado en el div   
                                    }
                                }
                            })
                        })

                        //oculta al hacer click fuera del elemnto autosubjet (items autosubjet)
                        $(document).on("click", function(e) {
                            var container = $("#user-auto-subjet");
                            if (!container.is(e.target) && container.has(e.target).length === 0) {
                                //Se ha pulsado en cualquier lado fuera de los elementos contenidos en la variable container
                                container.hide();
                            }
                        });

                        //Ato subjet de emails carga las variable con los valores para enviar por ajax
                        $(document).on('click', 'li.select-autosubjet-item', function(event) {
                            var item = $(this).attr('item');
                            var name = $(this).children('span').text();
                            var lerter = $(this).children('div').text();
                            var input = $(":input.userSubjet").val();
                            $("#user-auto-subjet").hide();
                            $(":input.userSubjet").val(name);
                            $("#per-select-btn").show();
                            $(":input.userSubjet").hide();
                            $("#bag-new-user").show();
                            $("#bag-new-user").children('div').text(lerter);
                            $("#bag-new-user").children('span').text(name);
                            Snackbar.show({
                                text: 'Muy bien! vamos a enviar un email al nuevo colaborador para crear su cuenta!',
                                pos: 'top-center',
                                actionText: 'ok',
                                onActionClick: function(element) {
                                    //Set opacity of element to 0 to close Snackbar
                                    $(element).css('opacity', 0);
                                }
                            });
                        });

                        //Boton select de permisos
                        $(".select-per").click(function() {
                            var permId = $(this).attr('selected', '');
                            alert(permId);
                            var text = $(this).text();
                            $('button span', $(this).closest('div')).text(text); // Edita el contenido del boton superior hermano
                            $('button', $(this).closest('div')).attr("permId", permId); //Guardo el id del permiso en el boton para poder cargarlo en una variable
                        });

                        //Boton que elimina los emails seleccionados
                        $("#btn-del-new-coll").click(function() {
                            $("#bag-new-user").hide();
                            $("#per-select-btn").hide();
                            $(":input.userSubjet").show().val();
                            //  $('button span', $(this).closest('div')).text(); // Edita el contenido del boton superior hermano
                        });

                        //Funcion que toma el focus out del input y los datos ingresados y si el email es es valido
                        $(".userSubjet").focusout(function() {
                            var name = $(":input.userSubjet").val();
                            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                            if (regex.test(name.trim())) {
                                $(":input.userSubjet").hide();
                                $("#bag-new-user").show();
                                $("#bag-new-user").children('span').text(name);
                                $("#per-select-btn").show();
                                Snackbar.show({
                                    text: 'Muy bien! vamos a enviar un email al nuevo colaborador para crear su cuenta!',
                                    pos: 'top-center'
                                });
                            } else {
                                Snackbar.show({
                                    text: 'Ingresa un email valido para invitar un nuevo colaborador. ',
                                    pos: 'top-center',
                                    actionTextColor: '#ff0000',
                                    actionText: 'ok',
                                    onActionClick: function(element) {
                                        $(element).css('opacity', 0); //Set opacity of element to 0 to close Snackbar

                                    }
                                });
                            }
                        });

                        // this is the id of the form
                        $("#formNewCollaborator").submit(function(e) {
                            e.preventDefault(); // avoid to execute the actual submit of the form.
                            // $('#save-new-coll').html('<i class="fa fa-spinner fa-spin"></i>').attr('disabled', 'disabled');                        
                            //  var form = $(this);
                            var array = {
                                userId: 3,
                                permission: 3,
                                module: 1,
                                module_type: 0,
                                module_seccion: 0,
                            }
                            //var url = form.attr('action');
                            var url = "<?php echo base_url(); ?>users/newColl";
                            $.ajax({
                                type: "POST",
                                url: url,
                                data: array,
                                success: function(data) {
                                    alert(data); // show response from the php script.
                                }
                            });
                        });

                    } else {
                                    //  $('#popNewUser').modal('hide');
                                    Snackbar.show({
                                        text: response.msj,
                                        actionText: 'ok',
                                        actionTextColor: "#0575e6",
                                    });

                    };
                }
            })
      });
    });
</script>