angular.module("checkoutModule")
/**
 *
 */
    .service("$checkoutService", [
        "$q",
        "$timeout",
        "$interval",
        "$checkoutApiService",
        "ONEPAGE_URL",
        "ACCORDION_URL",
        function ($q, $timeout, $interval, $checkoutApiService, ONEPAGE_URL, ACCORDION_URL) {
            // Variables
            var checkout, allowedShippingMethods, allowedPaymentMethods, defaultType;

            // Functions
            var init, getUrl, getType, update, loadShippingMethods, loadPaymentMethods,
                saveBillingAddress, saveShippingAddress, saveShippingMethod, savePaymentMethod, discountApply, discountNeglect,
                getCheckout, getAllowedPaymentMethods, getAllowedShippingMethods, saveAdditionalInfo, getAllowedGuestCheckout,
                getMinimalCostShippingMethods;

            checkout = {};
            defaultType = "accordion";

            loadShippingMethods = function () {
                var defer = $q.defer();

                var splitMethodToRates = function (method) {
                    var i, rate;
                    for (i = 0; i < method.Rates.length; i += 1) {
                        rate = method.Rates[i];

                        var methodLabel = method.Name + " - " + rate.Name + " ($" + rate.Price.toFixed(2) + ")";
                        if (method.Name == 'Flat Rate') {
                            methodLabel = rate.Name + " ($" + rate.Price.toFixed(2) + ")";
                        }

                        allowedShippingMethods.push({
                            "Name": methodLabel,
                            "Price": rate.Price,
                            "Method": method.Code,
                            "Rate": rate.Code
                        });
                    }
                };

                $checkoutApiService.shippingMethods().$promise.then(function (response) {
                    var i, method;
                    allowedShippingMethods = [];
                    if (response.error === null) {
                        for (i = 0; i < response.result.length; i += 1) {
                            method = response.result[i] || [];
                            if (method.Rates instanceof Array && method.Rates.length > 0) {
                                splitMethodToRates(method);
                            }
                        }
                    }

                    defer.resolve(allowedShippingMethods);
                });

                return defer.promise;
            };

            loadPaymentMethods = function () {
                var defer = $q.defer();
                allowedPaymentMethods = [];
                $checkoutApiService.paymentMethods().$promise.then(function (response) {
                    allowedPaymentMethods = response.result || [];
                    defer.resolve(allowedPaymentMethods);
                });

                return defer.promise;
            };

            // TODO: I THINK THIS CAN BE DELETED
            init = function () {
                var defer, statuses;
                statuses = {
                    "isLoadedSM": false,
                    "isLoadedPM": false
                };
                defer = $q.defer();

                loadShippingMethods().then(function () {
                    statuses.isLoadedSM = true;
                });
                loadPaymentMethods().then(function () {
                    statuses.isLoadedPM = true;
                });

                var stop = $interval(function () {
                    var initAll = true;
                    for (var key in statuses) {
                        if (statuses.hasOwnProperty(key) && !statuses[key]) {
                            initAll = false;
                            break;
                        }
                    }
                    if (initAll) {
                        $interval.cancel(stop);
                        defer.resolve(checkout);
                    }
                }, 100);

                return defer.promise;
            };

            update = function () {
                var defer = $q.defer();

                $checkoutApiService.info().$promise.then(
                    function (response) {
                        checkout = response.result || [];
                        defer.resolve(checkout);
                    }
                );

                return defer.promise;
            };

            saveBillingAddress = function (address) {
                var defer = $q.defer();

                $checkoutApiService.setBillingAddress(address).$promise.then(
                    function (response) {
                        defer.resolve(response);
                    }
                );

                return defer.promise;
            };

            saveShippingAddress = function (address) {
                var defer = $q.defer();

                $checkoutApiService.setShippingAddress(address).$promise.then(
                    function (response) {
                        defer.resolve(response);
                    }
                );

                return defer.promise;
            };

            saveShippingMethod = function (method) {
                var defer = $q.defer();

                $checkoutApiService.setShippingMethod(method).$promise.then(
                    function (response) {
                        defer.resolve(response);
                    }
                );

                return defer.promise;
            };

            savePaymentMethod = function (method) {
                var defer = $q.defer();

                $checkoutApiService.setPaymentMethod(method).$promise.then(
                    function (response) {
                        defer.resolve(response);
                    }
                );

                return defer.promise;
            };

            saveAdditionalInfo = function (data) {
                var defer = $q.defer();

                $checkoutApiService.setInfo(data).$promise.then(
                    function (response) {
                        defer.resolve(response);
                    }
                );

                return defer.promise;
            };

            discountApply = function (data) {
                var defer = $q.defer();

                $checkoutApiService.discountApply(data).$promise.then(
                    function (response) {
                        defer.resolve(response);
                    }
                );

                return defer.promise;
            };

            discountNeglect = function (data) {
                var defer = $q.defer();

                $checkoutApiService.discountNeglect(data).$promise.then(
                    function (response) {
                        if (response.error === null) {
                            defer.resolve(response);
                        }
                    }
                );

                return defer.promise;
            };

            getUrl = function () {
                return ("onepage" == getType()) ? ONEPAGE_URL : ACCORDION_URL;
            };

            getType = function () {
                return 'accordion';
            };

            getCheckout = function () {
                return checkout;
            };

            getAllowedPaymentMethods = function () {
                return allowedPaymentMethods || [];
            };

            getAllowedShippingMethods = function () {
                return allowedShippingMethods || [];
            };

            getAllowedGuestCheckout = function () {
                return angular.appConfig.hasGuestCheckout;
            };

            getMinimalCostShippingMethods = function () {
                var result, currentMinPrice;

                for (var i = 0; i < allowedShippingMethods.length; i += 1) {
                    if (typeof currentMinPrice === "undefined") {
                        currentMinPrice = allowedShippingMethods[i].Price;
                        result = allowedShippingMethods[i];
                        result.index = i;
                        continue;
                    }
                    if (currentMinPrice > allowedShippingMethods[i].Price) {
                        currentMinPrice = allowedShippingMethods[i].Price;
                        result = allowedShippingMethods[i];
                        result.index = i;
                    }
                }

                return result;
            };

            return {
                "init": init,
                "update": update,
                "getUrl": getUrl,
                "getType": getType,
                "getAllowedPaymentMethods": getAllowedPaymentMethods,
                "getAllowedShippingMethods": getAllowedShippingMethods,
                "loadShippingMethods": loadShippingMethods,
                "loadPaymentMethods": loadPaymentMethods,
                "getCheckout": getCheckout,
                "saveShippingAddress": saveShippingAddress,
                "saveBillingAddress": saveBillingAddress,
                "saveShippingMethod": saveShippingMethod,
                "savePaymentMethod": savePaymentMethod,
                "saveAdditionalInfo": saveAdditionalInfo,
                "discountNeglect": discountNeglect,
                "discountApply": discountApply,
                "getAllowedGuestCheckout": getAllowedGuestCheckout,
                "getMinimalCostShippingMethods": getMinimalCostShippingMethods
            };
        }
    ]
);