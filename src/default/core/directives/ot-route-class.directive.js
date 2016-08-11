angular.module("coreModule")

.directive('otRouteClass', [function(){
  return {
    restrict: 'A',
    link: function($scope, elem, iAttrs, controller) {
        $scope.$on('$routeChangeSuccess', function(e, current, previous){
            // console.log('current', current);

            // Remove all classes that this module applies
            elem.removeClass(function(i,css){
                return (css.match(/route--.*/g) || []).join(' ');
            });

            // Adding Classes
            // The first load doesn't have a route
            if (current.$$route) {

                // PDP
                if (current.$$route.controller == 'pdpViewController') {
                    elem.addClass('route--pdp-' + current.params.id);
                }
            }
        });
    }
  };
}]);
