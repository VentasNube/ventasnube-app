
///////////////////////////////////
////  BOX Movements       2024 ////
///////////////////////////////////

//// VARIABLES GLOBALES 
ws_mov_box_db = 'ws_mov_box_' + ws_id;

var ws_left_nav_data = null;
var ws_lang_data = null;

// Creando la base de datos local
L_box_db = new PouchDB(ws_mov_box_db, { skip_setup: true });
// BASE LOCAL DE SETING
box_local_db = new PouchDB('box_local_db_' + ws_id);

//DEFINO VARIABLE GLOBAL
ws_lang_data;

//SYNCRONIZO LOS DATOS
L_box_db.sync(url_R_db + ws_mov_box_db, {
    live: true,
    retry: true
});


//COFIGURACION Y DOC NECESARIOS PARA TODOS LOS BOARDS
async function ws_box_start() {
    try {

       // board_name = readCookie('board-now-' + ws_id); // LEO LA COKIE PARA SABER EN Q MODULO ESTABA
      //  module_info = await L_board_db.get('board_group_' + board_name);
        // userCtx variable global de permisos y roles para filtrar las vistas
        // DOC DE CONFIGURACION GENERAL
        // ws_info = await L_board_db.get('ws_module_config', { include_docs: true, descending: true });
        // DOC DE NAVEGACION
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



       console.log(ws_lang_data,'CHEEEK INICIAL ws_lang_data');
        // Envio los datos a la funciones y imprimo
        //   get_top_bar(ws_info, ws_lang_data, user_Ctx); // Imprimo el top bar
        //  get_left_nav(ws_left_nav, ws_lang_data, user_Ctx);// Traigo y imprimo el documento de navegacion lateral 
        // get_right_nav(ws_info, ws_lang_data); // Imprimo el cart
        //  get_right_cart(ws_info, ws_lang_data, user_Ctx);
        // get_nav_cart(ws_info, ws_lang_data);//Imprimo el cart
        //get_search_module(ws_info, ws_lang_data, user_Ctx); // Imprimo el search 
        //  put_left_nav_doc() // Actualizo o envio la cokkie de navegacion lateral
        // check_url_module(ws_left_nav, ws_lang_data, user_Ctx); // Chequeo y cargo el modulo segun la url actual y la cargo

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


ws_box_start();

// Welcome BOX configuracion inicial del box
async function  box_welcome() {
    try {
        const modal = document.getElementById('master_popup');
        $(modal).modal('show');

        console.log(ws_lang_data, 'ws_lang_data');


        // Intentar obtener el documento de filtros de la base de datos local
        const filters = await box_local_db.get('filtros');
        const category_list = await  L_box_db.get('category_list');
        const payment_type_list = await  L_box_db.get('payment_type_list');
        // const operation_type_list = await  L_box_db.get('operation_type_list');
        const colaboration_list = await  L_board_db.get('colaborator_list');

        /// NEW 2024

        var price_list = await L_catalog_db.get('price_list');
        var currency_list = await L_catalog_db.get('currency_list');
        var tax_list = await L_catalog_db.get('tax_list');

        var box_config = {
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            price_list: price_list.price_list,
            currency_list: currency_list.currency_list,
            tax_list: tax_list.tax,
        }

            console.log('box_config',box_config);
       /* var data = {
            //board_type_name: board_type_name,
         //   ws_info: ws_info,
         ws_lang_data: ws_lang_data,
           // ws_lang_data: ws_lang_data,
           // user_roles: user_Ctx.userCtx.roles
        }*/
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/popup/welcome_box.hbs', '#master_popup', box_config);
    } catch (err) {
        Snackbar.show({
            text: err,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });
    }
}

// Welcome BOX configuracion inicial del box
async function  box_facturar_mov(element) {
    try {
        const modal = document.getElementById('master_popup');
        $(modal).modal('show');
        console.log('box_facturar ws_lang_data:', ws_lang_data );

        var data = {
            //board_type_name: board_type_name,
         //   ws_info: ws_info,
            ws_lang_data: ws_lang_data,
           // ws_lang_data: ws_lang_data,
           // user_roles: user_Ctx.userCtx.roles
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/popup/facturacion_box.hbs', '#master_popup', data);
    } catch (err) {
        Snackbar.show({
            text: err,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });
    }
}


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
        const category_list = await  L_box_db.get('category_list');
        const payment_type_list = await  L_box_db.get('payment_type_list');
      //  const operation_type_list = await  L_box_db.get('operation_type_list');
       const colaboration_list = await  L_board_db.get('colaborator_list');

        // Si se encuentra el documento, devolver los filtros
        // Preparar los datos para la plantilla
        var ws_box_data_nav = {
            filters: filters,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            colaborator_list:colaboration_list,
            category_list:category_list,
            payment_type_list:payment_type_list,
            // operation_type_list:operation_type_list,
            // result: result.docs // Agregar los documentos resultantes a los datos de la plantilla
        }
        console.log('FILTROS ws_box_data_nav',ws_box_data_nav);
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

// ARMO Y Traigo el box filtrado
async function get_boxOK(pageNumber = 1, limit = 0) {
    try {
        // Obtener el documento de filtros
        const filters = await box_local_db.get('filtros');
       // let username = user_data.user_email;

        let username = null;
       // let username = 'marianomarchesi@hotmail.com';
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

        //'contact_17157362925334996911079436024','contact_17157363131576457076707513922','contact_17157362997728088647513453167'];
        /// GASTON AMRCHESI card_contact_17159039046109420031853099771

         let federico = 'contact_17156244459017923694954517382';
         let mariano =  'contact_17156316544479361594260343062';
       //  let gaston =  'contact_17159039046109420031853099771';
         let gaston =  '17159039046109420031853099771';
        // contact_17159039046109420031853099771

         

        //FILTROS ADICIONALES
        let userList;


        let clientList = [gaston];
       // let clientList;
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
            client_id: value.client_id,
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


        console.log( 'client_id:',    clientList );
        console.log( 'startKey:', startKey, 'endKey:', endKey );
        console.log( 'RESULTADO DE CONSULTA:',   all_items_array );




        console.log('LIMIT:', limit, 'skip:', skip, 'pageNumber:', pageNumber, 'totalFilterItems',totalFilterItems, 'startKey:', startKey, 'endKey:', endKey);     
        await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/box.hbs', '#content_compiled', mov_content);
      //  console.log('Imprimo 1')
        await get_nav_box();
      //  console.log('Imprimo 2')
        await print_mov_item(all_items_array);
       // console.log('Imprimo 3')

    } catch (error) {
        console.error('Error al obtener los datos de la caja:', error);
    }
}


async function get_box(pageNumber = 1, limit = 10) {
    try {
        
        box_welcome(); 
        // Obtener el documento de filtros
        const filters = await box_local_db.get('filtros');
        // let username = 'marianomarchesi@hotmail.com';  // Puedes cambiarlo según el usuario actual
        let username = 'smartmobile.com.ar@gmail.com';  // Puedes cambiarlo según el usuario actual

        let startDate = filters.startDate;
        let endDate = filters.endDate;
        let limit = filters.limit || 10;  // Asignar un valor predeterminado si no está definido
        var skip = (pageNumber - 1) * limit;

        // Definir listas de filtros
        let clientList = filters.clients || [];
        let categoryList = filters.categories || [];
        let paymentTypeList = filters.paymentTypes || [];

        let startKey = ["box_mov", username, startDate];
        let endKey = ["box_mov", username, endDate + "\ufff0"];

        // Agregar los filtros adicionales a las claves de inicio y fin
        if (clientList.length > 0) {
            startKey.push(clientList[0]);
            endKey.push(clientList[clientList.length - 1]);
        } else {
            startKey.push(null);
            endKey.push({});
        }

        if (categoryList.length > 0) {
            startKey.push(categoryList[0]);
            endKey.push(categoryList[categoryList.length - 1]);
        } else {
            startKey.push(null);
            endKey.push({});
        }

        if (paymentTypeList.length > 0) {
            startKey.push(paymentTypeList[0]);
            endKey.push(paymentTypeList[paymentTypeList.length - 1]);
        } else {
            startKey.push(null);
            endKey.push({});
        }

        // Realizar una consulta para contar todos los documentos filtrados
        let countResponse = await L_box_db.query('box_mov_get/by_user_date_and_client', {
            startkey: startKey,
            endkey: endKey,
            inclusive_end: true
        });

        // Total de documentos filtrados
        const totalFilterItems = countResponse.rows.length;

        // Realizar la consulta paginada
        let response = await L_box_db.query('box_mov_get/by_user_date_and_client', {
            startkey: startKey,
            endkey: endKey,
            limit: limit,
            skip: skip,
            include_docs: true
        });

        // MAPEO LOS ITEMS A IMPRIMIR
        const all_items_array = response.rows.map(({ doc }) => ({
            _id: doc._id,
            _rev: doc._rev,
            type: doc.type,
            order_id: doc.order_id,
            mov_id: doc.mov_id,
            user_name: doc.user_name,
            entry_date: doc.entry_date,
            client_id: doc.client_id,
            client: doc.client,
            total_service: doc.total_service,
            total_products: doc.total_products,
            total_tax: doc.total_tax,
            total_discount: doc.total_discount,
            total: doc.total,
            first_name: doc.client.first_name,
            last_name: doc.client.last_name,
            category: doc.category,
            payment_type: doc.payment_type,
            payment_type_id: doc.payment_type_id,
            payment_status: doc.payment_status,
            order_status: doc.order_status,
            status: doc.status,
        }));

        // Calcular el número total de páginas
        const totalPages = Math.ceil(totalFilterItems / limit);
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push({
                pageNumber: i,
                active: i === pageNumber
            });
        }

        let nextPage = pageNumber < totalPages ? pageNumber + 1 : totalPages;
        let lastPage = totalPages;

        const mov_content = {
            pages: pages,
            nextPage: nextPage,
            lastPage: lastPage,
            totalItems: totalFilterItems,
            limit: limit
        };

        // Renderizar el contenido
        await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/box.hbs', '#content_compiled', mov_content);
        await get_nav_box();
        await print_mov_item(all_items_array);

        console.log('client_id:', clientList);
        console.log('startKey:', startKey, 'endKey:', endKey);
        console.log('RESULTADO DE CONSULTA:', all_items_array);
        console.log('LIMIT:', limit, 'skip:', skip, 'pageNumber:', pageNumber, 'totalFilterItems:', totalFilterItems);

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

/// CRUD CATEGORIAS 2024

// CRUD CATEG0RIAS CREAR PRODUCTO #TAGS 2023
// BUSCO
async function box_search_cat(e, element) {
    //traigo el resultado mas parecido con find
    var doc_id = $(element).attr('doc_id');
    var new_cat_val = $(element).val();
    var select_div_id = "#box_select_new_cat_list";
    var new_cat = String(new_cat_val);
    if (new_cat) {
        // let doc_id_s = String(doc_id);  // Me aseguro q sea un string
        let doc = await L_box_db.get('category_list'); //Filstro con una busqueda que incluya las palabras que ingreso al input

        const filterItems = query => {
            return doc.category_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }

        var search_list = filterItems(new_cat);

        if (search_list.length >= 1) {
            // creo un array con los datos del producto y la lista de categorias actualizadas
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: search_list
            }
            //renderizo las categorias nuevas filtradas

        } else if (search_list == null) {
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: doc.category_list
            }
        }
        else {
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                no_result: true
            }
        }
        // console.log('CAT LIST LIST LISTTTT', cat_list_search);
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/list/box_edit_item_cat_list.hbs', select_div_id, cat_list_search);


    }

}

///  LISTADO EN FORM NUEVO PRODUCTO
async function box_search_new_prod_cat(e, element) {
    //traigo el resultado mas parecido con find
    var doc_id = $(element).attr('doc_id');
    var new_cat_val = $(element).val();
    var select_div_id = "#box_select_new_cat_list";
    var new_cat = String(new_cat_val);
    if (new_cat) {
        // let doc_id_s = String(doc_id);  // Me aseguro q sea un string
        let doc = await L_box_db.get('category_list'); //Filstro con una busqueda que incluya las palabras que ingreso al input

        const filterItems = query => {
            return doc.category_list.filter((el) =>
                el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }

        var search_list = filterItems(new_cat);

        if (search_list.length >= 1) {
            // creo un array con los datos del producto y la lista de categorias actualizadas
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: search_list
            }
            //renderizo las categorias nuevas filtradas

        } else if (search_list == null) {
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                cat_find_list: doc.category_list
            }
        }
        else {
            var cat_list_search = {
                ws_lang_data: ws_lang_data,
                user_roles: user_Ctx.userCtx.roles,
                doc_id: doc_id,
                no_result: true
            }
        }
        // console.log('CAT LIST LIST LISTTTT', cat_list_search);
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/catalog/product/list/box_new_item_cat_list.hbs', select_div_id, cat_list_search);
    }
}


