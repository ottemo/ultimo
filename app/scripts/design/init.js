module.exports = function(){

    /**
     *  Angular "designModule" is very common module and responds for a top HTML page rendering stuff.
     *  It contains theming feature as well as ui editor controls directives. And even more.
     *
     *  (check other modules dependency before exclude this module from include list)
     *
     */

    angular.getTheme = function (path) {

        return function () {
            var template, tpl;
            tpl = "/views/" + path;

            if (angular.isExistFile(tpl)) {
                template = "themes/" + angular.appConfigValue("themes.list.active") + tpl;
            } else {
                template = "themes/default" + tpl;
            }

            return template;
        };
    };

    /**
     *  Angular "designModule" allows to use themes
     *
     *  default [themeName] is blank
     *  Usage:
     *      <ng-include src="getTemplate("common/footer.html")" />
     *      i.e. - getTemplate("someTemplate.html") = views/[themeName]/someTemplate.html
     *
     */
    return angular.module.designModule = angular.module("designModule", ["ngSanitize"])
        .constant("MEDIA_BASE_PATH", angular.appConfigValue("general.app.media_path"))
        .constant("PRODUCT_DEFAULT_IMG", "placeholder.png")

        .run(["$designService", "$rootScope", function ($designService, $rootScope) {

            /**
             *  Global functions you can use in any angular template
             */
            $rootScope.getTemplate = $designService.getTemplate;
            $rootScope.getTopPage = $designService.getTopPage;
            $rootScope.getCss = $designService.getCssList;
            $rootScope.getImg = $designService.getImage;

        }]);

};