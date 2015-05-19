angular.module("designModule")
    /*
     *  $designImageService implementation
     */
    .service("$designImageService", [
        "$designService",
        "MEDIA_BASE_PATH",
        "PRODUCT_DEFAULT_IMG",
        function ($designService, MEDIA_BASE_PATH, PRODUCT_DEFAULT_IMG) {
            var getFullImagePath, applySize;

            applySize = function (path, filename, size) {
                var src;
                var imageName = new RegExp("(.+)(\\.)(.gif|png|jpg|jpeg|ico)$", "i");
                var match = filename.match(imageName);
                if (match instanceof Array && typeof size !== "undefined") {
                    src = MEDIA_BASE_PATH + path + match[1] + "_" + size + "." + match[3];
                } else {
                    src = MEDIA_BASE_PATH + path + filename;
                }

                return src;
            };

            getFullImagePath = function (path, filename, size) {
                var src, imgRegExp;
                imgRegExp = new RegExp(".gif|png|jpg|jpeg|ico$", "i");

                if (typeof path === "undefined" || typeof filename === "undefined" || filename === "" || !imgRegExp.test(filename)) {
                    src = $designService.getImage(PRODUCT_DEFAULT_IMG);
                } else {
                    src = applySize(path, filename, size);
                }


                return src;
            };

            return {
                getFullImagePath: getFullImagePath
            };
        }
    ]
);