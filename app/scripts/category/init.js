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

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/category/:id/", {
                            "templateUrl": angular.getTheme("category/view.html"),
                            "controller": "categoryListController"
                        })

                        .when("/category/:id/p/:currentPage", {
                            templateUrl: angular.getTheme("category/view.html"),
                            controller: "categoryListController"
                        });
                }])

                .run(["$designService", "$rootScope", function ($designService, $rootScope) {

                    /**
                     *  Global functions you can use in any angular template
                     */
                    $rootScope.getTemplate = $designService.getTemplate;
                    $rootScope.getTopPage = $designService.getTopPage;
                    $rootScope.getCss = $designService.getCssList;
                    $rootScope.getImg = $designService.getImage;

                }]);

            return angular.module.categoryModule;
        });

})(window.define);