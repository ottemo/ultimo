/*
 *  Angular "cmsModule" declaration
 */

angular.module("cmsModule", ["ngRoute", "ngResource", "ngSanitize"])

    /*
     *  Basic routing configuration
     */
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/page/:id", {
                templateUrl: "/views/cms/page.html",
                controller: "cmsPageController"
            });
    }]);