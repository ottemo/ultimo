angular.module('referModule', [
    'ngRoute'
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/refer-a-friend', {
                title: 'Refer a Friend',
                templateUrl: 'theme/views/refer/view.html',
                controller: 'referController'
            });
    }
]);