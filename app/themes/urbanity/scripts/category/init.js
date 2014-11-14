(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /**
             *  Angular "categoryModule" declaration
             */
            angular.module.categoryModule

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/category/:id", {
                            "templateUrl": angular.getTheme("category/view.html"),
                            "controller": "categoryListControllerUrb"
                        })

                        .when("/category/:id/p/:currentPage", {
                            templateUrl: angular.getTheme("category/view.html"),
                            controller: "categoryListControllerUrb"
                        });
                }])

                .run(["$designService", "$rootScope", function ($designService, $rootScope) {

                    /**
                     *  Global functions you can use in any angular template
                     */
                    $rootScope.getTemplate = $designService.getTemplate;
                    $rootScope.getTopPage = $designService.getTopPage;
                    $rootScope.getCss = $designService.getCssList;
                    $rootScope.getImg = $designService.getImage;

                }])
                .controller("categoryListControllerUrb", [
                    "$scope",
                    "$controller",
                    "$location",
                    "$route",
                    "$routeParams",
                    "$categoryApiService",
                    "$designService",
                    "$designImageService",
                    "$categoryService",
                    "$visitorLoginService",
                    "$cartService",
                    "$pdpProductService",
                    function ($scope, $controller, $location, $route, $routeParams, $categoryApiService, $designService, $designImageService, $categoryService, $visitorLoginService, $cartService, $pdpProductService) {
                        $controller('categoryListController', {$scope: $scope});
                        $scope.openPopUp = function (product) {
                            $pdpProductService.setProduct(product);
                            $scope.popupProduct = $pdpProductService.getProduct();
                            $scope.productService.getRatingInfo(product._id);
                            $("#parent_popup_quickShop").show();
                        };

                        $scope.addToCart = function (productId) {
                            var miniCart;
                            miniCart = $(".mini-cart");

                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                if (isLoggedIn) {
                                    $cartService.add(productId, 1, $pdpProductService.getOptions()).then(
                                        function (response) {
                                            if (response.error !== "") {
                                                $location.path($pdpProductService.getUrl(productId).replace("#/", ""));
                                            } else {
                                                $pdpProductService.setOptions({});
                                                $("#parent_popup_quickShop").hide();

                                                miniCart.css("display", "table");
                                                setTimeout(function () {
                                                    miniCart.hide();
                                                }, 1500);
                                            }
                                        }
                                    );
                                } else {
                                    $("#form-login").modal("show");
                                }
                            });

                        };
                    }
                ]);

            return angular.module.categoryModule;
        });

})(window.define);