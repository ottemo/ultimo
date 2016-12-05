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
    'giftcardsApiService',
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
        giftcardsApiService
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
        $scope.getOptionLabel = commonUtilService.getOptionLabel;

        // Accordion navigation
        $scope.back = back;
        $scope.next = next;

        $scope.save = save;

        // Addresses
        $scope.addressSettings = {
            useShippingAsBilling: true
        };
        $scope.getEmptyAddress = getEmptyAddress;
        $scope.modalAddress = {};
        $scope.checkoutVisitorProps = null;

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
            remove: removeDiscount,
            code: '',
            isVisible: false,
            message: false,
            isApplying: false,
        };
        $scope.canRemoveDiscount = canRemoveDiscount;

        activate();

        /////////////////////

        function activate() {
            // Load checkout, and refresh cart
            var checkoutPromise = info();

            // Load the user
            var isLoggedInPromise = visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
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

                return isLoggedIn;
            });

            $q.all([isLoggedInPromise, checkoutPromise]).then(function(responses) {
                var isLoggedIn = responses[0];
                if (isLoggedIn) {
                    $scope.shippingAddressManager.init($scope.checkout.shipping_address);
                }
            });

            checkoutService.loadSavedCC().then(function (res) {
                if (res !== null) {
                    var result = _.uniq(res, 'ID');
                    $scope.paymentMethods = $scope.paymentMethods.concat(result);
                }
            });

            // Load payment methods
            checkoutService.loadPaymentMethods().then(function (methods) {

                //merge payment methods and tokens;
                $scope.paymentMethods = methods.concat($scope.paymentMethods);
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

                return cartService.reload().then(function () {
                    // If they don't have any items in cart redirect to the empty cart page
                    if (cartService.getCountItems() === 0) {
                        return $location.path('/cart');
                    }
                });
            });
        }

        function getEmptyAddress() {
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

        var _scrollTo = function ($step) {
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

            var _accordionAnimation = function (step, skipOneStep) {
                var $thisStep = $('#' + step);
                var $nextStep = $thisStep.next('.panel');
                if (skipOneStep) {
                    $nextStep = $thisStep.next('.panel').next('.panel');
                }
                $thisStep.find('.panel-body').slideUp(600, function () {
                    _scrollTo($nextStep);
                });
                $nextStep.find('.panel-body').slideDown(500);
            };

            var actionBillingAddress = function () {
                $scope.billingAddressManager.submit().then(function (address) {
                    isValidSteps.billingAddress = true;
                    $scope.checkout.billing_address = address;
                    checkoutService.saveBillingAddress($scope.checkout.billing_address)
                        .then(function () {
                            // update checkout
                            info();
                            _accordionAnimation(step);
                        });
                });
            }


        var actionShippingAddress = function () {
            $scope.shippingAddressManager.submit().then(function (address) {
                isValidSteps.shippingAddress = true;

                if ($scope.checkout.shipping_address) {
                    $scope.checkout.shipping_address = angular.extend($scope.checkout.shipping_address, address);
                } else {
                    $scope.checkout.shipping_address = address;
                }

                checkoutService.saveShippingAddress($scope.checkout.shipping_address)
                    .then(function () {
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
                                    info();

                                    // skip billing address step
                                    var skipOneStep = true;
                                    _accordionAnimation(step, skipOneStep);
                                });
                        } else {
                            $scope.billingAddressManager.init($scope.checkout.billing_address);
                            // update checkout
                            info();

                            // open billing address
                            _accordionAnimation(step);
                        }
                    });
            });
        };

        var actionShippingMethod = function () {
            checkoutService.saveShippingMethod({
                'method': $scope.shippingMethod.selected.Method,
                'rate': $scope.shippingMethod.selected.Rate
            }).then(function (response) {
                if (response.result === 'ok') {
                    // update checkout
                    info();
                    $scope.shippingAddressManager.init($scope.checkout.shipping_address);
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
                            .then(function (resp) {
                                if (resp.result === 'ok') {
                                    // Update the checkout object and proceed
                                    isValidSteps.paymentMethod = true;
                                    info();
                                    _accordionAnimation(step);
                                }
                            });
                    }
                } else if ($scope.paymentMethod.selected.ID) { //if method is saved token
                    var payment = getPaymentInfo();

                    // Save off the method name
                    checkoutService.savePaymentMethod({
                        method: $scope.paymentMethod.selected.Desc
                    });

                    // Save off the cc form
                    checkoutService.saveAdditionalInfo({
                        'cc': {
                            'id': $scope.paymentMethod.selected.ID
                        }
                    }).then(function (resp) {
                        if (resp.result === 'ok') {
                            // Update the checkout object and proceed
                            isValidSteps.paymentMethod = true;
                            info();
                            _accordionAnimation(step);
                        }
                    });

                } else {
                    // not a cc just continue
                    checkoutService.savePaymentMethod({
                        method: $scope.paymentMethod.selected.Code
                    })
                        .then(function (resp) {
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
    }

        // jshint ignore:line

        /**
         * Saves checkout
         */
        function save() {
            $scope.isProcessingOrder = true;
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
                                    $scope.isProcessingOrder = false;
                                } else if (isPostCC) {
                                    // Auth.net
                                    sendPostForm(payment.method, response);
                                    $scope.isProcessingOrder = false;
                                } else {
                                    // All Others; Zero Dollar, PayFlow Pro
                                    info().then(function() {
                                            var purchase = response.result || {};

                                            //TODO: clean this up with angular modals and promises
                                            $('#processing').modal('hide');
                                            $timeout(function() {
                                                $scope.isProcessingOrder = false;
                                                $location.path('/checkout/success/' + purchase._id);
                                            }, 600);
                                        });
                                }
                            } else {
                                // Errors from server
                                $(this).parents('.confirm').css('display', 'block');
                                $('#processing').modal('hide');
                                $scope.message = commonUtilService.getMessage(response);
                                $scope.isProcessingOrder = false;
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
            promises.push(giftcardsApiService.apply({'giftcode': code}));
            promises.push(checkoutService.discountApply({'code': code}));

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

        function canRemoveDiscount(discount) {
            if (!discount || !discount.Labels || !discount.Labels[0]) return false;

            var removableDiscountTypes = {
                'D': true,
                'GC': true
            };

            return discount.Labels[0] in removableDiscountTypes;
        }

        function removeDiscount(discount){
            if (!discount.Labels || !discount.Labels[0]) return;
            var discountType = discount.Labels[0];

            var errorMessage = 'Removing of coupon code or giftcard code is not avalable at this time.';
            var giftcardMessage = 'Your giftcard was removed successfully!';
            var couponMessage = 'Your coupon code was removed successfully!';

            switch(discountType) {
                // type Discount
                case 'D':
                    checkoutApiService.removeDiscount({'code': discount.Code}).$promise
                        .then(function(response) {
                            if (response.error === null) {

                                info();
                                $scope.discounts.code = '';
                                $scope.discounts.message = commonUtilService.getMessage(null, 'success', couponMessage);

                            } else {
                                $scope.discounts.message = commonUtilService.getMessage(null, 'danger', errorMessage);
                            }
                        });
                    break;

                // type gift-card
                case 'GC':
                    giftcardsApiService.remove({'giftcode': discount.Code}).$promise
                        .then(function(response) {
                            if (response.error === null) {

                                info();
                                $scope.discounts.code = '';
                                $scope.discounts.message = commonUtilService.getMessage(null, 'success', giftcardMessage);

                            } else {
                                $scope.discounts.message = commonUtilService.getMessage(null, 'danger', errorMessage);
                            }
                        });
                    break;
            }
        }
    }
]);
