angular.module("checkoutModule")

    .controller("checkoutOnepageController", [
        "$scope",
        "$location",
        "$checkoutApiService",
        "$designImageService",
        "$visitorLoginService",
        "$cartService",
        "$designStateService",
        "$commonUtilService",
        "$checkoutService",
        "$q",
        "$interval",
        function ($scope, $location, $checkoutApiService, $designImageService, $visitorLoginService, $cartService, $designStateService, $commonUtilService, $checkoutService, $q, $interval) {

            var init, info, getDefaultAddress, getAddresses, enabledGuestCheckout,
                getPaymentInfo, creditCartTypes, isValidSteps, initWatchers, defaultChoosePaymentMethod,
                defaultSetPaymentData, defaultSetUseAsBilling;

            /**
             * Gets checkout information
             * @return {promise}
             */
            info = function () {
                var defer, initAddressesData, initCurrentShippingMethod, initCurrentPaymentType, initAdditionalInfo;

                defer = $q.defer();

                initAddressesData = function () {
                    if (typeof $scope.shippingAddress !== "undefined") {
                        isValidSteps.shippingAddress = $scope.shippingAddress.$valid;
                    }

                    if (typeof $scope.billingAddress !== "undefined") {
                        isValidSteps.billingAddress = $scope.billingAddress.$valid;
                    }
                };

                initCurrentShippingMethod = function () {
                    var item, i;
                    for (i = 0; i < $scope.shippingMethods.length; i += 1) {
                        item = $scope.shippingMethods[i];

                        if ($scope.checkout["shipping_method_code"] === item.Method &&
                            $scope.checkout["shipping_rate"].Code === item.Rate) {

                            $scope.indexShippingMethod = i;
                            isValidSteps.shippingMethod = true;
                        }
                    }
                };

                initCurrentPaymentType = function () {
                    var item, i;

                    if (typeof $scope.paymentMethods !== "undefined") {
                        return true;
                    }

                    $scope.paymentMethods = $checkoutService.getAllowedPaymentMethods();
                    for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                        item = $scope.paymentMethods[i];
                        if ($scope.checkout["payment_method_code"] === item.Code) {
                            $scope.paymentType = item.Type;
                            $scope.paymentMethods[i].cc = {};
                            $scope.paymentMethods[i].cc.type = "VI";
                            $scope.paymentMethods[i].cc["expire_month"] = "12";
                            $scope.paymentMethods[i].cc["expire_year"] = "2017";
                        }
                    }
                };

                initAdditionalInfo = function () {
                    if ($scope.isGuestCheckout && typeof $scope.customerInfo !== "undefined") {
                        isValidSteps.additionalInfo = $scope.customerInfo.$valid;
                    }
                };

                $checkoutService.update().then(
                    function (checkout) {
                        $scope.checkout = checkout;
                        initCurrentShippingMethod();
                        initCurrentPaymentType();
                        initAddressesData();
                        initAdditionalInfo();
                        defer.resolve(true);
                    }
                );

                return defer.promise;
            };

            initWatchers = function () {
                /**
                 * Sets payment method
                 */
                defaultChoosePaymentMethod = $scope.$watch("checkout.payment_method_code", function () {
                    if (typeof $scope.checkout !== "undefined" &&
                        typeof $scope.checkout["payment_method_code"] !== "undefined" &&
                        $scope.checkout["payment_method_code"] !== "" &&
                        $scope.checkout["payment_method_code"] !== null) {
                        $checkoutService.savePaymentMethod({
                            "method": $scope.checkout["payment_method_code"]
                        }).then(
                            function (response) {
                                if (response.result === "ok") {
                                    var isCreditCard;
                                    isCreditCard = $scope.paymentType.split("_").indexOf("cc") >= 0;
                                    if (isCreditCard) {
                                        var payment = getPaymentInfo();
                                        isValidSteps.paymentMethod = false;
                                        if (payment.method.form.$valid && $scope.validateCcNumber()) {
                                            isValidSteps.paymentMethod = true;
                                        }
                                    } else {
                                        isValidSteps.paymentMethod = true;
                                    }
                                    info();
                                }
                            }
                        );
                    }
                });

                /**
                 * Sets payment method
                 */
                defaultSetPaymentData = $scope.$watch("paymentMethods", function () {
                    var payment = getPaymentInfo();

                    if (payment.method !== null && typeof payment.method.form !== "undefined" && payment.method.Type.split("_").indexOf("cc") >= 0) {

                        isValidSteps.paymentMethod = payment.method.form.$valid && $scope.validateCcNumber();
                    }

                }, true);

                defaultSetUseAsBilling = $scope.$watch("useAsBilling", function () {
                    if ($scope.useAsBilling && !$scope.isGuestCheckout && $scope.checkout["shipping_address"] !== null) {
                        $scope.choiceBilling($scope.checkout["shipping_address"]._id || false);
                    }

                    if ($scope.useAsBilling && $scope.isGuestCheckout) {
                        $scope.choiceShipping(false);
                    }
                }, true);
            };

            init = function () {
                getDefaultAddress = function () {
                    return {
                        "street": "",
                        "city": "",
                        "state": "",
                        "phone": "",
                        "zip_code": "",
                        "company": "",
                        "first_name": "",
                        "last_name": "",
                        "address_line1": "",
                        "address_line2": "",
                        "country": ""
                    };
                };

                creditCartTypes = {
                    'VI': [new RegExp('^4[0-9]{12}([0-9]{3})?$'), new RegExp('^[0-9]{3}$'), true],
                    'MC': [new RegExp('^5[1-5][0-9]{14}$'), new RegExp('^[0-9]{3}$'), true],
                    'AX': [new RegExp('^3[47][0-9]{13}$'), new RegExp('^[0-9]{3}$'), true],
                    'DS': [new RegExp('^6(?:011|5[0-9]{2})[0-9]{12}$'), new RegExp('^[0-9]{3}$'), true]
                };

                isValidSteps = {
                    "billingAddress": false,
                    "shippingAddress": false,
                    "shippingMethod": false,
                    "paymentMethod": false,
                    "discounts": true
                };

                if ($scope.isGuestCheckout) {
                    isValidSteps.additionalInfo = false;
                }

                $scope["checkoutService"] = $checkoutService;

                $scope["countries"] = [
                    { "Code": "US", "Name": "United States" },
                    { "Code": "AF", "Name": "Afghanistan" },
                    { "Code": "AX", "Name": "Åland Islands" },
                    { "Code": "AL", "Name": "Albania" },
                    { "Code": "DZ", "Name": "Algeria" },
                    { "Code": "AS", "Name": "American Samoa" },
                    { "Code": "AD", "Name": "Andorra" },
                    { "Code": "AO", "Name": "Angola" },
                    { "Code": "AI", "Name": "Anguilla" },
                    { "Code": "AQ", "Name": "Antarctica" },
                    { "Code": "AG", "Name": "Antigua and Barbuda" },
                    { "Code": "AR", "Name": "Argentina" },
                    { "Code": "AM", "Name": "Armenia" },
                    { "Code": "AW", "Name": "Aruba" },
                    { "Code": "AU", "Name": "Australia" },
                    { "Code": "AT", "Name": "Austria" },
                    { "Code": "AZ", "Name": "Azerbaijan" },
                    { "Code": "BS", "Name": "Bahamas" },
                    { "Code": "BH", "Name": "Bahrain" },
                    { "Code": "BD", "Name": "Bangladesh" },
                    { "Code": "BB", "Name": "Barbados" },
                    { "Code": "BY", "Name": "Belarus" },
                    { "Code": "BE", "Name": "Belgium" },
                    { "Code": "BZ", "Name": "Belize" },
                    { "Code": "BJ", "Name": "Benin" },
                    { "Code": "BM", "Name": "Bermuda" },
                    { "Code": "BT", "Name": "Bhutan" },
                    { "Code": "BO", "Name": "Bolivia" },
                    { "Code": "BA", "Name": "Bosnia and Herzegovina" },
                    { "Code": "BW", "Name": "Botswana" },
                    { "Code": "BV", "Name": "Bouvet Island" },
                    { "Code": "BR", "Name": "Brazil" },
                    { "Code": "IO", "Name": "British Indian Ocean Territory" },
                    { "Code": "VG", "Name": "British Virgin Islands" },
                    { "Code": "BN", "Name": "Brunei" },
                    { "Code": "BG", "Name": "Bulgaria" },
                    { "Code": "BF", "Name": "Burkina Faso" },
                    { "Code": "BI", "Name": "Burundi" },
                    { "Code": "KH", "Name": "Cambodia" },
                    { "Code": "CM", "Name": "Cameroon" },
                    { "Code": "CA", "Name": "Canada" },
                    { "Code": "CV", "Name": "Cape Verde" },
                    { "Code": "KY", "Name": "Cayman Islands" },
                    { "Code": "CF", "Name": "Central African Republic" },
                    { "Code": "TD", "Name": "Chad" },
                    { "Code": "CL", "Name": "Chile" },
                    { "Code": "CN", "Name": "China" },
                    { "Code": "CX", "Name": "Christmas Island" },
                    { "Code": "CC", "Name": "Cocos [Keeling] Islands" },
                    { "Code": "CO", "Name": "Colombia" },
                    { "Code": "KM", "Name": "Comoros" },
                    { "Code": "CG", "Name": "Congo - Brazzaville" },
                    { "Code": "CD", "Name": "Congo - Kinshasa" },
                    { "Code": "CK", "Name": "Cook Islands" },
                    { "Code": "CR", "Name": "Costa Rica" },
                    { "Code": "CI", "Name": "Côte d’Ivoire" },
                    { "Code": "HR", "Name": "Croatia" },
                    { "Code": "CU", "Name": "Cuba" },
                    { "Code": "CY", "Name": "Cyprus" },
                    { "Code": "CZ", "Name": "Czech Republic" },
                    { "Code": "DK", "Name": "Denmark" },
                    { "Code": "DJ", "Name": "Djibouti" },
                    { "Code": "DM", "Name": "Dominica" },
                    { "Code": "DO", "Name": "Dominican Republic" },
                    { "Code": "EC", "Name": "Ecuador" },
                    { "Code": "EG", "Name": "Egypt" },
                    { "Code": "SV", "Name": "El Salvador" },
                    { "Code": "GQ", "Name": "Equatorial Guinea" },
                    { "Code": "ER", "Name": "Eritrea" },
                    { "Code": "EE", "Name": "Estonia" },
                    { "Code": "ET", "Name": "Ethiopia" },
                    { "Code": "FK", "Name": "Falkland Islands" },
                    { "Code": "FO", "Name": "Faroe Islands" },
                    { "Code": "FJ", "Name": "Fiji" },
                    { "Code": "FI", "Name": "Finland" },
                    { "Code": "FR", "Name": "France" },
                    { "Code": "GF", "Name": "French Guiana" },
                    { "Code": "PF", "Name": "French Polynesia" },
                    { "Code": "TF", "Name": "French Southern Territories" },
                    { "Code": "GA", "Name": "Gabon" },
                    { "Code": "GM", "Name": "Gambia" },
                    { "Code": "GE", "Name": "Georgia" },
                    { "Code": "DE", "Name": "Germany" },
                    { "Code": "GH", "Name": "Ghana" },
                    { "Code": "GI", "Name": "Gibraltar" },
                    { "Code": "GR", "Name": "Greece" },
                    { "Code": "GL", "Name": "Greenland" },
                    { "Code": "GD", "Name": "Grenada" },
                    { "Code": "GP", "Name": "Guadeloupe" },
                    { "Code": "GU", "Name": "Guam" },
                    { "Code": "GT", "Name": "Guatemala" },
                    { "Code": "GG", "Name": "Guernsey" },
                    { "Code": "GN", "Name": "Guinea" },
                    { "Code": "GW", "Name": "Guinea-Bissau" },
                    { "Code": "GY", "Name": "Guyana" },
                    { "Code": "HT", "Name": "Haiti" },
                    { "Code": "HM", "Name": "Heard Island and McDonald Islands" },
                    { "Code": "HN", "Name": "Honduras" },
                    { "Code": "HK", "Name": "Hong Kong SAR China" },
                    { "Code": "HU", "Name": "Hungary" },
                    { "Code": "IS", "Name": "Iceland" },
                    { "Code": "IN", "Name": "India" },
                    { "Code": "IR", "Name": "Iran" },
                    { "Code": "IQ", "Name": "Iraq" },
                    { "Code": "IE", "Name": "Ireland" },
                    { "Code": "IM", "Name": "Isle of Man" },
                    { "Code": "IL", "Name": "Israel" },
                    { "Code": "IT", "Name": "Italy" },
                    { "Code": "JM", "Name": "Jamaica" },
                    { "Code": "JP", "Name": "Japan" },
                    { "Code": "JE", "Name": "Jersey" },
                    { "Code": "JO", "Name": "Jordan" },
                    { "Code": "KZ", "Name": "Kazakhstan" },
                    { "Code": "KE", "Name": "Kenya" },
                    { "Code": "KI", "Name": "Kiribati" },
                    { "Code": "KW", "Name": "Kuwait" },
                    { "Code": "KG", "Name": "Kyrgyzstan" },
                    { "Code": "LA", "Name": "Laos" },
                    { "Code": "LV", "Name": "Latvia" },
                    { "Code": "LB", "Name": "Lebanon" },
                    { "Code": "LS", "Name": "Lesotho" },
                    { "Code": "LR", "Name": "Liberia" },
                    { "Code": "LY", "Name": "Libya" },
                    { "Code": "LI", "Name": "Liechtenstein" },
                    { "Code": "LT", "Name": "Lithuania" },
                    { "Code": "LU", "Name": "Luxembourg" },
                    { "Code": "MO", "Name": "Macau SAR China" },
                    { "Code": "MK", "Name": "Macedonia" },
                    { "Code": "MG", "Name": "Madagascar" },
                    { "Code": "MW", "Name": "Malawi" },
                    { "Code": "MY", "Name": "Malaysia" },
                    { "Code": "MV", "Name": "Maldives" },
                    { "Code": "ML", "Name": "Mali" },
                    { "Code": "MT", "Name": "Malta" },
                    { "Code": "MH", "Name": "Marshall Islands" },
                    { "Code": "MQ", "Name": "Martinique" },
                    { "Code": "MR", "Name": "Mauritania" },
                    { "Code": "MU", "Name": "Mauritius" },
                    { "Code": "YT", "Name": "Mayotte" },
                    { "Code": "FM", "Name": "Micronesia" },
                    { "Code": "MD", "Name": "Moldova" },
                    { "Code": "MC", "Name": "Monaco" },
                    { "Code": "MN", "Name": "Mongolia" },
                    { "Code": "ME", "Name": "Montenegro" },
                    { "Code": "MS", "Name": "Montserrat" },
                    { "Code": "MA", "Name": "Morocco" },
                    { "Code": "MZ", "Name": "Mozambique" },
                    { "Code": "MM", "Name": "Myanmar [Burma]" },
                    { "Code": "NA", "Name": "Namibia" },
                    { "Code": "NR", "Name": "Nauru" },
                    { "Code": "NP", "Name": "Nepal" },
                    { "Code": "NL", "Name": "Netherlands" },
                    { "Code": "AN", "Name": "Netherlands Antilles" },
                    { "Code": "NC", "Name": "New Caledonia" },
                    { "Code": "NZ", "Name": "New Zealand" },
                    { "Code": "NI", "Name": "Nicaragua" },
                    { "Code": "NE", "Name": "Niger" },
                    { "Code": "NG", "Name": "Nigeria" },
                    { "Code": "NU", "Name": "Niue" },
                    { "Code": "NF", "Name": "Norfolk Island" },
                    { "Code": "MP", "Name": "Northern Mariana Islands" },
                    { "Code": "KP", "Name": "North Korea" },
                    { "Code": "NO", "Name": "Norway" },
                    { "Code": "OM", "Name": "Oman" },
                    { "Code": "PK", "Name": "Pakistan" },
                    { "Code": "PW", "Name": "Palau" },
                    { "Code": "PS", "Name": "Palestinian Territories" },
                    { "Code": "PA", "Name": "Panama" },
                    { "Code": "PG", "Name": "Papua New Guinea" },
                    { "Code": "PY", "Name": "Paraguay" },
                    { "Code": "PE", "Name": "Peru" },
                    { "Code": "PH", "Name": "Philippines" },
                    { "Code": "PN", "Name": "Pitcairn Islands" },
                    { "Code": "PL", "Name": "Poland" },
                    { "Code": "PT", "Name": "Portugal" },
                    { "Code": "PR", "Name": "Puerto Rico" },
                    { "Code": "RE", "Name": "Réunion" },
                    { "Code": "RO", "Name": "Romania" },
                    { "Code": "RU", "Name": "Russia" },
                    { "Code": "RW", "Name": "Rwanda" },
                    { "Code": "BL", "Name": "Saint Barthélemy" },
                    { "Code": "SH", "Name": "Saint Helena" },
                    { "Code": "KN", "Name": "Saint Kitts and Nevis" },
                    { "Code": "LC", "Name": "Saint Lucia" },
                    { "Code": "MF", "Name": "Saint Martin" },
                    { "Code": "PM", "Name": "Saint Pierre and Miquelon" },
                    { "Code": "VC", "Name": "Saint Vincent and the Grenadines" },
                    { "Code": "WS", "Name": "Samoa" },
                    { "Code": "SM", "Name": "San Marino" },
                    { "Code": "ST", "Name": "São Tomé and Príncipe" },
                    { "Code": "SA", "Name": "Saudi Arabia" },
                    { "Code": "SN", "Name": "Senegal" },
                    { "Code": "RS", "Name": "Serbia" },
                    { "Code": "SC", "Name": "Seychelles" },
                    { "Code": "SL", "Name": "Sierra Leone" },
                    { "Code": "SG", "Name": "Singapore" },
                    { "Code": "SK", "Name": "Slovakia" },
                    { "Code": "SI", "Name": "Slovenia" },
                    { "Code": "SB", "Name": "Solomon Islands" },
                    { "Code": "SO", "Name": "Somalia" },
                    { "Code": "ZA", "Name": "South Africa" },
                    { "Code": "GS", "Name": "South Georgia and the South Sandwich Islands" },
                    { "Code": "KR", "Name": "South Korea" },
                    { "Code": "ES", "Name": "Spain" },
                    { "Code": "LK", "Name": "Sri Lanka" },
                    { "Code": "SD", "Name": "Sudan" },
                    { "Code": "SR", "Name": "Suriname" },
                    { "Code": "SJ", "Name": "Svalbard and Jan Mayen" },
                    { "Code": "SZ", "Name": "Swaziland" },
                    { "Code": "SE", "Name": "Sweden" },
                    { "Code": "CH", "Name": "Switzerland" },
                    { "Code": "SY", "Name": "Syria" },
                    { "Code": "TW", "Name": "Taiwan" },
                    { "Code": "TJ", "Name": "Tajikistan" },
                    { "Code": "TZ", "Name": "Tanzania" },
                    { "Code": "TH", "Name": "Thailand" },
                    { "Code": "TL", "Name": "Timor-Leste" },
                    { "Code": "TG", "Name": "Togo" },
                    { "Code": "TK", "Name": "Tokelau" },
                    { "Code": "TO", "Name": "Tonga" },
                    { "Code": "TT", "Name": "Trinidad and Tobago" },
                    { "Code": "TN", "Name": "Tunisia" },
                    { "Code": "TR", "Name": "Turkey" },
                    { "Code": "TM", "Name": "Turkmenistan" },
                    { "Code": "TC", "Name": "Turks and Caicos Islands" },
                    { "Code": "TV", "Name": "Tuvalu" },
                    { "Code": "UG", "Name": "Uganda" },
                    { "Code": "UA", "Name": "Ukraine" },
                    { "Code": "AE", "Name": "United Arab Emirates" },
                    { "Code": "GB", "Name": "United Kingdom" },
                    { "Code": "UY", "Name": "Uruguay" },
                    { "Code": "UM", "Name": "U.S. Minor Outlying Islands" },
                    { "Code": "VI", "Name": "U.S. Virgin Islands" },
                    { "Code": "UZ", "Name": "Uzbekistan" },
                    { "Code": "VU", "Name": "Vanuatu" },
                    { "Code": "VA", "Name": "Vatican City" },
                    { "Code": "VE", "Name": "Venezuela" },
                    { "Code": "VN", "Name": "Vietnam" },
                    { "Code": "WF", "Name": "Wallis and Futuna" },
                    { "Code": "EH", "Name": "Western Sahara" },
                    { "Code": "YE", "Name": "Yemen" },
                    { "Code": "ZM", "Name": "Zambia" },
                    { "Code": "ZW", "Name": "Zimbabwe" }
                ];
                $scope["creditTypes"] = [
                    {
                        "Code": "VI",
                        "Name": "Visa"
                    },
                    {
                        "Code": "MC",
                        "Name": "Master Card"
                    },
                    {
                        "Code": "DS",
                        "Name": "Discover"
                    },
                    {
                        "Code": "AX",
                        "Name": "American Express"
                     }
                ];

                $scope["useAsBilling"] = false;
                $scope["states"] = $designStateService;
                $scope["cart"] = $cartService;
                $scope["shippingMethods"] = [];
                $scope["checkout"] = {};
                $scope["shipping_address"] = getDefaultAddress();
                $scope["billing_address"] = getDefaultAddress();
                $scope["totals"] = 0;


                info();
            };

            enabledGuestCheckout = function () {
                $scope.subAdditionalInfo = false;
                return angular.appConfigValue("general.checkout.guest_checkout");
            };

            /**
             * Gets visitor addresses
             */
            getAddresses = function () {
                if (!$scope["isGuestCheckout"]) {
                    $checkoutApiService.getAddresses().$promise.then(
                        function (response) {
                            var result = response.result || [];
                            $scope.addresses = result;
                        }
                    );
                }
            };

            /**
             * Checks visitor on the logged
             * Adds breadcrumbs
             * Gets checkout information
             */
            $scope.init = function () {
                var stopWaiting, stop;
                stopWaiting = function () {
                    if (typeof $checkoutService.getType() !== "undefined") {
                        $interval.cancel(stop);
                        stop = undefined;
                    }
                };
                stop = $interval(function () {
                    if (typeof $checkoutService.getType() !== "undefined") {
                        stopWaiting();
                        if ("accordion" === $checkoutService.getType()) {
                            $location.path($checkoutService.getUrl().replace("#/", ""));
                        }

                        $cartService.init().then(function () {
                            if ($cartService.getCountItems() === 0) {
                                $location.path("/");
                            } else {
                                if (!enabledGuestCheckout()) {
                                    $scope.isGuestCheckout = false;
                                    $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                        if (!isLoggedIn) {
                                            $location.path("/");
                                        } else {
                                            getAddresses();
                                            $checkoutService.init().then(function () {
                                                init();
                                                $scope.shippingMethods = $checkoutService.getAllowedShippingMethods();
                                                initWatchers();
                                            });
                                        }
                                    });
                                } else {
                                    $visitorLoginService.isLoggedIn().then(function (isLoggedIn) {
                                        if (!isLoggedIn) {
                                            $scope.isGuestCheckout = true;
                                        } else {
                                            $scope.isGuestCheckout = false;
                                        }
                                        getAddresses();
                                        $checkoutService.init().then(function () {
                                            init();
                                            $scope.shippingMethods = $checkoutService.getAllowedShippingMethods();
                                            initWatchers();
                                        });
                                    });
                                }
                            }
                        });
                    }
                }, 100);


                $scope.$emit("add-breadcrumbs", {"label": "My Account", "url": "/account"});
                $scope.$emit("add-breadcrumbs", {"label": "Checkout", "url": "/checkout"});
            };

            getPaymentInfo = function () {
                var i, info;
                info = {
                    "method": null,
                    "form": null
                };
                if (typeof $scope.paymentMethods !== "undefined") {
                    for (i = 0; i < $scope.paymentMethods.length; i += 1) {
                        if ($scope.paymentMethods[i].Code === $scope.checkout["payment_method_code"]) {
                            info.method = $scope.paymentMethods[i];
                            info.form = info.method.form;
                        }
                    }
                }

                return info;
            };

            /**
             * Saves checkout
             */
            $scope.save = function () {
                var payment, sendPostForm, isValid;
                $scope.message = "";
                isValid = function () {
                    var result, message, getErrorMsg;
                    message = "";
                    result = {
                        status: true,
                        message: ""
                    };
                    $scope.subBillingAddress = true;
                    $scope.subShippingAddress = true;
                    $scope.subPaymentForm = true;
                    $scope.subAdditionalInfo = true;

                    getErrorMsg = function (step) {
                        /*jshint maxcomplexity:6 */
                        var msg = "Please fill all required fields";

                        switch (step) {
                            case "billingAddress":
                                msg = "Please fill all required fields in billing section <br />";
                                break;
                            case "shippingAddress":
                                msg = "Please fill all required fields in shipping section <br />";
                                break;
                            case "shippingMethod":
                                msg = "Please choose shipping method <br />";
                                break;
                            case "paymentMethod":
                                msg = "Please choose payment method <br />";
                                break;
                            case "additionalInfo":
                                msg = "Please fill all required fields in additional section <br />";
                                break;
                        }
                        return msg;
                    };

                    for (var step in isValidSteps) {
                        if (isValidSteps.hasOwnProperty(step) && !isValidSteps[step]) {
                            message += getErrorMsg(step);
                            result = {
                                status: false,
                                message: message
                            };
                        }
                    }

                    return result;
                };

                payment = getPaymentInfo();
                if (payment.form !== null && typeof payment.form !== "undefined") {
                    payment.form.submited = true;

                    // save cc info to checkout
                    isCreditCard = $scope.paymentType.split("_").indexOf("cc") >= 0;
                    if (isCreditCard) {
                        if (payment.method.form.$valid && $scope.validateCcNumber()) {
                            $checkoutService.saveAdditionalInfo({"cc": payment["method"]["cc"]});
                        }
                    }
                }

                sendPostForm = function (method, response) {
                    var form;

                    form = "<div class='hidden' id='auth_net_form'>" + response.result;
                    form = form.replace("$CC_NUM", method.cc.number);
                    form = form.replace("$CC_MONTH", method.cc["expire_month"].toString().length < 2 ? "0" + method.cc["expire_month"] : method.cc["expire_month"]);
                    form = form.replace("$CC_YEAR", method.cc["expire_year"]) + "</div>";

                    $("body").append(form);
                    $("#auth_net_form").find("form").submit();
                    $("#auth_net_form").remove();
                };
                info().then(function () {
                    var checkoutValid = isValid();
                    if (checkoutValid.status) {
                        $(this).parents('.confirm').css('display', 'none');
                        $('#processing').modal('show');
                        $checkoutApiService.save().$promise.then(
                            function (response) {

                                if (response.error === null && null !== payment.method && payment.method.Type === "remote" && response.result === "redirect") {
                                    window.location.replace(response.redirect);
                                } else if (response.error === null && null !== payment.method && payment.method.Type === "post_cc") {
                                    // Handler for direct post form for Authorize.net
                                    sendPostForm(payment.method, response);
                                } else if (response.error === null) {
//                                            info();
                                    $cartService.reload().then(
                                        function () {
                                            $scope.subBillingAddress = false;
                                            $scope.subShippingAddress = false;
                                            $scope.subPaymentForm = false;
                                            $scope.subAdditionalInfo = false;
                                            $scope.purchase = response.result || {};
                                            $('#processing').modal('hide');
                                            $("#purchase-success").modal("show");
                                            $location.path("/checkout/success/"+ response.result._id);
                                        }
                                    );
                                } else {
                                    $(this).parents('.confirm').css('display', 'block');
                                    $('#processing').modal('hide');
                                    // Errors from server
                                    $scope.message = $commonUtilService.getMessage(response);
                                }
                            }
                        );
                    } else {
                        $(this).parents('.confirm').css('display', 'block');
                        $('#processing').modal('hide');
                        $scope.message = $commonUtilService.getMessage(null, "danger", checkoutValid.message);
                    }
                });

            };

            /**
             * Gets full path to image
             *
             * @param {object} product
             * @returns {string}
             */
            $scope.getImage = function (product, size) {
                return $designImageService.getFullImagePath("", product.image, size);
            };

            $scope.newBilling = function () {
                // Sets submitted billing form in false
                $scope.subBillingAddress = false;
                // Sets a flag of form is not valid
                isValidSteps.billingAddress = false;
                // Initialise address by default
                $scope.checkout["billing_address"] = getDefaultAddress();
                $scope.useAsBilling = false;

                for (var field in $scope.checkout["billing_address"]) {
                    if ($scope.billingAddress.hasOwnProperty(field)) {
                        $scope.billingAddress[field].$pristine = true;
                        $scope.billingAddress[field].$invalid = false;
                    }
                }
            };

            $scope.newShipping = function () {
                // Sets submitted shipping form in false
                $scope.subShippingAddress = false;
                // Sets a flag of form is not valid
                isValidSteps.shippingAddress = false;
                // Initialise address by default
                $scope.checkout["shipping_address"] = getDefaultAddress();

                for (var field in $scope.checkout["shipping_address"]) {
                    if ($scope.shippingAddress.hasOwnProperty(field)) {
                        $scope.shippingAddress[field].$pristine = true;
                        $scope.shippingAddress[field].$invalid = false;
                    }
                }
            };

            $scope.choiceBilling = function (billingId) {
                if ($scope.isGuestCheckout && $scope.shippingAddress.$valid) {
                    $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(
                        function (response) {
                            if (response.error === null) {
                                isValidSteps.billingAddress = true;
                            }
                            // update checkout
                            info();
                        }
                    );
                } else if (($scope.checkout["billing_address"] !== null && $scope.checkout["billing_address"]._id !== billingId) || typeof billingId === "string" && billingId !== "") {
                    // Sets existing address as billing
                    $checkoutService.saveBillingAddress({"id": billingId}).then(
                        function (response) {
                            if (response.error === null) {
                                isValidSteps.billingAddress = true;
                            }
                            // update checkout
                            info();
                        }
                    );
                } else {
                    if ($scope.shippingAddress.$valid) {
                        $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(
                            function (response) {
                                if (response.error === null) {
                                    isValidSteps.billingAddress = true;
                                }
                                // update checkout
                                info();
                            }
                        );
                    }
                }
            };

            $scope.choiceShipping = function (shippingId) {
                if ($scope.isGuestCheckout) {
                    $checkoutService.saveShippingAddress($scope.checkout["shipping_address"]).then(
                        function (response) {
                            // update checkout
                            info().then(function () {
                                // if all ok, must update allowed shipping methods list
                                // and must set billing address if set appropriate checkbox
                                if (response.error === null) {
                                    $checkoutService.loadShippingMethods().then(function (methods) {
                                        $scope.shippingMethods = methods;
                                    });
                                    // sets billing address
                                    if ($scope.useAsBilling) {
                                        $scope.choiceBilling(response.result);
                                    }
                                }
                            });
                        }
                    );
                } else if (($scope.checkout["shipping_address"] !== null && $scope.checkout["shipping_address"]._id !== shippingId) || Boolean(shippingId)) {

                    // Sets existing address as shipping
                    $checkoutService.saveShippingAddress({"id": shippingId}).then(
                        function (response) {
                            // update checkout
                            info().then(function () {
                                // if all ok, must update allowed shipping methods list
                                // and must set billing address if set appropriate checkbox
                                if (response.error === null) {
                                    isValidSteps.shippingAddress = true;
                                    $checkoutService.loadShippingMethods().then(function (methods) {
                                        $scope.shippingMethods = methods;
                                    });
                                    // sets billing address
                                    if ($scope.useAsBilling) {
                                        $scope.choiceBilling(response.result._id);
                                    }
                                } else {
                                    isValidSteps.billingAddress = false;
                                }
                            });
                        }
                    );
                }
            };

            $scope.choiceShippingMethod = function (index) {

                if (typeof index !== "undefined" && index !== "") {
                    $checkoutService.saveShippingMethod({
                        "method": $scope.shippingMethods[index].Method,
                        "rate": $scope.shippingMethods[index].Rate
                    }).then(
                        function (response) {
                            if (response.result === "ok") {
                                // update checkout
                                info();
                            }
                        }
                    );
                }
            };

            $scope.setPaymentType = function (type) {
                var isCreditCard;
                isCreditCard = type.split("_").indexOf("cc") >= 0;
                if (!isCreditCard) {
                    isValidSteps.paymentMethod = true;
                } else {
                    isValidSteps.paymentMethod = false;
                }
                $scope.paymentType = type;
            };

            $scope.isCreditCard = function () {
                if (typeof $scope.paymentType !== "undefined") {
                    return $scope.paymentType.split("_").indexOf("cc") >= 0;
                }
                return false;
            };

            $scope.showFormCc = function (method) {
                if (typeof method !== "undefined") {
                    return method.Type.split("_").indexOf("cc") >= 0;
                }
                return false;
            };

            $scope.discountApply = function () {
                $checkoutService.discountApply({"coupon": $scope.discount.toUpperCase()}).$promise.then(
                    function (response) {
                        if (response.error === null) {
                            info();
                        }
                    }
                );
            };

            $scope.discountNeglect = function (code) {
                $checkoutService.discountNeglect({"coupon": code}).$promise.then(
                    function (response) {
                        if (response.error === null) {
                            info();
                        }
                    }
                );
            };

            $scope.validateCcNumber = function () {
                var i, payment, result;
                result = false;

                payment = getPaymentInfo();

                var validateCreditCard = function (s) {
                    /*jshint maxcomplexity:6 */
                    // remove non-numerics
                    var a, c, m, k, j, x, w, v;
                    v = "0123456789";
                    w = "";
                    for (i = 0; i < s.length; i += 1) {
                        x = s.charAt(i);
                        if (v.indexOf(x, 0) !== -1) {
                            w += x;
                        }
                    }
                    // validate number
                    j = w.length / 2;
                    k = Math.floor(j);
                    m = Math.ceil(j) - k;
                    c = 0;
                    for (i = 0; i < k; i += 1) {
                        a = w.charAt(i * 2 + m) * 2;
                        c += a > 9 ? Math.floor(a / 10 + a % 10) : a;
                    }
                    for (i = 0; i < k + m; i += 1) {
                        c += w.charAt(i * 2 + 1 - m) * 1;
                    }
                    return (c % 10 === 0);
                };

                if (payment.method === null && payment.form === null) {
                    return false;
                }

                if (creditCartTypes[payment.method.cc.type][0].test(payment.method.cc.number) === true) {
                    result = validateCreditCard(payment.method.cc.number);
                }

                if (typeof payment.form !== "undefined") {
                    payment.form.number.$invalidFormat = result;
                }

                return result;
            };

            $scope.saveByBlur = function (step) {
                /*jshint maxcomplexity:6 */
                var actionBillingAddress, actionShippingAddress,
                    actionCustomerAdditionalInfo;

                actionBillingAddress = function () {
                    if ($scope.billingAddress.$valid) {
                        $scope.subBillingAddress = true;
                        $checkoutService.saveBillingAddress($scope.checkout["billing_address"]).then(
                            function () {
                                getAddresses();
                                isValidSteps.billingAddress = true;
                                // update checkout
                                info();
                            }
                        );
                    } else {
                        isValidSteps.billingAddress = false;
                    }
                };

                actionShippingAddress = function () {
                    if ($scope.shippingAddress.$valid) {
                        $scope.subShippingAddress = true;
                        if ((!Boolean($scope.checkout["shipping_address"]._id) && !$scope["isGuestCheckout"]) || $scope["isGuestCheckout"]) {
                            $checkoutService.saveShippingAddress($scope.checkout["shipping_address"]).then(
                                function () {
                                    getAddresses();
                                    isValidSteps.shippingAddress = true;
                                    $checkoutService.loadShippingMethods().then(function (methods) {
                                        $scope.shippingMethods = methods;
                                    });
                                    if ($scope.useAsBilling) {
                                        $checkoutService.saveBillingAddress($scope.checkout["shipping_address"]).then(function () {
                                            isValidSteps.billingAddress = true;
                                            // update checkout
                                            info();
                                        });
                                    } else {
                                        // update checkout
                                        info();
                                    }
                                }
                            );
                        } else {
                            isValidSteps.shippingAddress = false;
                        }
                    }
                };

                actionCustomerAdditionalInfo = function () {
                    if ($scope.customerInfo.$valid) {
                        $scope.subAdditionalInfo = true;
                        if ($scope["isGuestCheckout"]) {
                            $checkoutService.saveAdditionalInfo({
                                "customer_email": $scope.checkout.info["customer_email"],
                                "customer_name": $scope.checkout.info["customer_name"]
                            }).then(function () {
                                // do something after save additional info
                                isValidSteps.additionalInfo = true;
                            });
                        } else {
                            // do something if not valid additional info
                            isValidSteps.additionalInfo = false;
                        }
                    }
                };

                switch (step) {
                    case "billingAddress":
                        actionBillingAddress();
                        break;
                    case "shippingAddress":
                        actionShippingAddress();
                        break;
                    case "customerInfo":
                        actionCustomerAdditionalInfo();
                        break;
                }
            };

            $scope.closeSuccessPopup = function () {
                $(".modal").modal("hide");
                $(".modal-open").removeClass('modal-open');
                $location.path("/");
            };

        }
    ]
);
