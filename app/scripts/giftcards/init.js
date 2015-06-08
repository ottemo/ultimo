angular.module("giftCardsModule", [])

.service("$giftCardsService", [
	"$http",
	"REST_SERVER_URI",
	function($http, REST_SERVER_URI) {

		this.getBalance = function(code) {
			return $http.get(REST_SERVER_URI + "/giftcard/" + code)
			.then(function(response){
				return response.data;
			});
		}

		this.apply = function(code) {
			return $http.get(REST_SERVER_URI + "/giftcard/" + code)
			.then(function(response){
				return response.data;
			});
		}
	}
]);