(function (define) {
    "use strict";

    /*
     *  HTML top page header manipulation stuff
     */
    define([
            "common/init"
        ],
        function (commonModule) {

            commonModule
                /*
                 *  $pageSidebarService implementation
                 */
                .service("$commonPageService", [function () {
                    // Variables
                    var page;

                    // Functions
                    var getPage, getTitle, getMetaDescription, getMetaKeywords, setTitle, setMetaDescription, setMetaKeywords;

                    page = {
                        "title": "",
                        "metaKeywords": "",
                        "metaDescriptions": ""
                    };

                    setTitle = function (title) {
                        page.title = title;

                        return page.title;
                    };

                    setMetaDescription = function (description) {
                        page.metaDescriptions = description;

                        return page.metaDescriptions;
                    };

                    setMetaKeywords = function (keywords) {
                        page.metaKeywords = keywords;

                        return page.metaKeywords;
                    };


                    getTitle = function () {
                        return page.title;
                    };

                    getMetaDescription = function () {
                        return page.metaDescriptions;
                    };

                    getMetaKeywords = function () {
                        return page.metaKeywords;
                    };

                    getPage = function () {
                        return page;
                    };

                    return {
                        "getPage": getPage,
                        "setTitle": setTitle,
                        "setMetaDescription": setMetaDescription,
                        "setMetaKeywords": setMetaKeywords,
                        "getTitle": getTitle,
                        "getMetaDescription": getMetaDescription,
                        "getMetaKeywords": getMetaKeywords
                    };
                }]);

            return commonModule;
        });

})(window.define);