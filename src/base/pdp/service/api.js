/*
 *  pdpApiService interaction service
 */
angular.module("pdpModule")
    .service('pdpApiService', [
        '$resource',
        'commonUtilService',
        'REST_SERVER_URI',
        function (
            $resource,
            commonUtilService,
            REST_SERVER_URI
        ) {

        return $resource(REST_SERVER_URI, {}, {
            'getProduct': {
                method: 'GET',
                url: REST_SERVER_URI + '/product/:productID',
                transformResponse: transformProduct
            },
            "getProducts": {
                method: "GET",
                url: REST_SERVER_URI + "/products",
                transformResponse: transformProductList
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

        /////////////////////////////////////////

        function transformProduct(data) {
            var resp = angular.fromJson(data);
            if (resp.result && resp.result.options) {
                resp.result.options = commonUtilService.processProductOptions(resp.result.options);
            }

            return resp;
        }

        function transformProductList(data) {
            var resp = angular.fromJson(data);
            if (resp.result) {
                resp.result.forEach(function(product) {
                    if (product.options) {
                        product.options = commonUtilService.processProductOptions(product.options);
                    }
                });
            }

            return resp;
        }
    }]);