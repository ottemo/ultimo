(function (define) {
    "use strict";

    define(["category/init"], function (categoryModule) {
        categoryModule

            .controller("categoryListController", [
                "$scope",
                "$location",
                "$route",
                "$routeParams",
                "$categoryApiService",
                "$designService",
                "$designImageService",
                "$categoryService",
                "$visitorLoginService",
                "$cartService",
                "$pdpProductService",
                function ($scope, $location, $route, $routeParams, $categoryApiService, $designService, $designImageService, $categoryService, $visitorLoginService, $cartService, $pdpProductService) {
                    var getPage, addCategoryCrumbs, getFilters, setFilters;

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
                            $scope.$emit("add-breadcrumbs", {"label": category.name, "url": $categoryService.getUrl(category.id)});
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
                    $scope.uri = $categoryService.getUrl($routeParams.id) + "/p/:page";
                    $scope.category = {};
                    $scope.popupProduct = {};
                    $scope.productService = $pdpProductService;

                    $scope.filters = {};

                    $scope.blocks = {
                        "sort": false,
                        "search": false,
                        "filter": false
                    };

                    setFilters = function () {
                        var params, values, i;
                        params = $location.search();
                        for (var attr in params) {
                            if (params.hasOwnProperty(attr)
                                ) {
                                if (typeof $scope.filters[attr] === "undefined") {
                                    $scope.filters[attr] = {};
                                }
                                values = params[attr].split(",");
                                for (i = 0; i < values.length; i += 1) {
                                    $scope.filters[attr.replace("?", "")][values[i]] = true;
                                }
                            }
                        }


                    };

                    setFilters();

                    getFilters = function () {
                        var filters, hasFilter;
                        filters = [];
                        hasFilter = false;
                        for (var attr in $scope.filters) {
                            if ($scope.filters.hasOwnProperty(attr)) {
                                var values = [];

                                for (var val in $scope.filters[attr]) {
                                    if ($scope.filters[attr].hasOwnProperty(val) &&
                                        $scope.filters[attr][val] === true) {
                                        values.push(val);
                                        hasFilter = true;
                                    }
                                }
                                if (values.length > 0) {
                                    filters.push(attr + "=" + values.join(","));
                                }
                            }
                        }
                        if (!hasFilter) {
                            return "";
                        }
                        return filters.join("&");
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
                        jQuery('.shadow').css('display', 'none');
                    };

                    $scope.addToCart = function (productId) {
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
                    $categoryApiService.getProducts($location.search(), {"id": $scope.categoryId}).$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.productsList = result;
                        }
                    );

                    /**
                     * Gets list of products
                     */
                    $categoryApiService.getLayered($location.search(), {
                        "id": $scope.categoryId
                    }).$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.layered = result;
                            for (var filter in $scope.layered) {
                                if ($scope.layered.hasOwnProperty(filter)) {
                                    $scope.filters[filter] = {};
                                }
                            }
                            setFilters();
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
                        var orderStr;

                        if (order === "asc") {
                            orderStr = "price";
                        } else {
                            orderStr = "^price";
                        }

                        $scope.filters.sort = {};
                        $scope.filters.sort[orderStr] = true;
                    };

                    $scope.sortByName = function (order) {
                        var orderStr;

                        if (order === "asc") {
                            orderStr = "name";
                        } else {
                            orderStr = "^name";
                        }

                        $scope.filters.sort = {};
                        $scope.filters.sort[orderStr] = true;
                    };

                    $scope.openPopUp = function (product) {
                        $scope.popupProduct = product;
                        $scope.productService.getRatingInfo(product._id);
                        $("#parent_popup_quickShop").show();
                        setTimeout(function () {
                            $('.rating').rating('update', $scope.productService.getAverageRating());
                        }, 300);
                    };

                    $scope.$watch("categoryId", addCategoryCrumbs);

                    $scope.$watch("filters",
                        function () {
                            var filterStr, url, path;
                            filterStr = getFilters();
                            if (typeof filterStr !== "undefined") {
                                url = $categoryService.getUrl($scope.categoryId);

                                // removes the  "#" in the begin string
                                path = url.substr(1, url.length);

                                $location.$$path = path;
                                $location.$$url = path;

                                $location.search(filterStr);
                            }
                        },
                        true
                    );
                }
            ]);
        return categoryModule;
    });
})(window.define);
