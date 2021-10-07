////-----(FUNCIONES PARA CREAR LAS VISTAAS DEL BODY y NAVEGACION AJAX-----////


////----(1 TOP BAR)---/////
/// CONFIGURO LOS PARAMETROS DEL MODULO Y LO ENVIO AL COMPILADOR
function get_top_bar() {
    var pacht = 'body'; //CONTROLADOR PRINCIPAL
    var controler_data = 'top_bar'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'top_bar_template'; //NOMBRE CONTROLADOR TEMPLATE
    // ID DE COMPILACION //      
    var id_copiled = '#top_nav_compiled';
    get_module(pacht, controler_data, controler_template, id_copiled);
};

////----(2 LEFT NAV)---/////
// CONFIGURO LOS PARAMETROS DEL MODULO Y LO ENVIO AL COMPILADOR
function get_left_nav(m_id) {
    var url_now = getUrl(); //Traigo la URL ACUTUAL Y CARGO LOS ARRAY
    var m_id = url_now.m_id;
    //var m_t_id = url_now.m_t_id;
    var pacht = 'body'; //CONTROLADOR PRINCIPAL
    var controler_data = 'left_nav'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'left_nav_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#left_nav_compiled'; // ID DE COMPILACION //      
    var data = {
        m_id: m_id,
        //   m_t_id: m_t_id,
    }
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};


////----(3 LEFT NAV CART)---/////
//Cargp la Nav Cart
function get_nav_cart(pacht, controler_data, controler_template, id_copiled, data) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var pacht = 'cart'; //CONTROLADOR PRINCIPAL
    var controler_data = 'cart_nav_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'cart_nav_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#right_main_compiled'; // ID DE COMPILACION //  
    var data = {
        m_id: m_id,
        m_t_id: m_t_id,
    }
    console.log('Get nav cart' + m_id);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
    $('#cart_user_input').focus();
};

////----(4 Search Module)---/////
// SEARCH 
function get_search_module(search_m_input, m_id) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var pacht = 'search'; //CONTROLADOR PRINCIPAL
    var controler_data = 'search_m_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_template = 'search_m_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#search_module_compiled'; // ID DE COMPILACION //  
    var data = {
            m_id: m_id,
            m_t_id: m_t_id,
            search_m_input: search_m_input,
        }
        //console.log(data);
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};


////----(4 CONTENT MODULE )----/////
// CONFIGURO LOS PARAMETROS DEL MODULO Y LO ENVIO AL COMPILADOR
/*
function get_content_module(m_id, m_t_id, pacht, controler_data, controler_template, id_copiled) {
    var data = {
        m_id: m_id,
        m_t_id: m_t_id,
    }
    get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};
*/

//ARMA LOS MODULOS DESDE EL BODY PARA TRAER TODOS LOS TEMPLATES Y DATA DE CADA CONTROLADOR
/*function get_content_module(m_id, m_t_id, pacht, controler_data, controler_template, id_copiled) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    var pacht = url_now.pacht_m_url; //CONTROLADOR PRINCIPAL DE LA URL
    //  alert(pacht)
    /// ACA DEBERIA ARMAR LA DATA DEPENDIENDO LO QUE LE ENVIO
    var controler_c_data = pacht + '_m_data'; //NOMBRE DE CONTROLADOR DATA
    var controler_c_template = pacht + '_m_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_c_copiled = '#content_compiled'; // ID DE COMPILACION //  
    console.log('Get all content module in body' + controler_c_data + '/' + controler_c_template + '/' + id_c_copiled);
    get_module(pacht, controler_c_data, controler_c_template, id_c_copiled); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
};
*/
//// BOTON SELECT MODULO LEFT BAR //
// Logica q trae el modulos con handelbars no el linck
$(document).on('click', 'a.l_nav_m', function(event) {
    // var m_t_icon = $(this).children('span.material-icons').text(); //Trae texto html del icono
    //  var m_t_name = $(this).children('span.this_m_t_name').text(); //Trae texto html del btn
    var m_id = $(this).attr('m_id'); //Trae modulo id
    var m_t_id = $(this).attr('m_t_id'); //Trae module tipo id
    //  var s_url = window.location.host; // Trae dominio url www.dominio/
    //  var s_url_t_m = $(this).attr('m_url'); //Trae Pacht url /pacht/
    var s_url_t_m = $(this).attr('s_url_t_m'); //Trae Pacht url /pacht/    
    var m_url = s_url_t_m; // Armo la url completa del linck
    history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion                
        //  get_nav_bar(m_id, m_t_id); // Recargo los datos del modulos al copilador handelbars del modulo.
    get_content_module(m_id, m_t_id, s_url_t_m);
});

//// BOTON SELECT TYPO DE MODULO LEFT BAR///
$(document).on('click', 'a.l_nav_t_m', function(event) {
    // var url_now = getUrl();
    // var m_id = url_now.m_id;
    // var m_t_id = url_now.m_t_id;
    // var pacht = $(this).attr('m_url'); //CONTROLADOR PRINCIPAL
    var m_t_icon = $(this).children('span.material-icons').text(); //Trae texto html del icono
    var m_t_name = $(this).children('span.this_m_t_name').text(); //Trae texto html del btn
    var m_id = $(this).attr('m_id'); //Trae modulo id
    var m_t_id = $(this).attr('m_t_id'); //Trae module tipo id
    var s_url = window.location.host; // Trae dominio url www.dominio/
    var s_url_t_m = $(this).attr('s_url_t_m'); //Trae Pacht url /pacht/
    var m_url = s_url_t_m + '?m=' + m_id + '&?t=' + m_t_id + '&?type=' + m_t_name; // Armo la url completa del linck
    history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion 
        //get_nav_bar(m_id, m_t_id); // Recargo los datos del modulos al copilador handelbars del modulo.
        // get_board_group(m_id, m_t_id);
    get_content_module();
});

////----(OTRAS COSAS)----/////



//Efecto material de los Label imput 2021
////----( EJECUTO TODAS LAS FUNCIONES UNA VEZ Q SE BAJE EL .HBS  )----/////
$(document).ready(function() {
    window.onload =
        $(".material_input").focusout(function() {
            var input_tex = $(this).children('input').val();
            if (!input_tex) {
                $(this).children('label').css({ "top": "15px", "font-size": "18px" });
                $(this).children('label').children('span').css({ "font-size": "24px" });
                //$(this).prev('label span').css({ "font-size": "10px" });
            }
        });
    $(".material_input").focusin(function() {
        $(this).children('label').css({ "top": "5px", "font-size": "13px" });
        $(this).children('label').children('span').css({ "font-size": "18px" });
    });

});