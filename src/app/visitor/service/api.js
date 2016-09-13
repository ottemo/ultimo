angular.module("visitorModule")

.service("visitorApiService", ["$resource", "REST_SERVER_URI", "commonUtilService", function($resource, REST_SERVER_URI, commonUtilService) {

    return $resource(REST_SERVER_URI, {}, {
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
        "addressUpdate": {
            method: "PUT",
            params: {
                addressID: "@id"
            },
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
        "getTokens": {
            method: "GET",
            params: {
                extra: 'type,number,expiration_date'
            },
            url: REST_SERVER_URI + "/visit/tokens"
        },
        "saveToken": {
            method: "POST",
            url: REST_SERVER_URI + "/visit/tokens"
        },
        "deleteToken": {
            method: "DELETE",
            url: REST_SERVER_URI + "/visit/tokens/:tokenID"
        },
        "getOrderList": {
            method: "GET",
            url: REST_SERVER_URI + "/visit/orders"
        },
        "getOrder": {
            method: "GET",
            url: REST_SERVER_URI + "/visit/order/:orderID",
            transformResponse: transformOrderItemOptions
        }
    });

    function transformOrderItemOptions(data) {
        var resp = angular.fromJson(data);

        if (resp.result && resp.result.items && resp.result.items.length) {
            angular.forEach(resp.result.items, function(item) {
                if (item.Options) {
                    item.Options = commonUtilService.processProductOptions(item.Options);
                }
            });
        }

        return resp;
    }
}]);
