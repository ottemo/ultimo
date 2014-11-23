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
                "$commonUtilService",
                "$pdpApiService",
                "$pdpProductOptionsService",
                "$q",
                function ($commonRewriteService, $commonUtilService, $pdpApiService, $pdpProductOptionsService, $q) {
                    // Variables
                    var type, ratingInfo, oldProduct, product, options;

                    // Functions
                    var getUrl, getRatingInfo, getDefaultRatingInfo, getAverageRating, setProduct, getProduct, applyOptions,
                        setOptions, getOptions, getOptStr;

                    type = "product";

                    getUrl = function (id) {
                        var url;
                        url = $commonRewriteService.getRewrite(type, id);

                        if (!url) {
                            url = type + "/" + id;
                        }

                        return "#/" + url;
                    };

                    setProduct = function (obj) {
                        product = obj;
                        oldProduct = $commonUtilService.clone(product);

                        return product;
                    };

                    getProduct = function () {

                        return product;
                    };

                    setOptions = function (obj) {
                        options = obj;
                        applyOptions();

                        return options;
                    };

                    getOptions = function () {

                        return options;
                    };

                    getDefaultRatingInfo = function () {
                        return {
                            "stars_1": 0,
                            "stars_2": 0,
                            "stars_3": 0,
                            "stars_4": 0,
                            "stars_5": 0,
                            "averageValue": 0,
                            "fifeStarPersent": 0,
                            "fourStarPersent": 0,
                            "oneStarPersent": 0,
                            "threeStarPersent": 0,
                            "twoStarPersent": 0
                        };
                    };

                    ratingInfo = getDefaultRatingInfo();

                    applyOptions = function () {
                        product = $commonUtilService.clone(oldProduct);
                        product = $pdpProductOptionsService.applyOptions(product, options);
                        return product;
                    };

                    getRatingInfo = function (productId) {
                        var defer = $q.defer();

                        $pdpApiService.ratingInfo({"pid": productId}).$promise.then(
                            function (response) {
                                if(response.result instanceof Array) {
                                    ratingInfo = response.result[0];
                                } else {
                                    ratingInfo = getDefaultRatingInfo();
                                }
                                ratingInfo.count = ratingInfo['stars_1'] + ratingInfo['stars_2'] + ratingInfo['stars_3'] + ratingInfo['stars_4'] + ratingInfo['stars_5'];
                                if (ratingInfo.count > 0) {
                                    ratingInfo.averageValue = ((1 * ratingInfo['stars_1']) +
                                        (2 * ratingInfo['stars_2']) +
                                        (3 * ratingInfo['stars_3']) +
                                        (4 * ratingInfo['stars_4']) +
                                        (5 * ratingInfo['stars_5'])) / (ratingInfo.count);
                                }
                                defer.resolve(ratingInfo);
                            }
                        );

                        return defer.promise;
                    };

                    getAverageRating = function () {
                        return (typeof ratingInfo.averageValue !== "undefined" ? ratingInfo.averageValue : 0);
                    };

                    getOptStr = function (value) {
                        return value instanceof Array ? value.join(", ") : value;
                    };

                    return {
                        "getUrl": getUrl,
                        "setProduct": setProduct,
                        "getProduct": getProduct,
                        "setOptions": setOptions,
                        "getOptions": getOptions,
                        "getOptStr": getOptStr,
                        "applyOptions": applyOptions,
                        "getRatingInfo": getRatingInfo,
                        "getAverageRating": getAverageRating
                    };
                }
            ]
        );

        return pdpModule;
    });

})(window.define);
