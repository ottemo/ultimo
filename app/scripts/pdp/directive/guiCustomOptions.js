angular.module("pdpModule")
    .directive("guiCustomOptions", ["$designService", function ($designService) {
        return {
            restrict: "E",
            scope: {
                "parent": "=object",
                "product": "=item"
            },
            templateUrl: $designService.getTemplate("pdp/gui/guiCustomOptions.html"),
            controller: function ($scope) {
                var prepareOptions;

                $scope.optionName = "";
                $scope.options = {};

                $scope.init = function (option) {
                    if(option.type === 'radio'){ // select first option for radio
                        var firstObj = option.options[Object.keys(option.options)[0]];
                        if(firstObj){
                            $scope.parent.options[option.label] = firstObj.label;
                        }
                    }
                    $scope.optionName = option.label;
                };

                $scope.getClass = function(option){
                    return option.label.toLowerCase().replace(/ /g,"-").replace(/[^a-z0-9-]/g, "");
                };

                prepareOptions = function () {
                    var removeEmptyOptions;

                    removeEmptyOptions = function () {
                        if (typeof $scope.parent.options[$scope.optionName] !== "undefined" &&
                            $scope.parent.options[$scope.optionName].length <= 0) {
                            delete $scope.parent.options[$scope.optionName];
                        }
                    };

                    for (var field in $scope.options) {
                        if ($scope.options.hasOwnProperty(field) && $scope.options[field]) {
                            if (typeof $scope.parent.options[$scope.optionName] === "undefined") {
                                $scope.parent.options[$scope.optionName] = [];
                            }
                            $scope.parent.options[$scope.optionName].push(field);
                        }
                    }

                    removeEmptyOptions();
                };

                $scope.$watch("options", function () {
                    if (typeof $scope.parent.options[$scope.optionName] !== "undefined") {
                        $scope.parent.options[$scope.optionName] = [];
                    }

                    prepareOptions();
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