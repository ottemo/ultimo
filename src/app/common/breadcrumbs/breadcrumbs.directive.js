angular.module('commonModule')

.directive('otBreadcrumbs', ['commonBreadcrumbsService',
    function(commonBreadcrumbsService) {
        return {
            restrict: 'EA',
            templateUrl: '/views/common/breadcrumbs/breadcrumbs.html',
            link: function(scope) {
                scope.crumbs = commonBreadcrumbsService.getItems();
            }
        };
    }
]);

