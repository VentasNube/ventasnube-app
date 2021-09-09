(function() {
    'use strict';
    var ENTER_KEY = 13;
    var newTodoDom = document.getElementById('new-todo');
    var syncDom = document.getElementById('sync-wrapper');

    // EDITING STARTS HERE (you dont need to edit anything above this line)
    var db = false;
    var remoteCouch = false;
    var db = new PouchDB('ventasnube-01');
    var remoteCouch = 'http://admin:Cou6942233@127.0.0.1:5984/ventasnube-01';

    // var remoteCouch = 'http://admin:Cou6942233@localhost/todos';

    //Captura los cambios en la DB en vivo y Actualiza los datos asincronico sin refrezcar la pagina
    db.changes({
        since: 'now',
        live: true
    }).on('change', showTodos);

    // Initialise a sync with the remote server
    function sync() {
        syncDom.setAttribute('data-sync-state', 'syncing');
        var opts = { live: true };
        db.replicate.to(remoteCouch, opts, syncError);
        db.replicate.from(remoteCouch, opts, syncError);
    }

    // EDITING STARTS HERE (you dont need to edit anything below this line)

    // There was some form or error syncing
    function syncError() {
        syncDom.setAttribute('data-sync-state', 'error');
    }


    if (remoteCouch) {
        sync();
    }

    // Nuevo codigo cart 2020
    //Agregego los datos al array
    function addProduct(text) {
        var todo = {
            _id: new Date().toISOString(),
            title: text,
            completed: false
        };


        db.put(todo, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a todo!');
            }
        });
    }

    function add_product(card_product_id, card_product_img_url, card_product_name, card_product_val, card_product_discount, card_product_quantity, card_product_list) {
        var itemData = {
            _id: new Date().toISOString(),
            card_product_id: card_product_id,
            card_product_img_url: card_product_img_url,
            card_product_name: card_product_name,
            card_product_val: card_product_val,
            card_product_discount: card_product_discount,
            card_product_quantity: card_product_quantity,
            card_product_list: card_product_list,
            completed: false
        };
        db.put(itemData, function callback(err, result) {
            if (!err) {
                load_product_cart();
                Snackbar.show({
                    text: '[ ' + card_product_quantity + ' ] ' + card_product_name + ' agregado con exito!',
                    actionText: 'ok',
                    actionTextColor: "#0575e6",
                });
            }
        });
    }

    //Tomo los datos del boton y envio a la DB
    function addPorductItem(event) {
        if (event.keyCode === ENTER_KEY) {
            add_product(newTodoDom.value);
            newTodoDom.value = '';
        }
    }


    // Show the current list of todos by reading them from the database
    //Muestro la lista de productos en el cart de labase de datos
    function showCart() {
        db.allDocs( //Busco en la db
            { include_docs: true, descending: true },
            function(err, doc)
            //cargo los items en el compilador de la vista
            {
                var elements = [];
                elements.push(doc.rows);

                load_product_cart(elements);

            }
        );
    }

    function load_product_cart(elements) {
        //  var active = dataBase.result; //Buscamos en la db
        //   var data = active.transaction(["products"], "readonly"); // Activamos la transaccion de datos
        //   var object = data.objectStore("products"); // Recorremos toda la data de Products
        var elements = []; //Creamos el array con los datos y lo cargamos en elemts
        //OpenCursor es como un foreach q recorre la indexedDB
        /* object.openCursor().onsuccess = function(e) {
             var result = e.target.result;
             // si es nulo no trae nada
             if (result === null) {
                 return;
             }
             //si hay datos los carga con push en un array 
             elements.push(result.value);
             //Continue hace q siga el codigo de transaccion
             result.continue();
         };*/
        //Si se completa con exito hago lo siguiente
        //   data.oncomplete = function() {
        //Creo las variables para cargarlas con los resultados sumados
        array_cart_items = [];
        cart_item = [];
        //Creo los array
        total_quantity_prod = 0;
        total_neto_prod = 0;
        total_cart_neto = 0;
        total_neto_service = 0;
        total_neto_discount = 0;

        //Creo las variables para sumar los resultados
        //Recorro el array elements y creo un nuevo array por cada item
        for (var key in elements) {
            //calculos matematicos para armar el Carrito
            var card_product_quantity = elements[key].card_product_quantity;
            //Valores
            var card_product_val = elements[key].card_product_val;
            var card_product_val_sub_tot = elements[key].card_product_val * card_product_quantity;
            //Descuentos
            var card_product_discount = elements[key].card_product_discount;
            var card_product_discount_tot_val = Math.round((card_product_discount / 100) * card_product_val_sub_tot);
            var card_product_val_sub_tot_des = Math.round(card_product_val_sub_tot - card_product_discount_tot_val);
            //Impuestos
            var total_neto_service = 0;
            var total_neto_tax = 21;
            //Abonado
            var total_neto_pay = 0;
            //Cargo los datos del array
            var cart_item = {
                item_id: elements[key].item_id,
                card_product_id: elements[key].card_product_id,
                card_product_img_url: elements[key].card_product_img_url,
                card_product_name: elements[key].card_product_name,
                card_product_val: card_product_val,
                card_product_val_sub_tot: card_product_val_sub_tot,
                card_product_discount: card_product_discount,
                card_product_discount_tot_val: card_product_discount_tot_val,
                card_product_val_sub_tot_des: card_product_val_sub_tot_des,
                card_product_quantity: card_product_quantity,
                card_product_list: elements[key].card_product_list,
            };


            //Creao el array 
            array_cart_items.push(cart_item);
            //Sumas de tototales
            total_neto_prod += +card_product_val_sub_tot_des;
            total_cart_neto += +(card_product_val_sub_tot_des + total_neto_service);
            total_neto_service += +total_neto_service;
            total_neto_discount += +card_product_discount_tot_val;

        }
        //Cuento los items
        total_quantity_cart_item = array_cart_items.length;
        if (array_cart_items > 0) {
            var cart_items = {
                items_product: array_cart_items,
            };
        } else {
            var cart_items = {
                items_product: null,
            };
        }
        //Array para items de cart
        var cart_items = {
            items_product: array_cart_items,
        };
        //Array para totales
        var cart_total_items = {
            cart_total_items: {
                total_cart_neto: total_cart_neto,
                total_neto_prod: total_neto_prod,
                total_neto_service: total_neto_service,
                total_neto_discount: total_neto_discount,
                total_neto_tax: total_neto_tax,
                total_neto_pay: total_neto_pay,
            }
        };
        console.log('Hay productos en el carrito' + cart_items);
        console.log(cart_total_items);
        //Renderizo vista.

        $('.cart-number').text(total_quantity_cart_item);
        // $('#cart-number-2').text(total_quantity_cart_item);
        renderHandlebarsTemplate('cart/cart_nav_items_template', '#product_cart_items', cart_items);
        renderHandlebarsTemplate('cart/cart_total_items_template', '#cart_total_items', cart_total_items);
        //Actualizo el numero del carrito
        //alert(total_quantity_cart_item);
        //  };
    }

    /*
        function reedItemCart(prodItems) {

            var ul = document.getElementById('todo-list');

            ul.innerHTML = '';
            prodItems.forEach(function(prodItems) {
                ul.appendChild(
                  createCartItem(prodItems.doc)

                  );

            });
            
        }
    */
    //Creo la promesa para el envento que suba 
    function addEventListeners() {
        newTodoDom.addEventListener('keypress', addPorductItem, false);
    }

    // Given an object representing a todo, this will create a list item
    // to display it.
    function createCartItem(todo) {


    }

    /*
        function showItemCart(items) {
          var ul = document.getElementById('todo-list');
         // ul.innerHTML = '';
          items.forEach(function(items) {

            load_product_cart(items.doc);
          });
      }
    */

    addEventListeners();
    showCart();

    // We have to create a new todo document and enter it in the database
    function addTodo(text) {
        var todo = {
            _id: new Date().toISOString(),
            title: text,
            completed: false
        };
        db.put(todo, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a todo!');
            }
        });
    }



    // Show the current list of todos by reading them from the database
    function showTodos() {
        db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
            redrawTodosUI(doc.rows);
        });
    }


    // toma el cambio en chekboox y edita los datos del imput
    function checkboxChanged(todo, event) {
        todo.completed = event.target.checked;
        db.put(todo);
    }

    // User pressed the delete button for a todo, delete it
    function deleteButtonPressed(todo) {
        db.remove(todo);
    }

    // The input box when editing a todo has blurred, we should save
    // the new title or delete the todo if the title is empty
    function todoBlurred(todo, event) {
        var trimmedText = event.target.value.trim();
        if (!trimmedText) {
            db.remove(todo);
        } else {
            todo.title = trimmedText;
            db.put(todo);
        }
    }



    // User has double clicked a todo, display an input so they can edit the title
    function todoDblClicked(todo) {
        var div = document.getElementById('li_' + todo._id);
        var inputEditTodo = document.getElementById('input_' + todo._id);
        div.className = 'editing';
        inputEditTodo.focus();
    }

    // If they press enter while editing an entry, blur it to trigger save
    // (or delete)
    function todoKeyPressed(todo, event) {
        if (event.keyCode === ENTER_KEY) {
            var inputEditTodo = document.getElementById('input_' + todo._id);
            inputEditTodo.blur();
        }
    }

    // Given an object representing a todo, this will create a list item
    // to display it.
    function createTodoListItem(todo) {
        var checkbox = document.createElement('input');
        checkbox.className = 'toggle';
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', checkboxChanged.bind(this, todo));

        var label = document.createElement('label');
        label.appendChild(document.createTextNode(todo.title));
        label.addEventListener('dblclick', todoDblClicked.bind(this, todo));

        var deleteLink = document.createElement('button');
        deleteLink.className = 'destroy';
        deleteLink.addEventListener('click', deleteButtonPressed.bind(this, todo));

        var divDisplay = document.createElement('div');
        divDisplay.className = 'view';
        divDisplay.appendChild(checkbox);
        divDisplay.appendChild(label);
        divDisplay.appendChild(deleteLink);

        var inputEditTodo = document.createElement('input');
        inputEditTodo.id = 'input_' + todo._id;
        inputEditTodo.className = 'edit';
        inputEditTodo.value = todo.title;
        inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
        inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));

        var li = document.createElement('li');
        li.id = 'li_' + todo._id;
        li.appendChild(divDisplay);
        li.appendChild(inputEditTodo);

        if (todo.completed) {
            li.className += 'complete';
            checkbox.checked = true;
        }

        return li;
    }

    function redrawTodosUI(todos) {
        var ul = document.getElementById('todo-list');
        ul.innerHTML = '';
        todos.forEach(function(todo) {
            ul.appendChild(createTodoListItem(todo.doc));
        });
    }

    function newTodoKeyPressHandler(event) {
        if (event.keyCode === ENTER_KEY) {
            addTodo(newTodoDom.value);
            newTodoDom.value = '';
        }
    }

    function addEventListeners() {
        newTodoDom.addEventListener('keypress', newTodoKeyPressHandler, false);
    }

    addEventListeners();
    showTodos();


})();