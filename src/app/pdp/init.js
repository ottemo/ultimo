angular.module("pdpModule", [
    "ngRoute",
    "ngResource",
    "filtersModule"
])

.config(["$routeProvider", "$locationProvider",
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/product/:id", {
                templateUrl: "/views/pdp/view.html",
                controller: "pdpViewController"
            });

        $locationProvider.html5Mode(true);
    }
]);

