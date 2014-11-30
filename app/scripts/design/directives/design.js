(function (define) {
    "use strict";

    define(["design/init"], function (designModule) {
        designModule
            /**
             *  Directive that allows to declare CSS inside module templates
             */
            .directive("addCss", ["$designService", function ($designService) {
                return {
                    restrict: "E",
                    link: function (scope, elem, attrs) {
                        var cssFile = attrs.src;
                        if (typeof cssFile !== "undefined" && cssFile !== "") {
                            $designService.addCss(cssFile);
                        }
                    }
                };
            }])

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
            });

        return designModule;
    });
})(window.define);