(function (define) {
    "use strict";

    define(["design/init"], function (designModule) {
        designModule

            /*
             *  Directive to solve browser auto-fill issue on model
             */
            .directive("autoFillSync", ["$timeout", function ($timeout) {
                return {
                    require: "ngModel",
                    link: function (scope, elem, attrs, ngModel) {
                        var origVal = elem.val();
                        $timeout(function () {
                            var newVal = elem.val();
                            if (ngModel.$pristine && origVal !== newVal) {
                                ngModel.$setViewValue(newVal);
                            }
                        }, 500);
                    }
                };
            }])

            /*
             *  jQuery layout directive
             */
            .directive("jqLayout", function () {
                return {
                    restrict: "A",
                    link: function (scope, elem) {
                        jQuery(elem).layout({ applyDefaultStyles: true });
                    }
                };
            })

            .directive('errSrc', ["$rootScope", function ($rootScope) {
                return {
                    link: function (scope, element, attrs) {
                        element.bind('error', function () {
                            if (attrs.src !== attrs.errSrc) {
                                attrs.$set('src', $rootScope.getImg(attrs.errSrc));
                            }
                        });
                    }
                };
            }])

            .directive('ngEnter', function () {
                return function (scope, element, attrs) {
                    element.bind("keydown keypress", function (event) {
                        if(event.which === 13) {
                            scope.$apply(function (){
                                scope.$eval(attrs.ngEnter);
                            });

                            event.preventDefault();
                        }
                    });
                };
            });

        return designModule;
    });
})(window.define);
