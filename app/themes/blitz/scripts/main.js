(function ($) {

    $(document).ready(function () {

    	//padding for fixed navigation
    	setTimeout(function() { 
			var navCheckForFix = $('header').hasClass('navbar-fixed-top');
	    	if (navCheckForFix = true) {
	    		navHeight = parseInt($('header').outerHeight(false));
	    		$('#wrapper-inner').css('paddingTop', navHeight );
	    	};
	    	footerHeight = parseInt($('footer').outerHeight(true));
	    	$('#wrapper-inner').css('paddingBottom', footerHeight + 0 );
	    	$('footer').css('marginTop', - footerHeight );
	    	$("#mini-cart").niceScroll({
	    		cursorcolor:"#484848",
	    		cursoropacitymin: "0.4"
	    	});
	    	$("html").niceScroll();
	    	
    	 }, 700)
        
    	//button click and hide popup
		$(document).on('click', '.modal-footer a', function(event) {
		    $('.modal').modal('hide');
		});

		$(document).on('click', '#navbar li', function(event) {
		    $(this).addClass('active').siblings('li').removeClass('active');
		});
		$(document).on('click', '#modal-registration', function(event) {
		    $("#form-login").modal("hide");
		    $("#form-registration").modal("show");
		});
		$(document).on('click', '#modal-login', function(event) {
		    $("#form-registration").modal("hide");
		    $("#form-login").modal("show");
		});


	     $(document).on('click','.btn-cat',function () {
	       	$('.row-offcanvas').toggleClass('active');
	     });

	     $(document).on('click', '#mini-cart .hide-cart', function(event) {
	     	$('#mini-cart').removeClass('active')
	     });


    });
})(jQuery);

