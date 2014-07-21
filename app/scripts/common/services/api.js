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
            .service("$commonApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                var categoryBaseURL = REST_SERVER_URI;

                return $resource(categoryBaseURL, {}, {
                    "getProducts": {
                        method: "POST",
                        url: categoryBaseURL + "/product/list"
                    }
                });
            }]);

        return productModule;
    });

})(window.define);