angular.module('categoryModule')

.controller('categoryViewController', [
    '$scope',
    '$location',
    '$route',
    '$routeParams',
    'categoryApiService',
    'categoryService',
    'visitorLoginService',
    'cartService',
    'pdpProductService',
    'commonUtilService',
    '$timeout',
    'SEARCH_KEY_NAME',
    function(
        $scope,
        $location,
        $route,
        $routeParams,
        categoryApiService,
        categoryService,
        visitorLoginService,
        cartService,
        pdpProductService,
        commonUtilService,
        $timeout,
        SEARCH_KEY_NAME
    ) {

        // Utilities
        $scope.productService = pdpProductService;

        // Category Details
        $scope.categoryId = $routeParams.id || null;
        $scope.category = {};
        $scope.productsList = [];

        // Pagination
        $scope.itemsPerPage = angular.appConfig.categoryItemsPerPage;
        $scope.pages = 0;
        $scope.totalItems = 0;

        // Filtering
        $scope.searchField = SEARCH_KEY_NAME;
        $scope.searchText = "";
        $scope.filters = {};

        // Pop Up Product
        // REFACTOR: Form validation is broken in popup
        $scope.popupProduct = {};
        $scope.options = {};
        $scope.message = {};
        $scope.isAddingToCart = false;
        $scope.isAddToCartSuccess = false;

        ///////////////////////////////////////

        $scope.activate = function () {
            $scope.currentPage = $scope._getPage();
            //REFACTOR: if you move this it breaks your url
            // and we setFilters in getLayered as well
            $scope._setFilters();

            $scope._getCategory();
            $scope._getLayered();
            $scope._getProducts();
            $scope._getCountProduct();

            $scope._getSearchText();
            $scope._updateTree();

            $scope._initWatchers();
        };

        $scope._getCategory = function() {
            if ($scope.categoryId !== null) {
                categoryApiService.load({
                    "id": $scope.categoryId
                }).$promise.then(function(response) {
                    $scope.category = response.result || [];
                });
            }
        };

        /**
         * Gets layers for category
         */
        $scope._getLayered = function() {
            categoryApiService.getLayered({
                categoryID: $scope.categoryId
            }).$promise
                .then(function(response) {
                    var result = response.result || [];
                    $scope.layered = result;
                    angular.forEach(result, function(filterName){
                        $scope.filters[filterName] = {};
                    });
                    $scope._setFilters();
                });
        };

        /**
         * Gets list of products
         */
        $scope._getProducts = function() {
            var params = $scope._getParams();
            params["categoryID"] = $scope.categoryId;
            categoryApiService.getProductsByCategoryId(params).$promise.then(function(response) {
                var result = response.result || [];
                $scope.productsList = result;
            });
        };

        /**
         * Gets number items into collection
         */
        $scope._getCountProduct = function() {
            var params = $scope._getParams(true);
            params["categoryID"] = $scope.categoryId;
            categoryApiService.getCountProducts(params).$promise.then(function(response) {
                var result = response.result || [];
                $scope.totalItems = result;
                $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
            });
        };

        $scope._getPage = function() {
            var page = 0;
            var param = $location.search();

            if (typeof param.p !== "undefined") {
                page = (param.p - 1);
            }

            return page;
        };

        $scope._addCategoryCrumbs = function() {
            var list, i, category;
            list = categoryService.getChainCategories($scope.categoryId);

            for (i = 0; i < list.length; i += 1) {
                category = list[i];
                $scope.$emit("add-breadcrumbs", {
                    "label": category.name,
                    "url": categoryService.getUrl(category.id)
                });
            }
        };

        $scope._getParams = function(withoutLimit) {
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

        $scope._updateTree = function() {
            var categories = categoryService.getTree();

            if (!categories.length) {
                categoryApiService.getCategories().$promise
                    .then(function(response) {
                        var categories = response.result || [];
                        var tree = categoryService.setTree(categories);
                        $scope._setSubcategories(tree);
                        $scope._addCategoryCrumbs();
                    });
            } else {
                $scope._setSubcategories(categories);
                $scope._addCategoryCrumbs();
            }


        };

        $scope._setSubcategories = function(categories) {
            var category = categoryService.getSubMenuItem(categories, $scope.categoryId, []);
            $scope.categories = category[0] && category[0].child;
        };

        $scope._getSearchText = function() {
            if (typeof $routeParams[$scope.searchField] !== "undefined") {
                $scope.searchText = $routeParams[$scope.searchField].trim("~").replace(/,/g, " ");
            }
        };

        $scope._changeLocation = function() {
            var filterStr, url;
            filterStr = $scope._getFilters();
            if (typeof filterStr !== "undefined") {
                url = categoryService.getUrl($scope.categoryId);
                categoryService.setFiltersInLocation(url, filterStr);
            }
        };

        $scope._initWatchers = function() {
            $scope.$watch("filters", $scope._changeLocation, true);

            $scope.$watch("options", function() {
                pdpProductService.setOptions($scope.options);
                $scope.popupProduct = pdpProductService.getProduct();
            }, true);
        };

        $scope._setFilters = function() {
            var params, values, i, initFilter;
            params = $location.search();
            initFilter = function(attr) {
                if (typeof $scope.filters[attr] === "undefined") {
                    $scope.filters[attr] = {};
                }
            };

            for (var attr in params) {

                if (params.hasOwnProperty(attr)) {
                    initFilter(attr);

                    if (typeof params[attr] === "string") {
                        values = params[attr].replace(/[\?~]/, "").split(",");
                        for (i = 0; i < values.length; i += 1) {
                            $scope.filters[attr.replace(/[\?~]/, "")][values[i]] = true;
                        }
                    } else {
                        $scope.filters[attr.replace(/[\?~]/, "")][params[attr]] = true;
                    }

                }

            }
        };

        $scope._getFilters = function() {
            var filters, prepareFilters, hasFilter;
            filters = [];
            hasFilter = false;

            prepareFilters = function() {
                var getFilterValues;

                getFilterValues = function(attr) {
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
                        if (values.length > 0 && attr !== SEARCH_KEY_NAME) {
                            filters.push(attr + "=" + values.join(","));
                        } else if (values.length > 0 && attr === SEARCH_KEY_NAME && values.join(",") !== "") {
                            filters.push(attr + "=~" + values.join(","));
                        }
                    }
                }
            };

            prepareFilters();

            if (!hasFilter) {
                return "";
            }

            return filters.join("&");
        };

        //TODO: we should get away from touching the dom in the
        // controllers
        $scope.viewDetails = function(product) {
            $("#quick-view").modal('hide');

            $timeout(function() {
                var url = pdpProductService.getUrl(product._id);
                $location.path(url);
            }, 250);
        };

        $scope.addToCart = function(product) {
            if (angular.appConfig.hasGuestCheckout) {
                if (!$scope.isAddingToCart) {
                    $scope._addItem(product);
                }
            } else {
                visitorLoginService.isLoggedIn().then(function(isLoggedIn) {
                    if (isLoggedIn && !$scope.isAddingToCart) {
                        $scope._addItem(product);
                    }
                });
            }
        };

        $scope._addItem = function(product) {
            cartService.add(product._id, 1, pdpProductService.getOptions()).then(
                function(response) {
                    $scope.isAddingToCart = true;

                    if (response.error !== null) {
                        $scope.message = commonUtilService.getMessage(response);
                        $scope.isAddingToCart = false;
                    } else {
                        pdpProductService.setOptions({});
                        $scope.isAddToCartSuccess = true;
                        $("#quick-view").modal('hide');
                        $("#quick-view-success").modal('show');
                    }
                }
            );
        };

        $scope.sortByPrice = function(order) {
            var orderStr;

            if (order === "asc") {
                orderStr = "price";
            } else {
                orderStr = "^price";
            }

            $scope.filters.sort = {};
            $scope.filters.sort[orderStr] = true;
        };

        $scope.sortByName = function(order) {
            var orderStr;

            if (order === "asc") {
                orderStr = "name";
            } else {
                orderStr = "^name";
            }

            $scope.filters.sort = {};
            $scope.filters.sort[orderStr] = true;
        };

        $scope.openPopUp = function(product) {
            $scope.message = {};
            $scope.options = {};
            pdpProductService.setProduct(product);
            $scope.popupProduct = pdpProductService.getProduct();
            $scope.productService.getRatingInfo(product._id);
            $("#quick-view").modal('show');
            setTimeout(function() {
                try {
                    $('.rating').rating('update', $scope.productService.getAverageRating());
                } catch (e) {

                }
            }, 300);
        };

        $scope.showMoreBtn = function() {
            var countLoadedGoods;
            countLoadedGoods = ($scope.currentPage + 1) * $scope.itemsPerPage;

            if (countLoadedGoods >= $scope.totalItems) {
                return false;
            }

            return true;
        };

        $scope.loadMore = function() {
            $scope.clickMore = true;
            $scope.currentPage += 1;

            var params = $scope._getParams();
            params["categoryID"] = $scope.categoryId;

            categoryApiService.getProductsByCategoryId(params).$promise.then(
                function(response) {
                    var result = response.result || [];
                    $scope.productsList = $scope.productsList.concat(result);
                }
            );
        };

        $scope.search = function() {
            var searchObj, values;
            searchObj = {};
            values = this.searchText.split(/[, ]/);
            searchObj[$scope.searchField] = {};
            for (var i = 0; i < values.length; i += 1) {
                searchObj[$scope.searchField][values[i]] = true;
            }
            $scope.filters[$scope.searchField] = searchObj[$scope.searchField];
        };
    }
]);
