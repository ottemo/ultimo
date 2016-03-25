/*
 *  pdpApiService interaction service
 */
angular.module("pdpModule")
    .service('pdpApiService', ['$resource', 'REST_SERVER_URI', function ($resource, REST_SERVER_URI) {

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
                resp.result.options = processOptions(resp.result.options);
            }

            return resp;
        }

        function transformProductList(data) {
            var resp = angular.fromJson(data);
            if (resp.result) {
                resp.result.forEach(function(product) {
                    if (product.options) {
                        product.options = processOptions(product.options);
                    };
                });
            }

            return resp;
        }

        // duplicate in category/service/api.js
        function processOptions(allOptions) {

            // Process and convert to array
            var resp = _.map(allOptions, function(option, code) {

                // Sort the option items
                option.options = _.sortBy(option.options, 'order');

                // Add a css Class
                option.cssClass = _.kebabCase('option'+option.label);

                return option;
            });

            // Now sort the options by the order
            resp = _.sortBy(resp, 'order');

            return resp;
        }
    }]);