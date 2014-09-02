(function (w, define, $) {
    "use strict";

    define(["checkout/init"], function (checkoutModule) {

        var clone = function (obj) {
            if (null === obj || "object" !== typeof obj) {
                return obj;
            }
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = obj[attr];
                }
            }
            return copy;
        };

        checkoutModule

            .controller("checkoutController", [
                "$scope",
                "$location",
                "$checkoutApiService",
                "$designImageService",
                "$visitorLoginService",
                "$cartService",
                "$designStateService",
                "$anchorScroll",
                "$q",
                function ($scope, $location, $checkoutApiService, $designImageService, $visitorLoginService, $cartService, $designStateService, $anchorScroll, $q) {    // jshint ignore:line

                    var isLoggedIn, info, getDefaultAddress, getAddresses, getCurrentBillingID, getCurrentShippingID, sendPostForm;

                    getDefaultAddress = function () {
                        return {
                            "_id": 0,
                            "street": "",
                            "city": "",
                            "state": "",
                            "phone": "",
                            "zip_code": "",
                            "company": "",
                            "first_name": "",
                            "last_name": "",
                            "address_line1": "",
                            "address_line2": "",
                            "country": ""
                        };
                    };

                    $scope.countries = [
                        { Code: "US", Name: "USA" }
                    ];

                    $scope.creditTypes = [
                        {"Code": "visa", "Name": "Visa"},
                        {"Code": "master_card", "Name": "Master Card"}
                    ];

                    $scope.useAsBilling = false;
                    $scope.states = $designStateService;
                    $scope.cart = $cartService;
                    $scope.shippingMethods = [];
                    $scope.checkout = {};
                    $scope.shipping_address = getDefaultAddress();      // jshint ignore:line
                    $scope.billing_address = getDefaultAddress();       // jshint ignore:line
                    $scope.totals = 0;

                    /**
                     * Gets checkout information
                     * @return {promise}
                     */
                    info = function () {
                        var defer = $q.defer();
                        $checkoutApiService.info().$promise.then(
                            // TODO: Line 77 - reduce cyclomatic complexity here
                            function (response) {           // jshint ignore:line
                                var i, result, item;
                                result = response.result || [];
                                $scope.checkout = result;

                                for (i = 0; i < $scope.shippingMethods.length; i += 1) {
                                    item = $scope.shippingMethods[i];

                                    if ($scope.checkout.shipping_method_code === item.Method &&         // jshint ignore:line
                                        $scope.checkout.shipping_rate.Code === item.Rate) {         // jshint ignore:line

                                        $scope.indexShippingMethod = i;
                                    }
                                }

                                for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                                    item = $scope.paymentMethods[i];
                                    if ($scope.checkout.payment_method_code === item.Code) {        // jshint ignore:line

                                        $scope.paymentType = item.Type;
                                    }
                                }

                                if ($scope.checkout.shipping_address !== null) {        // jshint ignore:line
                                    $scope.shipping_address = clone($scope.checkout.shipping_address);      // jshint ignore:line
                                }

                                if ($scope.checkout.billing_address !== null) {         // jshint ignore:line
                                    $scope.billing_address = clone($scope.checkout.billing_address);        // jshint ignore:line
                                }
                                defer.resolve(true);
                            }
                        );
                        return defer.promise;
                    };

                    $scope.getShippingMethods = function () {
                        /**
                         * Gets shipping methods
                         */
                        $checkoutApiService.shippingMethod().$promise.then(
                            // TODO: reduce cyclomatic complexity here
                            function (response) {                           // jshint ignore:line
                                var i, j, result, method, rate;
                                result = response.result || [];

                                if (response.error === "" && result.length > 0) {
                                    $scope.shippingMethods = [];
                                    for (i = 0; i < result.length; i += 1) {
                                        method = result[i];

                                        if (method.Rates instanceof Array && method.Rates.length > 0) {

                                            for (j = 0; j < method.Rates.length; j += 1) {
                                                rate = method.Rates[j];

                                                $scope.shippingMethods.push(
                                                    {
                                                        "Name": rate.Name + ". Cost: $" + rate.Price,
                                                        "Method": method.Code,
                                                        "Rate": rate.Code
                                                    }
                                                );
                                            }
                                        }
                                    }

                                }
                                info();
                            }
                        );
                    };
                    /**
                     * Checks visitor on the logged
                     * Adds breadcrumbs
                     * Gets checkout information
                     */
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
                        if ($cartService.getCountItems() === 0) {
                            $location.path("/");
                        }

                        this.getShippingMethods();

                        $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                        $scope.$emit("add-breadcrumbs", {"label": "Checkout", "url": "/checkout"});
                    };

                    /**
                     * Checking if should show form for the adding shipping address
                     *
                     * @returns {boolean}
                     */
                    $scope.isVisibleShippingForm = function () {
                        if ($scope.shipping_address_id === 0) {         // jshint ignore:line
                            return true;
                        }

                        return false;
                    };

                    /**
                     * Checking if should show form for the adding billing address
                     *
                     * @returns {boolean}
                     */
                    $scope.isVisibleBillingForm = function () {
                        if (typeof $scope.billing_address !== "undefined" &&        // jshint ignore:line
                            $scope.billing_address_id === 0) {      // jshint ignore:line
                            return true;
                        }

                        return false;
                    };

                    /**
                     * Updates cart items
                     * @param {number} idx
                     * @param {number} qty
                     */
                    $scope.cartUpdate = function (idx, qty) {
                        $scope.cart.update(idx, qty).then(
                            function () {
                                info();
                            }
                        );
                    };

                    /**
                     * Gets visitor addresses
                     */
                    getAddresses = function () {
                        $checkoutApiService.getAddresses().$promise.then(
                            function (response) {
                                var result = response.result || [];
                                $scope.addresses = result;
                            }
                        );
                    };

                    getAddresses();

                    /**
                     * Gets payment methods
                     */
                    $checkoutApiService.paymentMethod().$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.paymentMethods = result;
                        }
                    );

                    /**
                     * Saves checkout
                     */
                    $scope.save = function () {
                        var i, form, method;
                        method = {};

                        for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                            if ($scope.paymentMethods[i].Code === $scope.checkout.payment_method_code) {        // jshint ignore:line
                                method = $scope.paymentMethods[i];
                                form = method.form;
                            }
                        }

                        if ($cartService.getCountItems() > 0) {
                            $checkoutApiService.save().$promise.then(
                                function (response) {

                                    if (method.Type === "remote" && response.result === "redirect") {
                                        window.location.replace(response.redirect);
                                    } else if (method.Type === "post_cc") {
                                        sendPostForm(method, response);
                                    } else if (response.error === "") {
                                        info();
                                        $cartService.reload().then(
                                            function () {
                                                $location.path("/account/order/success/" + response.result.increment_id);       // jshint ignore:line
                                            }
                                        );
                                    } else {

                                        $scope.message = {
                                            "type": "danger",
                                            "message": response.error

                                        };
                                    }
                                }
                            );
                        }
                    };

                    sendPostForm = function (method, response) {
                        var form;

                        form = "<div class='hidden' id='auth_net_form'>" + response.result;
                        form = form.replace("$CC_NUM", method.cc.number);
                        form = form.replace("$CC_MONTH", method.cc.expire_month.toString().length < 2 ? "0" + method.cc.expire_month : method.cc.expire_month);
                        form = form.replace("$CC_YEAR", method.cc.expire_year)+"</div>";

                        $(".checkout > div").append(form);
                        $("#auth_net_form").find("form").submit();
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

                    getCurrentShippingID = function () {
                        var id;
                        if (typeof $scope.checkout.shipping_address !== "undefined" &&      // jshint ignore:line
                            $scope.checkout.shipping_address !== null) {        // jshint ignore:line
                            id = $scope.checkout.shipping_address._id;      // jshint ignore:line
                        }
                        return id;
                    };

                    getCurrentBillingID = function () {
                        var id;
                        if (typeof $scope.checkout.billing_address !== "undefined" &&       // jshint ignore:line
                            $scope.checkout.billing_address !== null) {         // jshint ignore:line
                            id = $scope.checkout.billing_address._id;       // jshint ignore:line
                        }
                        return id;
                    };

                    $scope.choiceBilling = function (billingId) {
                        if (typeof $scope.billing_address === "undefined") {        // jshint ignore:line
                            $scope.billing_address = {};        // jshint ignore:line
                        }
                        $scope.billing_address._id = billingId;         // jshint ignore:line
                        var currentBillingID = getCurrentBillingID();

                        if ($scope.billing_address._id !== currentBillingID) {      // jshint ignore:line
                            if ($scope.billing_address._id !== 0) {         // jshint ignore:line
                                $checkoutApiService.setBillingAddress({
                                    "id": $scope.billing_address._id        // jshint ignore:line
                                }).$promise.then(
                                    function (response) {
                                        if (response.error === "") {
                                            info();
                                        }
                                    }
                                );
                            }
                        }
                    };

                    $scope.choiceShipping = function (shippingId) {
                        $scope.shipping_address._id = shippingId;       // jshint ignore:line
                        var currentShippingID = getCurrentShippingID();

                        if ($scope.shipping_address._id !== currentShippingID) {        // jshint ignore:line
                            if ($scope.shipping_address._id !== 0) {        // jshint ignore:line
                                $checkoutApiService.setShippingAddress({
                                    "id": $scope.shipping_address._id       // jshint ignore:line
                                }).$promise.then(
                                    function (response) {
                                        if (response.error === "") {
                                            $scope.getShippingMethods();

                                        }
                                    }
                                );
                            }
                        }
                    };

                    $scope.newBilling = function () {
                        $scope.billing_address = getDefaultAddress();       // jshint ignore:line
                    };

                    $scope.newShipping = function () {
                        $scope.shipping_address = getDefaultAddress();      // jshint ignore:line
                    };

                    $scope.choiceShippingMethod = function (index) {

                        if (typeof index !== "undefined" && index !== "") {
                            $checkoutApiService.setShippingMethod({
                                "method": $scope.shippingMethods[index].Method,
                                "rate": $scope.shippingMethods[index].Rate
                            }).$promise.then(
                                function (response) {
                                    if (response.result === "ok") {
                                        info();
                                    }
                                }
                            );
                        }
                    };

                    $scope.saveShippingAddress = function (invalid) {
                        var currentShippingID = getCurrentShippingID();

                        if ($scope.shipping_address._id !== currentShippingID &&        // jshint ignore:line
                            $scope.shipping_address._id === 0 && !invalid) {        // jshint ignore:line

                            delete $scope.shipping_address._id;         // jshint ignore:line
                            $checkoutApiService.setShippingAddress($scope.shipping_address).$promise.then(      // jshint ignore:line
                                function (response) {
                                    if (response.error === "") {
                                        getAddresses();
                                        info().then(
                                            function () {
                                                if ($scope.useAsBilling) {
                                                    $scope.choiceBilling($scope.checkout.shipping_address._id)      // jshint ignore:line
                                                }
                                            }
                                        );


                                    }
                                }
                            );
                        }
                    };

                    $scope.saveBillingAddress = function (invalid) {
                        var currentBillingID = getCurrentBillingID();

                        if ($scope.billing_address._id !== currentBillingID &&      // jshint ignore:line
                            $scope.billing_address._id === 0 && !invalid) {         // jshint ignore:line

                            delete $scope.billing_address._id;      // jshint ignore:line
                            $checkoutApiService.setBillingAddress($scope.billing_address).$promise.then(        // jshint ignore:line
                                function (response) {
                                    if (response.error === "") {
                                        getAddresses();
                                        info();
                                        $scope.billing_address = getDefaultAddress();       // jshint ignore:line
                                    }
                                }
                            );
                        }
                    };

                    $scope.discountApply = function () {
                        $checkoutApiService.discountApply({"code": $scope.discount}).$promise.then(
                            function (response) {
                                if (response.error === "") {
                                    info();
                                }
                            }
                        );
                    };

                    $scope.discountNeglect = function (code) {
                        $checkoutApiService.discountNeglect({"code": code}).$promise.then(
                            function (response) {
                                if (response.error === "") {
                                    info();
                                }
                            }
                        );
                    };

                    $scope.setPaymentType = function (type) {
                        $scope.paymentType = type;
                    };

                    $scope.isCreditCard = function () {
                        if (typeof $scope.paymentType !== "undefined") {
                            return $scope.paymentType.split("_").indexOf("cc") > 0;
                        }
                        return false;
                    };

                    $scope.showFormCc = function (method) {
                        if (typeof method !== "undefined") {
                            return method.Type.split("_").indexOf("cc") > 0;
                        }
                        return false;
                    };

                    $scope.$watch("useAsBilling", function () {
                        if ($scope.useAsBilling) {

                            if ($scope.shipping_address._id !== 0 &&        // jshint ignore:line
                                typeof $scope.shipping_address._id !== "undefined") {       // jshint ignore:line
                                $scope.choiceBilling($scope.shipping_address._id);      // jshint ignore:line
                            }
                            $scope.billing_address = clone($scope.shipping_address);        // jshint ignore:line
                        } else {
                            $scope.billing_address = clone($scope.checkout.billing_address);        // jshint ignore:line
                        }

                    }, true);

                    $scope.$watch("shipping_address", function () {
                        if ($scope.useAsBilling) {
                            if ($scope.shipping_address._id === 0 ||        // jshint ignore:line
                                typeof $scope.shipping_address._id === "undefined") {       // jshint ignore:line
                                $scope.billing_address = clone($scope.shipping_address);        // jshint ignore:line
                            }

                        }
                    }, true);

                    /**
                     * Sets payment method
                     */
                    $scope.$watch("checkout.payment_method_code", function () {
                        if (typeof $scope.checkout.payment_method_code !== "undefined" &&       // jshint ignore:line
                            $scope.checkout.payment_method_code !== "" &&       // jshint ignore:line
                            $scope.checkout.payment_method_code !== null) {         // jshint ignore:line
                            $checkoutApiService.setPaymentMethod({
                                "method": $scope.checkout.payment_method_code       // jshint ignore:line
                            }).$promise.then(
                                function (response) {
                                    if (response.result === "ok") {
                                        info();
                                    }
                                }
                            );
                        }
                    });

                }
            ])
        ;
        return checkoutModule;
    });
})(window, window.define, jQuery);
