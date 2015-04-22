module.exports = function () {

    angular.module.commonModule
        .config(["$routeProvider", function ($routeProvider) {
            $routeProvider
                .when("/css-test.html", { templateUrl:  angular.getTheme("common/css-test.html"), "controller":""});
        }])
        .run([
            "$rootScope",
            "$commonSidebarService",
            function ($rootScope, $commonSidebarService) {

                // Left navigation menu

                $commonSidebarService.addItem("STYLE CHECK", "css-test.html", "glyphicon glyphicon-book");

                return angular.module.commonModule;
            }
        ]);
};
