angular.module("categoryModule", [
    "ngRoute", 
    "ngResource", 
    "coreModule"
])

.constant("SEARCH_KEY_NAME", "search")

.config(["$routeProvider", "$locationProvider",
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/category/:id", {
                "templateUrl": "/views/category/view.html",
                "controller": "categoryViewController"
            });
    }
])

.run(["$rootScope", "categoryService",
    function($rootScope, categoryService) {
        $rootScope.searchProducts = categoryService.searchProducts;
    }
]);

