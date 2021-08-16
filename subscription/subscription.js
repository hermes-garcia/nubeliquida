jQuery(document).ready(function($) {
    "use strict";

    $('form.subscribe_form').submit(function() {
        let form = $(this).find('.subscribe-input'),
            formError = false,
            emailExpression = /^[^\s()<>@,;:\/]+@\w[\w.-]+\.[a-z]{2,}$/i,
            sendStr = '',
            action = '';

        form.children('input').each(function() {
            let i = $(this),
                identif = i.attr('id');

            if (identif !== undefined) {
                let infoError = false,
                    errorLength = false;

                if (!emailExpression.test(i.val())) {
                    formError = infoError = true;
                }
                if (i.val().length > 50) {
                    formError = errorLength = true;
                }

                if(errorLength === true){
                    i.next('.news-validation').html((errorLength ? (i.attr('data-lengthmsg') !== undefined ? i.attr('data-lengthmsg') : 'Error Longitud') : '')).show('blind');
                }else if(infoError === true){
                    i.next('.news-validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error Info') : '')).show('blind');
                }else{
                    i.next('.news-validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).hide('blind');
                }
            }
        });
        if (formError) return false;
        else sendStr = $(this).serialize();
        action = $(this).attr('action');
        if( ! action ) {
            action = 'subscription/add.php';
        }
        $.ajax({
            type: "POST",
            url: action,
            data: sendStr,
            success: function(msg) {
                if (msg === 'OK') {
                    $("#sendsubscription").addClass("show");
                    $("#errorsubscription").removeClass("show");
                    $('.subscribe_form').find("#news-email").val("");
                } else {
                    $("#sendsubscription").removeClass("show");
                    $("#errorsubscription").addClass("show");
                    $('#errorsubscription').html(msg);
                }
            }
        });
        return false;
    });
});
