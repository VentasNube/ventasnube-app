
///////////////////////////////////
////  BOX Movements       2024 ////
///////////////////////////////////

//// VARIABLES GLOBALES 
ws_mov_box_db = 'ws_mov_box_' + ws_id;
// Creando la base de datos local
L_box_db = new PouchDB(ws_mov_box_db, { skip_setup: true });
// BASE LOCAL DE SETING
box_local_db = new PouchDB('box_local_db_' + ws_id);

//SYNCRONIZO LOS DATOS
L_box_db.sync(url_R_db + ws_mov_box_db, {
    live: true,
    retry: true
});


// CHEKEO O CREO LOS FILTROS
async function check_filters() {
    try {
        // Intentar obtener el documento de filtros de la base de datos local
        const filters = await box_local_db.get('filtros');
        console.log(filter)
        return true;
    } catch (error) {
        if (error.name === 'not_found') {
            // Si el documento no se encuentra, crear un nuevo documento con filtros vacíos
            console.log('El documento de filtros no se encontró. Creando nuevo documento con filtros vacíos.');
            // TRAIGO LOS FILTROS DE FECHA DINAMICOS HOY
            var today = new Date();
            var yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            // Establecer la fecha de inicio al primer milisegundo de ayer
            let startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0, 0);
            // Establecer la fecha de fin al último milisegundo de ayer
            let endDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);

            await box_local_db.put({
                _id: 'filtros',
                name_date: ws_lang_data.box_bt_filter_mov_date_Today,
                startDate: startDate,
                endDate: endDate,
                pageNumber: 1,
                skip: 0,
                limit: 10,
            });

            return true;
        }
    }
}
//CHEKETO O CREO LOS FILTROS POR DEFECTO DE LA SESION
check_filters();

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
        return  renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/nav_bar.hbs', '#nav_bar_compiled', ws_box_data_nav);

    } catch (error) {
        if (error.name === 'not_found') {
            // Si el documento no se encuentra, crear un nuevo documento con filtros vacíos
           return check_filters();
        }
    }
}

