(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource",
            "angular-cookies",
            "visitor/service/facebook",
            "visitor/service/google"
        ],
        function (angular, aRoute, aResource, ngCookie, fb, gl) {
            /*
             *  Angular "visitorModule" declaration
             */
            angular.module.visitorModule = angular.module("visitorModule", ["ngRoute", "ngResource",  "designModule", "ngCookies"])

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
                .run(["$designService", "$route", "$commonSidebarService", "$http", "$cookieStore", function ($designService, $route, $commonSidebarService, $http, $cookieStore) {
//                    console.log($cookieStore.get("OTTEMOSESSION"))
//                    $http.defaults.headers.post.Cookies = $cookieStore.get("SSID");

                    $commonSidebarService.addItem("registration", "registration", "glyphicon glyphicon-user");
                    $commonSidebarService.addItem("login", "login", "glyphicon glyphicon-user");

                    // hack to allow browser page refresh work with routes
                    $route.reload();
                }]);
            return angular.module.visitorModule;
        });

})(window.define);