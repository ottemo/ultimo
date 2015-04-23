module.exports = function (categoryModule) {
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
            "$commonUtilService",
            "GENERAL_CATEGORY_URI",
            "SEARCH_KEY_NAME",
            function ($scope, $location, $route, $routeParams, $categoryApiService, $designService,
                      $designImageService, $categoryService, $visitorLoginService, $cartService,
                      $pdpProductService, $commonUtilService, GENERAL_CATEGORY_URI, SEARCH_KEY_NAME) {

                var init, getPage, addCategoryCrumbs, getFilters, setFilters, getParams, initWatchers,
                    defaultFilterSet, defaultOptionSet, changeLocation;

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

                    if ($scope.isShop) {
                        $scope.$emit("add-breadcrumbs", {"label": "Shop", "url": $location.path()});
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
                    $scope.isShop = (GENERAL_CATEGORY_URI === $location.path());
                    $scope.categoryId = $routeParams.id || null;
                    $scope.searchField = SEARCH_KEY_NAME;

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

                    var getSearchText = function () {
                        $scope.searchText = "";
                        if (typeof $routeParams[$scope.searchField] !== "undefined") {
                            $scope.searchText = $routeParams[$scope.searchField].trim("~").replace(/,/g, " ");
                        }
                    };
                    getSearchText();

                    addCategoryCrumbs();
                };
                init();

                changeLocation = function () {
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

                initWatchers = function () {
                    defaultFilterSet = $scope.$watch("filters", changeLocation, true);

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

                setFilters();

                getFilters = function () {
                    var filters, prepareFilters, hasFilter;
                    filters = [];
                    hasFilter = false;

                    prepareFilters = function () {
                        var getFilterValues;

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

                /**
                 * Gets number items into collection
                 */
                $scope.getCountProduct = function () {
                    if ($scope.isShop) {
                        $categoryApiService.getShopCountProducts(getParams(true)).$promise.then(function (response) {
                            var result = response.result || [];
                            $scope.totalItems = result;
                            $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                        });
                    } else {
                        var params = getParams(true);
                        params["categoryID"] = $scope.categoryId;
                        $categoryApiService.getCountProducts(params).$promise.then(function (response) {
                            var result = response.result || [];
                            $scope.totalItems = result;
                            $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                        });
                    }
                    // KG homepage shows products separated by category
                    getShopPageProducts = function (categories) {
                        if ($scope.isShop && categories.length) {
                            var params, productsPromise, shopCategories;

                            params = getParams();
                            productsPromise = [];
                            shopCategories = [];

                            // Get thr product from each of the categories
                            $.each(categories[0].child, function (i, cat) {
                                shopCategories.push(cat);
                                params['categoryID'] = cat.id;

                                productsPromise.push(
                                    $categoryApiService.getProductsByCategoryId(params)
                                        .$promise.then(function (response) {
                                            response.id = cat.id;
                                            return response;
                                        })
                                );
                            });

                            // When they all finish, assemble a response
                            $q.all(productsPromise).then(function (result) {
                                $.each(result, function (i, cat) {
                                    $.each(shopCategories, function (j, outCat) {
                                        if (outCat.id == cat.id) {
                                            shopCategories[j]['productList'] = cat.result;
                                            return false; //break
                                        }
                                    });
                                });

                                $scope.shopCategories = shopCategories;
                            });
                        }
                    };

                    /**
                     * Gets number items into collection
                     */
                    $scope.getCountProduct = function () {
                        if ($scope.isShop) {
                            $categoryApiService.getShopCountProducts(getParams(true)).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.totalItems = result;
                                $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                            });
                        } else {
                            var params = getParams(true);
                            params["categoryID"] = $scope.categoryId;
                            $categoryApiService.getCountProducts(params).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.totalItems = result;
                                $scope.pages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                            });
                        }

                    };

                    /**
                     * Gets list of products
                     */
                    $scope.getProducts = function () {
                        if ($scope.isShop) {
                            $categoryApiService.getShopProducts(getParams(), {}).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.productsList = result;
                            });
                        } else {
                            var params = getParams();
                            params["categoryID"] = $scope.categoryId;
                            $categoryApiService.getProductsByCategoryId(params).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.productsList = result;
                            });
                        }
                    };
                    /**
                     * Gets list of products
                     */
                    $scope.getProducts = function () {
                        if ($scope.isShop) {
                            var categories = $categoryService.getTree();
                            if (categories) {
                                getShopPageProducts(categories);
                            }

                            // KG /shop is dependent on the category tree
                            // $categoryApiService.getShopProducts(getParams(), {}).$promise.then(function (response) {
                            //     var result = response.result || [];
                            //     $scope.productsList = result;
                            // });

                        } else {
                            var params = getParams();
                            params["categoryID"] = $scope.categoryId;
                            $categoryApiService.getProductsByCategoryId(params).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.productsList = result;
                            });
                        }
                    };

                    /**
                     * Gets layers for category
                     */
                    $scope.getLayered = function () {
                        if ($scope.isShop) {
                            $categoryApiService.getShopLayered($location.search(), {}).$promise.then(function (response) {
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
                        } else {
                            var params = $location.search();
                            params["categoryID"] = $scope.categoryId;
                            $categoryApiService.getLayered(params).$promise.then(function (response) {
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
                        }
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

                        if ($scope.categoryId !== null) {
                            /**
                             * Gets category
                             */
                            $categoryApiService.load({"id": $scope.categoryId}).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.category = result;
                                $scope.initCategoryImages();
                            });
                        }

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

                    $scope.addToCart = function (product) {
                        var miniCart, addItem;
                        miniCart = $(".mini-cart");
                        addItem = function () {
                            $cartService.add(product._id, 1, $pdpProductService.getOptions()).then(
                                function (response) {
                                    if (response.error !== null) {
                                        $scope.openPopUp(product);
                                        $scope.message = $commonUtilService.getMessage(response);
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

                    /**
                     * Set category image and images attributes value as a path
                     * $scope.category.image - default image path
                     * $scope.category.images - list of all images in this category
                     */
                    $scope.initCategoryImages = function () {
                        var categoryImageBasePath;

                        $categoryApiService.getImagePath({"categoryID": $scope.categoryId}).$promise.then(function (response) {
                            categoryImageBasePath = response.result || [];
                        });

                        $categoryApiService.listImages({"categoryID": $scope.categoryId}).$promise.then(function (response) {
                            $scope.category.images = response.result || [];
                            var categoryImagesPath = {};
                            for (var i = 0, imageName, imagePath; i < $scope.category.images.length; i += 1) {
                                imageName = $scope.category.images[i];
                                imagePath = $designImageService.getFullImagePath("", categoryImageBasePath + imageName);
                                categoryImagesPath[imageName] = imagePath;
                            }
                            $scope.category.images = categoryImagesPath;
                            if (typeof $scope.category.image !== "undefined") {
                                $scope.category.image = $designImageService.getFullImagePath("", categoryImageBasePath + $scope.category.image);
                            }
                        });
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
                        $scope.message = {};
                        $scope.options = {};
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

                        var params = getParams();
                        params["categoryID"] = $scope.categoryId;

                        $categoryApiService.getProductsByCategoryId(params).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                $scope.productsList = $scope.productsList.concat(result);
                            }
                        );
                        if ($scope.isShop) {
                            $categoryApiService.getShopProducts(params).$promise.then(function (response) {
                                var result = response.result || [];
                                $scope.productsList = $scope.productsList.concat(result);
                            });
                        } else {
                            $categoryApiService.getProductsByCategoryId(params).$promise.then(
                                function (response) {
                                    var result = response.result || [];
                                    $scope.productsList = $scope.productsList.concat(result);
                                }
                            );
                        }
                    };

                    $scope.search = function () {
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
            }
        ]);

};
