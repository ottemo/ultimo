/**
 *  Angular "visitorModule" declaration
 */
angular.module("visitorModule", [
    "ngRoute",
    "ngResource",
    "ngCookies",
    "giftCardsModule"
])

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
                templateUrl: "theme/views/visitor/account.html",
                controller: "visitorAccountController"
            })
            .when("/account/address", {
                templateUrl: "theme/views/visitor/account/address-manager.html",
                controller: "visitorAddressController"
            })
            .when("/account/orders", {
                templateUrl: "theme/views/visitor/account/order.html",
                controller: "visitorOrderController"
            })
            .when("/account/order/:id", {
                templateUrl: "theme/views/visitor/account/order-details.html",
                controller: "visitorOrderController"
            })
            .when("/account/gift-cards", {
                templateUrl: "theme/views/visitor/account/gift-cards.html",
                controller: "giftCardsController"
            })
            .when("/login", {
                templateUrl: "theme/views/visitor/login-page.html",
                controller: "visitorLoginController"
            })
            .when("/forgot-password", {
                templateUrl: "theme/views/visitor/forgot-password.html",
                controller: "visitorLoginController"
            })
            .when("/resend-activation", {
                templateUrl: "theme/views/visitor/resend-activation.html",
                controller: "visitorLoginController"
            })
            .when("/registration", {
                templateUrl: "theme/views/visitor/registration-page.html",
                controller: "visitorLoginController"
            });

        $locationProvider.html5Mode(true);
    }])
    .run([
        "$rootScope",
        "$location",
        "$anchorScroll",
        "$visitorLoginService",
        function ($rootScope, $location, $anchorScroll,  $visitorLoginService) {
            $anchorScroll.yOffset = 150;

            // save auth data in root var
            //
            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                $rootScope.visitorProps = $visitorLoginService.props;
            });

            $rootScope.$on('$locationChangeStart', function (evt, absNewUrl, absOldUrl) {
                var prevUri = absOldUrl.substring($location.absUrl().length - $location.url().length);
                var matches = /^([^?]+)\?*(.*)$/g.exec(prevUri);
                if (matches !== null) {
                    angular.module('visitorModule').back = {};
                    angular.module('visitorModule').back.url = absOldUrl;
                    angular.module('visitorModule').back.path = matches[1] || "";
                    angular.module('visitorModule').back.params = matches[2] || "";
                    //console.log('new route', matches, angular.module('visitorModule').back )
                } else {
                    //console.log('new route, but matches was null', absOldUrl, prevUri)
                }
            });
        }
    ]
);