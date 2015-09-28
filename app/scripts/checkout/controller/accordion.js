angular.module("checkoutModule")

    .controller("checkoutAccordionController", [
        "$scope",
        "$location",
        "$q",
        "$interval",
        "$timeout",
        "$checkoutApiService",
        "$visitorLoginService",
        "$cartService",
        "$designCountryService",
        "$designStateService",
        "$commonUtilService",
        "$checkoutService",
        "$giftCardsService",
        function (
            $scope,
            $location,
            $q,
            $interval,
            $timeout,
            $checkoutApiService,
            $visitorLoginService,
            $cartService,
            $designStateService,
            $designCountryService,
            $commonUtilService,
            $checkoutService,
            $giftCardsService
        ) {

            var init, info, getDefaultAddress, getAddresses, enabledGuestCheckout,
                getPaymentInfo, creditCardTypes, isValidSteps;

            /**
             * Gets checkout information
             * @return {promise}
             */
            info = function () {
                var defer = $q.defer();

                var initAddressesData = function () {
                    if ($scope.checkout["shipping_address"] === null) {
                        $scope.checkout["shipping_address"] = getDefaultAddress();
                    }

                    if ($scope.checkout["billing_address"] === null) {
                        $scope.checkout["billing_address"] = getDefaultAddress();
                    }
                };

                $checkoutService.update().then(
                    function (checkout) {
                        $scope.checkout = checkout;
                        initAddressesData();
                        defer.resolve(true);
                    }
                );

                return defer.promise;
            };

            init = function () {

                // General
                $scope.checkoutService = $checkoutService;
                $scope.cart = $cartService;
                $scope.checkout = {};
                $scope.totals = 0;

                isValidSteps = {
                    "billingAddress": false,
                    "shippingAddress": false,
                    "shippingMethod": false,
                    "paymentMethod": false,
                    "discounts": true
                };

                // Addresses
                $scope.countries = $designCountryService;
                $scope.states = $designStateService;

                getDefaultAddress = function () {
                    return {
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
                        "country": "US"
                    };
                };

                $scope.useAsBilling = true;

                // Shipping method
                $scope.shippingMethod = {
                    selected: false
                };
                $scope.shippingMethods = []; // REFACTOR: nest under shippingMethod as options

                // Billing Method
                $scope.paymentMethod = {
                    selected: false
                };
                $scope.paymentMethods = []; // REFACTOR: nest under paymentMethod as options
                $checkoutService.loadPaymentMethods()
                .then(function(methods){
                    // Flag methods that have a credit card form
                    angular.forEach(methods, function(method){
                        method.isCreditCard = method.Type.split("_").indexOf("cc") >= 0;
                    });
                    $scope.paymentMethods = methods;
                });

                $scope.creditTypes = [
                    {
                        "Code": "VI",
                        "Name": "Visa"
                    },
                    {
                        "Code": "MC",
                        "Name": "Master Card"
                    },
                    {
                        "Code": "DS",
                        "Name": "Discover"
                    },
                    {
                        "Code": "AX",
                        "Name": "American Express"
                     }
                ];

                creditCardTypes = {
                    'VI': [new RegExp('^4[0-9]{12}([0-9]{3})?$'), new RegExp('^[0-9]{3}$'), true],
                    'MC': [new RegExp('^5[1-5][0-9]{14}$'), new RegExp('^[0-9]{3}$'), true],
                    'AX': [new RegExp('^3[47][0-9]{13}$'), new RegExp('^[0-9]{3}$'), true],
                    'DS': [new RegExp('^6(?:011|5[0-9]{2})[0-9]{12}$'), new RegExp('^[0-9]{3}$'), true]
                };

                info();
            };

            enabledGuestCheckout = function () {
                $scope.subAdditionalInfo = false;
                return angular.appConfigValue("general.checkout.guest_checkout");
            };

            /**
             * Gets visitor addresses
             */
            getAddresses = function () {
                if (!$scope["isGuestCheckout"]) {
                    $checkoutApiService.getAddresses().$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.addresses = result;
                        }
                    );
                }
            };

            /**
             * Checks visitor on the logged
             * Adds breadcrumbs
             * Gets checkout information
             */
            $scope.init = function () {

                // TODO: what is this for
                if ("onepage" == $checkoutService.getType()) {
                    $location.path($checkoutService.getUrl().replace("#/", ""));
                }

                $cartService.init().then(function () {
                    if ($cartService.getCountItems() === 0) {
                        $location.path("/");
                    } else {

                        if (!enabledGuestCheckout()) {
                            $scope.isGuestCheckout = false;
                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                if (!isLoggedIn) {
                                    $location.path("/");
                                } else {
                                    getAddresses();
                                    init();
                                }
                            });
                        } else {
                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                if (!isLoggedIn) {
                                    $scope.isGuestCheckout = true;
                                } else {
                                    // Not guest checkout, flag it and make sure we show the shipping address panel
                                    $scope.isGuestCheckout = false;

                                    // REFACTOR: an unexpected jquery appears
                                    // tags: .accordion step animate
                                    $('#shippingAddress .panel-body').show();
                                }
                                getAddresses();
                                init();
                            });
                        }
                    }
                });

                $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                $scope.$emit("add-breadcrumbs", {"label": "Checkout", "url": "/checkout"});
            };

            // REFACTOR: we should just be able to use the $scope.paymentMethod.selected object
            getPaymentInfo = function () {
                var i, info;
                info = {
                    "method": null,
                    "form": null
                };

                info.method = $scope.paymentMethod.selected;
                info.form = $scope.paymentMethod.selected.form;

                return info;
            };

            $scope.newBilling = function () {
                // Sets submitted billing form in false
                $scope.subBillingAddress = false;
                // Sets a flag of form is not valid
                isValidSteps.billingAddress = false;
                // Initialise address by default
                $scope.checkout["billing_address"] = getDefaultAddress();
                $scope.useAsBilling = false;

                for (var field in $scope.checkout["billing_address"]) {
                    if ($scope.billingAddress.hasOwnProperty(field)) {
                        $scope.billingAddress[field].$pristine = true;
                        $scope.billingAddress[field].$invalid = false;
                    }
                }
            };

            $scope.newShipping = function () {
                // Sets submitted shipping form in false
                $scope.subShippingAddress = false;
                // Sets a flag of form is not valid
                isValidSteps.shippingAddress = false;
                // Initialise address by default
                $scope.checkout["shipping_address"] = getDefaultAddress();

                for (var field in $scope.checkout["shipping_address"]) {
                    if ($scope.shippingAddress.hasOwnProperty(field)) {
                        $scope.shippingAddress[field].$pristine = true;
                        $scope.shippingAddress[field].$invalid = false;
                    }
                }
            };

            // REFACTOR: This is currently only used for saved addresses, and probably isn't needed
            $scope.choiceBilling = function (billingId) {
                // TODO: [aknox] these top level conditions can't be right,
                // why would we look at the shippingAddress form validity
                if ($scope.isGuestCheckout && $scope.shippingAddress.$valid) {
                    $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(
                        function (response) {
                            if (response.error === null) {
                                isValidSteps.billingAddress = true;
                            }
                        }
                    );
                } else if ($scope.checkout["billing_address"] !== null && $scope.checkout["billing_address"]._id !== billingId && typeof billingId === "string" && billingId !== "") {
                    // Sets existing address as billing
                    $checkoutService.saveBillingAddress({"id": billingId}).then(
                        function (response) {
                            if (response.error === null) {
                                isValidSteps.billingAddress = true;
                            }
                        }
                    );
                } else {
                    if ($scope.shippingAddress.$valid) {
                        $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(
                            function (response) {
                                if (response.error === null) {
                                    isValidSteps.billingAddress = true;
                                }
                            }
                        );
                    }
                }
            };

            // REFACTOR: This is currently only used for saved addresses, and probably isn't needed
            $scope.choiceShipping = function (shippingId) {
                if ($scope.isGuestCheckout) {
                    $checkoutService.saveShippingAddress($scope.checkout["shipping_address"]).then(
                        function (response) {
                            // update checkout
                            info().then(function () {
                                // if all ok, must update allowed shipping methods list
                                // and must set billing address if set appropriate checkbox
                                if (response.error === null) {
                                    $checkoutService.loadShippingMethods().then(function (methods) {
                                        $scope.shippingMethods = methods;
                                        $scope.shippingMethod.selected = $scope.shippingMethods[0]; // select first option
                                    });
                                    // sets billing address
                                    if ($scope.useAsBilling) {
                                        $scope.choiceBilling(response.result);
                                    }
                                }
                            });
                        }
                    );
                } else if (($scope.checkout["shipping_address"] !== null && $scope.checkout["shipping_address"]._id !== shippingId) || Boolean(shippingId)) {

                    // Sets existing address as shipping
                    $checkoutService.saveShippingAddress({"id": shippingId}).then(
                        function (response) {
                            // update checkout
                            info().then(function () {
                                // if all ok, must update allowed shipping methods list
                                // and must set billing address if set appropriate checkbox
                                if (response.error === null) {
                                    isValidSteps.shippingAddress = true;
                                    $checkoutService.loadShippingMethods().then(function (methods) {
                                        $scope.shippingMethods = methods;
                                        $scope.shippingMethod.selected = $scope.shippingMethods[0]; // select first option
                                    });
                                    // sets billing address
                                    if ($scope.useAsBilling) {
                                        $scope.choiceBilling(response.result._id);
                                    }
                                } else {
                                    isValidSteps.billingAddress = false;
                                }
                            });
                        }
                    );
                }
            };

            var _scrollTo = function($step){
                $('html, body').animate({
                    scrollTop: $step.offset().top
                }, 100);
            }

            $scope.back = function (step) {
                var $thisStep = $("#" + step);
                var $lastStep = $thisStep.prev('.panel');

                // We can start scrolling to the panel before animations finish because the
                // distance from the top won't change
                _scrollTo($lastStep);
                $thisStep.find('.panel-body').slideUp(500);
                $lastStep.find('.panel-body').slideDown(500);
            };

            $scope.next = function (step) {
                /*jshint maxcomplexity:6 */

                var _accordionAnimation = function(step, skipOneStep) {
                    var $thisStep = $("#" + step);
                    var $nextStep = $thisStep.next('.panel');
                    if (skipOneStep) {
                        $nextStep = $thisStep.next('.panel').next('.panel');
                    }
                    $thisStep.find('.panel-body').slideUp(600, function(){
                        _scrollTo($nextStep);
                    });
                    $nextStep.find('.panel-body').slideDown(500);
                }

                var actionBillingAddress = function () {
                    $scope.subBillingAddress = true;
                    if ($scope.billingAddress.$valid) {
                        isValidSteps.billingAddress = true;

                        // REFACTOR: this condition could be worded better
                        if (
                            (
                                !Boolean($scope.checkout["billing_address"]._id)
                                && !$scope["isGuestCheckout"]
                            )
                            || $scope["isGuestCheckout"]
                        ) {
                            $checkoutService.saveBillingAddress($scope.checkout["billing_address"])
                            .then(function () {
                                getAddresses();
                                // update checkout
                                info();
                                _accordionAnimation(step);
                            });
                        } else {
                            //TODO: Confirm that this is expected
                            _accordionAnimation(step);
                        }
                    }
                };

                var actionShippingAddress = function () {

                    // REFACTOR: document / investigate what this is for
                    $scope.subShippingAddress = true;

                    if ($scope.shippingAddress.$valid) {
                        isValidSteps.shippingAddress = true;

                        //always persist shipping address in case there are shipping notes
                        $checkoutService.saveShippingAddress($scope.checkout.shipping_address)
                        .then(function () {
                            getAddresses();
                            $checkoutService.loadShippingMethods().then(function (methods) {
                                $scope.shippingMethods = methods;

                                // select first option
                                $scope.shippingMethod.selected = $scope.shippingMethods[0];
                            });

                            if ($scope.useAsBilling) {
                                $checkoutService.saveBillingAddress($scope.checkout.shipping_address)
                                .then(function (response) {
                                    if (response.error === null) {
                                        isValidSteps.billingAddress = true;
                                    }
                                    // update checkout
                                    info();

                                    // skip billing address step
                                    var skipOneStep = true;
                                    _accordionAnimation(step, skipOneStep);
                                });
                            } else {
                                // update checkout
                                info();

                                // open billing address
                                _accordionAnimation(step);
                            }
                        });
                    }
                };

                var actionShippingMethod = function() {
                    $checkoutService.saveShippingMethod({
                        "method": $scope.shippingMethod.selected.Method,
                        "rate": $scope.shippingMethod.selected.Rate
                    }).then(function (response) {
                        if (response.result === "ok") {
                            // update checkout
                            info();
                            isValidSteps.shippingMethod = true;
                            _accordionAnimation(step);
                        }
                    });
                }

                var actionPaymentMethod = function () {
                    $scope.subPaymentForm = true;
                    isValidSteps.paymentMethod = false;

                    if ($scope.paymentMethod.selected) {

                        if ($scope.paymentMethod.selected.isCreditCard) {

                            var payment = getPaymentInfo();

                            // REFACTOR: we are using our own proprietary "submited" instead
                            // of angular's form.$submitted https://docs.angularjs.org/guide/forms
                            // also I'm not entirely convinced we use this properly in the view
                            payment.method.form.submited = true;

                            if (payment.method.form.$valid && $scope.validateCcNumber()) {
                                // Save off the method name
                                $checkoutService.savePaymentMethod({
                                    method: $scope.paymentMethod.selected.Code
                                });

                                // Save off the cc form
                                $checkoutService.saveAdditionalInfo({"cc": payment.method.cc})
                                .then(function(resp){
                                    if (resp.result === 'ok') {
                                        // Update the checkout object and proceed
                                        isValidSteps.paymentMethod = true;
                                        info();
                                        _accordionAnimation(step);
                                    };
                                });
                            }
                        } else {
                            // not a cc just continue
                            $checkoutService.savePaymentMethod({
                                method: $scope.paymentMethod.selected.Code
                            })
                            .then(function(resp){
                                // update the checkout object and proceed
                                if (resp.result === 'ok') {
                                    isValidSteps.paymentMethod = true;
                                    info();
                                    _accordionAnimation(step);
                                };
                            });
                        }
                    }
                };

                var actionCustomerAdditionalInfo = function () {
                    // isValidSteps isn't used for this step
                    // REFACTOR: investigate / document what this is for
                    $scope.subAdditionalInfo = true;

                    if ($scope.isGuestCheckout && $scope.customerInfo.$valid) {
                        $checkoutService.saveAdditionalInfo({
                            "customer_email": $scope.checkout.info.customer_email,
                            "customer_name": $scope.checkout.info.customer_name
                        }).then(function () {
                            _accordionAnimation(step);
                        });
                    }
                };

                var actionDiscount = function () {
                    // Discounts step is always valid
                    // If the grand total is 0 we can set the paymentMethod step to valid and jump over it.
                    if ($scope.checkout.grandtotal <= 0)  {
                        isValidSteps.paymentMethod = true;
                        var skipOneStep = true;
                        _accordionAnimation(step, skipOneStep);

                    } else {
                        isValidSteps.paymentMethod = false;
                        _accordionAnimation(step);
                    }
                };

                var actionDefault = function () {
                    if (isValidSteps[step]) {
                        _accordionAnimation(step);
                    }
                };

                switch (step) {
                    case "billingAddress":
                        actionBillingAddress();
                        break;
                    case "shippingAddress":
                        actionShippingAddress();
                        break;
                    case "shippingMethod":
                        actionShippingMethod();
                        break;
                    case "paymentMethod":
                        actionPaymentMethod();
                        break;
                    case "customerInfo":
                        actionCustomerAdditionalInfo();
                        break;
                    case "discounts":
                        actionDiscount();
                        break;
                    default:
                        actionDefault();
                }

            };// jshint ignore:line

            $scope.closeSuccessPopup = function () {
                $(".modal").modal("hide");
                $(".modal-open").removeClass('modal-open');
                $location.path("/");
            };

            /**
             * Saves checkout
             */
            $scope.save = function () {
                var payment, isValid, sendPostForm;
                $scope.message = "";
                isValid = function () {
                    var result, message, getErrorMsg;
                    message = "";
                    result = {
                        status: true,
                        message: ""
                    };
                    $scope.subBillingAddress = true;
                    $scope.subShippingAddress = true;
                    $scope.subPaymentForm = true;
                    $scope.subAdditionalInfo = true;

                    getErrorMsg = function (step) {
                        /*jshint maxcomplexity:6 */
                        var msg = "Please fill all required fields";

                        switch (step) {
                            case "billingAddress":
                                msg = "Please fill all required fields in billing section <br />";
                                break;
                            case "shippingAddress":
                                msg = "Please fill all required fields in shipping section <br />";
                                break;
                            case "shippingMethod":
                                msg = "Please choose shipping method <br />";
                                break;
                            case "paymentMethod":
                                msg = "Please choose payment method <br />";
                                break;
                            case "additionalInfo":
                                msg = "Please fill all required fields in additional section <br />";
                                break;
                        }
                        return msg;
                    };

                    for (var step in isValidSteps) {
                        if (isValidSteps.hasOwnProperty(step) && !isValidSteps[step]) {
                            message += getErrorMsg(step);
                            result = {
                                status: false,
                                message: message
                            };
                        }
                    }

                    return result;
                };

                sendPostForm = function (method, response) {
                    var form;

                    form = "<div class='hidden' id='auth_net_form'>" + response.result;
                    form = form.replace("$CC_NUM", method.cc.number);
                    form = form.replace("$CC_MONTH", method.cc["expire_month"].toString().length < 2 ? "0" + method.cc["expire_month"] : method.cc["expire_month"]);
                    form = form.replace("$CC_YEAR", method.cc["expire_year"]) + "</div>";

                    $("body").append(form);
                    $("#auth_net_form").find("form").submit();
                    $("#auth_net_form").remove();
                };

                payment = getPaymentInfo();
                if (payment.form !== null && typeof payment.form !== "undefined") {
                    payment.form.submited = true;
                }
                info().then(function () {
                    var checkoutValid = isValid();
                    if (checkoutValid.status) {
                        $(this).parents('.confirm').css('display', 'none');
                        $('#processing').modal('show');
                        $checkoutApiService.save().$promise.then(
                            function (response) {
                                if (response.error === null && null !== payment.method && payment.method.Type === "remote" && response.result === "redirect") {
                                    window.location.replace(response.redirect);
                                } else if (response.error === null && null !== payment.method && payment.method.Type === "post_cc") {
                                    // Handler for direct post form for Authorize.net
                                    sendPostForm(payment.method, response);
                                } else if (response.error === null) {
                                    info();
                                    $cartService.reload().then(
                                        function () {
                                            $scope.purchase = response.result || {};

                                            // Stash the order in a service so we can access it on the
                                            // success page
                                            $checkoutService.lastOrder = response.result || false;

                                            //TODO: clean this up with angular modals and promises
                                            $('#processing').modal('hide');
                                            $timeout(function(){
                                                $location.path("/checkout/success/"+ $checkoutService.lastOrder._id);
                                            }, 600);
                                        }
                                    );
                                } else {
                                    $(this).parents('.confirm').css('display', 'block');
                                    $('#processing').modal('hide');
                                    // Errors from server
                                    $scope.message = $commonUtilService.getMessage(response);
                                }
                            }
                        );
                    } else {
                        $(this).parents('.confirm').css('display', 'block');
                        $('#processing').modal('hide');
                        $scope.message = $commonUtilService.getMessage(null, "danger", checkoutValid.message);
                    }
                });
            };

            $scope.giftcard = {};
            $scope.giftcard.apply = function() {
                if ($scope.giftcard.code) {
                    $scope.giftcard.searching = true;
                    $giftCardsService.apply($scope.giftcard.code)
                    .then(function(response) {

                        $scope.giftcard.searching = false;
                        if (response.error === null) {
                            info();
                            // $scope.giftcard.message = $commonUtilService.getMessage(null, "warning", "Please enter a gift card code before submitting.");
                        } else {
                            $scope.giftcard.message = $commonUtilService.getMessage(response);
                        }

                    });
                } else {
                    $scope.giftcard.message = $commonUtilService.getMessage(null, "danger", "Gift card code can't be empty");
                }
            };

            $scope.discountApply = function () {
                if ("" === $scope.discount || typeof $scope.discount === "undefined") {
                    $scope.messageDiscounts = $commonUtilService.getMessage(null, "danger", "Discount code can't be empty");
                } else {
                    $checkoutService.discountApply({"coupon" : $scope.discount.toUpperCase()}).then(
                        function (response) {
                            if (response.error === null) {
                                info();
                            } else {
                                $scope.messageDiscounts = $commonUtilService.getMessage(response);
                                $scope.discount = "";
                            }
                        }
                    );
                }
            };

            $scope.discountNeglect = function (code) {
                $checkoutService.discountNeglect({"coupon": code}).then(
                    function (response) {
                        if (response.error === null) {
                            info();
                        }
                    }
                );
            };

            // REFACTOR: this should be a directive
            $scope.validateCcNumber = function () {
                var i, payment, result;
                result = false;

                payment = getPaymentInfo();

                var validateCreditCard = function (s) {
                    /*jshint maxcomplexity:6 */
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

                if (creditCardTypes[payment.method.cc.type][0].test(payment.method.cc.number) === true) {
                    result = validateCreditCard(payment.method.cc.number);
                }

                if (typeof payment.form !== "undefined") {
                    payment.form.number.$invalidFormat = result;
                }

                return result;
            };

        }
    ]
);
