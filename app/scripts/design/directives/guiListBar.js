module.exports = function (designModule) {

    designModule.directive("guiListBar", ["$designService", function ($designService) {
        return {
            restrict: "E",
            scope: {
                "parent": "=object",
                "items": "=items"
            },
            templateUrl: $designService.getTemplate("design/gui/guiListBar.html"),
            controller: function ($scope) {
                $scope.blocks = {
                    "sort": false,
                    "search": false,
                    "filter": false
                };

                $scope.toggleBlock = function (block) {
                    return $scope.blocks[block] ? $scope.blocks[block] = false : $scope.blocks[block] = true;
                };


            }
        };
    }]);

};
