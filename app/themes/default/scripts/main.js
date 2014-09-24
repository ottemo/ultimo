(function ($) {
    "use strict";
    $(document).ready(function () {

        // accordion for pdp page
        $(document).on("click dblclick", ".accordion a", function () {
            $(this).parent().toggleClass("active");
        });

        // slider for pdp page
        $(document).on("click", ".small img", function () {
            $(".big img").hide().attr("src", $(this).attr("src"));

            $(".big img").load(function () {
                $(this).fadeIn(2000);
            });
            $(".big img").css('display', 'block');
        });

        // spinner for pdp, mini-cart, cart pages
        $(document).on("click", ".btn-up", function () {
            $(this).parent().prev().val(parseInt($(this).parent().prev().val(), 10) + 1);
        });

        $(document).on("click", ".btn-down", function () {
            if ($(this).parent().prev().val() > 1) {
                $(this).parent().prev().val(parseInt($(this).parent().prev().val(), 10) - 1);
            }
        });

        // dropdown for checkout page
        $(".ch-form .dropdown-toggle").dropdown();

        // spinner for pdp, mini-cart, cart pages
        $(document).on("click", ".btn-up", function () {
            $(this).parent().prev().val(parseInt($(this).parent().prev().val(), 10) + 1);
        });
        $(document).on("click", ".btn-down", function () {
            if ($(this).parent().prev().val() > 1) {
                $(this).parent().prev().val(parseInt($(this).parent().prev().val(), 10) - 1);
            }
        });

        // droping subcategories from menu
        $(document).on("click", ".h-block nav ul li .caret", function () {
            $(this).parent().siblings().removeClass("active");
            $(this).parent().toggleClass("active");
        });

        // hide mini-card block
        $(document).on("click", ".mini-cart-footer, .mini-cart-more", function () {
            $(".mini-cart").hide();
        });

        // open popup on my account pages
        $(document).on("click", ".popup-close", function () {
            $(".parent_popup").hide();
        });

        setTimeout(function () {
            $("#accordion").accordion();
        }, 500);

        // dropdown for checkout page
        $(".ch-form .dropdown-toggle").dropdown();

        // open more filters for pdp category
        $(document).on("click", ".filter-left-block a", function () {
            $(this).parent().toggleClass("active");
            if ($(this).parent().hasClass("active")) {
                $(this).html("Close<b class=\"caret\"></b>");
            } else {
                $(this).html("View more<b class=\"caret\"></b>");
            }
        });


        $("#pageslide").on("click", "ul > li", function () {
            $("#pageslide").css("display", "none");
        });

        // Opens filter blocks on tablet and mobile pages
        $(document).on('click', '.filter-btn', function () {
            if ($(this).parent().hasClass('active')) {
                $(this).parent().removeClass('active');
            }
            else {
                $(this).parent().addClass('active');
            }
        });


        // add active class for rating sort in PDP page
        $(document).on('click', '.tab-review-sort li a', function () {
            $('.tab-review-sort li a').removeClass('active');
            $(this).addClass('active');
        });


    });
})(jQuery);

