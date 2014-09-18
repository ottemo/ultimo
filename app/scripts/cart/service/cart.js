(function (w, define) {
    'use strict';

    /**
     *  HTML top page header manipulation stuff
     */
    define([
        'cart/init'
    ], function (cartModule) {
        cartModule

        /**
         *  $cartService interaction service
         */
            .service('$cartService', [
                '$resource',
                '$cartApiService',
                '$cookieStore',
                '$pdpProductOptionsService',
                'LOGIN_COOKIE',
                '$q',
                function ($resource, $cartApiService, $cookieStore, $pdpProductOptionsService, LOGIN_COOKIE, $q) {

                    /** Variables */
                    var isInit, items, visitorId, subtotal, saleTax, shipping, total;
                    /** Functions */
                    var addItem, init, reload, loadCartInfo, getItems, remove, update,
                        getSubtotal, getSalesTax, getShipping, getTotal,
                        setSubtotal, setSalesTax, setShipping, setTotal, getCountItems,
                        getItemsForMiniCart;

                    items = [];
                    subtotal = 0;
                    saleTax = 0;
                    shipping = 0;
                    total = 0;

                    init = function () {
                        if (typeof isInit === 'undefined') {
                            loadCartInfo().then(
                                function () {
                                    isInit = true;
                                }
                            );

                        }
                    };

                    getItems = function () {
                        return items;
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
                     * Total qty of items
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

                    reload = function () {
                        var deferReload = $q.defer();

                        loadCartInfo().then(
                            function () {
                                isInit = true;
                                deferReload.resolve(isInit);
                            }
                        );

                        return deferReload.promise;
                    };

                    loadCartInfo = function () {
                        var deferLoadCart = $q.defer();

                        $cartApiService.info().$promise.then(
                            function (response) {
                                if (response.error === '') {

                                    items = [];
                                    // Apply options by all products
                                    for(var i = 0; i < response.result.items.length ; i += 1){
//                                        response.result.items[i].product = $pdpProductOptionsService.applyOptions(response.result.items[i].product, response.result.items[i].options);
                                        response.result.items[i].product = response.result.items[i].product;
                                        response.result.items[i].hasOptions = JSON.stringify(response.result.items[i].options) === JSON.stringify({}) ? false : true;

                                        items.push(response.result.items[i]);
                                    }

                                    visitorId = response.result.visitor_id;     // jshint ignore:line
                                    deferLoadCart.resolve(true);
                                } else {
                                    items = undefined;
                                    visitorId = undefined;
                                    deferLoadCart.resolve(false);
                                }
                            }
                        );

                        return deferLoadCart.promise;
                    };

                    addItem = function (productId, qty, options) {
                        var deferAddItem = $q.defer();
                        $cartApiService.add({
                            'productId': productId,
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
                        if (w.confirm('You really want remove this item from shopping cart?')) {
                            var deferRemoveItem = $q.defer();

                            $cartApiService.remove({'itemIdx': itemIdx}).$promise.then(
                                function () {
                                    loadCartInfo().then(
                                        function () {
                                            deferRemoveItem.resolve(true);
                                        }
                                    );
                                }
                            );

                            return deferRemoveItem.promise;
                        }
                    };

                    update = function (itemIdx, qty) {
                        var deferRemoveItem = $q.defer();

                        $cartApiService.update({
                            'itemIdx': itemIdx,
                            'qty': qty
                        }).$promise.then(
                            function () {
                                loadCartInfo().then(
                                    function () {
                                        deferRemoveItem.resolve(true);
                                    }
                                );
                            }
                        );

                        return deferRemoveItem.promise;
                    };

                    return {
                        'init': init,
                        'reload': reload,
                        'add': addItem,
                        'remove': remove,
                        'update': update,
                        'getItems': getItems,
                        'getItemsForMiniCart': getItemsForMiniCart,
                        'getCountItems': getCountItems,

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
            ]
        );

        return cartModule;
    });

})(window, window.define);
