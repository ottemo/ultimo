(function (define) {
    "use strict";

    /*
     *  Angular "commonModule" declaration
     *  (module internal files refers to this instance)
     */
    define([
            "angular",
            "angular-route",
            "angular-cookies"
        ],
        function (angular) {
            /*
             *  Angular "commonModule" declaration
             */
            angular.module.commonModule = angular.module("commonModule", ["ngRoute", "designModule", "ngCookies"])

                .constant("REST_SERVER_URI", "http://localhost:3000")

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/", { templateUrl: "views/common/welcome.html" })
                        .when("/help", { templateUrl: "views/help.html"})

                        .otherwise({ redirectTo: "/"});
                }])

                .run(["$designService", "$route", "$http", "$cookieStore", function ($designService, $route, $http, $cookieStore) {
                    $cookieStore.put("test", "hello");
                    var cookie = $cookieStore.get("test");
//                    var cookie = $cookieStore.get("OTTEMOSESSION");
                    $http.defaults.headers.common.Cookies = cookie;
                    $http.defaults.headers.common.Cookie = cookie;
                    $http.defaults.headers.common.Aaa = cookie;

                    // hack to allow browser page refresh work with routes
                    $route.reload();
                }]);

            return angular.module.commonModule;
        });

})(window.define);