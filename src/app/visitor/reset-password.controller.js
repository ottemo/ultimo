angular.module("visitorModule")

.controller('visitorResetPasswordController', [
    '$scope',
    '$routeParams',
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
        $visitorLoginService,
        $cartService,
        $commonUtilService,
        $q,
        $location
    ) {

        // password reset validation key
        $scope.key = $routeParams.key || false;

        $scope.reset = reset;
        $scope.isSubmitting = false;
        $scope.message = '';

        activate();

        ///////////////////////////

        function activate() {

        }

        /**
         * Send the request to reset the password
         */
        function reset() {
            // Flag it to prevent double clicking, and visually communicate
            if ($scope.isSubmitting) {
                return;
            }

            $scope.isSubmitting = true;

            // Lets try to reset their password
            $visitorApiService.resetPassword({
                    key: $scope.key,
                    password: $scope.visitor.password
                })
                .$promise.then(function(response) {
                    // Unlock the submit button
                    $scope.isSubmitting = false;

                    if (response.error === null) {
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
                    return $visitorLoginService.isLoggedIn(true);
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

