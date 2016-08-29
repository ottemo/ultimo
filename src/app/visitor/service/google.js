var gl = (function () {

    var init, requestData, login, loginCallback, userData;
    userData = {'access_token': ''};

    requestData = {
        'clientid': angular.appConfig.googleClientId,
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

    return {
        clientId: angular.appConfig.googleClientId,
        requestData: requestData,
        userData: userData,
        login: login,
        loginCallback: loginCallback,
        init: init
    };

})();

