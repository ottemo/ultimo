(function (define) {
    "use strict";

    define(["angular", "category/init"], function (angular, categoryModule) {
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
                            var miniCart, addItem;
                            miniCart = $("#mini-cart");


                            addItem = function () {
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
                            };

                            if (angular.appConfigValue("general.checkout.guest_checkout")) {
                                addItem();
                            } else {
                                $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                    if (isLoggedIn) {
                                        addItem();
                                    } else {
                                        $("#form-login").modal("show");
                                    }
                                });
                            }
                        };
                    }
                ]);

            return categoryModule;
        }
    );
})(window.define);