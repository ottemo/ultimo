(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define([
        "common/init"
    ], function (commonModule) {

        commonModule
            /*
             *  $productApiService interaction service
             */
            .service("$commonApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                var methods = {
                    "getProducts": {
                        method: "POST",
                        url: REST_SERVER_URI + "/products"
                    },
                    "getCategories": {
                        method: "GET",
                        url: REST_SERVER_URI + "/categories/tree"
                    },
                    "getRewriteUrls": {
                        method: "GET",
                        url: REST_SERVER_URI + "/seo/items"
                    }
                };

                return $resource(REST_SERVER_URI, {}, methods);
            }]
        );

        return commonModule;
    });

})(window.define);