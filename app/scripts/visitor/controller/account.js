angular.module("visitorModule")

    .controller("visitorAccountController", [
        "$scope",
        "$location",
        "$visitorLoginService",
        "$visitorApiService",
        "$commonUtilService",
        function ($scope, $location, $visitorLoginService, $visitorApiService, $commonUtilService) {
            $scope.addresses = [];
            $scope.address = {};
            $scope.visitor = $visitorLoginService.getVisitor();
            $scope.visitorService = $visitorLoginService;
            $scope.changePswCredentials = {};
            $scope.isCoincide = false;

            var activePath;

            var getAddressList = function () {
                $visitorApiService.getAddresses().$promise.then(
                    function (response) {
                        var result = response.result || [];
                        $scope.addresses = result;
                    }
                );
            };

            var checkPassword = function () {
                var status = true;
                $scope.isCoincide = true;
                if ($scope.passwordForm.password && $scope.passwordForm.password.$invalid) {
                    $scope.isCoincide = false;
                    status = false;
                } else if (typeof $scope.changePswCredentials.oldpassword === "undefined" ||
                    $scope.changePswCredentials.oldpassword.trim() === "") {
                    $scope.messagePassword = $commonUtilService.getMessage(null, "warning", "Old password field can not be blank");
                    $scope.isCoincide = false;
                    status = false;
                } else if (typeof $scope.changePswCredentials.password === "undefined" ||
                    $scope.changePswCredentials.password.trim() === "") {
                    $scope.messagePassword = $commonUtilService.getMessage(null, "warning", "Password field can not be blank");
                    $scope.isCoincide = false;
                    status = false;
                } else if ($scope.changePswCredentials.password !== $scope.changePswCredentials["confirm"]) {
                    $scope.messagePassword = $commonUtilService.getMessage(null, "warning", "New Passwords don't match");
                    $scope.isCoincide = false;
                    status = false;
                }
                return status;
            };

            $scope.init = function () {
                // BREADCRUMBS
                $scope.$emit("add-breadcrumbs", {"label": "MyAccount", "url": "/account"});
                activePath = $location.path();

                $scope.visitorService.isLoggedIn().then(function (isLoggedIn) {
                    if (!isLoggedIn) {
                        $location.path("/");
                    }
                });
            };

            $scope.save = function () {
                var updateSuccess, updateFail;
                if ($scope.visitorForm.$invalid) {
                    return false;
                }
                updateSuccess = function () {
                    $scope.message = $commonUtilService.getMessage(null, "success", "Сhanges have been made");
                };

                updateFail = function () {
                    $scope.message = $commonUtilService.getMessage(null, "danger", "Something went wrong");
                };

                delete $scope.visitor["password"];
                delete $scope.visitor["billing_address"];
                delete $scope.visitor["shipping_address"];

                $visitorApiService.update($scope.visitor, updateSuccess, updateFail);

                setTimeout(function () {
                    $("#parent_popup_profile").modal("hide");
                }, 2000);
            };

            $scope.changePassword = function () {
                if (checkPassword()) {
                    $visitorApiService.update({
                        "old_password": $scope.changePswCredentials.oldpassword,
                        "password": $scope.changePswCredentials.password
                    }).$promise.then(
                        function (response) {
                            setTimeout(function () {
                                $("#form-change-password").modal("hide");
                            }, 2000);
                            if (response.error === null) {
                                $scope.messagePassword = $commonUtilService.getMessage(response, "success", "Password change was successfully");
                                $scope.changePswCredentials = {};
                            } else {
                                $scope.messagePassword = $commonUtilService.getMessage(response);
                            }
                        }
                    );
                }
            };

            $scope.closePopUp = function () {
                $(".modal").modal("hide");
            };

            $scope.popUpOpen = function (id) {
                $("#" + id).modal("show");
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

            $scope.isActive = function (path) {
                return activePath === path;
            };

        }
    ]);