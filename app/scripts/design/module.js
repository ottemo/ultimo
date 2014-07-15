(function (define) {
    "use strict";

    /*
     *  Module contains general purpose directives and services used to render HTML page
     *  (make sure module present in main.js requireJS list)
     */
    define([
            "design/services",

            "design/directives/guiListBar",
            "design/directives/design"
        ],
        function (designModule) {

            return designModule;
        });

})(window.define);