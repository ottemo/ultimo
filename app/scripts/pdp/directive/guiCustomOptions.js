(function (define) {
    "use strict";

    define(["pdp/init"], function (pdpModule) {

        pdpModule.directive("guiCustomOptions", ["$designService", function ($designService) {
            return {
                restrict: "E",
                scope: {
                    "parent": "=object",
                    "product": "=item"
                },
                templateUrl: $designService.getTemplate("pdp/gui/guiCustomOptions.html"),
                controller: function ($scope) {
                    $scope.optionName = "";
                    $scope.options = {};

                    $scope.setOptionName = function (name) {
                        $scope.optionName = name;
                    };

                    // TODO: reduce the below function's cyclomatic complexity and remove jshint comment
                    $scope.$watch("options", function () {          //jshint ignore:line
                        if (typeof $scope.parent.options[$scope.optionName] !== "undefined") {
                            $scope.parent.options[$scope.optionName] = [];
                        }
                        for (var field in $scope.options) {
                            if ($scope.options.hasOwnProperty(field) && $scope.options[field]) {
                                if (typeof $scope.parent.options[$scope.optionName] === "undefined") {
                                    $scope.parent.options[$scope.optionName] = [];
                                }
                                $scope.parent.options[$scope.optionName].push(field);
                            }
                        }
                        if (typeof $scope.parent.options[$scope.optionName] !== "undefined" &&
                            $scope.parent.options[$scope.optionName].length <= 0) {
                            delete $scope.parent.options[$scope.optionName];
                        }
                    }, true);

                    $scope.$watch("customOptionsForm", function () {
                        $scope.parent.customOptionsForm = $scope.customOptionsForm;

                    }, true);
                }
            };
        }])
            .filter('getOrdered', function () {
                return function (input) {
                    var ordered = {};
                    for (var key in input) {
                        if (input.hasOwnProperty(key)) {

                            ordered[input[key].order] = input[key];
                        }
                    }

                    return ordered;
                };
            });

        return pdpModule;
    });
})(window.define);
