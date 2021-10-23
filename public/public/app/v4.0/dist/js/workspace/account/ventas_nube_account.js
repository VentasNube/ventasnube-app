
////----(3 Right NAV MAIN)---/////
function get_account_profile(user_data,ws_info, ws_lang_data) {
    var ws_cart = {
        ws_info: ws_info,
        ws_lang_data: ws_lang_data
    }
    renderHandlebarsTemplate('/public/app/v4.0/dist/hbs/workspace/account/profile.hbs', '#right_main_compiled', ws_cart);
    // $('#cart_user_input').focus();
    console.log('PROFILE IN');
};
