angular.module("visitorModule")
    .controller("visitorLogoutController", [
        "$scope",
        "$visitorLoginService",
        "$location",
        "$cartService",
        function ($scope, $visitorLoginService, $location, $cartService) {

            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                if (!isLoggedIn) {
                    $location.path("/");
                } else {
                    $visitorLoginService.logout().then(
                        function () {

                            $cartService.reload().then(
                                function () {

                                    $location.path("/");
                                }
                            );

                        }
                    );
                }
            });
        }
    ]);