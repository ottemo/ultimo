(function (define) {
    "use strict";

    /**
     *
     */
    define(["design/init"], function (designModule) {

        designModule
            /*
             *  $designApiService interaction service
             */
            .service("$designApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {


                return $resource(REST_SERVER_URI, {}, {
                    "getActiveTheme": {
                        method: "GET",
                        params: { path: "@path" },
                        url: REST_SERVER_URI + "/config/value/:path"
                    }
                });
            }]);

        return designModule;
    });

})(window.define);