angular.module('categoryModule')

.config(["$routeProvider", "$locationProvider", "GENERAL_CATEGORY_URI", function($routeProvider, $locationProvider, GENERAL_CATEGORY_URI) {
    $routeProvider
        .when("/category/:id", {
            "templateUrl": "/views/category/view.html",
            "controller": "categoryListControllerTheme"
        })
        .when(GENERAL_CATEGORY_URI, {
            'title': "Shop All Kari Gran's Natural & Organic Skin Care Products",
            'description': "Want soft, natural & healthy skin - without the chemicals? Kari Gran creates eco-friendly skincare products safe for any skin or age. Be Kind to your Skin.",
            "templateUrl": "/views/category/view.html",
            "controller": "categoryListControllerTheme"
        });
    $locationProvider.html5Mode(true);
}]);
