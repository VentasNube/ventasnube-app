////// BOARDS MODULE 2023 ////////////

ws_board_db = 'ws_contact_' + ws_id;

//board_group_info = null;
ws_left_nav_data = null;
ws_lang_data = null;
module_info = null;
//// VARIABLES GLOBALES 


// Definiendo la URL de la base de datos remota
//const url_R_db = 'http://<username>:<password>@localhost:5984/'; // Reemplaza con tus propios valores
// Creando una instancia de la base de datos remota
//const R_board_db = new PouchDB(url_R_db + ws_board_db);
// Creando la base de datos local
const L_contact_db = new PouchDB(ws_board_db, { skip_setup: true });

//** PRUEBA DE CAPTURAR LOS OYENTES PARA SOLUCIONAR LA ARBENTENCIA DE OYENTES */
const eventosContact = L_contact_db.eventNames();
for (const evento of eventosContact) {
  const oyentes = L_contact_db.listeners(evento);
  console.log(`Oyentes para '${evento}':`);
  for (const oyente of oyentes) {
    console.log(oyente.toString());
  }
}

//** PRUEBA DE CAPTURAR LOS OYENTES PARA SOLUCIONAR LA ARBENTENCIA DE OYENTES */

//SYNCRONIZO LOS DATOS

L_contact_db.sync(url_R_db + ws_board_db, {
    live: true,
    retry: true
}).on('change', function (change) {
    $('#cloud_sync_icon').html("<i class='material-icons material-icon-spinner'> sync</i>");
    // Evento de cambio
}).on('paused', function (info) {
    $('#cloud_sync_icon').html("<i class='material-icons'> cloud_sync</i>");
    // Evento de pausa
    isOnline = false; // No hay conexión
}).on('active', function (info) {
    $('#cloud_sync_icon').html("<i class='material-icons'> cloud_sync</i>");
    // Evento de activación
    isOnline = true; // Hay conexión
}).on('error', function (err) {
    $('#cloud_sync_icon').html("<i class='material-icons'> sync_problem</i>");
    // Evento de error
    isOnline = false; // No hay conexión
}).on('complete', function () {
    // Evento de sincronización completada

});



//COFIGURACION Y DOC NECESARIOS PARA TODOS LOS BOARDS
async function ws_contact_start() {
    try {

        const parametroUrl = await getUrlVal('t');
        // alert(parametroUrl);
        var board_name = parametroUrl;
       // module_info = await L_contact_db.get('board_group_' + board_name);
        ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });

        
        // Mapeo el contenido del objeto ws_left_nav M
        ws_left_nav_data = ws_left_nav['ws_left_nav'];
        // DOC DE LEGUAJE  DOCUMENTO DE LENGUAJE GUARDADO EN USER DB
        ws_lang_data_doc = await user_db.get('ws_lang_' + ws_id, { include_docs: true, descending: true });
        // Mapeo el objeto
        var ws_lang = ws_lang_data_doc;
        // SETEO EL ARRAY CON EL IDIOMA Con la variable
        // Recorro el objeto y busco el nombre ws_lang_es o ws_lang_us dependiendo lo que configuro el admin
        ws_lang_default = ws_lang['ws_land_default'];
        // Recorro el objeto con la confuracion seteada en el DOC lang por default
        ws_lang_data = ws_lang[ws_lang_default];
        // Envio los datos a la funciones y imprimo
        // Creo la variable userCtx apartir del doc left nav
        user_Ctx = ws_left_nav.userCtx;
    } catch (err) {
        // put_left_nav_doc(); //Si hay un error vuelvo a traer el documento actualizado
        console.log('ERROR BOARD START', err)
        Snackbar.show({
            text: err.reason,
            actionText: '<span class="material-icons">refresh</span> Refresh ',
            actionTextColor: "#0575e6",
            duration: Snackbar.LENGTH_INDEFINITE,
            action: () => { updateDocuments() }
        });
    }
}

/// Ordenes GET MAP REDUCE FILTRO POR TIPO
async function query_ordersNO(type, category_id) {
    try {

        const result = await L_contact_db.changes({
            filter: 'get_orders/order_change_2',
            include_docs: true, // Incluye esta línea
            query_params: { type: type, category_id: category_id } //Envio los paramentros a filtrar 
        });

        const rows = result.rows;
        console.log('QUERRY ORDERR');
        console.log(result);
        if (rows) {
            rows.forEach(row => {
                console.log('QUERRY ORDERR');
                console.log(result);
                console.log(row.doc);
            });
        } else {
            console.log('rows is undefined');
        }

    } catch (err) {
        console.error(err);
    }
}


    // Guardo los datos del nuevo contacto
    async function new_contact_putOLD(user_data) {
        try {
            // console.log("new_contact_put formData",user_data);
            var doc = {}
            const doc_id = 'contact_' + new Date().getTime() + Math.random().toString().slice(2);
            doc._id = doc_id;
            doc.user_data = user_data;
            // doc._rev = doc._rev;
            const response = await L_contact_db.put(doc);
            $('#master_popup').modal('hide');
            Snackbar.show({
                text: 'Se creo el contacto con éxito!',
                actionText: 'ok',
                actionTextColor: "#0575e6",
            });
        } catch (error) {
            console.error('Error al crear el documento:', error);
        }
    }

async function add_new_contact(element) {
    try {
        const modal = document.getElementById('master_popup');
        // Listas de precio ws_collections_333433/
        ws_price_list = await L_catalog_db.get('price_list', { include_docs: true, descending: true });
        const data = {
            ws_price_list: ws_price_list,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
        }
        // console.log(ws_price_list);
        $(modal).modal('show');
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/contact/popup/new_contact.hbs', '#master_popup', data);
       // save_new_conctact();
    } catch (err) {
        console.log('ERROR add_new_contact', err)
        Snackbar.show({
            text: err.reason,
            actionText: '<span class="material-icons">refresh</span> Refresh ',
            actionTextColor: "#0575e6",
            duration: Snackbar.LENGTH_INDEFINITE,
            action: () => { updateDocuments() }
        });
    }
}
    // Guardo los datos del nuevo contacto
async function new_contact_put(user_data) {
        try {
            var doc = {};
            const doc_id = 'contact_'+  + new Date().getTime() + Math.random().toString().slice(2);
            doc._id = doc_id;
            doc.type = 'contact';
            doc.status = 'active';
            doc.create_date = new Date(); //fecha actual del navegador
            doc.create_user = user_Ctx.userCtx.roles.name; //fecha actual del navegador
            //doc.user_data = user_data;
            doc = {...doc, ...user_data};
            const response = await L_contact_db.put(doc);
            console.log(doc);
            if(response.ok){
                $('#master_popup').modal('hide');
                Snackbar.show({
                    text: 'Se creo el contacto con éxito!',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
            }

        } catch (error) {
            console.error('Error al crear el contacto:', error);
        }
}



