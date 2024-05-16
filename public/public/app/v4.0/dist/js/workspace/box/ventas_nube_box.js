
///////////////////////////////////
////  BOX Movements       2024 ////
///////////////////////////////////

//// VARIABLES GLOBALES 
ws_mov_box_db = 'ws_mov_box_' + ws_id;
// Creando la base de datos local
L_box_db = new PouchDB(ws_mov_box_db, { skip_setup: true });
// BASE LOCAL DE SETING
box_local_db = new PouchDB('box_local_db_'+ws_id);

//SYNCRONIZO LOS DATOS
L_box_db.sync(url_R_db + ws_mov_box_db, {
    live: true,
    retry: true
});

// TRAIGO LA BARRA
async function get_nav_box() {
    try {
        // Intentar obtener el documento de filtros de la base de datos local
        const filters = await box_local_db.get('filtros');
        // Si se encuentra el documento, devolver los filtros
        // Preparar los datos para la plantilla
        var ws_box_data_nav = {
            filters: filters,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
           // result: result.docs // Agregar los documentos resultantes a los datos de la plantilla
        }
       // console.log('FILTROS ws_box_data_nav',ws_box_data_nav);
        // Renderizar la plantilla con los datos
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/nav_bar.hbs', '#nav_bar_compiled', ws_box_data_nav);

    } catch (error) {
        if (error.name === 'not_found') {
            // Si el documento no se encuentra, crear un nuevo documento con filtros vacíos
            console.log('El documento de filtros no se encontró. Creando nuevo documento con filtros vacíos.');
            await box_local_db.put({
                _id: 'filtros',
                skip: 0,
                limit: 10
            });
            // Devolver un array vacío como filtros
            const filters = await box_local_db.get('filtros');
            // Si se encuentra el documento, devolver los filtros
        //    console.log('FILTROS', filters);
            var ws_box_data_nav = {
                filters:filters,
                ws_info: ws_info,
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
            }
         //   console.log('ws_box_data_nav',ws_box_data_nav);
            renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/nav_bar.hbs', '#nav_bar_compiled', ws_box_data_nav);
        }
    }
}

// IMPRIMO MOV
function print_mov_item(new_items) {
    var ws_info = ws_info;
    var ws_box_view = 'list'
    var search_result = {
        search_mov: new_items,
        price_list: price_doc.price_list,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles,
    }
    // COMPARO SI TIENE RESULTADOS Y EL TIPO DE PLANTILLA Q USO LIST o CARD
    if (new_items.length > 0) {
        if (ws_box_view == 'list') {
            renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/list_mov.hbs', '#content_box_commpiled', search_result);
        }
        else if (ws_box_view == 'card') {
            renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/card_mov.hbs', '#content_catalog_commpiled', search_result);
        }
    } else {
        $('#content_box_commpiled').html('<div class="cart_items_trash"><span class="material-icons xl"> pageview</span><br><span class="cart_items_title">Sin resultados...</span></div>');
    }
    
}

function getCurrentDateWithTime(hour, minute) {
    var currentDate = new Date(); // Obtenemos la fecha y hora actual
    var year = currentDate.getFullYear(); // Obtenemos el año
    var month = currentDate.getMonth(); // Obtenemos el mes (los meses empiezan desde 0)
    var day = currentDate.getDate(); // Obtenemos el día del mes
    // Creamos una nueva fecha con los mismos datos pero con las horas y minutos actualizados
    var newDate = new Date(year, month, day, hour, minute);
    return newDate;
}

/// ------------------------------------ 2024 -------------------//

// Función para actualizar o crear el documento en la base de datos
async function updateOrCreateDocument(params) {
    try {
        // Intentar obtener el documento
        const existingDoc = await box_local_db.get('filtros');
        // Combinar los campos existentes con los campos a actualizar
        const updatedDoc = { ...existingDoc, ...params };
        // Actualizar el documento en la base de datos
        await box_local_db.put(updatedDoc);
        console.log('Documento actualizado.',existingDoc);
    } catch (error) {
        // Si el documento no existe, crearlo con los campos especificados
        if (error.name === 'not_found') {
            const newDoc = {
                _id: 'filtros',
                //filter: [],
                ...params,
            };

            // Guardar el nuevo documento en la base de datos
            await box_local_db.put(newDoc);

            console.log('Documento creado.');
        } else {
            console.error('Error al intentar obtener el documento:', error);
        }
    }
}

// Función para seleccionar el elemento del DOM y llamar a la función de actualización
async function change_page_size(element) {
    const pageSize = $(element).val(); // Obtener el valor seleccionado del elemento
  //  console.log("ITEMS POR PAGINA", pageSize);
    // Definir los campos a actualizar en el documento
    const updateFields = {
        pageSize: pageSize, // Usar el valor seleccionado
    };
    // Llamar a la función para actualizar o crear el documento
    await updateOrCreateDocument(updateFields);
    // Llamar a otras funciones necesarias
    get_box();
}

