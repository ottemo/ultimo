(function (define) {
    "use strict";

    define(["angular"], function (angular) {

        var init, clientId, requestData, login, loginCallback, userData;
        userData = {"access_token": ""};

        clientId = "1074763412644-qq25glj3tb87bq7bk5m8793da11ddheh.apps.googleusercontent.com";

        requestData = {
            "clientid": clientId, //You need to set client id
            "cookiepolicy": "single_host_origin",
            "callback": "loginCallback", //callback function
            "approvalprompt": "force",
            "redirecturi": "postmessage",
            "scope": "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email"
        }

        /**
         *
         */
        init = function () {
            var po = document.createElement("script");
            po.type = "text/javascript";
            po.async = true;
            po.src = "https://apis.google.com/js/client.js?onload=onLoadCallback";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(po, s);
        };

        login = function () {
            gapi.auth.signIn(requestData);
        }

        loginCallback = function (response) {
            if (response.status.signed_in) {
                userData = {
                    access_token: response.access_token
                };
            } else {
                userData = {"access_token": ""};
            }
            return userData;
        }

        return{
            clientId: clientId,
            requestData: requestData,
            userData: userData,
            login: login,
            loginCallback: loginCallback,
            init: init
        };

    });
})(window.define)