module.exports = function () {
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
                    templateUrl: angular.getTheme("common/home.html"),
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

    require('./controller')(angular.module.commonModule);

};
