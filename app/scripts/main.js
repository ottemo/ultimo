"use strict";

window.name = "NG_DEFER_BOOTSTRAP!";

require.config({
    "baseUrl": "scripts",
    "paths": {
        "config": "config",
        "jQuery": "../lib/jquery.min",
        "bootstrap": "../lib/bootstrap.min",
        "angular": "../lib/angular/angular.min",

        "angular-scenario": "../lib/angular/angular-scenario.min",
        "angular-sanitize": "../lib/angular/angular-sanitize.min",
        "angular-route": "../lib/angular/angular-route.min",
        "angular-resource": "../lib/angular/angular-resource.min",
        "angular-cookies": "../lib/angular/angular-cookies.min",
        "angular-mocks": "../lib/angular/angular-mocks"
    },
    "shim": {
        "jQuery": {exports: "jQuery"},
        "config": {deps: ["jQuery"], exports: "config"},
        "bootstrap": { deps: ["jQuery"], exports: "jQuery"},
        "angular": {deps: ["config", "bootstrap"], exports: "angular"},

        "angular-route": ["angular"],
        "angular-cookies": ["angular"],
        "angular-sanitize": ["angular"],
        "angular-resource": ["angular"],
        "angular-mocks": { deps: ["angular"], exports: "angular.mock"}
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
        "jQuery",
        "angular",

        "design/module",
        "common/module",

        "visitor/module",
        "category/module",
        "pdp/module",
        "cart/module",
        "checkout/module",
        "cms/module"
    ],
    function ($, angular) {
        /**
         * Page loader
         */
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

            //TODO: not sure why we do it this way
            var runApp = function () {
                
                require(["../theme/scripts/init"], function () {
                    var modules = Object.keys(angular.module);
                    angular.resumeBootstrap(modules);
                });
                
            };

            runApp();


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
    }
);

