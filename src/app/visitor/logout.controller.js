angular.module("visitorModule")

.controller("visitorLogoutController", [
    "$scope",
    "$window",
    "$visitorLoginService",
    "$cartService",
    function($scope, $window, $visitorLoginService, $cartService) {

        activate();

        //////////////////////
        
        function activate() {

            // Log the user out and send them to the homepage
            $visitorLoginService.isLoggedIn()
                .then(function(isLoggedIn) {
                    isLoggedIn ? logoutActions() : sendHome();
            });
        }

        function logoutActions() {
            $visitorLoginService.logout()
                .then($cartService.reload)
                .then(sendHome);
        }

        function sendHome() {
            return window.location.href = '/';
        }
    }
]);

