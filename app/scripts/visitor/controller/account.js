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

                    var getAddressList = function () {
                        $visitorApiService.getAddresses({"visitorId": $scope.visitor._id}).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                $scope.addresses = result;
                            }
                        );
                    }

                    $scope.init = function () {
                        if (!$scope.visitorService.isLoggedIn()) {
                            $location.path("/");
                        }
                    };

                    $scope.update = function () {
                        $visitorApiService.update($scope.visitor).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                console.log(result);
                            }
                        );
                    };

                    $scope.shippingUpdate = function () {
                        $scope.visitor.shipping_address.id = $scope.visitor.shipping_address_id;
                        $visitorApiService.addressUpdate($scope.visitor.shipping_address);
                    };

                    $scope.billingUpdate = function () {
                        $scope.visitor.billing_address.id = $scope.visitor.billing_address_id;
                        $visitorApiService.addressUpdate($scope.visitor.billing_address);
                    };

                    $scope.updateDefaultAddress = function () {
                        delete $scope.visitor.billing_address;
                        delete $scope.visitor.shipping_address;
                        $visitorApiService.update($scope.visitor).$promise.then(

                            function (response) {

                                $loginService.setLogin({
                                    "facebook_id": response.result.facebook_id || "",
                                    "google_id": response.result.google_id || "",
                                    "email": response.result.email || "",
                                    "fname": response.result.first_name || "",
                                    "lname": response.result.last_name || "",
                                    "billing_address_id": response.result.billing_address && response.result.billing_address._id || "",
                                    "shipping_address_id": response.result.shipping_address && response.result.shipping_address._id || "",

                                    "billing_address": response.result.billing_address || "",
                                    "shipping_address": response.result.shipping_address || ""
                                });

                                $scope.visitor = $loginService.getVisitor();
                            }

                        );
                    };

                    $scope.$watch("visitor", getAddressList);
                }
            ]);
        return visitorModule;
    });
})(window.define);