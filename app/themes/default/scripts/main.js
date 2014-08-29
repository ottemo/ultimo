$(document).ready(function ($) {
    "use strict";

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
        $(".big img").css('display','block');
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

//    $(document).on("click", ".popup-open", function () {
//        $("parent_popup").show();
//    });


    // loader for checkout page
    $(document).on("click", ".total-line a", function () {
        $('html, body').animate({scrollTop:0}, 'slow');
        $(".loader").css('height',$(document).height() );
        $(".loader").show();
        return false;
    });

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

    // accordion for checkout page
    $(document).on("click", '.checkout-accordion .next',function(){
      $(this).parent().parent().parent().slideUp("slow").next().next().slideDown();
    });
    $(document).on("click", '.checkout-accordion .back', function(){
      $(this).parent().parent().parent().slideUp("slow").prev().prev().slideDown();
    });
    $(document).on("click", '.accordion h3',function(){
        $('.accordion > div').slideUp('slow');
        $(this).next().slideDown('slow');
    });

//$(".center-align > div").after("<div class="clear"></div>");
    /*
     if($(window).width() <= 1024 && $(window).width() > 480){
     console.log($(".center-align").children().length + " len");
     var i = 6;//$(".center-align").children().length / 3;
     var numImg = 3;
     appendClear(i,numImg);
     }

     function appendClear(i,numImg){

     $(".center-align").css("border","1px solid red");
     console.log(numImg + " num");
     console.log(i + " i");
     if(numImg === 3){
     i = Math.floor(i);
     for(i; i > 0; i--){
     if(!$(".center-align > div:nth-child("+i*3+")").next().hasClass("clear")){
     $(".center-align > div:nth-child("+i*3+")").after("<div class="clear"></div>");
     }
     }
     }
     };
     */


});

