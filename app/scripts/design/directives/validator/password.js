angular.module("designModule")

    // New Password Directive
    .directive("otPassword2", function () {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, elem, attrs, ngModel) {

                var minLength = 6;
                var commonPasswords = ['123456','password','12345678','thunder','dragon','696969','mustang','letmein',
                    'baseball','master','michael','football','shadow','monkey','abc123','fuckme','jordan','harley',
                    'ranger','iwantu','jennifer','hunter','batman','trustno1','thomas','tigger','robert','access',
                    'buster','1234567','soccer','hockey','killer','george','andrew','charlie','superman','asshole',
                    'fuckyou','dallas','jessica','panties','pepper','austin','william','cowboy','silver','richard',
                    'fucker','orange','merlin','michelle','corvette','bigdog','cheese','matthew','121212','patrick',
                    'martin','freedom','ginger','blowjob','nicole','sparky','yellow','camaro','secret','falcon',
                    'taylor','111111','131313','123123'
                ];

                ngModel.rules = {
                    "length": 'The password should have ' + minLength + ' characters or more.',
                    "common": "The password shouldn't be in a list of 50 most common."
                };
                /*jshint maxcomplexity:6 */
                var validate = function (value) {
                    if (!value) { return value; }
                    ngModel.invalids = [];
                    var valid = true;
                    if (value.length < minLength) {
                        valid = false;
                        ngModel.invalids['length'] = true;
                    }
                    if (commonPasswords.indexOf(value) >= 0) {
                        valid = false;
                        ngModel.invalids['common'] = true;
                    }
                    ngModel.$setValidity('ot-password2', valid);
                    return value;
                };

                //For DOM -> model validation
                ngModel.$parsers.unshift(validate);
                //For model -> DOM validation
                ngModel.$formatters.unshift(validate);
            }
        };
    });
