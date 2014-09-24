(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["category/init"], function (productModule) {
        productModule
            /*
             *  $productApiService interaction service
             */
            .service("$categoryApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                var categoryBaseURL = REST_SERVER_URI + "/category";

                return $resource(categoryBaseURL, {}, {
                    "getProducts": {
                        method: "GET",
                        params: { id: "@id" },
                        url: categoryBaseURL + "/product/list/:id"
                    },
                    "load": {
                        method: "GET",
                        params: { id: "@id" },
                        url: categoryBaseURL + "/get/:id"
                    },
                    "getCountProducts": {
                        method: "GET",
                        params: { id: "@id" },
                        url: categoryBaseURL + "/product/count/:id"
                    },
                    "getPath":{
                        method: "GET",
                        params: {
                            productId: "@productId",
                            mediaType: "@mediaType"
                        },
                        url: REST_SERVER_URI + "/product/media/path/:productId/:mediaType"
                    },
                    "getCategories": {
                        method: "GET",
                        url: categoryBaseURL + "/tree"
                    },
                    "getLayered": {
                        method: "GET",
                        params: { id: "@id" },
                        url: categoryBaseURL + "/layers/:id"
                    }
                });
            }]);

        return productModule;
    });

})(window.define);