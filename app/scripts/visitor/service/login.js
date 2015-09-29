angular.module("visitorModule")
/**
 *  $visitorApiService interaction service
 */
    .factory('$visitorLoginService', [
        '$resource',
        '$visitorApiService',
        '$q',
        '$designService',
        'VISITOR_DEFAULT_AVATAR',
        function ($resource, $visitorApiService, $q, $designService, VISITOR_DEFAULT_AVATAR) {

            /** Variables */
            var login, loginId, isLoggedIn, mapFields, sendingRequest;
            var props = {
                isLoggedIn: null
            };

            /** Functions */
            var getLogin, getLoginId, setLogin, cleanLogin, getVisitorProperty,
                getAvatar, getFullName, fIsLoggedIn, getDefaultLogin, logout, fillFields;

            isLoggedIn = null;

            sendingRequest = [];
            getDefaultLogin = function () {
                return {
                    'facebook_id': '',
                    'google_id': '',
                    'billing_address_id': '',
                    'shipping_address_id': '',
                    'email': '',
                    'fname': '',
                    'lname': '',
                    'password': '',
                    'billing_address': {},
                    'shipping_address': {}
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
                'facebook_id': ['facebook_id', 'facebookId', 'facebookID'],
                'google_id': ['google_id', 'googleId', 'googleID'],
                'billing_address_id': ['billing_address_id', 'billing_id', 'billingId', 'billingID'],
                'shipping_address_id': ['shipping_address_id', 'shipping_id', 'shippingId', 'shippingID'],
                'email': ['email', 'e-mail', 'Email', 'EMail', 'E-Mail'],
                'fname': ['fname', 'f-name', 'f_name', 'first_name', 'first-name'],
                'lname': ['lname', 'l-name', 'l_name', 'last_name', 'last-name'],
                'billing_address': ['billing_address'],
                'shipping_address': ['shipping_address']
            };

            login = getDefaultLogin();

            logout = function () {
                return $visitorApiService.logout().$promise.then(function(resp){
                    props.isLoggedIn = false;
                    isLoggedIn = false;
                    return resp;
                });
            };

            fillFields = function (obj) {
                var field, prop;
                for (field in obj) {
                    if (obj.hasOwnProperty(field)) {
                        prop = getVisitorProperty(field);
                        if (prop !== null) {
                            login[prop] = obj[field];
                        }
                    }
                }
            };

            setLogin = function (obj) {
                fillFields(obj);
                if (obj !== null) {
                    login["billing_address_id"] = obj["billing_address"] && obj["billing_address"]._id || '';
                    login["shipping_address_id"] = obj["shipping_address"] && obj["shipping_address"]._id || '';
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

                if ('' !== login["facebook_id"]) {
                    avatar = 'http://' + fb.getAvatar(login["facebook_id"], 'large');
                } else if (login["google_id"] !== '') {
                    avatar = gl.getAvatar(login["google_id"]);
                }
                return avatar;
            };

            getFullName = function () {
                return login.fname + ' ' + login.lname;
            };

            getLoginId = function () {
                return loginId;
            };

            fIsLoggedIn = function (force) {

                var sendRequestFlag = false;
                if (sendingRequest.length === 0) {
                    sendRequestFlag = true;
                }

                var deferIsLoggedIn = $q.defer();
                sendingRequest.push(deferIsLoggedIn);

                if (null !== isLoggedIn && !force) {
                    for (var i = 0; i < sendingRequest.length; i += 1) {
                        sendingRequest[i].resolve(isLoggedIn);
                    }
                    sendingRequest = [];
                } else if (sendRequestFlag) {
                    $visitorApiService.info().$promise.then(function (response) {
                        if (response.error === null) {
                            loginId = response.result._id || '';
                            if (loginId !== '') {
                                isLoggedIn = true;
                                props.isLoggedIn = true;
                                setLogin(response.result);
                            } else {
                                isLoggedIn = false;
                                props.isLoggedIn = false;
                            }
                        } else {
                            isLoggedIn = false;
                            props.isLoggedIn = false;
                            cleanLogin();
                        }
                        for (var i = 0; i < sendingRequest.length; i += 1) {
                            sendingRequest[i].resolve(isLoggedIn);
                        }
                        sendingRequest = [];
                    });
                }

                return deferIsLoggedIn.promise;
            };

            return {
                cleanLogin: cleanLogin,
                setLogin: setLogin,
                getVisitor: getLogin,
                getAvatar: getAvatar,
                getFullName: getFullName,
                getVisitorId: getLoginId,
                isLoggedIn: fIsLoggedIn,
                logout: logout,
                props: props
            };
        }
    ]
);