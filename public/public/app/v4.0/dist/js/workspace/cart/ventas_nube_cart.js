/// Funciones de cart modulos

/*! VentasNube store cart.js 3.0
 * ================
 * Main JS application file for VentasNube v3.0 This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive VentasNube plugins.
 *
 * @Author  Ventas Nube
 * @Support <http://www.ventasnube.com>
 * @Email   <ventasnube.com@gmail.com>
 * @version 3.0
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//###########################################################################
//Inicializacion de APP WPA OFFLINE  2021
//Instalacion de Dases de datos y documentos.
//###########################################################################

//Funcion que chekea el ultimo estado del cart
function chek_cart_open_ws() {
    var cart_open = readCookie("left_nav_open_ws_" + ws_id);
    if (cart_open == 'true') {
        $('#right_main').addClass('move-right');
    } else if (cart_open == 'false') {
        $('#right_main').removeClass('move-right');
    }
}

async function get_right_cart(ws_info, ws_lang_data, ws_left_nav_data, board_name) {
    try {
        if (!board_name) {
            board_name = readCookie('board-now-' + ws_id); // LEO LA COKIE PARA SABER EN Q MODULO ESTABA
        }
        var price_doc = await L_catalog_db.get('price_list');
        var currency_doc = await L_catalog_db.get('currency_list');
        var ws_cart = {
            price_doc: price_doc,
            currency_doc: currency_doc,
            ws_lang_data: ws_lang_data,
            user_roles: user_Ctx.userCtx.roles,
            module_name: 'board',
            board_type_name: board_name,
            ws_info: ws_info,
            ws_lang_data: ws_lang_data,
            ws_left_nav_data: ws_left_nav_data
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/cart/cart_main.hbs', '#right_main', ws_cart);
        get_cart(ws_id, board_name);
        get_fav(ws_id, board_name);
        get_search_module(ws_info, ws_lang_data, ws_left_nav_data, ws_cart, board_name);
        // chek_search_open()
        // search_open();
    }
    catch (err) {
        console.log(err);
    }
};

// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_cart(ws_id, board_name) {

    if (!board_name) {
        board_name = readCookie('board-now-' + ws_id);
    }
    let response = await user_db.query(
        'get-cart-' + ws_id + '/cart-item-' + board_name, {
        include_docs: true,
        descending: true
    }
    ); //Conceto con la vista de diseno
    if (response.rows) {
        const result = response.rows;
        return all_cart_item(result);
    }
    else {
        return all_cart_item(false);
    }
}


// Traigo los datos del cart actual
async function get_cart_now(elemnt) {
    try {
        // Crear la cookie
        // Leer el valor de la cookie usando una variable
        board_name = readCookie('board-now-' + ws_id); //LEO LA COKIEE DEL BOARD
        createCookie('left_nav_open_ws_' + ws_id, false), 30;//tomo el ultimo estado de la barra lateral
        $('#right_main').removeClass('move-right');
        $('#cart_user_input').focus();
        var response = await get_right_cart(ws_info, ws_lang_data, ws_left_nav_data, board_name);

        if (response) {
            $('#searchBox').fadeIn();
            $('#searchInput').focus();
            $('body').addClass('search-active');
        }
        // createCookie('search-now-' + ws_id,  true, 30);//CREO UNA COKIE CON EL ULTIMO NOMBRE DE LA BOARD

    } catch (error) {
        console.error("Ocurrió un error al procesar el carrito: ", error);
    }
}


// Creo los arrays con los datos de la BD
async function all_cart_item_OLD_Ok(todos) {
    try {
        let array_cart_items = [];
        //Creo los array
        var total_quantity_cart_item = 0
        var total_cart_neto = 0; //TOTAL NETO    
        var total_neto_prod = 0; //Total productos 
        var total_neto_service = 0; //Total Servicios    
        var total_neto_tax = 0; //Impuestos    
        var total_neto_discount = 0; //Descuentos
        var total_neto_pay = 0; //Abonado
        var total_product = 0;
        var total_service = 0;
        var sub_tot_item = 0;
        var total_neto_item = 0;

        todos.map(function (todo) {
            var type_item = todo.doc.variant['type'];
            //calculos matematicos para armar el Carrito
            var quantity = todo.doc.variant['quantity'];
            //Valores
            var price = todo.doc.variant['price'];
            // var price_cost = todo.doc.variant['price_cost'];
            var price_tot = price * quantity;
            var tax = todo.doc.variant.tax;
            var tax_name = todo.doc.variant.tax_name;
            var money_value = todo.doc.variant.currency;

            //Descuentos
            var sub_tot_product = 0;
            var sub_tot_service = 0;
            var discount = todo.doc.variant['discount'];

            if (!discount) { discount = 0 };
            var discount_tot = Math.round((discount / 100) * price_tot);
            if (type_item === 'product') {
                var sub_tot_product = Math.round(price_tot - discount_tot);
                total_neto_prod += +sub_tot_product;
                sub_tot_item = sub_tot_product;
                total_neto_item = total_neto_prod;
                total_product = total_neto_prod;
            }
            if (type_item === 'service') {
                var sub_tot_service = Math.round(price_tot - discount_tot);
                total_neto_service += +sub_tot_service;
                sub_tot_item = sub_tot_service;
                total_neto_item = total_neto_service;
                total_service = total_neto_service;
            }
            //Cargo los datos del array
            var cart_item = {
                _id: todo.doc['_id'],
                _rev: todo.doc['_rev'],
                variant_id: todo.doc.variant['_id'],
                sku: todo.doc.variant['sku'],
                tax: tax,
                tax_name: tax_name,
                money_value: money_value,
                pictures: todo.doc.variant['pictures'], //Img
                name: todo.doc.variant['name'], //Name
                quantity: quantity, //Cantidad
                price: price, //Price
                price_tot: price_tot, //Total del item
                discount: discount, //Discount
                discount_tot: discount_tot, //Tot Discount
                sub_tot: todo.doc.variant['price'],
                sub_tot_dis: total_neto_item
            };
            //Creo el array con todos los items
            array_cart_items.push(cart_item);
            total_quantity_cart_item = array_cart_items.length;
            //Sumas de tototales
            total_neto_discount += +discount_tot;
            total_neto_tax += +tax;
        });
        //Creo el array nuevo con los items
        var cart_items = {
            items_product: array_cart_items,
        };
        // Imprimo todos los items en un solo render asi es mas rapido
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/cart/cart_item.hbs', '#product_cart_items', cart_items);
    } catch (err) {
        console.error('inner', err);
        throw err;
    } finally {
        //Finally es la funcion que emite el resultado final despues de esperar todo e codigo ok
        total_product = parseFloat(total_neto_prod); // Asume que #total_product y #total_service son elementos que contienen los valores numéricos.
        total_service = parseFloat(total_service);
        total_cart_neto = total_product + total_service; // Suma los dos valores
        $('#total_cart_neto').text(total_cart_neto.toFixed(2));
        $('.cart_n').text(total_quantity_cart_item);
        $('#total_neto_prod').text(total_product.toFixed(2));
        $('#total_neto_service').text(total_service.toFixed(2));
        $('#total_neto_discount').text(total_neto_discount.toFixed(2));
        $('#total_neto_tax').text(total_neto_tax.toFixed(2));
        $('#total_neto_pay').text(total_neto_pay.toFixed(2));
        chek_cart_open_ws();
        return;
    }
}

async function get_price_cost(doc_id,variant_id){

    try{
        var doc = await L_catalog_db.get(String(doc_id));
        var get_variant_id = doc.variations.find(response => response.id == variant_id);
    
            var stock_invetary = get_variant_id['stock_invetary'];
            var count_out_stock = out_stock_s;
    
            for (var i = stock_invetary.length - 1; i >= 0; i--) {
                //Compruebo q tenga stock mayor a 1
                var real_stock = stock_invetary[i].real_stock;
                var out_stock = stock_invetary[i].out_stock;
                //si el stock es mayor o igual a 1 tomo ese valor y le resto el out stock
                if (real_stock >= 1 && count_out_stock >= 1) {
                    // Hago el descuento uno por uno hasta llegar a 0 y gravo la variable con el resutado
                    for (var i2 = count_out_stock - 1; i2 >= 0; i2--) {
                        var real_stock = real_stock - 1;
                        var out_stock = out_stock += 1;
                        var count_out_stock = count_out_stock - 1;
                        //Compruebo que queda stock disponible
                        if (real_stock <= 0) {
                            // Si no hay mas stock paro y guardo el resultado en el array
                            var stock_invetary_new = stock_invetary[i];
                            stock_invetary_new.real_stock = real_stock;
                            stock_invetary_new.out_stock = out_stock;
                            stock_invetary_new.update_datetime = newDate;
                            stock_invetary_new.updateUser = userName;
                            break
                        } else {
                            continue;
                        }
                    }
                    // EDITO EL ARRAY 
                    var stock_invetary_new = stock_invetary[i];
                    stock_invetary_new.real_stock = real_stock;
                    stock_invetary_new.out_stock = out_stock;
                    stock_invetary_new.update_datetime = newDate;
                    stock_invetary_new.updateUser = userName;
                }
    
            }
            //Modifico los datos del array viejo por el nuevo

            var stock_invetary = stock_invetary;

            return stock_invetary;

    }
    catch(err){
        Snackbar.show({
            text: err,
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Recargar',
            actionTextColor: "#dd4b39",
            onActionClick: function (element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
            }
        });
        console.log(err);

    }
  
}


// Creo los arrays con los datos de la BD
async function all_cart_item(todos) {
    event.preventDefault
    try {
        let array_cart_items = [];
        //Creo los array
        var total_quantity_cart_item = 0
        var total_cart_neto = 0; //TOTAL NETO    
        var total_neto_prod = 0; //Total productos 
        var total_neto_service = 0; //Total Servicios    
        var total_neto_tax = 0; //Impuestos    
        var total_neto_discount = 0; //Descuentos
        var total_neto_pay = 0; //Abonado
        var total_product = 0;
        var total_service = 0;
        //  var sub_tot_item = 0;
        //   var total_neto_item = 0;
        var discount_tot_sum = 0;
        var tax = 0;
        todos.map(function (todo) {
            var type_item = todo.doc.variant['type'];
            var quantity = todo.doc.variant['quantity'];
            var discount = todo.doc.variant['discount'];
            var price = todo.doc.variant['price'];
            var sub_tot_dis = todo.doc.variant['sub_tot_dis'];
            //  var price_cost = todo.doc.variant['price_cost'];
            var price_tot = price * quantity;

            var taxes = todo.doc.variant['taxes'];
           // var tax_name = todo.doc.variant['tax_name'];
            var currency = todo.doc.variant['currency'];
           // var currency_value = currency.value;
            
            console.log('currency AAAAAA ULTIMATE',currency)
            //  var total_price_cost_profit = price_cost * quantity;
            //Descuentos
            //  var sub_tot_product = 0;
            //  var sub_tot_service = 0 ;
            //sumo el total de descuentos
            discount_tot_sum += +discount;
            var discount_tot = discount;

            if (type_item === 'product') {
                //var sub_tot_product = Math.round(price_tot - discount_tot);
                total_neto_prod += +price_tot;
                total_product = total_neto_prod;
               // price_cost_tot += +price_tot;
             //   price_cost_profit = total_price_cost_profit;
            }
            if (type_item === 'service') {
                total_neto_service += +price_tot;
                total_service = total_neto_service;
               // price_cost_tot += +price_tot;
               // price_cost_profit = 
            }
            //Cargo los datos del array
            var cart_item = {
                _id: todo.doc['_id'],
                _rev: todo.doc['_rev'],
                variant_id: todo.doc.variant['_id'],
                sku: todo.doc.variant['sku'],
                taxes: taxes,
                // tax_name: tax_name,
                currency: currency,
                pictures: todo.doc.variant['pictures'], //Img
                name: todo.doc.variant['name'], //Name
                quantity: quantity, //Cantidad
                price: price, //Price
                price_tot: price_tot, //Total del item
                discount: discount, //Discount
                discount_tot: discount_tot, //Tot Discount
                sub_tot: price,
                sub_tot_dis: sub_tot_dis
            };
            //Creo el array con todos los items
            array_cart_items.push(cart_item);
            total_quantity_cart_item = array_cart_items.length;
            //Sumas de tototales
            total_neto_discount += +discount_tot;
            total_neto_tax += +tax;
        });
        //Creo el array nuevo con los items
        var cart_items = {
            items_product: array_cart_items,
        };
        // Imprimo todos los items en un solo render asi es mas rapido
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/cart/cart_item.hbs', '#product_cart_items', cart_items);
    } catch (err) {
        console.error('inner', err);
        throw err;
    } finally {
        //Finally es la funcion que emite el resultado final despues de esperar todo e codigo ok
        total_product = parseFloat(total_neto_prod); // Asume que #total_product y #total_service son elementos que contienen los valores numéricos.
        total_service = parseFloat(total_service);
        total_cart_neto = total_product + total_service; // Suma los dos valores
        // Valores de costo

       // total_cart_cost = parseFloat(price_cost_tot);
      //  total_cart_profit = parseFloat(price_cost_profit);

        $('#total_cart_neto').text(total_cart_neto.toFixed(2));
        $('.cart_n').text(total_quantity_cart_item);
        $('#total_neto_prod').text(total_product.toFixed(2));
        $('#total_neto_service').text(total_service.toFixed(2));
        $('#total_neto_discount').text(total_neto_discount.toFixed(2));
        $('#total_neto_tax').text(total_neto_tax.toFixed(2));
        $('#total_neto_pay').text(total_neto_pay.toFixed(2));
        chek_cart_open_ws();
        return;
    }
}

// Traer los item leyendo de la pounchDB
//Nueva funcion de agregar al producto al carrito
async function variations_add_cart(element) {

    event.preventDefault();
    try {

       
        //Busco el id en el array con find funcion de flecha
        //  var stock_invetary = doc.variations['stock_invetary'].find(element => element.id == variant_id);
 
        let product_id = $(element).attr('product_id'); //Id del producto selccionado
        let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
        // let variant_price_id = $(element).attr('variant_price_id');
        var this_card_id = '#card_id_' + product_id; //Id del producto Seleccionado
        let variant_price = $('#card_var_id_' + product_id).find('.card_product_val').val(); //Tomo el valor del formulario
        let variant_discount = $('#card_var_id_' + product_id).find('.card_product_discount').val(); //Tomo el valor del formulario
        let variant_quantity = $('#card_var_id_' + product_id).find('.card_product_quantity').val(); //Tomo el valor del formulario
        let variant_price_id = $('#card_var_id_' + product_id).attr('price_id'); //Tomo el valor del formulario
        // let variant_price_id = $('#card_var_id_' + product_id).find('.card_product_val').val(); //Tomo el valor del formulario
        
        //  PRODUCTO
        let doc = await L_catalog_db.get(product_id);
        //  VARIABLE COMPLETA
        const var_doc = doc.variations.find(element => element.id == variant_id);
    
        //  const tax_product = tax_arr.find(element => element.id == variant_price_id);
        //  TAX CONFIGURACION GENERAL
        const tax_list = await L_catalog_db.get("tax_list");

        //RELACIONO CON EL ID Q ESTA GUARDADO EN EL PRODUCTO 
        //   const tax_list_config = tax_list.tax.find(element => element.id == variant_id);
        const price_list = var_doc.price_list.find(element => element.id == variant_price_id);
        // let price_cost = await get_price_cost(product_id,variant_id)

        const tax_price_list = var_doc.price_list.find(element => element.id == variant_price_id);
        //TAX DEL PRODUCTO
        console.log("TAXESS variant_price_id",variant_price_id)

        console.log(" tax_price_list", tax_price_list)
       
       // console.log("TAXESS",tax_price_list)
        const tax_arr = tax_price_list.taxes
        

        console.log("tax_arr taxes",tax_arr)
        // Ya tienes la lista de impuestos para la variante del producto
        //const tax_arr = var_doc.tax;
        // Aquí calculamos el precio final con impuestos
        let price_final_with_tax = parseFloat(variant_price); // iniciamos con el precio base
        let applied_taxes = []; // inicializamos el array de impuestos aplicados

        if (tax_arr && Array.isArray(tax_arr)) {
            for (const tax of tax_arr) {
                // Buscar la configuración del impuesto en la lista general de impuestos
                const tax_config = tax_list.tax.find(element => element.id == tax.id);
                if (tax_config) {
                    // Calcular el impuesto y sumarlo al precio final
                    const tax_amount = (price_final_with_tax * tax_config.value) / 100;
                    price_final_with_tax += tax_amount;
                    applied_taxes.push({ name: tax_config.name, price_tax: tax_amount, value: tax_config.value });
   
                }
            }
        }


         //calculos matematicos para armar el Carrito
         var quantity = variant_quantity;
         //Valores
         var price = price_final_with_tax;
         //  var price_cost = todo.doc.variant['price_cost'];
         var price_tot = price * quantity;
         // Hago descuentos del item y la suma total
         // console.log("TAX LISTTTT",tax_list)
         // var tax = 21;
         // var tax_name = 'iva';
        var taxes = applied_taxes;
        var currency = price_list.currency['value'];
        //var currency_default = currency_doc.currency_default;
        //Descuentos
        var discount = variant_discount;
        if (!discount) { discount = 0 };
        var discount_tot = Math.round((discount / 100) * price_tot);
        var sub_tot_product = Math.round(price_tot - discount_tot);
        var sub_tot_dis = sub_tot_product;

        // console.log(var_doc);
        //  const price_list = var_doc.price_list.find(element => element.id == variant_price_id);

        const new_variant_doc = {
            product_id: product_id,
            product_rev: doc._rev,
            type: doc.type,
            variant_id: var_doc.variant_id,
            id: var_doc.variant_id,
            sku: var_doc.sku.value,
            pictures: var_doc.pictures,
            name: doc.name,
            attribute_combinations: var_doc.attribute_combinations,
            price: parseFloat(variant_price),
            discount: parseFloat(variant_discount),
            quantity: parseFloat(variant_quantity),
            sub_tot_dis: parseFloat(sub_tot_dis),
            discount_tot: parseFloat(discount_tot), //Tot Discount
            taxes: taxes,
            //tax_name: tax_name,
            currency: currency,

        }

        console.log('new_variant_doc',new_variant_doc);
       console.log('CURRENCY',currency);
       console.log('TAXEDS',taxes);
       console.log('price_list',price_list);
        //alert(var_doc.tax['value']);
        if (validaForm(variant_price, variant_discount, variant_quantity)) { // Primero validará el formulario.
            $(this_card_id).find(".ripple_div").addClass('add');
            $(this_card_id).find(".content").addClass('ripple_efect');
            add_cart_item(new_variant_doc);

            $("#cart_item_tab").addClass('active in');
            $("#cart_item_tab_icon").addClass('active');
            $("#new_item_tab").removeClass('active in');
            $("#new_item_tab_icon").removeClass('active');
            //Activo la animacion del tab favoritos
            $("#fav_item_tab").removeClass('active in');
            $("#fav_item_tab_icon").removeClass('active');

        }
        //    renderHandlebarsTemplate(url_template, id_copiled, variant_array);


    }
    catch (err) {
        Snackbar.show({
            text: err,
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Recargar',
            actionTextColor: "#dd4b39",
            onActionClick: function (element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
            }
        });
        console.log(err);

    }

};



async function variations_add_cart_NEWNO(element) {

    try {
        event.preventDefault();
        //Identificadores
        let product_id = $(element).attr('product_id'); //Id del producto selccionado
        let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
        var this_card_id = '#card_id_' + product_id; //Id del producto Seleccionado
        var board_name = readCookie('board-now-' + ws_id);

        /* let variant_quantity = $(element).attr('quantity'); //Id de la variable seleccionada
         let variant_price = $(element).attr('price'); //Id de la variable seleccionada
         let variant_discount = $(element).attr('discount'); //Id de la variable seleccionada
         let variant_price_cost = $(element).attr('price_cost'); //Id de la variable seleccionada
 */
        let variant_price = $('#card_var_id_' + product_id).find('.card_product_val').val(); //Tomo el valor del formulario
        let variant_discount = $('#card_var_id_' + product_id).find('.card_product_discount').val(); //Tomo el valor del formulario
        let variant_quantity = $('#card_var_id_' + product_id).find('.card_product_quantity').val(); //Tomo el valor del formulario

        let doc = await L_catalog_db.get(product_id);
        if (doc) {
            const var_doc = doc.variant;
            //  const tax = var_doc.tax.value;
            //    const tax_name = var_doc.tax.name;
            // console.log(var_doc);
            const new_variant_doc = {
                product_id: product_id,
                product_rev: doc._rev,
                type: doc.type,
                variant_id: var_doc.variant_id,
                id: var_doc.variant_id,
                sku: var_doc.sku.value,
                pictures: var_doc.pictures,
                name: doc.name,
                attribute_combinations: var_doc.attribute_combinations,
                price: parseFloat(variant_price),
                discount: parseFloat(variant_discount),
                quantity: parseFloat(variant_quantity),
                // tax: parseFloat(tax),
                //  tax_name: tax_name,
                currency: var_doc.price_list[0].currency.value,
            }

            let rest_add = await add_cart_item(new_variant_doc);
            // let delete_doc = await user_db.remove(doc._id,doc._rev);
            if (rest_add) {
                get_cart(ws_id, board_name);
                $(this_card_id).find(".ripple_div").addClass('add');
                $(this_card_id).find(".content").addClass('ripple_efect');
                $("#cart_item_tab").addClass('active in');
                $("#cart_item_tab_icon").addClass('active');
                $("#new_item_tab").removeClass('active in');
                $("#new_item_tab_icon").removeClass('active');
                //   Activo la animacion del tab favoritos
                $("#fav_item_tab").removeClass('active in');
                $("#fav_item_tab_icon").removeClass('active');
            }

        }

    } catch (err) {
        Snackbar.show({
            text: err,
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Recargar',
            actionTextColor: "#dd4b39",
            onActionClick: function (element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
            }
        });
        console.log(err);
    }
};




