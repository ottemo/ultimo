(function (define) {
    "use strict";

    define(["visitor/init"], function (visitorModule) {
        visitorModule

            .controller("visitorAddressController", [
                "$scope",
                "$location",
                "$loginService",
                "$visitorApiService",
                function ($scope, $location, $loginService, $visitorApiService) {
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $loginService.getVisitor();
                    $scope.visitorService = $loginService;

                    $scope.init = function () {
                        var status = $scope.visitorService.isLoggedIn();
                        console.log(status);
                        if (!status) {
                            $location.path("/");
                        }
                    }

                    /**
                     * Clears the form to create a new address
                     */
                    $scope.clearForm = function () {
                        $scope.address = {"visitor_id": $scope.visitor._id};
                    };

                    $scope.clearForm();

                    $visitorApiService.getAddresses({"visitorId":$scope.visitor._id}).$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.addresses = result;
                        }
                    );

                    /**
                     * Handler event when selecting the address in the list
                     *
                     * @param id
                     */
                    $scope.select = function (id) {
                        console.log(id)
                        $visitorApiService.loadAddress({"id": id}).$promise.then(
                            function (response) {
                                var result = response.result || {};
                                $scope.address = result;
                            });
                    };

                    /**
                     * Removes address by ID
                     *
                     * @param {string} id
                     */
                    $scope.delete = function (id) {
                        var i, answer;
                        answer = window.confirm("You really want to remove this address");
                        if (answer) {
                            $visitorApiService.deleteAddress({"id": id}, function (response) {
                                if (response.result === "ok") {
                                    for (i = 0; i < $scope.addresses.length; i += 1) {
                                        if ($scope.addresses[i]._id === id) {
                                            $scope.addresses.splice(i, 1);
                                            $scope.clearForm();
                                        }
                                    }
                                }
                            });
                        }
                    };

                    $scope.save = function () {
                        var id, saveSuccess, saveError, updateSuccess, updateError;
                        if (typeof $scope.address !== "undefined") {
                            id = $scope.address.id || $scope.address._id;
                        }

                        /**
                         *
                         * @param response
                         */
                        saveSuccess = function (response) {
                            if (response.error === "") {
                                $scope.addresses.push(response.result);
                                $scope.clearForm();
                            }
                        };

                        /**
                         *
                         * @param response
                         */
                        saveError = function (response) {
                        };

                        /**
                         *
                         * @param response
                         */
                        updateSuccess = function (response) {
                            var i;
                            if (response.error === "") {
                                for (i = 0; i < $scope.addresses.length; i += 1) {
                                    if ($scope.addresses[i].Id === response.result._id) {
                                        $scope.addresses[i] = response.result;
                                    }
                                }
                            }
                        };

                        /**
                         *
                         * @param response
                         */
                        updateError = function (response) {
                        };

                        if (!id) {
                            $scope.address.visitor_id = $loginService.getVisitorId();
                            $visitorApiService.saveAddress($scope.address, saveSuccess, saveError);
                        } else {
                            $scope.address.id = id;
                            $visitorApiService.addressUpdate($scope.address, updateSuccess, updateError);
                        }
                    };

                }
            ]);
        return visitorModule;
    });
})(window.define);