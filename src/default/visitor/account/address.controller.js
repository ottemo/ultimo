angular.module("visitorModule")

.controller('visitorAccountAddressController', [
    '$scope',
    '$location',
    'visitorLoginService',
    'visitorApiService',
    'coreStateService',
    'commonUtilService',
    'coreCountryService',
    function(
        $scope,
        $location,
        visitorLoginService,
        visitorApiService,
        coreStateService,
        commonUtilService,
        coreCountryService
    ) {
        // Address List
        $scope.addresses = [];

        // Edit / Add Form
        $scope.address = {};
        $scope.addressForm = {};
        $scope.countries = coreCountryService;
        $scope.states = coreStateService;
        $scope.message = '';

        // Sidebar, refactor
        $scope.activePath = $location.path();

        //////////////////////////

        $scope.activate = function() {
            $scope.visitor = visitorLoginService.getVisitor();

            // BREADCRUMBS
            $scope.$emit('add-breadcrumbs', {
                'label': 'myAccount',
                'url': '/account'
            });
            $scope.$emit('add-breadcrumbs', {
                'label': 'Addresses',
                'url': '/account/address'
            });

            // Redirect
            visitorLoginService.isLoggedIn()
                .then(function(isLoggedIn) {
                    if (!isLoggedIn) {
                        $location.path("/");
                    }
                });

            // Fetch addresses
            visitorApiService.getAddresses().$promise
                .then(function(response) {
                    var result = response.result || [];
                    $scope.addresses = result;
                });
        };

        // Listing Addresses
        $scope.popUpOpen = function(addressId) {
            $scope._clearForm();

            if (typeof addressId === 'undefined') {
                $('#parent_popup_address').modal('show');
            } else {
                visitorApiService.loadAddress({
                    'addressID': addressId
                }).$promise.then(
                    function(response) {
                        $scope.address = response.result || [];
                        $scope.address.useAsDefaultShipping = ($scope.address._id == $scope.visitor.shipping_address_id)
                        $scope.address.useAsDefaultBilling = ($scope.address._id == $scope.visitor.billing_address_id)

                        $('#parent_popup_address').modal('show');
                    }
                );
            }
        };

        $scope.remove = function(id) {
            visitorApiService.deleteAddress({
                'addressID': id
            }, function(response) {
                if (response.result === 'ok') {
                    for (var i = 0; i < $scope.addresses.length; i += 1) {
                        if ($scope.addresses[i].ID === id) {
                            $scope.addresses.splice(i, 1);
                            $scope._clearForm();
                        }
                    }
                }
            });
        };

        $scope.setAsDefault = function(id) {
            visitorApiService.update({
                'shipping_address_id': id
            }).$promise.then(
                function(response) {
                    visitorLoginService.setLogin(response.result);
                    $scope.visitor = visitorLoginService.getVisitor();
                    $scope.message = commonUtilService.getMessage(null, 'success', 'Address was selected as default with success');
                }
            );
        };

        // Add / Edit Address
        $scope._getFullName = function(address) {
            return [
                address.address_line1 + (address.address_line2 ? ' ' + address.address_line2 : ''),
                address.city,
                address.state,
                address.zip_code,
                address.country
            ].join(', ');
        };

        $scope._clearForm = function() {
            $scope.message = '';
            $scope.address = {
                'visitor_id': $scope.visitor._id
            };
            $scope.addressForm.$setPristine();
            $scope.addressForm.$setUntouched();
        };

        $scope.save = function() {
            var id;

            if (typeof $scope.address !== 'undefined') {
                id = $scope.address.id || $scope.address._id;
            }

            if (!id) {
                id = visitorLoginService.getVisitorId();
                $scope.address["visitor_id"] = id;
                visitorApiService.saveAddress($scope.address, $scope._saveSuccess, $scope._errCallback);
            } else {
                $scope.address.id = id;
                $scope.address.useAsDefaultBilling = $scope.address.useAsDefaultBilling ? true : null;
                $scope.address.useAsDefaultShipping = $scope.address.useAsDefaultShipping ? true : null;
                visitorApiService.addressUpdate($scope.address, $scope._updateSuccess, $scope._errCallback);
            }
        };

        $scope._saveSuccess = function(response) {
            if (response.error === null) {
                $scope._updateDefaultAddress(response.result);
                $scope.addresses.push({
                    'ID': response.result._id,
                    'Name': $scope._getFullName(response.result)
                });
            }
            $('#parent_popup_address').modal("hide");
            $scope.message = commonUtilService.getMessage(null, 'success', 'New address was added with success');
        };

        $scope._updateSuccess = function(response) {
            if (response.error === null) {
                var addr = response.result;
                $scope._updateDefaultAddress(addr);
                for (var i = 0; i < $scope.addresses.length; i += 1) {
                    if ($scope.addresses[i].ID === addr._id) {
                        $scope.addresses[i].ID = addr._id;
                        $scope.addresses[i].Name = $scope._getFullName(addr);
                    }
                }
            }
            $('#parent_popup_address').modal('hide');
            $scope.message = commonUtilService.getMessage(null, 'success', 'Address was changed with success');
        };

        $scope._updateDefaultAddress = function(addr) {
            // update default addresses
            if ($scope.address.useAsDefaultBilling) {
                $scope.visitor.billing_address_id = addr._id;
            } else if ($scope.visitor.billing_address_id === addr._id) {
                $scope.visitor.billing_address_id = null;
            }

            if ($scope.address.useAsDefaultShipping) {
                $scope.visitor.shipping_address_id = addr._id;
            } else if ($scope.visitor.shipping_address_id === addr._id) {
                $scope.visitor.shipping_address_id = null;
            }

            // Clean off some props
            delete $scope.visitor.billing_address;
            delete $scope.visitor.shipping_address;
            delete $scope.visitor.password;

            visitorApiService.update($scope.visitor).$promise
                .then(function(response) {
                    visitorLoginService.setLogin(response.result);
                    $scope.visitor = visitorLoginService.getVisitor();
                });
        };

        $scope._errCallback = function() {};

        $scope.isActive = function(path) {
            return ($scope.activePath === path);
        };

        $scope.isDefault = function(id) {
            return (id == $scope.visitor.shipping_address_id || id == $scope.visitor.billing_address_id)
        }

    }
]);

