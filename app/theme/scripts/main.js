$(document).ready(function () {

    $(document).on('click', '#navbar li:not(.cart-wrapper)', function (event) {
        event.preventDefault();
        $('#navbar ul li').removeClass('active');
        $(this).addClass('active');
    });

    //button click and hide popup
    $(document).on('click', '.modal-footer a', function (event) {
        $('.modal').modal('hide');
    });


    $(document).on('click', '#modal-registration', function (event) {
        $("#form-login").modal("hide");
        $("#form-registration").modal("show");
    });

    $(document).on('click', '#modal-login', function (event) {
        $("#form-registration").modal("hide");
        $("#form-login").modal("show");
    });

    $(document).on('click', '#mailchimp .close', function(event) {
        $('.modal').modal('hide');
    });

    $(document).on('click', '#mc-embedded-subscribe', function () {
        $('.modal').modal('hide');
    });

    // mobile collapse the nav
    $(document).on('click', '.main-menu a:not(.dropdown-toggle)', function(e){
        var $navToggle = $('.navbar-toggle');
        if ($navToggle.is(':visible')) {
            $navToggle.click();
        }
    });

    $(document)
        .on('click', '.nav-tabs a.data-toggle-tab', function(e){
            e.preventDefault();

            // Update the active nav tab
            $(this).parent().addClass('active')
            .siblings().removeClass('active');

            // Figure out which tab-pane to target
            var targetClasses = $(this).attr('class').split(' ');
            var startsWith = 'data-target-';
            var target = '';
            $.each(targetClasses, function(i, el){
                if(el.substr(0, startsWith.length) == startsWith){
                    target = el.substr(startsWith.length);

                    return false;
                }
            });

            // Add the active class to the tab pane
            $('.tab-pane-' + target).addClass('active')
            .siblings().removeClass('active');

        });
});
