angular.module("commonModule")

    .service("commonApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

        var methods = {
            "getRewriteUrls": {
                method: "GET",
                url: REST_SERVER_URI + "/seo/items"
            }
        };

        return $resource(REST_SERVER_URI, {}, methods);
    }]
);