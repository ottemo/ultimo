(function (define) {
    "use strict";

    /**
     *  Any filters
     */
    define([
            "filters/init",
        ],
        function (filtersModule) {

            filtersModule.filter('trustedUrl', ['$sce', function ($sce) {
                return function(url) {
                    return $sce.trustAsResourceUrl(url);
                };
            }]);

            return filtersModule;
        });

})(window.define);
