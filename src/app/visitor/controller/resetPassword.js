angular.module("visitorModule")
    .controller('resetPasswordController', [
        '$scope',
        '$routeParams',
        '$visitorApiService',
        '$visitorApiService',
        '$visitorLoginService',
        '$cartService',
        '$commonUtilService',
        '$q',
        '$location',
        function(
            $scope,
            $routeParams,
            $visitorApiService,
            $visitorApiService,
            $visitorLoginService,
            $cartService,
            $commonUtilService,
            $q,
            $location
        ) {

            function init() {
                // Get the reset key from the url
                // if this is false we show an error message
                $scope.key = $routeParams.key || false;
            }

            // Kick off initial page load logic
            init();

            /**
             * Send the request to reset the password
             */
            $scope.isSubmitting = false;
            $scope.reset = function() {
                // Flag it to prevent double clicking, and visually communicate
                $scope.isSubmitting = true;

                // Lets try to reset their password
                $visitorApiService.resetPassword({
                        key: $scope.key,
                        password: $scope.visitor.password
                    })
                    .$promise.then(function(response) {
                        // Unlock the submit button
                        $scope.isSubmitting = false;

                        if (response.error == null) {
                            return response.result; // email
                        } else {
                            // Most common error is an expired key
                            $scope.message = $commonUtilService.getMessage(response);
                            return $q.reject();
                        }
                    })
                    .then(function(email) {

                        // Log them in now
                        return $visitorApiService.login({
                                email: email,
                                password: $scope.visitor.password
                            })
                            .$promise.then(function(response) {
                                if (response.error !== null) {
                                    $scope.message = $commonUtilService.getMessage(response);
                                    return $q.reject();
                                }
                            });
                    })
                    .then(function() {
                        // Request customer info
                        return $visitorLoginService.isLoggedIn(true)
                    })
                    .then(function() {
                        // Get their cart info
                        $cartService.reload();
                    })
                    .then(function() {
                        // Redirect them to their last page
                        var path = angular.module("visitorModule").back.path || '/account';
                        $location.path(path);
                    });

            }
        }
    ]);

