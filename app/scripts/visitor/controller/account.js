(function (define) {
    "use strict";

    define([
        "visitor/init"
    ], function (visitorModule) {
        visitorModule

            .controller("visitorAccountController", [
                "$scope",
                "$location",
                "$loginService",
                "$visitorApiService",
                function ($scope, $location, $loginService, $visitorApiService) {
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $loginService.getVisitor();
                    $scope.visitorService = $loginService;
                    $scope.changePswCredentials = {};
                    $scope.isCoincide = false;

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
                        if(typeof $scope.changePswCredentials.password === "undefined" ||
                            $scope.changePswCredentials.password.trim() === ""){
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

                    $scope.update = function () {
                        delete $scope.visitor.password;
                        delete $scope.visitor.billing_address;
                        delete $scope.visitor.shipping_address;
                        $visitorApiService.update($scope.visitor);
                    };

                    $scope.changePassword = function () {
                        if (checkPassword()) {
                            $visitorApiService.update($scope.changePswCredentials).$promise.then(
                                function () {
                                    $(".modal").modal("hide");
                                }
                            );
                        } else {
                            $("#not-match").show().delay(1000).fadeOut();
                        }
                    };

                    $scope.closePopUp = function() {
                        $(".modal").modal("hide");
                    };


                    $scope.shippingUpdate = function () {
                        $scope.visitor.shipping_address.id = $scope.visitor.shipping_address_id; // jshint ignore:line
                        $visitorApiService.addressUpdate($scope.visitor.shipping_address); // jshint ignore:line
                    };

                    $scope.billingUpdate = function () {
                        $scope.visitor.billing_address.id = $scope.visitor.billing_address_id; // jshint ignore:line
                        $visitorApiService.addressUpdate($scope.visitor.billing_address); // jshint ignore:line
                    };

                    $scope.updateDefaultAddress = function () {
                        delete $scope.visitor.billing_address; // jshint ignore:line
                        delete $scope.visitor.shipping_address; // jshint ignore:line
                        if ($scope.visitor.shipping_address_id === "") {
                            delete $scope.visitor.shipping_address_id;
                        }
                        if ($scope.visitor.billing_address_id === "") {
                            delete $scope.visitor.billing_address_id;
                        }
                        $visitorApiService.update($scope.visitor).$promise.then(
                            function (response) {
                                $loginService.setLogin(response.result);
                                $scope.visitor = $loginService.getVisitor();
                            }
                        );
                    };

                    $scope.$watch("visitor", getAddressList);
                    $scope.$watch("changePswCredentials", checkPassword);
                }
            ]);
        return visitorModule;
    });
})(window.define);