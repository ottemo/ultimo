angular.module("contactModule")

.service('emailService', [
    '$http',
    'REST_SERVER_URI',
    function($http, REST_SERVER_URI) {
        var url = REST_SERVER_URI + '/app/email';

        this.post = function(data) {
            return $http.post(url, data)
                .then(function(response){
                    return response.data;
                });
        }
    }
]);