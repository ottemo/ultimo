(function (define) {
    "use strict";

    define(["category/init"], function (categoryModule) {
        categoryModule

            .controller("categoryListController", [
                "$scope",
                "$routeParams",
                "$categoryApiService",
                "$designImageService",
                "$commonBreadcrumbsService",
                function ($scope, $routeParams, $categoryApiService, $designImageService, $commonBreadcrumbsService) {
                    var getLimit, getPage;

                    getPage = function () {
                        var param, page;

                        page = 0;
                        param = $routeParams.currentPage;

                        if (param === "all") {
                            page = param;
                        } else {
                            page = (param - 1) || 0;
                        }

                        return page;
                    }
                    /**
                     * Variables for paginator
                     */
                    $scope.currentPage = getPage();
                    $scope.itemsPerPage = 5;

                    $scope.productsList = [];
                    $scope.paths = [];
                    $scope.categoryId = $routeParams.id;
                    $scope.uri = "/category/" + $routeParams.id + "/p/:page";
                    $scope.category = {};


                    $scope.blocks = {
                        "sort": false,
                        "search": false,
                        "filter": false
                    };

                    $scope.$on("give-me-breadcrumbs", function(event, args) {
console.log(event)
console.log(args)
                        $commonBreadcrumbsService.addItem("Category", "#/category/53cf83ab6bc4de4734000001/");
                    });


                    $scope.toggleBlock = function (activeBlock) {
                        var block;

                        for (block in $scope.blocks) {

                            if ($scope.blocks.hasOwnProperty(block)) {
                                if (block === activeBlock) {
                                    if ($scope.blocks[block]) {
                                        $scope.blocks[block] = false;
                                    } else {
                                        $scope.blocks[block] = true;
                                    }
                                } else {
                                    $scope.blocks[block] = false;
                                }
                            }

                        }

                        return true;
                    };

                    /**
                     * Prepares limit data for request
                     *
                     * @returns {string}
                     */
                    getLimit = function () {
                        var limit, start, count;
                        if ($scope.currentPage === "all"){
                            return "0,-1";
                        }
                        limit = [];
                        count = $scope.itemsPerPage;
                        start = $scope.currentPage * $scope.itemsPerPage;
                        limit.push(start);
                        limit.push(count);
                        return limit.join(",");
                    };

                    /**
                     * Gets number items into collection
                     */
                    $categoryApiService.getCountProducts({"id": $scope.categoryId}).$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.totalItems = result;
                            if ($scope.currentPage === "all"){
                                $scope.pages = 0;
                            } else {
                                $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                            }
                        }
                    );

                    /**
                     * Gets list of products
                     */
                    $categoryApiService.getProducts({
                        "id": $scope.categoryId,
                        "limit": getLimit()
                    }).$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.productsList = result;
                        }
                    );

                    /**
                     * Gets full path to image
                     *
                     * @param {object} product
                     * @returns {string}
                     */
                    $scope.getImage = function (product) {
                        return $designImageService.getFullImagePath("", product.default_image);
                    };

                    /**
                     * Gets category
                     */
                    $categoryApiService.load({"id": $scope.categoryId}).$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.category = result;
                        }
                    );

                    $scope.sortByPrice = function (order) {
                        $scope.productsList.sort(function (a, b) {
                            if (order === "asc") {
                                return a.price > b.price;
                            } else {
                                return a.price < b.price;
                            }
                        });
                    };

                    $scope.sortByName = function (order) {
                        $scope.productsList.sort(function (a, b) {
                            if (order === "asc") {
                                return a.name > b.name;
                            } else {
                                return a.name < b.name;
                            }
                        });
                    };

                }
            ]);
        return categoryModule;
    });
})(window.define);