(function (define) {
    "use strict";

    define(["visitor/init", "visitor/service/google"], function (visitorModule, gl) {
        visitorModule

            .controller("visitorController", [
                "$scope",
                "$routeParams",
                "$visitorApiService",
                "$visitorService",
                "$location",
                "$cookieStore",
                "LOGIN_COOKIE",
                function ($scope, $routeParams, $visitorApiService, $visitorService, $location, $cookieStore, LOGIN_COOKIE) {
                    $visitorService.init();
                    $scope.visitor = $visitorService.getVisitor();
                    $scope.loginCredentials = {};

                    $scope.save = function () {
                        $visitorApiService.register($scope.visitor).$promise.then(
                            function (response) {
                                console.log(response);
                            }
                        )
                        $(".modal").modal("hide");
                    };

                    $scope.login = function () {
                        $visitorApiService.login($scope.loginCredentials).$promise.then(function (response) {
                            console.log(response)
                            if(response.result ==="ok"){
                                $visitorService.init();
                                $scope.visitor = $visitorService.getVisitor();
                                $(".modal").modal("hide");
                                $location.path("/account");
                            }

                        });
                    };

                    $scope.logout = function () {
                        $cookieStore.put(LOGIN_COOKIE, "");
                        $(".modal").modal("hide");
                        $location.path("/");
                    };

                    $scope.facebookLogin = function () {
                        FB.login(
                            function (response) {
                                $visitorApiService.loginFacebook({
                                    "user_id": response.authResponse.userID,
                                    "access_token": response.authResponse.accessToken
                                }).$promise.then(
                                    function () {
                                        $visitorService.init();
                                        $scope.visitor = $visitorService.getVisitor();
                                        $(".modal").modal("hide");
                                        $location.path("/account");
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
                        $visitorApiService.loginGoolge(data).$promise.then(
                            function () {
                                $visitorApiService.info().$promise.then(
                                    function () {
                                        $visitorService.init();
                                        $scope.visitor = $visitorService.getVisitor();
                                        $(".modal").modal("hide");
                                        $location.path("/account");
                                    }
                                );
                            }
                        );
                    };

                    $scope.isLoggedIn = function () {
                        return $visitorService.isLoggedIn();
                    };
                }
            ]);
        return visitorModule;
    });
})(window.define);