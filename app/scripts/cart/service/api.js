angular.module("cartModule")

    /*
     *  $cartApiService interaction service
     */
    .service("$cartApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

        return $resource(REST_SERVER_URI, {}, {
            "add": {
                method: "POST",
                url: REST_SERVER_URI + "/cart/item"
            },
            "remove": {
                method: "DELETE",
                params: {itemIdx: "@itemIdx"},
                url: REST_SERVER_URI + "/cart/item/:itemIdx"
            },
            "info": {
                method: "GET",
                url: REST_SERVER_URI + "/cart"
            },
            "update": {
                method: "PUT",
                params: {
                    itemIdx: "@itemIdx",
                    qty: "@qty"
                },
                url: REST_SERVER_URI + "/cart/item/:itemIdx/:qty"
            }
        });
    }]);
