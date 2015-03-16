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

                    return $resource(REST_SERVER_URI, {}, {
                        "shippingMethods": {
                            method: "GET",
                            url: REST_SERVER_URI + "/checkout/shipping/methods"
                        },
                        "setShippingMethod": {
                            method: "PUT",
                            params: {
                                method: "@method",
                                rate: "@rate"
                            },
                            url: REST_SERVER_URI + "/checkout/shipping/method/:method/:rate"
                        },
                        "paymentMethods": {
                            method: "GET",
                            url: REST_SERVER_URI + "/checkout/payment/methods"
                        },
                        "setPaymentMethod": {
                            method: "PUT",
                            params: {
                                method: "@method"
                            },
                            url: REST_SERVER_URI + "/checkout/payment/method/:method"
                        },
                        "setShippingAddress": {
                            method: "PUT",
                            url: REST_SERVER_URI + "/checkout/shipping/address"
                        },
                        "setBillingAddress": {
                            method: "PUT",
                            url: REST_SERVER_URI + "/checkout/billing/address"
                        },
                        "setInfo": {
                            method: "PUT",
                            url: REST_SERVER_URI + "/checkout"
                        },
                        "submit": {
                            method: "POST",
                            url: REST_SERVER_URI + "/checkout/submit"
                        },
                        "getAddresses": {
                            method: "GET",
                            url: REST_SERVER_URI + "/visit/addresses"
                        },
                        "info": {
                            method: "GET",
                            url: REST_SERVER_URI + "/checkout"
                        },
                        "save": {
                            method: "POST",
                            url: REST_SERVER_URI + "/checkout/submit"
                        },
                        "discountApply": {
                            method: "GET",
                            url: REST_SERVER_URI + "/discount/:coupon/apply"
                        },
                        "discountNeglect": {
                            method: "GET",
                            url: REST_SERVER_URI + "/discount/:coupon/neglect"
                        }
                    });
                }
            ]);

        return checkoutModule;
    });

})(window.define);