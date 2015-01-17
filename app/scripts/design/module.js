(function (define) {
    "use strict";

    /**
     *
     */
    define([
			"design/service/states",

			"design/directives/validator/between",
			"design/directives/validator/date",
			"design/directives/validator/email",
			"design/directives/validator/len",
			"design/directives/validator/number",
			"design/directives/validator/positive",
			"design/directives/validator/price",
			"design/directives/validator/regexp",
			"design/directives/validator/sku",
			"design/directives/validator/password",

			"design/directives/guiBlock",
			"design/directives/guiListBar",
			"design/directives/guiPaginator",
			"design/directives/guiMessageManager",
            "design/service/image",
            "design/service/design",
            "design/service/api",
            "design/directives/design"
        ],
        function (designModule) {

            return designModule;
        });

})(window.define);