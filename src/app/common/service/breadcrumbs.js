angular.module("commonModule")
/**
 *  $commonBreadcrumbsService implementation
 */
    .service("$commonBreadcrumbsService", [function () {
        var addItem, getItems, items, clear, removeDups;
        items = [];

        /**
         * Removes duplicates from breadcrumbs
         *
         * @returns {Array} - breadcrumbs items
         */
        removeDups = function () {
            var i, item, tmp, hash;
            tmp = [];

            for (i = 0; i < items.length; i += 1) {
                item = items[i];
                hash = item.label + ":" + item.url;
                if (-1 !== tmp.indexOf(hash)) {
                    items.splice(i, 1);
                }
                tmp.push(hash);
            }

            return items;
        };

        /**
         * Adds item
         *
         * @param {string} label
         * @param {string} url
         */
        addItem = function (label, url) {
            var i, isPresent, item;
            isPresent = false;
            for (i = 0; i < items.length; i += 1) {
                item = items[i];
                if (item.label === label && item.url === url) {
                    isPresent = true;
                }
            }
            if (!isPresent) {
                items.push({"label": label, "url": url.replace(new RegExp("^[#]+"), "")});
            }
        };

        /**
         * Gets items
         *
         * @returns {Array}
         */
        getItems = function () {
            return removeDups();
        };

        /**
         * Removes all items
         */
        clear = function () {
            items = [];
        };

        return {
            addItem: addItem,
            getItems: getItems,
            clear: clear
        };
    }]);