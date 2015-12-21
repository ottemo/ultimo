/**
 * Password Directive
 */
angular.module("designModule")

.directive("otPassword", function() {
    return {
        restrict: 'EA',
        require: '?ngModel',
        link: function(scope, element, attr, ctrl) {

            var minLength = 6;

            // 72 common passwords
            var commonPasswords = ['123456', 'password', '12345678', 'thunder', 'dragon', '696969',
                'mustang', 'letmein', 'baseball', 'master', 'michael', 'football', 'shadow', 'monkey',
                'abc123', 'fuckme', 'jordan', 'harley', 'ranger', 'iwantu', 'jennifer', 'hunter',
                'batman', 'trustno1', 'thomas', 'tigger', 'robert', 'access', 'buster', '1234567',
                'soccer', 'hockey', 'killer', 'george', 'andrew', 'charlie', 'superman', 'asshole',
                'fuckyou', 'dallas', 'jessica', 'panties', 'pepper', 'austin', 'william', 'cowboy',
                'silver', 'richard', 'fucker', 'orange', 'merlin', 'michelle', 'corvette', 'bigdog',
                'cheese', 'matthew', '121212', 'patrick', 'martin', 'freedom', 'ginger', 'blowjob',
                'nicole', 'sparky', 'yellow', 'camaro', 'secret', 'falcon', 'taylor', '111111',
                '131313', '123123'
            ];

            ctrl.$validators.otPasswordMinLength = function(value) {
                return angular.isUndefined(value) || (value.length >= minLength);
            }

            ctrl.$validators.otPasswordCommon = function(value) {
                return angular.isUndefined(value) || (commonPasswords.indexOf(value) === -1);
            }
        }
    };
});

