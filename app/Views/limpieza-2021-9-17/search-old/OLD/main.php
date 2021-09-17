<!--searchBox -->
<div id="searchBox" class="search-content ">
    <!--search-header -->
    <div class="search-header">
        <div class="search-nav">
            <button id='search-close' type="button" class="search-close"><span class="material-icons">arrow_back</span></button>
            <div class="group">
                <input class="search-input s-card-actv-input" type="text" id="searchInput" name="search" placeholder="Buscar.." />
            </div>
        </div>
        <!--search-header -->
    </div>
    <!--search-body -->
    <div id="search-body" class="search-body ">

        <!--search-title -->
        <!--search-result -->
        <div class="search-result col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <!--search-title -->
            <div class="search-title col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h3>Ordenes <span> Ver mas <span class="material-icons">play_circle_outline</span> </span></h3>
            </div>
            <?php $this->load->view('search/card-orders'); ?>
            <?php $this->load->view('search/card-orders'); ?>
            <?php $this->load->view('search/card-orders'); ?>
             <!--search-title -->
             <div class="search-title col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h3>Clientes <span> Ver mas <span class="material-icons">play_circle_outline</span> </span></h3>
            </div>
            <?php $this->load->view('search/card-client'); ?>
             <!--search-title -->
             <div class="search-title col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h3>Productos <span> Ver mas <span class="material-icons">play_circle_outline</span> </span></h3>
            </div>
            <?php $this->load->view('search/card-product'); ?>
            <!--search-result -->
        </div>
        <!--search-body -->
    </div>
    <!--searchBox -->
</div>


<?php $this->load->view('or_board/or_popup/popPresupuesto'); ?>
<?php $this->load->view('or_board/or_popup/popPresupuesto'); ?>
<?php $this->load->view('or_board/or_popup/popPresupuesto'); ?>



<script>
    $("input.datepicker").datepicker({
        dateFormat: "yy-mm-dd 12:00:00"
    });
</script>