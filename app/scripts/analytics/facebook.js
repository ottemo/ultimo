angular.module('facebookAnalytics', [
	'angulartics'
])

.config(['$analyticsProvider', function($analyticsProvider) {

	// Already supports buffered invocation

	// Track every pageview
	$analyticsProvider.registerPageTrack(function(){
		if ( window.fbq ) {
			fbq('track', 'PageView');
		}
	});
}])