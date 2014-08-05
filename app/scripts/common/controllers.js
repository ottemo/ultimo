(function (define) {
    "use strict";

    define(["common/init"], function (commonModule) {

        commonModule
            /*
             *  HTML top page header manipulator (direct service mapping)
             */
            .controller("commonHeaderController", [
                "$scope",
                "$commonHeaderService",
                "$commonApiService",
                "$categoryService",
                function ($scope, $commonHeaderService, $commonApiService, $categoryService) {
                    $scope.it = $commonHeaderService;
                    $scope.rightMenu = $commonHeaderService.getMenuRight();
                    $scope.categories = [];

                    var tree;
                    tree = $categoryService.getTree();
                    if(typeof tree === "undefined"){
                        $commonApiService.getCategories().$promise.then(
                            function (response) {
                                var categories = response.result || [];
                                $scope.categories = categories;
                                $categoryService.setTree(categories);
                            }
                        );
                    } else {
                        $scope.categories = tree;
                    }
                }
            ])

            .controller("commonBreadcrumbsController", [
                "$scope",
                "$commonBreadcrumbsService",
                function ($scope, $commonBreadcrumbsService) {
                    $scope.it = $commonBreadcrumbsService;
                    $scope.crumbs = $commonBreadcrumbsService.getItems();
                }
            ])

            .controller("commonSidebarController", [
                "$scope",
                "$commonSidebarService",
                function ($scope, $commonSidebarService) {
                    $scope.it = $commonSidebarService;
                    $scope.items = $commonSidebarService.getItems();
                }
            ])

            .controller("commonController", [
                "$scope",
                "$commonApiService",
                "$designImageService",
                "$commonBreadcrumbsService",
                function ($scope, $commonApiService, $designImageService, $commonBreadcrumbsService) {
                    var splitName;
                    splitName = function (string) {
                        var parts;
                        var regExp = /\[(.+)\](.+)/i;
                        parts = string.match(regExp);

                        return parts;
                    };

                    $scope.products = [];

                    $commonApiService.getProducts({
                        "limit": "0,5",
                        "extra": "price"
                    }).$promise.then(
                        function (response) {
                            var result, i, parts;
                            result = response.result || [];
                            for (i = 0; i < result.length; i += 1) {
                                parts = splitName(result[i].Name);
                                $scope.products.push({
                                    "Id": result[i].Id,
                                    "Image": result[i].Image,
                                    "Name": parts[2],
                                    "Sku": parts[1],
                                    "Price": result[i].Extra.price
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

                    // HANDLERS FOR BREADCRUMBS (START)
                    //
                    $scope.$on("$locationChangeSuccess", function () {
                        $commonBreadcrumbsService.clear();
                        $commonBreadcrumbsService.addItem("Home", "#");
                    });

                    $scope.$on("add-breadcrumbs", function (event, param) {
                        $commonBreadcrumbsService.addItem(param.label, param.url);
                    });
                    //
                    // HANDLERS FOR BREADCRUMBS (START)

                }
            ]
        );

        return commonModule;
    });
})(window.define);