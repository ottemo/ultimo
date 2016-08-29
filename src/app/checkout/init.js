/**
 *  checkoutModule
 */
angular.module('checkoutModule', [
    'ngRoute',
    'ngResource',
    'ngStorage',
    'coreModule',

    'cartModule',
    'giftCardsModule',
    'credit-cards',
    'visitorModule',
])

.config([
    '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/checkout', {
                title: 'Checkout',
                templateUrl: '/views/checkout/accordion.html',
                controller: 'checkoutAccordionController'
            })
            .when('/checkout/success/:orderId', {
                title: 'Checkout Success',
                templateUrl: '/views/checkout/confirmation.html',
                controller: 'checkoutConfirmationController'
            })
            .when('/checkout/success', {
                title: 'Checkout Success',
                templateUrl: '/views/checkout/confirmation.html',
                controller: 'checkoutConfirmationController'
            });
    }
]);

