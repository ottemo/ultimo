(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "cartModule" declaration
             */
            angular.module.cartModule = angular.module("cartModule", ["ngRoute", "ngResource", "designModule"])

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/cart", { templateUrl: "views/default/cart/view.html", controller: "cartListController" });
                }]);

            return angular.module.cartModule;
        });

})(window.define);