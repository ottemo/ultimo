angular.module('checkoutModule')

    .directive('otCheckoutAddressManager', [
        '_',
        '$q',
        'visitorApiService',
        'visitorLoginService',
        function(
            _,
            $q,
            visitorApiService,
            visitorLoginService
        ) {
            return {
                restrict: 'EA',
                scope: {
                    manager: '=',               // Directive methods
                    onSubmit: '&',              // Address submit handler
                    addressType: '@',           // 'shipping' or 'billing'

                    /**
                     * Visitor information
                     * If empty value is passed, will be obtained from visitor service
                     * {
                 *      id
                 *      isGuest
                 *      addresses: [...]
                 *      defaultAddresses: {
                 *          shipping_address_id
                 *          billing_address_id
                 *      }
                 * }
                     */
                    visitorProps: '=',

                    /**
                     * Modal address form
                     * Used for editing a saved address or adding a new one
                     * {
                 *      model: {
                 *          first_name
                 *          last_name
                 *          ...
                 *      },
                 *      controller
                 *      actionUseAddress: Function
                 * }
                     */
                    modalAddressManager: '=',

                    getEmptyAddress: '='        // Method to obtain the pattern of empty address
                },
                templateUrl: '/views/checkout/directives/checkout-address-manager.directive.html',
                link: function(scope) {

                    scope.manager = {
                        init: init,
                        submit: submit
                    };

                    // Currently visible areas of the view
                    // Possible areas are:
                    //      form - address form
                    //      list - list of saved addresses
                    //      preview - short view of current address with Edit button
                    // In some cases several areas can be shown in the same time, so use an array
                    var visibleAreas = [];

                    // ID of visitor's default address
                    var defaultAddressId = null;

                    // Currently set address in the directive
                    scope.currentAddress = null;

                    /**
                     * New address form
                     * Used for anonymous visitors
                     * And for registered visitors, when an address is set in checkout, but is not saved yet in the account
                     * {
                 *      model: {
                 *          first_name
                 *          last_name
                 *          ...
                 *      },
                 *      controller
                 *      actionSubmit: Function
                 * }
                     */
                    scope.newAddressManager = {
                        'actionSubmit': scope.onSubmit
                    };

                    scope.isAreaVisible = isAreaVisible;
                    scope.actions = {
                        editCurrentAddress: actionEditCurrentAddress,
                        selectSavedAddress: actionSelectSavedAddress,
                        editSavedAddress: actionEditSavedAddress,
                        selectNewAddress: actionSelectNewAddress
                    };

                    /////////////////////////////

                    // Check if area is currently show
                    function isAreaVisible(area) {
                        return visibleAreas.indexOf(area) !== -1;
                    }

                    // Edit address preview
                    function actionEditCurrentAddress() {
                        var id = scope.currentAddress._id;

                        if (id && isAddressSaved(id)) {
                            showArea('list');
                        } else {
                            initAddressForm(scope.newAddressManager, scope.currentAddress);

                            if (scope.visitorProps.addresses.length > 0) {
                                showArea(['list', 'form']);
                            } else {
                                showArea('form');
                            }
                        }
                    }

                    // Select saved address by id
                    function actionSelectSavedAddress(id) {
                        setCurrentAddressById(id).then(function() {
                            showArea('preview');
                        });
                    }

                    // Edit saved address
                    function actionEditSavedAddress(id) {
                        // Load visitor address by id
                        visitorApiService.loadAddress({ 'addressID': id }).$promise
                            .then(function(response) {
                                if (response.error === null) {

                                    // Pre-fill address form in modal window
                                    initAddressForm(scope.modalAddressManager, response.result);
                                    scope.modalAddressManager.model.isDefaultShipping = scope.visitorProps.defaultAddresses.shipping_address_id === id;
                                    scope.modalAddressManager.model.isDefaultBilling = scope.visitorProps.defaultAddresses.billing_address_id === id;
                                    openModalAddress();

                                    // Define handlers for modal actions
                                    scope.modalAddressManager.actionUseAddress = function() {
                                        if (!scope.modalAddressManager.controller.$pristine) {
                                            scope.modalAddressManager.model._id = null;
                                        }
                                        setCurrentAddress(scope.modalAddressManager.model);
                                        closeModalAddress();
                                        showArea('preview');
                                    };

                                    scope.modalAddressManager.actionSaveAddress = function() {
                                        scope.modalAddressManager.controller.$submitted = true;
                                        if (scope.modalAddressManager.controller.$valid) {

                                            scope.modalAddressManager.model.id = scope.modalAddressManager.model._id;
                                            var id = scope.modalAddressManager.model._id;

                                            // Update address in account
                                            visitorApiService.addressUpdate(scope.modalAddressManager.model).$promise
                                                .then(function(response) {
                                                    if (response.error === null) {
                                                        return updateVisitorDefaultAddresses(scope.modalAddressManager.model, id);
                                                    }
                                                })

                                                // Update the list of saved addresses
                                                .then(function() {
                                                    return visitorApiService.getAddresses().$promise
                                                        .then(function(response) {
                                                            if (response.error === null) {
                                                                scope.visitorProps.addresses = response.result;
                                                            }
                                                        });
                                                })

                                                // Set address as current
                                                .then(function() {
                                                    setCurrentAddress(scope.modalAddressManager.model);
                                                    closeModalAddress();
                                                    showArea('preview');
                                                });
                                        }
                                    };
                                }
                            });
                    }

                    // Add new address
                    function actionSelectNewAddress() {
                        // Pre-fill modal address form
                        initAddressForm(scope.modalAddressManager, scope.getEmptyAddress());
                        scope.modalAddressManager.model.isDefaultShipping = false;
                        scope.modalAddressManager.model.isDefaultBilling = false;
                        openModalAddress();

                        // Define handlers for modal actions
                        scope.modalAddressManager.actionUseAddress = function() {
                            scope.modalAddressManager.controller.$submitted = true;
                            if (scope.modalAddressManager.controller.$valid) {
                                // Set address as current
                                setCurrentAddress(scope.modalAddressManager.model);
                                closeModalAddress();
                                showArea('preview');
                            }
                        };

                        scope.modalAddressManager.actionSaveAddress = function() {
                            scope.modalAddressManager.controller.$submitted = true;
                            if (scope.modalAddressManager.controller.$valid) {
                                scope.modalAddressManager.model.visitor_id = scope.visitorProps.id;
                                var addressId;

                                // Save new address in account
                                visitorApiService.saveAddress(scope.modalAddressManager.model).$promise
                                    .then(function (response) {
                                        if (response.error === null) {
                                            addressId = response.result._id;
                                            scope.modalAddressManager.model._id = addressId;
                                            return updateVisitorDefaultAddresses(scope.modalAddressManager.model, addressId);
                                        }
                                    })

                                    // Update the list of saved addresses
                                    .then(function () {
                                        return visitorApiService.getAddresses().$promise
                                            .then(function (response) {
                                                if (response.error === null) {
                                                    scope.visitorProps.addresses = response.result;
                                                }
                                            });
                                    })

                                    // Set address as current
                                    .then(function () {
                                        setCurrentAddress(scope.modalAddressManager.model);
                                        closeModalAddress();
                                        showArea('preview');
                                    });
                            }
                        };
                    }

                    // Show a particular area in the view
                    // areas: 'preview', 'list', 'form'
                    function showArea(area) {
                        if (angular.isArray(area)) {
                            visibleAreas = area;
                        } else {
                            visibleAreas = [area];
                        }
                    }

                    // Initialization
                    function init(address) {
                        setCurrentAddress(address);

                        setVisitorProps().then(function() {

                            // If guest
                            if (scope.visitorProps.isGuest) {

                                // Pre-fill form
                                if (!scope.currentAddress) {
                                    initAddressForm(scope.newAddressManager, scope.getEmptyAddress());
                                } else {
                                    initAddressForm(scope.newAddressManager, scope.currentAddress);
                                }

                                showArea('form');

                                // If user is logged in
                            } else {

                                // Get default address id from visitorProps
                                switch (scope.addressType) {
                                    case 'shipping':
                                        defaultAddressId = scope.visitorProps.defaultAddresses.shipping_address_id;
                                        break;
                                    case 'billing':
                                        defaultAddressId = scope.visitorProps.defaultAddresses.billing_address_id;
                                        break;
                                }

                                // If have an address in checkout
                                if (scope.currentAddress) {

                                    // Update address if it has an id
                                    if (scope.currentAddress._id) {
                                        setCurrentAddressById(scope.currentAddress._id)
                                            .then(function(response) {
                                                if (response.error !== null) {
                                                    scope.currentAddress._id = null;
                                                }

                                                showArea('preview');
                                            });

                                    } else {
                                        showArea('preview');
                                    }

                                    // if there is no address in checkout
                                } else {

                                    // If have default address id in account
                                    if (defaultAddressId !== null) {
                                        // Try to load default address and show preview
                                        setCurrentAddressById(defaultAddressId)
                                            .then(function(response) {
                                                if (response.error === null) {
                                                    // Show preview on success
                                                    showArea('preview');

                                                    // If can't load default address
                                                } else {
                                                    // If have saved addresses, show the list
                                                    if (scope.visitorProps.addresses.length > 0) {
                                                        showArea('list');

                                                        // Otherwise show empty address form
                                                    } else {
                                                        initAddressForm(scope.newAddressManager, scope.getEmptyAddress());
                                                        showArea('form');
                                                    }
                                                }
                                            });

                                        // If there are no default address in account
                                    } else {

                                        // If have saved addresses, select the first address
                                        if (scope.visitorProps.addresses.length > 0) {
                                            var firstSavedAddressId = scope.visitorProps.addresses[0].ID;

                                            // Try to load default address and show preview
                                            setCurrentAddressById(firstSavedAddressId)
                                                .then(function(response) {
                                                    if (response.error === null) {
                                                        // Show preview on success
                                                        showArea('preview');

                                                        // If can't load address
                                                    } else {
                                                        showArea('list');
                                                    }
                                                });

                                            // Otherwise show empty address form
                                        } else {
                                            initAddressForm(scope.newAddressManager, scope.getEmptyAddress());
                                            showArea('form');
                                        }
                                    }
                                }

                            }
                        });
                    }

                    // Get visitor information
                    function setVisitorProps() {
                        var visitorDeferred = $q.defer();

                        // Do nothing if already have visitor information
                        if (scope.visitorProps) {
                            visitorDeferred.resolve();

                            // Otherwise get visitor data from services
                        } else {
                            visitorLoginService.isLoggedIn().then(function(isLoggedIn){
                                var visitorProps = {};
                                var visitor = visitorLoginService.getVisitor();
                                visitorProps.isGuest = !isLoggedIn;

                                // Set empty values for guest
                                if (visitorProps.isGuest) {

                                    visitorProps.addresses = [];
                                    visitorProps.defaultAddresses = {};
                                    scope.visitorProps = visitorProps;
                                    visitorDeferred.resolve();

                                    // If is logged in
                                } else {

                                    visitorProps.id = visitor.id;

                                    // Get default addresses
                                    visitorProps.defaultAddresses = {
                                        shipping_address_id: visitor.shipping_address_id || null,
                                        billing_address_id: visitor.billing_address_id || null
                                    };

                                    // Get saved addresses
                                    visitorApiService.getAddresses().$promise
                                        .then(function(response) {
                                            visitorProps.addresses = response.result || [];

                                            scope.visitorProps = visitorProps;
                                            visitorDeferred.resolve();
                                        });
                                }
                            });

                        }

                        return visitorDeferred.promise;
                    }

                    // Action submit address
                    function submit() {
                        var addressDeferred = $q.defer();

                        // Guests
                        if (scope.visitorProps.isGuest) {
                            scope.newAddressManager.controller.$submitted = true;

                            if (scope.newAddressManager.controller.$valid) {
                                setCurrentAddress(scope.newAddressManager.model);
                                addressDeferred.resolve(scope.currentAddress);
                            } else {
                                addressDeferred.reject();
                            }

                            // Registered visitors
                        } else {
                            // If user is filling out the address form
                            if (isAreaVisible('form')) {
                                scope.newAddressManager.controller.$submitted = true;
                                if (scope.newAddressManager.controller.$valid) {

                                    if (scope.newAddressManager.model.saveInAccount) {
                                        scope.newAddressManager.model.visitor_id = scope.visitorProps.id;
                                        var addressId;

                                        // Save address in visitor account
                                        visitorApiService.saveAddress(scope.newAddressManager.model).$promise
                                            .then(function(response) {
                                                if (response.error === null) {
                                                    addressId = response.result._id;
                                                    return updateVisitorDefaultAddresses(scope.newAddressManager.model, addressId);
                                                }
                                            })

                                            // Update address list
                                            .then(function() {
                                                return visitorApiService.getAddresses().$promise
                                                    .then(function(response) {
                                                        if (response.error === null) {
                                                            scope.visitorProps.addresses = response.result || [];
                                                        }
                                                    });
                                            })

                                            // Set address as current
                                            .then(function() {
                                                scope.newAddressManager.model._id = addressId;
                                                setCurrentAddress(scope.newAddressManager.model);
                                                showArea('preview');
                                                addressDeferred.resolve(scope.newAddressManager.model);
                                            });

                                    } else {
                                        setCurrentAddress(scope.newAddressManager.model);
                                        showArea('preview');
                                        addressDeferred.resolve(scope.newAddressManager.model);
                                    }


                                } else {
                                    addressDeferred.reject();
                                }

                            } else {
                                if (scope.currentAddress !== null) {
                                    showArea('preview');
                                    addressDeferred.resolve(scope.currentAddress);
                                } else {
                                    addressDeferred.reject();
                                }
                            }
                        }

                        return addressDeferred.promise;
                    }

                    // Set current address by model
                    function setCurrentAddress(address) {
                        return scope.currentAddress = address;
                    }

                    // Set current address by id
                    function setCurrentAddressById(id) {
                        return visitorApiService.loadAddress({ 'addressID': id }).$promise
                            .then(function(response) {
                                if (response.error === null) {
                                    scope.currentAddress = response.result;
                                }

                                return response;
                            });
                    }

                    // Check if an address with specified ID is saved in visitor account
                    function isAddressSaved(id) {
                        return _.filter(scope.visitorProps.addresses, { 'ID': id }).length !== 0;
                    }

                    // Pre-fill address form with model and remove validation errors
                    function initAddressForm(addressManager, addressModel) {
                        addressManager.controller.$setPristine();
                        addressManager.controller.$setUntouched();

                        if (addressModel) {
                            addressManager.model = angular.extend({}, addressModel);
                        }
                    }

                    // Manage visitor default addresses
                    function updateVisitorDefaultAddresses(address, id) {
                        var defaultAddresses = {};

                        if (address.isDefaultShipping) {
                            defaultAddresses.shipping_address_id = id;
                        }

                        if (address.isDefaultBilling) {
                            defaultAddresses.billing_address_id = id;
                        }

                        // Update visitor default addresses
                        if (!_.isEmpty(defaultAddresses)) {
                            return visitorApiService.update(defaultAddresses).$promise
                                .then(function(response) {
                                    if (response.error === null) {
                                        scope.visitorProps.defaultAddresses.shipping_address_id = response.result.shipping_address_id;
                                        scope.visitorProps.defaultAddresses.billing_address_id = response.result.billing_address_id;
                                    }
                                });
                        }
                    }

                    // Open modal
                    function openModalAddress() {
                        $('#modal-address').modal('show');
                    }

                    // Close modal
                    function closeModalAddress() {
                        $('#modal-address').modal('hide');
                    }
                }
            };
        }]);
