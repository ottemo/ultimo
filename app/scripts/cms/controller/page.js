(function (define) {
    "use strict";

    define(["cms/init"], function (cmsModule) {

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
                function ($scope, $routeParams, $location, $sce, $cmsApiService, $cmsPageService, $commonPageService) {
                    var getDefaultPage;

                    getDefaultPage = function () {
                        return {};
                    };

                    $scope.pageId = $routeParams.id;

                    $scope.page = getDefaultPage();

                    $cmsApiService.getPage({"id": $scope.pageId}).$promise.then(
                        function (response) {
                            if (response.error === "") {
                                var result = response.result || getDefaultPage();
                                $scope.page = result;

                                $commonPageService.setTitle($scope.page.title);
                                $commonPageService.setMetaDescription($scope.page.meta_description);    //jshint ignore:line    
                                $commonPageService.setMetaKeywords($scope.page.meta_keywords);  //jshint ignore:line    

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

        return cmsModule;
    });
})(window.define);
