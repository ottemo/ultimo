(function (define) {
    "use strict";

    define([
            "angular"
        ],
        function (angular) {

            angular.module.commonModule

                .run([
                    "$rootScope",
                    "$commonSidebarService",
                    function ($rootScope, $commonSidebarService) {

                        // Left navigation menu

                        $commonSidebarService.addItem("SHOP", "shop.html", "glyphicon glyphicon-book");

                        return angular.module.commonModule;
                    }
                ]);
        });
})(window.define);