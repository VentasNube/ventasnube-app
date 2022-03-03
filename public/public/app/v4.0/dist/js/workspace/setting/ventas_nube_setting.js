
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
    //$('#right_main').addClass('move-right');
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
        
        /*           
        var item = doc.variations.find(response => response.id == variant_id);// Traigo el elemento por la id variant
        const value = item[input_id]; //Traigo el ojeto especifico 
        value.value = new_value; //Edito el valor del value por el valor nuevo
        */

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
