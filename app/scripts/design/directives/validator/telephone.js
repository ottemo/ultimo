angular.module('designModule')

// Telephone validation directive
.directive('otTelephone', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            country: '=otTelephoneLinkedCountry'
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
                    //TODO: EXPLAIN PARTS
                    re: /^(\+?\d{1,3})?[- ]?\(?(\d{3})\)?[- ]?((?:\d{3})-?(?:\d{2})-?(?:\d{2}))$/,
                    msg: 'Phone numbers should be in the format (###) ###-####'
                }
                // Other countries can be added here
            }

            // Default validation error message
            var invalidMsg = 'This field is not valid';

            ngModel.$validators.validateTelephone = function (modelValue, viewValue) {

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