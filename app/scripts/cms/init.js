(function (define) {
    "use strict";

    /*
     *  Angular "cmsModule" declaration
     *  (module internal files refers to this instance)
     */
    define([
            "angular",
            "angular-route",
            "angular-resource",
            "angular-sanitize"
        ],
        function (angular) {
            /*
             *  Angular "cmsModule" declaration
             */
            angular.module.cmsModule = angular.module("cmsModule", ["ngRoute", "ngResource", "ngSanitize"])

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
                    $routeProvider
                        .when("/page/:id", {
                            templateUrl: "themes/blitz/views/cms/page.html",
                            controller: "cmsPageController"
                        });
                    $locationProvider.html5Mode(true);
                }]);

            return angular.module.cmsModule;
        });

})(window.define);
