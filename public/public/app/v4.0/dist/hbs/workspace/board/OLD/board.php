<link href="<?php echo base_url(); ?>public/plugins/iCheck/square/blue.css" rel="stylesheet">

<div id="nav-bar-copiled"></div> <!--MODULE NAV BAR COPILED-->
<div class="container-fluid" id="scroller">
    <!--Kanban template-->
    <div class="content-board-group"></div>
    <!--Kanban template-->
</div>
<div class="popNewCollaborator"></div>

<script src="https://unpkg.com/web-animations-js@2.3.2/web-animations.min.js"></script>
<script src="https://unpkg.com/muuri@0.8.0/dist/muuri.min.js"></script>

<!--handlesbar --->
<script src="<?php echo base_url(); ?>public/plugins/iCheck/icheck.min.js"></script>

<!--- POPUS --->
<?php $this->load->view('or_board/or_board_group'); ?>
<?php $this->load->view('or_board/or_popup/popNewBoard'); ?>
<?php $this->load->view('or_board/or_popup/popPresupuesto'); ?>
<?php $this->load->view('or_board/or_popup/popCobrar'); ?>
<?php $this->load->view('or_board/or_popup/popEquipo'); ?>

<!--- Colaborador --->

<?php $this->load->view('users/pop/popNewCollaborator'); ?>

