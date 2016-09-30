angular.module('pdpModule')

.directive('otSocialLinks', ['$location', '$sce', function($location, $sce) {
        return {
            restrict: 'E',
            scope: {
                image: '@',
                text: '@',
                title: '@'
            },
            templateUrl: '/views/pdp/directives/ot-social-links.html',
            link: function(scope, element, attrs) {
                scope.pageUrl = $location.absUrl();

                scope.googlePlus = 'googleplus' in attrs;
                scope.twitter = 'twitter' in attrs;
                scope.pinterest = 'pinterest' in attrs;
                scope.facebook = 'facebook' in attrs;
            }
        };
    }
]);