<script id="board-group-template" type="text/x-handlebars-template">
    <div class="row board-group ">
        <div class=" row board">
            <div class="board-column">
                <div class="board-column-header bg-primary ">
                    <div class="board-column-header-tittle"> <span data-toggle="tooltip" data-placement="right" data-original-title="Cantidad de Ordenes">10</span> Nuevo</div>
                    <div class="board-column-header-button">
                        <div class="btn-group ">
                            <button type="button" class="btn btn-round xl text-white dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                <span class="material-icons">more_horiz</span>
                            </button>
                            <ul class="dropdown-menu pull-right">
                                <li><a href="#cajaRetiro" data-toggle="modal" role="button" title="Retirar efectivo"><i class="material-icons">settings</i> Editar grupo</a></li>
                                <li class="divider"></li>
                                <li><a href="#" data-toggle="modal" role="button"><i class="material-icons">picture_as_pdf</i> Descargar listado</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="board-column-content-wrapper">
                    <div class="board-column-content" group-id="1">
                    </div>
                    <div class="board-new-item">
                        <div class="icon">
                            <span class="material-icons">
                                add_circle_outline
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- -->
            <div class="board-column">
                <div class="board-column-header bg-danger">
                    <div class="board-column-header-tittle"> <span data-toggle="tooltip" data-placement="right" data-original-title="Cantidad de Ordenes">10</span> En proceso</div>
                    <div class="board-column-header-button">
                        <div class="btn-group ">
                            <button type="button" class="btn btn-round xl text-white dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                <span class="material-icons">more_horiz</span>
                            </button>
                            <ul class="dropdown-menu pull-right">
                                <li><a href="#cajaRetiro" data-toggle="modal" role="button" title="Retirar efectivo"><i class="material-icons">settings</i> Editar grupo</a></li>
                                <li class="divider"></li>
                                <li><a href="#" data-toggle="modal" role="button"><i class="material-icons">picture_as_pdf</i> Descargar listado</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="board-column-content-wrapper">
                    <div class="board-column-content" group-id="2">
                    </div>
                    <div class="board-new-item">
                        <div class="icon">
                            <span class="material-icons">
                                add_circle_outline
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- -->
            <div class="board-column">
                <div class="board-column-header bg-secondary">
                    <div class="board-column-header-tittle"> <span data-toggle="tooltip" data-placement="right" data-original-title="Cantidad de Ordenes">10</span> Para entregar</div>
                    <div class="board-column-header-button">
                        <div class="btn-group ">
                            <button type="button" class="btn btn-round xl text-white dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                <span class="material-icons">more_horiz</span>
                            </button>
                            <ul class="dropdown-menu pull-right">
                                <li><a href="#cajaRetiro" data-toggle="modal" role="button" title="Retirar efectivo"><i class="material-icons">settings</i> Editar grupo</a></li>
                                <li class="divider"></li>
                                <li><a href="#" data-toggle="modal" role="button"><i class="material-icons">picture_as_pdf</i> Descargar listado</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="board-column-content-wrapper">
                    <div class="board-column-content" group-id="3">
                        <?php $this->load->view('or_board/or_card/card-order-2'); ?>
                    </div>
                    <div class="board-new-item">
                        <div class="icon">
                            <span class="material-icons">
                                add_circle_outline
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- -->
        </div>
        <div id="move-left" class="btn btn-default fixed-center l">
            <i class="fas fa-chevron-circle-left"></i>
        </div>
        <div id="move-right" class="btn btn-default fixed-center r">
            <i class="fas fa-chevron-circle-right"></i>
        </div>
    </div>
</script>