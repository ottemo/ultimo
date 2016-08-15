angular.module('cartModule')

.service('cartService', [
    '$resource', '$q', 'cartApiService', 'pdpProductOptionsService',
    function ($resource, $q, cartApiService, pdpProductOptionsService) {

        var cachedCart, items, visitorId, subtotal, saleTax, shipping, total, activeRequests, initScope,
            addItem, init, reload, loadCartInfo, getItems, remove, update,
            hasSubscriptionItems, getSubtotal, getSalesTax, getShipping, getTotal,
            setSubtotal, setSalesTax, setShipping, setTotal, getCountItems,
            getItemsForMiniCart, getTotalQuantity, getItem, increaseCountRequest, decreaseCountRequest;

        initScope = function () {
            items = [];
            subtotal = 0;
            saleTax = 0;
            shipping = 0;
            total = 0;
            activeRequests = 0;
        };

        /**
         * Can be called multiple times, we just serve the cached cart promise
         * @return {[type]} [description]
         */
        init = function () {
            if (typeof cachedCart === 'undefined') {
                initScope();
                cachedCart = loadCartInfo();
            }

            return cachedCart;
        };

        getItems = function () {
            return items;
        };

        getItem = function (_idx) {
            var _item, i;

            for (i = 0; i < items.length; i += 1) {
                if (items[i].idx === _idx) {
                    _item = items[i];
                    break;
                }
            }

            return _item;
        };

        getItemsForMiniCart = function () {
            var i, count, maxCount, res;
            maxCount = 3;
            res = [];
            if (items instanceof Array && items.length) {
                for (i = items.length - 1, count = 0; (i >= 0) && (count < maxCount); i -= 1, count += 1) {
                    res.push(items[i]);
                }
            }

            return res;
        };

        hasSubscriptionItems = function() {
            return !!_.filter(items, isActiveSubscription).length;

            ///////////////

            function isActiveSubscription(o) {
                return o.options && o.options.subscription && o.options.subscription !== 'just_once';
            }
        };

        getSubtotal = function () {
            var i, item;

            subtotal = 0;
            if (typeof items !== 'undefined') {
                for (i = 0; i < items.length; i += 1) {
                    item = items[i];
                    subtotal += item.qty * item.product.price;
                }
            }

            return subtotal;
        };

        setSubtotal = function (value) {
            subtotal = value;

            return subtotal;
        };

        getSalesTax = function () {
            return saleTax || 0;
        };

        setSalesTax = function (value) {
            saleTax = value;

            return saleTax;
        };

        getShipping = function () {
            return shipping || 0;
        };

        setShipping = function (value) {
            shipping = value;

            return shipping;
        };

        getTotal = function () {
            total = subtotal + saleTax + shipping;

            return total;
        };

        setTotal = function (value) {
            total = value;

            return total;
        };

        /**
         * Total unique goods
         *
         * @returns {number}
         */
        getCountItems = function () {
            var count = 0;

            if (typeof items !== 'undefined') {
                count = items.length;
            }

            return count;
        };

        /**
         * Total qty of items
         *
         * @returns {number}
         */
        getTotalQuantity = function () {
            var count = 0;

            if (typeof items !== 'undefined') {
                for (var i = 0; i < items.length; i += 1) {
                    count += parseInt(items[i].qty, 10);
                }
            }

            return count;
        };

        /**
         * Reloads the cart and updates the cached cart that is served from init
         * @return {[type]} [description]
         */
        reload = function () {
            cachedCart = loadCartInfo();
            return cachedCart;
        };

        loadCartInfo = function () {
            var deferLoadCart = $q.defer();
            if (activeRequests > 0) {
                deferLoadCart.resolve(true);
            } else {
                cartApiService.info().$promise.then(
                    function (response) {
                        if (response.error === null) {

                            items = [];
                            if (response.result.items instanceof Array) {
                                // Apply options by all products
                                for (var i = 0; i < response.result.items.length; i += 1) {
                                    response.result.items[i].product = response.result.items[i].product;
                                    response.result.items[i].hasOptions = JSON.stringify(response.result.items[i].options) === JSON.stringify({}) ? false : true;

                                    items.push(response.result.items[i]);
                                }
                            }

                            visitorId = response.result["visitor_id"];
                            deferLoadCart.resolve(true);
                        } else {
                            items = undefined;
                            visitorId = undefined;
                            deferLoadCart.resolve(false);
                        }
                    }
                );
            }

            return deferLoadCart.promise;
        };

        addItem = function (productId, qty, options) {
            var deferAddItem = $q.defer();
            cartApiService.add({
                'pid': productId,
                'qty': qty
            }, options).$promise.then(
                function (response) {
                    deferAddItem.resolve(response);
                    loadCartInfo();
                }
            );

            return deferAddItem.promise;
        };

        remove = function (itemIdx) {
            var deferRemoveItem = $q.defer();
            cartApiService.remove({'itemIdx': itemIdx}).$promise.then(
                function () {
                    activeRequests -= 1;
                    loadCartInfo().then(
                        function () {
                            deferRemoveItem.resolve(true);
                        }
                    );
                }
            );

            return deferRemoveItem.promise;
        };

        update = function (itemIdx, qty) {
            var deferRemoveItem = $q.defer();

            cartApiService.update({
                'itemIdx': itemIdx,
                'qty': qty
            }).$promise.then(
                function () {
                    activeRequests -= 1;
                    loadCartInfo().then(
                        function () {
                            deferRemoveItem.resolve(true);
                        }
                    );
                }
            );

            return deferRemoveItem.promise;
        };

        increaseCountRequest = function () {
            activeRequests += 1;
        };
        decreaseCountRequest = function () {
            activeRequests -= 1;
        };

        return {
            'increaseCountRequest': increaseCountRequest,
            'decreaseCountRequest': decreaseCountRequest,
            'init': init,
            'reload': reload,
            'add': addItem,
            'remove': remove,
            'update': update,
            'getItems': getItems,
            'getItem': getItem,
            'getItemsForMiniCart': getItemsForMiniCart,
            'getCountItems': getCountItems,
            'getTotalQuantity': getTotalQuantity,
            'hasSubscriptionItems': hasSubscriptionItems,

            'getSubtotal': getSubtotal,
            'setSubtotal': setSubtotal,
            'getSalesTax': getSalesTax,
            'setSalesTax': setSalesTax,
            'getShipping': getShipping,
            'setShipping': setShipping,
            'getTotal': getTotal,
            'setTotal': setTotal
        };
    }
]);