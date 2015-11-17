angular.module("pdpModule")
    .directive("guiCustomOptions", ["$designService", function($designService) {
        return {
            restrict: "E",
            scope: {
                "parent": "=object",
                "product": "=item"
            },
            templateUrl: $designService.getTemplate("pdp/gui/guiCustomOptions.html"),
            controller: function($scope) {

                $scope.selectFirstRadio = selectFirstRadio;
                $scope.toggleCheckbox = toggleCheckbox;
                $scope.tomorrowsDate = getTomorrowsDate();

                $scope.$watch("customOptionsForm", function() {
                    $scope.parent.customOptionsForm = $scope.customOptionsForm;
                }, true);

                ///////////////////////////

                function getTomorrowsDate() {
                    var today = new Date();
                    var tomorrow = new Date( today.getTime() + 24*60*60*1000 );
                    var dd = tomorrow.getDate();
                    var mm = tomorrow.getMonth()+1; //January is 0!
                    var yyyy = tomorrow.getFullYear();

                    if(dd<10) {
                        dd='0'+dd
                    }

                    if(mm<10) {
                        mm='0'+mm
                    }

                    return [yyyy,mm,dd].join('-');
                }

                // select first option for radio
                function selectFirstRadio(option) {
                    if (option.type === 'radio' && option.options[0]) {
                        $scope.parent.options[option.label] = option.options[0].label;
                    }
                }

                /**
                 * checkbox options want to be in the format
                 * {"Gift Card":["Gift Card"]}
                 */
                function toggleCheckbox(option) {

                    // See if we have any selected option Items
                    var selectedCheckboxes = []
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

