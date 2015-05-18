module.exports = function() {
    (function ($) {

        $(document).ready(function () {

            $(document).on('click', '#navbar li:not(.cart-wrapper)', function(event) {
                event.preventDefault();
                $('#navbar ul li').removeClass('active');
                $(this).addClass('active');
            });

            //button click and hide popup
            $(document).on('click', '.modal-footer a', function(event) {
                $('.modal').modal('hide');
            });


            $(document).on('click', '#modal-registration', function(event) {
                $("#form-login").modal("hide");
                $("#form-registration").modal("show");
            });

            $(document).on('click', '#modal-login', function(event) {
                $("#form-registration").modal("hide");
                $("#form-login").modal("show");
            });

            $(document).on('click', '#mailchimp .close', function(event) {
                sessionStorage.setItem("showedModal", "true");
                $('.modal').modal('hide');
            });

            $(document).on('click', '#mc-embedded-subscribe', function () {
                sessionStorage.setItem("showedModal", "true");
                $('.modal').modal('hide');
            });

            // mobile collapse the nav
            $(document).on('click', '.main-menu a:not(.dropdown-toggle)', function(e){
                var $navToggle = $('.navbar-toggle');
                if ($navToggle.is(':visible')) {
                    $navToggle.click();
                }
            });
        });

    })(jQuery);

    require('./common/init')();
    require('./category/init')();
};