async function get_all_box_items() {
    const filters = await box_local_db.get('filtros');
    username = user_data.user_email;

    let startDate = filters.startDate;
    let endDate = filters.endDate;

    let response_user = await L_box_db.query('box_mov_get/by_user_date_and_client', {
        include_docs: true,
        startkey: ["box_mov", username, startDate],
        endkey: ["box_mov", username, endDate + "\ufff0"],
        limit: filters.pageSize,
        skip: (filters.pageNumber - 1) * filters.pageSize
    });


    if (response_user.rows) {
        const rows = response_user.rows;
        all_items_array = await rows.map(item => {
            new_items = {};
            new_items['_id'] = item.value._id;
            new_items['_rev'] = item.value._rev;
            new_items['type'] = item.value.box_mov;
            new_items['order_id'] = item.value.order_id;
            new_items['mov_id'] = item.value.mov_id;
            new_items['user_name'] = item.value.user_name;
            new_items['entry_date'] = item.value.entry_date;
            new_items['client'] = item.value.client;
            new_items['total_service'] = item.value.total_service;
            new_items['total_products'] = item.value.total_products;
            new_items['total_tax'] = item.value.total_tax;
            new_items['total_discount'] = item.value.total_discount;
            new_items['total'] = item.value.total;
            new_items['first_name'] = item.value.client.first_name;
            new_items['last_name'] = item.value.client.last_name;
            new_items['phone'] = item.value.client.phone;
            return new_items;
        });
        print_mov_item(all_items_array);
    } else {
        print_mov_item();
    }
}

// Implementa la lógica del paginador en la función get_box
async function get_box() {
    // Renderiza la plantilla del módulo
    // Añade los controles del paginador a la interfaz de usuario
    // Escucha eventos de cambio de página
    // Cuando se cambie la página, llama a get_all_box_intems con el número de página actualizado
    const filters = await box_local_db.get('filtros');

    let username = user_data.user_email;
    let startDate = filters.startDate;
    let endDate = filters.endDate;
    let limit = filters.limit;    
    let skip = filters.skip;
    let pageNumber = filters.pageNumber;
    let pageSize = filters.pageSize;

    // console.log('filters',filters);

    let response = await L_box_db.query('box_mov_get/by_user_date_and_client', {
        include_docs: true,
        startkey: ["box_mov", username, startDate],
        endkey: ["box_mov", username, endDate + "\ufff0"],
        limit: limit,
        skip: (pageNumber - 1) * pageSize,
    });

    var ws_box = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles
    }
    const totalItems = response.total_rows;
    const totalPages = Math.ceil(totalItems / pageSize);
    // Crea el array de páginas
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push({
            pageNumber: i,
            active: i === pageNumber
        });
    }
    // Renderiza la plantilla con los objetos del array de páginas
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/box.hbs', '#content_compiled', {
        ws_box: ws_box,
        pages: pages,
        pageSize: pageSize,
        nextPage: pageNumber < totalPages ? pageNumber + 1 : totalPages,
        lastPage: totalPages
    });
    get_nav_box(ws_info,ws_lang_data);
    get_all_box_items();
}

async function box_filter_select_date(element) {
    var dateValue = element.getAttribute("value");
    var startDate, endDate;
    var button = document.getElementById("box_date_filter_btn");
    var button_title = document.getElementById("box_date_filter_btn_tittle");

    switch (dateValue) {
        case "date_1": // Hoy
            startDate = getCurrentDateWithTime(0, 0);
            endDate = getCurrentDateWithTime(23, 59);
            button.textContent = "Hoy";
            button_title.textContent ='Hoy';
            break;
        case "date_2": // Ayer
            var today = new Date();
            var yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            // Establecer la fecha de inicio al primer milisegundo de ayer
            startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0, 0);
            // Establecer la fecha de fin al último milisegundo de ayer
            endDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);
            button.textContent = "Ayer";
            button_title.textContent ='Ayer';

            break;
        case "date_3": // Última semana
            endDate = getCurrentDateWithTime(23, 59);
            startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 6);
            startDate.setHours(0, 0, 0, 0);
            button.textContent = "Última Semana";
            button_title.textContent ='Última Semana';
            break;
        case "date_4": // Último mes
            endDate = getCurrentDateWithTime(23, 59);
            startDate = new Date(endDate);
            startDate.setMonth(startDate.getMonth() - 1);
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
            button.textContent = "Último Mes";
            button_title.textContent ='Último Mes';
            break;
        case "date_5": // Mes Pasado
            var today = new Date();
            var firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            var lastDayOfLastMonth = new Date(firstDayOfThisMonth);
            lastDayOfLastMonth.setDate(0);
            // Establecer la fecha de inicio al primer día del mes pasado
            startDate = new Date(lastDayOfLastMonth.getFullYear(), lastDayOfLastMonth.getMonth(), 1, 0, 0, 0, 0);
            // Establecer la fecha de fin al último día del mes pasado
            endDate = new Date(lastDayOfLastMonth.getFullYear(), lastDayOfLastMonth.getMonth(), lastDayOfLastMonth.getDate(), 23, 59, 59, 999);
            button.textContent = "Mes Pasado";
            button_title.textContent ='Mes Pasado';
            break;
        case "date_6": // Personalizado
            // Agrega tu lógica para el período personalizado aquí
            break;
        default:
            break;
    }

    // Lógica para seleccionar el checkbox
    var allCheckboxes = document.querySelectorAll(".dropdown-item span span.material-icons");
    allCheckboxes.forEach(function (checkbox) {
        checkbox.textContent = "radio_button_unchecked";
    });
    var checkbox = element.querySelector("span span.material-icons");
    checkbox.textContent = "radio_button_checked";
    /// ACTUALIZO EL DOCUMENTO CON EL FILTRO
    const updateFields = {
       name_date:button.textContent,
       startDate : startDate, 
       endDate : endDate,
    };
    // Llamar a la función para actualizar o crear el documento
   response = await updateOrCreateDocument(updateFields);
   //console.log('ACTUALIZO DOC',response);
   get_all_box_items();
}

/// COSAS Q FALTAN 24
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

//Nuevo Movimiento
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



