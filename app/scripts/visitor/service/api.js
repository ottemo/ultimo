angular.module("visitorModule")
    /*
     *  $productApiService interaction service
     */
    .service("$visitorApiService", ["$resource", "REST_SERVER_URI", function ($resource, REST_SERVER_URI) {

        return $resource(REST_SERVER_URI, {},
            {
                "register": {
                    method: "POST",
                    url: REST_SERVER_URI + "/visitors/register"
                },
                "loginFacebook": {
                    method: "POST",
                    url: REST_SERVER_URI + "/visit/login-facebook"
                },
                "loginGoolge": {
                    method: "POST",
                    url: REST_SERVER_URI + "/visit/login-google"
                },
                "login": {
                    method: "POST",
                    url: REST_SERVER_URI + "/visit/login"
                },
                "logout": {
                    method: "GET",
                    url: REST_SERVER_URI + "/visit/logout"
                },
                "validate": {
                    method: "GET",
                    url: REST_SERVER_URI + "/visitors/validate/:key"
                },
                "forgotPassword": {
                    method: "GET",
                    url: REST_SERVER_URI + "/visitors/forgot-password/:email"
                },
                "resetPassword": {
                    method: "POST",
                    url: REST_SERVER_URI + "/visitors/reset-password"
                },
                "invalidate": {
                    method: "GET",
                    url: REST_SERVER_URI + "/visitors/invalidate/:email"
                },
                "info": {
                    method: "GET",
                    url: REST_SERVER_URI + "/visit"
                },
                "update": {
                    method: "PUT",
                    url: REST_SERVER_URI + "/visit"
                },
                "getAddresses": {
                    method: "GET",
                    url: REST_SERVER_URI + "/visit/addresses"
                },
                "addressUpdate":{
                    method: "PUT",
                    params: { addressID: "@id" },
                    url: REST_SERVER_URI + "/visit/address/:addressID"
                },
                "saveAddress": {
                    method: "POST",
                    url: REST_SERVER_URI + "/visit/address"
                },
                "loadAddress": {
                    method: "GET",
                    url: REST_SERVER_URI + "/visit/address/:addressID"
                },
                "deleteAddress": {
                    method: "DELETE",
                    url: REST_SERVER_URI + "/visit/address/:addressID"
                },
                "getOrderList": {
                    method: "GET",
                    url: REST_SERVER_URI + "/visit/orders"
                },
                "getOrder": {
                    method: "GET",
                    url: REST_SERVER_URI + "/visit/order/:orderID"
                }
            });
    }]);