async function variations_add_cart_to_fav(element) {

    try {
        event.preventDefault();
        //Identificadores
        let product_id = $(element).attr('product_id'); //Id del producto selccionado
        let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
        var this_card_id = '#card_id_' + product_id; //Id del producto Seleccionado
        var board_name = readCookie('board-now-' + ws_id);

        let variant_quantity = $(element).attr('quantity'); //Id de la variable seleccionada
        let variant_price = $(element).attr('price'); //Id de la variable seleccionada
        let variant_discount = $(element).attr('discount'); //Id de la variable seleccionada
        let variant_price_cost = $(element).attr('price_cost'); //Id de la variable seleccionada

        let doc = await user_db.get(product_id);
        if (doc) {
            const var_doc = doc.variant;
            // console.log(var_doc);
            const new_variant_doc = {
                product_id: doc._id,
                product_rev: doc._rev,
                variant_id: var_doc.variant_id,
                id: var_doc.variant_id,
                sku: var_doc.sku.value,
                pictures: var_doc.pictures,
                name: var_doc.name,
                attribute_combinations: var_doc.attribute_combinations,
                price: parseFloat(var_doc.price),
                price_cost: parseFloat(var_doc.price_cost),
                discount: parseFloat(var_doc.discount),
                quantity: parseFloat(var_doc.quantity),
                tax: parseFloat(var_doc.tax)
            }
            let rest_add = await add_cart_item(new_variant_doc);
            let delete_doc = await user_db.remove(doc._id, doc._rev);
            get_fav(ws_id, board_name);
            if (rest_add) {



            }

        }


    } catch (err) {
        Snackbar.show({
            text: 'Hay un conflicto',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Recargar',
            actionTextColor: "#dd4b39",
            onActionClick: function (element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
            }
        });
        console.log(err);
    }
};

