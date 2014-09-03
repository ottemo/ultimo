(function (define) {
    "use strict";

    /*
     *  Angular "cmsModule" declaration
     *  (module internal files refers to this instance)
     */
    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "cmsModule" declaration
             */
            angular.module.cmsModule = angular.module("cmsModule", ["ngRoute", "ngResource"])

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/page/:id", {
                            templateUrl: angular.getTheme("cms/page.html"),
                            controller: "cmsPageController"
                        });
                }]);

            return angular.module.cmsModule;
        });

})(window.define);