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
