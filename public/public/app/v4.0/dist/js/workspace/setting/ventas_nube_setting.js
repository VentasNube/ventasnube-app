
async function print_ws_setting() {
  try {
      var price_list = await L_catalog_db.get('price_list');
      var currency_list = await L_catalog_db.get('currency_list');
      var tax_list = await L_catalog_db.get('tax_list');
      var catalog_config = {
          ws_info: ws_info,
          ws_lang_data: ws_lang_data,
          user_roles: user_Ctx.userCtx.roles,
          price_list: price_list.price_list,
          currency_list: currency_list.currency_list,
          tax_list: tax_list.tax,
      }
      renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/setting/general.hbs', '#right_main', catalog_config);
      createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
      $('#right_main').removeClass('move-right');
      var m_url = '?type=config&?t=general';
      history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion     
      return;
  } catch (err) {
      console.log(err);
  }
}

async function get_ws_setting() {
    print_ws_setting(user_data,ws_info, ws_lang_data);
};

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
  