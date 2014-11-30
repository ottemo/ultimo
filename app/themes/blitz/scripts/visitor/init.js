(function (define) {
    "use strict";

    define([
            "angular",
            "visitor/service/facebook",
            "visitor/service/google"
        ],
        function (angular, fb, gl) {
            
			return angular.module.visitorModule;
        }
	);
})(window.define);