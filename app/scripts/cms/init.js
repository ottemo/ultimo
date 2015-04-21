module.exports = function (){
    /*
     *  Angular "cmsModule" declaration
     */
    return angular.module.cmsModule = angular.module("cmsModule", ["ngRoute", "ngResource", "ngSanitize"])

        /*
         *  Basic routing configuration
         */
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            $routeProvider
                .when("/page/:id", {
                    templateUrl: angular.getTheme("cms/page.html"),
                    controller: "cmsPageController"
                });
            $locationProvider.html5Mode(true);
        }]);

};