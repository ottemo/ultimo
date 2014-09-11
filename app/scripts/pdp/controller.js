(function (define, $) {
    "use strict";

    define(["pdp/init"], function (pdpModule) {

        pdpModule
            /*
             *  HTML top page header manipulator (direct service mapping)
             */
            .controller("pdpController", [
                "$scope",
                "$routeParams",
                "$location",
                "$pdpApiService",
                "$pdpProductService",
                "$designImageService",
                "$cartService",
                "$visitorLoginService",
                function ($scope, $routeParams, $location, $pdpApiService, $pdpProductService, $designImageService, $cartService, $visitorLoginService) {
                    var defaultProduct, reinitializeStars, getAverageValue, getStarsPercents, getDefaultRatingInfo;

                    getDefaultRatingInfo = function () {
                        return {
                            "1star": 0,
                            "2star": 0,
                            "3star": 0,
                            "4star": 0,
                            "5star": 0,
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

                        $scope.count = $scope.ratingInfo['1star'] + $scope.ratingInfo['2star'] + $scope.ratingInfo['3star'] + $scope.ratingInfo['4star'] + $scope.ratingInfo['5star'];
                        if ($scope.count > 0) {
                            $scope.ratingInfo.averageValue = ((1 * $scope.ratingInfo['1star']) +
                                (2 * $scope.ratingInfo['2star']) +
                                (3 * $scope.ratingInfo['3star']) +
                                (4 * $scope.ratingInfo['4star']) +
                                (5 * $scope.ratingInfo['5star'])) / ($scope.count);
                        }
                    };

                    getStarsPercents = function () {
                        if (typeof $scope.ratingInfo === "undefined") {
                            return false;
                        }

                        $scope.ratingInfo.oneStarPersent = ($scope.ratingInfo['1star'] / $scope.count) * 100;
                        $scope.ratingInfo.twoStarPersent = ($scope.ratingInfo['2star'] / $scope.count) * 100;
                        $scope.ratingInfo.threeStarPersent = ($scope.ratingInfo['3star'] / $scope.count) * 100;
                        $scope.ratingInfo.fourStarPersent = ($scope.ratingInfo['4star'] / $scope.count) * 100;
                        $scope.ratingInfo.fifeStarPersent = ($scope.ratingInfo['5star'] / $scope.count) * 100;
                    };

                    $scope.productId = $routeParams.id;

                    $scope.product = defaultProduct();
                    $scope.qty = 1;

                    $scope.ratingInfo = getDefaultRatingInfo();


                    $pdpApiService.getProduct({"id": $scope.productId}).$promise.then(
                        function (response) {
                            if (response.error === "") {
                                var result = response.result || defaultProduct();
                                $scope.product = result;

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
                    $scope.getImage = function (path, image) {
                        return $designImageService.getFullImagePath(path, image);
                    };

                    $scope.addToCart = function () {
                        var miniCart;
                        miniCart = $(".mini-cart");


                        if ($visitorLoginService.isLoggedIn()) {
                            $cartService.add($scope.productId, $scope.qty);

                            miniCart.css("display", "table");
                            setTimeout(function () {
                                miniCart.hide();
                            }, 1500);
                        } else {
                            $("#form-login").modal("show");
                        }


                    };

                    $scope.products = [];

                    var splitName;
                    splitName = function (string) {
                        var parts;
                        var regExp = /\[(.+)\](.+)/i;
                        parts = string.match(regExp);

                        return parts;
                    };

                    /**
                     * "Related" products
                     */
                    $pdpApiService.getProducts({
                        "limit": "0,5",
                        "extra": "price"
                    }).$promise.then(
                        function (response) {
                            var result, i, parts;
                            result = response.result || [];

                            for (i = 0; i < result.length; i += 1) {
                                parts = splitName(result[i].Name);
                                $scope.products.push({
                                    "Id": result[i].Id,
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
                            $scope.ratingInfo = response.result[0] || getDefaultRatingInfo();
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
                        $scope.submitted = true;
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
                                        $scope.submitted = false;
                                        $scope.reviewForm.review.$pristine = true;
                                        $scope.review.stars = 0;
                                        reinitializeStars();
                                    } else {
                                        $scope.message = {
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
                }
            ]
        );

        return pdpModule;
    });
})(window.define, jQuery);