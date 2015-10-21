angular.module("categoryModule", ["ngRoute", "ngResource", "designModule"])

.constant("SEARCH_KEY_NAME", "search")

.constant("GENERAL_CATEGORY_URI", "/shop")

.config(["$routeProvider", "$locationProvider", "GENERAL_CATEGORY_URI",
    function($routeProvider, $locationProvider, GENERAL_CATEGORY_URI) {
        $routeProvider
            .when("/category/:id", {
                "templateUrl": "/views/category/view.html",
                "controller": "categoryViewController"
            })
            .when(GENERAL_CATEGORY_URI, {
                "templateUrl": "/views/category/view.html",
                "controller": "categoryViewController"
            });

        $locationProvider.html5Mode(true);
    }
])

.run(["$rootScope", "$categoryService",
    function($rootScope, $categoryService) {
        $rootScope.searchProducts = $categoryService.searchProducts;
    }
]);

