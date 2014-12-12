(function (define, $) {
    "use strict";

    define(["angular", "pdp/init"], function (angular, pdpModule) {

        pdpModule
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
                // TODO: reduce the number of statements in the function below and remove jshint comment
                function ($scope, $routeParams, $location, $timeout, $pdpApiService, $pdpProductService, $designImageService, $cartService, $visitorLoginService) {   //jshint ignore:line
                    var defaultProduct, reinitializeStars, getAverageValue, getStarsPercents, getDefaultRatingInfo, splitName;

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
                    $scope.options = {};
                    $scope.related = [];

                    $pdpApiService.getProduct({"id": $scope.productId}).$promise.then(
                        function (response) {
                            if (response.error === "") {
                                var result = response.result || defaultProduct();

                                $pdpProductService.setProduct(result);
                                $scope.product = $pdpProductService.getProduct();

                                // BREADCRUMBS
                                $scope.$emit("add-breadcrumbs", {"label": $scope.product.name, "url": $pdpProductService.getUrl($scope.product._id)});
                            } else {
                                $location.path("/");
                            }
                        }
                    );

                    $scope.getTotal = function () {
                        return $scope.qty * $scope.product.price;
                    };

                    //-----------------
                    // IMAGE FUNCTIONS
                    //-----------------
                    $scope.reloadImages = function () {
                        if ($scope.product !== undefined && $scope.product._id !== undefined) {
                            // taking media patch for new product
                            $pdpApiService.getImagePath({"productId": $scope.product._id}).$promise.then(
                                function (response) {
                                    $scope.imagesPath = response.result || "";
                                });

                            // taking registered images for product
                            $pdpApiService.listImages({"productId": $scope.product._id}).$promise.then(
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
                                    if (response.error !== "") {
                                        $scope.messageOptions = {
                                            'type': 'danger',
                                            'message': response.error
                                        };
                                    } else {
                                        var miniCart;
                                        miniCart = $(".mini-cart");
                                        miniCart.modal('show');
                                        $timeout(function () {
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

                    splitName = function (string) {
                        var parts;
                        var regExp = /\[(.+)\](.+)/i;
                        parts = string.match(regExp);

                        return parts;
                    };

                    /**
                     * "Related" products
                     */
                    $pdpApiService.getRelated({"pid": $scope.productId}, {"extra": 'price'}).$promise.then(
                        function (response) {
                            var result, i, parts;
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

                        }
                    );

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
                    $pdpApiService.reviewList({"pid": $scope.productId}).$promise.then(
                        function (response) {
                            $scope.reviewsList = response.result || [];
                        }
                    );

                    /**
                     * Gets rating info
                     */
                    $pdpApiService.ratingInfo({"pid": $scope.productId}).$promise.then(
                        function (response) {
                            if (response.result instanceof Array) {
                                $scope.ratingInfo = response.result[0];
                            } else {
                                $scope.ratingInfo = getDefaultRatingInfo();
                            }
                            getAverageValue();
                            getStarsPercents();
                        }
                    );

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

                        date = new Date(str);
                        month = date.getMonth();
                        day = date.getDate().toString().length < 2 ? "0" + date.getDate() : date.getDate();

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
                                    "pid": $scope.productId,
                                    "stars": $scope.review.stars
                                }, $scope.review.comment).$promise.then(
                                function (response) {

                                    if (response.error === "") {
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
                                        $scope.messageReview = {
                                            'type': 'danger',
                                            'message': response.error
                                        };
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

                    $scope.$watch("ratingInfo", function () {
                        getAverageValue();
                        getStarsPercents();
                    }, true);

                    $scope.$watch("product", function () {
                        $scope.reloadImages();
                    });

                    $scope.$watch("options", function () {
                        $pdpProductService.setOptions($scope.options);
                        $scope.product = $pdpProductService.getProduct();
                    }, true);

                }
            ]
        )
        ;

        return pdpModule;
    });
})(window.define, jQuery);
