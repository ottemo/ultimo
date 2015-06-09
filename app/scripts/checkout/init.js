/**
 *  Angular "checkoutModule" declaration
 */
angular.module("checkoutModule", [
    "ngRoute",
    "ngResource",
    "designModule",
    "giftCardsModule"
])

.constant("CHECKOUT_TYPE", "general.checkout.checkout_type")
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
                templateUrl: "theme/views/checkout/view.html",
                controller: "checkoutOnepageController"
            })
            .when(ACCORDION_URL, {
                templateUrl: "theme/views/checkout/view2.html",
                controller: "checkoutAccordionController"
            })
            .when('/checkout/success/:orderId', {
                templateUrl: "theme/views/checkout/order-confirmation.html",
                controller: "checkoutOrderConfirmationController"
            })
            .when('/checkout/success', {
                templateUrl: "theme/views/checkout/order-confirmation.html",
                controller: "checkoutOrderConfirmationController"
            });
        $locationProvider.html5Mode(true);
    }
])

.run([
    "$http",
    "REST_SERVER_URI",
    "CHECKOUT_TYPE",
    "$checkoutService",
    function ($http, REST_SERVER_URI, CHECKOUT_TYPE, $checkoutService) {
        $http({
            url: REST_SERVER_URI + "/config/value/" + CHECKOUT_TYPE,
            method: "GET"
        }).success(function (response) {
            $checkoutService.setType(response.result);
        });
    }
]);

