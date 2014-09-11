(function (define) {
    "use strict";

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            "common/controllers",

            "common/service/api",
            "common/service/page",
            "common/service/header",
            "common/service/breadcrumbs",
            "common/service/sidebar",
            "common/service/rewrite"
        ],
        function (commonModule) {

            return commonModule;
        });

})(window.define);