// NEW FUNCIONES CUENTA



/**** NUEVO PRODUCTO */

// FUNCION PARA abrir menu cuenta
async function account_menu_open(ws_info, ws_lang_data) {
    try {
        var user_roles_permisions = user_Ctx.userCtx.roles;
        console.log('user_roles_permisions',user_roles_permisions);

        var account_array = {
            ws_info:ws_info,
            ws_lang_data: ws_lang_data,
            user_roles: user_roles_permisions,
            ws_top_bar: ws_info,
            user: user_data,
        }
        renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/account/account_menu.hbs', '#right_main', account_array);  
        createCookie('left_nav_open_ws_' + ws_id, false), 30;// seteo la ventana abierta en la cockie
        $('#right_main').removeClass('move-right');
        var m_url = '?type=account';
        history.replaceState(null, null, m_url) //Cargo la nueva url en la barra de navegacion     
        return;   
    } catch (err) {
        console.log(err);
    }
}


// BOTON CREAR
$(document).on('click', '.account_menu_open', function (event) {
    account_menu_open(ws_info, ws_lang_data);
});
