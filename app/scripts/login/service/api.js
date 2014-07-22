(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["login/init"], function (productModule) {
        productModule
            /*
             *  $productApiService interaction service
             */
            .service("$loginApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                var loginBaseURL = REST_SERVER_URI + "/visitor";

                return $resource(loginBaseURL, {},
                    {
                        "register": {
                            method: "POST",
                            url: loginBaseURL + "/register"
                        },
                        "loginFacebook": {
                            method: "POST",
                            url: loginBaseURL + "/login-facebook"
                        },
                        "loginGoolge": {
                            method: "POST",
                            url: loginBaseURL + "/login-google"
                        },
                        "login": {
                            method: "POST",
                            url: loginBaseURL + "/login"
                        },
                        "info": {
                            method: "GET",
                            url: loginBaseURL + "/info"
                        },
                        "update": {
                            method: "PUT",
                            url: loginBaseURL + "/update"
                        }
                    });
            }]);

        return productModule;
    });

})(window.define);