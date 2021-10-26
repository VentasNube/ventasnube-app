//Funciones que pueden servir para Importar productos desde otra base de datos



// CARGO LOS PRODUCTOS DE SQL EN LA DB LOCAL y COUCHDB
function charge_all_docs_local(remote_items) {
    L_search_db.bulkDocs({ docs: remote_items },
        function(err, response) {
            // handle err or response
        });
}
//// FUNCION PARA TRAER TODAS LAS CONSULTAS DE MODULOS GET EN AJAX CON SU TEMPLATE Y SU CONTRUCTOR /////
function get_items_sql_db(controler_data, data) { // Ejemplo : body, top_bar, top_bar_template, ##top_nav-bar-copiled
    // ID DE COMPILACION //      
    var id_copiled = $(id_copiled);
    var search_m_input = '*';
    //// CONTRUCTOR de URLS /// 
    var controler_data = 'search/search_item_data_sql'; //NOMBRE DE CONTROLADOR DATA
    //  var controler_template = 'search_card_product_template'; //NOMBRE CONTROLADOR TEMPLATE      
    var id_copiled = '#card_product_result_items'; // ID DE COMPILACION //  
    // console.log('GET MODULO DOMAIN: ' + domain_pacht);
    var data = search_m_input;
    $.ajax({
        url: 'search/search_item_data_sql', //Trae todos los modulos de usuario de la secion
        data: data,
        type: "POST",
        dataType: "json",
        success: function(response) {
            if (response) { ///// IMPRIME ////     
                charge_all_docs_local(response);
                console.log(response);
            } else {
                return response, // Devulevo el array resultado    
                    Snackbar.show({
                        text: 'No hay resultados',
                        actionText: 'ok',
                        actionTextColor: "#0575e6",
                    });
            };
        }
    });
};


/**** Nuevo catalogo ****/

//Cargo la variable catalog 
L_catalog_db = L_search_db;

function get_nav_catalog(ws_info,ws_lang_data) {
    var url_now = getUrl();
    var m_id = url_now.m_id;
    var m_t_id = url_now.m_t_id;
    /*if(m_id == null){//Compruebo que la funcion no trae datos y los cargo de la url actual
          var m_id = url_now.m_id;
     }if(m_t_id == null){//Compruebo que la funcion no trae datos y los cargo de la url actual
     }*/
    //  var pacht = 'catalog'; //CONTROLADOR PRINCIPAL
    // var controler_data = 'nav_bar'; //NOMBRE DE CONTROLADOR DATA
    //  var controler_template = 'nav_bar_template'; //NOMBRE CONTROLADOR TEMPLATE      
    // var id_copiled = '#nav_bar_compiled'; // ID DE COMPILACION //  
    //  var data = {
    //      m_id: m_id,
    //       m_t_id: m_t_id,
    //   }
    //  console.log('Modulo id nav' + m_id);
    //get_module(pacht, controler_data, controler_template, id_copiled, data); //ENVIO LOS PARAMETROS DEL ESTE MODULO AL CONTRUCTOR DE LA VISTA    
    var ws_catalog_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/nav_bar.hbs', '#nav_bar_compiled', ws_catalog_data);
    // $('#cart_user_input').focus();
    console.log('NAV BAR CATALOG');

};

// 
function get_catalog(ws_id) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/catalog.hbs', '#content_compiled', ws_cart);
    // $('#cart_user_input').focus();
    console.log('GET CATALOG');
}

// 
function get_items_catalog(ws_id) {



    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
        
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/catalog_items.hbs', '#content_catalog_commpiled', ws_cart);
    // $('#cart_user_input').focus();
    console.log('GET ITEMS CATALOG');
}

////----()---/////
function form_new_product(ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/form_new_product.hbs', '#right_main_compiled', ws_cart);
    // $('#cart_user_input').focus();
    console.log('FORM NEW PRODUCT');
};

//get_catalog(ws_id);


//get_catalog(),
get_nav_catalog();
/*
$(document).ready(function () {
    window.onload =
     //   get_catalog(),
     //   get_nav_catalog();

});
*/