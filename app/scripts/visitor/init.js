/**
 *  Angular "visitorModule" declaration
 */
angular.module("visitorModule", [
    "ngRoute",
    "ngResource",
    "giftCardsModule"
])

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
                title: "My Account",
                templateUrl: "theme/views/visitor/account.html",
                controller: "visitorAccountController"
            })
            .when("/account/address", {
                title: "Addresses",
                templateUrl: "theme/views/visitor/account/address-manager.html",
                controller: "visitorAddressController"
            })
            .when("/account/orders", {
                title: "Orders",
                templateUrl: "theme/views/visitor/account/order.html",
                controller: "visitorOrderController"
            })
            .when("/account/order/:id", {
                title: "Order Details",
                templateUrl: "theme/views/visitor/account/order-details.html",
                controller: "visitorOrderController"
            })
            .when("/account/gift-cards", {
                title: "Gift Cards",
                templateUrl: "theme/views/visitor/account/gift-cards.html",
                controller: "giftCardsController"
            })
            .when("/login", {
                title: "Login",
                templateUrl: "theme/views/visitor/login-page.html",
                controller: "visitorLoginController"
            })
            .when("/forgot-password", {
                title: "Forgot Password",
                templateUrl: "theme/views/visitor/forgot-password.html",
                controller: "visitorLoginController"
            })
            .when("/reset-password", {
                templateUrl: "theme/views/visitor/reset-password.html",
                controller: "resetPasswordController"
            })
            .when("/resend-activation", {
                title: "Resend Activation",
                templateUrl: "theme/views/visitor/resend-activation.html",
                controller: "visitorLoginController"
            })
            .when("/registration", {
                title: "Register",
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

            angular.module('visitorModule').back = {};

            // save auth data in root var
            //
            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                $rootScope.visitorProps = $visitorLoginService.props;
            });

            $rootScope.$on('$locationChangeStart', function (evt, absNewUrl, absOldUrl) {

                var prevUri = absOldUrl.substring($location.absUrl().length - $location.url().length);
                var matches = /^([^?]+)\?*(.*)$/g.exec(prevUri);

                if (matches !== null) {
                    var path = matches[1] || "";

                    var pathBlacklist = [
                        '/forgot-password',
                        '/reset-password',
                        '/login',
                        '/logout',
                        '/resend-activation',
                        '/registration',
                    ];

                    var isPathInBlacklist = (-1 !== pathBlacklist.indexOf(path));

                    // Only record redirect urls if they are ones we want someone ever
                    // redireting to
                    if (!isPathInBlacklist) {
                        angular.module('visitorModule').back.path = path;
                    }
                }
            });
        }
    ]
);