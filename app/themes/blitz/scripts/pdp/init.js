module.exports = function (angular) {
    /*
     *  Angular "pdpModule" declaration
     */
    angular.module.pdpModule

        /*
         *  Basic routing configuration
         */
        .config(["$routeProvider", function ($routeProvider) {
            $routeProvider
                .when("/product/:id", {
                    templateUrl: angular.getTheme("pdp/view.html"),
                    controller: "pdpControllerBlitz"
                });
        }]);

    require('./controller')(angular.module.pdpModule);
};

