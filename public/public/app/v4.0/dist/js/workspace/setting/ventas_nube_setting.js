
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


async function ws_setting_general_edit(selectElement) {
    alert('Cambiar idioma');
    try {
    //  var ws_lang_select = $(element).val();
      let doc_id = String('ws_lang_' + ws_id); // Aseguramos que sea un string
      let doc = await user_db.get(doc_id);
      var ws_lang_select = selectElement.value;

      doc.ws_land_default = ws_lang_select;
      doc._rev = doc._rev;
      console.log('ws_lang_select', ws_lang_select);
      console.log('doc_id', doc_id);
      console.log('doc', doc);
      const response = await user_db.put(doc); // Actualizar el documento existente
      console.log('response', response);
      if (response.ok) {

        Snackbar.show({
          text: 'Traslate app '+ws_lang_select+'!',
          actionText: 'OK',
          pos: 'bottom-right',
          actionTextColor: "#0575e6",
        });
        location.reload();   
      }
    } catch (err) {
      console.log(err);
    }
  }
  