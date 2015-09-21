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

	// Track order confirmation
	$analyticsProvider.registerEventTrack(function(action, properties) {
		if (action == 'order.confirmation' && window._fbq) {
			_fbq.push(['track', '6013027258578', {
				'value': properties.grandTotal,
				'currency': 'USD'
			}]);
		}
	});
}]);
