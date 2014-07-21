(function (define) {
    "use strict";

    define([
        "visitor/init"
    ], function (visitorModule) {
        visitorModule

            .controller("visitorAccountController", [
                "$scope",
                "$visitorService",
                "$visitorApiService",
                function ($scope, $visitorService, $visitorApiService) {
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $visitorService.getVisitor();
                    $scope.visitorService = $visitorService;

                    var getAddressList = function(){
                        $visitorApiService.getAddresses({"visitorId":$scope.visitor._id}).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                $scope.addresses = result;
                            }
                        );
                    }

                    $scope.saveVisitor = function () {
                        alert("Implement this!!! Don't saved in DB");
                    }

                    $scope.update = function() {
                        $visitorApiService.update($scope.visitor).$promise.then(
                            function (response) {
                                var result = response.result || [];
                                console.log(result)
                            }
                        );
                    };

                    $scope.shippingUpdate = function(){
                        $scope.visitor.shipping_address.id = $scope.visitor.shipping_address_id;
                        $visitorApiService.addressUpdate($scope.visitor.shipping_address);
                    };

                    $scope.billingUpdate = function(){
                        $scope.visitor.billing_address.id = $scope.visitor.billing_address_id;
                        $visitorApiService.addressUpdate($scope.visitor.billing_address);
                    };

                    $scope.updateDefaultAddress = function(){
                        delete $scope.visitor.billing_address;
                        delete $scope.visitor.shipping_address;
                        $visitorApiService.update($scope.visitor).$promise.then(
                            function () {
                                $visitorService.init();
                                $scope.visitor = $visitorService.getVisitor();
                            }
                        );
                    };

                    $scope.$watch("visitor", getAddressList);
                }
            ]);
        return visitorModule;
    });
})(window.define);