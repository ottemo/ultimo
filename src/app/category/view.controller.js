angular.module("categoryModule")

.controller("categoryViewController", [
    "$scope",
    "$location",
    "$route",
    "$routeParams",
    "$categoryApiService",
    "$designService",
    "$categoryService",
    "$visitorLoginService",
    "$cartService",
    "$pdpProductService",
    "$commonUtilService",
    "$timeout",
    "GENERAL_CATEGORY_URI",
    "SEARCH_KEY_NAME",
    function($scope, $location, $route, $routeParams, $categoryApiService, $designService,
        $categoryService, $visitorLoginService, $cartService,
        $pdpProductService, $commonUtilService, $timeout, GENERAL_CATEGORY_URI, SEARCH_KEY_NAME) {

        // Utilities
        $scope.productService = $pdpProductService;

        // Pagination
        $scope.currentPage = getPage();
        $scope.itemsPerPage = angular.appConfigValue("general.app.category.itemsPerPage");
        $scope.pages = 0;
        $scope.totalItems = 0;

        // Filtering
        $scope.searchField = SEARCH_KEY_NAME;
        $scope.searchText = "";
        $scope.search = search;
        $scope.filters = {};
        $scope.blocks = {
            "sort": false,
            "search": false,
            "filter": false
        };
        $scope.toggleBlock = toggleBlock;
        $scope.closeBlock = closeBlock;
        $scope.sortByPrice = sortByPrice;
        $scope.sortByName = sortByName;

        // Category Details
        $scope.isShop = (GENERAL_CATEGORY_URI === $location.path());
        $scope.categoryId = $routeParams.id || null;
        $scope.category = {};
        $scope.productsList = [];
        $scope.showMoreBtn = showMoreBtn;
        $scope.loadMore = loadMore;

        // Pop Up Product
        $scope.popupProduct = {};
        $scope.options = {};
        $scope.message = {};
        $scope.viewDetails = viewDetails;
        $scope.isAddingToCart = false;
        $scope.isAddToCartSuccess = false;
        $scope.addToCart = addToCart;
        $scope.openPopUp = openPopUp;

        init();

        ///////////////////////////////////////

        function init() {
            //REFACTOR: if you move this it breaks your url
            // and we setFilters in getLayered as well
            setFilters();

            getCategory();
            getLayered();
            getProducts();
            getCountProduct();

            getSearchText();
            updateTree();

            initWatchers();
        };

        function getCategory() {
            if ($scope.categoryId !== null) {
                $categoryApiService.load({
                    "id": $scope.categoryId
                }).$promise.then(function(response) {
                    var result = response.result || [];
                    $scope.category = result;
                });
            }
        }

        /**
         * Gets layers for category
         */
        function getLayered() {
            if ($scope.isShop) {
                $categoryApiService.getShopLayered($location.search(), {}).$promise.then(function(response) {
                    var result = response.result || [];
                    $scope.layered = result;
                    for (var filter in $scope.layered) {
                        if ($scope.layered.hasOwnProperty(filter)) {
                            $scope.filters[filter] = {};
                        }
                    }
                    setFilters();
                });
            } else {
                var params = $location.search();
                params["categoryID"] = $scope.categoryId;
                $categoryApiService.getLayered(params).$promise.then(function(response) {
                    var result = response.result || [];
                    $scope.layered = result;
                    for (var filter in $scope.layered) {
                        if ($scope.layered.hasOwnProperty(filter)) {
                            $scope.filters[filter] = {};
                        }
                    }
                    setFilters();
                });
            }
        };

        /**
         * Gets list of products
         */
        function getProducts() {
            if ($scope.isShop) {
                $categoryApiService.getShopProducts(getParams(), {}).$promise.then(function(response) {
                    var result = response.result || [];
                    $scope.productsList = result;
                });
            } else {
                var params = getParams();
                params["categoryID"] = $scope.categoryId;
                $categoryApiService.getProductsByCategoryId(params).$promise.then(function(response) {
                    var result = response.result || [];
                    $scope.productsList = result;
                });
            }
        };

        /**
         * Gets number items into collection
         */
        function getCountProduct() {
            if ($scope.isShop) {
                $categoryApiService.getShopCountProducts(getParams(true)).$promise.then(function(response) {
                    var result = response.result || [];
                    $scope.totalItems = result;
                    $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                });
            } else {
                var params = getParams(true);
                params["categoryID"] = $scope.categoryId;
                $categoryApiService.getCountProducts(params).$promise.then(function(response) {
                    var result = response.result || [];
                    $scope.totalItems = result;
                    $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                });
            }
        };

        function getPage() {
            var page = 0;
            var param = $location.search();

            if (typeof param.p !== "undefined") {
                page = (param.p - 1);
            }

            return page;
        };

        function addCategoryCrumbs() {
            if ($scope.isShop) {
                $scope.$emit("add-breadcrumbs", {
                    "label": "Shop",
                    "url": $location.path()
                });
            } else {
                var list, i, category;
                list = $categoryService.getChainCategories($scope.categoryId);

                for (i = 0; i < list.length; i += 1) {
                    category = list[i];
                    $scope.$emit("add-breadcrumbs", {
                        "label": category.name,
                        "url": $categoryService.getUrl(category.id)
                    });
                }
            }
        };

        function getParams(withoutLimit) {
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

        function updateTree() {
            var tree = $categoryService.getTree();
            if (typeof tree === "undefined") {
                $categoryApiService.getCategories().$promise.then(
                    function(response) {
                        var categories = response.result || [];
                        $categoryService.setTree(categories);
                        addCategoryCrumbs();
                    }
                );
            } else {
                addCategoryCrumbs();
            }
        }

        function getSearchText() {
            if (typeof $routeParams[$scope.searchField] !== "undefined") {
                $scope.searchText = $routeParams[$scope.searchField].trim("~").replace(/,/g, " ");
            }
        };

        function changeLocation() {
            var filterStr, url;
            filterStr = getFilters();
            if (typeof filterStr !== "undefined") {
                if ($scope.categoryId === null && $scope.isShop) {
                    url = GENERAL_CATEGORY_URI;
                } else {
                    url = $categoryService.getUrl($scope.categoryId);
                }

                $categoryService.setFiltersInLocation(url, filterStr);
            }
        };

        function initWatchers() {
            $scope.$watch("filters", changeLocation, true);

            $scope.$watch("options", function() {
                $pdpProductService.setOptions($scope.options);
                $scope.popupProduct = $pdpProductService.getProduct();
            }, true);
        };

        function setFilters() {
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

        function getFilters() {
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

        function toggleBlock(activeBlock) {
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

        function closeBlock(nameBlock) {
            $scope.blocks[nameBlock] = false;
            jQuery('.list-bar span').removeClass('active');
            jQuery('.shadow').css('display', 'none');
        };

        //TODO: we should get away from touching the dom in the
        // controllers
        function viewDetails(product) {
            $("#quick-view").modal('hide');

            $timeout(function() {
                var url = $pdpProductService.getUrl(product._id);
                $location.path(url);
            }, 250);
        }

        function addToCart(product) {

            var addItem = function() {
                $cartService.add(product._id, 1, $pdpProductService.getOptions()).then(
                    function(response) {
                        $scope.isAddingToCart = true;

                        if (response.error !== null) {
                            $scope.message = $commonUtilService.getMessage(response);
                        } else {
                            $pdpProductService.setOptions({});
                            $scope.isAddToCartSuccess = true;
                            $("#quick-view").modal('hide');
                            $("#quick-view-success").modal('show');
                        }
                    }
                );
            };

            if (angular.appConfigValue("general.checkout.guest_checkout")) {
                if (!$scope.isAddingToCart) {
                    addItem();
                }
            } else {
                $visitorLoginService.isLoggedIn().then(function(isLoggedIn) {
                    if (isLoggedIn && !$scope.isAddingToCart) {
                        addItem();
                    }
                });
            }
        };

        function sortByPrice(order) {
            var orderStr;

            if (order === "asc") {
                orderStr = "price";
            } else {
                orderStr = "^price";
            }

            $scope.filters.sort = {};
            $scope.filters.sort[orderStr] = true;
        };

        function sortByName(order) {
            var orderStr;

            if (order === "asc") {
                orderStr = "name";
            } else {
                orderStr = "^name";
            }

            $scope.filters.sort = {};
            $scope.filters.sort[orderStr] = true;
        };

        function openPopUp(product) {
            $scope.message = {};
            $scope.options = {};
            $pdpProductService.setProduct(product);
            $scope.popupProduct = $pdpProductService.getProduct();
            $scope.productService.getRatingInfo(product._id);
            $("#quick-view").modal('show');
            setTimeout(function() {
                try {
                    $('.rating').rating('update', $scope.productService.getAverageRating());
                } catch (e) {

                }
            }, 300);
        };

        function showMoreBtn() {
            var countLoadedGoods;
            countLoadedGoods = ($scope.currentPage + 1) * $scope.itemsPerPage;

            if (countLoadedGoods >= $scope.totalItems) {
                return false;
            }

            return true;
        };

        function loadMore() {
            $scope.clickMore = true;
            $scope.currentPage += 1;

            var params = getParams();
            params["categoryID"] = $scope.categoryId;

            $categoryApiService.getProductsByCategoryId(params).$promise.then(
                function(response) {
                    var result = response.result || [];
                    $scope.productsList = $scope.productsList.concat(result);
                }
            );
            if ($scope.isShop) {
                $categoryApiService.getShopProducts(params).$promise.then(function(response) {
                    var result = response.result || [];
                    $scope.productsList = $scope.productsList.concat(result);
                });
            } else {
                $categoryApiService.getProductsByCategoryId(params).$promise.then(
                    function(response) {
                        var result = response.result || [];
                        $scope.productsList = $scope.productsList.concat(result);
                    }
                );
            }
        };

        function search() {
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
