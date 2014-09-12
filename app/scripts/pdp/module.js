(function (define) {
    "use strict";

    /**
     *  Module contains general purpose directives and services used to render HTML page
     */
    define([
            "pdp/service/api",
            "pdp/service/product",

            "pdp/directive/guiCustomOptions",

            "pdp/controller"
        ],
        function (pdpModule) {

            return pdpModule;
        });

})(window.define);