angular.module("visitorModule")

.controller("giftCardsController", [
	"$scope",
	"$location",
	"$giftCardsService",
	function($scope, $location, $giftCardsService) {

		// Sidebar, highlight active tab
		$scope.isActive = function(path) {
			return path == $location.path();
		}

		$scope.checkBalance = function() {
			$scope.searching = true;

			if ( $scope.giftcode ) {

				$giftCardsService.getBalance($scope.giftcode)
				.then(function(response) {

					$scope.searching = false;
					$scope.error = false;

					if (response.error && response.error.code == "dd7b2130-b5ed-4b26-b1fc-2d36c3bf147f") {
						$scope.error = "Invalid giftcard code";
					}
					$scope.giftcardDetails = response.result || false;
				});
			} else {
				$scope.searching = false;
				$scope.error = "Please enter a gift card code";

			}
		}
	}
]);