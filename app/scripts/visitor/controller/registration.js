(function (define) {
    "use strict";

    define(["visitor/init", "visitor/service/facebook"], function (visitorModule, fb) {
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
                            "facebook_id":  "",
                            "google_id":    "",
                            "email":        "",
                            "fname":        "",
                            "lname":        "",
                            "password":     ""
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

                                FB.api("/" + response.authResponse.userID,
                                    function (response) {
                                        if (response && !response.error) {
                                            $scope.credentialsFacebook = response || {};
                                            /**
                                             * @todo : not working without apply - find reason why
                                             */
                                            $scope.$apply();
                                        }
                                    }
                                );

                            },
                            {scope: "email"}
                        );
                    };

                    var saveFacebook = function () {
                        if (typeof $scope.credentialsFacebook === "undefined" ||
                            typeof $scope.credentialsFacebook.email === "undefined" ||
                            $scope.credentialsFacebook.email === "") {
                            return true;
                        }
                        $scope.visitor = {
                            "facebook_id": $scope.credentialsFacebook.id,
                            "email": $scope.credentialsFacebook.email,
                            "fname": $scope.credentialsFacebook.first_name,
                            "lname": $scope.credentialsFacebook.last_name,
                            "password": ""
                        }
                        $scope.save();
                    }

                    var signinCallback = function () {
                        alert(1);
                    }

                    $scope.$watch("credentialsFacebook", saveFacebook);
                }
            ]);
        return visitorModule;
    });
})(window.define);