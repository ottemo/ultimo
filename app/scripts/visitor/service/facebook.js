(function (define, d) {
    "use strict";

    define(['angular'], function (angular) {

        var init, avatarLarge, avatarMedium , avatarSmall, avatarSquare, getAvatar;

        avatarLarge = "graph.facebook.com/##facebookId##/picture?type=large";
        avatarMedium = "graph.facebook.com/##facebookId##/picture?type=normal";
        avatarSmall = "graph.facebook.com/##facebookId##/picture?type=small";
        avatarSquare = "graph.facebook.com/##facebookId##/picture?type=square";

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
            js.src = "http://connect.facebook.net/ru_RU/sdk.js#xfbml=1&appId=" + angular.appConfigValue("general.app.login.facebook.appId") + "&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
        };

        getAvatar = function (userId, size) {
            var url, regexp;
            regexp = /##facebookId##/;
            switch (size) {
                case "large" :
                    url = avatarLarge.replace(regexp, userId);
                    break;
                case "medium" :
                    url = avatarMedium.replace(regexp, userId);
                    break;
                case "square" :
                    url = avatarSquare.replace(regexp, userId);
                    break;
                case "small":
                    url = avatarSmall.replace(regexp, userId);
                    break;
                default:
                    url = avatarSmall.replace(regexp, userId);
            }
            return url;
        };

        return{
            appId: angular.appConfigValue("general.app.login.facebook.appId"),
            secretKey: angular.appConfigValue("general.app.login.facebook.secretKey"),
            init: init,
            getAvatar: getAvatar
        };

    });
})(window.define, window.document);