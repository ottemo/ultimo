angular.module('referModule', [
    'ngRoute',
    "coreModule"
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/refer-a-friend', {
                title: 'Refer a Friend',
                templateUrl: '/views/refer/view.html',
                controller: 'referController'
            });
    }
]);