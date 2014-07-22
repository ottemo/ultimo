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
                "$cookieStore",
                "LOGIN_COOKIE",
                "$commonSidebarService",
                function ($scope, $routeParams, $loginApiService, $loginService, $location, $cookieStore, LOGIN_COOKIE, $commonSidebarService) {
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
                            console.log(response);
                            if (response.result === "ok") {
                                $loginService.init().then(
                                    function () {
                                        $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user");
                                        $(".modal").modal("hide");
                                        $location.path("/account");
                                    }
                                );
                            }
                        });
                    };

                    $scope.logout = function () {
                        $cookieStore.put(LOGIN_COOKIE, "");
                        $loginService.init();
                        $(".modal").modal("hide");
                        $location.path("/");
                    };

                    $scope.facebookLogin = function () {
                        FB.login(
                            function (response) {
                                $loginApiService.loginFacebook({
                                    "user_id": response.authResponse.userID,
                                    "access_token": response.authResponse.accessToken
                                }).$promise.then(
                                    function () {
                                        $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user");
                                        $loginService.init().then(
                                            function () {
//                                                $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user");
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
                                $loginApiService.info().$promise.then(
                                    function () {
                                        $loginService.init().then(
                                            function () {
                                                $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user");
                                                $(".modal").modal("hide");
                                                $location.path("/account");
                                            }
                                        );
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