(function (define) {
    "use strict";

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            "common/controllers",

            "common/service/api",
            "common/service/header",
            "common/service/sidebar"
        ],
        function (commonModule) {

            return commonModule;
        });

})(window.define);