//Validador de datos antes de enviar el form
function validaForm(card_product_val, card_product_discount, card_product_quantity) {
    // Campos de texto
    if (card_product_val == 0) {
        alert("El valor del producto no puede estar vacío.");
        $(this).parents('.card-product').find(".card_product_val").focus(); // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if (card_product_discount >= 20) {
        alert("El valor descuento no puede superar el 20%.");
        $(this).parents('.card-product').find(".card_product_discount").focus();
        return false;
    }
    if (card_product_quantity == 0) {
        alert("El cantidad de productos ser 0");
        $(this).parents('.card-product').find(".card_product_quantity").focus();
        return false;
    } else {
        // alert("El producto se agrego con exito!");
        return true; // Si todo está correcto
    }

}

// Agreagar productos al carrito
async function add_cart_item(data) {

    try {
        var board_name = readCookie('board-now-' + ws_id);//LEO LA COKIE
        var response = await user_db.put({
            _id: new Date().toISOString(),
            _id: 'cart-item-' + board_name + new Date().toISOString(),
            type: 'cart-item-' + board_name,
            ws_id: ws_id,
            update: new Date().toISOString(),
            variant: data //Array new_variant_doc
        });
        console.log(data)
        if (response.ok) {
            get_cart(ws_id, board_name);
            Snackbar.show({
                text: ' <span class="material-icons">add_shopping_cart</span> <span class="round-icon pr">' + data.quantity + ' </span>   ' + data.name,
                width: '475px',
                pos: 'bottom-right',
                actionText: 'Deshacer ',
                actionTextColor: "#4CAF50",
                onActionClick: function (element) {     //Set opacity of element to 0 to close Snackbar
                    $(element).css('opacity', 0);
                    user_db.remove(response.id, response.rev);   //Set opacity of element to 0 to close Snackbar                    
                    $('#' + response.id).remove();
                }
            });
        }
    } catch (err) {
        Snackbar.show({
            text: '<span class="round-icon pr">' + data.quantity + '</span> ' + data.name + '<?= lang("Body.b_error") ?>',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Recargar',
            actionTextColor: "#dd4b39",
            onActionClick: function (element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
                add_cart_item(data);
            }
        });
        console.log(err);
    }
}

