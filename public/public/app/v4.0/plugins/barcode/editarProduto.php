<link href="<?php echo base_url(); ?>public/plugins/upload/css/jasny-bootstrap.min.css" rel="stylesheet" media="screen">
<link href="<?php echo base_url(); ?>public/plugins/upload/css/custom.css" rel="stylesheet" media="screen">
<?php
if ($custom_error != '') {
    echo '<div class="alert-toast alert alert-danger alert-dismissible"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> <h4><i class="icon fa fa-ban"></i> Error!</h4>' . $custom_error . '</div>';
?>
<script type="text/javascript" src="<?php echo base_url(); ?>public/plugins/barcode/jquery-barcode.js"></script>
    <script type="text/javascript">
    
      function generateBarcode(){
      // var value = $("#barcodeValue").val();	   
	    var value = ('<?php echo $result->barcode; ?>');
        var btype = ('code128');
        var renderer = ('canvas');			
        var settings = {
          output:renderer,
          bgColor: ("#FFFFFF"),
          color: ("#000000"),
          barWidth: ("1"),
          barHeight: ("50"),
          moduleSize: ("5"),
          posX: ("10"),
          posY: ("20"),
          addQuietZone: $("#quietZoneSize").val()
        };
		 value = {code:value, rect: true};
        /*if ($("#rectangular").is(':checked') || $("#rectangular").attr('checked')){
         
        }*/
        if (renderer == 'canvas'){
          clearCanvas();
          $("#barcodeTarget").hide();
          $(".canvasTarget").show().barcode(value, btype, settings);
        } else {
          $("#canvasTarget").hide();
          $("#barcodeTarget").html("").show().barcode(value, btype, settings);
        }
		 
      }      
      function clearCanvas(){
        var canvas = $('.canvasTarget').get(0);
        var ctx = canvas.getContext('2d');
        ctx.lineWidth = 1;
        ctx.lineCap = 'butt';
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle  = '#000000';
        ctx.clearRect (0, 0, canvas.width, canvas.height);
        ctx.strokeRect (0, 0, canvas.width, canvas.height);
      }      
      $(function(){     
       generateBarcode();
      });
  
    </script>
  </head>
  <body>
       
    <!--div id="barcodeTarget" class="barcodeTarget"></div-->
   


   
<?php echo $custom_error; ?>
<div class="row">
<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                     <!--div class="cover-img-small">
                         <!--img src="http://placehold.it/80x80" alt="..." class="img-card-80"-->
                 
							<div class="box box-widget widget-product">
							<!-- Add the bg color to the header using any of the bg-* classes -->

							  <span class="mailbox-attachment-icon has-img">
							    <img class="img-center" src="<?php echo base_url(); ?>/public/dist/img/logo/max/product_<?php echo $result->idProdutos ?>.jpg" alt="product_<?php echo $result->idProdutos ?>">
							  </span>
							 <div class="mailbox-attachment-info">
								<a href="<?php echo base_url(); ?>/public/dist/img/logo/max/product_<?php echo $result->idProdutos ?>.jpg"  class="mailbox-attachment-name"><i class="fa fa-camera"></i> product_<?php echo $result->idProdutos ?>.jpg</a>
									<span class="">
									  <a download="product_<?php echo $result->idProdutos ?>.jpg" href="<?php echo base_url(); ?>/public/dist/img/logo/max/product_<?php echo $result->idProdutos ?>.jpg" class="btn btn-default btn-xs pull-right"><i class="fa fa-cloud-download"></i></a>
									</span>
									
									<div class="box-footer">	<form action="<?php echo base_url(); ?>produtos/imgProduct" id="formLogo" enctype="multipart/form-data" method="post" class="form-horizontal" >
										<input type="file" name="userfile" value="" />
										<input type="hidden" name="idProdutos" id="id_product" value="<?php echo $result->idProdutos ?>" />
										<br>
										<button class="btn btn-primary pull-right margin-r-5"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Subir foto</button>
									</form>
									</div>
							  </div>
							 
							<!--div class="widget-user-image">
							  <img class="img-circle" src="<?php echo base_url(); ?>/public/dist/img/logo/max/product_<?php echo $result->idProdutos ?>.jpg" alt="User Avatar">
							</div-->
												
					<div class="box-footer">
							  <div class="row">
								<div class="col-sm-4 border-right">
								  <div class="description-block">
									<h5 id="cVendidos" class="description-header">100</h5>
									<?php
									//foreach ($vendidos as $p) {
									//		echo '<td>$' . $p->precioUniNeto . '</td>';
									//}									
									?>
									<span class="description-text">TOTAL VENDIDOS</span>
								  </div>
								  <!-- /.description-block -->
								</div>
								
								<!-- /.col -->
								<div class="col-sm-4 border-right">
								  <div class="description-block">
									<h5 class="description-header"><?php echo $result->estoque; ?></h5>
									<span class="description-text">STOCK ACTUAL</span>
								  </div>
								  <!-- /.description-block -->
								</div>
								<!-- /.col -->
								<div class="col-sm-4">
								  <div class="description-block">
									<h5 class="description-header"><?php echo $result->estoqueMinimo; ?></h5>
									<span class="description-text">STOCK MINIMO</span>
								  </div>
								  <!-- /.description-block -->
								</div>
								<!-- /.col -->
							  </div>
							  <!-- /.row -->
							 
					<div id="canvas-holder" class="chart-responsive" >
                                                <canvas id="ventas"></canvas>
                      </div>
					<div id="historial_ventas" class="" >
                    </div> 					
					</div>
					
			</div>					 
						   
 </div> 
					
					
    <!--div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">       
        <div class="box box-info">           
            <div class="box-header with-border box-header-background-light">
                <i class="fa fa-shopping-bag"></i>
                <h3 class="box-title">Shoop <small>Configuracion</small></h3>
            </div>
            <div class="box-background">
                <div id="divProdutosServicos" class="box-body"> 
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <label class="control-label">Mostrar en Shop</label>   
                        <select class="form-control" id="status-shoop" name="status-shoop" value="">
                            <option <?php
                            if ($result->status == 'si') {
                                echo 'selected';
                            }
                            ?> value="1">Si</option>
                            <option <?php
                            if ($result->status == 'no') {
                                echo 'selected';
                            }
                            ?> value="0">No</option>
                        </select> 
                    </div> 
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <label class="control-label">Mostrar en banner</label>   
                        <select class="form-control" id="status-shoop" name="status-shoop" value="">
                            <option <?php
                            if ($result->status == 'no') {
                                echo 'selected';
                            }
                            ?> value="0">Ninguna</option>
                            <option <?php
                            if ($result->status == 'si') {
                                echo 'selected';
                            }
                            ?> value="1">Foto 1</option>
                            <option <?php
                            if ($result->status == 'si') {
                                echo 'selected';
                            }
                            ?> value="1">Foto 2</option>
                            <option <?php
                            if ($result->status == 'si') {
                                echo 'selected';
                            }
                            ?> value="1">Foto 3</option>

                        </select> 
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <label class="control-label">Mostrar precio</label>   
                        <select class="form-control" id="precio-shoop" name="precio-shoop" value="">
                            <option <?php
                            if ($result->status == '1') {
                                echo 'selected';
                            }
                            ?> value="1">Publico</option>
                            <option <?php
                            if ($result->status == '2') {
                                echo 'selected';
                            }
                            ?> value="0">Gremio</option>
                            <option <?php
                            if ($result->status == '3') {
                                echo 'selected';
                            }
                            ?> value="0">Mayorista</option>
                            <option <?php
                            if ($result->status == '3') {
                                echo 'selected';
                            }
                            ?> value="0">No Mostrar</option>
                        </select> 
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <label class="control-label">Envio privado</label>
                        <div class="input-group">
                            <div class="input-group-addon">
                                <input value="1" name="icon_on" type="checkbox"<?php echo 'checked'; ?>>										
                            </div>		
                        </div>
                    </div>	
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <label class="control-label">Envio gratis</label>
                        <div class="input-group">
                            <div class="input-group-addon">
                                <input value="1" name="icon_on" type="checkbox"<?php echo 'checked'; ?>>										
                            </div>		
                        </div>
                    </div>	

                </div> 
            </div>        
        </div>            

    </div-->

    <form action="<?php echo current_url(); ?>" id="formProduto" method="post" class="form-horizontal" >
        <?php echo form_hidden('idProdutos', $result->idProdutos) ?>
        <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
            <div class="box box-info">
                <?php echo form_hidden('idProdutos', $result->idProdutos) ?>
                <div class="box-header with-border">
                    <i class="fa fa-list-alt" aria-hidden="true"></i>
                    <h3 class="box-title">Descripcion</h3>
                </div>
                <div class="box-background">
                    <div id="divProdutosServicos" class="box-body"> 
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <label for="nomeCliente" class=" control-label">NOMBRE<span class="required">*</span></label>
                            <div class="input-group ">
                                <div class="input-group-addon controls">
                                    <i class="fa fa-dropbox"></i>
                                </div>                               
                                <input type="text" class="form-control"  id="descricao" type="text" name="descricao" value="<?php echo $result->descricao; ?>"  placeholder="Escribe el Nombre del producto...">
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <label>CODIGO DE BARRAS</label>  
                            <div class="input-group text-center">
                                <!--img class="pull-left" src="<?php //echo base_url(); ?>produtos/barcode?text=<?php //echo $result->barcode; ?>&size=30&codetype=Code128&Orientation=orizontal&print=true" /-->
								 <canvas class="canvasTarget" width="550" height="150"></canvas> 	
                                <a href="#modalBarcodeEdit" target="_blank" data-toggle="modal" role="button" class="btn btn-default"><i class="fa fa-edit"></i> <span class="hidden-xs hidden-sm hidden-md"> Editar</span></a>
								<a id="imprimir" type="submit" class="btn btn-secondary pull-left"><i class="fa fa-print"></i> Imprimir</a>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="modal fade modal-secondary" id="modalBarcodeEdit" tabindex="-1" role="dialog" aria-labelledby="modalEntregar">
                            <div class="modal-dialog modal-xs" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span></button>
                                        <h3 class="modal-title">Editar Codigo de Barras</h3>
                                    </div>             
                                    <div  class="modal-body text-center col-sm-12 col-md-12 col-xs-12"> 
                                        <div id="barras" style="width: 270px;" class="col-lg-6 col-md-6 col-sm-6 col-xs-6">                                                                     
											<div style="width: 270px; text-align: left;" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">											
												  <span  style="width: 270px; font-size: 28px; font-weight: 500;">$<?php echo $result->precoVenda; ?></span>
												  <span style="font-size: 10px; font-weight: 500;"><?php echo $result->descricao; ?></span>												
											</div> 
											<div  style="width:200px;" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">											
												<canvas class="canvasTarget" width="350" height="150"></canvas> 		
											</div> 	
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <label>Genenerar nuevo codigo</label>
                                            <div class="input-group ">                                            
                                                <div class="input-group" id="n_serie_2">
                                                    <input id="barcode" class="form-control round-l" type="text" name="barcode" value="<?php echo $result->barcode; ?>" > 
                                                </div> 
                                                <div class="input-group-btn ">
                                                    <a id="btn-gen-barcode" class="btn-gen-barcode btn btn-success"><i class="fa fa-refresh"></i>&nbsp;</a>                           
                                                </div>
                                            </div>
                                        </div>                                        
                                    </div>  
                                    <div class="modal-footer col-sm-12 col-md-12 col-xs-12"> 
                                        <button type="button" class="btn  btn-default " data-dismiss="modal">Cancelar</button>                      
                                        <button type="submit" class="btn btn-primary">Guardar</button>
                                    </div>
                                </div>
                            </div>   
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                            <label>Modelo</label>
                            <input id="modelo" class="form-control" type="text" name="modelo" placeholder="Escribe modelo..." value="<?php echo $result->modelo; ?>" > 
                        </div> 
                        <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                            <label>Marca</label>
                            <input id="marca" class="form-control" type="text" name="marca" placeholder="Escribe modelo..." value="<?php echo $result->marca; ?>" > 
                        </div> 							
                        <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                            <label>Categoria</label>                                   
                            <input id="cat" class="form-control" type="text" name="cat" placeholder="Escribe nombre..." value="<?php echo $result->cat; ?>" >                             
                        </div> 
                        <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                            <label>Proovedor</label>  
                            <div class="input-group ">
                                <input id="proovedor" class="form-control" type="text" name="proveedor" placeholder="Escribe nombre..." value="<?php echo $result->proveedor; ?>" >                                     
                                <input id="proovedor_id" class="form-control" type="hidden" name="proovedor_id" value="<?php echo $result->proovedor_id; ?>"  />                                                                  
                                <div class="input-group-btn">
                                    <a href="<?php echo site_url(); ?>proovedores/adicionar"  target="_blank" data-toggle="modal" role="button" class="btn btn-default"><i class="fa fa-plus"></i> Nuevo</a>
                                </div>
                            </div>                         
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label for="documento" class="control-label">Descipci&oacute;n </label>
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-paperclip" aria-hidden="true"></i>
                                </div>
                                <textarea class="form-control" placeholder="Escribe datos adicionales" name="observaciones" id="observaciones" cols="10" rows="2"><?php echo $result->observaciones; ?></textarea>
                            </div>
                        </div>  
                    </div>  
                    <div class="box-footer">

                    </div>
                </div>
                <!--/div--><!-- /.box-body -->   
                <!--div class="box-footer">        
                </div-->        
                <!--/form--> 
            </div>
        </div>
        <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <i class="fa fa fa fa-usd"></i>
                    <h3 class="box-title">Precio</h3>
                </div>
                <div class="box-body"> 
                    <!--div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <label class="control-label">MONEDA</label>   
                        <select class="form-control" id="status-shoop" name="status-shoop" value="">
                            <option value="0">$ Peso Argentino </option>
                            <option value="1">u$s Dollar Americano</option>
                            <option value="3">Real Brasilero</option>                                
                        </select>                        
                    </div-->
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                         <div id="cost" class="col-lg-3 col-md-4 col-sm-6 col-xs-6">     
                            <table>                   
                                <tr>  
                                    <td>
                                        <input class="chk" checked=""name="estCosto" value="activo" type="radio"/>
                                        <label class="control-label">Costo Peso</label>
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-usd"></i>
                                            </div>
                                            <input id="c1" class="c1 i1 form-control money"  type="number" name="precoCompra" value="<?php echo $result->precoCompra; ?>" placeholder="Precio Costo...">
                                        </div>
                                    </td>
                                </tr>
                                <!--tr> 
                                    <td>
                                     <input class="chk2" name="estCosto" value="inactivo" type="radio"/>
                                        <label class="control-label">Costo Dollar</label>
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-dollar"></i>
                                            </div>
                                            <input class="i2 form-control money"   id="precoCompra" type="number" name="precoCompra" value="<?php //echo $result->precoCompra; ?>" placeholder="Precio Costo...">
                                        </div>                                    
                                    </td>
                                </tr-->
                            </table>
                        </div>
                        <div id="item" class="col-lg-3 col-md-4 col-sm-6 col-xs-6">                            
                            <table>                   
                                <tr>  
                                    <td>
                                    <input class="chk"  <?php  if ($result->precoVendaA == '1') { echo 'checked=""'; } ?>  checked=""  name="precoVendaA"  value="1" type="radio"/>
                                    <label class="control-label"><?php echo $emitente[0]->lista_1 ?> </label>
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-usd"></i>
                                        </div>
                                        <input id="" class="V1 R3 i1 form-control <?php if ($result->precoVendaA != '1') { echo 'bg-gray'; }?> " <?php if ($result->precoVendaA != '1') { echo 'readonly="readonly"'; } ?> id="precoVenda" type="number" name="precoVenda" value="<?php echo $result->precoVenda; ?>"  placeholder="Precio Venta...">
                                    </div>
                                    </td>
                                </tr>
                                <tr> <td>
                                    <input class="chk2" <?php  if ($result->precoVendaA == '0') { echo 'checked=""'; } ?> class="estado" name="precoVendaA" value="0" type="radio"/>
                                   <label class="control-label">Utilidad <?php echo $emitente[0]->lista_1 ?> </label>
                                   <div class="input-group">
                                       <div class="input-group-addon">
                                           <i class="fa fa-percent"></i>
                                       </div>
                                       <input id="" class="P1 L3 i2 form-control "  <?php  if ($result->precoVendaA != '0') { echo 'disabled="disabled"'; } ?> type="number" name="precoVendaP" value="<?php echo $result->precoVendaP; ?>"  placeholder="Precio Venta...">
                                   </div></td>
                                </tr>
                            </table>
                        </div>
                        <div id="item" class="col-lg-3 col-md-4 col-sm-6 col-xs-6">                            
                            <table>                   
                                <tr>  
                                    <td>
                                        <input class="chk" <?php  if ($result->lista_1A == '1') { echo 'checked=""'; } ?> checked=""  name="lista_1A"  value="1" type="radio"/>
                                        <label class="control-label"><?php echo $emitente[0]->lista_2 ?> </label>
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-usd"></i>
                                            </div>
                                            <input id="" class="V2 R3 i1 form-control <?php if ($result->lista_1A != '1') { echo 'bg-gray'; }?> " <?php if ($result->lista_1A != '1') { echo 'readonly="readonly"'; } ?> type="number" name="lista_1" value="<?php echo $result->lista_1; ?>"  placeholder="Precio <?php echo $emitente[0]->lista_2 ?>">
                                        </div>
                                    </td>
                                </tr>
                                <tr> <td>
                                        <input class="chk2" <?php  if ($result->lista_1A == '0') { echo 'checked=""'; } ?> class="estado" name="lista_1A" value="0" type="radio"/>
                                        <label class="control-label">Utilidad <?php echo $emitente[0]->lista_2 ?> </label>
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-percent"></i>
                                            </div>
                                            <input id="" class="P2 L3 i2 form-control "  <?php  if ($result->lista_1A != '0') { echo 'disabled="disabled"'; } ?>  type="number" name="lista_1P" value="<?php echo $result->lista_1P; ?>"  placeholder="Precio <?php echo $emitente[0]->lista_2 ?>">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="item" class="col-lg-3 col-md-4 col-sm-6 col-xs-6">                            
                            <table>                   
                                <tr>  
                                    <td>
                                        <input  class="chk" <?php  if ($result->lista_2A == '1') { echo 'checked=""'; } ?>   name="lista_2A"  value="1" type="radio"/>
                                        <label class="control-label"><?php echo $emitente[0]->lista_3 ?> </label>
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-usd"></i>
                                            </div>
                                            <!--input id="R31" class="form-control"  type="text" name="lista_2" value="<?php //echo $result->lista_2P; ?>" -->
                                            <input id=""  class="V3 R3 i1 form-control  <?php if ($result->lista_2A != '1') { echo 'bg-gray'; }?> " <?php if ($result->lista_2A != '1') { echo 'readonly="readonly"'; } ?> type="number" name="lista_2" value="<?php echo $result->lista_2; ?>"  placeholder="Precio <?php echo $emitente[0]->lista_2 ?>">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input class="chk2"  <?php  if ($result->lista_2A == '0') { echo 'checked=""'; } ?> name="lista_2A" value="0" type="radio"/>
                                        <label class="control-label">Utilidad <?php echo $emitente[0]->lista_3 ?> </label>
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-percent"></i>
                                            </div>
                                            <input  id="" class="P3 L3 i2 form-control" <?php  if ($result->lista_2A != '0') { echo 'disabled="disabled"'; } ?>  type="number" name="lista_2P" value="<?php echo $result->lista_2P; ?>"  placeholder="Precio <?php echo $emitente[0]->lista_2 ?>">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                       
                    </div>
                         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div id="canvas-holder" class="chart-responsive" >
                                                <canvas id="movimientos"></canvas>
                                            </div>
											<div id="historial_body" class="" >                                               
                                            </div>
											
                         </div>  
					
                </div>
                <div class="box-footer">
                    <a id="historialPagos_btn" class="btn btn-default pull-right margin-r-5">Historial de precios</a>                    
                </div>
            </div>
        </div>


        <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12 pull-right">
            <div class="box">
                <div class="box-header">
                    <i class="fa fa fa-th-large"></i>
                    <h3 class="box-title">Stock</h3>
                </div>
                <div class="box-body">
                    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                        <label for="documento" class="control-label">Unidad <span class="required">*</span></label>
                        <div class="input-group">
                            <div class="input-group-addon">
                                <i class="fa fa fa-superscript" aria-hidden="true"></i>
                            </div>
                            <input class="form-control number" id="unidade" type="text" name="unidade" value="<?php echo $result->unidade; ?>"  placeholder="1">
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-md-6 col-xs-6">
                        <label for="telefone" class="control-label">Stock <span class="required">*</span></label>
                        <div class="input-group">
                            <div class="input-group-addon">
                                <i class="fa fa-th-large"></i>
                            </div>
                            <?php
                            if ($this->permission->checkPermission($this->session->userdata('permissao'), 'cBackup')) {
                                echo '<input class = "form-control number" onkeypress = "return numeros(event)" id = "estoque" type = "text" name = "estoque" value = "';
                                echo $result->estoque;
                                echo '" placeholder = "Stock total...">';
                            } else {
                                echo '<input disabled class = "form-control number" onkeypress = "return numeros(event)" value = "' . $result->estoque . '" placeholder = "Stock total..."> <input hidden type = "text" name = "estoque" value = "' . $result->estoque . '"';
                            }
                            ?>									
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-md-6 col-xs-6">
                        <label for="telefone" class="control-label">Stock Minimo</label>
                        <div class="input-group">
                            <div class="input-group-addon">
                                <i class="fa fa-th-large"></i>
                            </div>
                            <input class="form-control number" onkeypress="return numeros(event)"  id="estoqueMinimo" type="text" name="estoqueMinimo" value="<?php echo $result->estoqueMinimo; ?>" placeholder="Stock minimo...">
                        </div>
                    </div>   
                    <div class="col-lg-3 col-sm-6 col-md-6 col-xs-6">
                        <label for="manufacturer_id" class="control-label">Estado</label>   
                        <select class="form-control" id="status" name="status" value="">
                            <option <?php
                            if ($result->status == 'si') {
                                echo 'selected';
                            }
                            ?> value="1">Activo</option>
                            <option <?php
                            if ($result->status == 'no') {
                                echo 'selected';
                            }
                            ?> value="0">Inactivo</option>
                        </select> 
                    </div>
                </div>
                <div class="box-footer">
                   
                    <button type="submit" class="btn btn-success pull-right margin-r-5">Guardar Cambios</button>
                </div>
            </div>

        </div>

    </form>
</div>
<div class="modal fade modal-primary" id="modalImg" tabindex="-1" role="dialog" aria-labelledby="modalEntregar">
    <div class="modal-dialog modal-xs" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span></button>
                <h3 class="modal-title"></h3>
            </div>             
            <div  class="modal-body text-center col-sm-12 col-md-12 col-xs-12"> 
            </div>  
            <div class="modal-footer"> 
                <!--button type="button" class="btn  btn-outline " data-dismiss="modal">Cancelar</button-->                      
                <button type="submit" class="btn btn-success">Aceptar</button>
            </div>
        </div>
    </div>   
</div>
<br>
<br>
<!--script src="<?php echo base_url() ?>js/jquery.validate.js"></script>
<script src="<?php echo base_url(); ?>js/maskmoney.js"></script-->
<link href="<?php echo base_url(); ?>public/plugins/iCheck/square/blue.css" rel="stylesheet">
<script src="<?php echo base_url(); ?>public/plugins/iCheck/icheck.js"></script>



<script src="<?php echo base_url(); ?>public/plugins/upload/js/jasny-bootstrap.min.js"></script>    
<!--script src="<?php// echo base_url(); ?>public/plugins/upload/js/custom.js"></script-->    


<!--script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script-->

<script type="text/javascript">	   
$("#historialPagos_btn").click(function () {
			//var valorsaldo = $("#valorSaldo").val();
            //var idOs = $(this).val('#clientes_id_2');
            $("#historial_body").html("<i class='text-center fa fa-spinner fa-pulse fa-5x fa-fw'></i>");
			//$("#saldoSena").html("$"+ valorsaldo );
            //$.get("<?php echo base_url(); ?>os/getHistorial", "callback=" + $('#idOs').val(),
                    $.get("<?php echo base_url(); ?>produtos/getByIdPrecio", "callback=<?php echo $result->idProdutos ?>",
                    function (data) {
                        var registros = eval(data);
                        html = "<table  id='tablas' class='table table-hover table-responsive'><thead>";
                        html += "<tr><th>Precio Compra</th><th>Lista 1</th><th>Lista 2</th><th>Lista 3</th><th>Fecha de cambio</th></tr>";
                        html += "</thead><tbody>";
						for (var i = 0; i < registros.length; i++) {
                        html += "<tr><td >" + registros[i]["precoCompra"] + "</td><td class='pagos'>" + registros[i]["precoVenda"] + "</td><td>" + registros[i]["lista_1"] + "</td><td>" + registros[i]["lista_2"] + "</td><td>" + registros[i]["data_change"] + "</td>  "; 
						/*						
							'precoCompra' => $row['precoCompra'],
							'precoVenda' => $row['precoVenda'],
							'lista_1' => $row['lista_1'],
							'lista_2' => $row['lista_2'],  
							'data_change' => $row['data_change'],*/
						//var pago = registros[i]["valorNewSena"];			
						  						   
						};										
                        html += "</tbody></table>";                       
                       $("#historial_body").html(html);										
                    }
            );
            $("#historial_body").html("<h3 class='text-center text-muted'><br><br><i class='fa fa-user-md fa-5x' aria-hidden='true'></i><br>La orden no tuvo cambios <br> Sigue abierta.<br><br><br><br></h3>	");
			
			
		});
	 
	$(document).ready(function(data){	
			$.get("<?php echo base_url(); ?>produtos/getByIdPrecio", "callback=<?php echo $result->idProdutos ?>",
                    function (data) {
                        var registros = eval(data);
						var fecha = [];
						var pCompra = [];
						var pLista1 = [];
						var pLista2 = [];
						var pVenda = [];
						for (var i = 0; i < registros.length; i++) {							
							var tC = pCompra.push(registros[i]['precoCompra']);
							var tL1 = pVenda.push(registros[i]['precoVenda']);
							var tL2 = pLista1.push(registros[i]['lista_1']);
							var tL3 = pLista2.push(registros[i]['lista_2']);
							var tF = fecha.push(registros[i]['data_change']);			
							
						};						
						var movimiento = {
												type: 'line',		
												data: {
												   labels: fecha, 
													datasets: [{
															label: "Precio Compra",
															fill: true,
															backgroundColor: 'rgba(0, 115, 183, 0.25)',
															borderColor: window.chartColors.blue,
															data: pCompra,
														},{
															label: "<?php echo $emitente[0]->lista_1 ?>",
															fill: false,															
															borderColor: window.chartColors.blue,
															borderDash: [5, 5],
															data: pVenda,
														}, {
															label: "<?php echo $emitente[0]->lista_2 ?>",
															fill: true,
															backgroundColor: 'rgba(85, 82, 153, 0.32)',															
															borderColor: window.chartColors.purple,
															data: pLista1,
														}, {
															label: "<?php echo $emitente[0]->lista_3 ?>",
															fill: false,															
															borderColor: window.chartColors.purple,
															borderDash: [5, 5],
															data: pLista2,
														},
													]
												},
												
												options: {
													responsive: true,
													title: {
														display: true,
														text: 'Ultimos 7 dias'
													},
													tooltips: {
														mode: 'index',
														intersect: false,
													},
													hover: {
														mode: 'nearest',
														intersect: true
													},
													scales: {
														xAxes: [{
																display: true,
																scaleLabel: {
																	display: true,
																	labelString: 'Dias'
																}
															}],
														yAxes: [{
																display: true,
																scaleLabel: {
																	display: true,
																	labelString: 'Valor '
																}
															}]
													}
												}
							}
								var ctx = document.getElementById("movimientos").getContext("2d");
								window.myLine = new Chart(ctx, movimiento); 
					
                    }
					
            );
	});
	
	
	$(document).ready(function(data){	
			$.get("<?php echo base_url(); ?>produtos/getByIdVendidos", "callback=<?php echo $result->idProdutos ?>",
                    function (data) {
                        var registros = eval(data);
						//var fecha = [];
						var pVenta = [];						
						var cVenta = [];
						//var pLista1 = [];
						//var pLista2 = [];
						//var pVenda = [];
						for (var i = 0; i < registros.length; i++) {							
							var pV = pVenta.push(registros[i]['quantidade']);
							
							//var tC = pCompra.push(registros[i]['precoCompra']);
							//var total = pVenda.push(pVenta);
							//var tL2 = pLista1.push(registros[i]['lista_1']);
							//var tL3 = pLista2.push(registros[i]['lista_2']);
							//var tF = fecha.push(registros[i]['data_change']);			
							
						};			
								//alert(pVenta);
								//alert(pV);
								 $("#cVendidos").html(pV);
						var movimiento = {
												type: 'line',		
												data: {
												   labels: pVenta, 
													datasets: [{
															label: "Hitorial de Ventas",
															fill: true,
															backgroundColor: 'rgba(0, 115, 183, 0.25)',
															borderColor: window.chartColors.blue,
															data: pVenta,
														}/*,{
															label: "<?php echo $emitente[0]->lista_1 ?>",
															fill: false,															
															borderColor: window.chartColors.blue,
															borderDash: [5, 5],
															data: pVenda,
														}, {
															label: "<?php echo $emitente[0]->lista_2 ?>",
															fill: true,
															backgroundColor: 'rgba(85, 82, 153, 0.32)',															
															borderColor: window.chartColors.purple,
															data: pLista1,
														}, {
															label: "<?php echo $emitente[0]->lista_3 ?>",
															fill: false,															
															borderColor: window.chartColors.purple,
															borderDash: [5, 5],
															data: pLista2,
														},*/
													]
												},
												
												options: {
													responsive: true,
													title: {
														display: true,
														text: 'Ultimos 7 dias'
													},
													tooltips: {
														mode: 'index',
														intersect: false,
													},
													hover: {
														mode: 'nearest',
														intersect: true
													},
													scales: {
														xAxes: [{
																display: true,
																scaleLabel: {
																	display: true,
																	labelString: 'Dias'
																}
															}],
														yAxes: [{
																display: true,
																scaleLabel: {
																	display: true,
																	labelString: 'Valor '
																}
															}]
													}
												}
							}
								var ctx = document.getElementById("ventas").getContext("2d");
								window.myLine = new Chart(ctx, movimiento); 
					
                    }
					
            );
	});
	
	
$(document).ready(function(){
                                     //*** Calcula el valor de utilidad en porcentaje ****//   
									  $(".c1").on("keyup",function(){    
                                              //*** Trae el valor de costo del primera clase c1 despues del body ****/
											   var C1 = $('.c1',$(this).parents('form')).val(); 
											   var V1 = $('.V1',$(this).parents('form')).val(); 
											   var V2 = $('.V2',$(this).parents('form')).val(); 
											   var V3 = $('.V3',$(this).parents('form')).val(); 
											   var P1 = $('.P1',$(this).parents('form')).val(); 
											   var P2 = $('.P2',$(this).parents('form')).val(); 
											   var P3 = $('.P3',$(this).parents('form')).val();
											   var C2 = parseFloat(C1); 
											   var valor = $(this).val();
                                               var porcent = 100;				
												///**  Lista 1 ***/				   
                                               var valorP1 = C2 * P1 / porcent;
                                               var valUtil1 = valorP1 + C2;  
											   $(".V1",$(this).parents('form')).val(valUtil1);
											   ///**  Lista 2 ***/	
											    var valorP2 = C2 * P2 / porcent;
                                               var valUtil2 = valorP2 + C2;  
											   $(".V2",$(this).parents('form')).val(valUtil2);
											   ///**  Lista 3 ***/	
											    var valorP3 = C2 * P3 / porcent;
                                               var valUtil3 = valorP3 + C2;  
											   $(".V3",$(this).parents('form')).val(valUtil3);
											   											  
                                        });
									 
									 
                                        $(".L3").on("keyup",function(){    
                                              //*** Trae el valor de costo del primera clase c1 despues del body ****/
                                               var c1 = $('.c1',$(this).parents('body')).val();  
                                               var c12 = parseFloat(c1);   
                                               var valor = $(this).val();
                                               var porcent = 100;
                                               var valorP = c12 * valor / porcent;
                                               var valUtil = valorP + c12;   
                                               $(".R3",$(this).parents('table')).val(valUtil); 
                                        });
                                           
                                     //*** HABILITA y DESABILITA LOS INPUT ****//
                                         $(".chk").change(function(){                                               
                                                 var i = $( '.i1', $( this ).parents ( 'tr' ) );
                                                 var i2 = $( '.i2', $( this ).offsetParent ( 'tr' ) );  
                                                 if( $(this).prop('checked', true)){
                                                    i.removeAttr('readonly');
                                                    i.removeClass("bg-gray");                                                  
                                                    i2.attr('disabled', true);                                                  
                                                 }
                                         });
                                         $(".chk2").change(function(){
                                                 var i = $( '.i1', $( this ).offsetParent ( 'tr' ) );
                                                 var i2 = $( '.i2', $( this ).parents ( 'tr' ) );                                                  
                                                 if( $(this).prop('checked', true)){                                               
                                                    i.attr("readonly","readonly");
                                                    i.addClass("bg-gray");
                                                    i2.removeAttr('disabled');                                                 
                                                 }
                                         });
                                                                  
                                         
                               $(".estado").click(function() {  
                                    if($("").is(':checked')) {  
                                        alert("Está activado");  
                                    } else {  
                                        alert("No está activado");  
                                    }  
                                });  

                                    $(".btn-gen-barcode").click(function () {
                                        $("#n_serie_2").load("<?php echo base_url(); ?>produtos/generarCodigoP");
                                    });
                                 
                                    $("#proovedor").autocomplete({
                                        source: "<?php echo base_url(); ?>produtos/autoCompleteProovedores",
                                        minLength: 1,
                                        select: function (event, ui) {
                                            $("#proovedor_id").val(ui.item.id);
                                            $("#nombreProovedor").val(ui.item.label);
                                        }
                                    });

                                    $("#cat").autocomplete({
                                        source: "<?php echo base_url(); ?>produtos/autoCompleteProductos",
                                        minLength: 1,
                                        select: function (event, ui) {
                                            //$("#proovedor_id").val(ui.item.id);
                                            $("#catName").val(ui.item.cat);
                                        }
                                    });

                                    $('#formProduto').validate({
                                        rules: {
                                            descricao: {required: true},
                                            unidade: {required: true},
                                            precoCompra: {required: true},
                                            precoVenda: {required: true},
                                            estoque: {required: true}
                                        },
                                        messages: {
                                            descricao: {required: 'Campo Requerido.'},
                                            unidade: {required: 'Campo Requerido.'},
                                            precoCompra: {required: 'Campo Requerido.'},
                                            precoVenda: {required: 'Campo Requerido.'},
                                            estoque: {required: 'Campo Requerido.'}
                                        },
                                        errorClass: "help-inline",
                                        errorElement: "span",
                                        highlight: function (element, errorClass, validClass) {
                                            $(element).parents('.input-group').addClass('has-error has-feedback');
                                        },
                                        unhighlight: function (element, errorClass, validClass) {
                                            $(element).parents('.input-group').removeClass('has-error has-feedback');
                                            $(element).parents('.input-group').addClass('has-success has-feedback');
                                        }
                                    });


                              

                                $(function (form) {
                                    var inputFile = $('input#file');
                                    var uploadURI = $('#form-upload').attr('action');
                                    var progressBar = $('#progress-bar');
                                    var cantidad = 0;
                                    // listFilesOnServer();
                                    $('#upload-btn').on('click', function (event) {
                                        $.get("<?php echo base_url(); ?>produtos/getImg_product2", "callback=<?php echo $result->idProdutos ?>",
                                                function (data) {
                                                    var cantidad = 0;
                                                    var registros = 1;
                                                    var registros = eval(data);
                                                    if (eval(data) != null) {
                                                        var cantidad = registros.length;
                                                    } else {
                                                        var cantidad = 0;
                                                    }
                                                    if (cantidad >= 4) {
                                                        $("#toast").html("<div class='alert-toast alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><h4><i class='icon fa fa-check'></i> Error!</h4> Alcanzastes el maximo de imagenes permitido por producto. <br> Debes eliminar alguna imagen para poder reemplazarla.</div>");
                                                    } else {
                                                        var filesToUpload = inputFile[0].files;
                                                        var fileName = filesToUpload[0].name;
                                                        var fileSize = filesToUpload[0].size;
                                                        var fileType = filesToUpload[0].type;
                                                        var fileSizeKb = parseInt(fileSize / 1024); //Tranforma los bytes en Kilobytes                                     
                                                        var sizeMaxKb = 7114; //SETEO DE Kilobytes
                                                        // alert("Estas subiendo: " + fileName + " Pesa " + fileSize + " bytes " + fileType + " Formato"); 
                                                        // alert(fileSizeKb);
                                                        //BERIFICA EL TAMANO MAXIMO DEL EL ARCHIVO
                                                        if (sizeMaxKb < fileSizeKb) {
                                                            // alert('El tamaño supera el limite permitido');
                                                            $("#toast").html("<div class='alert-toast alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><h4><i class='icon fa fa-check'></i> Error!</h4> La imagen supera el limite de 5MB permitido.</div>");
                                                        }
                                                        //BERIFICA EL FORMATO DEL EL ARCHIVO 
                                                        else if (fileType != 'image/jpeg' && fileType != 'image/jpg' && fileType != 'image/png' && fileType != 'image/gif') {
                                                            $("#toast").html("<div class='alert-toast alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><h4><i class='icon fa fa-check'></i> Error!</h4> El archivo no es un formato permitido.</div>");
                                                        } else {
                                                            // Verifica si hay un archivo para subir                                
                                                            if (filesToUpload.length > 0) {
                                                                // Envia los datos al servidor con ajax                                      
                                                                var formData = new FormData(form);
                                                                for (var i = 0; i < filesToUpload.length; i++) {
                                                                    var file = filesToUpload[i];
                                                                    // Envia los datos del archivo al servidor con ajax 
                                                                    formData.append("file[]", file, file.name);
                                                                    formData.append("nombre", "<?php echo $result->descricao; ?>");
                                                                    // Envia los datos adicionales como ID al servidor con ajax 
                                                                    formData.append("idProduct", "<?php echo $result->idProdutos ?>");
                                                                }
                                                                $.ajax({
                                                                    url: uploadURI,
                                                                    type: 'post',
                                                                    data: formData,
                                                                    processData: false,
                                                                    contentType: false,
                                                                    //  timeout: 1000,
                                                                    success: function (data) {
                                                                        //     listFilesOnServer();
                                                                    },
                                                                    xhr: function (data) {
                                                                        var xhr = new XMLHttpRequest();
                                                                        xhr.upload.addEventListener("progress", function (event) {
                                                                            if (i > 1) {
                                                                                var cant = ' fotos';
                                                                            } else {
                                                                                var cant = ' foto';
                                                                            }
                                                                            if (event.lengthComputable) {
                                                                                var percentComplete = Math.round((event.loaded / event.total) * 100);
                                                                                // console.log(percentComplete);
                                                                                $('.progress').show();
                                                                                progressBar.css({width: percentComplete + "%"});
                                                                                progressBar.text(percentComplete + '%');
                                                                                $("#toast").html("<div class='alert-toast alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><h4><i class='icon fa fa-check'></i> Listo!</h4> Se subieron " + i + cant + " con exito!.</div>");
                                                                            }
                                                                            ;
                                                                            if (percentComplete = 100) {
                                                                                setTimeout(function () {
                                                                                    $("#divImgProduct").load("<?php echo current_url(); ?> #divImgProduct");
                                                                                    // alert("Hello");
                                                                                }, 2000);
                                                                            }
                                                                            ;
                                                                        }, false);
                                                                        return xhr;
                                                                    }
                                                                });
                                                            }
                                                        }
                                                        //ajax get
                                                    }
                                                }
                                        );
                                        // ajax
                                    });
                                    $('body').on('click', '.remove-file', function () {
                                        var me = $(this);
                                        $.ajax({
                                            url: uploadURI,
                                            type: 'post',
                                            data: {file_to_remove: me.attr('data-file')},
                                            success: function () {
                                                me.closest('li').remove();
                                            }
                                        });
                                    });
                                    $('body').on('change.bs.fileinput', function (e) {
                                        $('.progress').hide();
                                        progressBar.text("0%");
                                        progressBar.css({width: "0%"});
                                    });
                                });

});
    $(document).ready(function () {

        $("#imprimir").click(function () {
            PrintElem('#barras');
        })

        function PrintElem(elem)
        {
			
            Popup($(elem).html());
        }
        function Popup(data)        {
            var mywindow = window.open('', '<?php echo $emitente[0]->nome; ?>', 'height=768,width=1024');
            mywindow.document.write('<!doctype html>');
            mywindow.document.write('<html lang="en"><head><meta charset="UTF-8"><title><?php echo $emitente[0]->nome; ?> </title>');
            mywindow.document.write("<head>     <body><div>");
            mywindow.document.write("<div style='float:inherit; width: 100%; margin:0;'>");
            mywindow.document.write(data);
            mywindow.document.write("<canvas class='canvasTarget' width='550' height='150'></canvas></div>");			
            mywindow.document.write("</head></body></div>");
            mywindow.document.write("<link rel='stylesheet' href='<?php echo base_url(); ?>/public/bootstrap/css/bootstrap.min.css' />");
            mywindow.document.write("<link rel='stylesheet' href='<?php echo base_url(); ?>assets/css/bootstrap-responsive.min.css' />");
            mywindow.document.write("<link rel='stylesheet' href='<?php echo base_url(); ?>/public/dist/css/skins/skin-blue.min.css' />");
            mywindow.document.write("<link rel='stylesheet' href='<?php echo base_url(); ?>/public/dist/css/ServerNetSkin.css' />");
			mywindow.document.write("<link rel='stylesheet' href='<?php echo base_url(); ?>public/plugins/barcode/barcode.js' />");		
			mywindow.document.write("<link rel='stylesheet' href='<?php echo base_url(); ?>public/plugins/barcode/jquery-barcode.js' />");					
            mywindow.document.write("<link rel='stylesheet' href='<?php echo base_url(); ?>/public/bootstrap/fonts/font-awesome.min.css'/>");
            mywindow.document.write("</html>");
            setTimeout(function () {
                mywindow.print();
            }, 400);

            return true;
        }
    });


    function genPDF() {
        //  html2canvas(document.body).then(function(canvas) {
        html2canvas(document.getElementById("printOs"), {
            //var pdf = new jsPDF('p', 'mm', page_size),
            onrendered: function (canvas) {
                "use strict";
                //  (function(canvas) {
                // var page_size = 'a4', page_width = 210, page_margin = 10 ;
                var img = canvas.toDataURL('image/png');
                var doc = new jsPDF('p', 'mm', 'a4');
                //  var doc = new jsPDF();
                // doc.addImage(img, 'JPEG', 20, 20);
                doc.addImage(img, 'JPEG', 0, 0, 210, 80);
                //  doc.addImage(img, 'JPEG', 0, 0, 361, 138);

                doc.autoPrint();
                //   var iframe = document.createElement('iframe');
                //    iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100px; width:500px');
                // doc.viewerPreferences({'FitWindow': true}, true);
                doc.save('test.pdf');
            }
        });        
    };
	
	
	

</script>	 



