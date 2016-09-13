angular.module("visitorModule")

.controller('visitorAccountTokensController', [
    '$scope',
    '$location',
    '_',
    'visitorLoginService',
    'visitorApiService',
    'checkoutService',
    'commonUtilService',
    function(
        $scope,
        $location,
        _,
        visitorLoginService,
        visitorApiService,
        checkoutService,
        commonUtilService
    ) {
        // General
        $scope.visitor = visitorLoginService.getVisitor();

        // Tokens List
        $scope.tokens = [];
        $scope.remove = remove;
        $scope.getTokens = getTokens;
        $scope.popUpOpen = popUpOpen;
        $scope.paymentMethods= {
            tokenAble: []
        };
        $scope.getPaymentMethodName = getPaymentMethodName;

        // Edit / Add Form
        $scope.creditCardForm = {
            model: {}
        };
        $scope.message = '';
        $scope.save = save;
        $scope.parseDate = parseDate;

        // Sidebar, refactor
        var activePath = $location.path();
        $scope.isActive = isActive;

        activate();

        //////////////////////////

        function activate() {
            // BREADCRUMBS
            $scope.$emit('add-breadcrumbs', {
                'label': 'myAccount',
                'url': '/account'
            });
            $scope.$emit('add-breadcrumbs', {
                'label': 'Credit Cards',
                'url': '/account/creditcards'
            });

            // Redirect
            visitorLoginService.isLoggedIn()
                .then(function(isLoggedIn) {
                    if (!isLoggedIn) {
                        $location.path("/");
                    }
                });

            $scope.getTokens();

            checkoutService.loadPaymentMethods().then(function(methods){
                $scope.paymentMethods.tokenAble = _.filter(methods, { 'Tokenable': true });
            });
        }

        function getEmptyCC() {
            return {
                number: '',
                cvc: '',
                expire_year: '',
                expire_month: ''
            }
        }

        function getPaymentMethodName(methodCode) {
            var method = _.filter($scope.paymentMethods.tokenAble, {'Code': methodCode});
            return method[0] ? method[0].Name : methodCode;
        }

        function getTokens() {
            visitorApiService.getTokens().$promise
                .then(function(response) {
                    var result = response.result || [];
                    $scope.tokens = result;
                });
        }

        function popUpOpen() {
            $('#credit-card-new-popup').modal("show");
            $scope.creditCardForm.controller.$setPristine();
            $scope.creditCardForm.controller.$setUntouched();
            $scope.creditCardForm.controller.$rollbackViewValue();
            $scope.creditCardForm.model.cc = getEmptyCC();
            $scope.creditCardForm.model.payment_method = $scope.paymentMethods.tokenAble[0].Code;
        }

        function remove(id) {
            visitorApiService.deleteToken({'tokenID': id}).$promise
                .then(function () {
                    $scope.getTokens();
                });
        }

        function save() {
            visitorApiService.saveToken($scope.creditCardForm.model).$promise
                .then(function (response) {
                    if (response.error === null) {
                        $scope.getTokens();
                        $('#credit-card-new-popup').modal("hide");
                    } else {
                        $scope.message = commonUtilService.getMessage(response);
                    }
                });
        }

        function isActive(path) {
            return (activePath === path)
        }

        function parseDate(date) {
            if (typeof date !== 'string' || date.length != 4) {
                return date;
            }

            return date.substring(0, 2) + '/20' + date.substring(2);
        }

    }
]);

