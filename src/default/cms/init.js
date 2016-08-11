/*
 *  Angular "cmsModule" declaration
 */

angular.module("cmsModule", [
    "ngRoute", 
    "ngResource", 
    "ngSanitize",
    "coreModule"
])

    /*
     *  Basic routing configuration
     */
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/page/:id", {
                templateUrl: "/views/cms/page.view.html",
                controller: "cmsPageController"
            });
    }]);