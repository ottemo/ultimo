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

                    // ajax cookies support fix
                    $http.defaults.withCredentials = true;
                    delete $http.defaults.headers.common["X-Requested-With"];

                    // hack to allow browser page refresh work with routes
                    $route.reload();
                }]);

            return angular.module.commonModule;
        });

})(window.define);