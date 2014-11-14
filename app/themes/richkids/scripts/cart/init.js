(function (define) {
    "use strict";

    define([
            "angular"
        ],
        function (angular) {

            angular.module.cartModule

                .run([
                    "$rootScope",
                    function ($scope) {
                        /**
                         * Hides mini-cart after change url
                         */
                        $scope.$on("$locationChangeSuccess", function () {
                            $(".mini-cart").hide();
                        });
                    }
                ]);

            return angular.module.cartModule;
        });

})(window.define);