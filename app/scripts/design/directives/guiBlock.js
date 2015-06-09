angular.module("designModule")
    .directive('guiBlock', [
        '$location',
        '$designService',
        '$sce',
        '$cmsApiService',
        function ($location, $designService, $sce, $cmsApiService) {
            return {
                restrict: 'E',
                scope: {
                    'identifier': '@name'
                },
                template: "<div class='custom-block' ng-bind-html='showContent()'></div>",
                controller: function ($scope) {

                    $cmsApiService.getBlock({"blockID": $scope.identifier}).$promise.then(
                        function (response) {
                            if (response.error === null) {
                                $scope.block = response.result;
                            }
                        }
                    );

                    $scope.showContent = function () {
                        if (typeof $scope.block === "undefined") {
                            return "";
                        }
                        return $sce.trustAsHtml($scope.block.content);
                    };
                }
            };
        }]);