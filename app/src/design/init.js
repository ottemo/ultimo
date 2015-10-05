/**
 *  Angular "designModule" allows to use themes
 *
 *  default [themeName] is blank
 *  Usage:
 *      <ng-include src="getTemplate("common/footer.html")" />
 *      i.e. - getTemplate("someTemplate.html") = views/[themeName]/someTemplate.html
 *
 */
angular.module("designModule", ["ngSanitize"])
    .run(["$designService", "$rootScope", function ($designService, $rootScope) {

        /**
         *  Global functions you can use in any angular template
         */
        $rootScope.getTemplate = $designService.getTemplate;
        $rootScope.getImg = $designService.getImage;

    }]);