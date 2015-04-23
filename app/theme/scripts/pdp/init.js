module.exports = function () {
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
                    templateUrl: "theme/views/pdp/view.html",
                    controller: "pdpControllerBlitz"
                });
        }]);


    require('./controller')(angular.module.pdpModule);
};

