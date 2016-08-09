angular.module('checkoutModule')

.controller('checkoutConfirmationController', [
    '$scope',
    '$routeParams',
    '$localStorage',
    'visitorApiService',
    function(
        $scope,
        $routeParams,
        $localStorage,
        visitorApiService
    ) {
        // NOTE: Additional tracking exists in the view
        $scope.orderId = $routeParams.orderId;
        $scope.storagePrefix = 'checkout/success-tracked-';
        $scope.order = {};

        //////////////////////

        $scope.activate = function() {
            // Fetch this order from the server
            visitorApiService.getOrder({
                    orderID: $scope.orderId
                })
                .$promise.then(function(response) {
                    $scope.order = response.error == null ? response.result : false;

                    // Tracking
                    if ($scope.order && !$scope._hasBeenTracked($scope.orderId)) {
                        $scope._trackGAEcommerce($scope.order);
                        // $scope._trackFBConversion($scope.order);

                        // We perform this flagging so that if the user
                        // refreshes the page we don't track them twice
                        // this isn't infallible
                        $scope._flagAsTracked($scope.orderId);
                    }
                });
        };

        /**
         * @param  {string} orderId
         * @return {Boolean}
         */
        $scope._hasBeenTracked = function(orderId) {
            return !!$localStorage[$scope.storagePrefix + orderId];
        };

        $scope._flagAsTracked = function(orderId) {
            return $localStorage[$scope.storagePrefix + orderId] = true;
        };

        // Google Analytics eCommerce Tracking
        $scope._trackGAEcommerce = function(order) {
            if (window.ga) {
                // Gather the ecommerce module
                ga('require', 'ecommerce');

                // Add the transaction
                //TODO: Site Specific
                ga('ecommerce:addTransaction', {
                    'id': order._id,                    // Transaction ID. Required.
                    'affiliation': 'XXXXX',             // Affiliation or store name.
                    'revenue': order.grand_total,       // Grand Total.
                    'shipping': order.shipping_amount,  // Shipping.
                    'tax': order.tax_amount             // Tax.
                });

                // Add items to the transaction
                if (order.items) {
                    order.items.forEach(function(item) {
                        var gaItem = {
                            'id': order._id,                  // Transaction ID. Required.
                            'name': item.Name,                // Product name. Required.
                            'sku': item.Sku,                  // SKU/code.
                            // 'category': 'Party Toys',      // Category or variation.
                            'price': item.Price,              // Unit price.
                            'quantity': item.Qty              // Quantity.
                        };

                        ga('ecommerce:addItem', gaItem);
                    });
                }

                // Send all data
                ga('ecommerce:send');
                ga('ecommerce:clear');
            }
        };

        // Facebook conversion tracking
        $scope._trackFBConversion = function(order) {
            if (window._fbq) {

                //TODO: Site Specific
                // _fbq.push(['track', 'XXXXX', {
                //     'value': order.grand_total,
                //     'currency': 'USD'
                // }]);
            }
        };
    }
]);
