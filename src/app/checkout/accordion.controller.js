angular.module('checkoutModule')

.controller('checkoutAccordionController', [
    '$scope',
    '$location',
    '$q',
    '$timeout',
    '_',
    'checkoutApiService',
    'visitorLoginService',
    'cartService',
    'commonUtilService',
    'checkoutService',
    'giftCardsService',
    function (
        $scope,
        $location,
        $q,
        $timeout,
        _,
        checkoutApiService,
        visitorLoginService,
        cartService,
        commonUtilService,
        checkoutService,
        giftCardsService
    ) {
        var isValidSteps = {
            'billingAddress': false,
            'shippingAddress': false,
            'shippingMethod': false,
            'paymentMethod': false,
            'discounts': true
        };

        // General
        $scope.checkoutService = checkoutService;
        $scope.cart = cartService;
        $scope.checkout = {};
        $scope.isGuestCheckout = false;

        // Accordion navigation
        $scope.back = back;
        $scope.next = next;

        $scope.save = save;

        // Addresses
        $scope.addressSettings = { 
            useShippingAsBilling: true 
        };
        $scope.newBilling = newBilling;
        $scope.newShipping = newShipping;
        $scope.choiceBilling = choiceBilling;
        $scope.choiceShipping = choiceShipping;

        // Shipping method
        $scope.shippingMethod = {
            selected: false
        };
        $scope.shippingMethods = []; // REFACTOR: nest under shippingMethod as options

        // Billing Method
        $scope.paymentMethod = {
            selected: false
        };
        $scope.paymentMethods = [];    // REFACTOR: nest under paymentMethod as options

        // Discounts and Giftcards
        $scope.discounts = {
            apply: applyDiscount,
            code: '',
            isVisible: false,
            message: false,
            isApplying: false,
        };

        activate();

        /////////////////////

        function activate() {
            // Load checkout, and refresh cart
            info();

            // Load the user
            visitorLoginService.isLoggedIn().then(function(isLoggedIn){
                // Show the first step
                if (isLoggedIn) {
                    $('#shippingAddress .panel-body').show();
                }

                // Guest checkout isn't enabled, and they aren't logged in, bounce 'em
                if (!isGuestCheckoutEnabled() && !isLoggedIn) {
                    commonUtilService.addFlashMessage('Please log in or register to enter checkout.', 'info');
                    return $location.path('/registration');
                }

                $scope.isGuestCheckout = (isLoggedIn === false);

                // They are logged in, check if we have any addresses on file
                getAddresses();
            });


            // Load payment methods
            checkoutService.loadPaymentMethods().then(function(methods){
                $scope.paymentMethods = methods;
            });

            $scope.$emit('add-breadcrumbs', {'label': 'Checkout', 'url': '/checkout'});
        }

        /**
         * Gets checkout information, makes sure the cart is up to date
         * @return {promise}
         */
        function info() {
            return checkoutService.update().then(function (checkout) {
                $scope.checkout = checkout;
                initAddressesData();

                return cartService.reload().then(function(){
                    // If they don't have any items in cart redirect to the empty cart page
                    if (cartService.getCountItems() === 0) {
                        return $location.path('/cart');
                    }
                });
            });

            function initAddressesData() {
                if ($scope.checkout.shipping_address === null) {
                    $scope.checkout.shipping_address = getDefaultAddress();
                }

                if ($scope.checkout.billing_address === null) {
                    $scope.checkout.billing_address = getDefaultAddress();
                }
            }
        }

        function getDefaultAddress() {
            return {
                'street': '',
                'city': '',
                'state': '',
                'phone': '',
                'zip_code': '',
                'company': '',
                'first_name': '',
                'last_name': '',
                'address_line1': '',
                'address_line2': '',
                'country': 'US'
            };
        }

        function isGuestCheckoutEnabled() {
            return angular.appConfig.hasGuestCheckout;
        }

        /**
         * Gets visitor addresses
         */
        function getAddresses() {
            return checkoutApiService.getAddresses().$promise
                .then(function (response) {
                    var result = response.result || [];
                    $scope.addresses = result;
                });
        }

        // REFACTOR: we should just be able to use the $scope.paymentMethod.selected object
        function getPaymentInfo() {
            var info = {
                'method': null,
                'form': null
            };

            info.method = $scope.paymentMethod.selected;
            info.form = $scope.paymentMethod.selected.form;

            return info;
        }

        function newBilling() {
            // Sets a flag of form is not valid
            isValidSteps.billingAddress = false;
            // Initialise address by default
            $scope.checkout.billing_address = getDefaultAddress();
            $scope.addressSettings.useShippingAsBilling = false;

            for (var field in $scope.checkout.billing_address) {
                if ($scope.billingAddress.hasOwnProperty(field)) {
                    $scope.billingAddress[field].$pristine = true;
                    $scope.billingAddress[field].$invalid = false;
                }
            }
        }

        function newShipping() {
            // Sets a flag of form is not valid
            isValidSteps.shippingAddress = false;
            // Initialise address by default
            $scope.checkout.shipping_address = getDefaultAddress();

            for (var field in $scope.checkout.shipping_address) {
                if ($scope.shippingAddress.hasOwnProperty(field)) {
                    $scope.shippingAddress[field].$pristine = true;
                    $scope.shippingAddress[field].$invalid = false;
                }
            }
        }

        // REFACTOR: This is currently only used for saved addresses, and probably isn't needed
        function choiceBilling(billingId) {
            // TODO: [aknox] these top level conditions can't be right,
            // why would we look at the shippingAddress form validity
            if ($scope.isGuestCheckout && $scope.shippingAddress.$valid) {
                checkoutService.saveBillingAddress($scope.checkout.shipping_address).then(
                    function (response) {
                        if (response.error === null) {
                            isValidSteps.billingAddress = true;
                        }
                    }
                );
            } else if ($scope.checkout.billing_address !== null && $scope.checkout.billing_address._id !== billingId && typeof billingId === 'string' && billingId !== '') {
                // Sets existing address as billing
                checkoutService.saveBillingAddress({'id': billingId}).then(
                    function (response) {
                        if (response.error === null) {
                            isValidSteps.billingAddress = true;
                        }
                    }
                );
            } else {
                if ($scope.shippingAddress.$valid) {
                    checkoutService.saveBillingAddress($scope.checkout.shipping_address).then(
                        function (response) {
                            if (response.error === null) {
                                isValidSteps.billingAddress = true;
                            }
                        }
                    );
                }
            }
        }

        // REFACTOR: This is currently only used for saved addresses, and probably isn't needed
        function choiceShipping (shippingId) {
            if ($scope.isGuestCheckout) {
                checkoutService.saveShippingAddress($scope.checkout.shipping_address).then(
                    function (response) {
                        // update checkout
                        info().then(function () {
                            // if all ok, must update allowed shipping methods list
                            // and must set billing address if set appropriate checkbox
                            if (response.error === null) {
                                checkoutService.loadShippingMethods().then(function (methods) {
                                    $scope.shippingMethods = methods;
                                    $scope.shippingMethod.selected = $scope.shippingMethods[0]; // select first option
                                });
                                // sets billing address
                                if ($scope.addressSettings.useShippingAsBilling) {
                                    $scope.choiceBilling(response.result);
                                }
                            }
                        });
                    }
                );
            } else if (($scope.checkout.shipping_address !== null && $scope.checkout.shipping_address._id !== shippingId) || Boolean(shippingId)) {

                // Sets existing address as shipping
                checkoutService.saveShippingAddress({'id': shippingId}).then(
                    function (response) {
                        // update checkout
                        info().then(function () {
                            // if all ok, must update allowed shipping methods list
                            // and must set billing address if set appropriate checkbox
                            if (response.error === null) {
                                isValidSteps.shippingAddress = true;
                                checkoutService.loadShippingMethods().then(function (methods) {
                                    $scope.shippingMethods = methods;
                                    $scope.shippingMethod.selected = $scope.shippingMethods[0]; // select first option
                                });
                                // sets billing address
                                if ($scope.addressSettings.useShippingAsBilling) {
                                    $scope.choiceBilling(response.result._id);
                                }
                            } else {
                                isValidSteps.billingAddress = false;
                            }
                        });
                    }
                );
            }
        }

        var _scrollTo = function($step){
            $('html, body').animate({
                scrollTop: $step.offset().top
            }, 100);
        };

        function back(step) {
            var $thisStep = $('#' + step);
            var $lastStep = $thisStep.prev('.panel');

            // We can start scrolling to the panel before animations finish because the
            // distance from the top won't change
            _scrollTo($lastStep);
            $thisStep.find('.panel-body').slideUp(500);
            $lastStep.find('.panel-body').slideDown(500);
        }

        function next(step) {

            var _accordionAnimation = function(step, skipOneStep) {
                var $thisStep = $('#' + step);
                var $nextStep = $thisStep.next('.panel');
                if (skipOneStep) {
                    $nextStep = $thisStep.next('.panel').next('.panel');
                }
                $thisStep.find('.panel-body').slideUp(600, function(){
                    _scrollTo($nextStep);
                });
                $nextStep.find('.panel-body').slideDown(500);
            };

            var actionBillingAddress = function () {
                if ($scope.billingAddress.$valid) {
                    isValidSteps.billingAddress = true;

                    // REFACTOR: this condition could be worded better
                    if (
                        (
                            !Boolean($scope.checkout.billing_address._id) &&
                            !$scope.isGuestCheckout
                        ) ||
                        $scope.isGuestCheckout
                    ) {
                        checkoutService.saveBillingAddress($scope.checkout.billing_address)
                            .then(function () {
                                getAddresses(); //TODO: not sure this is necessary

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
                if ($scope.shippingAddress.$valid) {
                    isValidSteps.shippingAddress = true;

                    //always persist shipping address in case there are shipping notes
                    checkoutService.saveShippingAddress($scope.checkout.shipping_address)
                        .then(function () {
                            getAddresses(); //TODO: not sure this is necessary

                            checkoutService.loadShippingMethods().then(function (methods) {
                                $scope.shippingMethods = methods;

                                // select first option
                                $scope.shippingMethod.selected = $scope.shippingMethods[0];
                            });

                            if ($scope.addressSettings.useShippingAsBilling) {
                                checkoutService.saveBillingAddress($scope.checkout.shipping_address)
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
                checkoutService.saveShippingMethod({
                    'method': $scope.shippingMethod.selected.Method,
                    'rate': $scope.shippingMethod.selected.Rate
                }).then(function (response) {
                    if (response.result === 'ok') {
                        // update checkout
                        info();
                        isValidSteps.shippingMethod = true;
                        _accordionAnimation(step);
                    }
                });
            };

            var actionPaymentMethod = function () {
                isValidSteps.paymentMethod = false;

                // Zero dollar, proceed
                if ($scope.checkout.grandtotal <= 0) {
                    isValidSteps.paymentMethod = true;
                    info();
                    _accordionAnimation(step);
                }

                if ($scope.paymentMethod.selected) {

                    if ($scope.paymentMethod.selected.isCreditCard) {

                        var payment = getPaymentInfo();
                        payment.method.form.$submitted = true;

                        if (payment.method.form.$valid) {
                            // Save off the method name
                            checkoutService.savePaymentMethod({
                                method: $scope.paymentMethod.selected.Code
                            });

                            // Save off the cc form
                            checkoutService.saveAdditionalInfo({'cc': payment.method.cc})
                                .then(function(resp){
                                    if (resp.result === 'ok') {
                                        // Update the checkout object and proceed
                                        isValidSteps.paymentMethod = true;
                                        info();
                                        _accordionAnimation(step);
                                    }
                                });
                        }
                    } else {
                        // not a cc just continue
                        checkoutService.savePaymentMethod({
                            method: $scope.paymentMethod.selected.Code
                        })
                        .then(function(resp){
                            // update the checkout object and proceed
                            if (resp.result === 'ok') {
                                isValidSteps.paymentMethod = true;
                                info();
                                _accordionAnimation(step);
                            }
                        });
                    }
                }
            };

            var actionCustomerAdditionalInfo = function () {
                // isValidSteps isn't used for this step
                if ($scope.isGuestCheckout && $scope.customerInfo.$valid) {
                    checkoutService.saveAdditionalInfo({
                        'customer_email': $scope.checkout.info.customer_email,
                        'customer_name': $scope.checkout.info.customer_name
                    }).then(function () {
                        info();
                        _accordionAnimation(step);
                    });
                }
            };

            var actionDefault = function () {
                if (isValidSteps[step]) {
                    _accordionAnimation(step);
                }
            };

            switch (step) {
                case 'billingAddress':
                    actionBillingAddress();
                    break;
                case 'shippingAddress':
                    actionShippingAddress();
                    break;
                case 'shippingMethod':
                    actionShippingMethod();
                    break;
                case 'paymentMethod':
                    actionPaymentMethod();
                    break;
                case 'customerInfo':
                    actionCustomerAdditionalInfo();
                    break;
                default:
                    actionDefault();
            }

        }// jshint ignore:line

        /**
         * Saves checkout
         */
        function save() {
            var payment, isValid, sendPostForm;
            $scope.message = '';
            isValid = function () {
                var result, message, getErrorMsg;
                message = '';
                result = {
                    status: true,
                    message: '',
                };

                getErrorMsg = function (step) {
                    /*jshint maxcomplexity:6 */
                    var msg = 'Please fill all required fields';

                    switch (step) {
                        case 'billingAddress':
                            msg = 'Please fill all required fields in billing section <br />';
                            break;
                        case 'shippingAddress':
                            msg = 'Please fill all required fields in shipping section <br />';
                            break;
                        case 'shippingMethod':
                            msg = 'Please choose shipping method <br />';
                            break;
                        case 'paymentMethod':
                            msg = 'Please choose payment method <br />';
                            break;
                        case 'additionalInfo':
                            msg = 'Please fill all required fields in additional section <br />';
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

                form = "<div class='hidden' id='auth_net_form'>" + response.result + '</div>';
                form = form.replace('$CC_NUM', method.cc.number);
                form = form.replace('$CC_MONTH', method.cc.expire_month);
                form = form.replace('$CC_YEAR', method.cc.expire_year);

                $('body').append(form);
                $('#auth_net_form').find('form').submit();
                $('#auth_net_form').remove();
            };

            payment = getPaymentInfo();
            if (payment.form !== null && typeof payment.form !== 'undefined') {
                payment.form.submited = true;
            }
            info().then(function () {
                var checkoutValid = isValid();
                if (checkoutValid.status) {
                    $(this).parents('.confirm').css('display', 'none');
                    $('#processing').modal('show');

                    checkoutApiService.save().$promise
                        .then(function(response) {
                            if (response.error === null) {

                                var isRemote = (null !== payment.method && payment.method.Type === 'remote' && response.result === 'redirect');
                                var isPostCC = (null !== payment.method && payment.method.Type === 'post_cc');

                                if (isRemote) {
                                    // PayPal Express
                                    window.location.replace(response.redirect);
                                } else if (isPostCC) {
                                    // Auth.net
                                    sendPostForm(payment.method, response);
                                } else {
                                    // All Others; Zero Dollar, PayFlow Pro
                                    info().then(function() {
                                            var purchase = response.result || {};

                                            //TODO: clean this up with angular modals and promises
                                            $('#processing').modal('hide');
                                            $timeout(function() {
                                                $location.path('/checkout/success/' + purchase._id);
                                            }, 600);
                                        });
                                }
                            } else {
                                // Errors from server
                                $(this).parents('.confirm').css('display', 'block');
                                $('#processing').modal('hide');
                                $scope.message = commonUtilService.getMessage(response);
                            }
                        });



                } else {
                    $(this).parents('.confirm').css('display', 'block');
                    $('#processing').modal('hide');
                    $scope.message = commonUtilService.getMessage(null, 'danger', checkoutValid.message);
                }
            });
        }

        function applyDiscount() {
            var errorMessage = 'The coupon code or giftcard code entered is not valid at this time.';
            var validationMessage = 'Please enter a coupon code or a giftcard code.';
            var code = $scope.discounts.code;
            var promises = [];

            // Clear old messaging
            $scope.discounts.message = false;

            if (!code) {
                $scope.discounts.message = commonUtilService.getMessage(null, 'danger', validationMessage);
                return;
            }

            // Prevent double submission
            if ($scope.discounts.isApplying) {
                return;
            }
            $scope.discounts.isApplying = true;

            // Apply this as a giftcard and a coupon
            promises.push(giftCardsService.apply(code));
            promises.push(checkoutService.discountApply({'code' :code}));

            allResolved(promises).then(function(responses){
                $scope.discounts.isApplying = false;

                var respSuccess = _.filter(responses, {'error': null});
                if (respSuccess.length) {
                    $scope.discounts.code = '';
                    info();
                } else {
                    $scope.discounts.message = commonUtilService.getMessage(null, 'danger', errorMessage);
                }
            });

            // NOTE: $q.all will reject if one of the promises is bad, so we can't use it here
            // and have instead replicateed $Q.allResolved
            function allResolved(promises) {
                var deferred = $q.defer(),
                    counter = 0,
                    results = [];

                angular.forEach(promises, function(promise, key) {
                    counter++;
                    $q.when(promise).then(function(value) {
                        if (results.hasOwnProperty(key)) {
                            return;
                        }
                        results[key] = value;
                        if (!(--counter)) {
                            deferred.resolve(results);
                        }
                    }, function(reason) {
                        if (results.hasOwnProperty(key)) {
                            return;
                        }
                        results[key] = reason.data;
                        if (!(--counter)) {
                            deferred.resolve(results);
                        }
                    });
                });

                if (counter === 0) {
                    deferred.resolve(results);
                }

                return deferred.promise;
            }
        }
    }
]);
