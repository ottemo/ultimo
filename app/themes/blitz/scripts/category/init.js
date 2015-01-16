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
            angular.module.categoryModule

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", "GENERAL_CATEGORY_URI", function ($routeProvider, GENERAL_CATEGORY_URI) {
                    $routeProvider
                        .when("/category/:id", {
                            "templateUrl": angular.getTheme("category/view.html"),
                            "controller": "categoryListControllerBlitz"
                        })
                        .when(GENERAL_CATEGORY_URI, {
                            "templateUrl": angular.getTheme("category/view.html"),
                            "controller": "categoryListControllerBlitz"
                        });
                }]);


            return angular.module.categoryModule;
        });

})(window.define);