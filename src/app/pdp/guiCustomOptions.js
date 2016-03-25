angular.module('pdpModule')

    .directive('guiCustomOptions', [function() {
        return {
            restrict: 'E',
            scope: {
                'parent': '=object',
                'product': '=item'
            },
            templateUrl: '/views/pdp/guiCustomOptions.html',
            controller: function($scope) {

                $scope.selectFirstRadio = selectFirstRadio;
                $scope.toggleCheckbox = toggleCheckbox;
                $scope.todaysDate = new Date();

                $scope.$watch('customOptionsForm', function() {
                    $scope.parent.customOptionsForm = $scope.customOptionsForm;
                }, true);

                ///////////////////////////

                // select first option for radio
                function selectFirstRadio(option) {
                    if (option.type === 'radio' && option.options[0]) {
                        $scope.parent.options[option.label] = option.options[0].label;
                    }
                }

                /**
                 * checkbox options want to be in the format
                 * {'Gift Card':['Gift Card']}
                 */
                function toggleCheckbox(option) {

                    // See if we have any selected option Items
                    var selectedCheckboxes = [];
                    angular.forEach(option.options, function(optionItem) {
                        if (optionItem.selected) {
                            selectedCheckboxes.push(optionItem.label);
                        }
                    });

                    // If we have any selected boxes save them out
                    if (selectedCheckboxes.length) {
                        $scope.parent.options[option.label] = selectedCheckboxes;
                    } else {
                        // Otherwise remove the whole option
                        delete $scope.parent.options[option.label];
                    }
                }
            }
        };
    }]);

