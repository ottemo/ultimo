(function (define) {
    "use strict";

    /**
     *
     */
    define([
            "common/init"
        ],
        function (checkoutModule) {

            checkoutModule
            /**
             *
             */
                .service("$checkoutService", [
                    "$q",
                    "$checkoutApiService",
                    "ONEPAGE_URL",
                    "ACCORDION_URL",
                    function ($q, $checkoutApiService, ONEPAGE_URL, ACCORDION_URL) {
                        // Variables
                        var checkout, allowedShippingMethods, allowedPaymentMethods, types, defaultType, activeType;

                        // Functions
                        var init, getUrl, getType, setType, loadShippingMethods, loadPaymentMethods;

                        checkout = {};

                        allowedShippingMethods = [];
                        allowedPaymentMethods = [];

                        defaultType = "accordion";
                        types = ["onepage", "accordion"];

                        init = function () {
                            var defer = $q.defer();

                            return defer.promise;
                        };

                        var splitMethodToRates = function (method) {
                            var defer = $q.defer();

                            var splitMethosByRates = function () {
                                var i, rate;
                                for (i = 0; i < method.Rates.length; i += 1) {
                                    rate = method.Rates[i];

                                    allowedShippingMethods.push(
                                        {
                                            "Name": method.Name + " - " + rate.Name + " ($" + rate.Price + ")",
                                            "Method": method.Code,
                                            "Rate": rate.Code
                                        }
                                    );
                                }
                            };

                            $checkoutApiService.shippingMethod().$promise.then(function (response) {
                                var i, result, method, rate;
                                result = response.result || [];

                                if (response.error === "" && result.length > 0) {
                                    for (i = 0; i < result.length; i += 1) {

                                        method = result[i] || [];
                                        if (method.Rates instanceof Array && method.Rates.length > 0) {

                                            splitMethodToRates(method)
                                            defer.resolve(allowedShippingMethods);
                                        }

                                    }

                                }
                            });
                            return defer.promise;
                        };

                        getUrl = function () {
                            var url;

                            if ("onepage" === activeType) {
                                url = ONEPAGE_URL;
                            } else {
                                url = ACCORDION_URL;
                            }


                            return "#" + url;
                        };

                        setType = function (t) {
                            if (-1 !== types.indexOf(t)) {
                                activeType = t;
                            } else {
                                activeType = defaultType;
                            }

                            return activeType;
                        };

                        getType = function () {
                            return activeType;
                        };

                        return {
                            "getUrl": getUrl,
                            "getType": getType,
                            "setType": setType
                        };
                    }
                ]
            );

            return checkoutModule;
        });

})(window.define);