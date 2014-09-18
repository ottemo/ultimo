(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["common/init"], function (commonModule) {

        commonModule
            /*
             *  $productApiService interaction service
             */
            .service("$commonUtilService", function () {
                var cloneObj;

                cloneObj = function (obj) {
                    if (null === obj || "object" !== typeof obj) {
                        return obj;
                    }
                    var copy = obj.constructor();
                    for (var attr in obj) {
                        if (obj.hasOwnProperty(attr)) {
                            copy[attr] = obj[attr];
                        }
                    }
                    return copy;
                };

                return {
                    "clone": cloneObj
                };
            }
        );

        return commonModule;
    });

})(window.define);