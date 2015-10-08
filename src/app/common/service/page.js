angular.module("commonModule")
    /*
     *  $pageSidebarService implementation
     */
    .service("$commonPageService", [
        "DEFAULT_TITLE",
        "DEFAULT_DESCRIPTION",
        "DEFAULT_KEYWORDS",
        function (DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS) {
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
                if ("" !== title && typeof title !== "undefined") {
                    page.title = title;
                } else {
                    page.title = DEFAULT_TITLE || "";
                }

                return page.title;
            };

            setMetaDescription = function (description) {
                if ("" !== description && typeof description !== "undefined") {
                    page.metaDescriptions = description;
                } else {
                    page.metaDescriptions = DEFAULT_DESCRIPTION || "";
                }

                return page.metaDescriptions;
            };

            setMetaKeywords = function (keywords) {
                if ("" !== keywords && typeof keywords !== "undefined") {
                    page.metaKeywords = keywords;
                } else {
                    page.metaKeywords = DEFAULT_KEYWORDS || "";
                }

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
        }
    ]);