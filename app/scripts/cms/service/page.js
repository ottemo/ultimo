(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["cms/init"], function (pdpModule) {
        pdpModule
            /*
             *  $productApiService interaction service
             */
            .service("$cmsPageService", [
                function () {
                    var getUrl;

                    getUrl = function(id) {
                        return "/page/" + id;
                    };

                    return {
                        "getUrl": getUrl
                    };
                }
            ]
        );

        return pdpModule;
    });

})(window.define);
