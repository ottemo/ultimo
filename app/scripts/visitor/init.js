(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource",
            "visitor/service/facebook",
            "visitor/service/google",
            "angular-cookies"
        ],
        function (angular, aRoute, aResource, fb, gl) {
            /*
             *  Angular "visitorModule" declaration
             */
            angular.module.visitorModule = angular.module("visitorModule", ["ngRoute", "ngResource", "ngCookies", "designModule","ngCookies"])

                .constant("LOGIN_COOKIE", "OTTEMOSESSION")
                .constant("VISITOR_DEFAULT_AVATAR", "images/avatar-placeholder.png")

                /**
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {

                    fb.init();
                    gl.init();

                    $routeProvider
                        .when("/account", {
                            templateUrl: "views/visitor/account.html",
                            controller: "visitorAccountController"
                        })
                        .when("/account/address", {

                            templateUrl: "views/visitor/account-page/address-manager.html",
                            controller: "visitorAddressController"
                        });
                }])
                .run(["$designService", "$route", "$commonHeaderService", function ($designService, $route, $commonHeaderService) {

                    $commonHeaderService.addMenuItem("/account", "account", "/account");

                }]);
            return angular.module.visitorModule;
        });

})(window.define);