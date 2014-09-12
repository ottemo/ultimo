(function (define) {
    "use strict";

    define(["pdp/init"], function (pdpModule) {

        pdpModule.directive("guiCustomOptions", ["$designService", function ($designService) {
            return {
                restrict: "E",
                scope: {
                    "parent": "=object",
                    "product": "=item"
                },
                templateUrl: $designService.getTemplate("pdp/gui/guiCustomOptions.html"),
                controller: function () {

                }
            };
        }]);

        return pdpModule;
    });
})(window.define);
