(function (define) {
    "use strict";

    define([
            "angular",
            "visitor/service/facebook",
            "visitor/service/google"
        ],
        function (angular, fb, gl) {

            angular.module.visitorModule
                .config(["$routeProvider", function ($routeProvider) {

                    fb.init();
                    gl.init();

                    $routeProvider
                        .when("/logout", {
                            template: "",
                            controller: "visitorLogoutControllerUrb"
                        })
                        .when("/account", {
                            templateUrl: angular.getTheme("visitor/account.html"),
                            controller: "visitorAccountController"
                        })
                        .when("/account/address", {
                            templateUrl: angular.getTheme("visitor/account/address-manager.html"),
                            controller: "visitorAddressControllerUrb"
                        })
                        .when("/account/orders", {
                            templateUrl: angular.getTheme("visitor/account/order.html"),
                            controller: "visitorOrderController"
                        })
                        .when("/account/order/:id", {
                            templateUrl: angular.getTheme("visitor/account/order-details.html"),
                            controller: "visitorOrderController"
                        })
                        .when("/login", {
                            templateUrl: angular.getTheme("visitor/login-page.html"),
                            controller: "visitorLoginControllerUrb"
                        })
                        .when("/registration", {
                            templateUrl: angular.getTheme("visitor/registration-page.html"),
                            controller: "visitorLoginControllerUrb"
                        });
                }])
                .run([
                    "$commonHeaderService",
                    "$visitorLoginService",
                    "$commonSidebarService",
                    function ($commonHeaderService, $visitorLoginService) {
                        $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                            if (!isLoggedIn) {
                                $commonHeaderService.addMenuRightItem("/registration", "Registration", "/registration");
                            }
                        });

                    }
                ]);

            return angular.module.visitorModule;
        });

})(window.define);