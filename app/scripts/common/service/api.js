angular.module("commonModule")
    /*
     *  $productApiService interaction service
     */
    .service("$commonApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

        var methods = {
            "getProducts": {
                method: "GET",
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