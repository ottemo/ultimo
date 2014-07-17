(function (define) {
    "use strict";

    define(["visitor/init"], function (visitorModule) {
        visitorModule

            .controller("visitorLoginController", [
                "$scope",
                "$routeParams",
                "$visitorApiService",
                function ($scope, $routeParams, $visitorApiService) {

                }
            ]);
        return visitorModule;
    });
})(window.define);