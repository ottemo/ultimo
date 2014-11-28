(function (define, $) {
    "use strict";


        define(["common/init"], function (commonModule) {

        commonModule
        /**
         *  HTML top page header manipulator (direct service mapping)
         */
            .controller("commonControllerBlitz", [
                            "$scope",
                            "$controller",
                            "$designService",
                            "$commonApiService",
                            "$designImageService",
                            "$commonBreadcrumbsService",
                            "$cartService",
                            "$pdpProductService",
                            "$route",
                            function ($scope,$controller, $designService, $commonApiService, $designImageService, $commonBreadcrumbsService,
                                      $cartService, $pdpProductService, $route) {

                                $controller('commonController', {$scope: $scope});

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


                            }
                        ]
                    );

            return commonModule;
        }
    );
})(window.define,jQuery);