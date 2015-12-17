angular.module("visitorModule")

    .controller('visitorAccountAddressController', [
        '$scope',
        '$location',
        '$visitorLoginService',
        '$visitorApiService',
        '$designStateService',
        '$commonUtilService',
        '$designCountryService',
        function (
            $scope,
            $location,
            $visitorLoginService,
            $visitorApiService,
            $designStateService,
            $commonUtilService,
            $designCountryService
        ) {
            var getFullName;

            $scope.countries = $designCountryService;
            $scope.states = $designStateService;
            $scope.addresses = [];
            $scope.address = {};
            $scope.visitor = $visitorLoginService.getVisitor();
            $scope.visitorService = $visitorLoginService;

            var activePath = $location.path();

            activate();

            //////////////////////////

            function activate() {
                // BREADCRUMBS
                $scope.$emit('add-breadcrumbs', {'label': 'myAccount', 'url': '/account'});
                $scope.$emit('add-breadcrumbs', {'label': 'Addresses', 'url': '/account/address'});

                // Redirect
                $scope.visitorService.isLoggedIn().then(function (isLoggedIn) {
                    if (!isLoggedIn) {
                        $location.path("/");
                    }
                });

                // Fetch addresses
                $visitorApiService.getAddresses().$promise
                    .then(function (response) {
                        var result = response.result || [];
                        $scope.addresses = result;
                    });
            }

            getFullName = function (address) {
                return address.zip_code +
                    ' ' + address.state +
                    ', ' + address.city +
                    ', ' + address.address_line1 +
                    (address.address_line2 ? ', ' + address.address_line2 : '');
            };

            /**
             * Clears the form to create a new address
             */
            $scope.clearForm = function () {
                $scope.address = {'visitor_id': $scope.visitor._id};
                $scope.submitted = false;
            };

            $scope.clearForm();


            /**
             * Handler event when selecting the address in the list
             *
             * @param id
             */
            $scope.select = function (addressId) {
                $visitorApiService.loadAddress({'addressID': addressId}).$promise.then(
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
                answer = window.confirm('You really want to remove this address');
                if (answer) {
                    $visitorApiService.deleteAddress({'addressID': id}, function (response) {
                        if (response.result === 'ok') {
                            for (i = 0; i < $scope.addresses.length; i += 1) {
                                if ($scope.addresses[i].ID === id) {
                                    $scope.addresses.splice(i, 1);
                                    $scope.clearForm();
                                }
                            }
                        }
                    });
                }
            };

            $scope.setAsDefault = function (id) {
                $visitorApiService.update({'shipping_address_id': id}).$promise.then(
                    function (response) {
                        $visitorLoginService.setLogin(response.result);
                        $scope.visitor = $visitorLoginService.getVisitor();
                        $scope.message = $commonUtilService.getMessage(null, 'success', 'Address was selected as default with success');
                    }
                );
            };

            $scope.save = function () {
                var id, saveSuccess, saveError, updateSuccess, updateError;
                $scope.submitted = true;

                if (this.addressForm.$invalid) {
                    return false;
                }

                if (typeof $scope.address !== 'undefined') {
                    id = $scope.address.id || $scope.address._id;
                }

                /**
                 *
                 * @param response
                 */
                saveSuccess = function (response) {
                    if (response.error === null) {
                        $scope.addresses.push({
                                'ID': response.result._id,
                                'Name': getFullName(response.result)
                            }
                        );
                    }
                    $('#parent_popup_address').modal("hide");
                    $scope.submitted = false;
                    $scope.message = $commonUtilService.getMessage(null, 'success', 'New address was added with success');
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
                    if (response.error === null) {
                        addr = response.result;
                        for (i = 0; i < $scope.addresses.length; i += 1) {
                            if ($scope.addresses[i].ID === addr._id) {
                                $scope.addresses[i].ID = addr._id;
                                $scope.addresses[i].Name = getFullName(addr);
                            }
                        }
                    }
                    $('#parent_popup_address').modal('hide');
                    $scope.submitted = false;
                    $scope.message = $commonUtilService.getMessage(null, 'success', 'Address was changed with success');
                };

                /**
                 *
                 * @param response
                 */
                updateError = function () {
                };

                if (!id) {
                    $scope.address["visitor_id"] = $visitorLoginService.getVisitorId();
                    $visitorApiService.saveAddress($scope.address, saveSuccess, saveError);
                } else {
                    $scope.address.id = id;
                    $visitorApiService.addressUpdate($scope.address, updateSuccess, updateError);
                }
            };

            $scope.popUpOpen = function (addressId) {
                if (typeof addressId === 'undefined') {
                    $scope.clearForm();
                    $('#parent_popup_address').modal('show');
                } else {
                    $visitorApiService.loadAddress({'addressID': addressId}).$promise.then(
                        function (response) {
                            $scope.address = response.result || [];

                            var shippingAddressId = (typeof $scope.visitor["shipping_address"] !== 'undefined' && $scope.visitor["shipping_address"] !== null) ?
                                $scope.visitor["shipping_address"]._id : null;
                            var billingAddressId = (typeof $scope.visitor["billing_address"] !== 'undefined' && $scope.visitor["billing_address"] !== null) ?
                                $scope.visitor["billing_address"]._id : null;
                            $scope.useAsDefaultShipping = (shippingAddressId && shippingAddressId === $scope.address._id) ? true : false;
                            $scope.useAsDefaultBilling = (billingAddressId && billingAddressId === $scope.address._id) ? true : false;

                            $('#parent_popup_address').modal('show');

                        }
                    );
                }
            };


            $scope.changeShippingAsDefault = function (id) {
                delete $scope.visitor["billing_address"];
                delete $scope.visitor["shipping_address"];
                delete $scope.visitor["password"];

                if (!$scope.useAsDefaultShipping) {
                    $scope.visitor["shipping_address_id"] = "";
                } else {
                    $scope.visitor["shipping_address_id"] = id;
                }

                $visitorApiService.update($scope.visitor).$promise.then(
                    function (response) {
                        $visitorLoginService.setLogin(response.result);
                        $scope.visitor = $visitorLoginService.getVisitor();
                    }
                );
            };

            $scope.changeBillingAsDefault = function (id) {
                delete $scope.visitor["billing_address"];
                delete $scope.visitor["shipping_address"];
                delete $scope.visitor["password"];

                if (!$scope.useAsDefaultBilling) {
                    $scope.visitor["billing_address_id"] = "";
                } else {
                    $scope.visitor["billing_address_id"] = id;
                }
                $visitorApiService.update($scope.visitor).$promise.then(
                    function (response) {
                        $visitorLoginService.setLogin(response.result);
                        $scope.visitor = $visitorLoginService.getVisitor();
                    }
                );
            };

            // REFACTOR
            // Sidebar
            $scope.isActive = function (path) {
                return (activePath === path);
            };
        }
    ]);