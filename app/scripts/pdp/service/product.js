(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["pdp/init"], function (pdpModule) {
        pdpModule
            /*
             *  $productApiService interaction service
             */
            .service("$pdpProductService", [
                "$commonRewriteService",
                function ($commonRewriteService) {
                    var type;
                    var getUrl;

                    type = "product";

                    getUrl = function (id) {
                        var url;
                        url = $commonRewriteService.getRewrite(type, id);

                        if (!url) {
                            url = type + "/" + id;
                        }

                        return "#/" + url;
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
