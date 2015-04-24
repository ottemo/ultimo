module.exports = function (){
    /*
     *  Angular "cartModule" declaration
     */
    return angular.module.cartModule = angular.module("cartModule", ["ngRoute", "ngResource", "designModule"])

        /*
         *  Basic routing configuration
         */
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            $routeProvider
                .when("/cart", {
                    templateUrl: "theme/views/cart/view.html",
                    controller: "cartListController"
                });
            $locationProvider.html5Mode(true);
        }]);
};
