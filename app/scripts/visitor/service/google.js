(function (define) {
    "use strict";

    define(function () {

        var init, clientId;

        clientId = "1074763412644-qq25glj3tb87bq7bk5m8793da11ddheh.apps.googleusercontent.com";
        /**
         *
         */
        init = function () {
//            var po = document.createElement("script");
//            po.type = "text/javascript";
//            po.async = true;
//            po.src = "https://apis.google.com/js/plusone.js";
//            var s = document.getElementsByTagName("script")[0];


            var js, fjs = document.getElementsByTagName("script")[0];
            js = document.createElement("script");
            js.type = "text/javascript";
            js.async = true;
            js.src = "https://apis.google.com/js/plusone.js";
            fjs.parentNode.insertBefore(js, fjs);
        };

        return{
            clientId: clientId,
            init: init
        };

    });
})(window.define)