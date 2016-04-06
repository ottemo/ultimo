angular.module('coreModule')

.filter('trustedUrl', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

