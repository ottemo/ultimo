(function (define) {
    'use strict';

    /*
     *  requireJS module entry point
     *  (to use that module you should include it to main.js)
     */
    define([
            'common/controllers',

            'common/services/header',
            'common/services/sidebar'
        ],
        function (commonModule) {

            return commonModule;
        });

})(window.define);