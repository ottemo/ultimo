angular.module("commonModule")
    /*
     *  $pageSidebarService implementation
     */
    .service("$commonSidebarService", [function () {
        var addItem, getItems, getType, items, isImagePathRegex, removeItem, getUrl;
        items = [];
        isImagePathRegex = new RegExp(".gif|png|jpg|ico$", "i");

        /**
         * Adds item in the left sidebar
         *
         * @param {string} title
         * @param {string} link
         * @param {string} _class
         * @param {number} sort - The list will be displayed in descending order by this field
         */
        addItem = function (title, link, icon, sort) {
            sort = ( sort || 0 );
            items.push({"title": title, "link": link, "icon": icon, "sort": sort});
        };

        /**
         * Gets items for left sidebar
         *
         * @returns {Array}
         */
        getItems = function () {
            return items.sort(function (a, b) {
                return a.sort < b.sort;
            });
        };

        /**
         *
         * @param {string} icon
         * @returns {string}
         */
        getType = function (icon) {
            var type;

            if (isImagePathRegex.test(icon) === true) {
                type = "image";
            }
            if (typeof icon !== "undefined" && icon.indexOf("glyphicon") !== -1) {
                type = "glyphicon";
            }

            return type;
        };

        /**
         *
         * @param link
         * @returns {boolean}
         */
        removeItem = function (link) {
            var i, sidebarItem;

            for (i = 0; i < items.length; i += 1) {
                sidebarItem = items[i];
                if (sidebarItem.link === link) {
                    items.splice(i, 1);
                }
            }

            return false;
        };

        getUrl = function (path) {
            var result, httpRegex;
            httpRegex = new RegExp("^(http|https)://.+$", "i");
            if (httpRegex.test(path) === true) {
                result = path;
            } else {
                result = "/" + path;
            }

            return result;
        };

        return {
            "addItem": addItem,
            "getItems": getItems,
            "getType": getType,
            "getUrl": getUrl,
            "removeItem": removeItem
        };
    }]);