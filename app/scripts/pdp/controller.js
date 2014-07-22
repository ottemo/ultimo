(function (define) {
    "use strict";

    define(["pdp/init"], function (pdpModule) {

        pdpModule
            /*
             *  HTML top page header manipulator (direct service mapping)
             */
            .controller("pdpController", ["$scope", "$routeParams", "$pdpApiService", "$designImageService", function ($scope, $routeParams, $pdpApiService, $designImageService) {
                var defaultProduct;

                defaultProduct = function () {
                    return {};
                };

                $scope.productId = $routeParams.id;

                $scope.product = defaultProduct();
                $scope.qty = 1;

                $pdpApiService.getProduct({"id": $scope.productId}).$promise.then(
                    function (response) {
                        var result = response.result || defaultProduct();
                        $scope.product = result;
                    }
                );

                $scope.getTotal = function(){
                    return $scope.qty * $scope.product.price;
                };

                //-----------------
                // IMAGE FUNCTIONS
                //-----------------
                $scope.reloadImages = function () {
                    if ($scope.product !== undefined && $scope.product._id !== undefined) {
                        // taking media patch for new product
                        $pdpApiService.getImagePath({"productId": $scope.product._id}).$promise.then(
                            function (response) {
                                $scope.imagesPath = response.result || "";
                            });

                        // taking registered images for product
                        $pdpApiService.listImages({"productId": $scope.product._id}).$promise.then(
                            function (response) {
                                $scope.productImages = response.result || [];
                            });
                    }
                };


                $scope.$watch("product", function () {
                    $scope.reloadImages();
                });

                /**
                 * Returns full path to image
                 *
                 * @param {string} path     - the destination path to product folder
                 * @param {string} image    - image name
                 * @returns {string}        - full path to image
                 */
                $scope.getImage = function (path, image) {
                    return $designImageService.getFullImagePath(path, image);
                };
            }]);

        return pdpModule;
    });
})(window.define);