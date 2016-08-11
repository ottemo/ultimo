angular.module("contactModule")

.controller('contactController', [
    '$scope',
    'emailService',
    function($scope, emailService){

        $scope.contactFormSuccessMessage = false;

        $scope.submit = function() {
            $scope.contactFormSuccessMessage = true;
            $scope.contactFormErrorMessage = false;

            var data = {
                formLocation: 'contact',
                name: $scope.contactForm.name,
                tel: $scope.contactForm.tel,
                email: $scope.contactForm.email,
                comment: $scope.contactForm.comment,
            };

            emailService.post(data)
                .then(function(response){
                    if (response.result == 'ok') {
                        $scope.contactFormSuccessMessage = true;
                    } else {
                        $scope.contactFormErrorMessage = true;
                    }
                })
        }
    }
]);