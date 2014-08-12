(function (w, define) {
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

                    var isLoggedIn, subtotal, saleTax, shipping, total;

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

                        $scope.$emit("add-breadcrumbs", {"label": "Shopping Cart", "url": "/cart"});
                    };

                    $scope.remove = function (itemIdx) {
                        if (w.confirm("You really want remove this item from shopping cart?")) {
                            $cartService.remove(itemIdx);
                        }
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
                        var i, item, items;
                        subtotal = 0;
                        items = $scope.it.getItems();

                        if (typeof items !== "undefined") {
                            for (i = 0; i < items.length; i += 1) {
                                item = items[i];
                                subtotal += item.qty * item.product.price;
                            }
                        }

                        $cartService.setSubtotal(subtotal);

                        return subtotal;
                    };

                    $scope.getSalesTax = function () {
                        saleTax = 20;
                        $cartService.setSalesTax(saleTax);

                        return saleTax;
                    };

                    $scope.getShipping = function () {
                        shipping = 5;
                        $cartService.setShipping(shipping);

                        return shipping;
                    };

                    $scope.getTotal = function () {
                        total = subtotal + saleTax + shipping;

                        $cartService.setTotal(total);

                        return total;
                    };

                }
            ])
        ;
        return cartModule;
    });
})(window, window.define);