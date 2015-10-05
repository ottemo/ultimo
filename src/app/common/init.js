/**
 *  Angular "commonModule" declaration
 */

angular.REST_SERVER_URI = angular.appConfigValue("general.app.foundation_url");

angular.module("commonModule", [
    // Google
    "ngResource",
    "ngRoute",
    "ngSanitize",
    "ngAnimate",

    // Deps
    "angulartics.google.analytics",

    // Internal
    "angular-loading-bar",
    "cartModule",
    "categoryModule",
    "cmsModule",
    "contactModule",
    "designModule",
    "facebookAnalytics",
    "referModule"
])

// SEO Meta Data
.value("DEFAULT_TITLE", "Kari Gran")
    .value("DEFAULT_KEYWORDS", "Natural & Organic Skin Care & Makeup")
    .value("DEFAULT_DESCRIPTION", "Natural & Organic Skin Care & Makeup")
    .value("REST_SERVER_URI", angular.REST_SERVER_URI) // REFACTOR: why is this declared twice

.config(["$routeProvider", "$locationProvider", "cfpLoadingBarProvider",
    function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
        $routeProvider
            .when("/", {
                // Uses default seo
                templateUrl: "theme/views/common/home.html",
            })
            .when("/not-found", {
                title: 'Page Not Found',
                templateUrl: "theme/views/common/not-found.html",
            })
            .otherwise({
                template: function() {
                    angular.module("commonModule").otherwiseResolveFunc();
                    return angular.module("commonModule").deferTemplateValue;
                },
                controller: function() {
                    angular.module("commonModule").otherwiseResolveFunc();
                    return angular.module("commonModule").deferControllerValue;
                }
            });

        $locationProvider.html5Mode(true);

        // loading bar configuration
        cfpLoadingBarProvider.includeSpinner = false;
    }
])

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
    "DEFAULT_TITLE",
    function(
        $rootScope,
        $designService,
        $route,
        $http,
        $location,
        $q,
        $commonPageService,
        $commonRewriteService,
        REST_SERVER_URI,
        DEFAULT_TITLE
    ) {
        // Hides mini-cart after change url
        $rootScope.$on("$locationChangeSuccess", function() {
            $(".modal").modal('hide');
        });

        // ajax cookies support fix
        $http.defaults.withCredentials = true;
        delete $http.defaults.headers.common["X-Requested-With"];

        $rootScope.page = $commonPageService;

        $commonRewriteService.init();

        // Apply page title and meta data that is declared on the route
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

            // Page title suffix
            var pageTitle = current.title ? current.title + ' | ' : '';
            pageTitle += DEFAULT_TITLE;

            $commonPageService.setTitle(pageTitle);
            $commonPageService.setMetaDescription(current.description);
            $commonPageService.setMetaKeywords(current.keywords);
        });

        angular.module("commonModule").otherwiseResolveFunc = function() {
            if (angular.module("commonModule").otherwiseResolveFunc.inProgress === undefined) {

                angular.module("commonModule").otherwiseResolveFunc.inProgress = true;

                angular.module("commonModule").deferControllerValue = $q.defer();
                angular.module("commonModule").deferTemplateValue = $q.defer();

                var errorFunction = function() {
                    $location.$$path = "/not-found";
                    $location.$$url = "/not-found";

                    var route = $route.routes["/not-found"];

                    angular.module("commonModule").deferTemplateValue.resolve(route.templateUrl);
                    angular.module("commonModule").deferControllerValue.resolve(route.controller);

                    delete(angular.module("commonModule").otherwiseResolveFunc.inProgress);
                    $route.reload();
                };

                var successFunction = function(data, status, headers, config) {

                    if (data.error === null &&
                        data.result instanceof Array &&
                        data.result.length > 0) {
                        var rewrite = data.result[0];
                        if (rewrite.type !== "") {
                            $location.$$path = "/" + rewrite.type + "/" + rewrite.rewrite;
                            $location.$$url = $location.$$path;


                            var route = $route.routes["/" + rewrite.type + "/:id"];

                            // Assign meta information to the route
                            route.title = rewrite.title;
                            route.description = rewrite.meta_description;
                            route.keywords = rewrite.meta_keywords;

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

                var rewriteUrl = REST_SERVER_URI + "/seo/url?url=" + $location.$$path;

                $http.get(rewriteUrl)
                    .success(successFunction)
                    .error(errorFunction);
            }
        };
    }
]);
