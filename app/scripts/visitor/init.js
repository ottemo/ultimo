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
                }])
                .run(["$designService", "$route", "$commonSidebarService", "$loginService", function ($designService, $route, $commonSidebarService, $loginService) {

                    $loginService.init().then(
                        function () {
                            if ($loginService.isLoggedIn()) {
                                $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user");
                            }
                        }
                    );


                }]);
            return angular.module.visitorModule;
        });

})(window.define);