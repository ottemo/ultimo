angular.module("commonModule")

.controller("appController", [
    "$scope",
    "$commonBreadcrumbsService",
    "$cartService",
    "$visitorLoginService",
    "cfpLoadingBar",
    function(
        $scope,
        $commonBreadcrumbsService,
        $cartService,
        $visitorLoginService,
        cfpLoadingBar
    ) {
        $scope.nav = {}
        $scope.load_completed = false; // Page loading event handler
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

        // Watch our initial loading bar
        $scope.$on('cfpLoadingBar:completed', function(e, param) {
            $scope.load_completed = true;
        });

        // Cart initialization
        $cartService.init();

        function getItemsInCart() {
            return $cartService.getTotalQuantity();
        };
    }
]);
