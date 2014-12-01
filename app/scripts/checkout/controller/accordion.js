(function (w, define, $) {
    "use strict";

    define(["checkout/init"], function (checkoutModule) {

        checkoutModule
            .controller("checkoutAccordionController", [
                "$scope",
                "$location",
                "$checkoutApiService",
                "$designImageService",
                "$visitorLoginService",
                "$cartService",
                "$designStateService",
                "$commonUtilService",
                "$checkoutService",
                "$q",
                function ($scope, $location, $checkoutApiService, $designImageService, $visitorLoginService, $cartService, $designStateService, $commonUtilService, $checkoutService, $q) {

                    var init, info, getDefaultAddress, getAddresses, getCurrentBillingID, getCurrentShippingID,
                        getPaymentInfo, creditCartTypes, isValidSteps;

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

                    init = function () {
                        creditCartTypes = {
                            'VI': [new RegExp('^4[0-9]{12}([0-9]{3})?$'), new RegExp('^[0-9]{3}$'), true],
                            'MC': [new RegExp('^5[1-5][0-9]{14}$'), new RegExp('^[0-9]{3}$'), true]
                        };

                        isValidSteps = {
                            "billingAddress": false,
                            "shippingAddress": false,
                            "shippingMethod": false,
                            "paymentMethod": false,
                            "discounts": true
                        };
                        $scope.countries = [
                            {
                                "Code": "US",
                                "Name": "USA"
                            }
                        ];

                        $scope.creditTypes = [
                            {
                                "Code": "VI",
                                "Name": "Visa"
                            },
                            {
                                "Code": "MC",
                                "Name": "Master Card"
                            }
                        ];

                        $scope["useAsBilling"] = false;
                        $scope["states"] = $designStateService;
                        $scope["cart"] = $cartService;
                        $scope["shippingMethods"] = [];
                        $scope["checkout"] = {};
                        $scope["shipping_address"] = getDefaultAddress();
                        $scope["billing_address"] = getDefaultAddress();
                        $scope["totals"] = 0;
                    };

                    init();

                    /**
                     * Gets checkout information
                     * @return {promise}
                     */
                    info = function () {
                        var defer, initAddressesData, initCurrentShippingMethod, initCurrentPaymentType;

                        defer = $q.defer();

                        initAddressesData = function () {
                            if ($scope.checkout["shipping_address"] !== null) {
                                $scope["shipping_address"] = $commonUtilService.clone($scope.checkout["shipping_address"]);
                                isValidSteps.shippingAddress = true;
                            } else {
                                $scope["shipping_address"] = getDefaultAddress();
                            }

                            if ($scope.checkout["billing_address"] !== null) {
                                $scope["billing_address"] = $commonUtilService.clone($scope.checkout["billing_address"]);
                                isValidSteps.billingAddress = true;
                            } else {
                                $scope["billing_address"] = getDefaultAddress();
                            }
                        };

                        initCurrentShippingMethod = function () {
                            var item, i;
                            for (i = 0; i < $scope.shippingMethods.length; i += 1) {
                                item = $scope.shippingMethods[i];

                                if ($scope.checkout["shipping_method_code"] === item.Method &&
                                    $scope.checkout["shipping_rate"].Code === item.Rate) {

                                    $scope.indexShippingMethod = i;
                                    isValidSteps.shippingMethod = true;
                                }
                            }
                        };

                        initCurrentPaymentType = function () {
                            var item, i;
                            for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                                item = $scope.paymentMethods[i];
                                if ($scope.checkout["payment_method_code"] === item.Code) {

                                    $scope.paymentType = item.Type;

                                    $scope.paymentMethods[i].cc = {};
                                    $scope.paymentMethods[i].cc.type = "VI";
                                    $scope.paymentMethods[i].cc["expire_month"] = "12";
                                    $scope.paymentMethods[i].cc["expire_year"] = "2017";
                                }
                            }
                        };

                        $checkoutApiService.info().$promise.then(
                            function (response) {
                                var result;
                                result = response.result || [];
                                $scope.checkout = result;
                                initCurrentShippingMethod();
                                initCurrentPaymentType();
                                initAddressesData();
                                defer.resolve(true);
                            }
                        );
                        return defer.promise;
                    };

                    $scope.getShippingMethods = function () {
                        var retrieve;

                        /**
                         * Splits the method to submethod
                         *
                         * @param {object} method
                         */
                        retrieve = function (method) {
                            var i, rate;

                            if (method.Rates instanceof Array && method.Rates.length > 0) {

                                for (i = 0; i < method.Rates.length; i += 1) {
                                    rate = method.Rates[i];

                                    $scope.shippingMethods.push(
                                        {
                                            "Name": method.Name + " - " + rate.Name + " ($" + rate.Price + ")",
                                            "Method": method.Code,
                                            "Rate": rate.Code
                                        }
                                    );
                                }
                            }
                        };

                        /**
                         * Gets shipping methods
                         */
                        $checkoutApiService.shippingMethod().$promise.then(function (response) {
                            var i, result, method;
                            result = response.result || [];

                            if (response.error === "" && result.length > 0) {
                                $scope.shippingMethods = [];
                                for (i = 0; i < result.length; i += 1) {
                                    method = result[i];
                                    retrieve(method);
                                }

                            }
                            info();
                        });
                    };

                    /**
                     * Checks visitor on the logged
                     * Adds breadcrumbs
                     * Gets checkout information
                     */
                    $scope.init = function () {
                        $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                            if (!isLoggedIn) {
                                $location.path("/");
                            }
                        });
                        if ($cartService.getCountItems() === 0) {
                            $location.path("/");
                        }

                        if ("accordion" !== $checkoutService.getType()) {
                            $location.path($checkoutService.getUrl().replace("#/", ""));
                        }

                        this.getShippingMethods();

                        $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                        $scope.$emit("add-breadcrumbs", {"label": "Checkout", "url": "/checkout"});
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
                    $checkoutApiService.paymentMethod().$promise.then(function (response) {
                            var result = response.result || [];
                            $scope.paymentMethods = result;
                    });

                    getPaymentInfo = function () {
                        var i, info;
                        info = {
                            "method": null,
                            "form": null
                        };
                        if (typeof $scope.paymentMethods !== "undefined") {
                            for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                                if ($scope.paymentMethods[i].Code === $scope.checkout["payment_method_code"]) {
                                    info.method = $scope.paymentMethods[i];
                                    info.form = info.method.form;
                                }
                            }
                        }

                        return info;
                    };

                    /**
                     * Saves checkout
                     */
                    $scope.save = function () {
                        var payment, isValid, isValidForm, sendPostForm;

                        isValid = function () {
                            var validation;
                            validation = {
                                "status": true,
                                "messages": []
                            };

                            if ($cartService.getCountItems <= 0) {
                                validation.status = false;
                                validation.messages.push('Cart is empty');
                            }

                            return validation;
                        };

                        sendPostForm = function (method, response) {
                            var form;

                            form = "<div class='hidden' id='auth_net_form'>" + response.result;
                            form = form.replace("$CC_NUM", method.cc.number);
                            form = form.replace("$CC_MONTH", method.cc["expire_month"].toString().length < 2 ? "0" + method.cc["expire_month"] : method.cc["expire_month"]);
                            form = form.replace("$CC_YEAR", method.cc["expire_year"]) + "</div>";

                            $(".checkout > div").append(form);
                            $("#auth_net_form").find("form").submit();
                            $("#auth_net_form").remove();
                        };

                        isValidForm = isValid();

                        payment = getPaymentInfo();

                        if (isValidForm.status) {
                            $(this).parents('.confirm').css('display', 'none');
                            $('#processing').modal('show');
                            $checkoutApiService.save().$promise.then(
                                function (response) {

                                    if (null !== payment.method && payment.method.Type === "remote" && response.result === "redirect") {
                                        w.location.replace(response.redirect);
                                    } else if (null !== payment.method && payment.method.Type === "post_cc") {
                                        // Handler for direct post form for Authorize.net
                                        sendPostForm(payment.method, response);
                                    } else if (response.error === "") {
                                        info();
                                        $cartService.reload().then(
                                            function () {
                                                $scope.purchase = response.result || {};
                                                $('#processing').modal('hide');
                                                $("#purchase-success").modal("show");
                                            }
                                        );
                                    } else {
                                        $(this).parents('.confirm').css('display', 'block');
                                        $('#processing').modal('hide');
                                        // Errors from server
                                        $scope.message = {
                                            "type": "danger",
                                            "message": response.error

                                        };
                                    }
                                }
                            );
                        } else {
                            $(this).parents('.confirm').css('display', 'block');
                            $('#processing').modal('hide');
                            $scope.message = {
                                "type": "danger",
                                "message": isValidForm.messages.join("<br />")
                            };
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

                    getCurrentShippingID = function () {
                        var id;
                        if (typeof $scope.checkout["shipping_address"] !== "undefined" &&
                            $scope.checkout["shipping_address"] !== null) {
                            id = $scope.checkout["shipping_address"]._id;
                        }
                        return id;
                    };

                    getCurrentBillingID = function () {
                        var id;
                        if (typeof $scope.checkout["billing_address"] !== "undefined" &&
                            $scope.checkout["billing_address"] !== null) {
                            id = $scope.checkout["billing_address"]._id;
                        }
                        return id;
                    };

                    $scope.choiceBilling = function (billingId) {
                        if (typeof $scope["billing_address"] === "undefined") {
                            $scope["billing_address"] = {};
                        }
                        $scope["billing_address"]._id = billingId;
                        var currentBillingID = getCurrentBillingID();

                        if ($scope["billing_address"]._id !== currentBillingID) {
                            if ($scope["billing_address"]._id !== 0) {
                                $checkoutApiService.setBillingAddress({
                                    "id": $scope["billing_address"]._id
                                }).$promise.then(
                                    function (response) {
                                        if (response.error === "") {
                                            isValidSteps.billingAddress = true;
                                            info();
                                        }
                                    }
                                );
                            }
                        }
                    };

                    $scope.choiceShipping = function (shippingId) {
                        $scope["shipping_address"]._id = shippingId;
                        var currentShippingID = getCurrentShippingID();

                        if ($scope["shipping_address"]._id !== currentShippingID) {
                            if ($scope["shipping_address"]._id !== 0) {
                                $checkoutApiService.setShippingAddress({
                                    "id": $scope["shipping_address"]._id
                                }).$promise.then(
                                    function (response) {
                                        if (response.error === "") {
                                            $scope.getShippingMethods();

                                            if ($scope.useAsBilling) {
                                                $scope.choiceBilling($scope["shipping_address"]._id);
                                            }
                                        }
                                    }
                                );
                            }
                        }
                    };

                    $scope.newBilling = function () {
                        $scope.subBillingAddress = false;
                        isValidSteps.billingAddress = false;

                        $scope["billing_address"] = getDefaultAddress();
                    };

                    $scope.newShipping = function () {
                        $scope.subShippingAddress = false;
                        isValidSteps.shippingAddress = false;

                        $scope["shipping_address"] = getDefaultAddress();
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
                        var defer, currentShippingID;
                        currentShippingID = getCurrentShippingID();
                        defer = $q.defer();
                        $scope.subShippingAddress = true;

                        if (!invalid && $scope["shipping_address"]._id !== currentShippingID &&
                            $scope["shipping_address"]._id === 0) {

                            delete $scope["shipping_address"]._id;
                            $checkoutApiService.setShippingAddress($scope["shipping_address"]).$promise.then(
                                function (response) {
                                    if (response.error === "") {
                                        getAddresses();
                                        info().then(
                                            function () {
                                                if ($scope.useAsBilling) {
                                                    $scope.choiceBilling($scope.checkout["shipping_address"]._id);
                                                }

                                                $scope.subShippingAddress = false;
                                                isValidSteps.shippingAddress = true;
                                                defer.resolve(true);
                                            }
                                        );
                                    }
                                }
                            );
                        } else {
                            defer.resolve(false);
                        }

                        return defer.promise;
                    };

                    $scope.saveBillingAddress = function (invalid) {
                        var defer, currentBillingID;
                        defer = $q.defer();

                        currentBillingID = getCurrentBillingID();
                        $scope.subBillingAddress = true;

                        if (!invalid && $scope["billing_address"]._id !== currentBillingID &&
                            $scope["billing_address"]._id === 0) {

                            delete $scope["billing_address"]._id;
                            $checkoutApiService.setBillingAddress($scope["billing_address"]).$promise.then(
                                function (response) {
                                    if (response.error === "") {
                                        getAddresses();
                                        info();
                                        $scope["billing_address"] = getDefaultAddress();

                                        $scope.subBillingAddress = false;
                                        isValidSteps.billingAddress = true;
                                        defer.resolve(true);
                                    }
                                }
                            );
                        } else {
                            defer.resolve(false);
                        }

                        return defer.promise;
                    };

                    $scope.discountApply = function () {
                        if ("" === $scope.discount || typeof $scope.discount === "undefined") {
                            $scope.messageDiscounts = {
                                "type": "warning",
                                "message": "Discount code can't be empty"
                            };
                        } else {
                            $checkoutApiService.discountApply({"code": $scope.discount}).$promise.then(
                                function (response) {
                                    if (response.error === "") {
                                        info();
                                    } else {
                                        $scope.messageDiscounts = {
                                            "type": "warning",
                                            "message": response.error
                                        };
                                        $scope.discount = "";
                                    }
                                }
                            );
                        }
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
                        var isCreditCard;
                        isCreditCard = type.split("_").indexOf("cc") > 0;
                        if (!isCreditCard) {
                            isValidSteps.paymentMethod = true;
                        } else {
                            isValidSteps.paymentMethod = false;
                        }
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

                    $scope.closeSuccessPopup = function () {
                        $(".modal").modal("hide");
                        $(".modal-open").removeClass('modal-open');
                        $location.path("/");
                    };

                    $scope.back = function (step) {
                        $("#" + step).slideUp("slow").parents('.panel').prev('.panel').find('.accordion').slideDown(500);
                    };

                    $scope.next = function (step) {

                        switch (step) {
                            case "billingAddress":
                                $scope.saveBillingAddress($scope.billingAddress.$invalid).then(
                                    function () {
                                        if (isValidSteps[step]) {
                                            $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                        }
                                    }
                                );
                                break;
                            case "shippingAddress":
                                $scope.saveShippingAddress($scope.shippingAddress.$invalid).then(
                                    function () {
                                        if (isValidSteps[step]) {
                                            if ($scope.useAsBilling) {
                                                $("#" + step).slideUp("slow").parents('.panel').next('.panel').next('.panel').find('.accordion').slideDown(500);
                                            } else {
                                                $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                            }
                                        }
                                    }
                                );
                                break;
                            case "paymentMethod":
                                $scope.subPaymentForm = true;
								
								if (isValidSteps[step]) {
                                    $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                } else {
                                    var isCreditCard;
                                    isCreditCard = $scope.paymentType.split("_").indexOf("cc") > 0;
                                    if (isCreditCard) {
                                        if ($scope.validateCcNumber()) {
                                            $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                        }
                                    }
                                }
                                break;
                            default:
                                if (isValidSteps[step]) {
                                    $("#" + step).slideUp("slow").parents('.panel').next('.panel').find('.accordion').slideDown(500);
                                }
                        }

                    };

                    $scope.validateCcNumber = function () {
                        var i, payment, result;
                        result = false;

                        payment = getPaymentInfo();

                        var validateCreditCard = function (s) {
                            // remove non-numerics
                            var a, c, m, k, j, x, w, v;
                            v = "0123456789";
                            w = "";
                            for (i = 0; i < s.length; i += 1) {
                                x = s.charAt(i);
                                if (v.indexOf(x, 0) !== -1) {
                                    w += x;
                                }
                            }
                            // validate number
                            j = w.length / 2;
                            k = Math.floor(j);
                            m = Math.ceil(j) - k;
                            c = 0;
                            for (i = 0; i < k; i += 1) {
                                a = w.charAt(i * 2 + m) * 2;
                                c += a > 9 ? Math.floor(a / 10 + a % 10) : a;
                            }
                            for (i = 0; i < k + m; i += 1) {
                                c += w.charAt(i * 2 + 1 - m) * 1;
                            }
                            return (c % 10 === 0);
                        };

                        if (payment.method === null && payment.form === null) {
                            return false;
                        }

                        if (creditCartTypes[payment.method.cc.type][0].test(payment.method.cc.number) === true) {
                            result = validateCreditCard(payment.method.cc.number);
                        }

                        payment.form.number.$invalidFormat = result;

                        return result;
                    };

                    $scope.$watch("useAsBilling", function () {
                        if ($scope.useAsBilling) {

                            if ($scope["shipping_address"]._id !== 0 &&
                                typeof $scope["shipping_address"]._id !== "undefined") {
                                $scope.choiceBilling($scope["shipping_address"]._id);
                            }
                            $scope["billing_address"] = $commonUtilService.clone($scope["shipping_address"]);
                        } else {
                            $scope["billing_address"] = $commonUtilService.clone($scope.checkout["billing_address"]);
                        }

                    }, true);

                    $scope.$watch("shipping_address", function () {
                        if ($scope.useAsBilling) {
                            if ($scope["shipping_address"]._id === 0 ||
                                typeof $scope["shipping_address"]._id === "undefined") {
                                $scope["billing_address"] = $commonUtilService.clone($scope["shipping_address"]);
                            }

                        }
                    }, true);

                    /**
                     * Sets payment method
                     */
                    $scope.$watch("checkout.payment_method_code", function () {
                        if (typeof $scope.checkout["payment_method_code"] !== "undefined" &&
                            $scope.checkout["payment_method_code"] !== "" &&
                            $scope.checkout["payment_method_code"] !== null) {
                            $checkoutApiService.setPaymentMethod({
                                "method": $scope.checkout["payment_method_code"]
                            }).$promise.then(
                                function (response) {
                                    if (response.result === "ok") {
                                        var isCreditCard;
                                        isCreditCard = $scope.paymentType.split("_").indexOf("cc") > 0;
                                        if (isCreditCard) {
                                            isValidSteps.paymentMethod = false;
                                            if ($scope.validateCcNumber()) {
                                                isValidSteps.paymentMethod = true;
                                            }
                                        } else {
                                            isValidSteps.paymentMethod = true;
                                        }
                                        info();
                                    }
                                }
                            );
                        }
                    });

                    /**
                     * Sets payment method
                     */
                    $scope.$watch("paymentMethods", function () {
                        var payment = getPaymentInfo();

                        if (payment.method !== null && payment.method.Type.split("_").indexOf("cc") > 0) {

                            isValidSteps.paymentMethod = $scope.validateCcNumber();
                        }

                    }, true);
                }
            ]
        );

        return checkoutModule;
    });
})(window, window.define, jQuery);
