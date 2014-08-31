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

            angular.module.commonModule = angular.module("commonModule", ["ngRoute", "ngSanitize", "designModule"])

                .constant("REST_SERVER_URI", "http://dev.ottemo.io:3000")  

            /**
             *  Basic routing configuration
             */
                .config(["$routeProvider", function ($routeProvider) {
                    $routeProvider
                        .when("/", {
                            templateUrl: angular.getTheme("common/home.html"),
                            controller: "commonController"
                        })
                        .when("/help", { templateUrl: "views/help.html"})
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
                    function ($rootScope, $designService, $route, $http, $commonSidebarService, $location, $q, $commonPageService) {

                        // ajax cookies support fix
                        $http.defaults.withCredentials = true;
                        delete $http.defaults.headers.common["X-Requested-With"];

                        $rootScope.page = $commonPageService;

                        // Left navigation menu
                        $commonSidebarService.addItem("Home", "", "glyphicon glyphicon-home", 100);
                        $commonSidebarService.addItem("BLOG", "cat1.html", "glyphicon glyphicon-edit");
                        $commonSidebarService.addItem("STOCKISTS", "cat2.html", "glyphicon glyphicon-screenshot");
                        $commonSidebarService.addItem("ABOUT", "prod1.html", "glyphicon glyphicon-info-sign");
                        $commonSidebarService.addItem("PRESS", "prod2.html", "glyphicon glyphicon-book");

                        otherwiseResolveFunc = function () {
                            if (otherwiseResolveFunc.inProgress === undefined) {

                                otherwiseResolveFunc.inProgress = true;

                                deferControllerValue = $q.defer();
                                deferTemplateValue = $q.defer();

                                var errorFunction = function () {
                                    $location.$$path = "/";
                                    $location.$$url = "/";

                                    var route = $route.routes["/"];

                                    deferTemplateValue.resolve(route.templateUrl);
                                    deferControllerValue.resolve(route.controller);

                                    delete(otherwiseResolveFunc.inProgress);
                                    $route.reload();
                                };

                                var successFunction = function (data, status, headers, config) {
                                    if (data.error === "" && data.result.length > 0) {
                                        var rewrite = data.result[0];
                                        if (rewrite.type !== "") {
                                            $location.$$path = "/" + rewrite.type + "/" + rewrite.rewrite;
                                            $location.$$url = $location.$$path;

                                            $commonPageService.setTitle(rewrite.title);
                                            $commonPageService.setMetaDescription(rewrite.meta_description);
                                            $commonPageService.setMetaKeywords(rewrite.meta_keywords);

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
                                    url: "http://dev.ottemo.com:3000/url_rewrite/get/" + $location.$$path,
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
