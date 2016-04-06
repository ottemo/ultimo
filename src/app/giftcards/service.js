angular.module('giftCardsModule')

.factory('giftCardsService', [
    '$http',
    'REST_SERVER_URI',
    function($http, REST_SERVER_URI) {

        var service = {
            getBalance: getBalance,
            apply: apply,
        };

        return service;

        /////////////////////////

        // How much money is on this giftcard
        function getBalance(code) {
            return $http.get(REST_SERVER_URI + '/giftcards/' + code)
                .then(function(response) {
                    return response.data;
                });
        }

        // Attach the gift card to this session
        function apply(code) {
            return $http.get(REST_SERVER_URI + '/giftcards/' + code + '/apply')
                .then(function(response) {
                    return response.data;
                });
        }
    }
]);

