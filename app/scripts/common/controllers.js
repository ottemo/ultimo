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
        "$location",
        function (
            $scope,
            $commonPageService,
            $designService,
            $commonApiService,
            $commonBreadcrumbsService,
            $cartService,
            $visitorLoginService,
            cfpLoadingBar,
            $location ) {

            /**
             * Home, 404 - pages
             */



                // Handlers for breadcrumbs and SEO
            $scope.$on("$locationChangeSuccess", function () {
                $commonBreadcrumbsService.clear();
                $commonBreadcrumbsService.addItem("Home", "/");
                // We need to enforce the default seo options
                //TODO: fill in meta
                var currentLocation = $location.path();
                var seoTitle = "";
                var seoMetaD = "";
                var seoMetaK = "";
                if (currentLocation == '/') {
                    seoTitle = "";seoMetaD = "";seoMetaK = "";
                }
                if (currentLocation == '/cart') {
                    seoTitle = "cart";
                    seoMetaD = "cart";
                    seoMetaK = "cart";
                }
                if (currentLocation == '/checkout') {
                    seoTitle = "checkout";
                    seoMetaD = "checkout";
                    seoMetaK = "checkout";
                }
                if (currentLocation.indexOf('/checkout/success') >= 0) {
                    seoTitle = "checkout success";
                    seoMetaD = "checkout success";
                    seoMetaK = "checkout success";
                }
                $commonPageService.setTitle(seoTitle);
                $commonPageService.setMetaDescription(seoMetaD);
                $commonPageService.setMetaKeywords(seoMetaK);
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
