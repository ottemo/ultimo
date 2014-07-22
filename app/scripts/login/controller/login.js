(function (define) {
    "use strict";

    define(["login/init", "login/service/google"], function (loginModule, gl) {
        loginModule

            .controller("loginController", [
                "$scope",
                "$routeParams",
                "$loginApiService",
                "$loginService",
                "$location",
                function ($scope, $routeParams, $loginApiService, $loginService, $location) {
                    $loginService.init();
                    $scope.login = $loginService.getVisitor();
                    $scope.loginCredentials = {};

                    $scope.save = function () {
                        $loginApiService.register($scope.login).$promise.then(
                            function (response) {
                                console.log(response);
                            }
                        );
                        $(".modal").modal("hide");
                    };

                    $scope.login = function () {
                        $loginApiService.login($scope.loginCredentials).$promise.then(function (response) {
                            if (response.result === "ok") {
                                $loginService.init().then(
                                    function () {
                                        $(".modal").modal("hide");
                                        $location.path("/account");
                                    }
                                );
                            }
                        });
                    };

                    $scope.logout = function () {
                        $loginService.logout();
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
                    };

                    window.loginCallback = $scope.loginCallback = function (response) {
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

                    $scope.isLoggedIn = function () {
                        return $loginService.isLoggedIn();
                    };
                }
            ]);
        return loginModule;
    });
})(window.define);