(function (define) {
    "use strict";

    /**
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            "./init",
            "./controller/address",
            "./controller/login",
            "./controller/logout"
        ],
        function (visitorModule) {

            return visitorModule;
        });

})(window.define);