(function (define) {
    "use strict";

    define([
            "angular"
        ],
        function (angular) {

            angular.module.visitorModule
                .constant("DEFAULT_TITLE", "Urbanity Shop")
                .constant("DEFAULT_DESCRIPTION", "urbanity shop default")
                .constant("DEFAULT_KEYWORDS", "urbanity shop default")
                .run([
                    "$rootScope",
                    "$commonSidebarService",
                    function ($rootScope, $commonSidebarService) {

                        // Left navigation menu
                        $commonSidebarService.removeItem("blog.html");
                        $commonSidebarService.addItem("BLOG", "http://urbanityshop.com/blog/", "glyphicon glyphicon-edit");
                        $commonSidebarService.removeItem("about.html");
                        $commonSidebarService.addItem("ABOUT", "http://urbanityshop.com/blog/about", "glyphicon glyphicon-info-sign");
                        $commonSidebarService.removeItem("press.html");
                        $commonSidebarService.addItem("PRESS", "http://urbanityshop.com/blog/l", "glyphicon glyphicon-book");

                        return angular.module.visitorModule;
                    }
                ]);
        });
})(window.define);