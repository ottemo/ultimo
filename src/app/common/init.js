angular.module('commonModule', [
    // Google
    'ngResource',
    'ngRoute',
    'ngSanitize',

    // Deps
    'angulartics.google.analytics',
    'mgcrea.ngStrap.navbar',
    'ui.bootstrap.datepicker',
    'ui.bootstrap.dropdown',

    // Internal
    'angular-loading-bar',
    'cartModule',
    'categoryModule',
    'cmsModule',
    'contactModule',
    'coreModule',
    'facebookAnalytics',
    'referModule'
])

// SEO Meta Data
.value('DEFAULT_TITLE', 'Ultimo')

.value('DEFAULT_KEYWORDS', '')

.value('DEFAULT_DESCRIPTION', '')

.constant('REST_SERVER_URI', angular.appConfig.apiUrl)

.config([
    '$routeProvider',
    '$locationProvider',
    'cfpLoadingBarProvider',
    '$analyticsProvider',
    'REST_SERVER_URI',
    function(
        $routeProvider,
        $locationProvider,
        cfpLoadingBarProvider,
        $analyticsProvider,
        REST_SERVER_URI
    ) {
        // Use html5 instead of #! urls
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                // Uses default seo
                templateUrl: '/views/common/home.html',
                controller: 'HomeController'
            })
            .when('/css-test', {
                templateUrl: '/views/common/css-test.html',
            })
            .when('/not-found', {
                title: 'Page Not Found',
                templateUrl: '/views/common/not-found.html',
            })
            .otherwise({
                template: function() {
                    angular.module('commonModule').otherwiseResolveFunc();
                    return angular.module('commonModule').deferTemplateValue;
                },
                controller: function() {
                    angular.module('commonModule').otherwiseResolveFunc();
                    return angular.module('commonModule').deferControllerValue;
                }
            });

        // loading bar configuration
        cfpLoadingBarProvider.includeSpinner = false;

        // We trigger pageviews manually so that it doesn't fire
        // twice with SEO urls
        $analyticsProvider.virtualPageviews(false);
        $analyticsProvider.registerPageTrack(function(path, loc){
            return $.ajax({
                url: REST_SERVER_URI + '/rts/visit',
                type: 'POST',
                data: {
                    path: path,
                    referrer: document.referrer
                },
                xhrFields: {
                    withCredentials: true
                }
            });
        });
    }
])

.run([
    '$rootScope',
    '$route',
    '$http',
    '$location',
    '$q',
    'commonPageService',
    'commonRewriteService',
    '$analytics',
    'DEFAULT_TITLE',
    'REST_SERVER_URI',
    function(
        $rootScope,
        $route,
        $http,
        $location,
        $q,
        commonPageService,
        commonRewriteService,
        $analytics,
        DEFAULT_TITLE,
        REST_SERVER_URI
    ) {
        $rootScope.$on('$locationChangeSuccess', function() {
            // Ensures we hide modals after change url
            $('.modal').modal('hide');
            $('body').removeClass('modal-open');

            // Analytics page tracking
             $analytics.pageTrack($location.url(), $location);
        });

        // ajax cookies support fix
        $http.defaults.withCredentials = true;
        delete $http.defaults.headers.common['X-Requested-With'];

        $rootScope.page = commonPageService;

        commonRewriteService.init();

        // Apply page title and meta data that is declared on the route
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

            // Page title suffix
            var pageTitle = current.title ? current.title + ' | ' : '';
            pageTitle += DEFAULT_TITLE;

            commonPageService.setTitle(pageTitle);
            commonPageService.setMetaDescription(current.description);
            commonPageService.setMetaKeywords(current.keywords);
        });

        angular.module('commonModule').otherwiseResolveFunc = function() {
            if (angular.module('commonModule').otherwiseResolveFunc.inProgress === undefined) {

                angular.module('commonModule').otherwiseResolveFunc.inProgress = true;

                angular.module('commonModule').deferControllerValue = $q.defer();
                angular.module('commonModule').deferTemplateValue = $q.defer();

                var errorFunction = function() {
                    $location.$$path = '/not-found';
                    $location.$$url = '/not-found';

                    var route = $route.routes['/not-found'];

                    angular.module('commonModule').deferTemplateValue.resolve(route.templateUrl);
                    angular.module('commonModule').deferControllerValue.resolve(route.controller);

                    delete(angular.module('commonModule').otherwiseResolveFunc.inProgress);
                    $route.reload();
                };

                var successFunction = function(data, status, headers, config) {

                    if (data.error === null &&
                        data.result instanceof Array &&
                        data.result.length > 0) {
                        var rewrite = data.result[0];
                        if (rewrite.type !== '') {
                            $location.$$path = '/' + rewrite.type + '/' + rewrite.rewrite;
                            $location.$$url = $location.$$path;

                            var route = $route.routes['/' + rewrite.type + '/:id'];

                            // Assign meta information to the route
                            route.title = rewrite.title;
                            route.description = rewrite.meta_description;
                            route.keywords = rewrite.meta_keywords;

                            angular.module('commonModule').deferTemplateValue.resolve(route.templateUrl);
                            angular.module('commonModule').deferControllerValue.resolve(route.controller);
                        } else {
                            window.location = rewrite.rewrite;
                        }

                        delete(angular.module('commonModule').otherwiseResolveFunc.inProgress);
                        $route.reload();
                    } else {
                        errorFunction(data, status, headers, config);
                    }
                };

                var rewriteUrl = REST_SERVER_URI + '/seo/url?url=' + $location.$$path;

                $http.get(rewriteUrl)
                    .success(successFunction)
                    .error(errorFunction);
            }
        };
    }
]);

