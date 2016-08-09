angular.module("visitorModule")

.controller("visitorLogoutController", [
    "$scope",
    "$window",
    "visitorLoginService",
    "cartService",
    function($scope, $window, visitorLoginService, cartService) {

        $scope.activate = function() {
            // Log the user out and send them to the homepage
            visitorLoginService.isLoggedIn()
                .then(function(isLoggedIn) {
                    isLoggedIn ? $scope.logoutActions() : $scope.sendHome();
            });
        };

        $scope.logoutActions = function() {
            visitorLoginService.logout()
                .then(cartService.reload)
                .then($scope.sendHome);
        };

        $scope.sendHome = function() {
            return $window.location.href = '/';
        };
    }
]);

