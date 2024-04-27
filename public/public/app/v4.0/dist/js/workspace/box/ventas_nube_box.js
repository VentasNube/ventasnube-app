
/////////////////////////////////
// CONCTACTOS             2023 //
/////////////////////////////////

ws_mov_box_db = 'ws_mov_box_' + ws_id;
//userCtx
//console.log('userCtx DATA CONTACT:',userCtx);
//// VARIABLES GLOBALES 
// Creando la base de datos local
L_box_db = new PouchDB(ws_mov_box_db, { skip_setup: true });
//SYNCRONIZO LOS DATOS
L_box_db.sync(url_R_db + ws_mov_box_db, {
    live: true,
    retry: true
});

async function add_new_mov(element) {
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
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/popup/new_mov.hbs', '#master_popup', data);
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

function print_box_item(new_items) {
    var search_result = {
        search_contact: new_items,
        price_list: price_doc.price_list,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles,
    }
    console.log('print_contact_item:', search_result);
    if (new_items.length > 0) {
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/card_mov.hbs', '#content_contact_commpiled', search_result);
    } else {
        $('#card_product_result_items').html('<h3 class="padding-20 text-left" >Sin resultados... </h3>');
    }
}

/// SELECCIONO y GUARDO MARCA
async function mov_edit_put(formData,doc_id) {
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
    var doc = await L_box_db.get(doc_id_s); //Traigo el documento
    var response = await L_box_db.put({
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
async function get_all_box_intems() {
    // Traigo los resultados de una vista
    let response = await L_box_db.query(
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
       // search_print_item
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
async function new_contact_put(new_user_data) {
    try {
        var doc = {};
        const doc_id = 'contact_'+  + new Date().getTime() + Math.random().toString().slice(2);
        doc._id = doc_id;
        doc.type = 'contact';
        doc.status = 'active';
        doc.create_date = new Date(); //fecha actual del navegador
        doc.create_user = user_Ctx.userCtx.roles.name; //fecha actual del navegador
        //doc.user_data = user_data;
        doc = {...doc, ...new_user_data};
        const response = await L_box_db.put(doc);
        console.log(doc);
        if(response.ok){
            $('#master_popup').modal('hide');
            get_all_box_intems();
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
// Llamar a `getMoreItems` cada vez que el usuario llega al final de la lista.
// TRAIGO LA BARRA DE BUSQUEDA
function get_nav_box(ws_info, ws_lang_data) {
    var ws_contact_data = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/nav_bar.hbs', '#nav_bar_compiled', ws_contact_data);
    //alert('cargo el bucador');
    // $('#cart_user_input').focus();
    console.log('NAV BAR CATALOG');
};

// TRAIGO LOS CONTACTOS
function get_items_box(ws_id) {

    var ws_contact = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/contact/contact_items.hbs', '#content_contact_commpiled', ws_contact);
    // $('#cart_user_input').focus();
    //console.log('GET ITEMS CATALOG');
}
//Tomo el array documents y los busco el input con fuse.js y compilo la vista de los productos 

async function search_box_item(search_val) {
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
async function get_box(ws_id) {

    //alert('Holaaa')
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/box.hbs', '#content_compiled', ws_cart);
    get_nav_box(ws_info,ws_lang_data);
    get_all_box_intems();
}

$(document).on('focusin', '.box_mov_search', function (element) {
  //  get_all_contact_intems();// CReo con fuse el array con los objetos 
});

$(document).on('keyup', '.box_mov_search', function () {
    var search_val = $(this).val();
   // search_contact_item(search_val, all_items_array)
});



