module.exports = function (angular) {
    /*
     *  Angular "cartModule" declaration
     */
    angular.module.cartModule = cartModule = angular.module("cartModule", ["ngRoute", "ngResource", "designModule"])

        /*
         *  Basic routing configuration
         */
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            $routeProvider
                .when("/cart", {
                    templateUrl: angular.getTheme("cart/view.html"),
                    controller: "cartListController"
                });
            $locationProvider.html5Mode(true);
        }]);

    require('./service/api')(cartModule);
    require('./service/cart')(cartModule);
    require('./controller')(angular, cartModule);

};