(function (define) {
    "use strict";

    define(["category/init"], function (categoryModule) {
        categoryModule

            .controller("categoryListController", [
                "$scope",
                "$routeParams",
                "$categoryApiService",
                "$designImageService",
                function ($scope, $routeParams, $categoryApiService, $designImageService) {
                    var getLimit;
                    /**
                     * Variables for paginator
                     */
                    $scope.currentPage = ($routeParams.currentPage - 1) || 0;
                    $scope.itemsPerPage = 2;

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

                    $scope.toggleBlock = function (block) {
                        return $scope.blocks[block] ? $scope.blocks[block] = false : $scope.blocks[block] = true;
                    };

                    /**
                     * Prepares limit data for request
                     *
                     * @returns {string}
                     */
                    getLimit = function () {
                        var limit, start, count;
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
                            $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
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