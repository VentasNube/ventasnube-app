<?php

return [

    'ws_lang_es' => [
   
        //BOTONES GENERALES
        'b_ok' => 'Ok',
        'b_dell' => 'Eliminar',
        'b_add' => 'Agregar',
        'b_confirm' => 'Estas seguro?',
        'b_reload' => 'Reintentar',
        'b_undo' => 'Deshacer',
        'b_error' => 'Error',
        'b_next' => 'Siguiente',
        'b_prev' => 'Atras',
        'b_cancel' => 'Cancelar',
        'b_save' => 'Guardar',
        //CONFIRMACION GENERALES
        'a_add_confirm' => 'Agregado con exito!',
        'a_add_conflict' => 'No se pudo agregar!',
        'a_dell_confirm' => 'Se elimino con exito!',
        'a_dell_conflict' => 'No se pudo eliminar!',
        //ACCOUNT
        'b_myaccount' => 'Mi cuenta',
        'b_exit_icon' => 'logout',
        'b_exit' => 'Salir',
        //BUSCADOR
        't_search' => 'Busca lo que sea..',
        'b_search_tittle' => 'Buscar lo que sea..',
        'search_icon' => 'search',

        //BOARDS
        //Editar board
        'm_new_board' => 'Nuevo Tablero',
        'm_edit_board' => 'Editar Tablero',
        'm_new_board_group' => 'Nuevo grupo',
        'm_edit_board_group' => 'Editar grupo',
        'm_add_board_group_collaborator' => 'Agregar colaborador',
        'm_list_board_group' => 'Descargar Listado',
        /// BOARDS TEXTOS KAMBAN 

        'm_board_group_1' => 'Nuevos',
        'm_board_group_1' => 'Presupuestado',
        'm_board_group_1' => 'Finalizados',
        // BOARD TOUR 
        'm_board_edit_name' => 'Nombre ',
        'm_board_icon_select' => 'Seleccionar',
        'm_board_color_title' => 'Cambiar color',
        'm_board_icon_title' => 'Cambiar icono',
        'm_board_tour_title_welcome' => 'Bienvenido a tus tableros!',
        'm_board_tour_title' => 'Te vamos a guiar en unos simples pasos para crear tu nuevo tablero Kanban.',
        'm_board_tour_title_sub' => 'Que tipo de actividad vas a organizar?',
        'm_board_tour_purchase' => ' Comprar',
        'm_board_name_purchase' => 'Compras',
        'm_board_tour_purchase_tittle' => 'Productos para mi catalogo.',
        'm_board_tour_sell' => 'Vender',
        'm_board_name_sell' => 'Ventas',
        'm_board_tour_sell_tittle' => 'productos del catalogo.',
        'm_board_tour_service-objet' => 'Servicios con Orden',
        'm_board_name_service-objet' => 'Servicios',
        'm_board_tour_service-objet_tittle' => ' para los objetos o pacientes que traen mis contactos. ',
        'm_board_tour_service-contact' => 'Servicios con Turnos',
        'm_board_name_service-contact' => 'Turnos',
        'm_board_tour_service-contact_tittle' => ' para mis contactos. o pacientes que traen mis contactos.',
        'm_board_tour_security_title' => ' Algunas Configuraciones de seguridad...',
        'm_board_tour_security_sub_title' => 'Si no estas seguro, siempre podras modificar estas opciones.',
        'm_board_tour_collect_and_deliver_tittle' => 'Cuando se pueden cerrar las ordenes?',
        'm_board_tour_collect_and_deliver_option_1' => 'Solo saldando el total.',
        'm_board_tour_collect_and_deliver_option_2' => 'Sin saldar el total.',
        'm_board_tour_collect_and_close_tittle' => 'Cuando se pueden entregar las ordenes?',
        'm_board_tour_collect_and_close_option_1' => 'Solo saldando el total.',
        'm_board_tour_collect_and_close_option_2' => 'Con cuenta corriente.',
        //Delivery
        'm_board_delivery_place' => 'Habilitar delibery',
        //CONTROL STOCK
        'board_control_stock' => 'Habilitar el controlor de stock?',
        'board_control_stock_block' => '(SI) Bloquear la orden si no hay stock suficiente.',
        'board_control_stock_negative' => '(NO) Solo avisar si no hay stock suficiente.',
        'board_control_update_stock_close' => 'Habilitar el la actualizacion de stock al cerrar orden?',
         //BOX config
        'board_control_cash' => 'Habilitar la apertura y cierre de la caja?',
        'board_control_cash_flow' => 'Habilitar ingreso y egreso de movimientos de caja?',
        'board_control_cash_close_box_tittle' => 'Habilitar la apertura y cierre de la caja?',
        'board_control_cash_close_box_option_1' => 'Si es obligatorio.',
        'board_control_cash_close_box_option_sub_tiitle_1' => 'Se tiene q abrir la caja antes de cobrar y cerrar la caja cuando se rinde el efectivo. ',
        'board_control_cash_close_box_option_2' => 'No es opcional.',
        'board_control_cash_close_box_option_sub_tiitle_2' => 'No realizar control se puede vender si tener que abrir ni cerrar la caja. ',
        'board_control_cash_tittle' => 'Habilitar movimientos de caja.',
        'board_control_cash_out_sub_tittle' => 'Habilitar movimientos de caja.',
        'board_control_cash_out_tittle' => ' Pueden ingresar gastos solo los usuarios autorizados en la ultima etapa..',
        'board_control_cash_out' => 'Gastos.',
        'board_control_cash_in' => ' Ingreso de cambio.',
        'board_control_cash_in_tittle' => ' Pueden ingresar dinero solo los usuarios autorizados en la ultima etapa.',
        'board_control_cash_out_box' => ' Retiros parciales de efectivo.',
        'board_control_cash_out_box_tittle' => ' Retiros parciales de efectivo a la caja chica',
        'board_voucher_tittle' => ' Configura los nombres de los comprobantes.',
        //EDITAR DOCUMENTOS
        'or_board_receipt_voucher' => 'Comprobante de (Cobro)',
        'or_board_payment_voucher' => 'Comprobante de (pago)',
        'or_board_payment_receipt_voucher' => 'Comprobante de (entrega) Nota de Entrega de Mercadería, Equipo...',
        'or_board_credit_voucher' => 'Nota de credito de (Devolucion)',
        'or_board_return_voucher' => 'Comprobante de (Devolucion)',

        //EDITAR GROUP BOARD
        'm_edit_board_group_tittle' => 'Editar etapa',
        'm_edit_board_group_sub_tittle' => 'Como la vas a llamar?',
        'm_edit_board_group_name' => 'Como la vas a llamar?',
        'm_edit_board_group_color' => 'Cambiar el color',
        'm_edit_board_group_intro' => ' Algunas opciones que puedes configurar en esta etapa...',
        'm_edit_board_group_sub_intro' => ' Si no estas seguro, siempre podras modificar estas opciones.',
        'm_edit_board_group_auto_web' => 'Habilitar que el contacto pueda aceptar el presupuesto por la web.?',
        'm_edit_board_group_confirm_stock' => 'Habilitar popup de confirmar stock.',
        'm_edit_board_group_cash' => 'Habilitar popup de cobrar.',
        'm_edit_board_group_deliver' => 'Habilitar popup de entrega.',
        //'m_edit_board' => 'Editar Tablero',
        'm_edit_board' => 'Editar Tablero',
        //nueva Ordenes
        'm_board' => 'Tableros',
        'm_board_new_item' => 'Nueva Orden',
        'm_board_filter' => 'Filtrar',
        //CATALOGO
        'm_catalog' => 'Catalogo',
        'm_catalog_icon' => 'collections',
        't_new_product' => 'Crear producto',
        'a_dell_product' => 'Quieres eliminar el producto?',
        //Editar producto
        'm_catalog_edit_tittle' => 'Editar producto',
        'm_catalog_edit_sub_tittle' => 'Informacion General',
        //
        'm_catalog_edit_name' => 'Nombre',
        'm_catalog_edit_tags' => 'Etiquetas',
        'm_catalog_edit_add_pic' => 'Agregar foto',
        'm_catalog_edit_del_pic' => 'Eliminar foto',
        //
        'm_catalog_edit_trade' => 'Marca',
        'm_catalog_edit_model' => 'Modelo',
        'm_catalog_edit_category' => 'Categoria',
        'm_catalog_edit_sub_category' => 'Sub Categoria',
        //
        'm_catalog_edit_variant' => 'Variantes',
        'm_catalog_edit_stock' => 'Stock',
        'm_catalog_edit_on' => 'Activar',
        'm_catalog_edit_off' => 'Desactivar',
        //
        'm_catalog_edit_description' => 'Descripcion',
        'm_catalog_edit_color' => 'Color',
        'm_catalog_edit_talle' => 'Talle',
        'm_catalog_edit_peso' => 'Peso',
        'm_catalog_edit_barcode' => 'Codigo de barras',
        //
        'm_catalog_edit_price' => 'Precios',
        'm_catalog_edit_stock' => 'Stock',
        'm_catalog_edit_inicial_stock' => 'Stock Inicial',
        'm_catalog_edit_create' => 'Creado',
        'm_catalog_edit_sale' => 'Vendidos',
        'm_catalog_edit_cost' => 'Costo',
        'm_catalog_edit_enable' => 'Disponible',
        'm_catalog_edit_contity' => 'Cantidad',
        'm_catalog_edit_price_update' => 'Actualizar Lista de precios',
        'm_catalog_edit_stock_update' => 'Actualizar Stock',
        'm_catalog_edit_price_list' => 'Listas de precios',
        'm_catalog_edit_price_list_update' => 'Actualizar Listas de precios',
        'm_catalog_edit_price_list' => 'Listas de precios',
        'm_catalog_edit_new' => 'Nueva',
        'm_catalog_edit_add' => 'Agregar',
        'm_catalog_edit_edit' => 'Editar',
        'm_catalog_edit_delete' => 'Eliminar',
        'm_catalog_edit_inactive' => 'Desactivar',
        'm_catalog_edit_active' => 'Activar',
        //CARRITO
        'm_cart' => 'Carrito',
        't_cart' => 'Carrito',
        'm_cart_trash' => 'El carrito esta vacio',
        'm_cart_all_dellete' => 'El carrito esta vacio',
        'b_cart_add_product' => 'Agrega productos',
        'b_add_cart' => 'Agregar al carrito',
        't_total' => 'Total',
        't_service' => 'Total Servicios',
        't_product' => 'Total Productos',
        't_dicount' => 'Total Descuentos',
        't_tax' => 'Total impuestos',
        't_pay' => 'Total abonado',
        'b_product' => 'Productos',
        'b_service' => 'Servicios',
        'b_contact' => 'Contactos',
        //CREAR ORDEN
        'b_add_order' => 'Crear orden',
         //FAVORITOS
        'm_favorite' => 'Favoritos',
        'm_fav_trash' => 'No tienes favoritos',
        'b_add_fav' => 'Agregar a favoritos',
        'b_fav_add_all_items' => 'Agregar todos a favoritos',
        't_fav' => 'Favoritos',
        // MI CUENTA
        'm_myaccount' => 'Mi cuenta',
        //MIS ORDENES
        'm_myorders' => 'Mis compras',

        //CONFIGURACION WORKSPACE
        //TEXTOS
        'm_my_workspace' => 'Mis workspaces',
        'm_config_workspace' => 'Configurar Workspace',    
        'm_config_workspace_icon' => 'group_work',
        'b_tittle_workspace' => 'Mis espacios de trabajo',
        'ws_panel_settings_general' => 'General',
        'ws_panel_settings_users' => 'Colaboradores',
        'ws_panel_settings_update' => 'Actualizaciones',
        'ws_panel_settings_lang_label' => 'Modificar Idioma', 
        'ws_panel_settings_lang_es' => 'Espa&ntilde;ol',
        'ws_panel_settings_lang_us' => 'Ingles',
        'ws_panel_settings_lang_por' => 'Portugues',
        //BOTONES
        'ws_settings_update_btn' => 'Actualizar',
        //ICONOS
        'ws_config_icon' => 'tune',
        'ws_home_icon' => 'group_work',
        'ws_panel_settings_icon' => 'admin_panel_settings',
        'ws_panel_settings_users_icon' => 'people',
        'ws_panel_settings_update_icon' => 'browser_updated',
        'ws_panel_settings_lang_icon' => 'translate',
        // CONFIGURACION CATALOGO
        //'m_my_catalog' => 'Configuar',
        'm_config_catalog' => 'Configurar Catalogo',    
        'm_config_catalog_icon' => 'collections',
        //BOTONES
        'ws_catalog_settings_add' => 'Agregar',
        'ws_catalog_settings_add_icon' => 'check_circle',
        'ws_catalog_settings_edit' => 'Editar',
        'ws_catalog_settings_delete' => 'Eliminar',
        //TITULOS
        'ws_catalog_settings_list' => 'Listas de precios',
        'ws_catalog_settings_money' => 'Monedas',
        'ws_catalog_settings_tax' => 'Impuestos',
        //ICONOS
        'm_config_catalog_list_icon' => 'format_list_numbered',
        'm_config_catalog_list_money_icon' => 'paid',
        'm_config_catalog_list_tax_icon' => 'corporate_fare',
         //MI CUENTA
         'm_account_tittle' => 'Mis datos',
         'm_account_tittle_icon' => 'app_settings_alt',
         'm_account_tittle_buy' => 'Mis compras',
         'm_account_edit_b' => 'Modificar datos',
         'm_account_save_b' => 'Guardar cambios',
         'm_account_edit_pic_b' => 'Modificar datos',
         'm_account_name' => 'Nombre',
         'm_account_surname' => 'Apellido',
         'm_account_document' => 'Documento',
         'm_account_phone' => 'Telefono',
         'm_account_email' => 'Email',
         'm_account_passwor_b' => 'Modificar contrase&ntilde;a',
         'm_account_passwor' => 'Nueva Contrase&ntilde;a',
         'm_account_passwor_repet' => 'Volver a escribir Contrase&ntilde;a',
        // body modules name
        'm_board' => 'Tableros',
        'm_catalog' => 'Catalogo',
        'm_box' => 'Caja',
        'm_my_box' => 'Mi caja',
        'm_all_box' => 'Todas las cajas',
        'm_contact' => 'Contactos',
        'm_reports' => 'Reportes',
        'm_stats' => 'Estadisticas',
        'm_cart' => 'Carrito',
        'm_favorite' => 'Favoritos',
        'm_myaccount' => 'Mi cuenta',
        'm_myorders' => 'Mis compras'
    ],
    'ws_lang_us' => [
       
        //BOTONES GENERALES
        'b_ok' => 'Ok',
        'b_dell' => 'Delete',
        'b_add' => 'Add',
        'b_confirm' => 'Is that you?',
        'b_reload' => 'Retry',
        'b_undo' => 'Undo',
        'b_error' => 'Error',
        //CONFIRMACION GENERALES
        'a_add_confirm' => 'Added successfully!',
        'a_add_conflict' => 'No se pudo agregar!',
        'a_dell_confirm' => 'Se elimino con exito!',
        'a_dell_conflict' => 'Could not delete!',
        //MODULOS

        //BUSCADOR
        't_search' => 'Search what you want',
        'b_search_tittle' => 'Find whatever...',
        'search_icon' => 'search',

        //BOARDS
        'm_board' => 'Boards',

        //CATALOGO
        'm_catalog' => 'Catalog',
        'm_catalog_icon' => 'collections',
        't_new_product' => 'Create product',
        'a_dell_product' => 'Do you want to remove the product?',

        
        //CARRITO
        'm_cart' => 'Cart',
        't_cart' => 'Cart',
        'cart_icon' => 'shopping_cart',
        'm_cart_trash' => 'Cart is empty',
        'm_cart_all_dellete' => 'Empty cart',
        'b_cart_add_product' => 'Add products',
        'b_add_cart' => 'Add to cart',
        't_total' => 'Total',
        't_service' => 'Total service',
        't_product' => 'Total product',
        't_dicount' => 'Total discount',

        't_tax' => 'Total tax',
        't_pay' => 'Total paid',
        'b_product' => 'Product',
        'b_service' => 'Service',
        'b_contact' => 'Contact',

        //CREAR ORDEN
        'b_add_order' => 'Create order',

         //FAVORITOS
        'm_favorite' => 'Favorites',
        'm_fav_trash' => 'You have no favourites',
        'b_add_fav' => 'Add to favorites',
        'b_fav_add_all_items' => 'Add all to favorites',
        't_fav' => 'Favorites',

        'fav_icon' => 'favorite',

        //MIS ORDENES
        'm_myorders' => 'My shopping',

          //ESPACIOS DE TRABAJO
          
        'm_my_workspace' => 'My Workspace',
        'm_config_workspace' => 'Workspace settings',
        //Iconos    
        'ws_config_icon' => 'tune',
        'ws_home_icon' => 'group_work',

         //ACCOUNT
         'b_myaccount' => 'My Account',
         'b_exit' => 'Logout',
         'b_exit_icon' => 'logout',
         'm_myaccount' => 'My Account',


         //MI CUENTA
         'm_account_tittle' => 'My data',
         'm_account_tittle_icon' => 'app_settings_alt',
         'm_account_tittle_buy' => 'My shopping',

         'm_account_edit_b' => 'Modify data',
         'm_account_save_b' => 'Save changes',
         'm_account_edit_pic_b' => 'Modify data',
         'm_account_name' => 'Name',
         'm_account_surname' => 'Surname',
         'm_account_document' => 'Document',
         'm_account_phone' => 'Phone',
         'm_account_email' => 'Email',
         'm_account_passwor_b' => 'Modify password',
         'm_account_passwor' => 'New Password',
         'm_account_passwor_repet' => 'Retype Password',

         //CAJA
        'm_box' => 'Box',
        'm_my_box' => 'My box',
        'm_all_box' => 'All box',

        //CONTACTOS
        'm_contact' => 'Contacts',

        //REPORTES
        'm_reports' => 'Reports',

        //ESTADISTICAS
        'm_stats' => 'Statisticss',
    ],
];
