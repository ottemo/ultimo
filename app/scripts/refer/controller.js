angular.module('referModule')

.controller('referController', [
    '$scope',
    'referService',
    function($scope, referService) {

        // Fetch the captcha for the page
        referService.getCaptcha()
            .then(function(imgData) {
                $scope.captcha = imgData;
            });

        $scope.isSubmitting = false;

        function hideMessages() {
            $scope.showSuccessMessage = false;
            $scope.showCaptchaMismatchMessage = false;
            $scope.showErrorMessage = false;
        }

        $scope.submit = function() {

            // Prevent multiple submits from stacking
            if (!$scope.isSubmitting) {
                $scope.isSubmitting = true;
                hideMessages();

                referService.post($scope.data)
                    .then(function(response) {
                        // Unblock the button
                        $scope.isSubmitting = false;

                        // Messages
                        if (response.result === 'ok') {
                            $scope.showSuccessMessage = true;
                        } else if(response.error.code == '8bd3ad79-e464-4355-8a13-27ff55980fbb') {
                            $scope.showCaptchaMismatchMessage = true;
                        }else {
                            $scope.showErrorMessage = true;
                        }
                    });
            }
        }
    }
]);
