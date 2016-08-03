
angular.module('categoryModule')

.directive('otCategoryProducts', ['categoryApiService', 'pdpProductService',
    function(categoryApiService, pdpProductService) {
        return {
            restrict: 'A',
            scope: {
                'categoryId': '@',
                'limit': '@'
            },
            templateUrl: '/views/category/directives/ot-category-products.html',
            controller: function($scope) {
                $scope.productsList = [];
                $scope.productService = pdpProductService;

                activate();

                /////////////////

                function activate() {

                    // Fetch the product list for this category
                    var params = {
                        categoryID: $scope.categoryId,
                        limit: $scope.limit || 4
                    };

                    categoryApiService.getProductsByCategoryId(params).$promise
                        .then(function(resp) {
                            $scope.productsList = resp.result;
                        });
                }
            }
        };
    }
]);