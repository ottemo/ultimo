(function (define) {
    "use strict";

    define(["visitor/init"], function (loginModule) {
        loginModule.controller("visitorLogoutController", [
            "$scope",
            "$visitorLoginService",
            "$location",
            "$cartService",
            "$commonHeaderService",
            "$commonSidebarService",
            function ($scope, $visitorLoginService, $location, $cartService, $commonHeaderService, $commonSidebarService) {

                if ($visitorLoginService.isLoggedIn()) {

                    $visitorLoginService.logout().then(
                        function () {

                            $cartService.reload().then(
                                function () {

                                    // Update right menu
                                    $commonHeaderService.addMenuRightItem("/login", "Login", "/login");
                                    $commonHeaderService.removeItem("right", "/account");
                                    $commonHeaderService.removeItem("right", "/logout");

                                    // Update sidebar
                                    $commonSidebarService.removeItem("account");

                                    $location.path("/");
                                }
                            );


                        }
                    );

                } else {
                    $location.path("/");
                }

            }
        ]);
        return loginModule;
    });
})(window.define);