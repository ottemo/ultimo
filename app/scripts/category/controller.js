(function (define) {
    "use strict";

    define(["category/init"], function (categoryModule) {
        categoryModule

            .controller("categoryListController", [
                "$scope",
                "$route",
                "$routeParams",
                "$categoryApiService",
                "$designService",
                "$designImageService",
                "$categoryService",
                "$visitorLoginService",
                "$cartService",
                function ($scope, $route, $routeParams, $categoryApiService, $designService, $designImageService, $categoryService, $visitorLoginService, $cartService) {
                    var getLimit, getPage, addCategoryCrumbs;

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
                    };

                    addCategoryCrumbs = function () {
                        var list, i, category;

                        list = $categoryService.getChainCategories($scope.categoryId);

                        for (i = 0; i < list.length; i += 1) {
                            category = list[i];
                            $scope.$emit("add-breadcrumbs", {"label": category.name, "url": "/category/" + category.id + "/"});
                        }
                    };

                    /**
                     * Variables for paginator
                     */
                    $scope.currentPage = getPage();
                    $scope.itemsPerPage = 15;

                    $scope.productsList = [];
                    $scope.paths = [];
                    $scope.categoryId = $routeParams.id;
                    $scope.uri = "/category/" + $routeParams.id + "/p/:page";
                    $scope.category = {};
                    $scope.popupProduct = {};

                    $scope.blocks = {
                        "sort": false,
                        "search": false,
                        "filter": false
                    };

                    $scope.init = function () {
                        var tree;

                        tree = $categoryService.getTree();
                        if (typeof tree === "undefined") {
                            $categoryApiService.getCategories().$promise.then(
                                function (response) {
                                    var categories = response.result || [];
                                    $categoryService.setTree(categories);
                                    addCategoryCrumbs();
                                }
                            );
                        }
                    };

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

                    $scope.closeBlock = function (nameBlock) {
                        $scope.blocks[nameBlock] = false;
                        jQuery('.list-bar span').removeClass('active');
                        jQuery('.shadow').css('display','none');
                    };

                    $scope.addToCart = function(productId){
                        var miniCart;
                        miniCart = $(".mini-cart");


                        if ($visitorLoginService.isLoggedIn()) {
                            $cartService.add(productId, 1);

                            miniCart.css("display", "table");
                            setTimeout(function () {
                                miniCart.hide();
                            }, 1500);
                        } else {
                            $("#form-login").modal("show");
                        }
                    };

                    /**
                     * Prepares limit data for request
                     *
                     * @returns {string}
                     */
                    getLimit = function () {
                        var limit, start, count;
                        if ($scope.currentPage === "all") {
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
                            if ($scope.currentPage === "all") {
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
                        return $designImageService.getFullImagePath("", product.default_image); // jshint ignore:line
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

                    $scope.openPopUp = function(product){
                        $scope.popupProduct = product;

                        $("#parent_popup_quickShop").show();
                    }

                    $scope.$watch("categoryId", addCategoryCrumbs);
                }
            ]);
        return categoryModule;
    });
})(window.define);
