(function (define) {
    "use strict";

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
           "./init",
           "./controller"
        ],
        function (commonModule) {

            return commonModule;
        });

})(window.define);