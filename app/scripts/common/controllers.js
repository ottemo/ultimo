angular.module("commonModule")
    /*
     *  HTML top page header manipulator (direct service mapping)
     */
    .controller("commonHeaderController", [
        "$scope",

        "$commonApiService",
        "$categoryService",
        function ($scope, $commonApiService, $categoryService) {

            $scope.hideNav = function () {
                $("#pageslide").css("display", "none");
                $(".mini-cart").css("display", "none");
                $(".h-block ul li.active").removeClass("active");
                $(".h-block nav").removeClass("active");
                $(".shadow").css("display", "none");
            };

            $scope.categories = [];
            $scope.categoryService = $categoryService;

            var tree;
            tree = $categoryService.getTree();
            if (typeof tree === "undefined") {
                $commonApiService.getCategories().$promise.then(
                    function (response) {
                        var categories = response.result || [];
                        $scope.categories = categories;
                        $categoryService.setTree(categories);
                    }
                );
            } else {
                $scope.categories = tree;
            }
        }
    ])

    .controller("commonBreadcrumbsController", [
        "$scope",
        "$commonBreadcrumbsService",
        function ($scope, $commonBreadcrumbsService) {
            $scope.it = $commonBreadcrumbsService;
            $scope.crumbs = $commonBreadcrumbsService.getItems();
        }
    ])

    .controller("commonController", [
        "$scope",
        "$commonPageService",
        "$designService",
        "$commonApiService",
        "$commonBreadcrumbsService",
        "$cartService",
        "$visitorLoginService",
        "cfpLoadingBar",
        function (
            $scope,
            $commonPageService,
            $designService,
            $commonApiService,
            $commonBreadcrumbsService,
            $cartService,
            $visitorLoginService,
            cfpLoadingBar) {

            /**
             * Home, 404 - pages
             */

            // We need to enforce the default seo options
            $commonPageService.setTitle();
            $commonPageService.setMetaDescription();
            $commonPageService.setMetaKeywords();

            // Handlers for breadcrumbs
            $scope.$on("$locationChangeSuccess", function () {
                $commonBreadcrumbsService.clear();
                $commonBreadcrumbsService.addItem("Home", "/");
            });

            $scope.$on("add-breadcrumbs", function (event, param) {
                $commonBreadcrumbsService.addItem(param.label, param.url);
            });

            // Page loading event handler
            $scope.load_completed = false;

            $scope.$on('cfpLoadingBar:completed', function(e,param) {
                $scope.load_completed = true;
            });


            // Cart initialization
            $cartService.init();

            // Visitor init
            $scope.visitorProps = $visitorLoginService.props;
        }
    ]
);