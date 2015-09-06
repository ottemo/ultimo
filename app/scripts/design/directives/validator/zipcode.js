angular.module('designModule')

// Zip code validation directive
.directive('otZipCode', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            country: '=otZipCodeLinkedCountry'
        },
        link: function(scope, elem, attrs, ngModel) {

            scope.$watch('country', function() {
                ngModel.$validate();
            });

            // Validators for each country
            // consist of regular expression
            // and optional validation error message
            var validators = {
                'US': {
                    re: /^\d{5}([-\s]\d{4})?$/,
                    msg: 'The code must be in format XXXXX-XXXX'
                },
                'CA': {
                    re: /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]\d[A-Za-z]\s\d[A-Za-z]\d$/,
                    msg: 'The code must be in format X1X 1X1'
                }
            }

            // Default validation error message
            var invalidMsg = 'This field is not valid';

            ngModel.$validators.validateZipCode = function (modelValue, viewValue) {

                var value = viewValue || modelValue;
                var validator = validators[scope.country];

                // Set validity state to true if
                // no validator specified for current country
                // or value matches regular expression
                var isValid = (validator) ? validator.re.test(value) : true;

                if (!isValid) {
                    ngModel.message = validator.msg || invalidMsg;
                }

                return isValid;
            }
        }
    }
});