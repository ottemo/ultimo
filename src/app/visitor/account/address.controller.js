angular.module("visitorModule")

.controller('visitorAccountAddressController', [
    '$scope',
    '$location',
    'visitorLoginService',
    'visitorApiService',
    'designStateService',
    'commonUtilService',
    'designCountryService',
    function(
        $scope,
        $location,
        visitorLoginService,
        visitorApiService,
        designStateService,
        commonUtilService,
        designCountryService
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
        $scope.countries = designCountryService;
        $scope.states = designStateService;
        $scope.message = '';
        $scope.save = save;
        $scope.changeShippingAsDefault = changeShippingAsDefault; // REFACTOR: buggy implementation
        $scope.changeBillingAsDefault = changeBillingAsDefault; // REFACTOR: buggy implementation

        // Sidebar, refactor
        $scope.isActive = isActive;

        var activePath = $location.path();

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
            return address['zip_code'] +
                ' ' + address.state +
                ', ' + address.city +
                ', ' + address['address_line1'] +
                (address['address_line2'] ? ', ' + address['address_line2'] : '');
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
                $scope.address["visitor_id"] = visitorLoginService.getVisitorId();
                visitorApiService.saveAddress($scope.address, saveSuccess, errCallback);
            } else {
                $scope.address.id = id;
                visitorApiService.addressUpdate($scope.address, updateSuccess, errCallback);
            }

            function saveSuccess(response) {
                if (response.error === null) {
                    $scope.addresses.push({
                        'ID': response.result._id,
                        'Name': getFullName(response.result)
                    });
                }
                $('#parent_popup_address').modal("hide");
                $scope.message = commonUtilService.getMessage(null, 'success', 'New address was added with success');
            }

            function updateSuccess(response) {
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
                $scope.message = commonUtilService.getMessage(null, 'success', 'Address was changed with success');
            }

            function errCallback() {}
        }

        function changeShippingAsDefault(id) {
            delete $scope.visitor["billing_address"];
            delete $scope.visitor["shipping_address"];
            delete $scope.visitor["password"];

            if (!$scope.useAsDefaultShipping) {
                $scope.visitor["shipping_address_id"] = "";
            } else {
                $scope.visitor["shipping_address_id"] = id;
            }

            visitorApiService.update($scope.visitor).$promise.then(
                function(response) {
                    visitorLoginService.setLogin(response.result);
                    $scope.visitor = visitorLoginService.getVisitor();
                }
            );
        }

        function changeBillingAsDefault(id) {
            delete $scope.visitor["billing_address"];
            delete $scope.visitor["shipping_address"];
            delete $scope.visitor["password"];

            if (!$scope.useAsDefaultBilling) {
                $scope.visitor["billing_address_id"] = "";
            } else {
                $scope.visitor["billing_address_id"] = id;
            }
            visitorApiService.update($scope.visitor).$promise.then(
                function(response) {
                    visitorLoginService.setLogin(response.result);
                    $scope.visitor = visitorLoginService.getVisitor();
                }
            );
        }

        // REFACTOR: Sidebar code
        function isActive(path) {
            return (activePath === path);
        }
    }
]);

