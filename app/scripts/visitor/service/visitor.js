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

            .service("$visitorService", ["$resource", "$visitorApiService", function ($resource, $visitorApiService) {

                var init, visitor, getVisitor, setVisitor, cleanVisitor;

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

                init = function () {
                    $visitorApiService.info().$promise.then(
                        function (response) {
                            if (response.error === "") {
                                setVisitor({
                                    "facebook_id": response.result.facebook_id,
                                    "google_id": response.result.google_id,
                                    "email": response.result.email,
                                    "fname": response.result.first_name,
                                    "lname": response.result.last_name
                                });
                            } else {
                                visitor = getDefaultVisitor();
                            }
                        }

                    );

                };
                init();

                visitor = getDefaultVisitor();

                setVisitor = function (obj) {
                    var field;
                    for (field in obj) {
                        if (!obj.hasOwnProperty(field)) {
                            continue;
                        }
                        visitor[field] = obj[field];
                    }
                };

                getVisitor = function () {
                    return visitor;
                };

                cleanVisitor = function () {
                    visitor = getDefaultVisitor();
                }

                return {
                    init: init,
                    cleanVisitor: cleanVisitor,
                    setVisitor: setVisitor,
                    getVisitor: getVisitor
                };
            }]);

        return productModule;
    });

})(window.define);