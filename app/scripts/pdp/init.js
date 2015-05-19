/*
 *  Angular "pdpModule" declaration
 */
angular.module("pdpModule", ["ngRoute", "ngResource", "filtersModule"])

    /*
     *  Basic routing configuration
     */
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/product/:id", {
                templateUrl: "theme/views/pdp/view.html",
                controller: "pdpController"
            });
        $locationProvider.html5Mode(true);
    }]);