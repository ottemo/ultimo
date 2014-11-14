(function ($) {
    'use strict';

    $(document).ready(function () {

        //padding for fixed navigation
        setTimeout(function () {
            var navbar, navCheckForFix, navHeight;
            navbar = $('nav.navbar');
            navCheckForFix = navbar.hasClass('navbar-fixed-top');
            if (navCheckForFix === true) {
                navHeight = parseInt(navbar.outerHeight(true), 10);
                $('body').css('paddingTop', navHeight - 10);
            }
        }, 500);

        //button click and hide popup
        $(document).on('click', '.modal-footer a', function () {
            $('.modal').modal('hide');
        });

        $(document).on('click', '#navbar li', function () {
            $(this).addClass('active').siblings('li').removeClass('active');
        });

        $(document).on('click', '#modal-registration', function () {
            $('#form-login').modal('hide');
            $('#form-registration').modal('show');
        });

        $(document).on('click', '#modal-login', function () {
            $('#form-registration').modal('hide');
            $('#form-login').modal('show');
        });

    });
})(jQuery);

