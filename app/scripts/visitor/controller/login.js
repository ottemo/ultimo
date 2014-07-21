(function (define) {
    "use strict";

    define(["visitor/init"], function (visitorModule) {
        visitorModule

            .controller("visitorLoginController", [
                "$scope",
                "$location",
                "$cookieStore",
                "$visitorApiService",
                "$visitorService",
                "LOGIN_COOKIE",
                function ($scope, $location, $cookieStore, $visitorApiService, $visitorService, LOGIN_COOKIE) {
                    $scope.formId = "form-login";
                    $scope.credentials = {
                        "email": "",
                        "password": ""
                    };
                    $scope.visitor = $visitorService.getVisitor();

                    $scope.show = function () {
                        $("#" + $scope.formId).modal("show");
                    };

                    $scope.hide = function () {
                        $("#" + $scope.formId).modal("hide");
                    };

                    $scope.show();

                    $scope.login = function () {
                        $visitorApiService.login($scope.credentials).$promise.then(
                            function (response) {
                                console.log(response);
                            }
                        );
                    };

                    $scope.facebookLogin = function () {
                        FB.login(
                            function (response) {
                                $visitorApiService.loginFacebook({
                                    "user_id": response.authResponse.userID,
                                    "access_token": response.authResponse.accessToken
                                }).$promise.then(
                                    function () {
                                        $scope.hide();
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
                                        $scope.hide();
                                        $location.path("/account");
                                    }
                                );
                            }
                        );
                    };

                    $scope.logout = function () {
                        $cookieStore.put(LOGIN_COOKIE, "");
                        $visitorService.cleanVisitor();
                        console.log(1);
                        $scope.hide();
                        console.log(2);
                        setTimeout(1000);
                        $location.path("/");
                        console.log(3);
                    };
                }
            ]);
        return visitorModule;
    });
})(window.define);