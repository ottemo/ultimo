(function (define) {
    "use strict";

    define(["common/init"], function (commonModule) {

        commonModule
            /*
             *  HTML top page header manipulator (direct service mapping)
             */
            .controller("commonHeaderController", ["$scope", "$commonHeaderService", "$commonApiService", function ($scope, $commonHeaderService, $commonApiService) {
                $scope.it = $commonHeaderService;
                $scope.rightMenu = $commonHeaderService.getMenuRight();
                $scope.categories = [];

                $commonApiService.getCategories().$promise.then(
                    function (response) {
                        var categories = response.result || [];
                        $scope.categories = categories;
                    }
                )
            }])

            .controller("commonSidebarController", ["$scope", "$commonSidebarService", function ($scope, $commonSidebarService) {
                $scope.it = $commonSidebarService;
                $scope.items = $commonSidebarService.getItems();
            }])

            .controller("commonController", ["$scope", "$commonApiService", "$designImageService", function ($scope, $commonApiService, $designImageService) {
                $scope.products = [];


                $commonApiService.getProducts({
                    "limit": "0,5"
                }).$promise.then(
                    function (response) {
                        var result = response.result || [];
                        $scope.products = result;
                    }
                );

                /**
                 * Gets full path to image
                 *
                 * @param {object} product
                 * @returns {string}
                 */
                $scope.getImage = function (img) {
                    return $designImageService.getFullImagePath("", img);
                };

            }]);

        return commonModule;
    });
})(window.define);