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
                    var getFullName;
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $loginService.getVisitor();
                    $scope.visitorService = $loginService;

                    getFullName = function (obj) {
                        return obj.zip_code +
                            " " + obj.state +
                            ", " + obj.city +
                            ", " + obj.street;
                    };

                    $scope.init = function () {
                        var isLoggedIn;
                        isLoggedIn = $scope.visitorService.isLoggedIn();
                        if (isLoggedIn === null) {
                            $scope.visitorService.init().then(
                                function () {
                                    if (!$scope.visitorService.isLoggedIn()) {
                                        $location.path("/");
                                    }
                                }
                            );
                        } else {
                            if (!$scope.visitorService.isLoggedIn()) {
                                $location.path("/");
                            }
                        }
                    };

                    /**
                     * Clears the form to create a new address
                     */
                    $scope.clearForm = function () {
                        $scope.address = {"visitor_id": $scope.visitor._id};
                    };

                    $scope.clearForm();

                    $visitorApiService.getAddresses({"visitorId": $scope.visitor._id}).$promise.then(
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
                        $visitorApiService.loadAddress({"id": id}).$promise.then(
                            function (response) {
                                var result = response.result || {};
                                $scope.address = result;
                                $scope.address.Id = result._id;
                                $scope.address.Name = getFullName(result);
                            });
                    };

                    /**
                     * Removes address by ID
                     *
                     * @param {string} id
                     */
                    $scope.remove = function (id) {
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
                        saveError = function () {
                        };

                        /**
                         *
                         * @param response
                         */
                        updateSuccess = function (response) {
                            var i, addr;
                            if (response.error === "") {
                                addr = response.result;
                                for (i = 0; i < $scope.addresses.length; i += 1) {
                                    if ($scope.addresses[i].Id === addr._id) {
                                        $scope.addresses[i].Id = addr._id;
                                        $scope.addresses[i].Name = getFullName(addr);
                                    }
                                }
                            }
                        };

                        /**
                         *
                         * @param response
                         */
                        updateError = function () {
                        };

                        if (!id) {
                            $scope.address.visitor_id = $loginService.getVisitorId(); // jshint ignore:line
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