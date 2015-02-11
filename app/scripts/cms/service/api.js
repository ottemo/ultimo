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

        return cmsModule;
    });

})(window.define);
