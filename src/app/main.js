
angular.appConfigValue = function (valueName) {
    return appConfig[valueName];
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
