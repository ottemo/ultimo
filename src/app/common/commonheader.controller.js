angular.module("commonModule")

.controller("commonHeaderController", [
    "$scope",
    "$commonApiService",
    "$categoryService",
    function($scope, $commonApiService, $categoryService) {

        $scope.hideNav = function() {
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
                function(response) {
                    var categories = response.result || [];
                    $scope.categories = categories;
                    $categoryService.setTree(categories);
                }
            );
        } else {
            $scope.categories = tree;
        }
    }
]);
