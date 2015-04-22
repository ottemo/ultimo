module.exports = function (){
    /**
     *  Angular "categoryModule" declaration
     */
    return angular.module.categoryModule = angular.module("categoryModule", ["ngRoute", "ngResource", "designModule"])

        .constant("SEARCH_KEY_NAME", "search")
        .constant("GENERAL_CATEGORY_URI", "/shop")
    /**
     *  Basic routing configuration
     */
        .config(["$routeProvider", "$locationProvider", "GENERAL_CATEGORY_URI", function ($routeProvider, $locationProvider, GENERAL_CATEGORY_URI) {
            $routeProvider
                .when("/category/:id", {
                    "templateUrl": angular.getTheme("category/view.html"),
                    "controller": "categoryListController"
                })
                .when(GENERAL_CATEGORY_URI, {
                    "templateUrl": angular.getTheme("category/view.html"),
                    "controller": "categoryListController"
                });
            $locationProvider.html5Mode(true);
        }])

        .run(["$rootScope", "$categoryService", "SEARCH_KEY_NAME", "GENERAL_CATEGORY_URI", function ($rootScope, $categoryService) {

            $rootScope.searchProducts = $categoryService.searchProducts;

        }]);
};