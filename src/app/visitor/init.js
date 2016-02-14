angular.module("visitorModule", [
    "ngRoute",
    "ngResource",
    "giftCardsModule"
])

.config(["$routeProvider", "$locationProvider",
    function($routeProvider, $locationProvider) {

    $routeProvider
        .when("/account", {
            title: "My Account",
            templateUrl: "/views/visitor/account/view.html",
            controller: "visitorAccountController"
        })
        .when("/account/address", {
            title: "Addresses",
            templateUrl: "/views/visitor/account/address.html",
            controller: "visitorAccountAddressController"
        })
        .when("/account/gift-cards", {
            title: "Gift Cards",
            templateUrl: "/views/visitor/account/gift-cards.html",
            controller: "visitorAccountGiftCardsController"
        })
        .when("/account/orders", {
            title: "Orders",
            templateUrl: "/views/visitor/account/order-list.html",
            controller: "visitorAccountOrderController"
        })
        .when("/account/order/:id", {
            title: "Order Details",
            templateUrl: "/views/visitor/account/order-details.html",
            controller: "visitorAccountOrderController"
        })
        .when("/forgot-password", {
            title: "Forgot Password",
            templateUrl: "/views/visitor/forgot-password.html",
            controller: "visitorLoginController"
        })
        .when("/login", {
            title: "Login",
            templateUrl: "/views/visitor/login.html",
            controller: "visitorLoginController"
        })
        .when("/logout", {
            template: "",
            controller: "visitorLogoutController"
        })
        .when("/registration", {
            title: "Register",
            templateUrl: "/views/visitor/registration.html",
            controller: "visitorLoginController"
        })
        .when("/resend-activation", {
            title: "Resend Activation",
            templateUrl: "/views/visitor/resend-activation.html",
            controller: "visitorLoginController"
        })
        .when("/reset-password", {
            title: "Reset Password",
            templateUrl: "/views/visitor/reset-password.html",
            controller: "visitorResetPasswordController"
        });
}])

.run([
    "$rootScope",
    "$location",
    "$window",
    "$anchorScroll",
    "$visitorLoginService",
    function($rootScope, $location, $window, $anchorScroll, $visitorLoginService) {
        $anchorScroll.yOffset = 150;

        // Facebook Login callback
        $window.fbAsyncInit = function() {
            $window.FB.init({
              appId: angular.appConfig.fbAppId,
              status: true,
              cookie: true,
              xfbml: false,   // parse facebook html tags <fb:like>
              version: 'v2.4'
            });
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        $window.gl.init();

        // Check if they are logged in and save auth info to root
        $visitorLoginService.isLoggedIn().then(function(isLoggedIn) {
            $rootScope.visitorProps = $visitorLoginService.props;
        });

        // After login redirect recording
        angular.module('visitorModule').back = {};

        $rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl) {

            var prevUri = absOldUrl.substring($location.absUrl().length - $location.url().length);
            var matches = /^([^?]+)\?*(.*)$/g.exec(prevUri);

            if (matches !== null) {
                var path = matches[1] || "";

                var blacklist = [
                    '^/checkout/success',
                    '^/forgot-password',
                    '^/login',
                    '^/logout',
                    '^/registration',
                    '^/resend-activation',
                    '^/reset-password',
                ].join('|');

                var blackReg = new RegExp(blacklist);
                var isPathInBlacklist = (null != path.match(blackReg));

                // Only record redirect urls if they are ones we want someone ever
                // redirecting to
                if (!isPathInBlacklist) {
                    angular.module('visitorModule').back.path = path;
                }
            }
        });
    }
]);

