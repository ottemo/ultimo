module.exports = function (cmsModule) {

    cmsModule
        /*
         *  HTML top page header manipulator (direct service mapping)
         */
        .controller("cmsPageController", [
            "$scope",
            "$routeParams",
            "$location",
            "$sce",
            "$cmsApiService",
            "$cmsPageService",
            "$commonPageService",
            function ($scope, $routeParams, $location, $sce, $cmsApiService, $cmsPageService) {
                var getDefaultPage;

                getDefaultPage = function () {
                    return {};
                };

                $scope.pageId = $routeParams.id;

                $scope.page = getDefaultPage();

                $cmsApiService.getPage({"pageID": $scope.pageId}).$promise.then(
                    function (response) {
                        if (response.error === null) {
                            var result = response.result || getDefaultPage();
                            $scope.page = result;

                            // BREADCRUMBS
                            $scope.$emit("add-breadcrumbs", {"label": $scope.page.identifier, "url": $cmsPageService.getUrl($scope.page._id)});
                        } else {
                            $location.path("/");
                        }
                    }
                );

                $scope.getContent = function() {
                    return $sce.trustAsHtml($scope.page.content);
                };

            }
        ]
    );


};

