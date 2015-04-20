(function (define) {
    "use strict";

    define(["angular", "design/init"], function (angular, designModule) {
        designModule
        /**
         *  $designService allows to do operations over very top HTML page
         */
            .service("$designService", [function () {

                var data = {
                    theme: angular.appConfigValue("themes.list.active"),
                    topPage: "index.html"
                };
                var isFullPathRegex = new RegExp("^http[s]?://", "i");
                var themesDir = "themes/";

                return {
                    getTheme: function () {
                        return data.theme;
                    },

                    getTopPage: function () {
                        return this.getTemplate(data.topPage);
                    },

                    setTopPage: function (newTopPage) {
                        data.topPage = newTopPage;

                        return data.topPage;
                    },

                    //TODO: DEPRECATE
                    getTemplate: function (templateName) {
                        return "themes/blitz/views/"+templateName;
                    },

                    getImage: function (img) {
                        var image;
                        img = "/images/" + img;

                        image = themesDir + data.theme + img;
                        

                        return image;
                    }
                };
            }]);

        return designModule;
    });
})(window.define);
