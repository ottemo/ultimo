(function (define) {
    "use strict";

    define([
            "angular",
            "visitor/service/facebook",
            "visitor/service/google"
        ],
        function (angular, fb, gl) {

            angular.module.visitorModule.controller('visitorLoginControllerBlitz', [
                '$scope',
                '$controller',
                '$routeParams',
                '$visitorApiService',
                '$visitorLoginService',
                '$location',
                '$cartService',
                '$commonHeaderService',
                '$commonSidebarService',
                function ($scope, $controller, $routeParams, $visitorApiService, $visitorLoginService, $location, $cartService, $commonHeaderService, $commonSidebarService) {
                    $controller('visitorLoginController', {$scope: $scope});

                    $scope.clickToCartDesktop = function () {

                        var miniCart;
                        miniCart = $('#mini-cart');
//                        $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
//                            if (isLoggedIn) {
                        miniCart.toggleClass('active');
//                            } else {
//                                $('#form-login').modal('show');
//                            }
//                        });

                    };
 }
            ]);

            return angular.module.visitorModule;
        }
    );
})(window.define);