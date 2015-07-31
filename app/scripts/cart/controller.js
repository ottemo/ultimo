angular.module("cartModule")

    .controller("cartListController", [
        "$scope",
        "$interval",
        "$cartApiService",
        "$cartService",
        "$designImageService",
        "$visitorLoginService",
        "$pdpProductService",
        "$checkoutService",
        "$location",
        function ($scope, $interval, $cartApiService, $cartService, $designImageService, $visitorLoginService, $pdpProductService, $checkoutService, $location) {
            $scope.it = $cartService;
            $scope.checkout = $checkoutService;
            $scope.productService = $pdpProductService;
            $scope.visitorService = $visitorLoginService;

            $scope.init = function () {
                if (!angular.appConfigValue("general.checkout.guest_checkout")) {
                    $scope.visitorService.isLoggedIn().then(function (isLoggedIn) {
                        if (!isLoggedIn) {
                            $location.path("/");
                        }
                    });
                }

                $cartService.reload();

                $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                $scope.$emit("add-breadcrumbs", {"label": "Shopping Cart", "url": "/cart"});
            };

            $scope.qtyOptions = [
                {value: 1,  label: 1},
                {value: 2,  label: 2},
                {value: 3,  label: 3},
                {value: 4,  label: 4},
                {value: 5,  label: 5},
                {value: 6,  label: 6},
                {value: 7,  label: 7},
                {value: 8,  label: 8},
                {value: 9,  label: 9},
                {value: 10, label: '10+'},
            ];

            $scope.remove = function (itemIdx) {
                $cartService.increaseCountRequest();
                $cartService.remove(itemIdx);
            };

            // REFACTOR: is this just a hand coded debounce?
            var stop = {}, dateLastClick;
            $scope.update = function (itemIdx) {
                var stopCurrentInterval, delay, callback, getStartTime;
                delay = 500;

                dateLastClick = new Date();

                stopCurrentInterval = function () {
                    if (angular.isDefined(stop[itemIdx])) {
                        $interval.cancel(stop[itemIdx]);
                        stop[itemIdx] = undefined;
                    }
                };

                getStartTime = function () {
                    return dateLastClick.getTime();
                };

                callback = function () {
                    var duration, d, qty;
                    d = new Date();
                    duration = d.getTime() - getStartTime();

                    if (duration >= delay) {
                        var item = $cartService.getItem(itemIdx);
                        qty = item.qty;
                        stopCurrentInterval();
                        $cartService.update(itemIdx, qty);
                    }
                };

                if (typeof stop[itemIdx] === "undefined") {
                    $cartService.increaseCountRequest();
                    stop[itemIdx] = $interval(callback, 100);
                }
            };

            /**
             * Gets full path to image
             *
             * @param {object} product
             * @returns {string}
             */
            $scope.getImage = function (product, size) {
                return $designImageService.getFullImagePath("", product.image, size);
            };

            $scope.getSubtotal = function () {
                return $cartService.getSubtotal();
            };

            $scope.getSalesTax = function () {
                return $cartService.getSalesTax();
            };

            $scope.getShipping = function () {
                return $cartService.getShipping();
            };

            $scope.getTotal = function () {
                return $cartService.getTotal();
            };

            $scope.changeQty = function (item, action) {
                var _qty = parseInt(item.qty, 10);

                if (action === "up") {
                    item.qty = _qty + 1;
                }
                else if (action === "down") {
                    if (_qty > 1) {
                        item.qty = _qty - 1;
                    }
                }
            };

            /**
             * Hides mini-cart after change url
             */
            $scope.$on("$locationChangeSuccess", function () {
                $(".mini-cart").modal('hide');
            });

        }
    ]);