(function (define, $) {
    'use strict';

    define(['visitor/init', 'visitor/service/google'], function (loginModule, gl) {
        loginModule.controller('visitorLoginController', [
            '$scope',
            '$route',
            '$routeParams',
            '$visitorApiService',
            '$visitorLoginService',
            '$location',
            '$cartService',
            '$commonHeaderService',
            '$commonSidebarService',
            function ($scope, $route, $routeParams, $visitorApiService, $visitorLoginService, $location, $cartService, $commonHeaderService, $commonSidebarService) {
                $scope.login = $visitorLoginService.getVisitor();
                $scope.loginCredentials = {};
                var verifyCode = $routeParams["validate"];

                var VALIDATION_SUCCESS = "<b>Congratulations!</b><br /> You have finished registration and can now enter the site.";
                var INVALIDATE_SUCCESS = "We sent you new activation code. Please check your email and click on the verification link.";
                var FORGOT_SUCCESS = "A new password has been created and forwarded to you. Please check your email.";


                var checkPassword = function () {
                    var status;
                    if (typeof $scope.login.password === "undefined" ||
                        $scope.login.password.trim() === "") {
                        $scope.message = {
                            "type": "warning",
                            "message": "Password can not be blank"
                        };
                        $scope.isCoincide = false;
                        status = false;
                    } else if ($scope.login.password === $scope.login["confirm_password"]) {
                        $scope.isCoincide = true;
                        status = true;
                    } else {
                        $scope.message = {
                            "type": "warning",
                            "message": "Passwords don't match"
                        };
                        $scope.isCoincide = false;
                        status = false;
                    }
                    return status;
                };

                $scope.init = function () {
                    if (typeof verifyCode !== "undefined") {
                        $visitorApiService.validate({"key": verifyCode}).$promise.then(function (response) {
                            if (response.error === "") {
                                $scope.messageValidaion = {
                                    "type": "success",
                                    "message": VALIDATION_SUCCESS
                                };
                            } else {
                                $scope.messageValidaion = {
                                    "type": "danger",
                                    "message": response.error
                                };
                            }
                        });

                    }
                };

                $scope.sendForgotEmail = function () {
                    $scope.forgotForm.submitted = true;
                    if ($scope.forgotForm.$valid) {
                        $visitorApiService.forgotPassword({"email": $scope.forgotCredentials.email}).$promise.then(function (response) {
                            if (response.result === 'ok') {
                                $scope.messageValidaion = {
                                    "type": "success",
                                    "message": FORGOT_SUCCESS
                                };
                            } else {
                                $scope.messageValidaion = {
                                    "type": "warning",
                                    "message": response.error
                                };
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
                                $scope.messageValidaion = {
                                    "type": "success",
                                    "message": INVALIDATE_SUCCESS
                                };
                            } else {
                                $scope.messageValidaion = {
                                    "type": "warning",
                                    "message": response.error
                                };
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
                    var miniCart;
                    miniCart = $('.mini-cart');
                    $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                        if (isLoggedIn) {
                            miniCart.modal('toggle');
                        } else {
                            $('#form-login').modal('show');
                        }
                    });

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
                            if (response.error === "") {
                                $('.modal').modal('hide');

                                $scope.message = {
                                    "type": "success",
                                    "message": "Thanks for registration. Please check your email and confirm your account"
                                };
                                for (var field in $scope.register) {
                                    if ($scope.register.hasOwnProperty(field)) {
                                        $scope.register[field].$pristine = true;
                                    }
                                }
                                $scope.login = {};
                                $scope.register.submitted = false;
                            } else {
                                $scope.message = {
                                    "type": "warning",
                                    "message": response.error
                                };
                                $scope.register.submitted = false;
                            }
                        });

                    }
                };

                var singInSuccess = function (isPopUp) {
                    if (isPopUp) {
                        $route.reload();
                    } else {
                        $location.path('/account');
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

                                        // Update right menu
                                        $commonHeaderService.removeItem('right', '/login');
                                        $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                        $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                        // Update sidebar
                                        $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

                                        singInSuccess(isPopUp);
                                    }
                                );
                            } else {
                                $scope.message = {
                                    "type": "warning",
                                    "message": response.error
                                };
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

                                                // Update right menu
                                                $commonHeaderService.removeItem('right', '/login');
                                                $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                                $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                                // Update sidebar
                                                $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

                                                singInSuccess(isPopUp);
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

                                    // Update right menu
                                    $commonHeaderService.removeItem('right', '/login');
                                    $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                    $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                    // Update sidebar
                                    $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

                                    singInSuccess();
                                }
                            );
                        }
                    );
                };
            }
        ]);
        return loginModule;
    });
})(window.define, jQuery);
