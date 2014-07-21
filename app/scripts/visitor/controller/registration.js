(function (define) {
    "use strict";

    define(["visitor/init", "visitor/service/google"], function (visitorModule, gl) {
        visitorModule

            .controller("visitorRegistrationController", [
                "$scope",
                "$routeParams",
                "$visitorApiService",
                "$visitorService",
                "$location",
                function ($scope, $routeParams, $visitorApiService, $visitorService, $location) {
                    $scope.credentialsFacebook = {};
                    $scope.formId = "form-registration";

                    $scope.visitor = $visitorService.getVisitor();

                    $scope.show = function () {
                        $("#" + $scope.formId).modal("show");
                    };

                    $scope.hide = function (callback) {
                        $("#" + $scope.formId).modal("hide");
                    };

                    $scope.show();

                    $scope.save = function () {
                        $visitorApiService.register($scope.visitor).$promise.then(
                            function (response) {
                                console.log(response);
                            }
                        )
                        $scope.hide();
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
                                        $scope.hide(function(){$location.path("/account");});

                                    }
                                );
                            }
                        );
                    };
                }
            ]);
        return visitorModule;
    });
})(window.define);