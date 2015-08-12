angular.module("designModule")
    /*
     *  Directive to solve browser auto-fill issue on model
     */
    .directive("autoFillSync", ["$timeout", function ($timeout) {
        return {
            require: "ngModel",
            link: function (scope, elem, attrs, ngModel) {
                var origVal = elem.val();
                $timeout(function () {
                    var newVal = elem.val();
                    if (ngModel.$pristine && origVal !== newVal) {
                        ngModel.$setViewValue(newVal);
                    }
                }, 500);
            }
        };
    }])

    /*
     *  jQuery layout directive
     */
    .directive("jqLayout", function () {
        return {
            restrict: "A",
            link: function (scope, elem) {
                jQuery(elem).layout({applyDefaultStyles: true});
            }
        };
    })

    .directive('errSrc', ["$rootScope", function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    if (attrs.src !== attrs.errSrc) {
                        attrs.$set('src', $rootScope.getImg(attrs.errSrc));
                    }
                });
            }
        };
    }])

    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })

// Blocked, due to Mailchimp pages
// 
//    .directive('homeInit', ['$timeout', function($timeout) {
//        return {
//           restrict: 'A',
//            link: function(scope) {

                // Only show the modal if
                // * the user is not on a phone
                // * they have not seen the modal before (on this device)
                // * they are not logged in

                // We can check these variables immediately
//              var showedModal = localStorage.getItem('showedModal');
//                var isMobile = window.innerWidth < 768;

//                if (!showedModal && !isMobile) {

                    // Wait for requests to finish to let us know if the user
                    // is logged in
//                    $timeout(function() {

//                        var isLoggedIn = scope.visitorProps.isLoggedIn;

//                        if (!isLoggedIn) {
//                            $('#mailchimp').modal('show');
//                            localStorage.setItem('showedModal', 'true'); // string
//                        }

//                    }, 3000);
//                }
//            }
//        }
//    }]);