"use strict";

// config
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

// ready
angular.element(document).ready(function () {
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
