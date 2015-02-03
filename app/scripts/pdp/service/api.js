(function (define) {
    'use strict';

    /*
     *  HTML top page header manipulation stuff
     */
    define(['pdp/init'], function (pdpModule) {
        pdpModule
            /*
             *  $productApiService interaction service
             */
            .service('$pdpApiService', ['$resource', 'REST_SERVER_URI', function ($resource, REST_SERVER_URI) {

                return $resource(REST_SERVER_URI, {}, {
                    'getProduct': {
                        method: 'GET',
                        url: REST_SERVER_URI + '/product/:productID'
                    },
                    'getImagePath': {
                        method: 'GET',
                        url: REST_SERVER_URI + '/product/:productID/mediapath/image'
                    },
                    'listImages': {
                        method: 'GET',
                        url: REST_SERVER_URI + '/product/:productID/media/:mediaType'
                    },
                    "getProducts": {
                        method: "POST",
                        url: REST_SERVER_URI + "/products"
                    },
                    "getRelated": {
                        method: "POST",
                        url: REST_SERVER_URI + "/product/:productID/related"
                    },
                    "ratingInfo": {
                        method: "GET",
                        url: REST_SERVER_URI + "/product/:productID/rating"
                    },
                    "addReview": {
                        method: "POST",
                        params: {
                            productID: "@pid",
                            stars: "@stars"
                        },
                        headers: {"Content-Type": "text/plain"},
                        url: REST_SERVER_URI + "/product/:productID/review"
                    },
                    "reviewList": {
                        method: "GET",
                        url: REST_SERVER_URI + "/product/:productID/reviews"
                    },
                    "reviewRemove": {
                        method: "DELETE",
                        url: REST_SERVER_URI + "/product/:productID/review/:reviewID"
                    },
                    "getAttributes": {
                        method: "GET",
                        url: REST_SERVER_URI + "/products/attributes"
                    }
                });
            }]);

        return pdpModule;
    });

})(window.define);
