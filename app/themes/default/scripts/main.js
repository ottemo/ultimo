module.exports = function () {

    $(document).ready(function () {
        
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


	     $('[data-toggle="offcanvas"]').click(function () {
	       	$('.row-offcanvas').toggleClass('active')
	     });

	     $(document).on('click', '#trigger_btn', function(event) {
	     	$('#offcanvas').trigger('click');
	     });

    });

	require('./common/init')();

};
