module.exports = function (designModule) {
    designModule
    /**
     *  $designService allows to do operations over very top HTML page
     */
        .service("$designService", [function () {

            var data = { theme: angular.appConfigValue("themes.list.active"), topPage: "index.html", cssList: []};
            var isFullPathRegex = new RegExp("^http[s]?://", "i");
            var isCssRegex = new RegExp(".css$", "i");
            var themesDir = "themes/";

            return {
                getTopPage: function () {
                    return this.getTemplate("index.html");
                },

                getTemplate: function (templateName) {
                    return "theme/views/" + templateName;
                },

                getImage: function (img) {
                    return "theme/images/" + img;
                }
            };
        }]);
};

