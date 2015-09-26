/*
 *  Angular "cartModule" declaration
 */
angular.module("cartModule", ["ngRoute", "ngResource", "ngCookies", "designModule", "pdpModule", "visitorModule", "checkoutModule"])
    /*
     *  Basic routing configuration
     */
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/cart", {
                title: 'Cart',
                templateUrl: "theme/views/cart/view.html",
                controller: "cartListController"
            });
        $locationProvider.html5Mode(true);
    }]);