// Eliminar productos del carrito
async function dell_cart_item(element) {

    var item_cart_id = $(element).attr('item_cart_id');
    var item_cart_rev = $(element).attr('item_cart_rev');
    //dell_product(item_cart_id, item_cart_rev);
    try {
        user_db.remove(item_cart_id, item_cart_rev);   //Set opacity of element to 0 to close Snackbar    
        get_cart(ws_id);
      
    } catch (err) {
        Snackbar.show({
            text: 'Hay un conflicto',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Recargar',
            actionTextColor: "#dd4b39",
            onActionClick: function (element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
                //    alert('Clicked Called!');
                //add_product(card_product_id, card_product_img_url, card_product_name, card_product_val, card_product_discount, card_product_quantity);
                //  location.reload();   
            }
        });
        console.log(err);
    }
}


$(document).on('click', '.right_nav_close', function (event) {
    createCookie('left_nav_open_ws_' + ws_id, true), 30;
    $('#right_main').addClass('move-right');
});


/** ############# FUCNIONES FAVORITOS  ############## *****/
// Agreagar productos al favoritos
// Trae los datos de la local user DB filtrado por tipo cart-items

async function get_fav(ws_id, board_name) {

    if (!board_name) {
        board_name = readCookie('board-now-' + ws_id);
    }
    // Traigo los resultados de una vista
    let response = await user_db.query(
        'get-cart-' + ws_id + '/fav-item-' + board_name, {
        include_docs: true,
        descending: true
    }
    ); //Conceto con la vista de diseno
    if (response.rows) {
        const result = response.rows;

        console.log('FAVVVV', result)
        return all_fav_item(result);
    }
    else {
        return all_fav_item(false);
    }
}

