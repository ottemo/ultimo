(function (define) {
    "use strict";

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            "visitor/service/api",
            "visitor/service/visitor",

            "visitor/controller/registration",
            "visitor/controller/account",
            "visitor/controller/login"
        ],
        function (visitorModule) {

            return visitorModule;
        });

})(window.define);