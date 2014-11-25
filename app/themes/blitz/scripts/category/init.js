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
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/category/:id", {
                            "templateUrl": angular.getTheme("category/view.html"),
                            "controller": "categoryListControllerBlitz"
                        })

                        .when("/category/:id/p/:currentPage", {
                            templateUrl: angular.getTheme("category/view.html"),
                            controller: "categoryListControllerBlitz"
                        });
                }])


            return angular.module.categoryModule;
        });

})(window.define);