(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["cart/init"], function (cartModule) {
        cartModule
            /*
             *  $cartApiService interaction service
             */
            .service("$cartApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                var cartBaseURL = REST_SERVER_URI + "/cart";

                return $resource(cartBaseURL, {}, {
                    "add": {
                        method: "POST",
                        params: {
                            productId: "@productId",
                            qty: "@qty"
                        },
                        url: cartBaseURL + "/add/:productId/:qty"
                    },
                    "remove": {
                        method: "DELETE",
                        params: { itemIdx: "@itemIdx" },
                        url: cartBaseURL + "/delete/:itemIdx"
                    },
                    "info": {
                        method: "GET",
                        url: cartBaseURL + "/info"
                    },
                    "update": {
                        method: "PUT",
                        params: {
                            itemIdx: "@itemIdx",
                            qty: "@qty"
                        },
                        url: cartBaseURL + "/update/:itemIdx/:qty"
                    }
                });
            }]);

        return cartModule;
    });

})(window.define);