// Creo los arrays con los datos de la BD
async function all_fav_item(todos) {
    try {
        let array_cart_items = [];
        // let cart_item = [];
        //Creo los array
        var total_quantity_cart_item = 0
        var total_cart_neto = 0; //TOTAL NETO    
        var total_neto_prod = 0; //Total productos 
        var total_neto_service = 0; //Total Servicios    
        var total_neto_tax = 0; //Impuestos    
        var total_neto_discount = 0; //Descuentos
        var total_neto_pay = 0; //Abonado

        todos.map(function (todo) {
            //let prod_img = todo.doc.img.min;
            //calculos matematicos para armar el Carrito
            var quantity = todo.doc.variant['quantity'];
            //Valores
            var price = todo.doc.variant['price'];
            var price_tot = price * quantity;
            var tax = todo.doc.variant['tax'];
            //Descuentos
            var discount = todo.doc.variant['discount'];
            var discount_tot = Math.round((discount / 100) * price_tot);
            var sub_tot_dis = Math.round(price_tot - discount_tot);
            //Cargo los datos del array
            var cart_item = {
                _id: todo.doc['_id'],
                _rev: todo.doc['_rev'],
                variant_id: todo.doc.variant['id'],
                sku: todo.doc.variant['sku'],
                tax: tax,
                pictures: todo.doc.variant['pictures'], //Img
                name: todo.doc.variant['name'], //Name
                quantity: quantity, //Cantidad
                price: price, //Price
                price_tot: price_tot, //Total del item
                discount: discount, //Discount
                discount_tot: discount_tot, //Tot Discount
                sub_tot: todo.doc.variant['price'],
                sub_tot_dis: sub_tot_dis
            };

            //Creo el array con todos los items
            array_cart_items.push(cart_item);
            total_quantity_cart_item = array_cart_items.length;
            //Sumas de tototales
            total_neto_prod += +sub_tot_dis;
            total_cart_neto += +(sub_tot_dis + total_neto_service);
            //  total_neto_service += +total_neto_service;
            total_neto_discount += +discount_tot;
            total_neto_tax += +tax;
            //console.log('TOTAL DE ITEMS EN EL CARRITO' + JSON.stringify(total_cart_neto));
        });
        //Creo el array nuevo con los items
        var cart_items = {
            items_product: array_cart_items,
        };
        // Imprimo todos los items en un solo render asi es mas rapido
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/cart/fav_item.hbs', '#product_fav_items', cart_items);
        //Limpio la animacion del tab cart
        //console.log('TODOS TODo-3 ------- ----' + JSON.stringify(cart_item));
    } catch (ex) {
        console.error('inner', ex.message);
        throw ex;
    } finally {
        //Finally es la funcion que emite el resultado final despues de esperar todo e codigo ok
        // alert('finally' + total_neto_prod + '----' + total_quantity_cart_item);
        /*  $('#total_cart_neto').text(total_cart_neto);
          $('#total_neto_prod').text(total_neto_prod);
          // $('#total_neto_service').text(total_neto_service);
          $('#total_neto_discount').text(total_neto_discount);
          $('#total_neto_tax').text(total_neto_tax);
          $('#total_neto_pay').text(total_neto_pay);*/
        // alert(total_quantity_cart_item);
        $('.fav_count').text(total_quantity_cart_item);
        //   get_cart_change();
        return;
    }
}

