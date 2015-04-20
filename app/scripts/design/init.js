(function (define) {
    "use strict";

    /**
     *  Angular "designModule" is very common module and responds for a top HTML page rendering stuff.
     *  It contains theming feature as well as ui editor controls directives. And even more.
     *
     *  (check other modules dependency before exclude this module from include list)
     *
     */
    define([
            "angular",
            "angular-sanitize"
        ],
        function (angular) {

            /**
             *  Angular "designModule" allows to use themes
             *
             *  default [themeName] is blank
             *  Usage:
             *      <ng-include src="getTemplate("common/footer.html")" />
             *      i.e. - getTemplate("someTemplate.html") = views/[themeName]/someTemplate.html
             *
             */
            angular.module.designModule = angular.module("designModule", ["ngSanitize"])

                .constant("MEDIA_BASE_PATH", angular.appConfigValue("general.app.media_path"))
                .constant("PRODUCT_DEFAULT_IMG", "placeholder.png")

                /**
                 *  Startup for designModule - registration globally visible functions
                 */
                .run(["$designService", "$rootScope", function ($designService, $rootScope) {

                    /**
                     *  Global functions you can use in any angular template
                     */
                    $rootScope.getTemplate = $designService.getTemplate;
                    $rootScope.getTopPage = $designService.getTopPage;
                    $rootScope.getCss = $designService.getCssList;
                    $rootScope.getImg = $designService.getImage;

                }]);

            return angular.module.designModule;
        }
    );
})(window.define);
