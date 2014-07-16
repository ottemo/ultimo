(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "categoryModule" declaration
             */
            angular.module.categoryModule = angular.module("categoryModule", ["ngRoute", "ngResource", "designModule"])

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/category/products/:id/", { templateUrl: "views/category/view.html", controller: "categoryListController" })
                        .when("/category/products/:id/p/:currentPage", { templateUrl: "views/category/view.html", controller: "categoryListController" });
                }])

            return angular.module.categoryModule;
        });

})(window.define);