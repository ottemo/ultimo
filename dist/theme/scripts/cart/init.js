(function (define) {
    "use strict";

    define([
            "angular",
            "angular-route",
            "angular-resource"
        ],
        function (angular) {
            /*
             *  Angular "cartModule" declaration
             */
            angular.module.cartModule

                /*
                 *  Basic routing configuration
                 */
                .run(["$rootScope", function ($rootScope) {
                    $rootScope.$on("$locationChangeSuccess", function () {
                        $("#mini-cart").removeClass('active');
                        void 0;
                    });
                }]);

            return angular.module.cartModule;
        });

})(window.define);
