(function (define) {
    "use strict";

    /*
     *  Angular "pdpModule" declaration
     *  (module internal files refers to this instance)
     */
    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "pdpModule" declaration
             */
            angular.module.pdpModule

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/product/:id", {
                            templateUrl: angular.getTheme("pdp/view.html"),
                            controller: "pdpControllerBlitz"
                        });
                }]);

            return angular.module.pdpModule;
        });

})(window.define);