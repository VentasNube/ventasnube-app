
////----(Traigo el modulo de configuracion)---/////
function get_ws_setting(user_data,ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
   renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/setting/general.hbs', '#right_main_compiled', ws_cart);
   console.log(ws_cart);
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

async function ws_lang_set(element) {
    try {
        var ws_lang_set = $(element).attr('ws_lang_set');
        var ws_lang_select = $(element).attr('ws_lang_select');
        //  var input_value = $(element).attr('input_value');
        //var input_id = $(element).attr('doc_id');
        var new_cat = String(new_cat_val);
        // .toLowerCase()
        // Filtro si el input esta bacio
        if (new_cat) {
            let doc_id_s = String('category_list');  // Me aseguro q sea un string
            let doc = await L_catalog_db.get(doc_id_s);
            const tag_index = doc.category_list.find((objeto) => objeto.value == new_cat);  // Verigico q el item a agregar ya no este repetido
            if (tag_index) {
                Snackbar.show({
                    text: ' <span class="material-icons">category</span> La categoria ' + new_cat_val + ' ya existe!',
                    width: '475px',
                    pos: 'bottom-right',
                    actionTextColor: "#4CAF50",
                });
            }
            else {
                var arr_number_id = Math.floor(Math.random() * (+'10000000' - +'1')) + +'1'; // Creo el id aleatorio
                var arr_number_id_valid = doc.category_list.find(response => response.id == arr_number_id);// Compruebo q el id no exista
                if (!arr_number_id_valid) {
                    var new_item = {
                        id: arr_number_id,
                        value: new_cat,
                        //sub_category: []
                    }
                }
                //doc[input_id] = {'id':input_value,'value':new_value} ;//BUSCO EL OBJETO Y LO EDITO
                var new_doc = doc.category_list.unshift(new_item);  //Envio los datos editados al documento

                var response = await L_catalog_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
                });
                if (response) {
                    // load_all_cat(doc_id,arr_number_id );
                    // catalog_edit_item_url(doc_id, 1);
                   
                    
                    Snackbar.show({
                        text: 'La categoria ' + new_cat_val + ' se agrego!',
                        actionText: 'ok',
                        pos: 'bottom-right',
                        actionTextColor: "#0575e6",
                    });
                    catalog_edit_item_url(doc_id, 1);
                } else {
                    alert("no se actualizo");
                }
            }
        }
        else {
            Snackbar.show({
                text: ' La categoria no puede estar bacia',
                width: '475px',
                pos: 'bottom-right',
                actionTextColor: "#4CAF50"
            });
        }
    } catch (err) {

    }
}

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
