(function (define, $) {
    "use strict";

    define(["pdp/init"], function (pdpModule) {

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
                    // TODO: reduce the number of statements in the function below and remove jshint comment
                    function ($scope, $controller, $routeParams, $location, $timeout, $pdpApiService, $pdpProductService, $designImageService, $cartService, $visitorLoginService) {
                        $controller('pdpController', {$scope: $scope});

                        $scope.addToCart = function () {
                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                if (isLoggedIn) {
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
                                } else {
                                    $("#form-login").modal("show");
                                }
                            });
                        };
                    }
                ]);

            return pdpModule;
        }
    );
})(window.define, jQuery);