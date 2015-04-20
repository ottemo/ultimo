module.exports = function (angular) {
    /*
     *  Angular "pdpModule" declaration
     */
    angular.module.pdpModule = pdpModule = angular.module("pdpModule", ["ngRoute", "ngResource"])

        /*
         *  Basic routing configuration
         */
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            $routeProvider
                .when("/product/:id", {
                    templateUrl: angular.getTheme("pdp/view.html"),
                    controller: "pdpController"
                });
            $locationProvider.html5Mode(true);
        }]);

    require('./controller')(angular, pdpModule);
    require('./service/api')(pdpModule);
    require('./service/options')(pdpModule);
    require('./service/product')(pdpModule);
    require('./directive/guiCustomOptions')(pdpModule);


};

