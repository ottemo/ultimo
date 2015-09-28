angular.module("referModule", [
    "ngRoute"
])

.config(["$routeProvider",
    function($routeProvider) {
        $routeProvider
            .when("/refer-a-friend", {
                title: "Refer a Friend",
                templateUrl: "theme/views/refer/view.html",
                controller: "referController"
            });
    }
])

.controller("referController", [
    "$scope",
    function($scope) {

        $scope.isSubmitting = false;

        $scope.submit = function() {
            // Prevent multiple submits from stacking
            $scope.isSubmitting = true;

            if (!$scope.isSubmitting) {
                var url = '';
                $http.post(url, $scope.data)
                    .then(function(response) {
                        $scope.isSubmitting = false;

                        //TODO: MESSAGES
                    });
            }
        }
    }
])

