(function ($) {
    'use strict';

    $(document).ready(function () {

        //padding for fixed navigation
        setTimeout(function(){
            $("#mini-cart").niceScroll({
                    cursorcolor: "#484848",
                    cursoropacitymin: "0.4"
                });

                $("html").niceScroll();
        },1000)

        // toggle for left sidebar to see all items
        $(document).on('click', '#sidebar .toggler', function () {
            $(this).siblings('ul').slideToggle(400);
            $(this).toggleClass('active');
        });

        //button click and hide popup
        $(document).on('click', '.modal-footer a', function () {
            $('.modal').modal('hide');
        });

        //button click and hide popup
        $(document).on('click', '.modal-footer a', function () {
            $('.modal').modal('hide');
        });

        $(document).on('click', '#navbar li', function () {
            $(this).addClass('active').siblings('li').removeClass('active');
        });

        $(document).on('click', '#modal-registration', function () {
            $("#form-login").modal("hide");
            $("#form-registration").modal("show");
        });

        $(document).on('click', '#modal-login', function () {
            $("#form-registration").modal("hide");
            $("#form-login").modal("show");
        });

        $(document).on('click', '.btn-cat', function () {
            $('.row-offcanvas').toggleClass('active');
        });

        $(document).on('click', '#mini-cart .hide-cart', function () {
            $('#mini-cart').removeClass('active');
        });

        $(document).on('click', '#left-drop-nav li a', function () {
            $('#btn-left-drop-nav').trigger('click');
        });
    });

})(jQuery);