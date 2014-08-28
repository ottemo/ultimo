(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "checkoutModule" declaration
             */
            angular.module.checkoutModule = angular.module("checkoutModule", ["ngRoute", "ngResource", "designModule"])

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/checkout", {
                            templateUrl: angular.getTheme("checkout/view.html"),
                            controller: "checkoutController"
                        })
                        .when("/checkout2", {
                            templateUrl: angular.getTheme("checkout/view2.html"),
                            controller: "checkoutController"
                        });
                }]);

            return angular.module.checkoutModule;
        });

})(window.define);