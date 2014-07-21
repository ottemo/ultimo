(function (define) {
    "use strict";

    define(["common/init"], function (commonModule) {

        commonModule
            /*
             *  HTML top page header manipulator (direct service mapping)
             */
            .controller("commonHeaderController", ["$scope", "$commonHeaderService", function ($scope, $commonHeaderService) {
                $scope.it = $commonHeaderService;
                $scope.rightMenu= $commonHeaderService.getMenuLeft();
            }])

            .controller("commonSidebarController", ["$scope", "$commonSidebarService", function ($scope, $commonSidebarService) {
                $scope.it = $commonSidebarService;
                $scope.items = $commonSidebarService.getItems();
            }])

            .controller("commonController", ["$scope", function($scope) {
                $scope.x = "commonController";
            }]);

        return commonModule;
    });
})(window.define);