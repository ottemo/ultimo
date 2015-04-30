module.exports = function() {
    /*
     * module definition
     *
     */
    angular.module.commonModule
        /*
         * Meta-data for store
         *
         */
        .value("DEFAULT_TITLE", "Kari Gran - All Natural & Organic Skin Care & Makeup")
        .value("DEFAULT_KEYWORDS", "Natural & Organic Skin Care & Makeup")
        .value("DEFAULT_DESCRIPTION", "Natural & Organic Skin Care & Makeup")
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

                $commonSidebarService.addItem("Press", "buzz");
                $commonSidebarService.addItem("Blog", "blog");
                $commonSidebarService.addItem("Contact", "contact");

                return angular.module.commonModule;
            }
        ]);
}
