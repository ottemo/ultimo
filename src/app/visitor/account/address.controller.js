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
        // General
        $scope.visitor = visitorLoginService.getVisitor();

        // Address List
        $scope.addresses = [];
        $scope.remove = remove;
        $scope.popUpOpen = popUpOpen;
        $scope.setAsDefault = setAsDefault; // Not used

        // Edit / Add Form
        $scope.address = {};
        $scope.addressForm = {};
        $scope.countries = coreCountryService;
        $scope.states = coreStateService;
        $scope.message = '';
        $scope.save = save;

        // Sidebar, refactor
        var activePath = $location.path();
        $scope.isActive = isActive;

        // Default address highlighting
        $scope.isDefault = isDefault;

        activate();

        //////////////////////////

        function activate() {
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
        }

        // Listing Addresses
        function popUpOpen(addressId) {
            clearForm();

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
        }

        function remove(id) {
            var i;

            visitorApiService.deleteAddress({
                'addressID': id
            }, function(response) {
                if (response.result === 'ok') {
                    for (i = 0; i < $scope.addresses.length; i += 1) {
                        if ($scope.addresses[i].ID === id) {
                            $scope.addresses.splice(i, 1);
                            clearForm();
                        }
                    }
                }
            });
        }

        function setAsDefault(id) {
            visitorApiService.update({
                'shipping_address_id': id
            }).$promise.then(
                function(response) {
                    visitorLoginService.setLogin(response.result);
                    $scope.visitor = visitorLoginService.getVisitor();
                    $scope.message = commonUtilService.getMessage(null, 'success', 'Address was selected as default with success');
                }
            );
        }

        // Add / Edit Address
        function getFullName(address) {
            return [
                address.address_line1 + (address.address_line2 ? ' ' + address.address_line2 : ''),
                address.city,
                address.state,
                address.zip_code,
                address.country
            ].join(', ');
        }

        function clearForm() {
            $scope.message = '';
            $scope.address = {
                'visitor_id': $scope.visitor._id
            };
            $scope.addressForm.$setPristine();
            $scope.addressForm.$setUntouched();
        }

        function save() {
            var id;

            if (typeof $scope.address !== 'undefined') {
                id = $scope.address.id || $scope.address._id;
            }

            if (!id) {
                id = visitorLoginService.getVisitorId();
                $scope.address["visitor_id"] = id;
                visitorApiService.saveAddress($scope.address, saveSuccess, errCallback);
            } else {
                $scope.address.id = id;
                visitorApiService.addressUpdate($scope.address, updateSuccess, errCallback);
            }

            function saveSuccess(response) {
                if (response.error === null) {
                    updateDefaultAddress(response.result);
                    $scope.addresses.push({
                        'ID': response.result._id,
                        'Name': getFullName(response.result)
                    });
                }
                $('#parent_popup_address').modal("hide");
                $scope.message = commonUtilService.getMessage(null, 'success', 'New address was added with success');
            }

            function updateSuccess(response) {

                if (response.error === null) {
                    var addr = response.result;
                    updateDefaultAddress(addr);
                    for (var i = 0; i < $scope.addresses.length; i += 1) {
                        if ($scope.addresses[i].ID === addr._id) {
                            $scope.addresses[i].ID = addr._id;
                            $scope.addresses[i].Name = getFullName(addr);
                        }
                    }
                }
                $('#parent_popup_address').modal('hide');
                $scope.message = commonUtilService.getMessage(null, 'success', 'Address was changed with success');
            }

            function updateDefaultAddress(addr) {

                // update default addresses
                if ($scope.address.useAsDefaultBilling) {
                    $scope.visitor.billing_address_id = addr._id;
                }

                if ($scope.address.useAsDefaultShipping) {
                    $scope.visitor.shipping_address_id = addr._id;
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
            }

            function errCallback() {}
        }

        function isActive(path) {
            return (activePath === path)
        }

        function isDefault(id) {
            return (id == $scope.visitor.shipping_address_id || id == $scope.visitor.billing_address_id)
        }

    }
]);

