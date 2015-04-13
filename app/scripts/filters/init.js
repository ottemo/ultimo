(function (define) {
    "use strict";

    /*
     *  Angular "filtersModule" declaration
     *  (module internal files refers to this instance)
     */
    define([
            "angular"
        ],
        function (angular) {
            /*
             *  Angular "filtersModule" declaration
             */
            angular.module.filtersModule = angular.module("filtersModule",[]);

            return angular.module.filtersModule;
        });

})(window.define);
