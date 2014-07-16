(function (define) {
    "use strict";

    define(["design/init"], function (designModule) {

        designModule.directive("guiPaginator", ["$location", "$designService", function ($location, $designService) {
            return {
                restrict: "E",
                scope: {
                    "parent": "=object"
                },
                templateUrl: $designService.getTemplate("design/gui/guiPaginator.html"),
                controller: function ($scope) {
                    /**
                     * Prepares array of pages
                     *
                     * @returns {Array}
                     */
                    $scope.getPages = function () {
                        var p, result;
                        result = [];
                        for (p = 1; p <= $scope.parent.pages; p += 1) {
                            result.push(p);
                        }
                        return result;
                    }

                    /**
                     * Gets class for item of paginator
                     *
                     * @param {string} page
                     * @returns {string}
                     */
                    $scope.getClass = function (page) {
                        var _class;
                        _class = "";
                        switch (page){
                            case "prev":
                                if($scope.parent.currentPage === 0){
                                    _class = "disabled";
                                }
                                break;
                            case "next":
                                if($scope.parent.currentPage + 1 >= $scope.parent.pages){
                                    _class = "disabled";
                                }
                                break;
                            default:
                                if (page === parseInt($scope.parent.currentPage) + 1) {
                                    _class = "active";
                                }
                        }

                        return _class;
                    };

                    /**
                     * Gets URI for item of paginator
                     *
                     * @param {string} page
                     * @returns {string}
                     */
                    $scope.getURI = function(page){
                        var _page;
                        _page = 1;
                        switch (page){
                            case "prev":
                                if($scope.parent.currentPage !== 0){
                                    _page = $scope.parent.currentPage;
                                }
                                break;
                            case "next":
                                if($scope.parent.currentPage < $scope.parent.pages - 1){
                                    _page = $scope.parent.currentPage + 2;
                                } else {
                                    _page = $scope.parent.pages;
                                }
                                break;
                            default:
                                _page = page;
                        }
                        return $scope.parent.uri.replace(":page",_page);
                    };
                }
            };
        }])

        return designModule;
    });
})(window.define);
