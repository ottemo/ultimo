angular.module("pdpModule")

.directive('otRelatedProducts', [
    "designService",
    "pdpProductService",
    "pdpApiService",
    function(designService, pdpProductService, pdpApiService) {
        return {
            scope: {
                "productId": "@"
            },
            restrict: 'A',
            templateUrl: designService.getTemplate("pdp/ot-related-products.html"),
            link: function($scope, $element, $attributes, controller) {
                $scope.related = [];
                $scope.getUrl = getUrl;

                activate();

                //////////////////

                function activate() {

                    // Get related products
                    $attributes.$observe('productId', function(newProductId) {
                        fetchRelatedProducts(newProductId).then(function(relatedProducts) {
                            $scope.related = relatedProducts;
                        });
                    });
                }

                function fetchRelatedProducts(productId) {
                    var params = {
                        "productID": productId,
                    };

                    return pdpApiService.getRelated(params).$promise
                        .then(function(response) {
                            return response.result || [];
                        });
                }

                function getUrl(id) {
                    return pdpProductService.getUrl(id);
                }
            }
        };
    }
]);

