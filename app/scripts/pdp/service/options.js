(function (define) {
    "use strict";

    /**
     *
     */
    define(["pdp/init"], function (pdpModule) {

        pdpModule
        /**
         *  $pdpProductOptionsService applies the custom options for product
         */
            .service("$pdpProductOptionsService", [
                "$commonUtilService",
                function ($commonUtilService) {
                    // Variables
                    var product;

                    // Functions
                    var applyPrice, getOptionInfo, getMultiSelectOptionInfo, getSelectOptionInfo, applyOptions, getPriceRules;

                    getSelectOptionInfo = function (data, key) {
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

                    getMultiSelectOptionInfo = function (data, key) {
                        var item, initItem, resetItem;
                        var info = [];

                        initItem = function (item) {
                            if (typeof item === "undefined") {
                                item = $commonUtilService.clone(data);
                                delete item.options;
                            }

                            return item;
                        };

                        resetItem = function (item) {
                            if (typeof item !== "undefined") {
                                info.push(item);
                                item = undefined;
                            }
                            return item;
                        };

                        for (var row in  data.options) {
                            if (data.options.hasOwnProperty(row)) {
                                for (var field in  data.options[row]) {
                                    if (data.options[row].hasOwnProperty(field) && (-1 !== key.indexOf(row))) {
                                        item = initItem(item);
                                        item[field] = data.options[row][field];
                                    }
                                }
                                item = resetItem(item);
                            }
                        }

                        return info;
                    };

                    getOptionInfo = function (data, key) {
                        var info;
                        info = [];

                        if (typeof key !== "undefined" && key !== "") {
                            switch (data.type) {
                                case "select" :
                                    info.push(getSelectOptionInfo(data, key));
                                    break;
                                case "multi_select" :
                                    info = info.concat(getMultiSelectOptionInfo(data, key));
                                    break;
                                default:
                                    info.push(data);
                            }
                        } else {
                            info.push({});
                        }

                        return info;
                    };

                    applyPrice = function (data) {
                        data.sort(function (a, b) {
                            return a.order < b.order;
                        });

                        var getDeltaPrice = function (productPrice, optionPrice) {
                            var result = {
                                "operation": "+",
                                "value": 0
                            };

                            var parts = /^([\+\-]?)([\d]*)([\%]?)$/.exec(optionPrice);
                            if (parts === null) {
                                return result;
                            }

                            result["operation"] = parts[1] || "=";

                            if (parts[3] === "%") {
                                result["value"] = parseFloat(productPrice * (parts[2] / 100));
                            } else {
                                result["value"] = parseFloat(parts[2]);
                            }
                            if(isNaN(result["value"])){
                                result["operation"] = null;
                            }
                            return result;
                        };

                        var startPrice = parseFloat(product.price);

                        for (var i = 0; i < data.length; i += 1) {
                            var deltaData = getDeltaPrice(startPrice, data[i].price);
                            switch (deltaData["operation"]) {
                                case "+":
                                    product.price = parseFloat(product.price) + deltaData["value"];
                                    break;
                                case "-":
                                    product.price = parseFloat(product.price) - deltaData["value"];
                                    break;
                                case "=":
                                    product.price = deltaData["value"];
                                    break;
                            }
                        }
                    };

                    getPriceRules = function (product, options) {
                        var rules = [];

                        for (var option in  product.options) {
                            if (product.options.hasOwnProperty(option) && typeof product.options[option] !== "undefined") {
                                rules = rules.concat(getOptionInfo(product.options[option], options[option]));
                            }
                        }

                        return rules;
                    };

                    applyOptions = function (prod, options) {
                        if (typeof prod === "undefined" ||
                            typeof options === "undefined" ||
                            JSON.stringify(options) === JSON.stringify({})) {
                            return prod;
                        }
                        var rules;

                        product = $commonUtilService.clone(prod);
                        rules = getPriceRules(product, options);
                        applyPrice(rules);

                        return product;
                    };

                    return {
                        "applyOptions": applyOptions
                    };
                }
            ]
        );

        return pdpModule;
    });

})(window.define);
