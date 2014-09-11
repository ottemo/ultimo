(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["pdp/init"], function (pdpModule) {
        pdpModule
            /*
             *  $productApiService interaction service
             */
            .service("$pdpProductService", [
                "$commonRewriteService",
                "$pdpApiService",
                "$q",
                function ($commonRewriteService, $pdpApiService, $q) {
                    var type, ratingInfo;
                    var getUrl, getRatingInfo, getDefaultRatingInfo, getAverageRating;

                    type = "product";

                    getDefaultRatingInfo = function () {
                        return {
                            "1star": 0,
                            "2star": 0,
                            "3star": 0,
                            "4star": 0,
                            "5star": 0,
                            "averageValue": 0,
                            "fifeStarPersent": 0,
                            "fourStarPersent": 0,
                            "oneStarPersent": 0,
                            "threeStarPersent": 0,
                            "twoStarPersent": 0
                        };
                    };
                    ratingInfo = getDefaultRatingInfo();

                    getUrl = function (id) {
                        var url;
                        url = $commonRewriteService.getRewrite(type, id);

                        if (!url) {
                            url = type + "/" + id;
                        }

                        return "#/" + url;
                    };

                    getRatingInfo = function (productId) {
                        var defer = $q.defer();

                        $pdpApiService.ratingInfo({"pid": productId}).$promise.then(
                            function (response) {
                                ratingInfo = response.result[0] || getDefaultRatingInfo();
                                ratingInfo.count = ratingInfo['1star'] + ratingInfo['2star'] + ratingInfo['3star'] + ratingInfo['4star'] + ratingInfo['5star'];
                                if (ratingInfo.count > 0) {
                                    ratingInfo.averageValue = ((1 * ratingInfo['1star']) +
                                        (2 * ratingInfo['2star']) +
                                        (3 * ratingInfo['3star']) +
                                        (4 * ratingInfo['4star']) +
                                        (5 * ratingInfo['5star'])) / (ratingInfo.count);
                                }
                                defer.resolve(ratingInfo);
                            }
                        );

                        return defer.promise;
                    };

                    getAverageRating = function(){
                        return (typeof ratingInfo.averageValue !== "undefined" ? ratingInfo.averageValue : 0);
                    };

                    return {
                        "getUrl": getUrl,
                        "getRatingInfo": getRatingInfo,
                        "getAverageRating": getAverageRating
                    };
                }
            ]
        );

        return pdpModule;
    });

})(window.define);
