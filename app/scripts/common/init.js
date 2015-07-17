/**
 *  Angular "commonModule" declaration
 */

angular.REST_SERVER_URI = angular.appConfigValue("general.app.foundation_url");

angular.module("commonModule", [
    // Google
    "ngRoute",
    "ngSanitize",
    "ngResource",

    // Deps
    "angulartics",
    "angulartics.google.analytics",

    // Internal
    "designModule",
    "cartModule",
    "categoryModule",
    "cmsModule",
    "contactModule"
])

.value("DEFAULT_TITLE", "Kari Gran")
.value("DEFAULT_KEYWORDS", "")
.value("DEFAULT_DESCRIPTION", "")
.value("REST_SERVER_URI", angular.REST_SERVER_URI)

    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "theme/views/common/home.html",
                controller: "commonController"
            })
            .when("/not-found", {
                templateUrl: "theme/views/common/not-found.html",
                controller: "commonController"
            })
            .when("/help", {templateUrl: "views/help.html"})
            .when("/about.html", {
                templateUrl: "theme/views/common/about.html",
                controller: ""
            })
            .otherwise({
                template: function () {
                    angular.module("commonModule").otherwiseResolveFunc();
                    return angular.module("commonModule").deferTemplateValue;
                },
                controller: function () {
                    angular.module("commonModule").otherwiseResolveFunc();
                    return angular.module("commonModule").deferControllerValue;
                }
            });
        $locationProvider.html5Mode(true);
    }])
    .run([
        "$rootScope",
        "$designService",
        "$route",
        "$http",
        "$location",
        "$q",
        "$commonPageService",
        "$commonRewriteService",
        "REST_SERVER_URI",
        function ($rootScope, $designService, $route, $http, $location, $q,
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

            $commonRewriteService.init();

            $commonPageService.setTitle();
            $commonPageService.setMetaDescription();
            $commonPageService.setMetaKeywords();

            angular.module("commonModule").otherwiseResolveFunc = function () {
                if (angular.module("commonModule").otherwiseResolveFunc.inProgress === undefined) {

                    angular.module("commonModule").otherwiseResolveFunc.inProgress = true;

                    angular.module("commonModule").deferControllerValue = $q.defer();
                    angular.module("commonModule").deferTemplateValue = $q.defer();

                    var errorFunction = function () {
                        $commonPageService.setTitle();
                        $commonPageService.setMetaDescription();
                        $commonPageService.setMetaKeywords();

                        $location.$$path = "/not-found";
                        $location.$$url = "/not-found";

                        var route = $route.routes["/not-found"];

                        angular.module("commonModule").deferTemplateValue.resolve(route.templateUrl);
                        angular.module("commonModule").deferControllerValue.resolve(route.controller);

                        delete(angular.module("commonModule").otherwiseResolveFunc.inProgress);
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

                                angular.module("commonModule").deferTemplateValue.resolve(route.templateUrl);
                                angular.module("commonModule").deferControllerValue.resolve(route.controller);
                            } else {
                                window.location = rewrite.rewrite;
                            }

                            delete(angular.module("commonModule").otherwiseResolveFunc.inProgress);
                            $route.reload();
                        } else {
                            errorFunction(data, status, headers, config);
                        }
                    };

                    // strip leading slash
                    var rewriteUrl = REST_SERVER_URI + "/seo/url?url="+ $location.$$path;

                    $http({
                        url: rewriteUrl,
                        method: "GET"
                    })
                    .success(successFunction)
                    .error(errorFunction);
                }
            };
        }
    ]);