angular.module("commonModule")
    /*
     *  HTML top page header manipulator (direct service mapping)
     */
    .controller("commonHeaderController", [
        "$scope",
        "$commonHeaderService",
        "$commonApiService",
        "$categoryService",
        function ($scope, $commonHeaderService, $commonApiService, $categoryService) {

            $scope.hideNav = function () {
                $("#pageslide").css("display", "none");
                $(".mini-cart").css("display", "none");
                $(".h-block ul li.active").removeClass("active");
                $(".h-block nav").removeClass("active");
                $(".shadow").css("display", "none");
            };

            $scope.it = $commonHeaderService;
            $scope.rightMenu = $commonHeaderService;
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

    .controller("commonSidebarController", [
        "$scope",
        "$commonSidebarService",
        function ($scope, $commonSidebarService) {
            $scope.sidebar = $commonSidebarService;


            $scope.hideNav = function () {
                $("#pageslide").css("display", "none");
                $(".mini-cart").css("display", "none");
                $(".h-block ul li.active").removeClass("active");
            };

        }

    ])

    .controller("commonController", [
        "$scope",
        "$designService",
        "$commonApiService",
        "$designImageService",
        "$commonBreadcrumbsService",
        "$cartService",
        "$pdpProductService",
        "$route",
        function ($scope, $designService, $commonApiService, $designImageService, $commonBreadcrumbsService,
                  $cartService, $pdpProductService, $route) {

            /**
             * Gets full path to image
             *
             * @param {object} product
             * @returns {string}
             */
            $scope.getImage = function (img, size) {
                return $designImageService.getFullImagePath("", img, size);
            };

            // HANDLERS FOR BREADCRUMBS (START)
            //
            $scope.$on("$locationChangeSuccess", function () {
                $commonBreadcrumbsService.clear();
                $commonBreadcrumbsService.addItem("Home", "/");
            });

            $scope.$on("add-breadcrumbs", function (event, param) {
                $commonBreadcrumbsService.addItem(param.label, param.url);
            });
            //
            // HANDLERS FOR BREADCRUMBS (STOP)

            /**
             * Cart initialization
             */
            $cartService.init();
        }
    ]
);