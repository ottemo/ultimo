//REFACTOR: This controller is bound to multiple routes and components, be careful
angular.module("visitorModule")
    .controller('visitorLoginController', [
        '$scope',
        '$route',
        '$routeParams',
        '$anchorScroll',
        '$visitorApiService',
        '$visitorLoginService',
        '$location',
        '$cartService',
        '$commonUtilService',
        function ($scope, $route, $routeParams, $anchorScroll, $visitorApiService, $visitorLoginService, $location, $cartService, $commonUtilService) {
            $scope.login = $visitorLoginService.getVisitor();
            $scope.loginCredentials = {};
            var verifyCode = $routeParams["validate"];

            var VALIDATION_SUCCESS = "<b>Congratulations!</b><br /> You have finished registration and can now enter the site.";
            var INVALIDATE_SUCCESS = "We sent you new activation code. Please check your email and click on the verification link.";
            var FORGOT_SUCCESS = "If this email address exists in our system we'll send you instructions on resetting your password.";

            $scope.needBirthdayCheck = true;
            $scope.birthday = {
                "day": 0,
                "month": 0,
                "year": 0
            };

            activate();

            //////////////////////////////////////////////

            function activate() {
                // Redirect if you are already logged in
                // $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                //     if (isLoggedIn) {
                //         $location.path("/");
                //     }
                // });
            }

            $scope.init = function () {
                if (typeof verifyCode !== "undefined") {
                    $visitorApiService.validate({"key": verifyCode}).$promise.then(function (response) {
                        if (response.error === null) {
                            $scope.messageValidaion = $commonUtilService.getMessage(null, "success", VALIDATION_SUCCESS);
                        } else {
                            $scope.messageValidaion = $commonUtilService.getMessage(response);
                        }
                    });

                }
            };

            $scope.sendForgotEmail = function () {
                // REFACTOR: use $submitted
                $scope.forgotForm.submitted = true;
                if ($scope.forgotForm.$valid) {
                    $visitorApiService.forgotPassword({"email": $scope.forgotCredentials.email}).$promise.then(function (response) {
                        if (response.result === 'ok') {
                            $scope.messageValidaion = $commonUtilService.getMessage(null, "success", FORGOT_SUCCESS);
                        } else {
                            $scope.messageValidaion = $commonUtilService.getMessage(response);
                        }
                        $('.modal').modal('hide');
                    });
                    $scope.forgotForm.submitted = false;
                }
            };

            $scope.sendInvalidateEmail = function () {
                // REFACTOR: use $submitted
                $scope.invalidateForm.submitted = true;
                if ($scope.invalidateForm.$valid) {
                    $visitorApiService.invalidate({"email": $scope.invalidateCredentials.email}).$promise.then(function (response) {
                        if (response.result === 'ok') {
                            $scope.messageValidaion = $commonUtilService.getMessage(null, "success", INVALIDATE_SUCCESS);
                        } else {
                            $scope.messageValidaion = $commonUtilService.getMessage(response);
                        }
                        $('.modal').modal('hide');
                    });
                    $scope.invalidateForm.submitted = false;
                }
            };

            $scope.getItemsInCart = function () {
                return $cartService.getTotalQuantity();
            };

            $scope.save = function () {
                // REFACTOR: use $submitted
                $scope.register.submitted = true;
                if ($scope.register.$valid) {
                    delete $scope.login["billing_address_id"];
                    delete $scope.login["shipping_address_id"];

                    var data = {};
                    var blackListedFields = ['confirm_password', 'billing_address', 'shipping_address'];
                    for (var field in $scope.login) {
                        var isFieldBlackListed = blackListedFields.indexOf(field) !== -1;
                        if ($scope.login.hasOwnProperty(field) && false == isFieldBlackListed) {
                            data[field] = $scope.login[field];
                        }
                    }

                    $visitorApiService.register(data).$promise.then(function (response) {
                        if (response.error === null) {
                            $('.modal').modal('hide');

                            $scope.message = $commonUtilService.getMessage(null, "success", "Thanks for registration. Please check your email and confirm your account");
                            $scope.register.$setPristine();
                            $scope.login = {};
                            $scope.register.submitted = false;

                            // After registration, we are expecting the customer
                            // to be logged in, so we
                            // 1. verify is logged in
                            // 1. refresh cart
                            // 1. fire off success action, redirects
                            $visitorLoginService.isLoggedIn(true).then(function(){
                                $cartService.reload();
                                signInSuccess(false);
                            });
                        } else {
                            $scope.message = $commonUtilService.getMessage(response);
                            $scope.register.submitted = false;
                        }
                    });
                }
            };

            var signInSuccess = function (isPopUp) {
                if (isPopUp) {
                    $route.reload();
                } else {
                    var path = angular.module('visitorModule').back.path || '/account';
                    $location.path( path );
                }
            };

            $scope.signIn = function (isPopUp) {
                // REFACTOR: use $submitted
                $scope.loginForm.submitted = true;
                if ($scope.loginForm.$valid) {
                    $visitorApiService.login($scope.loginCredentials).$promise.then(function (response) {
                        if (response.result === 'ok') {
                            $visitorLoginService.isLoggedIn(true).then(
                                function () {
                                    $('.modal').modal('hide');
                                    $cartService.reload();

                                    signInSuccess(isPopUp);
                                }
                            );
                        } else {
                            $scope.message = $commonUtilService.getMessage(response);
                        }
                    });
                    $scope.loginForm.submitted = false;
                }
            };

            $scope.facebookLogin = function (isPopUp) {
                FB.login(                                               // jshint ignore:line
                    function (response) {
                        if (typeof response.authResponse !== "undefined") {
                            $visitorApiService.loginFacebook({
                                'user_id': response.authResponse.userID,
                                'access_token': response.authResponse.accessToken
                            }).$promise.then(
                                function () {
                                    $visitorLoginService.isLoggedIn(true).then(
                                        function () {
                                            $('.modal').modal('hide');
                                            $cartService.reload();

                                            signInSuccess(isPopUp);
                                        }
                                    );
                                }
                            );
                        }
                    },
                    {scope: 'email'}
                );
            };

            $scope.googleLogin = function () {
                gl.login();
            };

            $scope.loginCallback = window.loginCallback = function (response) {
                var data = gl.loginCallback(response);
                $visitorApiService.loginGoolge(data).$promise.then(
                    function () {
                        $visitorLoginService.isLoggedIn(true).then(
                            function () {
                                $('.modal').modal('hide');
                                $cartService.reload();

                                signInSuccess();
                            }
                        );
                    }
                );
            };
        }
    ]);
