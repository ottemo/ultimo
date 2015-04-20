(function (define) {
    "use strict";

    define(["angular", "design/init"], function (angular, designModule) {
        designModule
        /**
         *  $designService allows to do operations over very top HTML page
         */
            .service("$designService", [function () {

                var data = {
                    theme: angular.appConfigValue("themes.list.active")
                };

                var isFullPathRegex = new RegExp("^http[s]?://", "i");

                return {
                    getTheme: function () {
                        return data.theme;
                    },

                    getTopPage: function () {
                        return this.getTemplate("index.html");
                    },

                    //TODO: DEPRECATE
                    getTemplate: function (templateName) {
                        return "themes/blitz/views/"+templateName;
                    },

                    getImage: function (img) {
                        return "themes/" + data.theme + "/images/" + img;
                    }
                };
            }]);

        return designModule;
    });
})(window.define);
