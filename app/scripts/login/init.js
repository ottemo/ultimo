(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource",
            "login/service/facebook",
            "login/service/google",
            "angular-cookies"
        ],
        function (angular, aRoute, aResource, fb, gl) {
            /*
             *  Angular "loginModule" declaration
             */
            angular.module.loginModule = angular.module("loginModule", ["ngRoute", "ngResource", "ngCookies", "designModule","ngCookies"])

                .constant("LOGIN_COOKIE", "OTTEMOSESSION")
                .constant("VISITOR_DEFAULT_AVATAR", "images/avatar-placeholder.png")

                /**
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function () {
                    fb.init();
                    gl.init();
                }]);
            return angular.module.loginModule;
        });

})(window.define);