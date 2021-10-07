////----(1)----/////
// BOARD VISTA  CONFIGURO LOS PARAMETROS DEL MODULO Y LO ENVIO AL COMPILADOR
function get_board_module(search_m_input, m_id) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var pacht = 'board'; //CONTROLADOR PRINCIPAL
    var controler_data = 'board_m_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'board_m_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#content_compiled'; // ID DE COMPILACION //  
    var data = {
        m_id: 1,
        //  search_m_input: search_m_input,
    }
    console.log(data);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};


function get_board_group(m_id, m_t_id) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;

    //  var pacht = url_now.pacht_m_url; //CONTROLADOR PRINCIPAL
    //var controler_m = url_now.pacht_m_url;
    //alert(controler_m);
    //  var controler_data = pacht + '_group_data'; //NOMBRE DE CONTROLADOR DATA
    //  var controler_template = pacht+'_group_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var pacht = 'board'; //CONTROLADOR PRINCIPAL
    var controler_data = 'board_group_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'board_group_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#content_board_group_compiled'; // ID DE COMPILACION //  
    var data = {
        m_id: m_id,
        m_t_id: m_t_id,
        //  search_m_input: search_m_input,
    }
    console.log(data);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};

///----(Search function)-----/
function get_search_board_items(search_m_input, m_id) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var pacht = 'search'; //CONTROLADOR PRINCIPAL
    var controler_data = 'search_card_product_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'search_card_product_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#card_product_result_items'; // ID DE COMPILACION //  
    var data = {
        m_id: m_id,
        search_m_input: search_m_input,
    }
    console.log(data);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};

function scrollerMove() {
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
        }, 200);
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
        }, 200);
    });
};


//scrollerMove();
//get_board_module();