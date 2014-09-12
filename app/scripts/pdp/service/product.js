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
                "$q",
                function ($commonRewriteService, $commonUtilService, $pdpApiService, $q) {
                    // Variables
                    var type, ratingInfo, oldProduct, product, options;

                    // Functions
                    var getUrl, getRatingInfo, getDefaultRatingInfo, getAverageRating, setProduct, getProduct, applyOptions,
                        setOptions, getOptions;

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

                    var getSelectOptionInfo = function (data, key) {
                        var info;
                        info = $commonUtilService.clone(data);
                        delete info.options;

                        for (var row in  data.options) {
                            if (data.options.hasOwnProperty(row)) {
                                for (var field in  data.options[row]) {
                                    if (data.options[row].hasOwnProperty(field) && row === key) {
                                        info[field] = data.options[row][field];
                                    }
                                }
                            }
                        }

                        return info;
                    };

                    var getMultiSelectOptionInfo = function (data, key) {
                        var item;
                        var info = [];


                        for (var row in  data.options) {

                            if (data.options.hasOwnProperty(row)) {
                                for (var field in  data.options[row]) {
                                    if (data.options[row].hasOwnProperty(field) && (-1 !== key.indexOf(row))) {
                                        if (typeof item === "undefined") {
                                            item = $commonUtilService.clone(data);
                                            delete item.options;
                                        }
                                        item[field] = data.options[row][field];
                                    }
                                }
                                if (typeof item !== "undefined") {
                                    info.push(item);
                                    item = undefined;
                                }
                            }
                        }
                        return info;
                    };

                    var getOptionInfo = function (data, key) {
                        var info;
                        info = [];

                        switch (data.type) {
                            case "select" :
                                info.push(getSelectOptionInfo(data, key));
                                break;
                            case "multi_select" :
                                info = info.concat(getMultiSelectOptionInfo(data, key));
                                break;
                            default:
                                if ("" === key) {
                                    info.push({});
                                } else {
                                    info.push(data);
                                }
                        }
                        console.warn(info)
                        return info;
                    };

                    var applyPrice = function (data) {
                        data.sort(function (a, b) {
                            return a.order < b.order;
                        });

                        for (var i = 0; i < data.length; i += 1) {
                            if ("fixed" === data[i].price_type) {
                                product.price = parseFloat(product.price) + parseFloat(data[i].price || 0);
                            } else if ("percent" === data[i].price_type) {
                                product.price = parseFloat(product.price) + (parseFloat(product.price) * (parseFloat(data[i].price || 0) / 100));
                            }
                        }

                    };

                    applyOptions = function () {
                        if (typeof product === "undefined" || typeof product.options === "undefined") {
                            return false;
                        }
                        var info = [];

                        product = $commonUtilService.clone(oldProduct);

                        for (var option in  product.options) {
                            if (product.options.hasOwnProperty(option) && typeof options[option] !== "undefined") {
                                info = info.concat(getOptionInfo(product.options[option], options[option]));
                            }
                        }
                        applyPrice(info);

                        return product;
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

                    getAverageRating = function () {
                        return (typeof ratingInfo.averageValue !== "undefined" ? ratingInfo.averageValue : 0);
                    };

                    return {
                        "getUrl": getUrl,
                        "setProduct": setProduct,
                        "getProduct": getProduct,
                        "setOptions": setOptions,
                        "getOptions": getOptions,
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
