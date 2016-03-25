angular.module("designModule")

    .directive('guiPaginator', ['$location', function ($location) {
        return {
            restrict: 'E',
            scope: {
                'parent': '=object'
            },
            templateUrl: '/views/design/gui/guiPaginator.html',
            controller: function ($scope) {
                /**
                 * Prepares array of pages
                 *
                 * @returns {Array}
                 */
                $scope.getPages = function () {
                    var p, result;
                    result = [];
                    for (p = 1; p <= $scope.parent.pages; p += 1) {
                        result.push(p);
                    }
                    return result;
                };

                $scope.isShow = function () {
                    if ($scope.parent.pages <= 1 || $scope.parent.clickMore) {
                        return false;
                    }

                    return true;
                };

                /**
                 * Gets class for item of paginator
                 *
                 * @param {string} page
                 * @returns {string}
                 */
                $scope.getClass = function (page) {
                    var _class;
                    _class = "";

                    if (page === parseInt(($scope.parent.currentPage + 1), 10)) {
                        _class = 'active';
                    } else {
                        if ("prev" === page && $scope.parent.currentPage === 0) {
                            _class = 'disabled';
                        } else if ("next" === page && $scope.parent.currentPage + 1 >= $scope.parent.pages) {
                            _class = 'disabled';
                        }
                    }

                    return _class;
                };

                $scope.showMoreBtn = function () {
                    var countLoadedGoods;
                    countLoadedGoods = ($scope.parent.currentPage + 1) * $scope.parent.itemsPerPage;

                    if (countLoadedGoods >= $scope.parent.totalItems) {
                        return false;
                    }

                    return true;
                };

                $scope.loadMore = $scope.parent.loadMore;

                /**
                 * Gets URI for item of paginator
                 *
                 * @param {string} page
                 * @returns {string}
                 */
                $scope.getURI = function (page) {
                    var _page;
                    _page = 1;
                    switch (page) {
                        case 'prev':
                            if ($scope.parent.currentPage !== 0) {
                                _page = $scope.parent.currentPage;
                            }
                            break;
                        case 'next':
                            if ($scope.parent.currentPage < $scope.parent.pages - 1) {
                                _page = $scope.parent.currentPage + 2;
                            } else {
                                _page = $scope.parent.pages;
                            }
                            break;
                        default:
                            _page = page;
                    }
                    $location.search("p", _page);
                };
            }
        };
    }]);