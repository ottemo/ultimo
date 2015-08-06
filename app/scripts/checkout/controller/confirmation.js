angular.module("checkoutModule")

    .controller("checkoutOrderConfirmationController", [
        "$scope",
        "$routeParams",
        "$visitorLoginService",
        function(
            $scope,
            $routeParams,
            $visitorLoginService
        ){

            $scope.orderId = $routeParams.orderId;

            $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                $scope.isLoggedIn = isLoggedIn;
            });
        }
    ]);
