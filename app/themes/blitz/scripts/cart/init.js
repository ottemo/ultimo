module.exports = function (angular) {
    /*
     *  Angular "cartModule" declaration
     */
    angular.module.cartModule

        /*
         *  Basic routing configuration
         */
        .run(["$rootScope", function ($rootScope) {
            $rootScope.$on("$locationChangeSuccess", function () {
                $("#mini-cart").removeClass('active');
            });
        }]);

};

