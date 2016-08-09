angular.module("visitorModule")

.controller("visitorAccountGiftCardsController", [
    "$scope",
    "$location",
    "giftCardsService",
    function($scope, $location, giftCardsService) {

        $scope.giftcode = '';

        ////////////////////////

        $scope.checkBalance = function() {
            if (!$scope.searching) {
                $scope.searching = true;

                giftCardsService.getBalance($scope.giftcode)
                    .then(function(response) {

                        $scope.searching = false;
                        $scope.error = false;

                        if (response.error && response.error.code === "dd7b2130-b5ed-4b26-b1fc-2d36c3bf147f") {
                            $scope.error = "Invalid giftcard code";
                        }
                        $scope.giftcardDetails = response.result || false;
                    });
            }
        };

        // REFACTOR
        // Sidebar, highlight active tab
        $scope.isActive = function(path) {
            return path === $location.path();
        }
    }
]);

