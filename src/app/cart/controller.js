// This controller is reused in cart, mini-cart, and checkout
angular.module("cartModule")

    .controller("cartListController", [
        "$scope",
        "$interval",
        "$cartApiService",
        "$cartService",
        "$visitorLoginService",
        "$pdpProductService",
        "$checkoutService",
        function ($scope, $interval, $cartApiService, $cartService, $visitorLoginService, $pdpProductService, $checkoutService, $location, $commonPageService) {

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

            $scope.update = function (itemIdx, qty) {
                // TODO: not sure why we are tracking number of requests
                $cartService.increaseCountRequest();
                $cartService.update(itemIdx, qty);
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
        }
    ]);
