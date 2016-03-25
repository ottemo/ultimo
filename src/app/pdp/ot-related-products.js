angular.module('pdpModule')

.directive('otRelatedProducts', [
    'pdpProductService',
    'pdpApiService',
    function(pdpProductService, pdpApiService) {

        return {
            scope: {
                'productId': '@'
            },
            restrict: 'A',
            templateUrl: '/views/pdp/ot-related-products.html',
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
                        'productID': productId,
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

