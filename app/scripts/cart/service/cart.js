(function (define) {
    "use strict";

    /**
     *  HTML top page header manipulation stuff
     */
    define([
        "cart/init"
    ], function (cartModule) {
        cartModule

        /**
         *  $cartService interaction service
         */
            .service("$cartService", [
                "$resource",
                "$cartApiService",
                "$q",
                function ($resource, $cartApiService, $q) {

                    /** Variables */
                    var isInit, items, cartInfo, visitorId, subtotal, saleTax, shipping, total;
                    /** Functions */
                    var addItem, init, reload, loadCartInfo, getItems, remove, update,
                        getSubtotal, getSalesTax, getShipping, getTotal,
                        setSubtotal, setSalesTax, setShipping, setTotal, getCountItems;

                    init = function () {
                        if (typeof isInit === "undefined") {
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

                    getSubtotal = function () {
                        return subtotal;
                    };

                    setSubtotal = function (subtotal) {
                        subtotal = subtotal;
                        return subtotal;
                    };

                    getSalesTax = function () {
                        return saleTax;
                    };

                    setSalesTax = function (saleTax) {
                        saleTax = saleTax;
                        return saleTax;
                    };

                    getShipping = function () {
                        return shipping;
                    };

                    setShipping = function (shipping) {
                        shipping = shipping;
                        return shipping;
                    };

                    getTotal = function () {
                        return total;
                    };

                    setTotal = function (total) {
                        total = total;
                        return total;
                    };

                    /**
                     * Total qty of items
                     *
                     * @returns {number}
                     */
                    getCountItems = function () {
                        var i, count;
                        count = 0;

                        if (typeof items !== "undefined") {
                            for (i = 0; i < items.length; i += 1) {

                                count += items[i].qty;
                            }
                        }

                        return count;
                    };

                    reload = function () {
                        var deferReload = $q.defer();
                        deferReload.resolve(false);
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
                                if (response.error === "") {
                                    items = response.result.items;
                                    cartInfo = response.result.cart_info;
                                    visitorId = response.result.visitor_id;
                                    deferLoadCart.resolve(true);
                                } else {
                                    items = undefined;
                                    cartInfo = undefined;
                                    visitorId = undefined;
                                    deferLoadCart.resolve(false);
                                }
                            }
                        );

                        return deferLoadCart.promise;
                    };

                    addItem = function (productId, qty) {
                        var deferAddItem = $q.defer();
                        $cartApiService.add({
                            "productId": productId,
                            "qty": qty
                        }).$promise.then(
                            function () {
                                loadCartInfo();
                            }
                        );


                        return deferAddItem.promise;
                    };

                    remove = function (itemIdx) {
                        var deferRemoveItem = $q.defer();

                        $cartApiService.remove({"itemIdx": itemIdx}).$promise.then(
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

                    update = function (itemIdx, qty) {
                        var deferRemoveItem = $q.defer();

                        $cartApiService.update({
                            "itemIdx": itemIdx,
                            "qty": qty
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
                        "init": init,
                        "reload": reload,
                        "add": addItem,
                        "remove": remove,
                        "update": update,
                        "getItems": getItems,
                        "getCountItems": getCountItems,

                        "getSubtotal": getSubtotal,
                        "setSubtotal": setSubtotal,
                        "getSalesTax": getSalesTax,
                        "setSalesTax": setSalesTax,
                        "getShipping": getShipping,
                        "setShipping": setShipping,
                        "getTotal": getTotal,
                        "setTotal": setTotal
                    };
                }
            ]
        );

        return cartModule;
    });

})(window.define);