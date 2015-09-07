// Bing Universal Event Tracking
angular.module('analyticsBingModule', ['angulartics'])

.config(['$analyticsProvider', function($analyticsProvider) {
    $analyticsProvider.registerPageTrack(function() {
        window.uetq = window.uetq || [];
        window.uetq.push({
            'ec': 'page visit',
            'ea': window.location.href
        });
    });
    console.log(window.location.href);
}]);