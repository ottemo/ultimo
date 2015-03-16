(function (define) {
    'use strict';

    /*
     *  HTML top page header manipulation stuff
     */
    define(['cms/init'], function (cmsModule) {
        cmsModule
            /*
             *  $productApiService interaction service
             */
            .service('$cmsApiService', [
                '$resource',
                'REST_SERVER_URI',
                function ($resource, REST_SERVER_URI) {

                    var cmsBaseURL = REST_SERVER_URI + '/cms';

                    return $resource(cmsBaseURL, {}, {
                        'getPage': {
                            method: 'GET',
                            params: { id: '@id' },
                            url: cmsBaseURL + '/page/get/:id'
                        },
                        'getBlock': {
                            method: 'GET',
                            params: { id: '@id' },
                            url: cmsBaseURL + '/block/get/:id'
                        }
                    });
                }
            ]
        );

        return cmsModule;
    });

})(window.define);