//Nueva funcion de agregar al producto al favoritos
function variations_add_fav_OLD_NO(element) {
    event.preventDefault();
    //Identificadores"cart-fav-item-purcharse2023-07-08T23:15:39.683Z"
    let product_id = $(element).attr('product_id'); //Id del producto selccionado
    let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
    var this_card_id = '#card_id_' + product_id; //Id del producto Seleccionado
    //Detalles
    let variant_name = $('#var_btn_' + product_id).find('var_name').html(); //Nombre de variable seleccionada
    let variant_pic = $('#var_btn_' + product_id).find('img-card-mini').attr('src'); //Pic de variable seleccionada
    //Valores
    let variant_price = $('#card_var_id_' + product_id).find('.card_product_val').val(); //Tomo el valor del formulario
    let variant_discount = $('#card_var_id_' + product_id).find('.card_product_discount').val(); //Tomo el valor del formulario
    let variant_quantity = $('#card_var_id_' + product_id).find('.card_product_quantity').val(); //Tomo el valor del formulario
    //Busco el doc por id actualizado y hago la carga de datos
    console.log(element);
    L_catalog_db.get(product_id, function (err, doc) {
        if (err) { return console.log(err); }
        //Busco el id en el array con find funcion de flecha
        const var_doc = doc.variations.find(element => element.id == variant_id);

        const new_variant_doc = {
            product_id: product_id,
            product_rev: var_doc._rev,
            variant_id: variant_id,
            id: variant_id,
            sku: var_doc.sku.value,
            pictures: var_doc.pictures,
            name: doc.name,
            attribute_combinations: var_doc.attribute_combinations,
            price: parseFloat(variant_price),
            discount: parseFloat(variant_discount),
            quantity: parseFloat(variant_quantity),
            tax: parseFloat(var_doc.tax)
        }

        if (validaForm(variant_price, variant_discount, variant_quantity)) { // Primero validará el formulario.
            $(this_card_id).find(".ripple_div").addClass('add');
            $(this_card_id).find(".content").addClass('ripple_efect');
            add_fav_item(new_variant_doc);
            //  console.log(new_variant_doc);
        }
        //    renderHandlebarsTemplate(url_template, id_copiled, variant_array);
    });
    return false;
};


