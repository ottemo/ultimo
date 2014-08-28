(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource",
            "visitor/service/facebook",
            "visitor/service/google",
            "angular-cookies"
        ],
        function (angular, aRoute, aResource, fb, gl) {

            /**
             *  Angular "visitorModule" declaration
             */
            angular.module.visitorModule = angular.module("visitorModule", ["ngRoute", "ngResource", "ngCookies", "ngCookies"])

                .constant("LOGIN_COOKIE", "OTTEMOSESSION")
                .constant("VISITOR_DEFAULT_AVATAR", "avatar-placeholder.png")

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", function ($routeProvider) {

                    fb.init();
                    gl.init();

                    $routeProvider
                        .when("/logout", {
                            template: "",
                            controller: "visitorLogoutController"
                        })
                        .when("/account", {
                            templateUrl: angular.getTheme("visitor/account.html"),
                            controller: "visitorAccountController"
                        })
                        .when("/account/address", {
                            templateUrl: angular.getTheme("visitor/account/address-manager.html"),
                            controller: "visitorAddressController"
                        })
                        .when("/account/order/list", {
                            templateUrl: angular.getTheme("visitor/account/order.html"),
                            controller: "visitorOrderController"
                        })

                        .when("/account/order/:id", {
                            templateUrl: angular.getTheme("visitor/account/order-details.html"),
                            controller: "visitorOrderController"
                        })
                        .when("/account/order/success/:successId", {
                            templateUrl: angular.getTheme("visitor/account/order.html"),
                            controller: "visitorOrderController"
                        })
                        .otherwise({redirectTo: "/"});
                }])
                .run([
                    "$commonHeaderService",
                    "$visitorLoginService",
                    "$commonSidebarService",
                    function ($commonHeaderService, $visitorLoginService, $commonSidebarService) {
                        var isLoggedIn;

                        isLoggedIn = $visitorLoginService.isLoggedIn();
                        if (isLoggedIn === null) {
                            $visitorLoginService.init().then(
                                function () {
                                    if ($visitorLoginService.isLoggedIn()) {
                                        $commonHeaderService.addMenuRightItem("/account", "My Account", "/account");
                                        $commonHeaderService.addMenuRightItem("/logout", "Logout", "/logout");
                                        $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user", 90);
                                    } else {
                                        $commonHeaderService.addMenuRightItem("/login", "Login", "/login");
                                        $commonSidebarService.removeItem("account");
                                    }
                                }
                            );
                        } else {
                            if ($visitorLoginService.isLoggedIn()) {
                                $commonHeaderService.addMenuRightItem("/account", "My Account", "/account");
                                $commonHeaderService.addMenuRightItem("/logout", "Logout", "/logout");
                                $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user", 90);
                            } else {
                                $commonHeaderService.addMenuRightItem("/login", "Login", "/login");
                                $commonSidebarService.removeItem("logout");
                            }
                        }
                    }
                ]
            );
            return angular.module.visitorModule;
        });

})(window.define);