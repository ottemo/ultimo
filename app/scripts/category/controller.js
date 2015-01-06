(function (define, $) {
    "use strict";

    define(["angular", "category/init"], function (angular, categoryModule) {
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
                function ($scope, $location, $route, $routeParams, $categoryApiService, $designService,
                          $designImageService, $categoryService, $visitorLoginService, $cartService, $pdpProductService) {

                    var init, getPage, addCategoryCrumbs, getFilters, setFilters, getParams, initWatchers,
                        defaultFilterSet, defaultOptionSet;

                    getPage = function () {
                        var param, page;

                        page = 0;
                        param = $location.search();

                        if (typeof param.p !== "undefined") {
                            page = (param.p - 1);
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

                    getParams = function (withoutLimit) {
                        var search, result, key;

                        result = {};
                        search = $location.search();

                        for (key in search) {
                            if (search.hasOwnProperty(key)) {
                                result[key] = search[key];
                            }
                        }

                        if (!withoutLimit) {

                            if ($scope.currentPage === 0) {
                                result.limit = "0," + $scope.itemsPerPage;
                            } else {
                                result.limit = ($scope.currentPage * $scope.itemsPerPage) + "," + $scope.itemsPerPage;
                            }
                        }

                        return result;
                    };

                    init = function () {
                        /**
                         * Variables for paginator
                         */
                        $scope.currentPage = getPage();
                        $scope.itemsPerPage = angular.appConfigValue("general.app.category.itemsPerPage");
                        $scope.productsList = [];
                        $scope.paths = [];
                        $scope.categoryId = $routeParams.id;
                        $scope.searchText = $routeParams.name;
                        $scope.category = {};
                        $scope.popupProduct = {};
                        $scope.productService = $pdpProductService;
                        $scope.options = {};
                        $scope.filters = {};
                        $scope.blocks = {
                            "sort": false,
                            "search": false,
                            "filter": false
                        };

                        addCategoryCrumbs();
                    };
                    init();

                    initWatchers = function () {
                        defaultFilterSet = $scope.$watch("filters", function () {
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
                        }, true);

                        defaultOptionSet = $scope.$watch("options", function () {
                            $pdpProductService.setOptions($scope.options);
                            $scope.popupProduct = $pdpProductService.getProduct();
                        }, true);
                    };

                    setFilters = function () {
                        var params, values, i, initFilter;
                        params = $location.search();
                        initFilter = function (attr) {
                            if (typeof $scope.filters[attr] === "undefined") {
                                $scope.filters[attr] = {};
                            }
                        };

                        for (var attr in params) {

                            if (params.hasOwnProperty(attr)) {
                                initFilter(attr);

                                if (typeof params[attr] === "string") {
                                    values = params[attr].split(",");
                                    for (i = 0; i < values.length; i += 1) {
                                        $scope.filters[attr.replace("?", "")][values[i]] = true;
                                    }
                                } else  {
                                    $scope.filters[attr.replace("?", "")][params[attr]] = true;
                                }

                            }

                        }

                    };

                    setFilters();

                    getFilters = function () {
                        var filters, getFilterValues, hasFilter;
                        filters = [];
                        hasFilter = false;

                        getFilterValues = function (attr) {
                            var values, val;
                            values = [];

                            for (val in $scope.filters[attr]) {
                                if ($scope.filters[attr].hasOwnProperty(val) &&
                                    $scope.filters[attr][val] === true) {
                                    values.push(val);
                                    hasFilter = true;
                                }
                            }

                            return values;
                        };

                        for (var attr in $scope.filters) {
                            if ($scope.filters.hasOwnProperty(attr)) {
                                var values = getFilterValues(attr);
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

                    /**
                     * Gets number items into collection
                     */
                    $scope.getCountProduct = function () {
                        $categoryApiService.getCountProducts(getParams(true), {"id": $scope.categoryId}).$promise.then(function (response) {
                            var result = response.result || [];
                            $scope.totalItems = result;
                            $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                        });
                    };

                    /**
                     * Gets list of products
                     */
                    $scope.getProducts = function () {
                        $categoryApiService.getProducts(getParams(), {"id": $scope.categoryId}).$promise.then(function (response) {
                            var result = response.result || [];
                            $scope.productsList = result;
                        });
                    };

                    /**
                     * Gets layers for category
                     */
                    $scope.getLayered = function () {
                        $categoryApiService.getLayered($location.search(), {
                            "id": $scope.categoryId
                        }).$promise.then(function (response) {
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
                        $scope.getLayered();
                        $scope.getProducts();
                        $scope.getCountProduct();

                        /**
                         * Gets category
                         */
                        $categoryApiService.load({"id": $scope.categoryId}).$promise.then(function (response) {
                            var result = response.result || [];
                            $scope.category = result;
                        });

                        initWatchers();
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
                        var miniCart, addItem;
                        miniCart = $(".mini-cart");
                        addItem = function () {
                            $cartService.add(productId, 1, $pdpProductService.getOptions()).then(
                                function (response) {
                                    if (response.error !== null) {
                                        $('.modal').modal('hide');
                                        $scope.openPopUp(productId);
                                    } else {
                                        $pdpProductService.setOptions({});
                                        $("#quick-view").modal('hide');

                                        miniCart.modal('show');
                                        setTimeout(function () {
                                            miniCart.modal('hide');
                                        }, 2000);
                                    }
                                }
                            );
                        };

                        if (angular.appConfigValue("general.checkout.guest_checkout")) {
                            addItem();
                        } else {
                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                if (isLoggedIn) {
                                    addItem();
                                } else {
                                    $("#form-login").modal("show");
                                }
                            });
                        }

                    };

                    /**
                     * Gets full path to image
                     *
                     * @param {object} product
                     * @returns {string}
                     */
                    $scope.getImage = function (product, size) {
                        if (typeof product === "undefined") {
                            return $designImageService.getFullImagePath("", null, size);
                        }
                        return $designImageService.getFullImagePath("", product["default_image"], size);
                    };

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
                        $pdpProductService.setProduct(product);
                        $scope.popupProduct = $pdpProductService.getProduct();
                        $scope.productService.getRatingInfo(product._id);
                        $("#quick-view").modal('show');
                        setTimeout(function () {
                            try {
                                $('.rating').rating('update', $scope.productService.getAverageRating());
                            } catch (e) {

                            }
                        }, 300);
                    };

                    $scope.showMoreBtn = function () {
                        var countLoadedGoods;
                        countLoadedGoods = ($scope.currentPage + 1) * $scope.itemsPerPage;

                        if (countLoadedGoods >= $scope.totalItems) {
                            return false;
                        }

                        return true;
                    };

                    $scope.loadMore = function () {
                        $scope.clickMore = true;
                        $scope.currentPage += 1;
                        $categoryApiService.getProducts(getParams(), {"id": $scope.categoryId}).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                $scope.productsList = $scope.productsList.concat(result);
                            }
                        );
                    };

                    $scope.search = function () {
                        $scope.filters.name = {};
                        var values = $scope.searchText.split(/[, ]/);
                        for (var i = 0; i < values.length; i += 1) {
                            $scope.filters.name[values[i]] = true;
                        }
                    };
                }
            ]);
        return categoryModule;
    });
})(window.define, jQuery);
