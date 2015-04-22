module.exports = function(){
    /*
     *  Angular "pdpModule" declaration
     */
    return angular.module.pdpModule = angular.module("pdpModule", ["ngRoute", "ngResource"])

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

};