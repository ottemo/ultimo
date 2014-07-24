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
                );
            }])

            .controller("commonBreadcrumbsController", ["$scope", "$commonBreadcrumbsService", function ($scope, $commonBreadcrumbsService) {
                $scope.it = $commonBreadcrumbsService;
                $scope.crumbs = $commonBreadcrumbsService.getItems();
            }])

            .controller("commonSidebarController", ["$scope", "$commonSidebarService", function ($scope, $commonSidebarService) {
                $scope.it = $commonSidebarService;
                $scope.items = $commonSidebarService.getItems();
            }])

            .controller("commonController", ["$scope", "$commonApiService", "$designImageService", function ($scope, $commonApiService, $designImageService) {
                var splitName;
                splitName = function (string) {
                    var parts;
                    var regExp = /\[(.+)\](.+)/i;
                    parts = string.match(regExp);

                    return parts;
                };

                $scope.products = [];

//                        $rootScope.$on("$locationChangeSuccess", function () {
//                $scope.$broadcast("give-me-breadcrumbs");
//                        });

                $commonApiService.getProducts({
                    "limit": "0,5"
                }).$promise.then(
                    function (response) {
                        var result, i, parts;
                        result = response.result || [];
                        for(i = 0; i < result.length; i += 1) {
                            parts = splitName(result[i].Name);
                            $scope.products.push({
                                "Id" : result[i].Id,
                                "Image" : result[i].Image,
                                "Name" : parts[1],
                                "Sku" : parts[2]
                            });
                        }
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