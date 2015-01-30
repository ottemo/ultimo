/* Templates */
var templateForActivation = '<li><a id="active_information">Template information</a></li>';
var template = '<div id="page_information"><div class="alert alert-info" role="alert"><span class="fa fa-info-circle"></span> Use template: <span class="information"></span></div></div>'

/* destination points */
var containerForActivation = "#navbar ul.navbar-nav";
var container = "#wrapper";


$(document).on('click', '#active_information', function(event) {
	event.preventDefault();
	$('body').toggleClass('page-info');
});

$(document).on('mouseenter', 'body.page-info *', function(event) {
	event.preventDefault();
	event.stopPropagation();

	var thisView = $(this).closest('ng-include').attr('src').replace("getTemplate('", "").replace("')", "");

	if (thisView == 'getTopPage()') {
		var pathname = $(location).attr('hash').replace('#/','');
		if (pathname == 'login') {
			thisView = 'visitor/login-page.html';
		};
		if (pathname == 'registration') {
			thisView = 'visitor/registration-page.html';
		};
		if (pathname == 'forgot-password') {
			thisView = 'visitor/forgot-password.html';
		};
		if (pathname == 'resend-activation') {
			thisView = 'visitor/resend-activation.html';
		};
		if (pathname == 'account') {
			thisView = 'visitor/account.html';
		};
		if (pathname == 'account/address') {
			thisView = 'visitor/account/address-manager.html';
		};
		if (pathname == 'account/orders') {
			thisView = 'visitor/account/orders.html';
		};
		if (pathname.match(/order\/.*/)) {
			thisView = 'visitor/account/order-details.html';
		};
		if (pathname.match(/category\/.*/)) {
			thisView = 'category/view.html';
		};
		if (pathname.match(/product\/.*/)) {
			thisView = 'pdp/view.html';
		};
		if (pathname == 'cart') {
			thisView = 'cart/view.html';
		};
		if (pathname == 'cart') {
			thisView = 'cart/view.html';
		};
		if (pathname == 'spcheckout') {
			thisView = 'checkout/view.html';
		};
		if (pathname == '') {
			thisView = 'common/home.html';
		};
		if (pathname == 'about.html') {
			thisView = 'common/about.html';
		};
	}

	$('#page_information .information').html(thisView);
});

/* add template of activation link */
$(document).ready(function() {
	setTimeout(function(){
		$(containerForActivation).append(templateForActivation);
		$(container).append(template);
	},1500)
});