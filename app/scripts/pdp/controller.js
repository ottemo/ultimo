angular.module("pdpModule")
/**
 *  HTML top page header manipulator (direct service mapping)
 */
    .controller("pdpController", [
        "$scope",
        "$routeParams",
        "$location",
        "$timeout",
        "$pdpApiService",
        "$pdpProductService",
        "$designImageService",
        "$cartService",
        "$visitorLoginService",
        "$commonUtilService",
        function ($scope, $routeParams, $location, $timeout, $pdpApiService, $pdpProductService,
                  $designImageService, $cartService, $visitorLoginService, $commonUtilService) {
            var defaultProduct, reinitializeStars, getAverageValue, getStarsPercents, getDefaultRatingInfo, initWatchers;

            initWatchers = function () {
                var defaultGetRatingInfo, defaultProductChange, defaultOptionChange;
                defaultGetRatingInfo = $scope.$watch("ratingInfo", function () {
                    getAverageValue();
                    getStarsPercents();
                }, true);

            };

            $scope.init = function () {
                getDefaultRatingInfo = function () {
                    return {
                        "stars_1": 0,
                        "stars_2": 0,
                        "stars_3": 0,
                        "stars_4": 0,
                        "stars_5": 0,
                        "averageValue": 0,
                        "fifeStarPersent": 0,
                        "fourStarPersent": 0,
                        "oneStarPersent": 0,
                        "threeStarPersent": 0,
                        "twoStarPersent": 0
                    };
                };

                defaultProduct = function () {
                    return {};
                };

                reinitializeStars = function () {
                    setTimeout(function () {
                        $("input.rating").each(function () {

                            if ($(this).hasClass("disabled")) {
                                $(this).rating({
                                    readonly: true,
                                    disabled: true,
                                    showCaption: false,
                                    showClear: false
                                });
                            } else {
                                $(this).rating({
                                    showCaption: false,
                                    showClear: false
                                });
                            }

                        });

                    }, 300);
                };

                getAverageValue = function () {

                    if (typeof $scope.ratingInfo === "undefined") {
                        return false;
                    }

                    $scope.count = $scope.ratingInfo['stars_1'] + $scope.ratingInfo['stars_2'] + $scope.ratingInfo['stars_3'] + $scope.ratingInfo['stars_4'] + $scope.ratingInfo['stars_5'];
                    if ($scope.count > 0) {
                        $scope.ratingInfo.averageValue = ((1 * $scope.ratingInfo['stars_1']) +
                            (2 * $scope.ratingInfo['stars_2']) +
                            (3 * $scope.ratingInfo['stars_3']) +
                            (4 * $scope.ratingInfo['stars_4']) +
                            (5 * $scope.ratingInfo['stars_5'])) / ($scope.count);
                    }

                };

                getStarsPercents = function () {
                    if (typeof $scope.ratingInfo === "undefined") {
                        return false;
                    }

                    $scope.ratingInfo.oneStarPersent = ($scope.ratingInfo['stars_1'] / $scope.count) * 100;
                    $scope.ratingInfo.twoStarPersent = ($scope.ratingInfo['stars_2'] / $scope.count) * 100;
                    $scope.ratingInfo.threeStarPersent = ($scope.ratingInfo['stars_3'] / $scope.count) * 100;
                    $scope.ratingInfo.fourStarPersent = ($scope.ratingInfo['stars_4'] / $scope.count) * 100;
                    $scope.ratingInfo.fifeStarPersent = ($scope.ratingInfo['stars_5'] / $scope.count) * 100;
                };

                $scope.productId = $routeParams.id;
                $scope.product = defaultProduct();
                $scope.qty = 1;
                $scope.ratingInfo = getDefaultRatingInfo();

                // REFACTOR: why store options in a service instead of on the
                // product, idk
                // BUG: if we don't clean out the options the pdpProductService tries to hold onto those
                // options on page change
                $scope.options = {};
                $pdpProductService.setOptions({});

                $scope.related = [];

                $scope.getProduct();
                $scope.getRelatedProducts();
                $scope.getReviews();
                $scope.getRatingInfo();
                initWatchers();
                loadImages();
            };

            $scope.getProduct = function () {
                $pdpApiService.getProduct({"productID": $scope.productId}).$promise.then(function (response) {
                    if (response.error === null) {
                        var result = response.result || defaultProduct();

                        $pdpProductService.setProduct(result);
                        $scope.product = $pdpProductService.getProduct();

                        // BREADCRUMBS
                        $scope.$emit("add-breadcrumbs", {
                            "label": $scope.product.name,
                            "url": $pdpProductService.getUrl($scope.product._id)
                        });
                    } else {
                        $location.path("/");
                    }
                });
            };

            $scope.getPublicAttributes = function () {
                if (typeof $scope.publicAttributes === "undefined") {
                    $scope.hasPublicAttributes = false;
                    $scope.publicAttributes = {};
                    $pdpApiService.getAttributes().$promise.then(
                        function (response) {
                            var result = response.result;

                            if (response.error === null) {
                                for (var i = 0; i < result.length; i += 1) {
                                    if (result[i]['IsPublic'] && typeof $scope.product[result[i]['Attribute']] === "string") {
                                        $scope.publicAttributes[result[i]['Label']] = $scope.product[result[i]['Attribute']];
                                        $scope.hasPublicAttributes = true;
                                    }
                                    if (result[i]['IsPublic'] && $scope.product[result[i]['Attribute']] instanceof Array) {
                                        $scope.publicAttributes[result[i]['Label']] = $scope.product[result[i]['Attribute']].join(", ");
                                        $scope.hasPublicAttributes = true;
                                    }
                                }
                            }
                        }
                    );
                }
            };

            $scope.getTotal = function () {
                return $scope.qty * $scope.product.price;
            };

            //-----------------
            // IMAGE FUNCTIONS
            //-----------------
            $scope.productImages = [];
            var loadImages = function () {

                if ($scope.productId) {
                    // taking media patch for new product
                    $pdpApiService.getImagePath({"productID": $scope.productId}).$promise.then(
                        function (response) {
                            $scope.imagesPath = response.result || "";
                        });

                    // taking registered images for product
                    $pdpApiService.listImages({"productID": $scope.productId}).$promise.then(
                        function (response) {
                            $scope.productImages = response.result || [];

                            // Makes default_image first in array
                            $scope.productImages.sort(function (a, b) {
                                if (a.toString() < b.toString() && a === $scope.product["default_image"]) {
                                    return -1;
                                }
                                if (a.toString() > b.toString() && a !== $scope.product["default_image"]) {
                                    return 1;
                                }

                                return 0;
                            });
                        });
                }
            };

            /**
             * Returns full path to image
             *
             * @param {string} path     - the destination path to product folder
             * @param {string} image    - image name
             * @returns {string}        - full path to image
             */
            $scope.getImage = function (path, image, size) {
                return $designImageService.getFullImagePath(path, image, size);
            };

            $scope.addToCart = function () {
                var addItem = function () {
                    $scope.submitted = true;
                    $cartService.add($scope.productId, $scope.qty, $pdpProductService.getOptions()).then(
                        function (response) {
                            if (response.error !== null) {
                                $scope.messageOptions = $commonUtilService.getMessage(response);
                            } else {
                                var miniCart;
                                miniCart = $(".mini-cart");
                                miniCart.modal('show');
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
             * "Related" products
             */
            $scope.getRelatedProducts = function () {
                $pdpApiService.getRelated({
                    "productID": $scope.productId,
                    "extra": 'price'
                }).$promise.then(function (response) {
                        var result, i, parts, splitName;

                        splitName = function (string) {
                            var parts;
                            var regExp = /\[(.+)\](.+)/i;
                            parts = string.match(regExp);

                            return parts;
                        };
                        result = response.result || [];

                        for (i = 0; i < result.length; i += 1) {
                            parts = splitName(result[i].Name);
                            $scope.related.push({
                                "ID": result[i].ID,
                                "Image": result[i].Image,
                                "Name": parts[2],
                                "Sku": parts[1],
                                "Price": result[i].Extra.price
                            });
                        }

                    });
            };

            $scope.changeQty = function (qtyItem, action) {
                if (action === "up") {
                    $scope.qty = parseInt(qtyItem, 10) + 1;
                }
                else if (action === "down") {
                    if (qtyItem > 1) {
                        $scope.qty = parseInt(qtyItem, 10) - 1;
                    }
                }
            };

            /**
             * Gets reviews list
             */
            $scope.getReviews = function () {
                $pdpApiService.reviewList({"productID": $scope.productId}).$promise.then(function (response) {
                    $scope.reviewsList = response.result || [];
                });
            };

            /**
             * Gets rating info
             */
            $scope.getRatingInfo = function () {
                $pdpApiService.ratingInfo({"productID": $scope.productId}).$promise.then(function (response) {
                    if (response.result instanceof Array) {
                        $scope.ratingInfo = response.result[0];
                    } else {
                        $scope.ratingInfo = getDefaultRatingInfo();
                    }
                    getAverageValue();
                    getStarsPercents();
                });
            };

            /**
             * Gets date in format {Month} {day}, {year}
             *
             * @param {string} str
             * @returns {string}
             */
            $scope.getDate = function (str) {
                var date, month, day;
                var months = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                date = $commonUtilService.getDate(str);
                month = date.getMonth() + 1;
                day = date.getDay().toString().length < 2 ? "0" + date.getDay() : date.getDay();

                return months[month] + " " + day + ", " + date.getFullYear();
            };

            /**
             * Gets title for review
             *
             * @param {object} obj
             * @returns {string}
             */
            $scope.getReviewTitle = function (obj) {
                var pos;
                pos = obj.review.indexOf(".") !== -1 ? obj.review.indexOf(".") : obj.review.length;
                return obj.review.substring(0, pos);
            };

            /**
             * Saves review and rating for product
             */
            $scope.saveReview = function () {
                $scope.submittedReview = true;
                if (!$scope.reviewForm.$invalid) {
                    $pdpApiService.addReview(
                        {
                            "productID": $scope.productId,
                            "stars": $scope.review.stars
                        }, $scope.review.comment).$promise.then(
                        function (response) {

                            if (response.error === null) {
                                $scope.reviewsList.push(response.result || []);

                                $scope.sortByRating($scope.orderReviews);

                                if (response.result.rating > 0) {
                                    $scope.ratingInfo[response.result.rating + "star"] += 1;
                                }
                                $scope.review = {};
                                $scope.submittedReview = false;
                                $scope.reviewForm.review.$pristine = true;
                                $scope.review.stars = 0;
                                reinitializeStars();
                            } else {
                                $scope.messageReview = $commonUtilService.getMessage(response);
                            }

                        }
                    );
                }
            };

            $scope.sortByRating = function (order) {
                $scope.orderReviews = order;

                switch (order) {
                    case "asc" :
                        $scope.sorting = "Low to High";
                        break;
                    case "desc" :
                        $scope.sorting = "High to Low";
                        break;
                }

                $scope.reviewsList.sort(function (a, b) {
                    if (order === "asc") {
                        return a.rating > b.rating;
                    } else {
                        return a.rating < b.rating;
                    }
                });

            };

        }
    ]
);
