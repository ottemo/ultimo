angular.module("commonModule")

.controller("commonBreadcrumbsController", [
    "$scope",
    "$commonBreadcrumbsService",
    function($scope, $commonBreadcrumbsService) {
        $scope.it = $commonBreadcrumbsService;
        $scope.crumbs = $commonBreadcrumbsService.getItems();
    }
]);
