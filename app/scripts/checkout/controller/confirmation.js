angular.module("checkoutModule")

    .controller("checkoutOrderConfirmationController", [
        "$scope",
        "$routeParams",
        "$checkoutService",
        function(
            $scope,
            $routeParams,
            $checkoutService
        ){

            $scope.order = $checkoutService.lastOrder;

            function trackGAEcommerce(order) {
                if(window.ga) {
                    // Gather the ecommerce module
                    ga('require', 'ecommerce');

                    // Add the transaction
                    ga('ecommerce:addTransaction', {
                        'id': order._id,                    // Transaction ID. Required.
                        'affiliation': 'Kari Gran',         // Affiliation or store name.
                        'revenue': order.grand_total,       // Grand Total.
                        'shipping': order.shipping_amount,  // Shipping.
                        'tax': order.tax_amount             // Tax.
                    });

                    // Add items to the transaction
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

                    // Send all data
                    ga('ecommerce:send');
                    ga('ecommerce:clear');
                }
            }

            function init() {
                // NOTE: Additional tracking exists in the view
                trackGAEcommerce($scope.order);
            }

            init();
        }
    ]);