// IMPRIMO MOV
async function print_mov_item(all_items_array) {
    // let total_items = all_items_array.length;
    var search_result = {
        search_mov: all_items_array,
        price_list: price_doc.price_list,
        ws_lang_data: ws_lang_data,
        user_roles: user_Ctx.userCtx.roles,
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/list_mov.hbs', '#content_box_commpiled', search_result);
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
// Función para actualizar o crear el documento en la base de datos FILTRO
async function updateOrCreateDocument(params) {
    try {
        // Intentar obtener el documento
        const existingDoc = await box_local_db.get('filtros');
        // Combinar los campos existentes con los campos a actualizar
        const updatedDoc = { ...existingDoc, ...params };
        // Actualizar el documento en la base de datos
        await box_local_db.put(updatedDoc);
        console.log('Documento actualizado.', existingDoc);
    } catch (error) {
        // Si el documento no existe, crearlo con los campos especificados

        // TRAIGO LOS FILTROS DE FECHA DINAMICOS HOY
        var today = new Date();
        var yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        // Establecer la fecha de inicio al primer milisegundo de ayer
        let startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0, 0);
        // Establecer la fecha de fin al último milisegundo de ayer
        let endDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);
        //button.textContent = "Ayer";
        //  button_title.textContent = 'Ayer';
        // name_date: button.textContent,
        var name_date = document.getElementById("box_date_filter_btn_tittle");
        const params = {
            name_date: name_date,
            startDate: startDate,
            endDate: endDate,
            pageNumber: 1,
            limit: 5,

        };
        if (error.name === 'not_found') {
            const newDoc = {
                _id: 'filtros',
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

//Traigo la pagina seleccionada del DOM
function getPageNumberNO() {
    // Busca el elemento <li> con la clase 'active' dentro del paginador
    var pageNumber = 1;
    const activePageItem = document.querySelector('.pagination li.active');
    // Verifica si se encontró un elemento activo
    if (activePageItem) {
        // Si se encontró, obtén el número de página del texto dentro del <a>
        var pageNumber = parseInt(activePageItem.querySelector('a').innerText);
        return pageNumber;
    } else {
        // Si no se encontró ningún elemento activo, devuelve -1
        return pageNumber;
    }
}

async function get_box(pageNumber = 1, limit = 0) {
    try {
        // Obtener el documento de filtros
        const filters = await box_local_db.get('filtros');
        let username = user_data.user_email;
        let startDate = filters.startDate;
        let endDate = filters.endDate;
        var limit = filters.limit;
        //var pageNumber = getPageNumber();
        // var pageSize = filters.pageSize;
        var skip = (pageNumber - 1) * limit;
        console.log(skip, 'skip');
        console.log(limit, 'Limit');
        console.log( filters, 'filters');
       
        /*
        const updateFields = {
            limit: limit,
            skip:skip,
        };
        // Actualiza el filtro de limite actual, en la db
        await updateOrCreateDocument(updateFields);
        */
        //FILTROS ADICIONALES
        let userList;
        let clientList;
        let paymentTypeList;
        let operationTypeList;
        // Construir las claves de inicio y fin para la consulta
        let startKey = ["box_mov", username, startDate];
        let endKey = ["box_mov", username, endDate + "\ufff0"];

        // Construye las claves de inicio y fin para la consulta\
        // Agrega filtros adicionales a las claves de inicio y fin, si están presentes
        if (userList && userList.length > 0) {
            startKey.push(...userList);
            endKey.push(...userList);
        }
        if (clientList && clientList.length > 0) {
            startKey.push(...clientList);
            endKey.push(...clientList);
        }
        if (paymentTypeList && paymentTypeList.length > 0) {
            startKey.push(...paymentTypeList);
            endKey.push(...paymentTypeList);
        }
        if (operationTypeList && operationTypeList.length > 0) {
            startKey.push(...operationTypeList);
            endKey.push(...operationTypeList);
        }

        // Realizar una consulta para contar todos los documentos filtrados
        let countResponse = await L_box_db.query('box_mov_get/by_user_date_and_client', {
            include_docs: false,
            startkey: startKey,
            endkey: endKey,
            inclusive_end: true,
            reduce: true,
            group_level: 0
        });
        
        //console.log(countResponse, 'countResponse');
        // Total de documentos filtrados
        const totalFilterItems = countResponse.rows.length;
        // Realizar la consulta paginada
        let response = await L_box_db.query('box_mov_get/by_user_date_and_client', {
            include_docs: false,
            startkey: startKey,
            endkey: endKey,
            limit: limit,
            skip: skip
        });

        // MAPEO LOS ITEMS A IMPRIMIR
        const all_items_array = response.rows.map(({ value }) => ({
            _id: value._id,
            _rev: value._rev,
            type: value.box_mov,
            order_id: value.order_id,
            mov_id: value.mov_id,
            user_name: value.user_name,
            entry_date: value.entry_date,
            client: value.client,
            total_service: value.total_service,
            total_products: value.total_products,
            total_tax: value.total_tax,
            total_discount: value.total_discount,
            total: value.total,
            first_name: value.client.first_name,
            last_name: value.client.last_name,
            category: value.category,
            payment_type: value.payment_type,
            payment_type_id: value.payment_type_id,
            payment_status: value.payment_status,
            order_status: value.order_status,
            status: value.status,
        }));

        const totalPages = Math.ceil(totalFilterItems / limit);
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === pageNumber) {
                pages.push({
                    pageNumber: i,
                    active: true
                });
            } else {
                pages.push({
                    pageNumber: i,
                    active: i === pageNumber
                });
            }
        }

        let nextPage = pageNumber < totalPages ? pageNumber + 1 : totalPages;
        let lastPage = totalPages;
        var ws_box = {
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles
        }
        mov_content = {
            ws_box: ws_box,
            pages: pages,
            nextPage: nextPage,
            lastPage: lastPage,
            totalItems: totalFilterItems,
            limit: limit
        }

        console.log('LIMIT:', limit, 'skip:', skip, 'pageNumber:', pageNumber, 'totalFilterItems',totalFilterItems, 'startKey:', startKey, 'endKey:', endKey);     
        await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/box.hbs', '#content_compiled', mov_content);
        console.log('Imprimo 1')
        await get_nav_box();
        console.log('Imprimo 2')
        await print_mov_item(all_items_array);
        console.log('Imprimo 3')

    } catch (error) {
        console.error('Error al obtener los datos de la caja:', error);
    }
}


// Selecciono filtro de fecha
async function box_filter_select_date(element) {
    var dateValue = element.getAttribute("value");
    var startDate, endDate;
    var button = document.getElementById("box_date_filter_btn");
    var button_title = document.getElementById("box_date_filter_btn_tittle");
    //TRAIGO LOS FILTROS
    const filters = await box_local_db.get('filtros');
    // let username = user_data.user_email;
    // let startDate = filters.startDate;
    //  let endDate = filters.endDate;
    let limit = filters.limit;
    var skip = filters.skip;
    let pageNumber = filters.pageNumber;
   // let pageSize = filters.limit;

    switch (dateValue) {
        case "date_1": // Hoy
            startDate = getCurrentDateWithTime(0, 0);
            endDate = getCurrentDateWithTime(23, 59);
            button.textContent = "Hoy";
            button_title.textContent = 'Hoy';
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
            button_title.textContent = 'Ayer';
            break;
        case "date_3": // Última semana
            endDate = getCurrentDateWithTime(23, 59);
            startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 6);
            startDate.setHours(0, 0, 0, 0);
            button.textContent = "Última Semana";
            button_title.textContent = 'Última Semana';
            break;
        case "date_4": // Último mes
            endDate = getCurrentDateWithTime(23, 59);
            startDate = new Date(endDate);
            startDate.setMonth(startDate.getMonth() - 1);
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);
            button.textContent = "Último Mes";
            button_title.textContent = 'Último Mes';
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
            button_title.textContent = 'Mes Pasado';
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
        name_date: button.textContent,
        startDate: startDate,
        endDate: endDate,
        pageNumber: pageNumber,
        limit:limit,
        skip: skip,
    };
    // Llamar a la función para actualizar o crear el documento
    response = await updateOrCreateDocument(updateFields);
    get_box();

}

