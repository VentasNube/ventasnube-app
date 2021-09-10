function send_post(controler, data) {

    $.ajax({
        url: "/" + controler,
        // dataType: "html",
        data: data,
        type: "POST",
        dataType: "json",
        beforeSend: function() {
            //  alert('AAAAAAAAA')
            //location.reload().delay(5000);
        },
        success: function(response) {
            if (response.result == true) { ///// IMPRIME ////

                alert(response.msj)
                    //    window.location = "/account";
            } else {
                alert(response.msj)
                    //   logout()
                    //setTimeout(function () { window.location = "/account"; }, 2000);
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 404) {
            // setTimeout(function () { window.location = "/account"; }, 2000);
            alert(response.msj)
        }
    });

}

$(document).ready(function() {
    $('.tables').DataTable();



});

/*
$(document).ready(function() {
  
} );
*/
$('#dell_ws_submit').click(function() {
    //   const user_id = $(this).attr('user_id')
    const ws_id = $(this).attr('ws_id');
    //  const ws_plan = $(this).attr('ws_plan');
    const controler = 'admin/ws_delete_db';
    //var ws_id = '';
    const data = {
        ws_id: ws_id,
        //ws_plan: ws_plan,
        //  user_id: user_id,
    }
    send_post(controler, data);
});


$(".delete_ws").click(function() {
    const ws_id = $(this).attr('ws_id');
    //$('#dell_ws_submit').attr('user_id', user_id)    
    //  $('#dell_ws_submit').attr('ws_plan', ws_plan);
    $('#dell_ws_submit').attr('ws_id', ws_id);
});



$(".edit_plan").click(function() {
    const user_id = $(this).attr('user_id')
    const ws_id = $(this).attr('ws_id');
    const ws_plan = $(this).attr('ws_plan');
    const controler = 'addUserToGroup';
    //var ws_id = '';
    var data = {
        ws_id: ws_id,
        ws_plan: ws_plan,
        user_id: user_id,
    }
    alert(user_id);
    //send(controler, data);
});


function get_plan_modules(plan_id) {

    $.ajax({
        url: "/get_plan_modules",
        // dataType: "html",
        data: plan_id,
        type: "POST",
        dataType: "json",
        beforeSend: function() {
            //  alert('AAAAAAAAA')
            //location.reload().delay(5000);
        },
        success: function(response) {
            if (response.result == true) { ///// IMPRIME ////

                alert(response.msj)
                    //    window.location = "/account";
            } else {
                alert(response.msj)
                    //   logout()
                    //setTimeout(function () { window.location = "/account"; }, 2000);
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 404) {
            // setTimeout(function () { window.location = "/account"; }, 2000);
            alert(response.msj)
        }
    });

}
$(".edit_plan").click(function() {
    const user_id = $(this).attr('user_id')
    const ws_id = $(this).attr('ws_id');
    const ws_plan = $(this).attr('ws_plan');
    const controler = 'addUserToGroup';
    //var ws_id = '';
    var data = {
        ws_id: ws_id,
        ws_plan: ws_plan,
        user_id: user_id,
    }
    alert(user_id);
    //send(controler, data);
});




//addUserToGroup()