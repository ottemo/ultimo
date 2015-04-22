module.exports = function (cmsModule) {
    cmsModule
        /*
         *  $productApiService interaction service
         */
        .service('$cmsApiService', [
            '$resource',
            'REST_SERVER_URI',
            function ($resource, REST_SERVER_URI) {

                return $resource(REST_SERVER_URI, {}, {
                    'getPage': {
                        method: 'GET',
                        url: REST_SERVER_URI + '/cms/page/:pageID'
                    },
                    'getBlock': {
                        method: 'GET',
                        url: REST_SERVER_URI + '/cms/block/:blockID'
                    }
                });
            }
        ]
    );

};


