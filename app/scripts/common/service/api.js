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
            .service("$commonApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                var categoryBaseURL = REST_SERVER_URI;

                return $resource(categoryBaseURL, {}, {
                    "getProducts": {
                        method: "POST",
                        url: categoryBaseURL + "/product/list"
                    },
                    "getCategories": {
                        method: "GET",
                        url: categoryBaseURL + "/category/tree"
                    }
                });
            }]);

        return commonModule;
    });

})(window.define);