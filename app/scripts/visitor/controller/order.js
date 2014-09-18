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

                    $scope.addedOrderId = $routeParams.successId;
                    $scope.orderId = $routeParams.id;

                    $scope.visitor = $visitorLoginService.getVisitor();
                    $scope.visitorService = $visitorLoginService;

                    $scope.init = function () {
                        var isLoggedIn;

                        // BREADCRUMBS
                        $scope.$emit('add-breadcrumbs', {'label': 'myAccount', 'url': '/account'});
                        $scope.$emit('add-breadcrumbs', {'label': 'Order', 'url': '/account/order/list'});

                        activePath = $location.path();

                        if ($scope.orderId) {

                            $scope.$emit('add-breadcrumbs', {'label': $scope.orderId, 'url': '/account/order/' + $scope.orderId});
                        }

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

                    $visitorApiService.getOrderList().$promise.then(
                        // TODO: reduce cylomatic complexity in function call
                        function (response) {                                   // jshint ignore:line
                            var i, isAddedExist, isExist;
                            isAddedExist = false;
                            $scope.ordersList = response.result || [];

                            for (i = 0; i < $scope.ordersList.length; i += 1) {
                                if ($scope.addedOrderId === $scope.ordersList[i].increment_id) {        // jshint ignore:line
                                    isAddedExist = true;
                                }
                                if ($scope.orderId === $scope.ordersList[i].increment_id) {             // jshint ignore:line
                                    isExist = true;
                                }
                            }

                            if (typeof $scope.addedOrderId !== 'undefined' && !isAddedExist) {
                                $scope.addedOrderId = null;
                                $location.path('/account/order/list');
                            }

                            if (typeof $scope.orderId !== 'undefined' && !isExist) {
                                $scope.orderId = null;
                                $location.path('/account/order/list');
                            }
                        }
                    );

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
