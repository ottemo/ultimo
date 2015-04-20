(function (define, $) {
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
            angular.module.commonModule

                /*
                 *  Basic routing configuration
                 */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/", {
                            templateUrl: "themes/blitz/views/common/home.html",
                            controller: 'commonControllerBlitz'
                        });
                }])
                .run([
                    "$rootScope",
                    "$commonSidebarService",
                    function ($rootScope, $commonSidebarService) {

                        // Left navigation menu
                        $commonSidebarService.addItem("SHOP", "shop", "glyphicon glyphicon-book");

                        $rootScope.$on("$locationChangeSuccess", function () {
                            $(".zoomContainer").remove();
                        });
                    }
                ]);

            return angular.module.commonModule;
        });

})(window.define, jQuery);
