angular.module("visitorModule")

    .controller('visitorOrderController', [
        '$scope',
        '$location',
        '$routeParams',
        '$visitorLoginService',
        '$visitorApiService',
        '$commonUtilService',
        function ($scope, $location, $routeParams, $visitorLoginService, $visitorApiService, $commonUtilService) {
            var activePath;

            $scope.orderId = $routeParams.id;

            $scope.visitor = $visitorLoginService.getVisitor();
            $scope.visitorService = $visitorLoginService;

            $scope.init = function () {
                // BREADCRUMBS
                $scope.$emit('add-breadcrumbs', {'label': 'myAccount', 'url': '/account'});
                $scope.$emit('add-breadcrumbs', {'label': 'Order', 'url': '/account/orders'});

                activePath = $location.path();

                $scope.visitorService.isLoggedIn().then(function (isLoggedIn) {
                    if (!isLoggedIn) {
                        $location.path("/");
                    }
                });
            };

            if (!$scope.orderId) {
                $visitorApiService.getOrderList({"extra": "created_at,status,grand_total"}).$promise.then(
                    function (response) {
                        var i, isExist;
                        $scope.ordersList = response.result || [];

                        for (i = 0; i < $scope.ordersList.length; i += 1) {
                            if ($scope.orderId === $scope.ordersList[i]["increment_id"]) {
                                isExist = true;
                            }
                        }
                    }
                );
            }

            if ($scope.orderId) {
                $visitorApiService.getOrder({"orderID": $scope.orderId}).$promise.then(
                    function (response) {
                        $scope.order = response.result || [];
                        $scope.$emit('add-breadcrumbs', {
                            'label': $scope.order["increment_id"],
                            'url': '/account/order/' + $scope.orderId
                        });

                    }
                );
            }

            $scope.$watch('addedOrderId', function () {
                if (typeof $scope.addedOrderId !== 'undefined') {
                    $scope.message = $commonUtilService.getMessage(null, "success", "THANK YOU FOR YOUR PURCHASE!<br/>" +
                        "Your order # is: <a href=\"/account/order/" + $scope.addedOrderId + "\">" + $scope.addedOrderId + "</a>"
                    );
                }
            });

            $scope.isActive = function (path) {
                if (activePath === path) {
                    $('.account-menu ul li:nth-child(2)').find('span')
                        .css('background', 'url("themes/default/images/tablet/tabL.jpg") no-repeat top left');
                    return true;
                }
                return false;
            };

        }
    ]);