// ELIMINO
async function box_dell_cat(element) {
    event.preventDefault(element);
    try {
        //Datos del cocumento y el id 
        let doc_id = $(element).attr('doc_id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar la categoria ' + value + ' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function (element) {
                //Efecto y verificacion del tag
                let doc_id_s = String(doc_id);
                //Traigo el documento actualizado
                console.log(doc_id_s);
                let doc = await L_box_db.get('category_list');
                console.log(doc);
                //Filtro los resultados del array menos el que quiero eliminar
                const new_cat_list = doc.category_list.filter(word => word.value != value);
                //Reemplazo el array por el filtrado
                console.log(new_cat_list);
                doc.category_list = new_cat_list;
                console.log(doc.category_list);
                //Guardo los cambios
                if (doc) {
                    var response = await L_box_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc,// trae todos los datos del doc y los pega en la raiz
                    });
                    if (response) {
                        //Limpio el item de la pantalla
                        box_edit_item_url(doc_id, 1);
                        $(element).parent('li').remove();
                    } else {
                        //Si no se grabo tira un error en pantalla
                        $(element).parent('li').css("color", "red");
                    }
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}


// AGREGO
async function box_add_new_cat(element) {
    event.preventDefault(element);
    try {
        var doc_id = $(element).attr('doc_id');
        var new_cat_val = $('#box_new_cat_input').val();
        //  var input_value = $(element).attr('input_value');
        //var input_id = $(element).attr('doc_id');
        var new_cat = String(new_cat_val);
        // .toLowerCase()
        // Filtro si el input esta bacio
        if (new_cat) {
            let doc_id_s = String('category_list');  // Me aseguro q sea un string
            let doc = await L_box_db.get(doc_id_s);
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
                        sub_category: []
                    }
                }
                //doc[input_id] = {'id':input_value,'value':new_value} ;//BUSCO EL OBJETO Y LO EDITO
                var new_doc = doc.category_list.unshift(new_item);  //Envio los datos editados al documento

                var response = await L_box_db.put({
                    _id: doc._id,
                    _rev: doc._rev,
                    ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
                });
                if (response) {
                    // load_all_cat(doc_id,arr_number_id );
                    // catalog_edit_item_url(doc_id, 1);
                    $('#catalog_select_cat_value').html(new_cat);
                    $('#catalog_select_cat_value').attr('catalog_select_cat_value', arr_number_id);

                    Snackbar.show({
                        text: 'La categoria ' + new_cat_val + ' se agrego!',
                        actionText: 'ok',
                        pos: 'bottom-right',
                        actionTextColor: "#0575e6",
                    });

                    box_select_new_cat(element, new_cat);
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


// SELECCIONO
async function box_select_new_cat(element, new_cat) {
    let item_value_id = $(element).attr('item_value_id');
    var new_item = new_cat;
    if (new_item) {
        var item_value = new_item;
    } else {
        var item_value = $(element).attr('item_value');
    }
    try {
        $('#box_select_cat_value').attr('box_select_cat_value', item_value_id);
        $('#box_select_cat_value').html(item_value);
        $('#box_select_cat_tittle').html(item_value);
        //traigo el documento a editar
    } catch (err) {
        console.log(err);
    }

}

async function put_new_boxNOOLD() {
    try {
        const docId = '_' + board_name; // Generar un ID único
        const ws_id = 'your_workspace_id'; // Asegúrate de definir tu workspace_id

        // Listas de categorías, tipos de pago y tipos de operación
        const category_list = [
            {
                "value": 'Gastos diarios',
                "color": "bg-green",
                "icon": "done",
                "type": "out",
            },
            {
                "value": 'Gastos diarios',
                "color": "bg-green",
                "icon": "done",
                "type": "in",
            },
            {
                "value": 'Ingreso cambio',
                "color": "bg-green",
                "icon": "done",
                "type": "in",
            },
            {
                "value": 'Gastos diarios',
                "color": "bg-green",
                "icon": "done",
                "type": "in",
            }
        ];

        const payment_type_list = [
            {
                "value": 'Efectivo',
                "color": "bg-green",
                "icon": "payments",
                "type": "out",
                "porcent": 15,
                "tax": 21,
            },
            {
                "value": 'Tarjeta de credito',
                "color": "bg-green",
                "icon": "credit_card",
                "type": "in",
                "porcent": 15,
                "tax": 21,
            },
            {
                "value": 'Qr',
                "color": "bg-green",
                "icon": "qr_code",
                "type": "in",
                "porcent": 15,
                "tax": 21,
            },
            {
                "value": 'Debito',
                "color": "bg-green",
                "icon": "account_balance_wallet",
                "type": "in",
                "porcent": 15,
                "tax": 21,
            },
            {
                "value": 'Transferencia',
                "color": "bg-green",
                "icon": "account_balance",
                "type": "in",
                "porcent": 15,
                "tax": 21,
            }
        ];

        const operation_type_list = [
            {
                "value": 'Ventas',
                "color": "bg-green",
                "icon": "payments",
                "type": "in",
            },
            {
                "value": 'Compras',
                "color": "bg-green",
                "icon": "credit_card",
                "type": "out",
            },
            {
                "value": 'Servicios',
                "color": "bg-green",
                "icon": "qr_code",
                "type": "in",
            },
            {
                "value": 'Turnos',
                "color": "bg-green",
                "icon": "account_balance_wallet",
                "type": "in",
            },
            {
                "value": 'Transferencia',
                "color": "bg-green",
                "icon": "account_balance",
                "type": "in",
            }
        ];

        // Crear un nuevo documento general para el board
        let new_doc = {
            "_id": docId,
            "category_id": board_name,
            "workspace_id": ws_id,
            "status": "open",
        };

        let doc;
        try {
            doc = await L_box_db.get(docId); // Verificar si el documento ya existe
        } catch (error) {
            if (error.name !== 'not_found') {
                throw error;
            }
        }

        let response;
        if (doc && doc._rev) {
            new_doc._rev = doc._rev;
            response = await L_box_db.put(new_doc); // Actualizar el documento existente
        } else {
            response = await L_box_db.put(new_doc); // Crear un nuevo documento
        }

        // Crear/actualizar documentos para cada lista
        const lists = { category_list, payment_type_list, operation_type_list };

        for (const [list_name, list] of Object.entries(lists)) {
            const listDocId = list_name; // El ID del documento es el nombre de la lista
            const listDoc = {
                "_id": listDocId,
                "items": list
            };

            try {
                let existingDoc = await L_box_db.get(listDocId);
                listDoc._rev = existingDoc._rev;
            } catch (error) {
                if (error.name !== 'not_found') {
                    throw error;
                }
            }
            await L_box_db.put(listDoc);
        }

        // Mostrar mensaje en un snackbar
        Snackbar.show({
            text: '¡Se creó el board con éxito!',
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 5000
        });

    } catch (error) {
        // Mostrar mensaje de error en un snackbar
        Snackbar.show({
            text: error.message,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 5000
        });
    }
}


/// PUT NUEVO BOARD 

async function put_new_box(b) {
    try {
        const ws_id = ws_id; // Asegúrate de definir tu workspace_id

        // Listas de categorías, tipos de pago, tipos de operación y colaboradores
        const category_list = [
            {
                "value": 'Gastos diarios',
                "color": "bg-green",
                "icon": "done",
                "type": "out",
            },
            {
                "value": 'Gastos diarios',
                "color": "bg-green",
                "icon": "done",
                "type": "in",
            },
            {
                "value": 'Ingreso cambio',
                "color": "bg-green",
                "icon": "done",
                "type": "in",
            },
            {
                "value": 'Gastos diarios',
                "color": "bg-green",
                "icon": "done",
                "type": "in",
            }
        ];

        const payment_type_list = [
            {
                "value": 'Efectivo',
                "color": "bg-green",
                "icon": "payments",
                "type": "out",
                "porcent": 15,
                "tax": 21,
            },
            {
                "value": 'Tarjeta de credito',
                "color": "bg-green",
                "icon": "credit_card",
                "type": "in",
                "porcent": 15,
                "tax": 21,
            },
            {
                "value": 'Qr',
                "color": "bg-green",
                "icon": "qr_code",
                "type": "in",
                "porcent": 15,
                "tax": 21,
            },
            {
                "value": 'Debito',
                "color": "bg-green",
                "icon": "account_balance_wallet",
                "type": "in",
                "porcent": 15,
                "tax": 21,
            },
            {
                "value": 'Transferencia',
                "color": "bg-green",
                "icon": "account_balance",
                "type": "in",
                "porcent": 15,
                "tax": 21,
            }
        ];

        const operation_type_list = [
            {
                "value": 'Ventas',
                "color": "bg-green",
                "icon": "payments",
                "type": "in",
            },
            {
                "value": 'Compras',
                "color": "bg-green",
                "icon": "credit_card",
                "type": "out",
            },
            {
                "value": 'Servicios',
                "color": "bg-green",
                "icon": "qr_code",
                "type": "in",
            },
            {
                "value": 'Turnos',
                "color": "bg-green",
                "icon": "account_balance_wallet",
                "type": "in",
            },
            {
                "value": 'Transferencia',
                "color": "bg-green",
                "icon": "account_balance",
                "type": "in",
                "porcent": 15,
                "tax": 21,
            }
        ];

        const colaborator_list = [
            {
                "name": 'Juan Perez',
                "role": 'Developer',
            },
            {
                "name": 'Maria Lopez',
                "role": 'Designer',
            }
        ];

        const filtros = [
            {
                "filter": "today",
                "value": "Hoy"
            },
            {
                "filter": "week",
                "value": "Esta Semana"
            }
        ];

        // Crear/actualizar documentos específicos en la base de datos
        const lists = {
            filtros,
            category_list,
            payment_type_list,
            colaborator_list
        };

        for (const [list_name, list] of Object.entries(lists)) {
            const listDocId = list_name; // El ID del documento es el nombre de la lista
            const listDoc = {
                "_id": listDocId,
                "items": list
            };

            try {
                let existingDoc = await L_box_db.get(listDocId);
                listDoc._rev = existingDoc._rev;
            } catch (error) {
                if (error.name !== 'not_found') {
                    throw error;
                }
            }
            await L_box_db.put(listDoc);
        }

        // Mostrar mensaje en un snackbar
        Snackbar.show({
            text: '¡Se creó el board con éxito!',
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 5000
        });

    } catch (error) {
        // Mostrar mensaje de error en un snackbar
        Snackbar.show({
            text: error.message,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 5000
        });
    }
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



