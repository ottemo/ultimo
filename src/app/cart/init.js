/*
 *  cartModule
 */
angular.module("cartModule", [
    "ngRoute",
    "ngResource",
    "designModule",
    "pdpModule",
    "visitorModule",
    "checkoutModule"
])

.config([
    "$routeProvider", "$locationProvider",
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/cart", {
                title: "Cart",
                templateUrl: "/views/cart/view.html",
                controller: "cartListController"
            });
    }
]);

