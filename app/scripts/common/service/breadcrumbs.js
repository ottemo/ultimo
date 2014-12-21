(function (define) {
    "use strict";

    /**
     *  HTML top page header manipulation stuff
     */
    define([
            "common/init"
        ],
        function (commonModule) {

            commonModule
                /**
                 *  $commonBreadcrumbsService implementation
                 */
                .service("$commonBreadcrumbsService", [function () {
                    var addItem, getItems, items, clear;
                    items = [];

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
                            items.push({"label": label, "url": "#" + url.replace(new RegExp("^[#]+"), "")});
                        }
                    };

                    /**
                     * Gets items
                     *
                     * @returns {Array}
                     */
                    getItems = function () {
                        return items;
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

            return commonModule;
        });

})(window.define);