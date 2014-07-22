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
                    };

                    $scope.init = function () {
                        console.log("isLoggedIn = " + $scope.visitorService.isLoggedIn());
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
                        if($scope.visitor.shipping_address_id === ""){
                            delete $scope.visitor.shipping_address_id;
                        }
                        if($scope.visitor.billing_address_id === ""){
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
                }
            ]);
        return visitorModule;
    });
})(window.define);