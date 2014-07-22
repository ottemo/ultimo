(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define([
        "category/init",
        "login/service/facebook",
        "login/service/google"
    ], function (productModule, fb, gl) {
        productModule
            /*
             *  $productApiService interaction service
             */

            .service("$loginService", ["$resource", "$loginApiService", "VISITOR_DEFAULT_AVATAR", "$q", function ($resource, $loginApiService, VISITOR_DEFAULT_AVATAR, $q) {

                var init, login, loginId, getLogin, getLoginId, setLogin, cleanLogin, getAvatar, getFullName, isLoggedIn, f_isLoggedIn, getDefaultLogin;

                isLoggedIn = null;
                var deferIsLoggedIn = $q.defer();

                getDefaultLogin = function () {
                    return {
                        "facebook_id": "",
                        "google_id": "",
                        "billing_address_id": "",
                        "shipping_address_id": "",
                        "email": "",
                        "fname": "",
                        "lname": "",
                        "password": "",
                        "billing_address": {},
                        "shipping_address": {}
                    };
                };

                login = getDefaultLogin();

                init = function () {
                    $loginApiService.info().$promise.then(
                        function (response) {
                            if (response.error === "") {
                                loginId = response.result._id || "";
                                if (loginId !== "") {
                                    isLoggedIn = true;
                                    deferIsLoggedIn.resolve(isLoggedIn);
                                }
                                setLogin({
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
                            } else {

                                isLoggedIn = false;
                                cleanLogin();
                                deferIsLoggedIn.resolve(isLoggedIn);
                            }
                        }
                    );

                    return deferIsLoggedIn.promise;
                };

                setLogin = function (obj) {
                    var field;
                    for (field in obj) {
                        if (!obj.hasOwnProperty(field)) {
                            continue;
                        }
                        login[field] = obj[field];
                    }
                };

                getLogin = function () {
                    return login;
                };

                cleanLogin = function () {
                    login = getDefaultLogin();
                    isLoggedIn === null;
                };

                getAvatar = function () {
                    var avatar;
                    avatar = VISITOR_DEFAULT_AVATAR;
                    if (login.facebook_id !== "") {
                        avatar = "http://" + fb.getAvatar(login.facebook_id, "large");
                    } else if (login.google_id !== "") {
                        avatar = gl.getAvatar(login.google_id);
                    }
                    return avatar;
                };

                getFullName = function () {
                    return login.fname + " " + login.lname;
                };

                getLoginId = function () {
                    return loginId;
                }
/*
                var deferIsLoggedIn = $q.defer();

                f_isLoggedIn = function (callback) {
                    if (isLoggedIn === null) {
                        isLoggedIn = "In progress";
                        $loginApiService.info().$promise.then(
                            function (response) {
                                var result = response.result || "";
                                if (result !== "") {
                                    isLoggedIn = true;
                                    deferIsLoggedIn.resolve(isLoggedIn);
                                } else {
                                    isLoggedIn = false;
                                    deferIsLoggedIn.resolve(isLoggedIn);
                                }

                                if (typeof callback === "function") {
                                    callback(isLoggedIn);
                                }

                            }
                        );

                    } else {
                        if (typeof isLoggedIn === "boolean") {
                            deferIsLoggedIn.resolve(isLoggedIn);
                            if (typeof callback === "function") {
                                callback(isLoggedIn);
                            }
                        }
                    }
//                    deferIsLoggedIn.resolve(isLoggedIn);

                    return deferIsLoggedIn.promise;
                }
*/
                f_isLoggedIn = function () {
                    return isLoggedIn;
                }

                return {
                    init: init,
                    cleanLogin: cleanLogin,
                    setLogin: setLogin,
                    getVisitor: getLogin,
                    getAvatar: getAvatar,
                    getFullName: getFullName,
                    getVisitorId: getLoginId,
                    isLoggedIn: f_isLoggedIn
                };
            }]);

        return productModule;
    });

})(window.define);