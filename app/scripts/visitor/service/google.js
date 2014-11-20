(function (define) {
    'use strict';

    define(['angular'], function (angular) {

            var init, requestData, login, loginCallback, userData, avatar, getAvatar;
            userData = {'access_token': ''};

            avatar = 'https://plus.google.com/s2/photos/profile/##googleId##?sz=150';

            requestData = {
                'clientid': angular.appConfigValue("app.login.facebook.appId"),
                'cookiepolicy': 'single_host_origin',
                'callback': 'loginCallback',
                'approvalprompt': 'force',
                'redirecturi': 'postmessage',
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
            };

            /**
             *
             */
            init = function () {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            };

            login = function () {
                gapi.auth.signIn(requestData); //jshint ignore:line
            };

            loginCallback = function (response) {
                if (response.status["signed_in"]) {
                    userData = {
                        "access_token": response["access_token"]
                    };
                } else {
                    userData = {'access_token': ''};
                }
                return userData;
            };

            getAvatar = function (userId) {
                var url, regexp;
                regexp = /##googleId##/;
                url = avatar.replace(regexp, userId);
                return url;
            };

            return{
                clientId: angular.appConfigValue("app.login.google.clientId"),
                requestData: requestData,
                userData: userData,
                login: login,
                loginCallback: loginCallback,
                getAvatar: getAvatar,
                init: init
            };

        }
    )
    ;
})(window.define);
