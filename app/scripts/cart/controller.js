(function (define, $) {
    "use strict";

    define(["cart/init"], function (cartModule) {
        cartModule

            .controller("cartListController", [
                "$scope",
                "$cartApiService",
                "$cartService",
                "$designImageService",
                "$visitorLoginService",
                "$pdpProductService",
                "$checkoutService",
                "$location",
                function ($scope, $cartApiService, $cartService, $designImageService, $visitorLoginService, $pdpProductService, $checkoutService, $location) {

                    var isLoggedIn;

                    $scope.it = $cartService;
                    $scope.checkout = $checkoutService;
                    $scope.productService = $pdpProductService;

                    $scope.init = function () {
                        isLoggedIn = $visitorLoginService.isLoggedIn();
                        if (isLoggedIn === null) {
                            $visitorLoginService.init().then(
                                function () {
                                    if (!$visitorLoginService.isLoggedIn()) {
                                        $location.path("/");
                                    }
                                }
                            );
                        } else {
                            if (!$visitorLoginService.isLoggedIn()) {
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

                    $scope.changeQty = function(item, action){

                        if(action === "up"){
                            item.qty = item.qty + 1;
                        }
                        else if(action === "down"){
                            if(item.qty > 1){
                                item.qty = item.qty - 1;
                            }
                        }
                    };

                    /**
                     * Hides mini-cart after change url
                     */
                    $scope.$on("$locationChangeSuccess", function () {
                        $(".mini-cart").hide();
                    });

                }
            ])
        ;
        return cartModule;
    });
})(window.define, jQuery);