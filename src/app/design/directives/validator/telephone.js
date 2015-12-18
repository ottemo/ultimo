/**
 * Telephone validation directive
 */
angular.module('designModule')

.directive('otTelephone', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {

            var country;

            // Validators for each country consist of regular expression
            var validators = {
                //todo: regex explained
                'US': /^(\+?\d{1,3})?[- ]?\(?(\d{3})\)?[- ]?((?:\d{3})-?(?:\d{2})-?(?:\d{2}))$/
            };

            attr.$observe('otTelephoneLinkedCountry', function(val) {
                country = val;
                ctrl.$validate();
            });

            ctrl.$validators.otTelephone = function(modelValue, viewValue) {
                var value = viewValue || modelValue;
                var validator = validators[country];

                return (validator) ? validator.test(value) : true;
            }
        }
    }
});

