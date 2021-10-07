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

// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_cart() {
    // Traigo los resultados de una vista
    let response = await user_db.query('get/cart-item', { include_docs: true, descending: true }); //Conceto con la vista de diseno
   if(response.rows){
    return all_cart_item(response.rows);
   }
   else{
    return all_cart_item(false);
   }
}


// Creo los arrays con los datos de la BD
async function all_cart_item(todos) {
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

        todos.map(function(todo) {
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
                variant_id: todo.doc.variant['_id'],
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
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/cart/cart_item.hbs', '#product_cart_items', cart_items);
        //console.log('TODOS TODo-3 ------- ----' + JSON.stringify(cart_item));
    } catch (ex) {
        console.error('inner', ex.message);
        throw ex;
    } finally {
        //Finally es la funcion que emite el resultado final despues de esperar todo e codigo ok
        // alert('finally' + total_neto_prod + '----' + total_quantity_cart_item);
        $('.cart_n').text(total_quantity_cart_item);
        $('#total_cart_neto').text(total_cart_neto);
        $('#total_neto_prod').text(total_neto_prod);
        // $('#total_neto_service').text(total_neto_service);
        $('#total_neto_discount').text(total_neto_discount);
        $('#total_neto_tax').text(total_neto_tax);
        $('#total_neto_pay').text(total_neto_pay);
        //   get_cart_change();
        return;
    }
}

// Traer los item leyendo de la pounchDB
async function get_cart_change() {
    //  Escucho Los cambios en tiempo real
    await user_db.changes({
        // filter: '_view',
        //view: 'get/cart-item',
        since: 'now',
        include_docs: true,
        live: true
    }).on('change', function(change) {
        if (change.deleted) {
            // alert('Docuento Eliminado' + change.id);
            //  console.log('Docuento ELIMINADOOOOO ' + JSON.stringify(change.doc) + '\n');
            get_cart();
        } else {
            //  alert('Docuento Agregado' + change.id);
            // console.log('Docuento AGREGADOOOOOOOOO ' + JSON.stringify(change.doc) + '\n');
            get_cart();
        }
    }).on('error', function(err) {
        // handle errors
        console.log('' + err);
    });
}

//Nueva funcion de agregar al producto al carrito
function variations_add_cart(element) {
    event.preventDefault();
    //Identificadores
    let product_id = $(element).attr('product_id'); //Id del producto selccionado
    let variant_id = $(element).attr('variant_id'); //Id de la variable seleccionada
    var this_card_id = '#card_id_' + product_id; //Id del producto Seleccionado
    //Detalles
    //let variant_name = $('#var_btn_' + product_id).find('var_name').html(); //Nombre de variable seleccionada
    //let variant_pic = $('#var_btn_' + product_id).find('img-card-mini').attr('src'); //Pic de variable seleccionada
    //Valores
    let variant_price = $('#card_var_id_' + product_id).find('.card_product_val').val(); //Tomo el valor del formulario
    let variant_discount = $('#card_var_id_' + product_id).find('.card_product_discount').val(); //Tomo el valor del formulario
    let variant_quantity = $('#card_var_id_' + product_id).find('.card_product_quantity').val(); //Tomo el valor del formulario
    //Busco el doc por id actualizado y hago la carga de datos
    L_search_db.get(product_id, function(err, doc) {
        if (err) { return console.log(err); }
        //Busco el id en el array con find funcion de flecha
        const var_doc = doc.variations.find(element => element.id == variant_id);
        console.log(var_doc);
        const new_variant_doc = {
            product_id: product_id,
            product_rev: var_doc._rev,
            variant_id: var_doc.variant_id,
            id: var_doc.variant_id,
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
    });
    return false;
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
    console.log(data);
    try {
        var response = await user_db.put({
            _id: new Date().toISOString(),
            type: 'cart-item',
            update: new Date().toISOString(),
            variant: data //Array new_variant_doc
        });

        Snackbar.show({  
            text: ' <span class="material-icons">add_shopping_cart</span> <span class="round-icon pr">' + data.variant_quantity + ' </span>   ' + data.variant_name,
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Deshacer ',
            actionTextColor: "#4CAF50",
               onActionClick: function(element) {     //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);    
                dell_product(response.id, response.rev);
            }
        });
    } catch (err) {
        Snackbar.show({  
            text: '<span class="round-icon pr">' + data.variant_quantity + '</span> ' + data.variant_name + '<?= lang("Body.b_error") ?>',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Recargar',
            actionTextColor: "#dd4b39",
               onActionClick: function(element) {       //Set opacity of element to 0 to close Snackbar
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
        //   get_cart()
        Snackbar.show({  
            text: '<span class="material-icons">delete</span> Eliminar producto?',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Eliminar',
            actionTextColor: "#dd4b39",
               onActionClick: async function(element) {    
                user_db.remove(item_cart_id, item_cart_rev);   //Set opacity of element to 0 to close Snackbar                    
                $('#' + item_cart_id).remove();
                $(element).css('opacity', 0);      
                //    alert('Clicked Called!');
                // dell_product(response.id, response.rev);
                //  location.reload();   
            }
        });

    } catch (err) {
        Snackbar.show({  
            text: 'Hay un conflicto',
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Recargar',
            actionTextColor: "#dd4b39",
               onActionClick: function(element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);      
                //    alert('Clicked Called!');
                //add_product(card_product_id, card_product_img_url, card_product_name, card_product_val, card_product_discount, card_product_quantity);
                //  location.reload();   
            }
        });
        console.log(err);
    }
}



// Abre el left nav cart
$(document).on('click', '.cart_button', function(event) {
    $('#right_main').removeClass('move-right');
    $('#cart_user_input').focus();
    get_cart();
    get_fav();
});

//Cierra el carrito
$(document).on('click', '.cart_button_close', function(event) {
    $('#right_main').addClass('move-right');
    //get_cart();
});


/** ############# FUCNIONES FAVORITOS  ############## *****/
// Agreagar productos al favoritos
// Trae los datos de la local user DB filtrado por tipo cart-items
async function get_fav() {
    // Traigo los resultados de una vista
    let response = await user_db.query('get/fav-item', { include_docs: true, descending: true }); //Conceto con la vista de diseno
    // Renderizo todos los resultados 
    console.log(response)
    return all_fav_item(response.rows);
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

        todos.map(function(todo) {
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
                variant_id: todo.doc.variant['_id'],
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

// Traer los item leyendo de la pounchDB
async function get_fav_change() {
    //  Escucho Los cambios en tiempo real
    await user_db.changes({
        // filter: '_view',
        //view: 'get/cart-item',
        since: 'now',
        include_docs: true,
        live: true
    }).on('change', function(change) {
        if (change.deleted) {
            // alert('Docuento Eliminado' + change.id);
            //  console.log('Docuento ELIMINADOOOOO ' + JSON.stringify(change.doc) + '\n');
            get_fav();
        } else {
            //  alert('Docuento Agregado' + change.id);
            // console.log('Docuento AGREGADOOOOOOOOO ' + JSON.stringify(change.doc) + '\n');
            get_fav();
        }
    }).on('error', function(err) {
        // handle errors
        console.log('' + err);
    });
}

//Nueva funcion de agregar al producto al favoritos
function variations_add_fav(element) {
    event.preventDefault();
    //Identificadores
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
    L_search_db.get(product_id, function(err, doc) {
        if (err) { return console.log(err); }
        //Busco el id en el array con find funcion de flecha
        const var_doc = doc.variations.find(element => element.id == variant_id);

        const new_variant_doc = {
            product_id: product_id,
            product_rev: var_doc._rev,
            variant_id: var_doc.variant_id,
            id: var_doc.variant_id,
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
            console.log(new_variant_doc);
        }
        //    renderHandlebarsTemplate(url_template, id_copiled, variant_array);
    });
    return false;
};


async function add_fav_item(data) {
    console.log(data);
    try {
        var response = await user_db.put({
            _id: new Date().toISOString(),
            type: 'fav-item',
            update: new Date().toISOString(),
            variant: data //Array new_variant_doc
        });

        //fav_n

        $("#cart_item_tab").removeClass('active in');
        $("#cart_item_tab_icon").removeClass('active');
        $("#new_item_tab").removeClass('active in');
        $("#new_item_tab_icon").removeClass('active');
        //Activo la animacion del tab favoritos
        $("#fav_item_tab").addClass('active in');
        $("#fav_item_tab_icon").addClass('active');

        Snackbar.show({  
            text: ' <span class="material-icons">add_shopping_cart</span> <span class="round-icon pr">' + data.variant_quantity + ' </span>   ' + data.variant_name,
            width: '475px',
            pos: 'bottom-right',
            actionText: 'Deshacer',
            actionTextColor: "#4CAF50",
               onActionClick: function(element) {     //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);    
                dell_product(response.id, response.rev);
            }
        });
    } catch (err) {
        Snackbar.show({  
            text: '<span class="round-icon pr">' + data.variant_quantity + '</span> ' + data.variant_name + '<?= lang("Body.b_error") ?>',
            width: '475px',
            pos: 'bottom-right',
            actionText: '<?= lang("Body.b_reload") ?>',
            actionTextColor: "#dd4b39",
               onActionClick: function(element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);    
                add_cart_item(data);
            }
        });
        console.log(err);
    }
}

// Eliminar productos del carrito
async function dell_fav_item(item_cart_id, item_cart_rev) {
    try {
        //   get_cart()
        Snackbar.show({  
            text: '<span class="material-icons">delete</span> <?= lang("Body.a_dell_product") ?>',
            width: '475px',
            pos: 'bottom-right',
            actionText: '<?= lang("Body.b_dell") ?>',
            actionTextColor: "#dd4b39",
               onActionClick: async function(element) {    
                user_db.remove(item_cart_id, item_cart_rev);   //Set opacity of element to 0 to close Snackbar                    
                $('#' + item_cart_id).remove();
                $(element).css('opacity', 0);      
                //    alert('Clicked Called!');
                // dell_product(response.id, response.rev);
                //  location.reload();   
            }
        });

    } catch (err) {
        Snackbar.show({  
            text: '<?= lang("Body.a_dell_conflict") ?>',
            width: '475px',
            pos: 'bottom-right',
            actionText: '<?= lang("Body.b_reload") ?>',
            actionTextColor: "#dd4b39",
               onActionClick: function(element) {       //Set opacity of element to 0 to close Snackbar
                $(element).css('opacity', 0);      
                //    alert('Clicked Called!');
                //add_product(card_product_id, card_product_img_url, card_product_name, card_product_val, card_product_discount, card_product_quantity);
                //  location.reload();   
            }
        });
        console.log(err);
    }
}


///****** FUNCIONES CONTACTOS **********///

function cart_select_contact() {

    alert('seleccionado');
}

//$('#cart_select_contact').click('').alert('conctactos');
//var contact = document.getElementById("cart_select_contact");


/*
function cart_user_input_in(element) {
    var form = document.getElementById("#cart_user_input");
    form.addEventListener("focus", function(event) {
        event.target.style.background = "pink";
        $('#cart_user_input_subjet').addClass('in');
    }, true);
    form.addEventListener("blur", function( event ) {
        event.target.style.background = "";
      }, true);

}*/
/*
function cart_user_input_in() {
    $('#cart_user_input_subjet').addClass('in');
    //  alert('focusin');
}


function cart_user_input_out() {
    $('#cart_user_input_subjet').removeClass('in');
};*/
// Abre el left nav cart