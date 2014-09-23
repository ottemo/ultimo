(function (define) {
    'use strict';

    define(['visitor/init'], function (visitorModule) {
        visitorModule

            .controller('visitorOrderController', [
                '$scope',
                '$location',
                '$routeParams',
                '$visitorLoginService',
                '$visitorApiService',
                function ($scope, $location, $routeParams, $visitorLoginService, $visitorApiService) {
                    var activePath;

                    $scope.orderId = $routeParams.id;

                    $scope.visitor = $visitorLoginService.getVisitor();
                    $scope.visitorService = $visitorLoginService;

                    $scope.init = function () {
                        var isLoggedIn;

                        // BREADCRUMBS
                        $scope.$emit('add-breadcrumbs', {'label': 'myAccount', 'url': '/account'});
                        $scope.$emit('add-breadcrumbs', {'label': 'Order', 'url': '/account/orders'});

                        activePath = $location.path();

                        isLoggedIn = $scope.visitorService.isLoggedIn();
                        if (isLoggedIn === null) {
                            $scope.visitorService.init().then(
                                function () {
                                    if (!$scope.visitorService.isLoggedIn()) {
                                        $location.path('/');
                                    }
                                }
                            );
                        } else {
                            if (!$scope.visitorService.isLoggedIn()) {
                                $location.path('/');
                            }
                        }
                    };

                    if (!$scope.orderId) {
                        $visitorApiService.getOrderList({"extra": "created_at,status,grand_total"}).$promise.then(
                            function (response) {                                   // jshint ignore:line
                                var i, isExist;
                                $scope.ordersList = response.result || [];

                                for (i = 0; i < $scope.ordersList.length; i += 1) {
                                    if ($scope.orderId === $scope.ordersList[i].increment_id) {             // jshint ignore:line
                                        isExist = true;
                                    }
                                }
                            }
                        );
                    }

                    if ($scope.orderId) {
                        $visitorApiService.getOrder({"id": $scope.orderId}).$promise.then(
                            function (response) {                                   // jshint ignore:line
                                $scope.order = response.result || [];
                                $scope.$emit('add-breadcrumbs', {'label': $scope.order.increment_id, 'url': '/account/order/' + $scope.orderId});// jshint ignore:line

                            }
                        );
                    }

                    $scope.getDateCreated = function (str) {
                        var date, month, day;

                        date = new Date(str);
                        month = date.getMonth().toString().length < 2 ? '0' + date.getMonth() : date.getMonth();
                        day = date.getDay().toString().length < 2 ? '0' + date.getDay() : date.getDay();

                        return date.getFullYear() + '/' + month + '/' + day;
                    };

                    $scope.$watch('addedOrderId', function () {
                        if (typeof $scope.addedOrderId !== 'undefined') {
                            $scope.message = {
                                "type": "success",
                                "message": "THANK YOU FOR YOUR PURCHASE!<br/>" +
                                    "Your order # is: <a href=\"#/account/order/" + $scope.addedOrderId + "\">" + $scope.addedOrderId + "</a>"
                            };
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
        return visitorModule;
    });
})(window.define);
