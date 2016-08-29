angular.module('pdpModule', [
    'ngRoute',
    'ngResource',
    'coreModule'
])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/product/:id', {
                templateUrl: '/views/pdp/view.html',
                controller: 'pdpViewController'
            });
    }
]);

