jQuery(document).ready(function($) {
    "use strict";

    $('form.contactForm').submit(function() {
        let form = $(this).find('.form-group'),
            formError = false,
            emailExpression = /^[^\s()<>@,;:\/]+@\w[\w.-]+\.[a-z]{2,}$/i,
            sendStr = '',
            action = '';

        form.children('input').each(function() {
            let limit,
                i = $(this),
                rule = i.attr('data-rule'),
                identif = i.attr('id');

            if (rule !== undefined) {
                let infoError = false,
                    pos = rule.indexOf(':', 0),
                    errorLength = false;

                if (pos >= 0) {
                    limit = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            formError = infoError = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(limit)) {
                            formError = infoError = true;
                        }
                        break;

                    case 'email':
                        if (!emailExpression.test(i.val())) {
                            formError = infoError = true;
                        }
                        break;

                    case 'checked':
                        if (! i.is(':checked')) {
                            formError = infoError = true;
                        }
                        break;

                    case 'regexp':
                        limit = new RegExp(limit);
                        if (!limit.test(i.val())) {
                            formError = infoError = true;
                        }
                        break;
                }
                switch (identif) {
                    case 'name':
                        if (i.val().length > 50) {
                            formError = errorLength = true;
                        }
                        break;

                    case 'email':
                        if (i.val().length > 50) {
                            formError = errorLength = true;
                        }
                        break;

                    case 'subject':
                        if (i.val().length > 50) {
                            formError = errorLength = true;
                        }
                        break;
                }
                if(errorLength){
                    i.next('.validation').html((errorLength ? (i.attr('data-lengthmsg') !== undefined ? i.attr('data-lengthmsg') : 'Error') : '')).show('blind');
                }else if(infoError){
                    i.next('.validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).show('blind');
                }else{
                    i.next('.validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).hide('blind');
                }
            }
        });
        form.children('textarea').each(function() {

            let i = $(this),
                rule = i.attr('data-rule'),
                identif = i.attr('id');

            if (rule !== undefined) {
                let infoError = false,
                    pos = rule.indexOf(':', 0),
                    errorLength = false,
                    limit;

                if (pos >= 0) {
                    limit = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') {
                            formError = infoError = true;
                        }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(limit)) {
                            formError = infoError = true;
                        }
                        break;
                }
                switch (identif) {
                    case 'message':
                        if (i.val().length > 256) {
                            formError = errorLength = true;
                        }
                        break;
                }
                if(errorLength){
                    i.next('.validation').html((errorLength ? (i.attr('data-lengthmsg') !== undefined ? i.attr('data-lengthmsg') : 'Error') : '')).show('blind');
                }else if(infoError){
                    i.next('.validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).show('blind');
                }else{
                    i.next('.validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).hide('blind');
                }
            }
        });
        if (formError) return false;
        else sendStr = $(this).serialize();
        action = $(this).attr('action');
        if( ! action ) {
            action = 'contactform/contactform.php';
        }
        $.ajax({
            type: "POST",
            url: action,
            data: sendStr,
            success: function(msg) {
                if (msg === 'OK') {
                    $("#sendmessage").addClass("show");
                    $("#errormessage").removeClass("show");
                    $('.contactForm').find("input, textarea").val("");
                } else {
                    $("#sendmessage").removeClass("show");
                    $("#errormessage").addClass("show");
                    $('#errormessage').html(msg);
                }
            }
        });
        return false;
    });

});
