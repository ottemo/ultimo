(function (define) {
    "use strict";

    define([
            "angular",
            "visitor/service/facebook",
            "visitor/service/google",
        ],
        function (angular, fb, gl) {

            angular.module.visitorModule
                .config(["$routeProvider", function ($routeProvider) {

                    fb.init();
                    gl.init();

                    $routeProvider
                        .when("/logout", {
                            template: "",
                            controller: "visitorLogoutControllerUrb"
                        })
                        .when("/account", {
                            templateUrl: angular.getTheme("visitor/account.html"),
                            controller: "visitorAccountController"
                        })
                        .when("/account/address", {
                            templateUrl: angular.getTheme("visitor/account/address-manager.html"),
                            controller: "visitorAddressController"
                        })
                        .when("/account/orders", {
                            templateUrl: angular.getTheme("visitor/account/order.html"),
                            controller: "visitorOrderController"
                        })

                        .when("/account/order/:id", {
                            templateUrl: angular.getTheme("visitor/account/order-details.html"),
                            controller: "visitorOrderController"
                        })
                        .when("/login", {
                            templateUrl: angular.getTheme("visitor/login-page.html"),
                            controller: "visitorLoginControllerUrb"
                        })
                        .when("/registration", {
                            templateUrl: angular.getTheme("visitor/registration-page.html"),
                            controller: "visitorLoginControllerUrb"
                        });
                }])
                .run([
                    "$commonHeaderService",
                    "$visitorLoginService",
                    "$commonSidebarService",
                    function ($commonHeaderService, $visitorLoginService, $commonSidebarService) {
                        var isLoggedIn;

                        isLoggedIn = $visitorLoginService.isLoggedIn();
                        if (isLoggedIn === null) {
                            $visitorLoginService.init().then(
                                function () {
                                    if ($visitorLoginService.isLoggedIn()) {
                                        $commonHeaderService.addMenuRightItem("/account", "My Account", "/account");
                                        $commonHeaderService.addMenuRightItem("/logout", "Logout", "/logout");
                                        $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user", 90);
                                    } else {
                                        $commonHeaderService.addMenuRightItem("/login", "Login", "/login");
                                        $commonHeaderService.addMenuRightItem("/registration", "Registration", "/registration");
                                        $commonSidebarService.removeItem("account");
                                    }
                                }
                            );
                        } else {
                            if ($visitorLoginService.isLoggedIn()) {
                                $commonHeaderService.addMenuRightItem("/account", "My Account", "/account");
                                $commonHeaderService.addMenuRightItem("/logout", "Logout", "/logout");
                                $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user", 90);
                            } else {
                                $commonHeaderService.addMenuRightItem("/login", "Login", "/login");
                                $commonHeaderService.addMenuRightItem("/registration", "Registration", "/registration");
                                $commonSidebarService.removeItem("logout");
                            }
                        }
                    }
                ])
                .controller('visitorLoginControllerUrb', [
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

                        $scope.signIn = function () {
                            $visitorApiService.login($scope.loginCredentials).$promise.then(function (response) {
                                if (response.result === 'ok') {
                                    $visitorLoginService.init(true).then(
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
                                } else {
                                    $scope.message = {
                                        "type": "warning",
                                        "message": response.error
                                    };
                                }
                            });
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
                                    $visitorLoginService.init(true).then(
                                        function () {
                                            $('.modal').modal('hide');
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
                ])
                .controller("visitorLogoutControllerUrb", [
                    "$scope",
                    "$visitorLoginService",
                    "$location",
                    "$cartService",
                    "$commonHeaderService",
                    "$commonSidebarService",
                    function ($scope, $visitorLoginService, $location, $cartService, $commonHeaderService, $commonSidebarService) {

                        if ($visitorLoginService.isLoggedIn()) {

                            $visitorLoginService.logout().then(
                                function () {

                                    $cartService.reload().then(
                                        function () {

                                            // Update right menu
                                            $commonHeaderService.addMenuRightItem("/login", "Login", "/login");
                                            $commonHeaderService.addMenuRightItem("/registration", "Registration", "/registration");
                                            $commonHeaderService.removeItem("right", "/account");
                                            $commonHeaderService.removeItem("right", "/logout");

                                            // Update sidebar
                                            $commonSidebarService.removeItem("account");

                                            $location.path("/");
                                        }
                                    );


                                }
                            );

                        } else {
                            $location.path("/");
                        }

                    }
                ]);

            return angular.module.visitorModule;
        });

})(window.define);