async function variations_add_fav(element) {

    event.preventDefault();
    try {
        //Busco el id en el array con find funcion de flecha
        //  var stock_invetary = doc.variations['stock_invetary'].find(element => element.id == variant_id);
 
        let product_id = $(element).attr('product_id'); //Id del producto selccionado
        let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
       // let variant_price_id = $(element).attr('variant_price_id');
        var this_card_id = '#card_id_' + product_id; //Id del producto Seleccionado
        let variant_price = $('#card_var_id_' + product_id).find('.card_product_val').val(); //Tomo el valor del formulario
        let variant_discount = $('#card_var_id_' + product_id).find('.card_product_discount').val(); //Tomo el valor del formulario
        let variant_quantity = $('#card_var_id_' + product_id).find('.card_product_quantity').val(); //Tomo el valor del formulario

        let variant_price_id = $('#card_var_id_' + product_id).attr('price_id'); //Tomo el valor del formulario
       // let variant_price_id = $('#card_var_id_' + product_id).find('.card_product_val').val(); //Tomo el valor del formulario

        // TRAIGO EL PRODUCT DOC
        let doc = await L_catalog_db.get(product_id);
        //Busco el id en el array con find funcion de flecha
        const var_doc = doc.variations.find(element => element.id == variant_id);
        const price_list = var_doc.price_list.find(element => element.id == variant_price_id);

        const tax_doc = var_doc.tax
        // let price_cost = await get_price_cost(product_id,variant_id)
        //calculos matematicos para armar el Carrito
        var quantity = variant_quantity;
        //Valores
        var price = variant_price;
        //  var price_cost = todo.doc.variant['price_cost'];
        var price_tot = price * quantity;

        // Hago descuentos del item y la suma total
        var tax = tax_doc['value'];
        var tax_name = tax_doc['name'];
        //var tax_id = tax_doc.id;
        var currency = price_list.currency['value'];
        //var currency_default = currency_doc.currency_default;
        //Descuentos
        var discount = variant_discount;
        if (!discount) { discount = 0 };
        var discount_tot = Math.round((discount / 100) * price_tot);
        var sub_tot_product = Math.round(price_tot - discount_tot);
        var sub_tot_dis = sub_tot_product;

        // console.log(var_doc);

      //  const price_list = var_doc.price_list.find(element => element.id == variant_price_id);

        const new_variant_doc = {
            product_id: product_id,
            product_rev: doc._rev,
            type: doc.type,
            variant_id: var_doc.variant_id,
            id: var_doc.variant_id,
            sku: var_doc.sku.value,
            pictures: var_doc.pictures,
            name: doc.name,
            attribute_combinations: var_doc.attribute_combinations,
            price: parseFloat(variant_price),
            discount: parseFloat(variant_discount),
            quantity: parseFloat(variant_quantity),
            sub_tot_dis: parseFloat(sub_tot_dis),
            discount_tot: parseFloat(discount_tot), //Tot Discount
            tax: parseFloat(tax),
            tax_name: tax_name,
            tax_doc:tax_doc,
            currency: currency,
        }

        console.log('new_variant_doc',new_variant_doc);
       console.log('CURRENCY',currency);
       console.log('price_list',price_list);
        //alert(var_doc.tax['value']);
        if (validaForm(variant_price, variant_discount, variant_quantity)) { // Primero validará el formulario.
            $(this_card_id).find(".ripple_div").addClass('add');
            $(this_card_id).find(".content").addClass('ripple_efect');
            add_fav_item(new_variant_doc);

            $("#cart_item_tab").addClass('active in');
            $("#cart_item_tab_icon").addClass('active');
            $("#new_item_tab").removeClass('active in');
            $("#new_item_tab_icon").removeClass('active');
            //Activo la animacion del tab favoritos
            $("#fav_item_tab").removeClass('active in');
            $("#fav_item_tab_icon").removeClass('active');

        }
        //    renderHandlebarsTemplate(url_template, id_copiled, variant_array);


    }
    catch (err) {
        Snackbar.show({
            text: err,
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Recargar',
            actionTextColor: "#dd4b39",
            onActionClick: function (element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
            }
        });
        console.log(err);

    }

};




