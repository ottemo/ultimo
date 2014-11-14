(function ($) {
    'use strict';

    $(document).ready(function () {

        $(document).on('click', 'header .search i', function () {
            $(this).siblings('input').fadeIn(900);
        });

        //click on filter's "+"
        $(document).on('click', 'section aside.right-side ul li span', function () {
            $(this).next('ul').toggle(300);
            $(this).toggleClass('active');
        });

        //click on filter
        $(document).on('click', '.right-side ul li a div', function () {
            $(this).siblings('input').trigger('click');
        });
        $(document).on('click', '#modal_window .window .right-side .sizes p', function () {
            $(this).siblings('input').trigger('click');
            $(this).addClass('active').parent('span').siblings().children('p').removeClass('active');
        });
        $(document).on('click', '.pdp .right-side .custom-options p', function () {
            $(this).siblings('input').trigger('click');
            $(this).addClass('active').parent('span').siblings().children('p').removeClass('active');
        });

        /*_______ Product modal ________*/
        //product quick view click
        $(document).on('click', '.product .hidden-group .quick-view', function () {
            $('#modal_window').fadeIn(700);
            var windowHeight = parseInt($('#modal_window .window').outerHeight(true), 10) - 60;
            $('#modal_window .window .main-image').css('height', windowHeight);
        });

        $(document).on('click', '#modal_window .add-to-cart', function () {
            $(this).parents('#modal_window').fadeOut(700);
        });

        //product modal select preview
        $(document).on('click', '#modal_window .window .preview', function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });
        //product modal close
        $(document).on('click', '#modal_window .window i', function () {
            $(this).parents('#modal_window').fadeOut(700);
        });

        //main menu switch active
        $(document).on('click', '.mens-women li a', function () {
            $(this).parent('li').siblings('li').children('a').removeClass('active');
            $(this).addClass('active');
        });


        //checkboxes
        $(document).on('click', '.check-group .check-wrap > span', function () {
            $(this).siblings('input').attr('checked');

        });


        //addresses
        $(document).on('click', '.account.addresses .create', function () {
            $(this).next('.new-address').slideDown(800);
            // $(this).fadeOut(800);
        });

        $(document).on('click', '.account.addresses .new-address .close', function () {
            $(this).parents('.new-address').slideUp(1000);
        });

        //orders page
        $("#modal-order-success").click(function () {
            $("#order-success").modal("show");
        });
        $("#modal-purchase-success").click(function () {
            $("#purchase-success").modal("show");
        });
        $(".login-close").click(function () {
            $(".modal").modal("hide");
        });

        //mobile-menu
        $(document).on('click', 'header .mobile-menu', function () {
            $('header nav.menu').toggleClass('active');
        });
        $(document).on('click', 'header .menu.active a', function () {
            $('header nav.menu').removeClass('active');
        });
    });
})(jQuery);
