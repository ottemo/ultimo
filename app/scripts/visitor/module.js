(function (define) {
    "use strict";

    /**
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            "visitor/service/api",
            "visitor/service/login",

            "visitor/controller/login",
            "visitor/controller/logout",
            "visitor/controller/address",
            "visitor/controller/account",
            "visitor/controller/order"
        ],
        function (visitorModule) {

            return visitorModule;
        });

})(window.define);