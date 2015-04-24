module.exports = function (filtersModule) {

    filtersModule.filter('trustedUrl', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
}

