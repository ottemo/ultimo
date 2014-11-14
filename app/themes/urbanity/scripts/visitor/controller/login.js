(function (define) {
    "use strict";

    define([
            "angular",
            "visitor/service/facebook",
            "visitor/service/google"
        ],
        function (angular, fb, gl) {

            angular.module.visitorModule.controller('visitorLoginControllerUrb', [
                '$scope',
                '$controller',
                '$routeParams',
                '$visitorApiService',
                '$visitorLoginService',
                '$location',
                '$cartService',
                '$commonHeaderService',
                '$commonSidebarService',
                function ($scope, $controller, $routeParams, $visitorApiService, $visitorLoginService, $location, $cartService, $commonHeaderService, $commonSidebarService) {
                    $controller('visitorLoginController', {$scope: $scope});

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

                    $scope.clickToCartDesktop = function () {
                        var miniCart;
                        miniCart = $('.mini-cart');
                        $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                            if (isLoggedIn) {
                                if (miniCart.css('display') === 'none') {
                                    miniCart.css('display', 'table');
                                } else {
                                    miniCart.hide();
                                }
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
                            delete $scope.login["confirm_password"];
                            $scope.register["confirm_password"].$pristine = true;
                            $visitorApiService.register($scope.login).$promise.then(function (response) {
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

                    $scope.signIn = function () {

                        $scope.loginForm.submitted = true;
                        if ($scope.loginForm.$valid) {
                            $visitorApiService.login($scope.loginCredentials).$promise.then(function (response) {
                                if (response.result === 'ok') {
                                    $visitorLoginService.isLoggedIn(true).then(
                                        function () {
                                            $(".modal").trigger('click');
                                            $cartService.reload();

                                            // Update right menu
                                            $commonHeaderService.removeItem('right', '/login');
                                            $commonHeaderService.removeItem('right', '/registration');
                                            $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                            $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                            // Update sidebar
//                                                $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

                                            $location.path('/account');
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

                    $scope.facebookLogin = function () {
                        FB.login(                                               // jshint ignore:line
                            function (response) {
                                $visitorApiService.loginFacebook({
                                    'user_id': response.authResponse.userID,
                                    'access_token': response.authResponse.accessToken
                                }).$promise.then(
                                    function () {
                                        $visitorLoginService.isLoggedIn(true).then(
                                            function () {
                                                $(".modal").trigger('click');
                                                $cartService.reload();

                                                // Update right menu
                                                $commonHeaderService.removeItem('right', '/login');
                                                $commonHeaderService.removeItem('right', '/registration');
                                                $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                                $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                                // Update sidebar
                                                $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

                                                $location.path('/account');
                                            }
                                        );
                                    }
                                );
                            },
                            {scope: 'email'}
                        );
                    };

                    $scope.loginCallback = window.loginCallback = function (response) {
                        var data = gl.loginCallback(response);
                        $visitorApiService.loginGoolge(data).$promise.then(
                            function () {
                                $visitorLoginService.isLoggedIn(true).then(
                                    function () {
                                        $(".modal").trigger('click');
                                        $cartService.reload();

                                        // Update right menu
                                        $commonHeaderService.removeItem('right', '/login');
                                        $commonHeaderService.removeItem('right', '/registration');
                                        $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                        $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                        // Update sidebar
                                        $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

                                        $location.path('/account', false);
                                    }
                                );
                            }
                        );
                    };

                }
            ]);

            return angular.module.visitorModule;
        }
    );
})(window.define);