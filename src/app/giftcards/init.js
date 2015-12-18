angular.module("giftCardsModule", [])

.service("$giftCardsService", [
	"$http",
	"REST_SERVER_URI",
	function($http, REST_SERVER_URI) {

		// How much money is on this giftcard
		this.getBalance = function(code) {
			return $http.get(REST_SERVER_URI + "/giftcards/" + code)
			.then(function(response){
				return response.data;
			});
		}

		// Attach the gift card to this session
		this.apply = function(code) {
			return $http.get(REST_SERVER_URI + "/giftcards/" + code + "/apply")
			.then(function(response){
				return response.data;
			});
		}
	}
]);