"use sctict";

window.name = "NG_DEFER_BOOTSTRAP!";


var $ = window.$ = window.jQuery = require('jquery');
require('bootstrap');
var angular = require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-resource');
require('angular-cookies');


//init

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


require('./design/init')(angular);
require('./common/init')(angular);
require('./cart/init')(angular);
require('./pdp/init')(angular);
require('./category/init')(angular);
require('./visitor/init')(angular);
require('./checkout/init')(angular);
require('./cms/init')(angular);

require('../themes/default/scripts/main')(angular, $);
require('../themes/blitz/scripts/main')(angular, $);

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





angular.element(document).ready(function () {
    angular.referrer = document.referrer;



    var files = require('./design/themeFiles');
    angular.isExistFile = function (path) {
        var themeFiles = files[angular.appConfigValue("themes.list.active")];
        return (themeFiles !== undefined && themeFiles.indexOf(path) !== -1) ? true : false;
    };

    var modules = Object.keys(angular.module);
    angular.resumeBootstrap(modules);



    /**
     * increase count of visits
     */
    $.ajax({
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










