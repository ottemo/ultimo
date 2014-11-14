(function (define) {
    "use strict";

    define([
            "angular"
        ],
        function (angular) {

            angular.module.pdpModule

                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/product/:id", {
                            templateUrl: angular.getTheme("pdp/view.html"),
                            controller: "pdpControllerRichK"
                        });
                }])

                .controller("pdpControllerRichK", [
                    "$scope",
                    "$controller",
                    "$routeParams",
                    "$location",
                    "$pdpApiService",
                    "$pdpProductService",
                    "$designImageService",
                    "$cartService",
                    "$visitorLoginService",
                    function ($scope, $controller, $routeParams, $location, $pdpApiService, $pdpProductService, $designImageService, $cartService, $visitorLoginService) {

                        $controller("pdpController", {$scope: $scope});


                        $scope.addToCart = function () {
                            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                if (isLoggedIn) {
                                    $scope.submitted = true;
                                    $cartService.add($scope.productId, $scope.qty, $pdpProductService.getOptions()).then(
                                        function (response) {
                                            if (response.error !== "") {
                                                $scope.messageOptions = {
                                                    "type": "danger",
                                                    "message": response.error
                                                };
                                            } else {
                                                var miniCart;
                                                miniCart = $(".mini-cart");
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

            return angular.module.pdpModule;
        });

})(window.define);