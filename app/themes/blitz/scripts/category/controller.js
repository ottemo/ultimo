(function (define) {
    "use strict";

    define(["category/init"], function (categoryModule) {
            categoryModule

                .controller("categoryListControllerBlitz", [
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

                        $scope.addToCart = function (productId) {

                            var miniCart;
                            miniCart = $("#mini-cart");

                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                if (isLoggedIn) {
                                    $cartService.add(productId, 1, $pdpProductService.getOptions()).then(
                                        function (response) {
                                            if (response.error !== "") {
                                                miniCart.toggleClass('active');
                                                $location.path($pdpProductService.getUrl(productId).replace("#/", ""));
                                            } else {
                                                $pdpProductService.setOptions({});
                                                $("#quick-view").modal('hide');

                                                miniCart.addClass('active');
                                                setTimeout(function () {
                                                    miniCart.removeClass('active');
                                                }, 2000);
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

            return categoryModule;
        }
    );
})(window.define);