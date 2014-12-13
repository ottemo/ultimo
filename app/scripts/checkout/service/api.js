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
                        "shippingMethod": {
                            method: "GET",
                            url: checkoutBaseURL + "/shipping/methods"
                        },
                        "setShippingMethod": {
                            method: "POST",
                            params: {
                                method: "@method",
                                rate: "@rate"
                            },
                            url: checkoutBaseURL + "/set/shipping/method/:method/:rate"
                        },
                        "paymentMethod": {
                            method: "GET",
                            url: checkoutBaseURL + "/payment/methods"
                        },
                        "setPaymentMethod": {
                            method: "POST",
                            params: {
                                method: "@method"
                            },
                            url: checkoutBaseURL + "/set/payment/method/:method"
                        },
                        "setShippingAddress": {
                            method: "POST",
                            url: checkoutBaseURL + "/set/shipping/address"
                        },
                        "setBillingAddress": {
                            method: "POST",
                            url: checkoutBaseURL + "/set/billing/address"
                        },
                        "setInfo": {
                            method: "POST",
                            url: checkoutBaseURL + "/set/info"
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
                            url: checkoutBaseURL + "/info"
                        },
                        "save": {
                            method: "POST",
                            url: checkoutBaseURL + "/submit"
                        },
                        "discountApply": {
                            method: "GET",
                            params: {
                                code: "@code"
                            },
                            url: REST_SERVER_URI + "/discount/apply/:code"
                        },
                        "discountNeglect": {
                            method: "GET",
                            params: {
                                code: "@code"
                            },
                            url: REST_SERVER_URI + "/discount/neglect/:code"
                        }
                    });
                }
            ]);

        return checkoutModule;
    });

})(window.define);