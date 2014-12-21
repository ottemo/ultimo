(function (define) {
    "use strict";

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            "checkout/service/api",
            "checkout/service/checkout",
            "checkout/controller/onepage",
            "checkout/controller/accordion"
        ],
        function (checkoutModule) {

            return checkoutModule;
        });

})(window.define);