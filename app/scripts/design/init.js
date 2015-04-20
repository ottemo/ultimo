module.exports = function(angular){

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

            //if (angular.isExistFile(tpl)) {
            //    template = "themes/" + angular.appConfigValue("themes.list.active") + tpl;
            //} else {
                template = "themes/default" + tpl;
            //}

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
    angular.module.designModule = designModule =  angular.module("designModule", ["ngSanitize"])
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

    require('./service/design')(designModule);
    require('./service/api')(designModule);
    require('./service/image')(designModule);
    require('./service/states')(designModule);

    require('./directives/design')(designModule);
    require('./directives/guiBlock')(designModule);
    require('./directives/guiListBar')(designModule);
    require('./directives/guiMessageManager')(designModule);
    require('./directives/guiPaginator')(designModule);
    require('./directives/validator/between')(designModule);
    require('./directives/validator/date')(designModule);
    require('./directives/validator/email')(designModule);
    require('./directives/validator/len')(designModule);
    require('./directives/validator/number')(designModule);
    require('./directives/validator/password')(designModule);
    require('./directives/validator/positive')(designModule);
    require('./directives/validator/price')(designModule);
    require('./directives/validator/regexp')(designModule);
    require('./directives/validator/sku')(designModule);

}