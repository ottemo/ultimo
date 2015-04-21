module.exports = function (pdpModule) {
    pdpModule
        /*
         *  $productApiService interaction service
         */
        .service("$cmsPageService", [
            "$commonRewriteService",
            function ($commonRewriteService) {
                var getUrl, type;

                type = "page";

                getUrl = function (id) {
                    var url;
                    url = $commonRewriteService.getRewrite(type, id);

                    if (!url) {
                        url = type + "/" + id;
                    }

                    return "/" + url;
                };

                return {
                    "getUrl": getUrl
                };
            }
        ]
    );

};
