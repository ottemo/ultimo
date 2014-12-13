(function (define, $) {
    "use strict";

    define(["angular", "pdp/init"], function (angular, pdpModule) {

            pdpModule
            /**
             *  HTML top page header manipulator (direct service mapping)
             */
                .controller("pdpControllerBlitz", [
                    "$scope",
                    "$controller",
                    "$routeParams",
                    "$location",
                    "$timeout",
                    "$pdpApiService",
                    "$pdpProductService",
                    "$designImageService",
                    "$cartService",
                    "$visitorLoginService",
                    function ($scope, $controller, $routeParams, $location, $timeout, $pdpApiService, $pdpProductService, $designImageService, $cartService, $visitorLoginService) {
                        $controller('pdpController', {$scope: $scope});

                        $scope.addToCart = function () {
                            var addItem = function () {

                                $scope.submitted = true;
                                $cartService.add($scope.productId, $scope.qty, $pdpProductService.getOptions()).then(
                                    function (response) {
                                        if (response.error !== "") {
                                            $scope.messageOptions = {
                                                'type': 'danger',
                                                'message': response.error
                                            };
                                        } else {
                                            var miniCart;
                                            miniCart = $("#mini-cart");
                                            miniCart.addClass('active');
                                            $timeout(function () {
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

            return pdpModule;
        }
    );
})(window.define, jQuery);