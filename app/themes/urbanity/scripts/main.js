$(document).ready(function() {
	$(document).on('click','header .search i' ,function(event) {
		$(this).siblings('input').fadeIn(900)
	});
	$('section aside.right-side ul li span').click(function() {
		$(this).next('ul').toggle(300);
		$(this).toggleClass('active');
	});

	// padding for brands section
	var leftSideHeight = +($('aside.left-side').outerHeight(true)) + 10;
	$('.content .brands').css('paddingTop', leftSideHeight);

	/*_______ Product modal ________*/
	//product quick view click
	$(document).on('click', '.product .hidden-group .quick-view', function(event) {
		var thisProductName = $(this).parent().siblings('.name').text();
		var thisProductModel = $(this).parent().siblings('.model').text();
		var thisProductPrice = $(this).parent().siblings('.price').text();
		var thisMainImageSrc = $(this).parents('.product').children('img').attr('src');

		$('#modal_window').fadeIn(700);
		$('#modal_window .name').text(thisProductName);
		$('#modal_window .model').text(thisProductModel);
		$('#modal_window .price').text(thisProductPrice);
		$('#modal_window .main-image , #modal_window .preview.active img').attr('src', thisMainImageSrc );
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
	//add to cart click
	$(document).on('click', '#modal_window a.add-to-cart', function(event) {
		var cartCounter = +($('header .right-side .cart > span').text()) +1;
		$('header .right-side .cart span').text(cartCounter);
	});

/*
	/*_______ Mini cart ________
	$(document).on('click', 'header .cart', function(event) {
		$(this).find('.mini-cart').toggle(500);
	});*/

	$(document).on('click', '.mens-women li a', function(event) {
		$(this).parent('li').siblings('li').children('a').removeClass('active');
		$(this).addClass('active');
	});















});
