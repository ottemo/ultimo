(function (define) {
    "use strict";

    define(["visitor/init", "visitor/service/google"], function (visitorModule, gl) {
        visitorModule

            .controller("visitorRegistrationController", [
                "$scope",
                "$routeParams",
                "$visitorApiService",
                function ($scope, $routeParams, $visitorApiService) {
                    $scope.credentialsFacebook = {};
                    $scope.formId = "form-registration";
                    var getDefaultVisitor = function () {
                        return {
                            "facebook_id": "",
                            "google_id": "",
                            "email": "",
                            "fname": "",
                            "lname": "",
                            "password": ""
                        };
                    };

                    $scope.visitor = getDefaultVisitor();

                    $scope.show = function () {
                        $("#" + $scope.formId).modal("show");
                    };

                    $scope.hide = function () {
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
                                    function (response) {
                                        $visitorApiService.info().$promise.then(
                                            function (response) {
                                                console.log(response);
                                            }
                                        )
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
                        console.log(gl.loginCallback(response));
                    };

                }
            ]);
        return visitorModule;
    });
})(window.define);