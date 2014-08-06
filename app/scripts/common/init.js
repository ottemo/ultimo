(function (define) {
    "use strict";

    /**
     *  Angular "commonModule" declaration
     *  (module internal files refers to this instance)
     */
    define([
            "angular",
            "angular-route",
            "angular-sanitize"

        ],
        function (angular) {
            /**
             *  Angular "commonModule" declaration
             */
            angular.module.commonModule = angular.module("commonModule", ["ngRoute", "ngSanitize","designModule"])

                .constant("REST_SERVER_URI", "http://dev.ottemo.com:3000")

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/", {
                            templateUrl: angular.getTheme("common/home.html"),
                            controller: "commonController"
                        })
                        .when("/help", { templateUrl: "views/help.html"})

                        .otherwise({ redirectTo: "/"});
                }])

                .run([
                    "$rootScope",
                    "$designService",
                    "$route",
                    "$http",
                    "$commonSidebarService",
                    function ($rootScope, $designService, $route, $http, $commonSidebarService) {

                        // ajax cookies support fix
                        $http.defaults.withCredentials = true;
                        delete $http.defaults.headers.common["X-Requested-With"];

                        // Left navigation menu
                        $commonSidebarService.addItem("Home", "", "glyphicon glyphicon-home", 100);
                        $commonSidebarService.addItem("BLOG", "blog", "glyphicon glyphicon-edit");
                        $commonSidebarService.addItem("STOCKISTS", "stockists", "glyphicon glyphicon-screenshot");
                        $commonSidebarService.addItem("ABOUT", "about", "glyphicon glyphicon-info-sign");
                        $commonSidebarService.addItem("PRESS", "press", "glyphicon glyphicon-book");

                        // hack to allow browser page refresh work with routes
                        $route.reload();
                    }
                ]
            );

            return angular.module.commonModule;
        });

})(window.define);