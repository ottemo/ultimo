angular.module("visitorModule")

    .controller("visitorAccountController", [
        "$scope",
        "$location",
        "$visitorLoginService",
        "$visitorApiService",
        "$commonUtilService",
        function ($scope, $location, $visitorLoginService, $visitorApiService, $commonUtilService) {

            // Data
            $scope.visitor = $visitorLoginService.getVisitor();

            // Visitor Form
            $scope.save = save;

            // Change Password Form
            $scope.changePswCredentials = {};
            $scope.changePassword = changePassword;

            // Sidebar
            var activePath = $location.path();
            $scope.isActive = isActive;

            activate();

            ////////////////////////////////

            function activate() {
                // Breadcrumbs
                $scope.$emit("add-breadcrumbs", {"label": "MyAccount", "url": "/account"});

                // Redirect
                $visitorLoginService.isLoggedIn()
                    .then(function (isLoggedIn) {
                        if (!isLoggedIn) {
                            $location.path("/");
                        }
                    });
            }

            function save() {
                delete $scope.visitor["password"];
                delete $scope.visitor["billing_address"];
                delete $scope.visitor["shipping_address"];

                $visitorApiService.update($scope.visitor).$promise
                    .then(function(response) {
                        if (response.error === null) {
                            setTimeout(closePopUp, 2000);
                            $scope.message = $commonUtilService.getMessage(null, "success", "Сhanges have been made");
                        } else {
                            $scope.message = $commonUtilService.getMessage(null, "danger", "Something went wrong");
                        }
                    });
            }

            function changePassword(passwordForm) {
                var data = {
                    "old_password": $scope.changePswCredentials.oldpassword,
                    "password": $scope.changePswCredentials.password
                };

                $visitorApiService.update(data).$promise
                    .then(function (response) {
                        if (response.error === null) {
                            setTimeout(closePopUp, 2000);
                            $scope.messagePassword = $commonUtilService.getMessage(response, "success", "Password change was successfully");

                            // Clean the form
                            $scope.changePswCredentials = {};
                            passwordForm.$setPristine();
                            passwordForm.$setUntouched();
                        } else {
                            $scope.messagePassword = $commonUtilService.getMessage(response);
                        }
                    });
            }

            // helper for closing popups
            function closePopUp() {
                $(".modal").modal("hide");
            }

            // REFACTOR
            // Sidebar
            function isActive(path) {
                return activePath === path;
            }

        }
    ]);