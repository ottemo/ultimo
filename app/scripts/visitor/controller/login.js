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
            var FORGOT_SUCCESS = "A new password has been created and forwarded to you. Please check your email.";

            $scope.needBirthdayCheck = true;
            $scope.birthday = {
                "day": 0,
                "month": 0,
                "year": 0
            };

            var checkPassword = function () {
                var status;
                if (typeof $scope.login.password === "undefined" ||
                    $scope.login.password.trim() === "") {
                    $scope.message = $commonUtilService.getMessage(null, "warning", "Password can not be blank");
                    $scope.isCoincide = false;
                    status = false;
                } else if ($scope.login.password === $scope.login["confirm_password"]) {
                    $scope.isCoincide = true;
                    status = true;
                } else {
                    $scope.message = $commonUtilService.getMessage(null, "warning", "Passwords don't match");
                    $scope.isCoincide = false;
                    status = false;
                }
                return status;
            };

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
                return $cartService.getCountItems();
            };

            $scope.clickToCartDesktop = function () {
                var miniCart = $('.mini-cart');

                if (angular.appConfigValue("general.checkout.guest_checkout")) {
                    miniCart.modal('toggle');
                } else {
                    $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                        if (isLoggedIn) {
                            miniCart.modal('toggle');
                        } else {
                            $('#form-login').modal('show');
                        }
                    });
                }

            };

            $scope.save = function () {
                $scope.register.submitted = true;
                if ($scope.register.$valid && checkPassword()) {
                    delete $scope.login["billing_address_id"];
                    delete $scope.login["shipping_address_id"];

                    var data = {};
                    for (var field in $scope.login) {
                        if ($scope.login.hasOwnProperty(field) && field !== "confirm_password") {
                            data[field] = $scope.login[field];
                        }
                    }

                    $visitorApiService.register(data).$promise.then(function (response) {
                        if (response.error === null) {
                            $('.modal').modal('hide');

                            $scope.message = $commonUtilService.getMessage(null, "success", "Thanks for registration. Please check your email and confirm your account");
                            for (var field in $scope.register) {
                                if ($scope.register.hasOwnProperty(field) && $scope.register[field]) {
                                    $scope.register[field].$pristine = true;
                                }
                            }
                            $scope.login = {};
                            $scope.register.submitted = false;
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
                    var path = angular.module('visitorModule').back.path.trim('/');
                    if (typeof angular.module('visitorModule').back.path !== "undefined" &&
                        "" !== path &&
                        -1 === ['login', 'login.html', 'home', 'home.html', 'logout', 'logout.html'].indexOf(path)) {

                        $location.$$path = angular.module('visitorModule').back.path;
                        $location.$$url = angular.module('visitorModule').back.path;
                        $location.search(angular.module('visitorModule').back.params);
                    } else {
                        $location.path('/account');
                    }
                }
            };

            $scope.signIn = function (isPopUp) {
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