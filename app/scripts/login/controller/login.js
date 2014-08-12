(function (define, $) {
    "use strict";

    define(["login/init", "login/service/google"], function (loginModule, gl) {
        loginModule

            .controller("loginController", [
                "$scope",
                "$routeParams",
                "$loginApiService",
                "$loginService",
                "$location",
                "$cartService",
                function ($scope, $routeParams, $loginApiService, $loginService, $location, $cartService) {
                    $loginService.init();
                    $scope.login = $loginService.getVisitor();
                    $scope.loginCredentials = {};

                    $scope.cart = $cartService;

                    $scope.getItemsInCart = function () {
                        return $cartService.getCountItems();
                    };

                    $scope.clickToCart = function () {
                        var miniCart;
                        miniCart = $(".mini-cart");

                        if ($loginService.isLoggedIn()) {
                            if (miniCart.css("display") === "none") {
                                miniCart.css("display", "table");
                            } else {
                                miniCart.hide();
                            }
                        } else {
                            $("#form-login").modal("show");
                        }
                    };

                    $scope.save = function () {
                        delete $scope.login.billing_address_id;
                        delete $scope.login.shipping_address_id;
                        $loginApiService.register($scope.login);
                        $(".modal").modal("hide");
                    };

                    $scope.signIn = function () {
                        $loginApiService.login($scope.loginCredentials).$promise.then(function (response) {
                            if (response.result === "ok") {
                                $loginService.init().then(
                                    function () {
                                        $(".modal").modal("hide");
                                        $cartService.reload();
                                        $location.path("/account");
                                    }
                                );
                            }
                        });
                    };

                    $scope.logout = function () {
                        $loginService.logout().then(
                            function () {
                                $cartService.reload();
                                $location.path("/");
                            }
                        );
                    };

                    $scope.isLoggedIn = function () {
                        return $loginService.isLoggedIn();
                    };

                    $scope.facebookLogin = function () {
                        FB.login(                                               // jshint ignore:line
                            function (response) {
                                $loginApiService.loginFacebook({
                                    "user_id": response.authResponse.userID,
                                    "access_token": response.authResponse.accessToken
                                }).$promise.then(
                                    function () {
                                        $loginService.init().then(
                                            function () {
                                                $(".modal").modal("hide");
                                                $cartService.reload();
                                                $location.path("/account");
                                            }
                                        );
                                    }
                                );
                            },
                            {scope: "email"}
                        );
                    };

                    $scope.googleLogin = function () {
                        gl.login();
                        $cartService.reload();
                    };

                    $scope.loginCallback = window.loginCallback = function (response) {
                        var data = gl.loginCallback(response);
                        $loginApiService.loginGoolge(data).$promise.then(
                            function () {
                                $loginService.init().then(
                                    function () {
                                        $(".modal").modal("hide");
                                        $location.path("/account", false);
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