(function (define) {
    "use strict";

    define([
            "angular"
        ],
        function (angular) {

            angular.module.visitorModule
                .constant("DEFAULT_TITLE", "RichKids Shop")
                .constant("DEFAULT_DESCRIPTION", "RichKids shop default")
                .constant("DEFAULT_KEYWORDS", "RichKids shop default");

        });
})(window.define);