angular.module("visitorModule")

.controller('visitorAccountOrderController', [
    '$scope',
    '$location',
    '$routeParams',
    '$visitorLoginService',
    '$visitorApiService',
    '$commonUtilService',
    function($scope, $location, $routeParams, $visitorLoginService, $visitorApiService, $commonUtilService) {

        $scope.orderId = $routeParams.id;
        $scope.ordersList = [];
        $scope.order = [];

        $scope.visitor = $visitorLoginService.getVisitor();

        var activePath = $location.path();

        activate();

        //////////////////////////

        function activate() {
            // BREADCRUMBS
            $scope.$emit('add-breadcrumbs', {
                'label': 'MyAccount',
                'url': '/account'
            });
            $scope.$emit('add-breadcrumbs', {
                'label': 'Order',
                'url': '/account/orders'
            });

            $visitorLoginService.isLoggedIn().then(function(isLoggedIn) {
                if (!isLoggedIn) $location.path("/");
            });

            $scope.orderId ? fetchOrder() : fetchOrderList();
        };

        function fetchOrderList() {
            var data = {
                "extra": "created_at,status,grand_total"
            };

            $visitorApiService.getOrderList(data).$promise
                .then(function(response) {
                    $scope.ordersList = response.result || [];
                });
        }

        function fetchOrder() {
            var data = {
                "orderID": $scope.orderId
            };

            $visitorApiService.getOrder(data).$promise
                .then(function(response) {
                    $scope.order = response.result || [];
                    $scope.$emit('add-breadcrumbs', {
                        'label': $scope.order["_id"],
                        'url': '/account/order/' + $scope.orderId
                    });
                });
        }

        $scope.$watch('addedOrderId', function() {
            if (typeof $scope.addedOrderId !== 'undefined') {
                $scope.message = $commonUtilService.getMessage(null, "success", "THANK YOU FOR YOUR PURCHASE!<br/>" +
                    "Your order # is: <a href=\"/account/order/" + $scope.addedOrderId + "\">" + $scope.addedOrderId + "</a>"
                );
            }
        });

        // REFACTOR:
        // Sidebar
        $scope.isActive = function(path) {
            return (activePath === path);
        };

    }
]);

