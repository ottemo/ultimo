module.exports = function() {

    angular.module.categoryModule
    .config(["$routeProvider", "$locationProvider", "GENERAL_CATEGORY_URI", function ($routeProvider, $locationProvider, GENERAL_CATEGORY_URI) {
        $routeProvider
            .when("/category/:id", {
                "templateUrl": "theme/views/category/view.html",
                "controller": "categoryListControllerTheme"
            })
            .when(GENERAL_CATEGORY_URI, {
                "templateUrl": "theme/views/category/view.html",
                "controller": "categoryListControllerTheme"
            });
        $locationProvider.html5Mode(true);
    }]);
}
