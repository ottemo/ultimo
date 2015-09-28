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

.service('referService', [
    '$http',
    function($http) {

        this.post = function(data) {
            var url = angular.REST_SERVER_URI + '/friend/email';
            return $http.post(url, data)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }

        this.getCaptcha = function() {
            var url = angular.REST_SERVER_URI + '/friend/captcha?json=1';
            return $http.get(url)
                .then(function(response) {
                    return response.data.result.captcha;
                });
        }
    }
])

.controller("referController", [
    "$scope",
    "referService",
    function($scope, referService) {

        // Fetch the captcha for the page
        referService.getCaptcha()
            .then(function(imgData) {
                $scope.captcha = imgData;
            });

        $scope.isSubmitting = false;

        $scope.submit = function() {
            // Prevent multiple submits from stacking
            $scope.isSubmitting = true;

            if (!$scope.isSubmitting) {

                referService.post($scope.data)
                    .then(function(response) {
                        $scope.isSubmitting = false;

                        //TODO: MESSAGES
                    });
            }
        }
    }
])

