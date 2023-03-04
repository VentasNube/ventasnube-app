// NEW FUNCIONES CUENTA



/**** NUEVO PRODUCTO */

// FUNCION PARA abrir menu cuenta
async function account_menu_open(ws_info, ws_lang_data) {
    try {

      //  var new_category_list = await L_catalog_db.get('category_list');
     //   var new_trade_list = await L_catalog_db.get('trade_list');
      //  var new_model_list = await L_catalog_db.get('model_list');
     //   var price_doc = await L_catalog_db.get('price_list');
    //    var currency_doc = await L_catalog_db.get('currency_list');
        var user_roles_permisions = user_Ctx.userCtx.roles;
        console.log('user_roles_permisions',user_roles_permisions);

        var account_array = {
            ws_info:ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_roles_permisions,
            ws_top_bar: ws_info,
            user: user_data,
        }

        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/account/account_menu.hbs', '#right_main', account_array);
        //renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/catalog_new_variation.hbs', '#edit_variations_main', product_doc_array);
        console.log('account_array', account_array);
        
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        var m_url = '?type=account';
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion     
        return;   
    } catch (err) {
        console.log(err);
    }
}


// BOTON CREAR
$(document).on('click', '.account_menu_open', function (event) {
    //  $('#master_popup').modal('show');
    // get_catalog_new_item();
    account_menu_open(ws_info, ws_lang_data);
   
});


/*
////----(Traigo el modulo de configuracion)---/////
function get_ws_setting(user_data,ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
   renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/setting/general.hbs', '#right_main_compiled', ws_cart);
    // $('#cart_user_input').focus();
   // alert('Configuracion In');
};


$(document).on('click', '.config_workspace_btn', function(event) {
    $('#right_main').addClass('move-right');
    get_ws_setting(user_data,ws_info, ws_lang_data);
});


$(document).on('click', '#ws_lang_set', function(event) {
    alert('actualizo el idioma');
   // $('#right_main').addClass('move-right');
   // get_account_profile(user_data,ws_info, ws_lang_data);
});

// Formulario de edicion de configuracion de workspace

async function ws_setting_general_edit(element) {

    try {
        //traigo el documento a editar
        const doc_id = $(element).attr('doc_id');
        const input_id = $(element).attr('input_id');
        const new_value = $(element).val();
        alert('Activo el cambio' + new_value);
        var doc_id_s = String(doc_id);
        var doc = await L_catalog_db.get(doc_id_s);
        
     

        if (doc) {
            
            doc[input_id] = new_value;
            console.log('Descripcion EDITADA 2');
            console.log(doc);
            alert('CAMBIAMOS A' + new_value);
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// trae todos los datos del doc y los pega en la raiz
            });

            console.log('DOC DATA RESPONSE EDITADO 3');
            console.log(doc);
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }

}
*/