//REFACTOR: This controller is bound to multiple routes and components, be careful
angular.module("visitorModule")
    .controller('visitorLoginController', [
        '$scope',
        '$route',
        '$routeParams',
        '$anchorScroll',
        '$window',
        'visitorApiService',
        'visitorLoginService',
        '$location',
        'cartService',
        'commonUtilService',
        function (
            $scope,
            $route,
            $routeParams,
            $anchorScroll,
            $window,
            visitorApiService,
            visitorLoginService,
            $location,
            cartService,
            commonUtilService
        ) {
            $scope.loginCredentials = {};
            $scope._verifyCode = $routeParams["validate"];

            $scope._VALIDATION_SUCCESS = "<b>Congratulations!</b><br /> You have finished registration and can now enter the site.";
            $scope._INVALIDATE_SUCCESS = "We sent you new activation code. Please check your email and click on the verification link.";
            $scope._FORGOT_SUCCESS = "If this email address exists in our system we'll send you instructions on resetting your password.";

            $scope.needBirthdayCheck = true;
            $scope.birthday = {
                "day": 0,
                "month": 0,
                "year": 0
            };

            //////////////////////////////////////////////

            $scope.activate = function() {
                $scope.login = visitorLoginService.getVisitor();

            };

            $scope.init = function () {
                if (typeof $scope._verifyCode !== "undefined") {
                    visitorApiService.validate({"key": $scope._verifyCode}).$promise.then(function (response) {
                        if (response.error === null) {
                            $scope.messageValidation = commonUtilService.getMessage(null, "success", $scope._VALIDATION_SUCCESS);
                        } else {
                            $scope.messageValidation = commonUtilService.getMessage(response);
                        }
                    });
                }
            };

            // Forgot password email
            $scope.sendForgotEmail = function () {
                visitorApiService.forgotPassword({"email": $scope.forgotCredentials.email}).$promise.then(function (response) {
                    if (response.result === 'ok') {
                        $scope.messageValidation = commonUtilService.getMessage(null, "success", $scope._FORGOT_SUCCESS);
                    } else {
                        $scope.messageValidation = commonUtilService.getMessage(response);
                    }
                });
            };

            // Resend activation email
            $scope.sendInvalidateEmail = function () {
                visitorApiService.invalidate({"email": $scope.invalidateCredentials.email}).$promise.then(function (response) {
                    if (response.result === 'ok') {
                        $scope.messageValidation = commonUtilService.getMessage(null, "success", $scope._INVALIDATE_SUCCESS);
                    } else {
                        $scope.messageValidation = commonUtilService.getMessage(response);
                    }
                });
            };

            // Registration
            $scope.save = function () {

                delete $scope.login["billing_address_id"];
                delete $scope.login["shipping_address_id"];

                var data = {};
                var blackListedFields = ['confirm_password', 'billing_address', 'shipping_address'];
                for (var field in $scope.login) {
                    var isFieldBlackListed = blackListedFields.indexOf(field) !== -1;
                    if ($scope.login.hasOwnProperty(field) && false === isFieldBlackListed) {
                        data[field] = $scope.login[field];
                    }
                }

                visitorApiService.register(data).$promise.then(function (response) {
                    if (response.error === null) {
                        $('.modal').modal('hide');

                        $scope.message = commonUtilService.getMessage(null, "success", "Thanks for registration. Please check your email and confirm your account");

                        // After registration, we are expecting the customer
                        // to be logged in, so we
                        // 1. verify is logged in
                        // 1. refresh cart
                        // 1. fire off success action, redirects
                        visitorLoginService.isLoggedIn(true).then(function(){
                            cartService.reload();
                            $scope._signInSuccess(false);
                        });
                    } else {
                        $scope.message = commonUtilService.getMessage(response);
                    }
                });
            };

            $scope._signInSuccess = function (isPopUp) {
                if (isPopUp) {
                    $route.reload();
                } else {
                    var path = angular.module('visitorModule').back.path || '/account';
                    $location.path( path );
                }
            };

            // Login page
            $scope.signIn = function () {
                visitorApiService.login($scope.loginCredentials).$promise
                    .then(function (response) {
                        if (response.result === 'ok') {
                            visitorLoginService.isLoggedIn(true)
                                .then(function () {
                                    $('.modal').modal('hide');
                                    cartService.reload();
                                    $scope._signInSuccess();
                                });
                        } else {
                            $scope.message = commonUtilService.getMessage(response);
                        }
                    });
            };

            $scope.facebookLogin = function(isPopUp) {

                $window.FB.login( fbLoginCallback, { scope: 'email' });

                function fbLoginCallback(response) {
                    if (typeof response.authResponse === "undefined") {
                        return;
                    }

                    var authData = {
                        'user_id': response.authResponse.userID,
                        'access_token': response.authResponse.accessToken
                    };

                    visitorApiService.loginFacebook(authData).$promise.then(function() {
                        visitorLoginService.isLoggedIn(true)
                            .then(function() {
                                //REFACTOR jquery
                                $('.modal').modal('hide');
                                cartService.reload();
                                $scope._signInSuccess(isPopUp);
                            });
                    });
                }
            };

            $scope.googleLogin = function () {
                $window.gl.login();
            };

            $scope.loginCallback = window.loginCallback = function (response) {
                var data = $window.gl.loginCallback(response);
                visitorApiService.loginGoolge(data).$promise.then(
                    function () {
                        visitorLoginService.isLoggedIn(true).then(
                            function () {
                                $('.modal').modal('hide');
                                cartService.reload();

                                $scope._signInSuccess();
                            }
                        );
                    }
                );
            };
        }
    ]);
