(function (define) {
    "use strict";

    /**
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            "filters/trustedUrl"
        ],
        function (filtersModule) {

            return filtersModule;
        });

})(window.define);
