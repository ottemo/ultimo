(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define([
        "visitor/init",
        "visitor/service/facebook",
        "visitor/service/google"
    ], function (visitorModule, fb, gl) {
        visitorModule
            /*
             *  $visitorApiService interaction service
             */

            .service("$visitorLoginService", [
                "$resource",
                "$visitorApiService",
                "$cookieStore",
                "$q",
                "$designService",
                "VISITOR_DEFAULT_AVATAR",
                "LOGIN_COOKIE",
                function ($resource, $visitorApiService, $cookieStore, $q, $designService, VISITOR_DEFAULT_AVATAR, LOGIN_COOKIE) {

                    /** Variables */
                    var login, loginId, isLoggedIn, deferIsLoggedIn , mapFields, deferLogOut;
                    /** Functions */
                    var init, getLogin, getLoginId, setLogin, cleanLogin, getVisitorProperty,
                        getAvatar, getFullName, fIsLoggedIn, getDefaultLogin, logout;

                    isLoggedIn = null;

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

                    getVisitorProperty = function (field) {
                        var res, i, f;
                        for (res in mapFields) {
                            if (mapFields.hasOwnProperty(res)) {
                                for (i = 0; i < mapFields[res].length; i += 1) {
                                    f = mapFields[res][i];
                                    if (f === field) {
                                        return res;
                                    }
                                }
                            }
                        }

                        return null;
                    };

                    mapFields = {
                        "facebook_id": ["facebook_id", "facebookId", "facebookID"],
                        "google_id": ["google_id", "googleId", "googleID"],
                        "billing_address_id": ["billing_address_id", "billing_id", "billingId", "billingID"],
                        "shipping_address_id": ["shipping_address_id", "shipping_id", "shippingId", "shippingID"],
                        "email": ["email", "e-mail", "Email", "EMail", "E-Mail"],
                        "fname": ["fname", "f-name", "f_name", "first_name", "first-name"],
                        "lname": ["lname", "l-name", "l_name", "last_name", "last-name"],
                        "billing_address": ["billing_address"],
                        "shipping_address": ["shipping_address"]
                    };

                    login = getDefaultLogin();

                    init = function () {
                        deferIsLoggedIn = $q.defer();

                        $visitorApiService.info().$promise.then(
                            function (response) {
                                if (response.error === "") {
                                    loginId = response.result._id || "";
                                    if (loginId !== "") {
                                        isLoggedIn = true;
                                        deferIsLoggedIn.resolve(isLoggedIn);
                                        setLogin(response.result);
                                    } else {
                                        isLoggedIn = false;
                                        deferIsLoggedIn.resolve(isLoggedIn);
                                    }
                                } else {

                                    isLoggedIn = false;
                                    cleanLogin();
                                    deferIsLoggedIn.resolve(isLoggedIn);
                                }
                            }
                        );

                        return deferIsLoggedIn.promise;
                    };

                    logout = function () {
                        deferLogOut = $q.defer();

                        $cookieStore.remove(LOGIN_COOKIE);

                        isLoggedIn = false;
                        login = getDefaultLogin();
                        deferLogOut.resolve(true);

                        return deferLogOut.promise;
                    };

                    setLogin = function (obj) {
                        var field, prop;
                        for (field in obj) {
                            if (obj.hasOwnProperty(field)) {
                                prop = getVisitorProperty(field);
                                if (prop !== null) {
                                    login[prop] = obj[field];
                                }
                            }
                        }
                        if (obj !== null) {
                            login.billing_address_id = obj.billing_address && obj.billing_address._id || "";
                            login.shipping_address_id = obj.shipping_address && obj.shipping_address._id || "";
                        }
                    };

                    getLogin = function () {
                        return login;
                    };

                    cleanLogin = function () {
                        login = getDefaultLogin();
                    };

                    getAvatar = function () {
                        var avatar;
                        avatar = $designService.getImage(VISITOR_DEFAULT_AVATAR);

                        if ("" !== login.facebook_id) {
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
                    };

                    fIsLoggedIn = function () {
                        return isLoggedIn;
                    };

                    return {
                        init: init,
                        cleanLogin: cleanLogin,
                        setLogin: setLogin,
                        getVisitor: getLogin,
                        getAvatar: getAvatar,
                        getFullName: getFullName,
                        getVisitorId: getLoginId,
                        isLoggedIn: fIsLoggedIn,
                        logout: logout
                    };
                }
            ]
        );

        return visitorModule;
    });

})(window.define);