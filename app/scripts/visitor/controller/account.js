(function (define, $) {
    "use strict";

    define([
        "visitor/init"
    ], function (visitorModule) {
        visitorModule

            .controller("visitorAccountController", [
                "$scope",
                "$location",
                "$visitorLoginService",
                "$visitorApiService",
                function ($scope, $location, $visitorLoginService, $visitorApiService) {
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $visitorLoginService.getVisitor();
                    $scope.visitorService = $visitorLoginService;
                    $scope.changePswCredentials = {};
                    $scope.isCoincide = false;

                    var activePath;

                    var getAddressList = function () {
                        $visitorApiService.getAddresses({"visitorId": $scope.visitor._id}).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                $scope.addresses = result;
                            }
                        );
                    };

                    var checkPassword = function () {
                        var status;
                        if (typeof $scope.changePswCredentials.password === "undefined" ||
                            $scope.changePswCredentials.password.trim() === "") {
                            $scope.changeMsg = "Password can not be blank";
                            $scope.isCoincide = false;
                            status = false;
                        } else if ($scope.changePswCredentials.password === $scope.changePswCredentials.confirm) {
                            $scope.isCoincide = true;
                            status = true;
                        } else {
                            $scope.changeMsg = "Passwords don't match";
                            $scope.isCoincide = false;
                            status = false;
                        }
                        return status;
                    };

                    $scope.init = function () {
                        var isLoggedIn;

                        // BREADCRUMBS
                        $scope.$emit("add-breadcrumbs", {"label": "myAccount", "url": "/account"});
                        activePath = $location.path();

                        isLoggedIn = $scope.visitorService.isLoggedIn();
                        if (isLoggedIn === null) {
                            $scope.visitorService.init().then(
                                function () {
                                    if (!$scope.visitorService.isLoggedIn()) {
                                        $location.path("/");
                                    }
                                }
                            );
                        } else {
                            if (!$scope.visitorService.isLoggedIn()) {
                                $location.path("/");
                            }
                        }
                    };

                    $scope.save = function () {
                        var updateSuccess, updateFail;
                        if ($scope.visitorForm.$invalid) {
                            return false;
                        }
                        updateSuccess = function () {
                            $scope.message = {
                                "type": "success",
                                "message": "Сhanges have been made"
                            };
                        };

                        updateFail = function () {
                            $scope.message = {
                                "type": "alert-warning",
                                "message": "Something went wrong"
                            };
                        };

                        delete $scope.visitor["password"];
                        delete $scope.visitor["billing_address"];
                        delete $scope.visitor["shipping_address"];

                        $visitorApiService.update($scope.visitor, updateSuccess, updateFail);
                        $("#parent_popup_profile").hide();
                    };

                    $scope.changePassword = function () {
                        if (checkPassword()) {
                            $visitorApiService.update($scope.changePswCredentials).$promise.then(
                                function (response) {
                                    $("#parent_popup_password").hide();
                                    if (response.error === "") {
                                        $scope.message = {
                                            "type": "success",
                                            "message": "Password change was successfully"
                                        };
                                    } else {
                                        $scope.message = {
                                            "type": "danger",
                                            "message": "Someting went wrong"
                                        };
                                    }
                                }
                            );
                        }
                    };

                    $scope.closePopUp = function () {
                        $(".modal").modal("hide");
                    };

                    $scope.popUpOpen = function (id) {
                        $("#" + id).show();
                    };

                    $scope.shippingUpdate = function () {
                        $scope.visitor["shipping_address"].id = $scope.visitor["shipping_address_id"];
                        $visitorApiService.addressUpdate($scope.visitor["shipping_address"]);
                    };

                    $scope.billingUpdate = function () {
                        $scope.visitor["billing_address"].id = $scope.visitor["billing_address_id"];
                        $visitorApiService.addressUpdate($scope.visitor["billing_address"]);
                    };

                    $scope.$watch("visitor", getAddressList);
                    $scope.$watch("changePswCredentials", checkPassword);

                    $scope.isActive = function (path) {
                        if (activePath === path) {
                            return true;
                        }
                        return false;
                    };

                }
            ]);

        return visitorModule;
    });
})(window.define, jQuery);