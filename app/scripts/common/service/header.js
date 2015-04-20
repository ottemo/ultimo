module.exports = function (commonModule) {

    var getParentItem, parentItem, transformMenu, prepareLink;

    getParentItem = function (data, field, value) {
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                if (data[i][field] === value) {
                    parentItem = data[i];
                }
                var $subList = data[i].items;
                if ($subList) {
                    getParentItem($subList, field, value);
                }
            }
        }

        return parentItem;
    };

    /**
     * Transforms simple array with menu items to the object array which includes array subitems
     * and returns this array
     *
     * @param menu
     * @returns {Array}
     */
    transformMenu = function (menu) { // jshint ignore:line
        var i, item, parentPath, tmpMenu;
        tmpMenu = [];
        menu.sort(function (obj1, obj2) {
            return obj2.path < obj1.path;
        });

        for (i in menu) {
            if (menu.hasOwnProperty(i)) {

                parentItem = undefined;
                item = menu[i];
                /**
                 * Item belongs to the upper level.
                 * He has only one level in path
                 */
                if (item.path.split('/').length <= 2) {
                    tmpMenu.push(item);
                } else {
                    /**
                     * Gets from path parent path
                     * Exaample:
                     * for this item with path
                     * /item_1/sub_item_1/sub_item_1_1
                     *
                     * parent item should have path
                     * /item_1/sub_item_1
                     *
                     * @type {string}
                     */
                    parentPath = item.path.substr(0, item.path.lastIndexOf('/'));
                    if (getParentItem(menu, 'path', parentPath)) {
                        if (typeof parentItem.items === 'undefined') {
                            parentItem.items = [];
                        }
                        parentItem.items.push(item);
                    }
                }
            }
        }
        return tmpMenu;
    };

    prepareLink = function (link) {
        var fullUrlRegex, href;
        fullUrlRegex = new RegExp('^http|https.', 'i');

        if (fullUrlRegex.test(link)) {
            href = link;
        } else {
            href = (link !== null ? link : null);
        }

        return href;
    };

    commonModule
        /*
         *  $pageHeaderService implementation
         */
        .service('$commonHeaderService', function () {
            // Variables
            var it;
            // Functions
            var addMenuRightItem, addMenuLeftItem, getMenuRight, getMenuLeft, removeItem, removeDups;
            it = {
                menuLeft: [],
                menuRight: []
            };

            removeDups = function (arr) {
                var i, item, tmp;
                tmp = [];

                for (i = 0; i < arr.length; i += 1) {
                    item = arr[i];

                    if (typeof item !== 'undefined') {
                        if (tmp.indexOf(item.path) > 0) {
                            delete arr[i];
                            continue;
                        }

                        tmp.push(item.path);
                    }

                }
            };

            /**
             * Adds the item to the right(user) menu
             *
             * @param {string} path
             * @param {string} label
             * @param {string} link
             */
            addMenuRightItem = function (path, label, link) {
                var item = {path: path, label: label, link: prepareLink(link)};
                it.menuRight.push(item);
                removeDups(it.menuRight);
            };

            getMenuRight = function () {
                return transformMenu(it.menuRight);
            };

            /**
             * Adds the item to the top menu
             *
             * @param {string} path
             * @param {string} label
             * @param {string} link
             */
            addMenuLeftItem = function (path, label, link) {
                var item = {path: path, label: label, link: prepareLink(link)};
                it.menuLeft.push(item);
                removeDups(it.menuRight);
            };

            getMenuLeft = function () {
                return transformMenu(it.menuLeft);
            };

            removeItem = function (menu, path) {
                var nameMenu, i, menuItem;

                if (menu === 'left') {
                    nameMenu = 'menuLeft';
                } else if (menu === 'right') {
                    nameMenu = 'menuRight';
                } else {
                    return false;
                }

                for (i = 0; i < it[nameMenu].length; i += 1) {
                    menuItem = it[nameMenu][i];
                    if (menuItem.path === path) {
                        it[nameMenu].splice(i, 1);
                        return true;
                    }

                }
                return false;
            };

            return {

                'addMenuRightItem': addMenuRightItem,
                'getMenuRight': getMenuRight,
                'addMenuLeftItem': addMenuLeftItem,
                'getMenuLeft': getMenuLeft,
                'removeItem': removeItem
            };
        }
    );


};


