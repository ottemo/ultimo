angular.module("designModule")

    // New Password Directive
    .directive("otPassword2", function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, elem, attrs, ngModel) {

                var minLen = 8,
                    maxLen = 18,
                    minCountUppercase = 1,
                    minCountLowercase = 1,
                    minCountNumbers = 1,
                    minCountSymbols = 1;

                ngModel.rules = {
                    "length": "Your password may be any combination of " + minLen + " to " + maxLen + " characters.",
                    "uppercase": "It must contain at least " + minCountUppercase + " uppercase letter.",
                    "lowercase": "It must contain at least " + minCountLowercase + " lowercase letter.",
                    "number": "It must contain at least " + minCountNumbers + " number.",
                    "symbol": "It must contain at least " + minCountSymbols + " of following special characters: (!, @, #, $, &, *)."
                };

                var checkLowercases = function (value) {
                    var matches = value.match(/([a-z]+)/g);
                    return (matches === null || (matches !== null && matches.join("").length < minCountLowercase));
                };
                var checkUppercases = function (value) {
                    var matches = value.match(/([A-Z]+)/g);
                    return (matches === null || (matches !== null && matches.join("").length < minCountUppercase));
                };
                var checkNumbers = function (value) {
                    var matches = value.match(/([\d]+)/g);
                    return (matches === null || (matches !== null && matches.join("").length < minCountNumbers));
                };
                var checkSymbols = function (value) {
                    var matches = value.match(/([\!\@\#\\$\%\^\&\*\(\)\_\+\-\~]+)/g);
                    return (matches === null || (matches !== null && matches.join("").length < minCountSymbols));
                };

                var validate = function (value) {                    /*jshint maxcomplexity:7 */
                    if (!value) { return value; }
                    ngModel.invalids = [];
                    var valid = true;
                    if (!(value.length >= minLen && value.length < maxLen)) {
                        valid = false;
                        ngModel.invalids['length'] = true;
                    }
                    if (checkLowercases(value)) {
                        valid = false;
                        ngModel.invalids['lowercase'] = true;
                    }
                    if (checkUppercases(value)) {
                        valid = false;
                        ngModel.invalids['uppercase'] = true;
                    }
                    if (checkNumbers(value)) {
                        valid = false;
                        ngModel.invalids['number'] = true;
                    }
                    if (checkSymbols(value)) {
                        valid = false;
                        ngModel.invalids['symbol'] = true;
                    }
                    ngModel.$setValidity('ot-password2', valid);
                    return value;
                };

                //For DOM -> model validation
                ngModel.$parsers.unshift(validate);
                //For model -> DOM validation
                ngModel.$formatters.unshift(validate);
            }
        };
    });
