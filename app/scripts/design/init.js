(function (define) {
    "use strict";

    /**
     *  Angular "designModule" is very common module and responds for a top HTML page rendering stuff.
     *  It contains theming feature as well as ui editor controls directives. And even more.
     *
     *  (check other modules dependency before exclude this module from include list)
     *
     */
    define(["angular", "themeFiles"], function (angular, files) {

        angular.activeTheme = "default";

        angular.isExistFile = function (path) {

            if (files[angular.activeTheme].indexOf(path) !== -1) {
                return true;
            }

            return false;
        };

        angular.getTheme = function (path) {

            return function () {
                var template, tpl;
                tpl = "/views/" + path;

                if (angular.isExistFile(tpl)) {
                    template = "themes/" + angular.activeTheme + tpl;
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
        angular.module.designModule = angular.module("designModule", [])

            .constant("MEDIA_BASE_PATH", "http://dev.ottemo.com:9000/media/")
            .constant("PRODUCT_DEFAULT_IMG", "placeholder.png")
            .constant("THEME_ACTIVE_PATH", "themes.list.active")

        /**
         *  Startup for designModule - registration globally visible functions
         */
            .run(
            [
                "$designService",
                "$designApiService",
                "$rootScope",
                "THEME_ACTIVE_PATH",
                function ($designService, $designApiService, $rootScope, THEME_ACTIVE_PATH) {

                    // Sets active theme
                    $designApiService.getActiveTheme({"path": THEME_ACTIVE_PATH}).$promise.then(
                        function (response) {
                            var theme = "theme2";

                            if (response.error === "") {
                                theme = response.result;
                            }

                            $designService.setTheme(theme);

                        }
                    );

                    /**
                     *  Global functions you can use in any angular template
                     */
                    $rootScope.setTheme = $designService.setTheme;
                    $rootScope.getTemplate = $designService.getTemplate;
                    $rootScope.getTopPage = $designService.getTopPage;
                    $rootScope.getCss = $designService.getCssList;
                    $rootScope.getImg = $designService.getImage;

                }
            ]
        );

        return angular.module.designModule;
    });
})(window.define);