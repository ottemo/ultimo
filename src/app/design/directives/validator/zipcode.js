/**
 * Zip code validation directive
 */
angular.module('designModule')

.directive('otZipCode', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {

            var country;

            // Validators for each country
            var validators = {
                'US': /^\d{5}([-\s]\d{4})?$/,
                'CA': /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]\d[A-Za-z]\s\d[A-Za-z]\d$/
            };

            attr.$observe('otZipCodeLinkedCountry', function(val) {
                country = val;
                ctrl.$validate();
            });

            ctrl.$validators.otZipCode = function(modelValue, viewValue) {
                var value = viewValue || modelValue;
                var validator = validators[country];

                return (validator) ? validator.test(value) : true;
            }
        }
    }
});

