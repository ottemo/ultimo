angular.module("visitorModule")

.controller('visitorAccountOrderController', [
    '$scope',
    '$location',
    '$routeParams',
    'visitorLoginService',
    'visitorApiService',
    'commonUtilService',
    function($scope, $location, $routeParams, visitorLoginService, visitorApiService, commonUtilService) {

        $scope.orderId = $routeParams.id;
        $scope.ordersList = [];
        $scope.order = [];

        $scope.getOptionLabel = commonUtilService.getOptionLabel;

        $scope.visitor = visitorLoginService.getVisitor();

        //////////////////////////

        $scope.activate = function() {
            // BREADCRUMBS
            $scope.$emit('add-breadcrumbs', {
                'label': 'MyAccount',
                'url': '/account'
            });
            $scope.$emit('add-breadcrumbs', {
                'label': 'Order',
                'url': '/account/orders'
            });

            visitorLoginService.isLoggedIn().then(function(isLoggedIn) {
                if (!isLoggedIn) {
                    $location.path("/");
                }
            });

            if ($scope.orderId) {
                $scope._fetchOrder();
            } else {
                $scope._fetchOrderList();
            }
        };

        $scope._fetchOrderList = function() {
            var data = {
                "extra": "created_at,status,grand_total",
                "limit": "0,1000"
            };

            visitorApiService.getOrderList(data).$promise
                .then(function(response) {
                    $scope.ordersList = response.result || [];
                });
        };

        $scope._fetchOrder = function() {
            var data = {
                "orderID": $scope.orderId
            };

            visitorApiService.getOrder(data).$promise
                .then(function(response) {
                    $scope.order = response.result || [];
                    $scope.$emit('add-breadcrumbs', {
                        'label': $scope.order["_id"],
                        'url': '/account/order/' + $scope.orderId
                    });
                });
        };

        $scope.$watch('addedOrderId', function() {
            if (typeof $scope.addedOrderId !== 'undefined') {
                $scope.message = commonUtilService.getMessage(null, "success", "THANK YOU FOR YOUR PURCHASE!<br/>" +
                    "Your order # is: <a href=\"/account/order/" + $scope.addedOrderId + "\">" + $scope.addedOrderId + "</a>"
                );
            }
        });

        // REFACTOR:
        // Sidebar
        $scope.isActive = function(path) {
            return ($location.path() === path);
        };

    }
]);
