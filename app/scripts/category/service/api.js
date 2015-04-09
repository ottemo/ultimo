(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define(["category/init"], function (productModule) {
        productModule
            /*
             *  $productApiService interaction service
             */
            .service("$categoryApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

                return $resource(REST_SERVER_URI, {}, {
                    "getProductsByCategoryId": {
                        method: "GET",
                        url: REST_SERVER_URI + "/category/:categoryID/products"
                    },
                    "getShopProducts": {
                        method: "GET",
                        url: REST_SERVER_URI + "/products/shop"
                    },
                    "getShopLayered": {
                        method: "GET",
                        url: REST_SERVER_URI + "/products/shop/layers"
                    },
                    "getShopCountProducts": {
                        method: "GET",
                        params: { action: "count" },
                        url: REST_SERVER_URI + "/products"
                    },
                    "load": {
                        method: "GET",
                        params: { id: "@id" },
                        url: REST_SERVER_URI + "/category/:id"
                    },
                    "getCountProducts": {
                        method: "GET",
                        params: { action: "count" },
                        url: REST_SERVER_URI + "/category/:categoryID/products"
                    },
                    'getCategoryImagePath': {
                        method: 'GET',
                        params: { categoryID: '@categoryID' },
                        url: REST_SERVER_URI + '/category/:categoryID/mediapath/image'
                    },
                    "getPath":{
                        method: "GET",
                        params: {
                            productID: "@productId",
                            mediaType: "@mediaType"
                        },
                        url: REST_SERVER_URI + "/product/:productID/mediapath/:mediaType"

                    },
                    "getCategories": {
                        method: "GET",
                        url: REST_SERVER_URI + "/categories/tree"
                    },
                    "getLayered": {
                        method: "GET",
                        url: REST_SERVER_URI + "/category/:categoryID/layers"
                    }
                });
            }]);

        return productModule;
    });

})(window.define);
