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
                        "register": {
                            method: "POST",
                            url: visitorBaseURL + "/register"
                        },
                        "loginFacebook": {
                            method: "POST",
                            url: visitorBaseURL + "/login-facebook"
                        },
                        "loginGoolge": {
                            method: "POST",
                            url: visitorBaseURL + "/login-google"
                        },
                        "login": {
                            method: "POST",
                            url: visitorBaseURL + "/login"
                        },
                        "info": {
                            method: "GET",
                            url: visitorBaseURL + "/info"
                        }
                    });
            }]);

        return productModule;
    });

})(window.define);