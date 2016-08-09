angular.module("commonModule")

.controller("appController", [
    "$scope",
    "commonBreadcrumbsService",
    "cartService",
    function(
        $scope,
        commonBreadcrumbsService,
        cartService
    ) {

        // Mobile menu toggle
        $scope.mobileNav = {isOpen: false};

        ///////////////////////////////

        $scope.activate = function() {
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
        };

        $scope.getItemsInCart = function() {
            return cartService.getTotalQuantity();
        };
    }
]);
