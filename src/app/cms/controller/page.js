angular.module("cmsModule")

.controller("cmsPageController", [
    "$scope",
    "$routeParams",
    "$location",
    "cmsApiService",
    "cmsPageService",
    function($scope, $routeParams, $location, cmsApiService, cmsPageService) {

        $scope.activate = activate;
        $scope.pageId = $routeParams.id;
        $scope.page = {};

        $scope._getPage = _getPage;

        /////////////////////////
        function activate() {

            // Get the page
            $scope._getPage().then(function(page){
                $scope.page = page;

                // BREADCRUMBS
                $scope.$emit("add-breadcrumbs", {
                    "label": $scope.page.identifier,
                    "url": cmsPageService.getUrl($scope.page._id)
                });
            });
        }

        function _getPage() {
            return cmsApiService.getPage({"pageID": $scope.pageId}).$promise
                .then(function(response){
                    if (response.error !== null) {
                        $location.path("/");
                    };

                    return response.result || {};
                });
        }
    }
]);

