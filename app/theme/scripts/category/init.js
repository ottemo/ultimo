module.exports = function () {
    /**
     *  Angular "categoryModule" declaration
     */
    angular.module.categoryModule

    /**
     *  Basic routing configuration
     */
        .config(["$routeProvider", "GENERAL_CATEGORY_URI", function ($routeProvider, GENERAL_CATEGORY_URI) {
            $routeProvider
                .when("/category/:id", {
                    "templateUrl": "theme/views/category/view.html",
                    "controller": "categoryListControllerBlitz"
                })
                .when(GENERAL_CATEGORY_URI, {
                    "templateUrl": "theme/views/category/view.html",
                    "controller": "categoryListControllerBlitz"
                });
        }]);

    require('./controller')(angular.module.categoryModule);

};
