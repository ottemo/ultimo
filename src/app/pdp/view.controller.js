angular.module("pdpModule")

    .controller("pdpViewController", [
        "$scope",
        "$routeParams",
        "$location",
        "$timeout",
        "pdpApiService",
        "pdpProductService",
        "cartService",
        "visitorLoginService",
        "commonUtilService",
        function ($scope, $routeParams, $location, $timeout, pdpApiService, pdpProductService,
                  cartService, visitorLoginService, commonUtilService) {

            // Product
            $scope.productId = $routeParams.id;
            $scope.product;
            $scope.defaultProduct = {};
            $scope.options = {};
            $scope.customOptionsForm;
            $scope.qty = 1;

            $scope.isAddingToCart = false;
            $scope.isAddToCartSuccessful = false;

            // Ratings & Reviews
            $scope.reviewsList = [];

            // Related Products
            $scope.related = [];

            ///////////////////////////////////////////

            $scope.activate = function activate() {
                // REFACTOR: why store options in a service instead of on the
                // product, idk
                // BUG: if we don't clean out the options the pdpProductService tries to hold onto those
                // options on page change
                pdpProductService.setOptions({});
                $scope.ratingInfo = $scope._getDefaultRatingInfo();

                $scope._getProduct();
                $scope._getReviews();
                $scope._getRatingInfo();
                $scope._initWatchers();
            };

            $scope._initWatchers = function() {
                $scope.$watch("ratingInfo", function () {
                    $scope._getAverageValue();
                    $scope._getStarsPercents();
                }, true);

                // REFACTOR: ugh, the options are actually built out in the view
                // by iterating over product.options otCustomOptions
                $scope.$watch('options', function(){
                    pdpProductService.setOptions($scope.options);
                });
            };

            $scope._getDefaultRatingInfo = function() {
                return {
                    "stars_1": 0,
                    "stars_2": 0,
                    "stars_3": 0,
                    "stars_4": 0,
                    "stars_5": 0,
                    "averageValue": 0,
                    "fifeStarPersent": 0, //TODO: TYPO
                    "fourStarPersent": 0,
                    "oneStarPersent": 0,
                    "threeStarPersent": 0,
                    "twoStarPersent": 0
                };
            };

            $scope._reinitializeStars = function() {
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

            $scope._getAverageValue = function() {
                if (typeof $scope.ratingInfo === "undefined") {
                    return false;
                }

                //TODO: can this just be a local var
                $scope.count = $scope.ratingInfo['stars_1'] + $scope.ratingInfo['stars_2'] + $scope.ratingInfo['stars_3'] + $scope.ratingInfo['stars_4'] + $scope.ratingInfo['stars_5'];
                if ($scope.count > 0) {
                    $scope.ratingInfo.averageValue = ((1 * $scope.ratingInfo['stars_1']) +
                        (2 * $scope.ratingInfo['stars_2']) +
                        (3 * $scope.ratingInfo['stars_3']) +
                        (4 * $scope.ratingInfo['stars_4']) +
                        (5 * $scope.ratingInfo['stars_5'])) / ($scope.count);
                }
            };

            $scope._getStarsPercents = function() {
                if (typeof $scope.ratingInfo === "undefined") {
                    return false;
                }

                $scope.ratingInfo.oneStarPersent = ($scope.ratingInfo['stars_1'] / $scope.count) * 100;
                $scope.ratingInfo.twoStarPersent = ($scope.ratingInfo['stars_2'] / $scope.count) * 100;
                $scope.ratingInfo.threeStarPersent = ($scope.ratingInfo['stars_3'] / $scope.count) * 100;
                $scope.ratingInfo.fourStarPersent = ($scope.ratingInfo['stars_4'] / $scope.count) * 100;
                $scope.ratingInfo.fifeStarPersent = ($scope.ratingInfo['stars_5'] / $scope.count) * 100;
            };

            $scope._getProduct = function() {
                pdpApiService.getProduct({"productID": $scope.productId}).$promise.then(function (response) {
                    if (response.error === null) {
                        var result = response.result || $scope.defaultProduct;

                        pdpProductService.setProduct(result);
                        $scope.product = pdpProductService.getProduct();

                        // BREADCRUMBS
                        $scope.$emit("add-breadcrumbs", {
                            "label": $scope.product.name,
                            "url": pdpProductService.getUrl($scope.product._id)
                        });
                    } else {
                        $location.path("/");
                    }
                });
            };

            $scope.getTotal = function() {
                return $scope.qty * $scope.product.price;
            };

            $scope.addToCart = function($event) {
                // I think because we don't have an href in the link
                // we get an odd bug where the link retains focus
                $event.target.blur();

                if (angular.appConfig.hasGuestCheckout) {
                    if (!$scope.isAddingToCart) {
                        addItem();
                    }
                } else {
                    visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                        //TODO: if we don't have guest checkout enabled and they are not logged in we just drop them
                        if (isLoggedIn && !$scope.isAddingToCart) {
                            addItem();
                        }
                    });
                }

                function addItem() {
                    // Flag that we attempted to submit form
                    // gets picked up by form error flags in otCustomOptions.html
                    $scope.submitted = true; //REFACTOR
                    $scope.isAddToCartSuccessful = false;

                    if ($scope.customOptionsForm && $scope.customOptionsForm.$valid) {
                        // Flag that we are in the process of adding to cart, prevent double clicks
                        $scope.isAddingToCart = true;

                        cartService.add($scope.productId, $scope.qty, pdpProductService.getOptions())
                            .then(function (response) {
                                // Let them keep adding to cart now
                                $scope.isAddingToCart = false;
                                if (response.error !== null) {
                                    $scope.messageOptions = commonUtilService.getMessage(response);
                                } else {
                                    // Show a success message
                                    $scope.isAddToCartSuccessful = true;
                                }
                            });
                    }
                }
            }


            /**
             * Gets reviews list
             */
            $scope._getReviews = function() {
                pdpApiService.reviewList({"productID": $scope.productId}).$promise.then(function (response) {
                    $scope.reviewsList = response.result || [];
                });
            };

            /**
             * Gets rating info
             */
            $scope._getRatingInfo =function() {
                pdpApiService.ratingInfo({"productID": $scope.productId}).$promise.then(function (response) {
                    if (response.result instanceof Array) {
                        $scope.ratingInfo = response.result[0];
                    } else {
                        $scope.ratingInfo = $scope._getDefaultRatingInfo();
                    }
                    $scope._getAverageValue();
                    $scope._getStarsPercents();
                });
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
                    pdpApiService.addReview(
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
                                $scope._reinitializeStars();
                            } else {
                                $scope.messageReview = commonUtilService.getMessage(response);
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
