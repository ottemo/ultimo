angular.module("coreModule")
    .directive("otLen", function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elem, attrs, ngModel) {

                var stringToShort = "Text length does not satisfy specified text range.";
                var stringToLong = "Text length does not satisfy specified text range.";

                var params = elem.attr('ot-len').split(",");
                var validate = function (value) {
                    var valid;
                    if (params.length === 1 && typeof value !== "undefined" && value.length !== parseInt(params[0], 10)) {
                        ngModel.message = stringToShort;
                        valid = false;
                    } else {
                        if (typeof value !== "undefined" &&
                            value.length < parseInt(params[0], 10)) {
                            ngModel.message = stringToShort;
                            valid = false;
                        } else if (typeof value !== "undefined" && value.length > parseInt(params[1], 10)) {
                            ngModel.message = stringToLong;
                            valid = false;
                        } else {
                            valid = true;
                            ngModel.message = "";
                        }
                    }

                    ngModel.$setValidity('ot-len', valid);
                    return valid ? value : undefined;
                };

                //For DOM -> model validation
                ngModel.$parsers.unshift(validate);
                //For model -> DOM validation
                ngModel.$formatters.unshift(validate);
            }
        };
    });