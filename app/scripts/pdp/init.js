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
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/product/:id", { templateUrl: "views/default/pdp/view.html", controller: "pdpController"});
                }]);

            return angular.module.pdpModule;
        });

})(window.define);