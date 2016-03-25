angular.module("designModule", ["ngSanitize"])

.run(["designService", "$rootScope", function(designService, $rootScope) {

    /**
     *  Global functions you can use in any angular template
     */
    $rootScope.getTemplate = designService.getTemplate;
    $rootScope.getImg = designService.getImage;

}]);

