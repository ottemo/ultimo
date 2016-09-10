angular.module('giftCardsModule')

    .service('giftcardsApiService', [
        "$resource",
        'REST_SERVER_URI',
        function($resource, REST_SERVER_URI) {

            return $resource(REST_SERVER_URI, {}, {
                // How much money is on this giftcard
                "getBalance": {
                    method: "GET",
                    url: REST_SERVER_URI + "/giftcards/:giftcode"
                },
                // Attach the gift card to this session
                "apply": {
                    method: "POST",
                    params: {
                        giftcode: "@giftcode"
                    },
                    url: REST_SERVER_URI + "/cart/giftcards/:giftcode"
                },
                // Remove giftcard from checkout
                "remove": {
                    method: "DELETE",
                    url: REST_SERVER_URI + "/cart/giftcards/:giftcode"
                },

            });
        }
    ]);

