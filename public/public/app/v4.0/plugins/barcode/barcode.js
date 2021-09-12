    
      function generateBarcode(){
		var value = $("#barcode").val();	   
	    //var value = $("#barcodeCode").val();
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
          $(".barcodeTarget").hide();
          $(".canvasTarget").show().barcode(value, btype, settings);
        } else {
          $("#canvasTarget").hide();
          $(".barcodeTarget").html("").show().barcode(value, btype, settings);
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
  
   