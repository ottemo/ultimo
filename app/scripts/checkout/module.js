(function (define) {
    "use strict";

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            "checkout/service/api",
            "checkout/controller"
        ],
        function (checkoutModule) {

            return checkoutModule;
        });

})(window.define);