(function (define) {
    "use strict";

    define(["visitor/init"], function (visitorModule) {
        visitorModule

            .controller("visitorAccountController", [
                "$scope",
                "$visitorService",
                function ($scope, $visitorService) {
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $visitorService.getVisitor();

                    $scope.getInfo = function() {
                        $visitorApiService.getInfo().$promise.then(
                            function(response){
                                var result = response.result || {};
                                console.log(response);
                                $scope.visitor = result;
                            }
                        );
                    };

                    $scope.getAddressesList = function() {
                        $visitorApiService.getAddresses().$promise.then(
                            function (response) {
                                var result = response.result || [];
                                console.log(response);
                                $scope.addresses= result;
                            }
                        );
                    };
                }
            ]);
        return visitorModule;
    });
})(window.define);