$(document).ready(function() {
    	
	$(document).on('click','header .search i' ,function(event) {
		$(this).siblings('input').fadeIn(900)
	});

	//click on filter's "+"
	$(document).on('click', 'section aside.right-side ul li span', function(event) {
		$(this).next('ul').toggle(300);
		$(this).toggleClass('active');
	});

	//click on filter
	$(document).on('click','.right-side ul li a div', function(event) {
		$(this).siblings('input').trigger('click');
	});
	$(document).on('click', '#modal_window .window .right-side .sizes p', function(event) {
		$(this).siblings('input').trigger('click');
		$(this).addClass('active').parent('span').siblings().children('p').removeClass('active');
	});
	$(document).on('click', '.pdp .right-side .custom-options p', function(event) {
		$(this).siblings('input').trigger('click');
		$(this).addClass('active').parent('span').siblings().children('p').removeClass('active');
	});

	/*_______ Product modal ________*/
	//product quick view click
	$(document).on('click', '.product .hidden-group .quick-view', function(event) {
		$('#modal_window').fadeIn(700);
	});
	$(document).on('click', '#modal_window .add-to-cart', function(event) {
		$(this).parents('#modal_window').fadeOut(700)
	});

	//product modal select preview
	$(document).on('click', '#modal_window .window .preview', function(event) {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});
	//product modal close
	$(document).on('click', '#modal_window .window i', function(event) {
		$(this).parents('#modal_window').fadeOut(700);
	});

	//main menu switch active
	$(document).on('click', '.mens-women li a', function(event) {
		$(this).parent('li').siblings('li').children('a').removeClass('active');
		$(this).addClass('active');
	});

	
	












});
