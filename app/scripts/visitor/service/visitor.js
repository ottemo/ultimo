(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define([
        "category/init",
        "visitor/service/facebook",
        "visitor/service/google"
    ], function (productModule, fb, gl) {
        productModule
            /*
             *  $productApiService interaction service
             */

            .service("$visitorService", ["$resource", "$visitorApiService", "VISITOR_DEFAULT_AVATAR", function ($resource, $visitorApiService, VISITOR_DEFAULT_AVATAR) {

                var init, visitor, visitorId, getVisitor, getVisitorId, setVisitor, cleanVisitor, getAvatar, getFullName;

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

                init = function () {
                    $visitorApiService.info().$promise.then(
                        function (response) {
                            if (response.error === "") {
                                visitorId = response.result._id  || "";
                                setVisitor({
                                    "facebook_id": response.result.facebook_id || "",
                                    "google_id": response.result.google_id || "",
                                    "email": response.result.email || "",
                                    "fname": response.result.first_name || "",
                                    "lname": response.result.last_name || "",
                                    "billing_address_id": response.result.billing_address && response.result.billing_address._id || "",
                                    "shipping_address_id": response.result.shipping_address && response.result.shipping_address._id || "",

                                    "billing_address": response.result.billing_address || "",
                                    "shipping_address": response.result.shipping_address || ""
                                });
                            }
                        }
                    );
                };

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
                };

                getAvatar = function () {
                    var avatar;
                    avatar = VISITOR_DEFAULT_AVATAR;
                    console.log(avatar);
                    if (visitor.facebook_id !== "") {
                        avatar = "http://" + fb.getAvatar(visitor.facebook_id, "large");
                    } else if (visitor.google_id !== "") {
                        avatar = gl.getAvatar(visitor.google_id);
                    }
                    console.log(avatar);
                    return avatar;
                };

                getFullName = function () {
                    return visitor.fname + " " + visitor.lname;
                };

                getVisitorId = function(){
                    return visitorId;
                }


                return {
                    init: init,
                    cleanVisitor: cleanVisitor,
                    setVisitor: setVisitor,
                    getVisitor: getVisitor,
                    getAvatar: getAvatar,
                    getFullName: getFullName,
                    getVisitorId: getVisitorId
                };
            }]);

        return productModule;
    });

})(window.define);