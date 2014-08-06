(function (w, define) {
    "use strict";

    define(["checkout/init"], function (checkoutModule) {
        checkoutModule

            .controller("checkoutController", [
                "$scope",
                "$location",
                "$checkoutApiService",
                "$designImageService",
                "$loginService",
                "$cartService",
                function ($scope, $location, $checkoutApiService, $designImageService, $loginService, $cartService) {

                    var isLoggedIn;

                    /**
                     * Checks visitor on the logged
                     * Adds breadcrumbs
                     */
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

                        $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                        $scope.$emit("add-breadcrumbs", {"label": "Checkout", "url": "/checkout"});
                    };

                    $scope.cart = $cartService;

                    $scope.shippingMethods = [
                        {
                            Desc: "",
                            Extra: null,
                            Id: "1",
                            Image: "",
                            Name: "Shipping Method 1"
                        },
                        {
                            Desc: "",
                            Extra: null,
                            Id: "2",
                            Image: "",
                            Name: "Shipping Method 2"
                        },
                        {
                            Desc: "",
                            Extra: null,
                            Id: "3",
                            Image: "",
                            Name: "Shipping Method 3"
                        },
                        {
                            Desc: "",
                            Extra: null,
                            Id: "4",
                            Image: "",
                            Name: "Shipping Method 4"
                        }
                    ];
                    $scope.paymentMethods = [
                        {
                            Desc: "",
                            Extra: null,
                            Id: "1",
                            Image: "",
                            Name: "Payment Method 1"
                        },
                        {
                            Desc: "",
                            Extra: null,
                            Id: "2",
                            Image: "",
                            Name: "Payment Method 2"
                        },
                        {
                            Desc: "",
                            Extra: null,
                            Id: "3",
                            Image: "",
                            Name: "Payment Method 3"
                        },
                        {
                            Desc: "",
                            Extra: null,
                            Id: "4",
                            Image: "",
                            Name: "Payment Method 4"
                        }
                    ];

                    $scope.checkout = {};

                    $scope.totals = 0;

                    $scope.isVisibleShippingForm = function () {
                        if ($scope.checkout.shipping_address_id === 0) {
                            return true;
                        }
                        return false;
                    };

                    $scope.isVisibleBillingForm = function () {
                        if ($scope.checkout.billing_address_id === 0) {
                            return true;
                        }
                        return false;
                    };

                    $checkoutApiService.getAddresses().$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.addresses = result;
                            $scope.addresses.unshift({
                                Desc: "",
                                Extra: null,
                                Id: 0,
                                Image: "",
                                Name: "New Address"
                            });
                        }
                    );

                    $scope.save = function() {
                        window.alert("Save order");
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
                }
            ])
        ;
        return checkoutModule;
    });
})(window, window.define);