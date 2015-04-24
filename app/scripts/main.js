"use sctict";

window.name = "NG_DEFER_BOOTSTRAP!";

// add node libs
var $ = window.$ = window.jQuery = require('jquery');
require('bootstrap');
var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-resource');
require('angular-cookies');

// config
iniConfig = require('./config');
angular.appConfig = {};
angular.appConfigValue = function (valueName) {
    if (typeof angular.appConfig[valueName] !== "undefined") {
        return angular.appConfig[valueName];
    } else {
        if (typeof iniConfig[valueName] !== "undefined") {
            return iniConfig[valueName];
        }
    }
    return "";
};

// add modules
require('./design/module')();
require('./common/module')();
require('./cart/module')();
require('./pdp/module')();
require('./category/module')();
require('./visitor/module')();
require('./checkout/module')();
require('./cms/module')();

// add themes
require('../theme/scripts/main')();


// animate
// TODO: WE REALLY NEED TO GET RID OF THIS 
$('#loader .progress-bar').animate({width: '60%'}, 800, function () {
    setTimeout(function () {
        $('#loader .progress-bar').animate({width: '100%'}, 200, function () {
            $('#loader').animate({opacity: 0}, 400, function () {
                $(this).css('display', 'none');
                setTimeout(function () {
                    $('#content').removeClass('ng-hide');
                }, 100);
            });
        });
    }, 500);
});

// ready
angular.element(document).ready(function () {

    angular.referrer = document.referrer;

    // TODO: Do we still need to hijack the bootstrapping process?
    var modules = Object.keys(angular.module);
    angular.resumeBootstrap(modules);

    /**
     * increase count of visits
     */
    $.ajax({
        async: true,
        url: angular.REST_SERVER_URI + "/rts/visit",
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        headers: {
            "X-Referer": angular.referrer
        }
    });
});
