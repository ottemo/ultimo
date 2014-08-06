(function (define, $) {
    "use strict";

    define(["pdp/init"], function (pdpModule) {

        pdpModule
            /*
             *  HTML top page header manipulator (direct service mapping)
             */
            .controller("pdpController", [
                "$scope",
                "$routeParams",
                "$location",
                "$pdpApiService",
                "$designImageService",
                "$cartService",
                "$visitorLoginService",
                function ($scope, $routeParams, $location, $pdpApiService, $designImageService, $cartService, $visitorLoginService) {
                    var defaultProduct;

                    defaultProduct = function () {
                        return {};
                    };

                    $scope.productId = $routeParams.id;

                    $scope.product = defaultProduct();
                    $scope.qty = 1;

                    $pdpApiService.getProduct({"id": $scope.productId}).$promise.then(
                        function (response) {
                            if (response.error === "") {
                                var result = response.result || defaultProduct();
                                $scope.product = result;

                                // BREADCRUMBS
                                $scope.$emit("add-breadcrumbs", {"label": $scope.product.name, "url": "/product/" + $scope.product._id + "/"});
                            } else {
                                $location.path("/");
                            }
                        }
                    );

                    $scope.getTotal = function () {
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

                    $scope.addToCart = function () {
                        var miniCart;
                        miniCart = $(".mini-cart");


                        if ($visitorLoginService.isLoggedIn()) {
                            $cartService.add($scope.productId, $scope.qty);

                            miniCart.css("display", "table");
                            setTimeout(function () {
                                miniCart.hide();
                            }, 1500);
                        } else {
                            $("#form-login").modal("show");
                        }


                    };

                    $scope.products = [];

                    var splitName;
                    splitName = function (string) {
                        var parts;
                        var regExp = /\[(.+)\](.+)/i;
                        parts = string.match(regExp);

                        return parts;
                    };

                    $pdpApiService.getProducts({
                        "limit": "0,5",
                        "extra": "price"
                    }).$promise.then(
                        function (response) {
                            var result, i, parts;
                            result = response.result || [];

                            for (i = 0; i < result.length; i += 1) {
                                parts = splitName(result[i].Name);
                                $scope.products.push({
                                    "Id": result[i].Id,
                                    "Image": result[i].Image,
                                    "Name": parts[2],
                                    "Sku": parts[1],
                                    "Price": result[i].Extra.price
                                });
                            }

                        }
                    );

                    $scope.changeQty = function (qtyItem, action) {
                        if (action === "up") {
                            $scope.qty = parseInt(qtyItem) + 1;
                        }
                        else if (action === "down") {
                            if (qtyItem > 1) {
                                $scope.qty = parseInt(qtyItem) - 1;
                            }
                        }
                    };


                }
            ]
        );

        return pdpModule;
    });
})(window.define, jQuery);