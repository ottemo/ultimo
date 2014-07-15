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
            .service("$pdpApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                var pdpBaseURL = REST_SERVER_URI + "/product";

                return $resource(pdpBaseURL, {}, {
                    "getProduct": {
                        method: "GET",
                        params: { id: "@id" },
                        url: pdpBaseURL + "/get/:id"
                    },
                    "getImagePath": {
                        method: "GET",
                        params: { productId: "@productId" },
                        url: pdpBaseURL + "/media/path/:productId/image"
                    },
                    "listImages": {
                        method: "GET",
                        params: { productId: "@productId" },
                        url: pdpBaseURL + "/media/list/:productId/image"
                    }
                });
            }]);

        return pdpModule;
    });

})(window.define);