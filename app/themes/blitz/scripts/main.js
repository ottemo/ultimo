(function ($) {

    $(document).ready(function () {

    	//padding for fixed navigation
    	setTimeout(function() { 
	    	$("#mini-cart").niceScroll({
	    		cursorcolor:"#484848",
	    		cursoropacitymin: "0.4"
	    	});
	    	$("html").niceScroll();
	    	// toggle for left sidebar to see all items
			   $(document).on('click','#sidebar .toggler',function(){
			      $(this).siblings('ul').slideToggle(400);
			      $(this).toggleClass('active');
			   });
			var wrapHeight = (parseInt($('#wrapper-inner').css('height'))) - (parseInt($('#wrapper-inner').css('paddingTop')));
			$('#sidebar').css('minHeight', wrapHeight);
			$('.cat').css('minHeight', wrapHeight);
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
	     // hide left drop-down menu for mobile
	     $(document).on('click','#left-drop-nav li a',function(){
           $('#btn-left-drop-nav').trigger('click');
         })


    });
})(jQuery);

