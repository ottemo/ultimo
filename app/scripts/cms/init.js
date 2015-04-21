module.exports = function (angular) {
    /*
     *  Angular "cmsModule" declaration
     */
    angular.module.cmsModule = cmsModule = angular.module("cmsModule", ["ngRoute", "ngResource", "ngSanitize"])

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

    require('./controller/page')(cmsModule);
    require('./service/api')(cmsModule);
    require('./service/page/')(cmsModule);

};