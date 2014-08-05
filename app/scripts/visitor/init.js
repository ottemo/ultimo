(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "visitorModule" declaration
             */
            angular.module.visitorModule = angular.module("visitorModule", ["ngRoute", "ngResource", "designModule"])

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", function ($routeProvider) {

                    $routeProvider
                        .when("/account", {
                            templateUrl: "views/default/visitor/account.html",
                            controller: "visitorAccountController"
                        })
                        .when("/account/address", {
                            templateUrl: "views/default/visitor/account/address-manager.html",
                            controller: "visitorAddressController"
                        })
                        .otherwise({redirectTo: "/"});
                }]);
            return angular.module.visitorModule;
        });

})(window.define);