angular.module('cartModule')

.controller('cartViewController', [
    '$scope',
    'cartService',
    'visitorLoginService',
    'pdpProductService',
    'commonUtilService',
    '$location',
    function(
        $scope,
        cartService,
        visitorLoginService,
        pdpProductService,
        commonUtilService,
        $location
    ) {

        $scope.activate = activate;
        $scope.cart = cartService;
        $scope.remove = remove;
        $scope.update = update; // qty

        $scope.productService = pdpProductService;
        $scope.getOptionLabel = commonUtilService.getOptionLabel;

        // Helper functions
        $scope._getQtyOptions = _getQtyOptions;

        //////////////////////////////////////////////

        function activate() {
            // Redirect guests if guest checkout is disabled
            if (!angular.appConfig.hasGuestCheckout) {
                visitorLoginService.isLoggedIn().then(function(isLoggedIn) {
                    if (!isLoggedIn) {
                        $location.path('/');
                    }
                });
            }

            // Refresh the cart
            cartService.reload();

            // Update crumbs
            $scope.$emit('add-breadcrumbs', {
                'label': 'Shopping Cart',
                'url': '/cart'
            });

            // Get qty options
            $scope.qtyOptions = $scope._getQtyOptions();
        }

        function remove(itemIdx) {
            cartService.increaseCountRequest();
            cartService.remove(itemIdx);
        }

        function update(itemIdx, qty) {
            qty = parseInt(qty);
            if (!qty || qty < 1) {
                qty = 1;
            }

            // TODO: not sure why we are tracking number of requests
            cartService.increaseCountRequest();
            cartService.update(itemIdx, qty);
        }

        function _getQtyOptions() {
            var options = [];
            for (var i = 1; i < 10; i++) {
                options.push({
                    value: i,
                    label: i
                });
            }
            options.push({
                value: 10,
                label: '10+'
            });

            return options;
        }
    }
]);

