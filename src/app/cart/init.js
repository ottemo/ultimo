/*
 *  Angular "cartModule" declaration
 */
angular.module("cartModule", ["ngRoute", "ngResource", "designModule", "pdpModule", "visitorModule", "checkoutModule"])
    /*
     *  Basic routing configuration
     */
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/cart", {
                title: "Cart",
                templateUrl: "/views/cart/view.html",
                controller: "cartListController"
            });
        $locationProvider.html5Mode(true);
    }]);
