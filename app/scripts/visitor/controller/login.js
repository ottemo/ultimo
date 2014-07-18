(function (define) {
    "use strict";

    define(["visitor/init"], function (visitorModule) {
        visitorModule

            .controller("visitorLoginController", [
                "$scope",
                "$visitorApiService",
                function ($scope, $visitorApiService) {
                    $scope.formId = "form-login";
                    $scope.credentials = {
                        "email": "",
                        "password": ""
                    }
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

                }
            ]);
        return visitorModule;
    });
})(window.define);