(function (define) {
    "use strict";

    /*
     *  Angular "pdpModule" declaration
     *  (module internal files refers to this instance)
     */
    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "pdpModule" declaration
             */
            angular.module.pdpModule = angular.module("pdpModule", ["ngRoute", "ngResource"])

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
                    $routeProvider
                        .when("/product/:id", {
                            templateUrl: "theme/views/pdp/view.html",
                            controller: "pdpController"
                        });
                    $locationProvider.html5Mode(true);
                }]);

            return angular.module.pdpModule;
        });

})(window.define);
