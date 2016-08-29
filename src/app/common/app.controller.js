angular.module("commonModule")

.controller("appController", [
    "$scope",
    "commonBreadcrumbsService",
    "cartService",
    "visitorLoginService",
    function(
        $scope,
        commonBreadcrumbsService,
        cartService,
        visitorLoginService
    ) {
        // Mobile menu toggle
        $scope.mobileNav = {isOpen: false};

        $scope.getItemsInCart = getItemsInCart;

        ///////////////////////////////

        $scope.$on("$locationChangeSuccess", function() {
            // Handlers for breadcrumbs and SEO
            commonBreadcrumbsService.clear();
            commonBreadcrumbsService.addItem("Home", "/");

            // Make sure we close the mobile menu whenever the route changes
            $scope.mobileNav.isOpen = false;
        });

        $scope.$on("add-breadcrumbs", function(event, param) {
            commonBreadcrumbsService.addItem(param.label, param.url);
        });

        // Cart initialization
        cartService.init();

        function getItemsInCart() {
            return cartService.getTotalQuantity();
        };
    }
]);
