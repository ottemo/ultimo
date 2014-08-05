(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["visitor/init"], function (productModule) {
        productModule
            /*
             *  $productApiService interaction service
             */
            .service("$visitorApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                var visitorBaseURL = REST_SERVER_URI + "/visitor";

                return $resource(visitorBaseURL, {},
                    {
                        "update": {
                            method: "PUT",
                            url: visitorBaseURL + "/update"
                        },
                        "getAddresses": {
                            method: "GET",
                            params: {visitorId: "@visitorId"},
                            url: visitorBaseURL + "/address/list/:visitorId"
                        },
                        "addressUpdate":{
                            method: "PUT",
                            params: {id: "@id"},
                            url: visitorBaseURL + "/address/update/:id"
                        },
                        "saveAddress": {
                            method: "POST",
                            url: visitorBaseURL + "/address/create"
                        },
                        "loadAddress": {
                            method: "GET",
                            params: {id: "@id"},
                            url: visitorBaseURL + "/address/load/:id"
                        },
                        "deleteAddress": {
                            method: "DELETE",
                            params: { id: "@id" },
                            url: visitorBaseURL + "/address/delete/:id"
                        }
                    });
            }]);

        return productModule;
    });

})(window.define);