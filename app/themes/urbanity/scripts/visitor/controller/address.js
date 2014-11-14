(function (define, $) {
    'use strict';

    define(['visitor/init'], function (visitorModule) {
        visitorModule

            .controller('visitorAddressControllerUrb', [
                '$scope',
                '$controller',
                '$location',
                '$visitorLoginService',
                '$visitorApiService',
                '$designStateService',
                function ($scope, $controller, $location, $visitorLoginService, $visitorApiService, $designStateService) {

                    $controller('visitorAddressController', {$scope: $scope});

                    var getFullName;

                    $scope.countries = [
                        { Code: 'US', Name: 'USA' }
                    ];
                    $scope.states = $designStateService;
                    $scope.addresses = [];
                    $scope.address = {};
                    $scope.visitor = $visitorLoginService.getVisitor();
                    $scope.visitorService = $visitorLoginService;
                    var activePath;

                    getFullName = function (obj) {
                        return obj["zip_code"] +
                            ' ' + obj["state"] +
                            ', ' + obj["city"] +
                            ', ' + obj["address_line1"] +
                            (obj["address_line2"] ? ', ' + obj["address_line2"] : '');
                    };

                    $scope.init = function () {
                        // BREADCRUMBS
                        $scope.$emit('add-breadcrumbs', {'label': 'myAccount', 'url': '/account'});
                        $scope.$emit('add-breadcrumbs', {'label': 'Addresses', 'url': '/account/address'});

                        activePath = $location.path();

                        $scope.visitorService.isLoggedIn().then(function(isLoggedIn){
                            if (!isLoggedIn) {
                                $location.path("/");
                            }
                        });
                    };

                    /**
                     * Clears the form to create a new address
                     */
                    $scope.clearForm = function () {
                        $scope.address = {'visitor_id': $scope.visitor._id};
                    };

                    $scope.clearForm();

                    $visitorApiService.getAddresses({'visitorId': $scope.visitor._id}).$promise.then(
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
                        $visitorApiService.loadAddress({'id': id}).$promise.then(
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
                            $visitorApiService.deleteAddress({'id': id}, function (response) {
                                if (response.result === 'ok') {
                                    for (i = 0; i < $scope.addresses.length; i += 1) {
                                        if ($scope.addresses[i].Id === id) {
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
                                $scope.message = {
                                    'type': 'success',
                                    'message': 'Address was selected as default with success'
                                };
                            }
                        );
                    };

                    $scope.save = function () {
                        var id, saveSuccess, saveError, updateSuccess, updateError;
                        $scope.submitted = true;

                        if ($scope.addressForm.$invalid) {
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
                            if (response.error === '') {
                                $scope.addresses.push({
                                        'Id': response.result._id,
                                        'Name': getFullName(response.result)
                                    }
                                );
                            }
                            $('#parent_popup_address').hide();
                            $scope.submitted = false;
                            $scope.message = {
                                'type': 'success',
                                'message': 'New address was added with success'
                            };
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
                            if (response.error === '') {
                                addr = response.result;
                                for (i = 0; i < $scope.addresses.length; i += 1) {
                                    if ($scope.addresses[i].Id === addr._id) {
                                        $scope.addresses[i].Id = addr._id;
                                        $scope.addresses[i].Name = getFullName(addr);
                                    }
                                }
                            }
                            $('#parent_popup_address').hide();
                            $scope.submitted = false;
                            $scope.message = {
                                'type': 'success',
                                'message': 'Address was changed with success'
                            };
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
                            $scope.address = {};
                            $('#parent_popup_address').fadeIn(10);
                        } else {
                            $visitorApiService.loadAddress({'id': addressId}).$promise.then(
                                function (response) {
                                    $scope.address = response.result || [];

                                    $scope.shippingAddressId = (typeof $scope.visitor["shipping_address"] !== 'undefined' && $scope.visitor["shipping_address"] !== null) ?
                                        $scope.visitor["shipping_address"]._id : null;
                                    $scope.billingAddressId = (typeof $scope.visitor["billing_address"] !== 'undefined' && $scope.visitor["billing_address"] !== null) ?
                                        $scope.visitor["billing_address"]._id : null;

                                    $('#parent_popup_address').fadeIn(10);

                                }
                            );
                        }
                    };


                    $scope.changeShippingAsDefault = function (id) {
                        delete $scope.visitor["billing_address"];
                        delete $scope.visitor["shipping_address"];

                        if (!$scope.shippingAddressId) {
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
                        if (!$scope.billingAddressId) {
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

                    $scope.getAddressName = function (addr) {
                        var _default, name;
                        name = addr.Name;
                        _default = [];
                        if (typeof $scope.visitor["billing_address"] !== 'undefined' &&
                            $scope.visitor["billing_address"] !== null &&
                            addr.Id === $scope.visitor["billing_address"]._id) {
                            _default.push('default billing');
                        }
                        if (typeof $scope.visitor["shipping_address"] !== 'undefined' &&
                            $scope.visitor["shipping_address"] !== null &&
                            addr.Id === $scope.visitor["shipping_address"]._id) {
                            _default.push('default shipping');
                        }

                        if (_default.length > 0) {
                            name += '( ' + _default.join(', ') + ')';
                        }

                        return name;
                    };

                    $scope.isActive = function (path) {
                        if (activePath === path) {
                            $('.account-menu ul li:first-child').find('span')
                                .css('background', 'url("themes/default/images/tablet/tabL.jpg") no-repeat top left');
                            return true;
                        }
                        return false;
                    };
                }
            ])
        ;
        return visitorModule;
    });
})
(window.define, jQuery);
