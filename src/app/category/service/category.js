angular.module("categoryModule")

/**
 *  categoryService implementation
 *  Saves in the tree a categories list. Used for the breadcrumbs
 */
.service("categoryService", [
    "$location",
    "commonRewriteService",
    "SEARCH_KEY_NAME",
    function($location, commonRewriteService, SEARCH_KEY_NAME) {

        var tree = [];
        var type = "category";

        return {
            getUrl: getUrl,
            setTree: setTree,
            getTree: getTree,
            getChainCategories: getChainCategories,
            setFiltersInLocation: setFiltersInLocation,
            searchProducts: searchProducts,
            getSubMenuItem: getSubMenuItem
        };

        //////////////////////////////////////////

        function getUrl(id) {
            var url;
            url = commonRewriteService.getRewrite(type, id);

            if (!url) {
                url = type + "/" + id;
            }

            return "/" + url;
        };

        function setTree(categories) {
            // Attach urls to the item, and its children
            tree = _.map(categories, function(item){
                item = _applyUrl(item);
                item.child = _.map(item.child, _applyUrl);
                return item;
            });
            return tree;

            function _applyUrl(item) {
                item.url = getUrl(item.id);
                return item
            }
        };

        function getTree() {
            return tree;
        };

        function getSubMenuItem(subMenuItems, id, list) {
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
        function getChainCategories(id) {
            var list = [];

            list = getSubMenuItem(tree, id, list);

            return list.reverse();
        };

        function setFiltersInLocation(path, filter) {
            // removes the  "#" in the begin string
            var pathClear = path.trim('#');

            $location.$$path = pathClear;
            $location.$$url = pathClear;

            $location.search(filter);
        };

        function searchProducts(searchText) {
            var params = SEARCH_KEY_NAME + "=~" + searchText.replace(/\s/g, ',');
            setFiltersInLocation($location.path(), params);
        };
    }
]);

