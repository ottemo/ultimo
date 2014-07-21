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

                /**
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {

                    fb.init();
                    gl.init();

                    $routeProvider
                        .when("/registration", {
                            templateUrl: "views/visitor/registration.html",
                            controller: "visitorRegistrationController"
                        })
                        .when("/login", {
                            templateUrl: "views/visitor/login.html",
                            controller: "visitorLoginController"
                        })
                        .when("/account", {
                            templateUrl: "views/visitor/account.html",
                            controller: "visitorAccountController"
                        });
                }])
                .run(["$designService", "$route", "$commonSidebarService", function ($designService, $route, $commonSidebarService) {

                    $commonSidebarService.addItem("registration", "registration", "glyphicon glyphicon-user");
                    $commonSidebarService.addItem("login", "login", "glyphicon glyphicon-user");
                    $commonSidebarService.addItem("account", "account", "glyphicon glyphicon-user");

                }]);
            return angular.module.visitorModule;
        });

})(window.define);