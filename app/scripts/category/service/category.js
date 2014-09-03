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
             *  $categoryService implementation
             *  Saves in the tree a categories list. Used for the breadcrumbs
             */
                .service("$categoryService", [
                    "$commonRewriteService",
                    function ($commonRewriteService) {
                        // Variables
                        var tree, type;
                        // Functions
                        var getTree, setTree, getChainCategories, getSubMenuItem, getUrl;
                        type = "category";

                        getUrl = function (id) {
                            var url;
                            url = $commonRewriteService.getRewrite(type, id);

                            if (!url) {
                                url = type + "/" + id;
                            }

                            return "#/" + url;
                        };

                        /**
                         * Sets tree
                         *
                         * @param {string} label
                         * @param {string} url
                         */
                        setTree = function (arr) {
                            tree = arr;
                        };

                        /**
                         * Gets tree
                         *
                         * @return {array} tree
                         */
                        getTree = function () {
                            return tree;
                        };

                        getSubMenuItem = function (subMenuItems, id, list) {
                            var found, i, tmpList;

                            if (subMenuItems) {

                                for (i = 0; i < subMenuItems.length; i += 1) {

                                    tmpList = list;
                                    tmpList.push(subMenuItems[i]);

                                    if (subMenuItems[i].id === id) {
                                        return [subMenuItems[i]];
                                    }

                                    found = getSubMenuItem(subMenuItems[i].child, id, tmpList);

                                    if (found instanceof Array && found.length > 0) {
                                        found.push(subMenuItems[i]);
                                        return found;
                                    }
                                }
                            }

                            return [];
                        };

                        /**
                         *
                         * @param {string} id
                         * @returns {Array}
                         */
                        getChainCategories = function (id) {
                            var list = [];

                            list = getSubMenuItem(tree, id, list);

                            return list.reverse();
                        };

                        return {
                            getUrl: getUrl,
                            setTree: setTree,
                            getTree: getTree,
                            getChainCategories: getChainCategories
                        };
                    }]);

            return commonModule;
        });

})(window.define);