angular.module('referModule')

.service('referService', [
    '$http',
    function($http) {

        /**
         * Send off refer-a-friend form data
         *
         * @param  Object  data  Must contain captcha and friend_email
         * @return Promise
         */
        this.post = function(data) {
            var url = angular.REST_SERVER_URI + '/friend/email';
            return $http.post(url, data)
                .then(function(response) {
                    return response.data;
                });
        }

        /**
         * Get the data uri of the captcha image
         *
         * @return String
         */
        this.getCaptcha = function() {
            var url = angular.REST_SERVER_URI + '/friend/captcha?json=1';
            return $http.get(url)
                .then(function(response) {
                    return response.data.result.captcha;
                });
        }
    }
]);
