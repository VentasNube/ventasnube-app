<div class="cont-btn-float">
    <button class="botonF1">
    <span>+</span>
    </button>
    <button class="btn-float botonF2">
    <span>+</span>
    </button>
    <button class="btn-float botonF3">
    <span>+</span>
    </button>
    <button class="btn-float botonF4">
    <span>+</span>
    </button>
    <button class="btn-float botonF5">
    <span>+</span>
    </button>
 </div>


 
<script>

  
$(document).on("scroll", function(){


  $('.botonF1').hover(function(){
  $('.btn').addClass('animacionVer');
})
$('.contenedor').mouseleave(function(){
  $('.btn').removeClass('animacionVer');
})

});

</script>