"use strict";

window.name = "NG_DEFER_BOOTSTRAP!"; // http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap

require.config({
    "baseUrl": "scripts",
    "paths": {
        "config": "config",
        "themeFiles": "design/themeFiles",
        "angular": "../lib/angular/angular.min",

        "angular-scenario": "../lib/angular/angular-scenario.min",
        "angular-sanitize": "../lib/angular/angular-sanitize.min",
        "angular-route": "../lib/angular/angular-route.min",
        "angular-resource": "../lib/angular/angular-resource.min",
        "angular-cookies": "../lib/angular/angular-cookies.min",
        "angular-mocks": "../lib/angular/angular-mocks",

        "angular-animate": "../lib/angular/angular-animate.min",
        "angular-bootstrap": "../lib/angular/ui-bootstrap-tpls.min"
    },
    "shim": {
        "config": {exports: "config"},
        "angular": {deps: ["config"], exports: "angular"},

        "angular-route": ["angular"],
        "angular-cookies": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-resource": ["angular"],
        "angular-animate": ["angular"],

        "angular-mocks": { deps: ["angular"], exports: "angular.mock"},
        "angular-bootstrap": { deps: ["angular"], exports: "uiBootstrap"}
    },
    "priority": ["config", "angular"]
});

require(['angular'], function (angular) {
    if (typeof require.iniConfig === "undefined") {
        require.iniConfig = {};
    }

    angular.appConfig = {};
    angular.appConfigValue = function (valueName) {
        if (typeof angular.appConfig[valueName] !== "undefined") {
            return angular.appConfig[valueName];
        } else {
            if (typeof require.iniConfig[valueName] !== "undefined") {
                return require.iniConfig[valueName];
            }
        }
        return "";
    };
});

require([
        "angular",
        "angular-bootstrap",
        "design/themeFiles",
        "design/module",
        "common/module",

        "visitor/module",
        "category/module",
        "pdp/module",
        "cart/module",
        "checkout/module",
        "cms/module"
    ],
    function (angular, ngBootstrap, files) {

        angular.element(document).ready(function () {
            angular.referrer = document.referrer;

            angular.isExistFile = function (path) {

                if (files[angular.appConfigValue("themes.list.active")].indexOf(path) !== -1) {
                    return true;
                }

                return false;
            };

            var runApp = function () {
                if (angular.isExistFile("/scripts/init.js")) {
                    require(["../themes/" + angular.appConfigValue("themes.list.active") + "/scripts/init"], function () {
                        var modules = Object.keys(angular.module);
                        angular.resumeBootstrap(modules);
                    });
                } else {
                    var modules = Object.keys(angular.module);
                    angular.resumeBootstrap(modules);
                }
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
            jQuery.ajax({
                url: angular.appConfigValue("general.app.foundation_url") + "/config/get/themes.list.active",
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
            jQuery.ajax({
                url: angular.REST_SERVER_URI + "/rts/visit",
                type: "GET",
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "X-Referer": angular.referrer
                }
            });
        });
    }
);

