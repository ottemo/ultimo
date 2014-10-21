(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /**
             *  Angular "checkoutModule" declaration
             */
            angular.module.checkoutModule = angular.module("checkoutModule", ["ngRoute", "ngResource", "designModule"])

                .constant("CHECKOUT_TYPE", "general.checkout.checkout_type")
                .constant("ONEPAGE_URL", "/spcheckout")
                .constant("ACCORDION_URL", "/checkout")

                /*
                 *  Basic routing configuration
                 */
                .config([
                    "$routeProvider",
                    "ONEPAGE_URL",
                    "ACCORDION_URL",
                    function ($routeProvider, ONEPAGE_URL, ACCORDION_URL) {
                        $routeProvider
                            .when(ONEPAGE_URL, {
                                templateUrl: angular.getTheme("checkout/view.html"),
                                controller: "checkoutOnepageController"
                            })
                            .when(ACCORDION_URL, {
                                templateUrl: angular.getTheme("checkout/view2.html"),
                                controller: "checkoutAccordionController"
                            });
                    }
                ])

                .run([
                    "$http",
                    "REST_SERVER_URI",
                    "CHECKOUT_TYPE",
                    "$checkoutService",
                    function ($http, REST_SERVER_URI, CHECKOUT_TYPE, $checkoutService) {
                        $http({
                            url: REST_SERVER_URI + "/config/get/" + CHECKOUT_TYPE,
                            method: "GET"
                        }).success(function (response) {
                            $checkoutService.setType(response.result);
                        });
                    }
                ]
            );

            return angular.module.checkoutModule;
        });

})(window.define);