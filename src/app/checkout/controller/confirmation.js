angular.module("checkoutModule")

    .controller("checkoutOrderConfirmationController", [
        "$scope",
        "$routeParams",
        "$checkoutService",
        "$analytics",
        function(
            $scope,
            $routeParams,
            $checkoutService,
            $analytics
        ){

            $scope.order = $checkoutService.lastOrder;

            // Google Analytics eCommerce Tracking
            function trackGAEcommerce(order) {
                if(window.ga) {
                    // Gather the ecommerce module
                    ga('require', 'ecommerce');

                    // Add the transaction
                    ga('ecommerce:addTransaction', {
                        'id': order._id,                    // Transaction ID. Required.
                        'affiliation': 'Urbanity',         // Affiliation or store name.
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
            }

            // Facebook conversion tracking
            function trackFBConversion(order) {
                if (window._fbq) {

                    // Urbanity Specific
                    _fbq.push(['track', 'XXXXX', {
                        'value': order.grand_total,
                        'currency': 'USD'
                    }]);
                }
            }

            function init() {
                trackGAEcommerce($scope.order);
                // trackFBConversion($scope.order);
            }

            init();
        }
    ]);
