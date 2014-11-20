(function ($) {

    $(document).ready(function () {

    	//padding for fixed navigation
    	setTimeout(function() { 
			var navCheckForFix = $('nav.navbar').hasClass('navbar-fixed-top');
	    	if (navCheckForFix = true) {
	    		navHeight = parseInt($('nav.navbar').outerHeight(false));
	    		$('#wrapper-inner').css('paddingTop', navHeight );
	    	};
	    	footerHeight = parseInt($('#footer').outerHeight(true));
	    	$('#wrapper-inner').css('paddingBottom', footerHeight + 40 );
	    	$('#footer').css('marginTop', - footerHeight );
    	 }, 500)
        
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

		$('.nav-tabs').mouseover(function(event) {
			alert('lol')
		});

    });
})(jQuery);