// Selecciono cantidad por pagina
async function change_page_limit(element) {
    const limit = $(element).val(); // Obtener el valor seleccionado del elemento
    const page = 1;
    console.log("ITEMS POR PAGINA", limit);
    const updateFields = {
        limit: limit,
    };
    // Llamar a la función para actualizar o crear el documento
    await updateOrCreateDocument(updateFields);
    // Llamar a otras funciones necesarias
    get_box(page,limit);
}

/// COSAS Q FALTAN 24
async function mov_edit_put(formData, doc_id) {
    try {
        console.log('formData', formData);
        console.log('formData', doc_id);
        //const doc_id = $(element).attr('doc_id'); //Id del documento a editar
        // const input_value = $(element).attr('input_value'); //Id del documento a edita
        //let input_id = $(element).attr('input_id');
        // let new_value = $(element).attr('new_value');
        //doc.user_data = user_data;
        doc = { ...formData };
        var doc_id_s = String(doc_id); //Combierto el id del doc en un string
        var doc = await L_box_db.get(doc_id_s); //Traigo el documento
        var response = await L_box_db.put({
            _id: doc._id,
            _rev: doc._rev,
            type: 'contact',
            status: 'active',
            //create_date : new Date(); //fecha actual del navegador
            ...formData,
            // ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
        });
        if (response.ok) {
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



