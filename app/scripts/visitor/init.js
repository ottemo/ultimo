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
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

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
                            controller: "visitorLoginController"
                        })
                        .when("/forgot-password", {
                            templateUrl: angular.getTheme("visitor/forgot-password.html"),
                            controller: "visitorLoginController"
                        })
                        .when("/resend-activation", {
                            templateUrl: angular.getTheme("visitor/resend-activation.html"),
                            controller: "visitorLoginController"
                        })
                        .when("/registration", {
                            templateUrl: angular.getTheme("visitor/registration-page.html"),
                            controller: "visitorLoginController"
                        });
                    $locationProvider.html5Mode(true);
                }])
                .run([
                    "$rootScope",
                    "$location",
                    "$anchorScroll",
                    "$commonHeaderService",
                    "$visitorLoginService",
                    "$commonSidebarService",
                    function ($rootScope, $location, $anchorScroll, $commonHeaderService, $visitorLoginService, $commonSidebarService) {
                        $anchorScroll.yOffset = 150;
                        $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                            if (isLoggedIn) {
                                $commonHeaderService.addMenuRightItem("/account", "My Account", "/account");
                                $commonHeaderService.addMenuRightItem("/logout", "Logout", "/logout");
                                $commonSidebarService.addItem("ACCOUNT", "account", "glyphicon glyphicon-user", 90);
                            } else {
                                $commonHeaderService.addMenuRightItem("/login", "Login", "/login");
                                $commonSidebarService.removeItem("logout");
                            }
                        });

                        $rootScope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
                            var prevUri = absOldUrl.substring($location.absUrl().length - $location.url().length);
                            var matches = /^([^?]+)\?*(.*)$/g.exec(prevUri);
                            if(matches !== null) {
                                angular.module.visitorModule.back = {};
                                angular.module.visitorModule.back.url = absOldUrl;
                                angular.module.visitorModule.back.path = matches[1] || "";
                                angular.module.visitorModule.back.params = matches[2] || "";
                            }
                        });
                    }
                ]
            );
            return angular.module.visitorModule;
        });

})(window.define);