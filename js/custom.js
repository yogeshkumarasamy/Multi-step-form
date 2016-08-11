$(function() {
    var $sections = $('.form-section');

    function navigateTo(index) {
        // Mark the current section with the class 'current'
        $sections
            .removeClass('current')
            .eq(index)
            .addClass('current');
        // Show only the navigation buttons that make sense for the current section:
        $('.form-navigation .previous').toggle(index > 0);
        var atTheEnd = index >= $sections.length - 1;
        $('.form-navigation .next').toggle(!atTheEnd);
        $('.form-navigation [type=submit]').toggle(atTheEnd);
    }

    function curIndex() {
        // Return the current index by looking at which section has the class 'current'
        return $sections.index($sections.filter('.current'));
    }

    // Previous button is easy, just go back
    $('.form-navigation .previous').click(function() {
        navigateTo(curIndex() - 1);
    });
    $('#open').click(function() {
        $("#test").toggleClass("show hide");
        if ($("#test").hasClass("hide"))
            $("#test input").attr("required", false);
        else
            $("#test input").attr("required", true);

    });

    // Next button goes forward iff current block validates
    $('.form-navigation .next').click(function() {
        if ($('.demo-form').parsley().validate('block-' + curIndex())) {
            if ((curIndex() == 1)) {
                //confirm email
                var emailFields = $sections.filter('.current').find('input[type=email]')
                if (!(emailFields[0].value == emailFields[1].value)) {
                    alert("Email and confirm Email should be same!!");
                    return;
                }
                if ($("#test input").attr("required")) {
                    //pwd strength
                    //confirm pwd
                    var pwdFields = $sections.filter('.current').find('input[type=password]')
                    if (!(pwdFields[1].value == pwdFields[2].value)) {
                        alert("Password and confirm password should be same!!");
                        return;
                    }
                }
            }
            navigateTo(curIndex() + 1);
        }
    });

    // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
    $sections.each(function(index, section) {
        $(section).find(':input').attr('data-parsley-group', 'block-' + index);
    });
    navigateTo(0); // Start at the beginning

    // Password checker
    function passwordCheck(password) {
        if (password.length >= 8)
            strength += 1;

        if (password.match(/(?=.*[0-9])/))
            strength += 1;

        if (password.match(/(?=.*[!,%,&,@,#,$,^,*,?,_,~,<,>,])/))
            strength += 1;

        if (password.match(/(?=.*[a-z])/))
            strength += 1;

        if (password.match(/(?=.*[A-Z])/))
            strength += 1;

        displayBar(strength);
    }

    function displayBar(strength) {
        switch (strength) {
            case 1:
                $("#password-strength span").css({
                    "width": "20%",
                    "background": "#b3ffb3"
                });
                break;

            case 2:
                $("#password-strength span").css({
                    "width": "40%",
                    "background": "#66ffb3b3ffb3"
                });
                break;

            case 3:
                $("#password-strength span").css({
                    "width": "60%",
                    "background": "#00cc66"
                });
                break;

            case 4:
                $("#password-strength span").css({
                    "width": "80%",
                    "background": "#006633"
                });
                break;

            case 5:
                $("#password-strength span").css({
                    "width": "100%",
                    "background": "#004d1a"
                });
                break;

            default:
                $("#password-strength span").css({
                    "width": "0",
                    "background": "#b3ffb3"
                });
        }
    }

    $("[data-strength]").after("<div id=\"password-strength\" class=\"strength\"><span></span></div>")

    $("[data-strength]").focus(function() {
        $("#password-strength").css({
            "height": "7px"
        });
    }).blur(function() {
        $("#password-strength").css({
            "height": "0px"
        });
    });

    $("[data-strength]").keyup(function() {
        strength = 0;
        var password = $(this).val();
        passwordCheck(password);
    });

    $(".demo-form").on('submit', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        //var form = $(this);

        $(".demo-form").parsley().validate();

        if ($(".demo-form").parsley().isValid()) {
            // get all the inputs into an array.
            var $inputs = $('.demo-form :input[type=text], .demo-form :input[type=password], .demo-form :input[type=email]');

            // not sure if you wanted this, but I thought I'd add it.
            // get an associative array of just the values.
            var values = {};
            $.each($('.demo-form').serializeArray(), function(i, field) {
                values[field.name] = field.value;
            });
            //console.log(values);
            localStorage.setItem('formData', JSON.stringify(values));
            displayData();
        }
    });

function displayData() {
    setTimeout(localCheck, 1000);
}
function localCheck() {
    var checkExisting = window.localStorage.getItem('formData')
    if (typeof checkExisting !== 'undefined' && checkExisting !== null && curIndex() == 2) {
    var retObj = JSON.parse(checkExisting);
    $('.form-section').hide();
    $('.navigation').hide();
    $('#feedback').removeClass("hide");
    $(".table tbody").append('<tr><td>'+ retObj.fname +'</td><td>'+ retObj.fname +'</td><td>'+ retObj.email +'</td></tr>');
    }
}

});
