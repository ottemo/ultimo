angular.module("checkoutModule")

.controller("checkoutOrderConfirmationController", ["$scope", "$routeParams",
function($scope, $routeParams){
    $scope.orderId = $routeParams.orderId;
}]);
