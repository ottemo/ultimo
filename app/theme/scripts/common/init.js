module.exports = function() {
    /*
     * module definition
     *
     */
    angular.module.commonModule
        // route configuration
        .config(["$routeProvider", function ($routeProvider) {
            $routeProvider
            // .when("/css-test.html", { templateUrl:  angular.getTheme("common/css-test.html"), "controller":""});
        }])
        .run([
            "$rootScope",
            "$commonSidebarService",
            function ($rootScope, $commonSidebarService) {

                // Left navigation menu

                $commonSidebarService.addItem("Press", "press");
                $commonSidebarService.addItem("Blog", "blog");
                $commonSidebarService.addItem("Contact", "contact");

                return angular.module.commonModule;
            }
        ]);
}