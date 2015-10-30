angular.module("commonModule")

.controller("appController", [
    "$scope",
    "$commonBreadcrumbsService",
    "$cartService",
    "$visitorLoginService",
    function(
        $scope,
        $commonBreadcrumbsService,
        $cartService,
        $visitorLoginService
    ) {
        $scope.nav = {}
        $scope.getItemsInCart = getItemsInCart;

        ///////////////////////////////

        $scope.$on("$locationChangeSuccess", function() {
            // Handlers for breadcrumbs and SEO
            $commonBreadcrumbsService.clear();
            $commonBreadcrumbsService.addItem("Home", "/");

            // Make sure our mobile navigation is closed
            $scope.nav.open = false;
        });

        $scope.$on("add-breadcrumbs", function(event, param) {
            $commonBreadcrumbsService.addItem(param.label, param.url);
        });

        // Cart initialization
        $cartService.init();

        function getItemsInCart() {
            return $cartService.getTotalQuantity();
        };
    }
]);
