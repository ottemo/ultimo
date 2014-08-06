(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["checkout/init"], function (checkoutModule) {
        checkoutModule
            /*
             *  $checkoutApiService interaction service
             */
            .service("$checkoutApiService", [
                "$resource",
                "REST_SERVER_URI",
                function ($resource, REST_SERVER_URI) {

                    var checkoutBaseURL = REST_SERVER_URI + "/checkout";

                    return $resource(checkoutBaseURL, {}, {
        /*            "add": {
                        method: "POST",
                        params: {
                            productId: "@productId",
                            qty: "@qty"
                        },
                        url: checkoutBaseURL + "/add/:productId/:qty"
                    },
                    "remove": {
                        method: "DELETE",
                        params: { itemIdx: "@itemIdx" },
                        url: checkoutBaseURL + "/delete/:itemIdx"
                    },
                    "info": {
                        method: "GET",
                        url: checkoutBaseURL + "/info"
                    },
                    "update": {
                        method: "PUT",
                        params: {
                            itemIdx: "@itemIdx",
                            qty: "@qty"
                        },
                        url: checkoutBaseURL + "/update/:itemIdx/:qty"
                    }*/
                        "shippingMethod": {
                            method: "GET",
                            url: checkoutBaseURL + "/shipping/methods"
                        },
                        "paymentMethod": {
                            method: "GET",
                            url: checkoutBaseURL + "/payment/methods"
                        },
                        "totals": {
                            method: "GET",
                            url: checkoutBaseURL + "/totals"
                        },
                        "submit": {
                            method: "POST",
                            url: checkoutBaseURL + "/submit"
                        },
                        "getAddresses": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visitor/address/list"
                        },
                        "info": {
                            method: "GET",
                            url: REST_SERVER_URI + "/cart/info"
                        }
                    });
                }
            ]);

        return checkoutModule;
    });

})(window.define);