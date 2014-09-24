(function (define) {
    "use strict";

    /**
     *  HTML top page header manipulation stuff
     */
    define([
            "common/init"
        ],
        function (checkoutModule) {

            checkoutModule
            /**
             *  $categoryService implementation
             *  Saves in the tree a categories list. Used for the breadcrumbs
             */
                .service("$checkoutService", [
                    "ONEPAGE_URL",
                    "ACCORDION_URL",
                    function (ONEPAGE_URL, ACCORDION_URL) {
                        // Variables
                        var types, defaultType, activeType;
                        // Functions
                        var getUrl, getType, setType;

                        defaultType = "accordion";
                        types = ["onepage", "accordion"];

                        getUrl = function () {
                            var url;

                            if ("onepage" === activeType) {
                                url = ONEPAGE_URL;
                            } else {
                                url = ACCORDION_URL;
                            }


                            return "#" + url;
                        };

                        setType = function (t) {
                            if (-1 !== types.indexOf(t)) {
                                activeType = t;
                            } else {
                                activeType = defaultType;
                            }

                            return activeType;
                        };

                        getType = function () {
                            return activeType;
                        };

                        return {
                            "getUrl": getUrl,
                            "getType": getType,
                            "setType": setType
                        };
                    }
                ]
            );

            return checkoutModule;
        });

})(window.define);