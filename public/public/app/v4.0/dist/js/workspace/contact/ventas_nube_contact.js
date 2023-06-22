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


/// SELECCIONO y GUARDO MARCA
async function contact_edit_put(formData,doc_id) {
    try {
    console.log('formData',formData);
    console.log('formData',doc_id);
    //const doc_id = $(element).attr('doc_id'); //Id del documento a editar
   // const input_value = $(element).attr('input_value'); //Id del documento a edita
    //let input_id = $(element).attr('input_id');
   // let new_value = $(element).attr('new_value');
   //doc.user_data = user_data;
   doc = {...formData};
    var doc_id_s = String(doc_id); //Combierto el id del doc en un string
    var doc = await L_contact_db.get(doc_id_s); //Traigo el documento
    var response = await L_contact_db.put({
        _id: doc._id,
        _rev: doc._rev,
        type : 'contact',
        status : 'active',
        //create_date : new Date(); //fecha actual del navegador
        ...formData,
       // ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
    });
    if(response.ok){
        get_contact()
        $('#master_popup').modal('hide');
        Snackbar.show({
            text: 'Se edito el contacto con éxito!',
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
    }
    }  
    catch (error) {
        Snackbar.show({
            text: error.reason,
            actionText: 'ok',
            actionTextColor: "#0575e6",
        });
    }
   // catalog_edit_item_url(doc_id, 1);
}

// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_all_contact_intems(ws_id, filter) {
    // Traigo los resultados de una vista
    let response = await L_contact_db.query(
        'contact_get/by_type_and_status', {
        include_docs: true,
        descending: true
    }
    ); //Conceto con la vista de diseno
    if (response.rows) {
        const rows = response.rows;
        console.log('rows contact',rows);

        all_items_array = await rows.map(item => {
            new_items = {};
            // Mapeo el array
            new_items['_id'] = item.value._id;
            new_items['_rev'] = item.value._rev;
            new_items['first_name'] = item.value.first_name;
            new_items['last_name'] = item.value.last_name;
            new_items['phone'] = item.value.phone;
            new_items['email'] = item.value.email;
            new_items['document_number'] = item.value.document_number;
            ////
            new_items['address'] = item.value.address;
            new_items['address_number'] = item.value.address_number;
            new_items['address_floor'] = item.value.address_floor;
            new_items['address_city'] = item.value.address_city;
            new_items['address_state'] = item.value.address_state;
            new_items['address_country'] = item.value.address_country;
            new_items['price_list'] = item.value.price_list;


            return new_items;
        });

        //Imprimo el resultado en patalla
        print_contact_item(all_items_array);
        // CONFIGURO LA VARIABLE GLOBAL FUSE PARA USAR EN TODOS LADOS ya con el array de los resultados
        var options = {
            // isCaseSensitive: false,
            // includeScore: false,
            // shouldSort: true,
            // includeMatches: false,
            // findAllMatches: false,
            // minMatchCharLength: 1,
            // location: 0,
            // threshold: 0.6,
            // distance: 100,
            // useExtendedSearch: false,
            // ignoreLocation: false,
            // ignoreFieldNorm: false,
            includeScore: true,
            useExtendedSearch: true,
            keys: [
                "first_name",
                "last_name",
                "phone",
                "document_number",
                "email"
            ]
        };
        var myIndex = Fuse.createIndex(options.keys, all_items_array);
        // initialize Fuse with the index
        search_contact_fuse = new Fuse(all_items_array, options, myIndex);
    }
    else {
        //return all_cart_item(false);
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
            get_all_contact_intems();
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


///////// VERSION NUEVA 2023 SCROLL INFINITO /////
const PAGE_SIZE = 10; // Ajusta este número a la cantidad de elementos que quieres cargar a la vez.
let lastItemDate = null;

async function getMoreItemsOLD() {
    var options = {
        limit: PAGE_SIZE,
        include_docs: true,
        descending: true
    };

    if (lastItemDate) {
        options.endkey = lastItemDate;
    }

    let response = await L_contact_db.query('contact_get/by_type_and_status', options);
    const rows = response.rows;

    if (rows.length > 0) {
        lastItemDate = rows[rows.length - 1].key; // Actualizar la fecha del último ítem.

        const newItems = rows.map(item => ({
            first_name: item.value.first_name,
            last_name: item.value.last_name,
            phone: item.value.phone,
            email: item.value.email,
            document_number: item.value.document_number
        }));

        print_contact_item(newItems); // Aquí puedes agregar los nuevos ítems a tu UI.

        var options = {
            includeScore: true,
            useExtendedSearch: true,
            keys: ["first_name", "last_name"]
        };
        var myIndex = Fuse.createIndex(options.keys, newItems);
        search_contact_fuse = new Fuse(newItems, options, myIndex);
    } else {
        // No hay más datos para cargar.
    }
}

async function getMoreItems() {
    var options = {
        limit: PAGE_SIZE,
        include_docs: true,
        descending: true
    };

    if (lastItemDate) {
        options.endkey = lastItemDate;
    }

    let response = await L_contact_db.query('contact_get/by_type_and_status', options);
    
    if (response && response.rows && response.rows.length > 0) {
        const rows = response.rows;
        lastItemDate = rows[rows.length - 1].key; // Actualizar la fecha del último ítem.

        const newItems = rows.map(item => ({
            first_name: item.value.first_name,
            last_item: item.value.last_name,
            phone: item.value.phone,
            email: item.value.email,
            document_number: item.value.document_number
        }));

        print_contact_item(newItems); // Aquí puedes agregar los nuevos ítems a tu UI.

        var options = {
            includeScore: true,
            useExtendedSearch: true,
            keys: ["first_name", "last_name"]
        };
        var myIndex = Fuse.createIndex(options.keys, newItems);
        search_contact_fuse = new Fuse(newItems, options, myIndex);
    } else {
        // No hay más datos para cargar.
    }
}

// Llamar a `getMoreItems` cada vez que el usuario llega al final de la lista.
//////////////////////////////
// CATALOGO ( PRODUCTOS ) 2023 //
//////////////////////////////
// TRAIGO LA BARRA DE BUSQUEDA
function get_nav_contact(ws_info, ws_lang_data) {
    var ws_contact_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/contact/nav_bar.hbs', '#nav_bar_compiled', ws_contact_data);
    //alert('cargo el bucador');
    // $('#cart_user_input').focus();
    console.log('NAV BAR CATALOG');
};

// TRAIGO LOS CONTACTOS
function get_items_contact(ws_id) {

    var ws_contact = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/contact/contact_items.hbs', '#content_contact_commpiled', ws_contact);
    // $('#cart_user_input').focus();
    //console.log('GET ITEMS CATALOG');
}

// TARJETAS DE PRODUCTOS
//Tomo el array documents y los busco el input con fuse.js y compilo la vista de los productos 
function print_contact_item(new_items) {
    var search_result = {
        search_contact: new_items,
        price_list: price_doc.price_list,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles,
    }
    console.log('print_contact_item:',search_result);
    if (new_items.length > 0) {
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/contact/card_contact.hbs', '#content_contact_commpiled', search_result);
    } else {
        $('#card_product_result_items').html('<h3 class="padding-20 text-left" >Sin resultados... </h3>');
    }
}

//Tomo el array documents y los busco el input con fuse.js y compilo la vista de los productos 
async function search_contact_item(search_val) {
    //Armo el array para renderizar los items
    var new_items_search = search_contact_fuse.search(search_val, { sortFn: (a, b) => { a > b }, limit: 18 }); //Sort odena de mayor a menor segun el resultado A>b b<A
    //Mapeo el resultado fuera de item
    search_all_items_map_array = await new_items_search.map(it => {
        console.log('new_items_search',new_items_search)
        new_items = {};
        // Mapeo el array
        new_items['_id'] = it.item._id;
        new_items['_rev'] = it.item._rev;
        new_items['first_name'] = it.item.first_name;
        new_items['last_name'] = it.item.last_name;
        new_items['phone'] = it.item.phone;
        new_items['email'] = it.item.email;
        new_items['document_number'] = it.item.document_number;

        new_items['address'] = it.item.address;
        new_items['address_number'] = it.item.address_number;
        new_items['address_floor'] = it.item.address_floor;
        new_items['address_city'] = it.item.address_city;
        new_items['address_state'] = it.item.address_state;
        new_items['address_country'] = it.item.address_country;
        new_items['price_list'] = it.item.price_list;
        return new_items;
    });

    console.log('search_all_items_map_array',search_all_items_map_array);
    if (search_all_items_map_array.length > 0) {
        print_contact_item(search_all_items_map_array);
    } else {
        $('#card_product_result_items').html('<h3 class="padding-20 text-left" >Sin resultados... </h3>');
    }
}

// TRAIGO EL MODULO Y LO IMPRIMO
async function get_contact(ws_id) {

    //alert('Holaaa')
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/contact/contact.hbs', '#content_compiled', ws_cart);
    get_nav_contact(ws_info,ws_lang_data);
    get_all_contact_intems();
}


$(document).on('focusin', '.contact_search', function (element) {
    // cat_get_all_item_punchDb();
    //  cat_search_item_js();
    get_all_catalog_intems();
});

$(document).on('keyup', '.contact_search', function () {
    var search_val = $(this).val();
    var btn_filter = $(this).prev('.search_cat_btn').find('span').attr('search_m_t_name');
    //search_catalog_item(search_m_input);
    console.log('all_items_array llll222');
    console.log(all_items_array);
    console.log('all_items_array llll2222');
    console.log(search_val);
    search_contact_item(search_val, all_items_array)
});



