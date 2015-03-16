(function (define) {
    "use strict";

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            "cart/service/api",
            "cart/service/cart",
            "cart/controller"
        ],
        function (cartModule) {

            return cartModule;
        });

})(window.define);