(function (define) {
    "use strict";

    /**
     *  Angular "commonModule" declaration
     *  (module internal files refers to this instance)
     */
    define([
            "angular",
            "angular-route",
            "angular-sanitize"

        ],
        function (angular) {
            /**
             *  Angular "commonModule" declaration
             */

            var otherwiseResolveFunc = function () {
            };

            var deferTemplateValue = "";
            var deferControllerValue = "";

            angular.REST_SERVER_URI = angular.appConfigValue("general.app.foundation_url");

            angular.module.commonModule = angular.module("commonModule", ["ngRoute", "ngSanitize", "designModule"])

                .value("DEFAULT_TITLE", "Ottemo store")
                .value("DEFAULT_KEYWORDS", "Ottemo store")
                .value("DEFAULT_DESCRIPTION", "Ottemo store")
                .value("REST_SERVER_URI", angular.REST_SERVER_URI)

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
                    $routeProvider
                        .when("/", {
                            templateUrl: angular.getTheme("common/home.html"),
                            controller: "commonController"
                        })
                        .when("/not-found", {
                            templateUrl: angular.getTheme("common/not-found.html"),
                            controller: "commonController"
                        })
                        .when("/help", { templateUrl: "views/help.html"})
                        .when("/about.html", {
                            templateUrl: angular.getTheme("common/about.html"),
                            controller: ""
                        })
                        .otherwise({
                            template: function () {
                                otherwiseResolveFunc();
                                return deferTemplateValue;
                            },
                            controller: function () {
                                otherwiseResolveFunc();
                                return deferControllerValue;
                            }
                        });
                    $locationProvider.html5Mode(true);

                }])

                .run([
                    "$rootScope",
                    "$designService",
                    "$route",
                    "$http",
                    "$commonSidebarService",
                    "$location",
                    "$q",
                    "$commonPageService",
                    "$commonRewriteService",
                    "REST_SERVER_URI",
                    function ($rootScope, $designService, $route, $http, $commonSidebarService, $location, $q,
                              $commonPageService, $commonRewriteService, REST_SERVER_URI) {

                        /**
                         * Hides mini-cart after change url
                         */
                        $rootScope.$on("$locationChangeSuccess", function () {
                            $(".modal").modal('hide');
                        });

                        // ajax cookies support fix
                        $http.defaults.withCredentials = true;
                        delete $http.defaults.headers.common["X-Requested-With"];

                        $rootScope.page = $commonPageService;

                        // Left navigation menu
                        $commonSidebarService.addItem("home", "", "glyphicon glyphicon-home", 100);

                        $commonRewriteService.init();

                        $commonPageService.setTitle();
                        $commonPageService.setMetaDescription();
                        $commonPageService.setMetaKeywords();

                        otherwiseResolveFunc = function () {
                            if (otherwiseResolveFunc.inProgress === undefined) {

                                otherwiseResolveFunc.inProgress = true;

                                deferControllerValue = $q.defer();
                                deferTemplateValue = $q.defer();

                                var errorFunction = function () {
                                    $commonPageService.setTitle();
                                    $commonPageService.setMetaDescription();
                                    $commonPageService.setMetaKeywords();

                                    $location.$$path = "/not-found";
                                    $location.$$url = "/not-found";

                                    var route = $route.routes["/not-found"];

                                    deferTemplateValue.resolve(route.templateUrl);
                                    deferControllerValue.resolve(route.controller);

                                    delete(otherwiseResolveFunc.inProgress);
                                    $route.reload();
                                };

                                var successFunction = function (data, status, headers, config) {
                                    $commonPageService.setTitle();
                                    $commonPageService.setMetaDescription();
                                    $commonPageService.setMetaKeywords();
                                    if (data.error === null &&
                                        data.result instanceof Array &&
                                        data.result.length > 0) {
                                        var rewrite = data.result[0];
                                        if (rewrite.type !== "") {
                                            $location.$$path = "/" + rewrite.type + "/" + rewrite.rewrite;
                                            $location.$$url = $location.$$path;

                                            $commonPageService.setTitle(rewrite.title);
                                            $commonPageService.setMetaDescription(rewrite["meta_description"]);
                                            $commonPageService.setMetaKeywords(rewrite["meta_keywords"]);

                                            var route = $route.routes["/" + rewrite.type + "/:id"];

                                            deferTemplateValue.resolve(route.templateUrl);
                                            deferControllerValue.resolve(route.controller);
                                        } else {
                                            window.location = rewrite.rewrite;
                                        }

                                        delete(otherwiseResolveFunc.inProgress);
                                        $route.reload();
                                    } else {
                                        errorFunction(data, status, headers, config);
                                    }
                                };

                                $http({
                                    url: REST_SERVER_URI + "/seo/url/" + $location.$$path,
                                    method: "GET"
                                }).success(successFunction).error(errorFunction);
                            }
                        };
                    }
                ]
            );

            return angular.module.commonModule;
        });
})(window.define);
