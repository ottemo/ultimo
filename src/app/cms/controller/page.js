angular.module("cmsModule")

.controller("cmsPageController", [
    "$scope",
    "$routeParams",
    "$location",
    "$cmsApiService",
    "$cmsPageService",
    function($scope, $routeParams, $location, $cmsApiService, $cmsPageService) {

        $scope.pageId = $routeParams.id;
        $scope.page = {};

        activate();

        /////////////////////////
        function activate() {

            // Get the page
            getPage().then(function(page){
                $scope.page = page;

                // BREADCRUMBS
                $scope.$emit("add-breadcrumbs", {
                    "label": $scope.page.identifier,
                    "url": $cmsPageService.getUrl($scope.page._id)
                });
            });
        }

        function getPage() {
            return $cmsApiService.getPage({"pageID": $scope.pageId}).$promise
                .then(function(response){
                    if (response.error !== null) {
                        $location.path("/");
                    };

                    return response.result || {};
                });
        }
    }
]);

