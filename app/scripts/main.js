"use sctict";

window.name = "NG_DEFER_BOOTSTRAP!";

require('./test_include.js');
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


//angular.element(document).ready(function() {
//        var modules = Object.keys(angular.module);
//        angular.resumeBootstrap(modules);
//        console.log(333);
//});


angular.element(document).ready(function () {
    angular.referrer = document.referrer;

    //console.log(angular.resumeBootstrap());
    //angular.resumeBootstrap();

    angular.isExistFile = function (path) {

        //var themeFiles = files[angular.appConfigValue("themes.list.active")];
        //if (themeFiles !== undefined && themeFiles.indexOf(path) !== -1) {
        //    return true;
        //}

        return false;
    };


    var runApp = function () {
        //if (angular.isExistFile("/scripts/init.js")) {
        //    require(["../themes/" + angular.appConfigValue("themes.list.active") + "/scripts/init"], function () {
        //        var modules = Object.keys(angular.module);
        //        angular.resumeBootstrap(modules);
        //    });
        //} else {

            var modules = Object.keys(angular.module);
            angular.resumeBootstrap(modules);
        //}
    };


    var errorResponse = function () {
        angular.activeTheme = "default";
        angular.appConfig["themes.list.active"] = "default";
        runApp();
    };

    var successResponse = function (data) {
        angular.activeTheme = data.result === null ? "default" : data.result;
        angular.appConfig["themes.list.active"] = angular.activeTheme;
        runApp();
    };





    /**
     * Use jQuery ajax for sending existing cookie value
     * angular.element.get can not send cookie
     */
    $.ajax({
        url: angular.appConfigValue("general.app.foundation_url") + "/config/value/themes.list.active",
        type: "GET",
        timeout: 10000,
        xhrFields: {
            withCredentials: true
        },
        error: errorResponse,
        success: successResponse
    });
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










