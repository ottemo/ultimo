angular.module("visitorModule")

.controller("visitorLogoutController", [
    "$scope",
    "$visitorLoginService",
    "$location",
    "$cartService",
    function($scope, $visitorLoginService, $location, $cartService) {

        $visitorLoginService.isLoggedIn()
            .then(function(isLoggedIn) {
                if (!isLoggedIn) {
                    $location.path("/");
                } else {
                    // Send logout request, and clean up visitor object
                    $visitorLoginService.logout()
                        .then(function() {

                            // Update the cart
                            $cartService.reload()
                                .then(function() {
                                    $location.path("/");
                                });

                        });
                }
            });
    }
]);

