(function (define, d) {
    "use strict";

    define(function () {

        var init, secretKey, appId;
        appId = "483159925160897";
        secretKey = "9a362f8b5cd91dbdd908bff472468c7e";

        /**
         *
         */
        init = function () {
            var js, fjs = d.getElementsByTagName("script")[0];
            if (d.getElementById("facebook-jssdk")) {
                return;
            }
            js = d.createElement("script");
            js.id = "facebook-jssdk";
            js.src = "//connect.facebook.net/ru_RU/sdk.js#xfbml=1&appId=483159925160897&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
        };

        return{
            appId: appId,
            secretKey: secretKey,
            init: init
        };

    });
})(window.define, window.document)