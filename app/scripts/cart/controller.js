(function (define) {
    "use strict";

    define(["cart/init"], function (cartModule) {
        cartModule

            .controller("cartListController", [
                "$scope",
                "$cartApiService",
                "$cartService",
                "$designImageService",
                "$loginService",
                "$location",
                function ($scope, $cartApiService, $cartService, $designImageService, $loginService, $location) {

                    var isLoggedIn;

                    $scope.it = $cartService;

                    $scope.init = function () {
                        isLoggedIn = $loginService.isLoggedIn();
                        if (isLoggedIn === null) {
                            $loginService.init().then(
                                function () {
                                    if (!$loginService.isLoggedIn()) {
                                        $location.path("/");
                                    }
                                }
                            );
                        } else {
                            if (!$loginService.isLoggedIn()) {
                                $location.path("/");
                            }
                        }
                        $cartService.reload();

                        $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                        $scope.$emit("add-breadcrumbs", {"label": "Shopping Cart", "url": "/cart"});
                    };

                    $scope.remove = function (itemIdx) {
                        $cartService.remove(itemIdx);
                    };

                    $scope.update = function (itemIdx, qty) {
                        $cartService.update(itemIdx, qty);
                    };

                    /**
                     * Gets full path to image
                     *
                     * @param {object} product
                     * @returns {string}
                     */
                    $scope.getImage = function (product) {
                        return $designImageService.getFullImagePath("", product.image);
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

                }
            ])
        ;
        return cartModule;
    });
})(window.define);