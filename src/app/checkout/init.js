/**
 *  Angular "checkoutModule" declaration
 */
angular.module("checkoutModule", [
    "ngRoute",
    "ngResource",
    "designModule",
    "giftCardsModule"
])

.constant("ONEPAGE_URL", "/spcheckout")
.constant("ACCORDION_URL", "/checkout")

.config([
    "$routeProvider",
    "$locationProvider",
    "ONEPAGE_URL",
    "ACCORDION_URL",
    function ($routeProvider, $locationProvider, ONEPAGE_URL, ACCORDION_URL) {
        $routeProvider
            .when(ONEPAGE_URL, {
                title: "Checkout",
                templateUrl: "/views/checkout/view.html",
                controller: "checkoutOnepageController"
            })
            .when(ACCORDION_URL, {
                title: "Checkout",
                templateUrl: "/views/checkout/view2.html",
                controller: "checkoutAccordionController"
            })
            .when('/checkout/success/:orderId', {
                title: "Checkout Success",
                templateUrl: "/views/checkout/order-confirmation.html",
                controller: "checkoutOrderConfirmationController"
            })
            .when('/checkout/success', {
                title: "Checkout Success",
                templateUrl: "/views/checkout/order-confirmation.html",
                controller: "checkoutOrderConfirmationController"
            });

        $locationProvider.html5Mode(true);
    }
]);
