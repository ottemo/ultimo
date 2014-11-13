"use strict";

window.name = "NG_DEFER_BOOTSTRAP!"; // http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap

require.config({
    "baseUrl": "scripts",
    "paths": {
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
        "angular": {exports: "angular"},

        "angular-route": ["angular"],
        "angular-cookies": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-resource": ["angular"],
        "angular-animate": ["angular"],

        "angular-mocks": { deps: ["angular"], exports: "angular.mock"},
        "angular-bootstrap": { deps: ["angular"], exports: "uiBootstrap"}
    },
    "priority": ["angular"]
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
            var errorResponse, successResponse, runApp;
            angular.referrer = document.referrer;

            runApp = function(){

                angular.isExistFile = function (path) {

                    if (files[angular.activeTheme].indexOf(path) !== -1) {
                        return true;
                    }

                    return false;
                };

                if (angular.isExistFile("/scripts/init.js")) {
                    require(["../themes/" + angular.activeTheme + "/scripts/init"], function () {
                        var modules = Object.keys(angular.module);
                        angular.resumeBootstrap(modules);
                    });
                } else {
                    var modules = Object.keys(angular.module);
                    angular.resumeBootstrap(modules);
                }
            };

            errorResponse = function () {
                angular.activeTheme = "default";
                runApp();
            };

            successResponse = function (data) {
                angular.activeTheme = data.result === null ? "default" : data.result;
                runApp();
            };

            /**
             * Use jQuery ajax for sending existing cookie value
             * angular.element.get can not send cookie
             */
            jQuery.ajax({
                url: angular.REST_SERVER_URI + "/config/get/themes.list.active",
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