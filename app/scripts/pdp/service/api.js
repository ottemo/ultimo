angular.module("pdpModule")
    /*
     *  $productApiService interaction service
     */
    .service('$pdpApiService', ['$resource', 'REST_SERVER_URI', function ($resource, REST_SERVER_URI) {

        return $resource(REST_SERVER_URI, {}, {
            'getProduct': {
                method: 'GET',
                url: REST_SERVER_URI + '/product/:productID'
            },
            "getProducts": {
                method: "GET",
                url: REST_SERVER_URI + "/products"
            },
            "getRelated": {
                method: "GET",
                url: REST_SERVER_URI + "/product/:productID/related"
            },
            "ratingInfo": {
                method: "GET",
                url: REST_SERVER_URI + "/product/:productID/rating"
            },
            "addReview": {
                method: "POST",
                params: {
                    productID: "@productID",
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