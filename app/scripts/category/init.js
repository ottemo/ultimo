(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /**
             *  Angular "categoryModule" declaration
             */
            angular.module.categoryModule = angular.module("categoryModule", ["ngRoute", "ngResource", "designModule"])

                .constant("SEARCH_KEY_NAME", "search")
                .constant("GENERAL_CATEGORY_URI", "/shop")
            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", "GENERAL_CATEGORY_URI", function ($routeProvider, GENERAL_CATEGORY_URI) {
                    $routeProvider
                        .when("/category/:id", {
                            "templateUrl": angular.getTheme("category/view.html"),
                            "controller": "categoryListController"
                        })
                        .when(GENERAL_CATEGORY_URI, {
                            "templateUrl": angular.getTheme("category/view.html"),
                            "controller": "categoryListController"
                        });
                }])

                .run(["$rootScope", "$categoryService", "SEARCH_KEY_NAME", "GENERAL_CATEGORY_URI", function ($rootScope, $categoryService) {

                    $rootScope.searchProducts = $categoryService.searchProducts;

                }]);

            return angular.module.categoryModule;
        });

})(window.define);