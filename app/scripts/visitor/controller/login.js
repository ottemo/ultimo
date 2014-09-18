(function (define, $) {
    'use strict';

    define(['visitor/init', 'visitor/service/google'], function (loginModule, gl) {
        loginModule.controller('visitorLoginController', [
            '$scope',
            '$routeParams',
            '$visitorApiService',
            '$visitorLoginService',
            '$location',
            '$cartService',
            '$commonHeaderService',
            '$commonSidebarService',
            function ($scope, $routeParams, $visitorApiService, $visitorLoginService, $location, $cartService, $commonHeaderService, $commonSidebarService) {
                $visitorLoginService.init();
                $scope.login = $visitorLoginService.getVisitor();
                $scope.loginCredentials = {};

                $scope.getItemsInCart = function () {
                    return $cartService.getCountItems();
                };

                $scope.clickToCartDesktop = function () {
                    var miniCart;
                    miniCart = $('.mini-cart');

                    if ($visitorLoginService.isLoggedIn()) {
                        if (miniCart.css('display') === 'none') {
                            miniCart.css('display', 'table');
                        } else {
                            miniCart.hide();
                        }
                    } else {
                        $('#form-login').modal('show');
                    }
                };

                $scope.save = function () {
                    delete $scope.login.billing_address_id;         // jshint ignore:line
                    delete $scope.login.shipping_address_id;        // jshint ignore:line
                    $visitorApiService.register($scope.login);
                    $('.modal').modal('hide');

                    $scope.message = {
                        "type": "success",
                        "message": "Thanks for registration. Please check your email and confirm your account"
                    };
                };

                $scope.signIn = function () {
                    $visitorApiService.login($scope.loginCredentials).$promise.then(function (response) {
                        if (response.result === 'ok') {
                            $visitorLoginService.init(true).then(
                                function () {
                                    $('.modal').modal('hide');
                                    $cartService.reload();

                                    // Update right menu
                                    $commonHeaderService.removeItem('right', '/login');
                                    $commonHeaderService.addMenuRightItem('/account', 'My Account', '/account');
                                    $commonHeaderService.addMenuRightItem('/logout', 'Logout', '/logout');

                                    // Update sidebar
                                    $commonSidebarService.addItem('ACCOUNT', 'account', 'glyphicon glyphicon-user', 90);

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
                };

                $scope.isLoggedIn = function () {
                    return $visitorLoginService.isLoggedIn();
                };

                $scope.facebookLogin = function () {
                    FB.login(                                               // jshint ignore:line
                        function (response) {
                            $visitorApiService.loginFacebook({
                                'user_id': response.authResponse.userID,
                                'access_token': response.authResponse.accessToken
                            }).$promise.then(
                                function () {
                                    $visitorLoginService.init(true).then(
                                        function () {
                                            $('.modal').modal('hide');
                                            $cartService.reload();

                                            // Update right menu
                                            $commonHeaderService.removeItem('right', '/login');
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

                $scope.googleLogin = function () {
                    gl.login();
                };

                $scope.loginCallback = window.loginCallback = function (response) {
                    var data = gl.loginCallback(response);
                    $visitorApiService.loginGoolge(data).$promise.then(
                        function () {
                            $visitorLoginService.init(true).then(
                                function () {
                                    $('.modal').modal('hide');
                                    $cartService.reload();

                                    // Update right menu
                                    $commonHeaderService.removeItem('right', '/login');
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
        return loginModule;
    });
})(window.define, jQuery);
