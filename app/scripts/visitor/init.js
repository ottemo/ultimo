(function (define) {
    "use strict";


    define([
            "angular",
            "angular-route",
            "angular-resource",
            "visitor/service/facebook",
            "visitor/service/google"
        ],
        function (angular,aRoute, aResource,fb,gl) {
            /*
             *  Angular "visitorModule" declaration
             */
            angular.module.visitorModule = angular.module("visitorModule", ["ngRoute", "ngResource", "designModule"])

                .constant("FACEBOOK_APP_ID", fb.appId)
                .constant("FACEBOOK_SECRET_CODE", fb.secretKey)
//                .constant("GOOGLE_APP_ID", gl.appId)
//                .constant("FACEBOOK_SECRET_CODE", fb.secretKey)
                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/registration", {
                            templateUrl: "views/visitor/registration.html",
                            controller: "visitorRegistrationController"
                        })
                        .when("/login", {
                            templateUrl: "views/visitor/login.html",
                            controller: "visitorLoginController"
                        });
                }])
                .run(["$designService", "$route", "$commonSidebarService", function ($designService, $route, $commonSidebarService) {

                    fb.init();
                    gl.init();

                    $commonSidebarService.addItem("registration", "registration", "glyphicon glyphicon-user");
                    $commonSidebarService.addItem("login", "login", "glyphicon glyphicon-user");

                    // hack to allow browser page refresh work with routes
                    $route.reload();
                }]);
            return angular.module.visitorModule;
        });

})(window.define);