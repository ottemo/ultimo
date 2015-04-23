module.exports = function (commonModule) {

    commonModule
    /**
     *  HTML top page header manipulator (direct service mapping)
     */
        .controller("commonControllerBlitz", [
            "$scope",
            "$controller",
            "$designService",
            "$commonApiService",
            "$categoryApiService",
            "$designImageService",
            "$commonBreadcrumbsService",
            "$cartService",
            "$pdpProductService",
            "$route",
            function ($scope, $controller, $designService, $commonApiService, $categoryApiService, $designImageService, $commonBreadcrumbsService, $cartService, $pdpProductService) {
                $controller('commonController', {$scope: $scope});

                $scope.loadProducts = function () {
                    var splitName;

                    splitName = function (string) {
                        var parts;
                        var regExp = /\[(.+)\](.+)/i;
                        parts = string.match(regExp);

                        return parts;
                    };

                    $scope.products = [];
                    $scope.productService = $pdpProductService;

                    $commonApiService.getProducts({
                        "limit": "0,6",
                        "extra": "price"
                    }).$promise.then(
                        function (response) {
                            $scope.products = [];
                            var result, i, parts;
                            result = response.result || [];
                            for (i = 0; i < result.length; i += 1) {
                                parts = splitName(result[i].Name);
                                $scope.products.push({
                                    "Id": result[i].ID,
                                    "Image": result[i].Image,
                                    "Name": parts[2],
                                    "Sku": parts[1],
                                    "Price": result[i].Extra.price
                                });
                            }
                        }
                    );
                };


                $scope.productFeatured = [];

                $commonApiService.getCategories().$promise.then(
                    function (response) {
                        var result, i, categoryFeaturedId;
                        result = response.result || [];
                        for (i = 0; i < result.length; i += 1) {
                            if (result[i].name === "featured") {
                                categoryFeaturedId = result[i].id;

                                $categoryApiService.getProductsByCategoryId({"id": categoryFeaturedId}).$promise.then(
                                    function (response) {
                                        var result, i;
                                        result = response.result || [];
                                        for (i = 0; i < result.length; i += 1) {
                                            $scope.productFeatured.push({
                                                "Id": result[i]._id,
                                                "Image": result[i]["default_image"],
                                                "Name": result[i].name,
                                                "Price": result[i].price
                                            });
                                        }
                                    }
                                );
                            }

                        }
                    }
                );

                $scope.preventLink = function ($event) {
                    $event.preventDefault();
                };

            }
        ]
    );

    return commonModule;
};