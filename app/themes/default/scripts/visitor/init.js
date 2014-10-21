(function (define) {
    "use strict";

    define([
            "angular"
        ],
        function (angular) {

            angular.module.visitorModule.controller('visitorLoginControllerUrb', [
                '$scope',
                '$controller',
                function ($scope, $controller) {
                    $controller('visitorLoginController', {$scope: $scope});
                }
            ]);

            return angular.module.visitorModule;
        });

})(window.define);