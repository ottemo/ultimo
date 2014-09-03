(function (define, $) {
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
                "$cmsApiService",
                "$cmsPageService",
                "$commonPageService",
                function ($scope, $routeParams, $location, $cmsApiService, $cmsPageService, $commonPageService) {
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
                                $commonPageService.setMetaDescription($scope.page.meta_description);
                                $commonPageService.setMetaKeywords($scope.page.meta_keywords);

                                // BREADCRUMBS
                                $scope.$emit("add-breadcrumbs", {"label": $scope.page.identifier, "url": $cmsPageService.getUrl($scope.page._id)});
                            } else {
                                $location.path("/");
                            }
                        }
                    );

                }
            ]
        );

        return cmsModule;
    });
})(window.define, jQuery);