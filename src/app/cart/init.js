/*
 *  cartModule
 */
angular.module('cartModule', [
    'ngRoute',
    'ngResource',
    'coreModule',
    'pdpModule',
    'visitorModule',
    'checkoutModule'
])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/cart', {
                title: 'Bag',
                templateUrl: '/views/cart/view.html',
                controller: 'cartViewController'
            });
    }
]);