async function add_fav_item(data, board_name) {
    // console.log(data);
    try {

        if (!board_name) {
            board_name = readCookie('board-now-' + ws_id);
        }
        // console.log("get_right_cart board_name:"+board_name);
        var response = await user_db.put({
            _id: 'cart-fav-item-' + board_name + new Date().toISOString(),
            type: 'fav-item-' + board_name,
            ws_id: ws_id,
            update: new Date().toISOString(),
            variant: data //Array new_variant_doc
        });
        if (response.ok) {
            get_fav(ws_id, board_name);
            //fav_n
            $("#cart_item_tab").removeClass('active in');
            $("#cart_item_tab_icon").removeClass('active');
            $("#new_item_tab").removeClass('active in');
            $("#new_item_tab_icon").removeClass('active');
            //Activo la animacion del tab favoritos
            $("#fav_item_tab").addClass('active in');
            $("#fav_item_tab_icon").addClass('active');

            Snackbar.show({
                text: ' <span class="material-icons">add_shopping_cart</span> <span class="round-icon pr">' + data.quantity + ' </span>   ' + data.name,
                width: '475px',
                pos: 'bottom-right',
                actionText: 'Deshacer',
                actionTextColor: "#4CAF50",
                onActionClick: function (element) {     //Set opacity of element to 0 to close Snackbar
                    $(element).css('opacity', 0);
                    user_db.remove(response.id, response.rev);   //Set opacity of element to 0 to close Snackbar                    
                    $('#' + response.id).remove();
                }
            });

        }

    } catch (err) {
        Snackbar.show({
            text: '<span class="round-icon pr">' + data.variant_quantity + '</span> ' + data.variant_name + '<?= lang("Body.b_error") ?>',
            width: '475px',
            pos: 'bottom-right',
            actionText: '<?= lang("Body.b_reload") ?>',
            actionTextColor: "#dd4b39",
            onActionClick: function (element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
                //   add_cart_item(data);
            }
        });
        console.log(err);
    }
}


async function dell_fav_item(element) {
    try {
        var board_name = readCookie('board-now-' + ws_id);
      var item_cart_id = $(element).attr('item_cart_id');
      var item_cart_rev = $(element).attr('item_cart_rev');
     let response = await user_db.remove(item_cart_id, item_cart_rev);
     
     if(response.ok){
        get_cart(ws_id, board_name);
     //   get_cart(ws_id);
     }
    } catch (err) {
      Snackbar.show({
        text: 'Hay un error al eliminar',
        width: '475px',
        pos: 'bottom-right',
        actionText: '<?= lang("Body.b_reload") ?>',
        actionTextColor: "#dd4b39",
        onActionClick: function (element) {
          $(element).css('opacity', 0);
        }
      });
      console.log(err);
    }
  }
// Eliminar productos del carrito
async function dell_fav_itemOLD_NO(element) {
    try {

    
        var item_cart_id = $(element).attr('item_cart_id');
        var item_cart_rev = $(element).attr('item_cart_rev');
        user_db.remove(item_cart_id, item_cart_rev);   //Set opacity of element to 0 to close Snackbar    
        get_cart(ws_id);

    } catch (err) {
        Snackbar.show({
            text: 'Hay un erro al eliminar',
            width: '475px',
            pos: 'bottom-right',
            actionText: '<?= lang("Body.b_reload") ?>',
            actionTextColor: "#dd4b39",
            onActionClick: function (element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);
            }
        });
        console.log(err);
    }
}