<script>
    //Constructor de Board , kamban, card, 
    $(document).ready(function() {
        $(function() {
            // Grab the template script
            var theTemplateScript = $("#board-group-template").html();
            // Compile the template
            var theTemplate = Handlebars.compile(theTemplateScript);
            // Define our data object Traer un array con todos los grupos y otro con las tarjetas
            var context = {
                "city": "London",
                "street": "Baker Street",
                "number": "221B"
            };
            // Pass our data to the template
            var theCompiledHtml = theTemplate(context);
            // Add the compiled html to the page
            $('.content-board-group').html(theCompiledHtml);
            var ventana_ancho = $(window).width();
            var leftPos = $('#scroller').scrollLeft();
            if (ventana_ancho >= 600) {
                var scroll_px = 350;
            } else {
                var scroll_px = 150;
            }
            if (leftPos >= 0) {
                $("#move-left").hide();
            } else {
                $("#move-left").show();
            }

            $("#move-left").click(function() {
                var leftPos = $('#scroller').scrollLeft();
                if (leftPos >= 0) {
                    $("#move-right").show();
                } else {
                    $("#move-right").hide();
                }
                $("#scroller").animate({
                    scrollLeft: leftPos - scroll_px
                }, 300);
            });

            $("#move-right").click(function() {
                var leftPos = $('#scroller').scrollLeft();
                if (leftPos < 0) {
                    $("#move-left").hide();
                } else {
                    $("#move-left").show();
                }
                $("#scroller").animate({
                    scrollLeft: leftPos + scroll_px
                }, 300);
            });
            // Logica de Muui 
            var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
            var columnGrids = [];
            var boardGrid;
            // Defina las cuadrículas de columnas para que podamos arrastrarlas
            // artículos alrededor.
            itemContainers.forEach(function(container) {
                // Instanciar cuadrícula de columna.
                var grid = new Muuri(container, {
                        items: '.board-item',
                        //card: '.s-card',
                        layoutDuration: 400,
                        layoutEasing: 'ease',
                        itemPlaceholderClass: 'board-item-placeholder',
                        dragEnabled: true,
                        dragSort: function() {
                            return columnGrids;
                        },
                        dragStartPredicate: function(item, e) {
                            // Start moving the item after the item has been dragged for one second.
                            if (e.deltaTime > 100) {
                                return true;
                            }
                        },
                        //  threshold: 90,
                        //     action: 'swap',
                        dragSortInterval: 0,
                        dragContainer: document.body,
                        dragReleaseDuration: 400,
                        dragReleaseEasing: 'ease'
                        //  dragReleaseEasing: 'ease-out'

                    })
                    //Lo que pasa cuando se inicia el movimiento
                    .on('dragStart', function(item) {
                        // Establezcamos widht / height fijo al elemento arrastrado
                        // para que no se estire involuntariamente cuando
                        // se adjunta al cuerpo del documento para
                        // duración del arrastre.
                        item.getElement().style.width = item.getWidth() + 'px';
                        item.getElement().style.height = item.getHeight() + 'px';
                    })
                    //Lo que pasa cuando el elemento fue movido a la posicion
                    .on('dragReleaseEnd', function(item) {
                        // Eliminemos el ancho / alto fijo del
                        // elemento arrastrado ahora que está de vuelta en una cuadrícula
                        // columna y puede ajustarse libremente a su
                        // alrededores.
                        item.getElement().style.width = '';
                        item.getElement().style.height = '';
                        // Por si acaso, vamos a actualizar las dimensiones de todos los elementos.
                        // en caso de que arrastrar el elemento causara que otros elementos
                        // ser de diferente tamaño.
                        columnGrids.forEach(function(grid) {
                            grid.refreshItems();
                        });
                        //traigo el id del elemto que muevo

                        // alert('Voy '+  itemB.getElement().id);
                        /*    var aId = parseInt(item.getElement().getAttribute('order'));
                var groupId = parseInt(grid.getElement().getAttribute('group-id'));

                // var position = item.getPosition();
                var position = parseInt(item.getPosition().top);
                var elem = item.getElement();

                var indice = item.getElement().fromIndex;
                alert('Id de la orden:' + aId);
                alert('Id Del grupo nuevo:' + groupId);
                alert('pixeles del grid:' + position);
                alert('indice:' + indice);

                alert(items);
*/
                    })
                    .on('layoutStart', function() {
                        // Mantengamos la cuadrícula del tablero actualizada con
                        // cambios de dimensiones de cuadrículas de columnas.
                        boardGrid.refreshItems().layout();
                    });
                grid.on('sort', function(currentOrder, previousOrder) {
                    alert(currentOrder);
                    alert(previousOrder);
                });
                // Agregue la referencia de cuadrícula de columna a las cuadrículas de columna
                // array, para que podamos acceder a él más adelante.
                columnGrids.push(grid);
                //var aId = parseInt(itemB.getElement().getAttribute());
                //  var bId = parseInt(itemA.getElement().getAttribute());
                //   alert(aId + bId);
            });
            //  Crea una instancia de la cuadrícula del tablero para que podamos arrastrarlos
            //  columnas alrededor.
            boardGrid = new Muuri('.board', {
                layoutDuration: 400,
                layoutEasing: 'ease',
                dragEnabled: false,
                dragSortInterval: 0,
                dragStartPredicate: {
                    handle: '.board-column-header'
                },
                dragReleaseDuration: 400,
                dragReleaseEasing: 'ease'
            });
        });
    });

    // Haga algo después de que se haya enviado el elemento y 
    // los procesos de 
    /*   gridA.send(0, gridB, -1, {
        layoutSender: function(isAborted, items) {
            // Haz lo tuyo aquí ...
        },
        layoutReceiver: function(isAborted, items) {
            // Haz tu otra cosa aquí ...
        }
    });

*/
    /*
        var grid = new Muuri({
            container: document.getElementsByClassName('grid')[0],
            items: [].slice.call(document.getElementsByClassName('item')),
            dragEnabled: true,
            dragPredicate: function(hammerEvent, item, resolve) {

                // Whenever the user starts to drag an item this function is called
                // on each move until the the resolve callback is executed (with the
                // hammerEvent as it's argument). When the resolve callback is
                // executed Muuri's own dragging process starts and the item starts
                // to actually move.

                // Let's do nothing if the predicate is already resolved.
                if (this.isResolved) {
                    return;
                }

                // For mouse interactions let's just start dragging immediately.
                if (hammerEvent.pointerType === 'mouse') {
                    this.isResolved = true;
                    resolve(hammerEvent);
                }
                // For other type of interactions (touch) let's wait 500ms before dragging starts.
                else {
                    if (hammerEvent.deltaTime >= 500) {
                        this.isResolved = true;
                        resolve(hammerEvent);
                    }
                }

            }
        });
    */
</script>

