
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



        console.log(ws_lang_data, 'CHEEEK INICIAL ws_lang_data');
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

// CREO NUEVO DOC PAYMENT TYPE LIST
async function new_payment_type_list_doc() {
    console.log('Ya se cargo el documento new_payment_type_list_doc');
}

// ABRE EDITAR
async function payment_type_show_edit(element) {
    try {
        //Traigo los valores
        let price_id = $(element).attr('price_id');
        let new_value = $(element).attr('price_value');
        let new_currency_id = $(element).attr('price_currency_id');
        //Filtro los resultados
        const price_id_n = Number(price_id);
        var new_value_n = Number(new_value);
        var new_currency_id_n = Number(new_currency_id);
        //Modifico el dom
        $('#payment_type_list_name_value').val(new_value); //Tomo el valor de input
        $('#payment_type_list_name_value').attr('price_id', price_id_n); //Grabo el valor en un attr en el input
        $("#payment_type_list_money_value option[value='" + new_currency_id_n + "']").attr("selected", true); // cambio el valor del select

        $("#edit_panel_config_paymet_type").first().fadeIn("slow");// Muestro el div con efecto
        $('#new_paymet_type_list_name_value').focus(); //llevo el foco al input 

    } catch (err) {
        console.log(err);
    }
}

// EDITAR
async function payment_type_list_save_edit(element) {
    try {

        let price_id = $('#new_price_list_name_value').attr('price_id');
        let new_name = $('#new_price_list_name_value').val();
        let new_money_id = $('#new_price_list_money_value').val();

        let tasa_value = $('#new_paymet_type_list_tasa_value').val();

        const price_id_n = Number(price_id);
        var new_name_n = String(new_name);
        var new_money_id_n = Number(new_money_id);
        //PRUEBAS NUEVAS
        // var user_Ctx = userCtx;
        var newDate = new Date(); //fecha actual del navegador
        var userName = userCtx.userCtx.name;
        var doc = await L_catalog_db.get('price_list');
        var price_array = doc.price_list.find(response => response.id == price_id_n);// Traigo el elemento por la id variant
        //Actualizo los arrays con la fecha y el usuario q lo actualizo al precio
        if (price_array) {
            const price = price_array;//Traigo el ojeto especifico 
            price.value = new_name_n; //Edito el valor del value por el valor nuevo

            price.tasa_value = tasa_value; //Edito el valor del value por el valor nuevo

            price.id = price_id_n;//Edito el valor del value por el valor nuevo
            price.currency_id = new_money_id;//Edito el valor del value por el valor nuevo
            price.status = 'active';//Edito el valor del value por el valor nuevo
            price.delete = false;//Edito el valor del value por el valor nuevo
            price.updateDate = newDate;
            price.updateUser = userName;
            //Acutualizo el documento
            var response = await L_catalog_db.put({
                _id: doc._id,
                _rev: doc._rev,
                ...doc,// (Los 3 puntitos lleva el scope a la raiz del documento y no dentro de un objeto doc)
            });
            if (response) {
                var print_item = await catalog_config(); //Refrezco la pantalla
                Snackbar.show({
                    text: 'Se actualizo con exito!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            } else {
                Snackbar.show({
                    text: 'no actualizo!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            }

        } else {
            Snackbar.show({
                text: 'No actualizo!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// CEAR NUEVA FORMA DE PAGO 
async function payment_type_list_new(element) {
    try {
        let new_name = $('#new_paymet_type_list_name_value').val(),
            new_money_id = $('#payment_type_list_money_value').val(),
            tasa_value = $('#new_paymet_type_list_tasa_value').val(),
            new_paymet_type_list_cuote_value = $('#new_paymet_type_list_cuote_value').val(),
            new_paymet_type_list_cuote_value_n = String(new_paymet_type_list_cuote_value),
            new_name_n = String(new_name),
            new_money_id_n = String(new_money_id), // Asegurarse de que el id de la moneda sea una cadena
            newDate = new Date(),
            userName = userCtx.userCtx.name;

        // Intentar obtener el documento payment_type_list
        let doc;
        try {
            doc = await L_box_db.get('payment_type_list');
        } catch (err) {
            if (err.status === 404) {
                // Si el documento no existe, crearlo
                doc = {
                    _id: 'payment_type_list',
                    payment_type_list: []
                };
            } else {
                throw err; // Si es otro tipo de error, lanzarlo
            }
        }

        let payment_type_array = doc.payment_type_list.find(response => response.value == new_name_n);

        console.log('doc.payment_type_list', doc.payment_type_list);
        console.log('payment_type_array', payment_type_array);

        if (!payment_type_array) {
            // Generar un nuevo id aleatorio y único
            let payment_type_id_n;
            do {
                payment_type_id_n = Math.floor(Math.random() * 1000000); // Generar un id aleatorio de 6 cifras
            } while (doc.payment_type_list.some(response => response.id === payment_type_id_n));

            // Obtener el valor de la moneda desde el select
            let currency_value = $('#payment_type_list_money_value option:selected').text();



            // Recuperar los datos de los impuestos desde el DOM
            let tax_elements = $('#new_tax_tag_main .catalog_new_tag_item');
            let tax_list = [];
            tax_elements.each(function () {
                let tax_id = $(this).attr('val_text');
                let tax_value = $(this).find('.chips_text').text(); // Solo guardar el texto del chip
                tax_list.push({ id: tax_id, value: tax_value });
            });




            // Datos adicionales
            let icon = 'credit_card'; // Puedes cambiar esto según sea necesario
            let pay_quantity = new_paymet_type_list_cuote_value_n; // Puedes cambiar esto según sea necesario
            let tasa_int = tasa_value; // Puedes cambiar esto según sea necesario
            let status = true; // Puedes cambiar esto según sea necesario

            let new_payment_type = {
                id: payment_type_id_n,
                name: new_name_n,
                currency: { id: new_money_id_n, value: currency_value },
                tax_list: tax_list, // Agregar la lista de impuestos
                status: status,
                delete: false,
                updateDate: newDate,
                updateUser: userName,
                icon: icon,
                pay_quantity: pay_quantity,
                tasa_int: tasa_int
            };
            doc.payment_type_list.push(new_payment_type);
            let response = await L_box_db.put(doc);

            console.log('payment_type_list', response);
            setting_box();
            Snackbar.show({ text: response.ok ? 'Se creó con éxito!!' : 'Error al crear el ítem!', actionText: 'ok', pos: 'bottom-right', actionTextColor: "#0575e6" });
            if (response.ok) await catalog_config();
        } else {
            Snackbar.show({ text: 'El ítem ya existe!', actionText: 'ok', pos: 'bottom-right', actionTextColor: "#0575e6" });
        }
    } catch (err) {
        console.log(err);
    }
}

/// ADD IMPUESTOS AL METODO
// AGREGO TAX
async function select_add_new_tax_paytment(element) {
    console.log('CLIC 1');
    try {
        console.log('Try ok');
        let new_tag_val = $(element).val();
        if (!new_tag_val) {
            $(element).css("color", "red");
            return;
        }

        let new_tag = String(new_tag_val);
        console.log('new_tag_val', new_tag_val);
        console.log('new_tag', new_tag);

        let catalog_new_tag_item = $('.catalog_new_tag_item_input_' + new_tag);
        let tag_item_count = $(".catalog_new_tag_item").length;

        if (tag_item_count >= 3) {
            Snackbar.show({
                text: 'No puedes agregar más de 3 categorías!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        } else if (catalog_new_tag_item.length === 0) {
            $('#new_tax_tag_main').append(
                `<div class="catalog_new_tag_item_input_${new_tag} catalog_new_tag_item s-card-cat pull-left" val_text="${new_tag}">
                    <a new_tag="${new_tag}" input_id="tags" val_text="${new_tag}" href="#" onclick="catolog_dell_new_tag(this)">
                        <span class="button material-icons text-s lh-n">highlight_off</span>
                    </a>
                    <span class="chips_text">${new_tag}</span>
                </div>`
            );
        } else {
            $('.catalog_new_tag_item_input_' + new_tag).css("color", "red");
        }
    } catch (err) {
        console.log(err);
        $(element).css("color", "red");
    }
}

// ELIMINO FORMA DE PAGO
async function dell_payment_type(element) {
    event.preventDefault(element);
    try {
        // Datos del documento y el id 
        let doc_id = $(element).attr('id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar tipo de pago? ' + value + ' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function () {
                // Efecto y verificación del tag
                let doc_id_s = String(doc_id);
                // Traigo el documento actualizado
                console.log(doc_id_s);
                let doc = await L_box_db.get('payment_type_list');
                console.log(doc);
                // Filtro los resultados del array menos el que quiero eliminar
                const payment_type_list = doc.payment_type_list.filter(word => word.id != doc_id_s);
                // Reemplazo el array por el filtrado
                console.log('payment_type_list', payment_type_list);
                doc.payment_type_list = payment_type_list;
                console.log(doc.payment_type_list);
                // Guardo los cambios
                if (doc) {
                    var response = await L_box_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc, // trae todos los datos del doc y los pega en la raíz
                    });
                    if (response.ok) {
                        // Limpio el item de la pantalla
                        setting_box();
                        // box_edit_item_url(doc_id, 1);
                        // $(element).parent('li').remove();
                    } else {
                        // Si no se grabó, tira un error en pantalla
                        $(element).parent('li').css("color", "red");
                    }
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

//Bloqueo y desbloqueo el tipo de pago
async function payment_type_list_save_block(element) {
    try {
        // Traigo los valores
        const payment_id = $(element).attr('payment_id');
        let payment_status = $(element).attr('payment_status');
        // Cambia el estado del pago
        payment_status = payment_status === 'active' ? 'inactive' : 'active';

        // Filtra los resultados
        const payment_id_n = Number(payment_id);
        const newDate = new Date(); // Fecha actual del navegador
        const userName = userCtx.userCtx.name;

        // Obtiene el documento de la lista de tipos de pago
        const doc = await L_box_db.get('payment_type_list');

        // Verifica que la estructura del documento sea la esperada
        if (!doc.payment_type_list || !Array.isArray(doc.payment_type_list)) {
            throw new Error('La estructura del documento no es válida o el campo payment_type_list no existe.');
        }
        console.log('payment_type_list', doc);
        const payment_array = doc.payment_type_list.find(response => response.id == payment_id_n); // Traigo el elemento por la id variant

        // Actualiza los arrays con la fecha y el usuario que lo actualizó
        if (payment_array) {
            const payment = payment_array; // Traigo el objeto específico
            payment.status = payment_status; // Edito el valor del estado
            payment.updateDate = newDate;
            payment.updateUser = userName;
            // Actualiza el documento
            const response = await L_box_db.put({
                ...doc,
                _id: doc._id,
                _rev: doc._rev,
            });
            // Muestra mensaje de éxito o error
            if (response.ok) {

                Snackbar.show({
                    text: 'Se actualizó con éxito!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
                setting_box();
            } else {
                Snackbar.show({
                    text: 'No se actualizó!!',
                    actionText: 'ok',
                    pos: 'bottom-right',
                    actionTextColor: "#0575e6",
                });
            }
        } else {
            Snackbar.show({
                text: 'No se encontró el tipo de pago!!',
                actionText: 'ok',
                pos: 'bottom-right',
                actionTextColor: "#0575e6",
            });
        }
    } catch (err) {
        console.log(err);
        Snackbar.show({
            text: 'Error al actualizar!!',
            actionText: 'ok',
            pos: 'bottom-right',
            actionTextColor: "#0575e6",
        });
    }
}

new_payment_type_list_doc();

// CEAR NUEVO DOC PRICE LIST

/// ABRO EL EDITOR DE NUEVA LISTA DE PRECIOS
// ABRE EDITAR
async function new_price_list(element) {
    try {
        //Traigo los valores
        let price_id = $(element).attr('price_id');
        let new_value = $(element).attr('price_value');
        let new_currency_id = $(element).attr('price_currency_id');
        //Filtro los resultados
        const price_id_n = Number(price_id);
        var new_value_n = Number(new_value);
        var new_currency_id_n = Number(new_currency_id);
        //Modifico el dom
        $('#payment_type_list_name').val(new_value); //Tomo el valor de input
        $('#payment_type_list_name').attr('price_id', price_id_n); //Grabo el valor en un attr en el input
        $("#new_price_list_money option[value='" + new_currency_id_n + "']").attr("selected", true); // cambio el valor del select

        $("#edit_panel_config_name_price_list").first().fadeIn("slow");// Muestro el div con efecto
        $("#edit_panel_config_name_price_list").first().fadeIn("slow");// Muestro el div con efecto
        $('#new_paymet_type_list_name_value').focus(); //llevo el foco al input 

    } catch (err) {
        console.log(err);
    }
}
// CEAR NUEVA FORMA DE PAGO 
// CREAR NUEVA LISTA DE PRECIOS
async function add_new_price_list(element) {
    try {

        // $('#new_price_list_name_value').val(new_value); 

        new_name = $('#new_price_list_name').val(),
            new_money_id = $('#new_price_list_money').val(),
            tasa_value = $('#new_price_list_tasa_value').val(),
            new_price_list_cuote_value = $('#new_price_list_cuote_value').val(),
            new_price_list_cuote_value_n = String(new_price_list_cuote_value),
            new_name_n = String(new_name),
            new_money_id_n = String(new_money_id), // Asegurarse de que el id de la moneda sea una cadena
            newDate = new Date(),
            userName = userCtx.userCtx.name;
        console.log('new_name', new_name);
        // Intentar obtener el documento price_list
        let doc;
        try {
            doc = await L_catalog_db.get('price_list');
        } catch (err) {
            if (err.status === 404) {
                // Si el documento no existe, crearlo
                doc = {
                    _id: 'price_list',
                    price_list: []
                };
            } else {
                throw err; // Si es otro tipo de error, lanzarlo
            }
        }

        let price_list_array = doc.price_list.find(response => response.name == new_name_n);

        console.log('add_new_price_list', price_list_array);

        if (!price_list_array) {
            // Generar un nuevo id aleatorio y único
            let price_list_id_n;
            do {
                price_list_id_n = Math.floor(Math.random() * 1000000); // Generar un id aleatorio de 6 cifras
            } while (doc.price_list.some(response => response.id === price_list_id_n));

            // Obtener el valor de la moneda desde el select
            let currency_value = $('#new_price_list_money option:selected').text();

            // Recuperar los datos de los impuestos desde el DOM
            let tax_elements = $('#new_tax_tag_main .catalog_new_tag_item');
            let tax_list = [];
            tax_elements.each(function () {
                let tax_id = $(this).attr('val_text');
                let tax_value = $(this).find('.chips_text').text(); // Solo guardar el texto del chip
                tax_list.push({ id: tax_id, value: tax_value });
            });

            // Datos adicionales
            let status = true; // Puedes cambiar esto según sea necesario

            let new_price_list = {
                id: price_list_id_n,
                value: new_name_n,
                currency: { id: new_money_id_n, value: currency_value },
                tax_list: tax_list, // Agregar la lista de impuestos
                status: status,
                delete: false,
                updateDate: newDate,
                updateUser: userName,
                tasa_int: tasa_value,
                cuote_value: new_price_list_cuote_value_n
            };
            doc.price_list.push(new_price_list);
            let response = await L_catalog_db.put(doc);

            console.log('price_list', response);
            setting_box();
            Snackbar.show({ text: response.ok ? 'Se creó con éxito!!' : 'Error al crear el ítem!', actionText: 'ok', pos: 'bottom-right', actionTextColor: "#0575e6" });
            if (response.ok) await catalog_config();
        } else {
            Snackbar.show({ text: 'El ítem ya existe!', actionText: 'ok', pos: 'bottom-right', actionTextColor: "#0575e6" });
        }
    } catch (err) {
        console.log(err);
    }
}
// ELIMINO LISTA DE PRECIOS
async function dell_price_list(element) {
    event.preventDefault(element);
    try {
        // Datos del documento y el id 
        let doc_id = $(element).attr('id');
        let value = $(element).attr('value');
        Snackbar.show({
            text: '<span class="material-icons">delete</span> Quieres eliminar tipo de pago? ' + value + ' ?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
            onActionClick: async function () {
                // Efecto y verificación del tag
                let doc_id_s = String(doc_id);
                // Traigo el documento actualizado
                console.log(doc_id_s);
                var doc = await L_catalog_db.get('price_list');
                //var price_array = doc.price_list.find(response => response.id == price_id_n);// Traigo el elemento por la id variant
                //let doc = await L_box_db.get('price_list');
                console.log('DOC', doc);
                // Filtro los resultados del array menos el que quiero eliminar
                const price_list = doc.price_list.filter(word => word.id != doc_id_s);
                // Reemplazo el array por el filtrado
                console.log('price_list', price_list);
                doc.price_list = price_list;

                console.log(doc.price_list);
                // Guardo los cambios
                if (doc) {
                    var response = await L_catalog_db.put({
                        _id: doc._id,
                        _rev: doc._rev,
                        ...doc, // trae todos los datos del doc y los pega en la raíz
                    });
                    if (response.ok) {

                        Snackbar.show({
                            text: 'Se eliminó con éxito!!',
                            actionText: 'Ok',
                            actionTextColor: '#0575e6',
                            pos: 'bottom-left',
                            duration: 50000
                        });
                        // Limpio el item de la pantalla
                        setting_box();
                        // box_edit_item_url(doc_id, 1);
                        // $(element).parent('li').remove();
                    } else {
                        // Si no se grabó, tira un error en pantalla
                        $(element).parent('li').css("color", "red");
                    }
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}
// Welcome BOX configuracion inicial del box
async function box_welcome() {
    try {
        const modal = document.getElementById('master_popup');
        $(modal).modal('show');

        console.log(ws_lang_data, 'ws_lang_data');

        // Intentar obtener el documento de filtros de la base de datos local
        //     const filters = await box_local_db.get('filtros');
        //    const category_list = await  L_box_db.get('category_list');
        //    const payment_type_list = await  L_box_db.get('payment_type_list');
        // const operation_type_list = await  L_box_db.get('operation_type_list');
        //     const colaboration_list = await  L_board_db.get('colaborator_list');

        /// NEW 2024

        //   var price_list = await L_catalog_db.get('price_list');
        //     var currency_list = await L_catalog_db.get('currency_list');
        //     var tax_list = await L_catalog_db.get('tax_list');

        var box_config = {
            //   ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            //     price_list: price_list.price_list,
            //      currency_list: currency_list.currency_list,
            //     tax_list: tax_list.tax,
        }

        console.log('box_config', box_config);
        /* var data = {
             //board_type_name: board_type_name,
          //   ws_info: ws_info,
          ws_lang_data: ws_lang_data,
            // ws_lang_data: ws_lang_data,
            // user_roles: user_Ctx.userCtx.roles
         }*/
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/popup/welcome_box.hbs', '#master_popup', box_config);
    } catch (err) {
        console.log('ERROR EN BOX WELCOME', err);
        Snackbar.show({
            text: err.msj,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });
    }
}
// Welcome BOX configuracion inicial del box
async function setting_boxOLD() {
    try {
        const modal = document.getElementById('master_popup');
        $(modal).modal('show');
        console.log(ws_lang_data, 'ws_lang_data');

        //      Intentar obtener el documento de filtros de la base de datos local
        //      const filters = await box_local_db.get('filtros');
        //      const category_list = await  L_box_db.get('category_list');
        //      const payment_type_list = await  L_box_db.get('payment_type_list');
        //      const operation_type_list = await  L_box_db.get('operation_type_list');
        //      const colaboration_list = await  L_board_db.get('colaborator_list');
        ///     NEW 2024

        var payment_type_list = await L_box_db.get('payment_type_list');
        var price_list = await L_catalog_db.get('price_list');
        var currency_list = await L_catalog_db.get('currency_list');
        var tax_list = await L_catalog_db.get('tax_list');
        var box_config_print = await L_catalog_db.get('box_config_print');

        var box_config = {
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            price_list: price_list.price_list,
            currency_list: currency_list.currency_list,
            tax_list: tax_list.tax,
            payment_type_list: payment_type_list.payment_type_list,
            box_config_print: box_config_print,
        }

        console.log('price_list', price_list);
        // console.log('currency_list', currency_list);
        // console.log('tax_list', tax_list);
        console.log('NEWWW box_config', box_config);
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/popup/setting_box.hbs', '#master_popup', box_config);
    } catch (err) {

        console.log('ERROR EN BOX SETTING', err);
        if (err.msj == 'missing' || err.msj == 'deleted' || err.msj == 'not_found') {
            new_payment_type_list_doc()
        }
        Snackbar.show({
            text: err.msj,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });
    }
}
// Welcome BOX configuracion inicial del box
async function setting_box() {
    try {
        const modal = document.getElementById('master_popup');
        $(modal).modal('show');

        const box_config_print_id = 'ws_' + ws_id + '_box_config_print';

        let payment_type_list, price_list, currency_list, tax_list, box_config_print;
        let payment_type_list_exists = false, price_list_exists = false, currency_list_exists = false, tax_list_exists = false, box_config_print_exists = false;

        // Obtener payment_type_list
        try {
            payment_type_list = await L_box_db.get('payment_type_list');
            payment_type_list_exists = true;
        } catch (error) {
            if (error.status === 404) {
                console.error('El documento payment_type_list no existe.');
                payment_type_list = { payment_type_list: [] };
            } else {
                throw error;
            }
        }

        // Obtener price_list
        try {
            price_list = await L_catalog_db.get('price_list');
            price_list_exists = true;
        } catch (error) {
            if (error.status === 404) {
                console.error('El documento price_list no existe.');
                price_list = { price_list: [] };
            } else {
                throw error;
            }
        }

        // Obtener currency_list
        try {
            currency_list = await L_catalog_db.get('currency_list');
            currency_list_exists = true;
        } catch (error) {
            if (error.status === 404) {
                console.error('El documento currency_list no existe.');
                currency_list = { currency_list: [] };
            } else {
                throw error;
            }
        }

        // Obtener tax_list
        try {
            tax_list = await L_catalog_db.get('tax_list');
            tax_list_exists = true;
            console.log('El documento tax_list existe.', tax_list, tax_list_exists);
        } catch (error) {
            if (error.status === 404) {
                console.error('El documento tax_list no existe.');
                tax_list = { tax_list: [] };
            } else {
                throw error;
            }
        }

        // Obtener box_config_print
        try {
            box_config_print = await L_catalog_db.get(box_config_print_id);
            box_config_print_exists = true;
        } catch (error) {
            if (error.status === 404) {
                console.error('El documento box_config_print no existe.');
                box_config_print = {
                    nombre: '',
                    telefono: '',
                    direccion: '',
                    sitio_web: ''
                };
            } else {
                throw error;
            }
        }

        var box_config = {
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,

            price_list: price_list.price_list,
            currency_list: currency_list.currency_list,
            tax_list: tax_list.tax,
            payment_type_list: payment_type_list.payment_type_list,
            box_config_print: box_config_print,

            payment_type_list_exists: payment_type_list_exists,
            price_list_exists: price_list_exists,
            currency_list_exists: currency_list_exists,
            tax_list_exists: tax_list_exists,
            box_config_print_exists: box_config_print_exists
        };

        // Renderizar la plantilla
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/popup/setting_box.hbs', '#master_popup', box_config);

    } catch (err) {
        console.error('ERROR EN BOX WELCOME', err);
        Snackbar.show({
            text: err.message || err,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });
    }
}
// Verificar si los documentos existen
async function check_document(documents_check_array) {
    try {
        // Crear un objeto para almacenar el estado de los documentos
        let documents_status = {};
        const db = L_catalog_db; // Asumiendo que estás usando esta instancia de PouchDB

        // Recorrer el arreglo de nombres de documentos
        for (let docName of documents_check_array) {
            try {
                // Intentar obtener el documento
                let doc = await db.get(docName);
                // Si se obtiene, el documento existe
                documents_status[docName] = true;
            } catch (error) {
                if (error.status === 404) {
                    // Si el error es 404, el documento no existe
                    documents_status[docName] = false;
                } else {
                    // Otros errores
                    throw error;
                }
            }
        }

        // Mostrar el estado de los documentos
        console.log('Estado de los documentos:', documents_status);

        // Puedes retornar este objeto si lo necesitas
        return documents_status;

    } catch (err) {
        Snackbar.show({
            text: err.message || err,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });
    }
}
// Welcome BOX configuracion inicial del box
async function box_facturar_mov(element) {
    try {
        const modal = document.getElementById('master_popup');
        $(modal).modal('show');
        console.log('box_facturar ws_lang_data:', ws_lang_data);

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
        const category_list = await L_box_db.get('category_list');
        const payment_type_list = await L_box_db.get('payment_type_list');
        //  const operation_type_list = await  L_box_db.get('operation_type_list');
        // const colaboration_list = await L_board_db.get('colaborator_list');

        // Si se encuentra el documento, devolver los filtros
        // Preparar los datos para la plantilla
        var ws_box_data_nav = {
            filters: filters,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            //    colaborator_list: colaboration_list,
            category_list: category_list,
            payment_type_list: payment_type_list,
            // operation_type_list:operation_type_list,
            // result: result.docs // Agregar los documentos resultantes a los datos de la plantilla
        }
        console.log('FILTROS ws_box_data_nav', ws_box_data_nav);
        // Renderizar la plantilla con los datos
        return renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/nav_bar.hbs', '#nav_bar_compiled', ws_box_data_nav);

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
async function get_box_ORIGINAL(pageNumber = 1, limit = 10) {
    try {

        //  box_welcome();
        // Obtener el documento de filtros
        const filters = await box_local_db.get('filtros');
        // let username = 'marianomarchesi@hotmail.com';  // Puedes cambiarlo según el usuario actual
        let username = 'smartmobile.com.ar@gmail.com';  // Puedes cambiarlo según el usuario actual

        console.log('filters 1', filters);

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
            inclusive_end: true,
        });


        console.log('box_mov_get/by_user_date_and_client 2', countResponse);


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


        console.log('box_mov_get/by_user_date_and_client 3', response);

        console.log('box_mov_get/by_user_date_and_client rows', response.rows);

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

        console.log('mov_content 4', mov_content);

        // Renderizar el contenido
        await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/box.hbs', '#content_compiled', mov_content);
        await get_nav_box();
        await print_mov_item(all_items_array);

        console.log('client_id:', clientList);
        console.log('startKey:', startKey, 'endKey:', endKey);
        console.log('RESULTADO DE CONSULTA:', all_items_array);
        console.log('LIMIT:', limit, 'skip:', skip, 'pageNumber:', pageNumber, 'totalFilterItems:', totalFilterItems);

    } catch (error) {


        console.log('ERROR EN BOX SETTING', err);
        if (err.msj == 'missing' || err.msj == 'deleted' || err.msj == 'not_found') {

            new_payment_type_list_doc();
        }
        Snackbar.show({
            text: err.msj,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });

        // console.error('Error al obtener los datos de la caja:', error);
    }
}

// ARMO Y Traigo el box filtrado
async function get_box(pageNumber = 1, limit = 10) {
    try {
        // box_welcome();

        // Intentar obtener el documento de filtros
        let filters;
        try {
            filters = await box_local_db.get('filtros');
        } catch (error) {
            if (error.status === 404) {
                console.log('El documento filtros no existe. Creando filtros por defecto.');
                // Crear filtros por defecto
                filters = {
                    _id: 'filtros',
                    startDate: null,
                    endDate: null,
                    limit: 10,
                    clients: [],
                    categories: [],
                    paymentTypes: []
                };
                // Guardar el documento de filtros por defecto en la base de datos
                await box_local_db.put(filters);
            } else {
                throw error;
            }
        }
        //Traigo los datos del usuario
        ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });
        // Mapeo el contenido del objeto ws_left_nav M
        ws_left_nav_data = ws_left_nav['ws_left_nav'];

        user_info = ws_left_nav.ws_left_nav;
        user_Ctx = ws_left_nav.userCtx;

        // Mapeo el contenido del objeto userCtx
        console.log('user_info user_info user_info', user_info);

        
        let username = user_info.user_email;  // Puedes cambiarlo según el usuario actual
        let startDate = filters.startDate;
        let endDate = filters.endDate;
        limit = filters.limit || 10;  // Asignar un valor predeterminado si no está definido
        var skip = (pageNumber - 1) * limit;

        // Definir listas de filtros
        let clientList = filters.clients || [];
        let categoryList = filters.categories || [];
        let paymentTypeList = filters.paymentTypes || [];

        let startKey = ["box_mov", username];
        let endKey = ["box_mov", username, {}];

        // Agregar las fechas a las claves de inicio y fin si están definidas
        if (startDate) {
            startKey.push(startDate);
        } else {
            startKey.push(null);
        }

        if (endDate) {
            endKey.push(endDate + "\ufff0");
        } else {
            endKey.push({});
        }

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

        console.log('startKey:', JSON.stringify(startKey));
        console.log('endKey:', JSON.stringify(endKey));

        // Realizar una consulta para contar todos los documentos filtrados
        let countResponse = await L_box_db.query('box_mov_get/by_user_date_and_client', {
            startkey: startKey,
            endkey: endKey,
            inclusive_end: true
        });

        console.log('countResponse:', countResponse);

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

        console.log('response:', response);

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
            payment_type_icon: doc.payment_type_icon,
            payment_type_id: doc.payment_type_id,
            payment_status: doc.payment_status,
            order_status: doc.order_status,
            status: doc.status,
            description: doc.description,

        }));

        console.log('all_items_array:', all_items_array);

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

        //  const filters = await box_local_db.get('filtros');
        //const category_list = await L_box_db.get('category_list');
        const payment_type_list = await L_box_db.get('payment_type_list');
        //  const operation_type_list = await  L_box_db.get('operation_type_list');
        // const colaboration_list = await L_board_db.get('colaborator_list');

        // Si se encuentra el documento, devolver los filtros
        // Preparar los datos para la plantilla
        var ws_box_data_nav = {
            filters: filters,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            // colaborator_list: colaboration_list,
            //  category_list: category_list,
            payment_type_list: payment_type_list,
            // operation_type_list:operation_type_list,
            // result: result.docs // Agregar los documentos resultantes a los datos de la plantilla
        }
        console.log('FILTROS ws_box_data_nav', ws_box_data_nav);

        // Renderizar el contenido
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/box.hbs', '#content_compiled', mov_content);
        await renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/box/nav_bar.hbs', '#nav_bar_compiled', ws_box_data_nav);
        //   await get_nav_box();
        await print_mov_item(all_items_array);

        console.log('client_id:', clientList);
        console.log('startKey:', startKey, 'endKey:', endKey);
        console.log('RESULTADO DE CONSULTA:', all_items_array);
        console.log('LIMIT:', limit, 'skip:', skip, 'pageNumber:', pageNumber, 'totalFilterItems:', totalFilterItems);

    } catch (error) {
        console.log('ERROR EN BOX SETTING', error);
        if (error.msj == 'missing' || error.msj == 'deleted' || error.msj == 'not_found') {
            box_welcome();
            new_payment_type_list_doc();
        }
        Snackbar.show({
            text: error.msj || error.message,
            actionText: 'Ok',
            actionTextColor: '#0575e6',
            pos: 'bottom-left',
            duration: 50000
        });

        // console.error('Error al obtener los datos de la caja:', error);
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
        limit: limit,
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
    get_box(page, limit);
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
        tax_list = await L_catalog_db.get('tax_list');
        payment_type_list = await L_box_db.get('payment_type_list');
        price_list = await L_catalog_db.get('price_list');
        currency_list = await L_catalog_db.get('currency_list');
     //   box_config_print = await L_catalog_db.get(box_config_print_id);
        const data = {
            ws_price_list: ws_price_list,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            payment_type_list:payment_type_list.payment_type_list,
            tax_list: tax_list.tax_list,
            price_list: price_list.price_list,
            currency_list: currency_list.currency_list,
        //    box_config_print: box_config_print,
        }

       console.log('data POPUP ',data);
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


///PAGO DE ORDEN CREA MOVIMIENTO

async function new_mov_pay(element) {

    //const doc_id = $(element).attr('doc_id'); //Id del documento a edita
    // const doc_id_s = String(doc_id); // Convierto el id del doc en un string
    // const doc = await L_board_db.get(doc_id_s); // Traigo el documento

    const category_id = $(element).attr('category_id'); 

    // Obtener los valores de los atributos de datos
    var new_mov_description = $('#new_mov_description').val();
    var mov_value = $('#new_mov_value').val();
    var type_mov_payment = document.getElementById('type-mov-payment-btn').getAttribute('data-type-payment');
    //var type_mov_payment_text = document.getElementById('type-mov-payment-text').getAttribute('data-text');
    var type_mov = document.getElementById('type-mov-btn').getAttribute('data-type-mov');
    var type_mov_payment_text = document.getElementById('type-mov-payment-btn').getAttribute('data-text');
    var type_mov_payment_icon = document.getElementById('type-mov-payment-btn').getAttribute('data-icon');
    //document.getElementById('type-mov-payment-btn').setAttribute('data-icon', icon);

   // console.log('formData formData. formData', formData);

    let timestamp = Date.now().toString().slice(-5);  // Get the last 5 digits of the Unix timestamp
    let letters = Array(2).fill(1).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');  // Generate 2 random letters
    const mov_id_new = letters + '-' + timestamp + '-mov';
    const new_doc_id = `${Date.now().toString()}_${Math.random().toString(36).substring(2, 15)}_${category_id}`;

    // Const { ws_id, hour, minutes } = doc;
    const entry_date = { hour, minutes } = await getDateTimeMinutes();
    ws_left_nav = await user_db.get('ws_left_nav_' + ws_id, { include_docs: true, descending: true });

    // Mapeo el contenido del objeto ws_left_nav M
    ws_left_nav_data = ws_left_nav['ws_left_nav'];
    user_Ctx = ws_left_nav.userCtx;
    user_info = ws_left_nav.ws_left_nav;

    // Mapeo el contenido del objeto userCtx
    userCtx = user_Ctx.userCtx;
    console.log('userCtx userCtx userCtx userCtx',user_Ctx,' type_mov_payment_text', type_mov_payment_text,'type_mov',type_mov,'new_mov_description',new_mov_description);
    try {

    // Map the order document to an array
let response = await L_box_db.put({
    _id: 'mov_' + new_doc_id, // Unique ID for the order
    type: 'box_mov',
    category: type_mov,
    order_id: false,
    mov_id: mov_id_new,
    entry_date: new Date(), // Fecha actual del navegador
    description:new_mov_description,
    user_name: user_info.user_name,
    client_id: user_info.user_id,
    client: {
        id: user_info.user_id,
        first_name: user_info.user_name,
        last_name:user_info.user_name,
        address: null,
        phone: null,
        email: user_info.user_email,
        price_list: null
    },
    status: 'close',
    order_status: 'close',
    // Datos comprobante
    total_service: false,
    total_products: false,
    total_tax: false,
    total_discount: false,
    total: mov_value,

    // Datos pago
    payment_type: type_mov_payment_text,
    payment_type_icon: type_mov_payment_icon,
    payment_type_id: type_mov_payment,
    payment_status: true
});    

        if (response) {
            console.log('Order processed and saved successfully in the local database.', response);
            Snackbar.show({
                text: 'Realizo el pago '+ '#mov_' + new_doc_id+' con exito!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        } else {
            Snackbar.show({
                text: 'No se pudo realizar el pago!',
                actionText: 'OK',
                actionTextColor: "#0575e6",
                pos: 'bottom-right',
                duration: 5000
            });
        }

       // console.log('Order processed and saved successfully in the local database.');
    } catch (error) {
        Snackbar.show({
            text: 'No se pudo realizar el pago!',
            actionText: 'OK',
            actionTextColor: "#0575e6",
            pos: 'bottom-right',
            duration: 5000
        });
        console.error('Error processing and saving the order in the local database:', error);
    }
}

