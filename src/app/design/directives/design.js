angular.module("designModule")

.directive("jqLayout", function() {
    return {
        restrict: "A",
        link: function(scope, elem) {
            jQuery(elem).layout({
                applyDefaultStyles: true
            });
        }
    };
})

.directive('errSrc', ["$rootScope", function($rootScope) {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src !== attrs.errSrc) {
                    attrs.$set('src', '/images/' + attrs.errSrc);
                }
            });
        }
    };
}])

.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

