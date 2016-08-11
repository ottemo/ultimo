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
        $scope._isValidSteps = {
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
        $scope.getOptionLabel = commonUtilService.getOptionLabel;

        // Addresses
        $scope.addressSettings = {
            useShippingAsBilling: true
        };
        $scope.defaultAddress = {
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
            code: '',
            isVisible: false,
            message: false,
            isApplying: false,
        };

        /////////////////////

        $scope.activate = function() {
            // Load checkout, and refresh cart
            $scope._info();

            // Load the user
            visitorLoginService.isLoggedIn().then(function(isLoggedIn){
                // Show the first step
                if (isLoggedIn) {
                    $('#shippingAddress .panel-body').show();
                }

                // Guest checkout isn't enabled, and they aren't logged in, bounce 'em
                if (!$scope._isGuestCheckoutEnabled() && !isLoggedIn) {
                    commonUtilService.addFlashMessage('Please log in or register to enter checkout.', 'info');
                    return $location.path('/registration');
                }

                $scope.isGuestCheckout = (isLoggedIn === false);

                // They are logged in, check if we have any addresses on file
                $scope._getAddresses();
            });

           checkoutService.loadSavedCC().then(function( res ){
                if (res !== null){
                    var result = _.uniq(res, 'ID');
                    $scope.paymentMethods = $scope.paymentMethods.concat(result);
                }
            });

            // Load payment methods
            checkoutService.loadPaymentMethods().then(function(methods){

                //merge payment methods and tokens;
                $scope.paymentMethods = methods.concat($scope.paymentMethods);
            });


            $scope.$emit('add-breadcrumbs', {'label': 'Checkout', 'url': '/checkout'});
        };

        /**
         * Gets checkout information, makes sure the cart is up to date
         * @return {promise}
         */
        $scope._info = function() {
            return checkoutService.update().then(function (checkout) {
                $scope.checkout = checkout;
                $scope._initAddressesData();

                return cartService.reload().then(function(){
                    // If they don't have any items in cart redirect to the empty cart page
                    if (cartService.getCountItems() === 0) {
                        return $location.path('/cart');
                    }
                });
            });
        };

        $scope._initAddressesData = function () {
            if ($scope.checkout.shipping_address === null) {
                $scope.checkout.shipping_address = $scope.defaultAddress;
            }

            if ($scope.checkout.billing_address === null) {
                $scope.checkout.billing_address = $scope.defaultAddress;
            }
        };

        $scope._isGuestCheckoutEnabled = function() {
            return angular.appConfig.hasGuestCheckout;
        };

        /**
         * Gets visitor addresses
         */
        $scope._getAddresses = function() {
            return checkoutApiService.getAddresses().$promise
                .then(function (response) {
                    var result = response.result || [];
                    $scope.addresses = result;
                });
        };

        // REFACTOR: we should just be able to use the $scope.paymentMethod.selected object
        $scope._getPaymentInfo = function() {
            var info = {
                'method': null,
                'form': null
            };

            info.method = $scope.paymentMethod.selected;
            info.form = $scope.paymentMethod.selected.form;

            return info;
        };

        $scope.newBilling = function() {
            // Sets a flag of form is not valid
            $scope._isValidSteps.billingAddress = false;
            // Initialise address by default
            $scope.checkout.billing_address = $scope.defaultAddress;
            $scope.addressSettings.useShippingAsBilling = false;

            for (var field in $scope.checkout.billing_address) {
                if ($scope.billingAddress.hasOwnProperty(field)) {
                    $scope.billingAddress[field].$pristine = true;
                    $scope.billingAddress[field].$invalid = false;
                }
            }
        };

        $scope.newShipping = function() {
            // Sets a flag of form is not valid
            $scope._isValidSteps.shippingAddress = false;
            // Initialise address by default
            $scope.checkout.shipping_address = $scope.defaultAddress;

            for (var field in $scope.checkout.shipping_address) {
                if ($scope.shippingAddress.hasOwnProperty(field)) {
                    $scope.shippingAddress[field].$pristine = true;
                    $scope.shippingAddress[field].$invalid = false;
                }
            }
        };

        // REFACTOR: This is currently only used for saved addresses, and probably isn't needed
        $scope.choiceBilling = function(billingId) {
            // TODO: [aknox] these top level conditions can't be right,
            // why would we look at the shippingAddress form validity
            if ($scope.isGuestCheckout && $scope.shippingAddress.$valid) {
                checkoutService.saveBillingAddress($scope.checkout.shipping_address).then(
                    function (response) {
                        if (response.error === null) {
                            $scope._isValidSteps.billingAddress = true;
                        }
                    }
                );
            } else if ($scope.checkout.billing_address !== null && $scope.checkout.billing_address._id !== billingId && typeof billingId === 'string' && billingId !== '') {
                // Sets existing address as billing
                checkoutService.saveBillingAddress({'id': billingId}).then(
                    function (response) {
                        if (response.error === null) {
                            $scope._isValidSteps.billingAddress = true;
                        }
                    }
                );
            } else {
                if ($scope.shippingAddress.$valid) {
                    checkoutService.saveBillingAddress($scope.checkout.shipping_address).then(
                        function (response) {
                            if (response.error === null) {
                                $scope._isValidSteps.billingAddress = true;
                            }
                        }
                    );
                }
            }
        };

        // REFACTOR: This is currently only used for saved addresses, and probably isn't needed
        $scope.choiceShipping = function(shippingId) {
            if ($scope.isGuestCheckout) {
                checkoutService.saveShippingAddress($scope.checkout.shipping_address).then(
                    function (response) {
                        // update checkout
                        $scope._info().then(function () {
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
                        $scope._info().then(function () {
                            // if all ok, must update allowed shipping methods list
                            // and must set billing address if set appropriate checkbox
                            if (response.error === null) {
                                $scope._isValidSteps.shippingAddress = true;
                                checkoutService.loadShippingMethods().then(function (methods) {
                                    $scope.shippingMethods = methods;
                                    $scope.shippingMethod.selected = $scope.shippingMethods[0]; // select first option
                                });
                                // sets billing address
                                if ($scope.addressSettings.useShippingAsBilling) {
                                    $scope.choiceBilling(response.result._id);
                                }
                            } else {
                                $scope._isValidSteps.billingAddress = false;
                            }
                        });
                    }
                );
            }
        };

        $scope._scrollTo = function($step){
            $('html, body').animate({
                scrollTop: $step.offset().top
            }, 100);
        };

        $scope.back = function(step) {
            var $thisStep = $('#' + step);
            var $lastStep = $thisStep.prev('.panel');

            // We can start scrolling to the panel before animations finish because the
            // distance from the top won't change
            $scope._scrollTo($lastStep);
            $thisStep.find('.panel-body').slideUp(500);
            $lastStep.find('.panel-body').slideDown(500);
        };

        $scope.next = function(step) {
            switch (step) {
                case 'billingAddress':
                    $scope._actionBillingAddress(step);
                    break;
                case 'shippingAddress':
                    $scope._actionShippingAddress(step);
                    break;
                case 'shippingMethod':
                    $scope._actionShippingMethod(step);
                    break;
                case 'paymentMethod':
                    $scope._actionPaymentMethod(step);
                    break;
                case 'customerInfo':
                    $scope._actionCustomerAdditionalInfo(step);
                    break;
                default:
                    $scope._actionDefault(step);
            }
        };

        $scope._accordionAnimation = function(step, skipOneStep) {
            var $thisStep = $('#' + step);
            var $nextStep = $thisStep.next('.panel');
            if (skipOneStep) {
                $nextStep = $thisStep.next('.panel').next('.panel');
            }
            $thisStep.find('.panel-body').slideUp(600, function(){
                $scope._scrollTo($nextStep);
            });
            $nextStep.find('.panel-body').slideDown(500);
        };

        $scope._actionBillingAddress = function(step) {
            if ($scope.billingAddress.$valid) {
                $scope._isValidSteps.billingAddress = true;

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
                            $scope._getAddresses(); //TODO: not sure this is necessary

                            // update checkout
                            $scope._info();
                            $scope._accordionAnimation(step);
                        });
                } else {
                    //TODO: Confirm that this is expected
                    $scope._accordionAnimation(step);
                }
            }
        };

        $scope._actionShippingAddress = function(step) {
            if ($scope.shippingAddress.$valid) {
                $scope._isValidSteps.shippingAddress = true;

                //always persist shipping address in case there are shipping notes
                checkoutService.saveShippingAddress($scope.checkout.shipping_address)
                    .then(function () {
                        $scope._getAddresses(); //TODO: not sure this is necessary

                        checkoutService.loadShippingMethods().then(function (methods) {
                            $scope.shippingMethods = methods;

                            // select first option
                            $scope.shippingMethod.selected = $scope.shippingMethods[0];
                        });

                        if ($scope.addressSettings.useShippingAsBilling) {
                            checkoutService.saveBillingAddress($scope.checkout.shipping_address)
                                .then(function (response) {
                                    if (response.error === null) {
                                        $scope._isValidSteps.billingAddress = true;
                                    }
                                    // update checkout
                                    $scope._info();

                                    // skip billing address step
                                    var skipOneStep = true;
                                    $scope._accordionAnimation(step, skipOneStep);
                                });
                        } else {
                            // update checkout
                            $scope._info();

                            // open billing address
                            $scope._accordionAnimation(step);
                        }
                    });
            }
        };

        $scope._actionShippingMethod = function(step) {
            checkoutService.saveShippingMethod({
                'method': $scope.shippingMethod.selected.Method,
                'rate': $scope.shippingMethod.selected.Rate
            }).then(function (response) {
                if (response.result === 'ok') {
                    // update checkout
                    $scope._info();
                    $scope._isValidSteps.shippingMethod = true;
                    $scope._accordionAnimation(step);
                }
            });
        };

        $scope._actionPaymentMethod = function (step) {
            var payment;
            $scope._isValidSteps.paymentMethod = false;

            // Zero dollar, proceed
            if ($scope.checkout.grandtotal <= 0) {
                $scope._isValidSteps.paymentMethod = true;
                $scope._info();
                $scope._accordionAnimation(step);
            }

            if ($scope.paymentMethod.selected) {

                if ($scope.paymentMethod.selected.isCreditCard) {

                    payment = $scope._getPaymentInfo();
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
                                    $scope._isValidSteps.paymentMethod = true;
                                    $scope._info();
                                    $scope._accordionAnimation(step);
                                }
                            });
                    }
                } else if ($scope.paymentMethod.selected.ID){ //if method is saved token

                    // Save off the method name
                    checkoutService.savePaymentMethod({
                        method: $scope.paymentMethod.selected.Desc
                    });

                    // Save off the cc form
                    checkoutService.saveAdditionalInfo({
                        'cc': {
                            'id': $scope.paymentMethod.selected.ID
                        }
                    }).then(function(resp){
                        if (resp.result === 'ok') {
                            // Update the checkout object and proceed
                            $scope._isValidSteps.paymentMethod = true;
                            $scope._info();
                            $scope._accordionAnimation(step);
                        }
                    });

                } else {
                    // not a cc just continue
                    checkoutService.savePaymentMethod({
                        method: $scope.paymentMethod.selected.Code
                    })
                        .then(function(resp){
                            // update the checkout object and proceed
                            if (resp.result === 'ok') {
                                $scope._isValidSteps.paymentMethod = true;
                                $scope._info();
                                $scope._accordionAnimation(step);
                            }
                        });
                }
            }
        };

        $scope._actionCustomerAdditionalInfo = function(step) {
            // isValidSteps isn't used for this step
            if ($scope.isGuestCheckout && $scope.customerInfo.$valid) {
                checkoutService.saveAdditionalInfo({
                    'customer_email': $scope.checkout.info.customer_email,
                    'customer_name': $scope.checkout.info.customer_name
                }).then(function () {
                    $scope._info();
                    $scope._accordionAnimation(step);
                });
            }
        };

        $scope._actionDefault = function(step) {
            if ($scope._isValidSteps[step]) {
                $scope._accordionAnimation(step);
            }
        };

        /**
         * Saves checkout
         */
        $scope.save = function() {
            var payment = $scope._getPaymentInfo();
            $scope.message = '';

            if (payment.form !== null && typeof payment.form !== 'undefined') {
                payment.form.submited = true;
            }

            $scope._info().then(function () {
                var checkoutValid = $scope._isValid();
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
                                    $scope._sendPostForm(payment.method, response);
                                } else {
                                    // All Others; Zero Dollar, PayFlow Pro
                                    $scope._info().then(function() {
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

        $scope._sendPostForm = function(method, response) {
            var form = "<div class='hidden' id='auth_net_form'>" + response.result + '</div>';
            form = form.replace('$CC_NUM', method.cc.number);
            form = form.replace('$CC_MONTH', method.cc.expire_month);
            form = form.replace('$CC_YEAR', method.cc.expire_year);

            $('body').append(form);
            $('#auth_net_form').find('form').submit();
            $('#auth_net_form').remove();
        };

        $scope._isValid = function() {
            var message = '',
                result = {
                status: true,
                message: '',
            };

            for (var step in $scope._isValidSteps) {
                if ($scope._isValidSteps.hasOwnProperty(step) && !$scope._isValidSteps[step]) {
                    message += $scope._getErrorMsg(step);
                    result = {
                        status: false,
                        message: message
                    };
                }
            }

            return result;
        };

        $scope._getErrorMsg = function(step) {
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

        $scope.discounts.apply = function() {
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

            $scope._allResolved(promises).then(function(responses){
                $scope.discounts.isApplying = false;

                var respSuccess = _.filter(responses, {'error': null});
                if (respSuccess.length) {
                    $scope.discounts.code = '';
                    $scope._info();
                } else {
                    $scope.discounts.message = commonUtilService.getMessage(null, 'danger', errorMessage);
                }
            });
        };

        // NOTE: $q.all will reject if one of the promises is bad, so we can't use it here
        // and have instead replicateed $Q.allResolved
        $scope._allResolved = function(promises) {
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
        };
    }
]);
