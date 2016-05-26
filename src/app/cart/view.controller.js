angular.module('cartModule')

.controller('cartViewController', [
    '$scope', 'cartService', 'visitorLoginService', 'pdpProductService', '$location',
    function($scope, cartService, visitorLoginService, pdpProductService, $location) {

        $scope.cart = cartService;
        $scope.remove = remove;
        $scope.update = update; // qty

        $scope.productService = pdpProductService;
        $scope.qtyOptions = qtyOptions();

        activate();

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
        }

        function remove(itemIdx) {
            cartService.increaseCountRequest();
            cartService.remove(itemIdx);
        }

        function update(itemIdx, qty) {
            // TODO: not sure why we are tracking number of requests
            cartService.increaseCountRequest();
            cartService.update(itemIdx, qty);
        }

        function qtyOptions() {
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

