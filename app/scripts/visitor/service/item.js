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
            .service("$visitorService", ["$resource", function ($resource) {

                var visitor, getVisitor, setVisitor;

                var getDefaultVisitor = function () {
                    return {
                        "facebook_id": "",
                        "google_id": "",
                        "email": "",
                        "fname": "",
                        "lname": "",
                        "password": ""
                    };
                };

                visitor = getDefaultVisitor();

                setVisitor = function (obj) {
                    visitor = obj || getDefaultVisitor();
                };

                getVisitor = function () {
                    return visitor;
                }

                return {
                    setVisitor: setVisitor,
                    getVisitor: getVisitor
                };
            }]);

        return productModule;
    });

})(window.define);