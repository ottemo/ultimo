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

        $scope.cart = cartService;
        $scope.productService = pdpProductService;
        $scope.getOptionLabel = commonUtilService.getOptionLabel;

        //////////////////////////////////////////////

        $scope.activate = function() {
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
        };

        $scope.remove = function(itemIdx) {
            cartService.increaseCountRequest();
            cartService.remove(itemIdx);
        };

        $scope.update = function(itemIdx, qty) {
            qty = parseInt(qty);
            if (!qty || qty < 1) {
                qty = 1;
            }

            // TODO: not sure why we are tracking number of requests
            cartService.increaseCountRequest();
            cartService.update(itemIdx, qty);
        };

        $scope._getQtyOptions = function() {
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

