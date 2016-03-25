angular.module('commonModule')

.directive('otBreadcrumbs', ['designService', 'commonBreadcrumbsService',
    function(designService, commonBreadcrumbsService) {
        return {
            restrict: 'EA',
            templateUrl: designService.getTemplate('common/breadcrumbs/breadcrumbs.html'),
            link: function(scope) {
                scope.crumbs = commonBreadcrumbsService.getItems();
            }
        };
    }
]);

