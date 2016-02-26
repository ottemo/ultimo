angular.module('cmsModule')

.directive('otCmsBlock', [
    '$sce',
    '$cmsApiService',
    function($sce, $cmsApiService) {
        return {
            restrict: 'EA',
            scope: {
                'id': '@',
                'name': '@'
            },
            template: '<div class="custom-block" ng-bind-html="content"></div>',
            controller: function($scope) {
                // id
                // name
                $scope.content = '';

                activate();

                //////////////////////////

                /**
                 * Currently works for static id/names
                 * this isn't written to support dynamic attributes
                 */
                function activate() {
                    if ($scope.id) {
                        _byId($scope.id).then(applyContent);
                    } else if ($scope.name) {
                        _byIdentifier($scope.name).then(applyContent);
                    }
                }

                function applyContent(content) {
                    $scope.content = $sce.trustAsHtml(content);
                }

                /**
                 * Internally the "name" is called the identifier
                 * @param  {string} identifier Pretty name of the block
                 * @return {html}
                 */
                function _byIdentifier(identifier) {
                    var params = {
                        identifier: identifier
                    };

                    return $cmsApiService.getBlocks(params).$promise.then(function(response) {
                        return (response.error === null) ? response.result[0].Extra.content : '';
                    });
                }

                /**
                 * Fetch by id hash
                 * @param  {string} id This is the ugly hash id
                 * @return {html}
                 */
                function _byId(id) {
                    var params = {
                        blockID: id
                    };

                    return $cmsApiService.getBlock(params).$promise.then(function(response) {
                        return (response.error === null) ? response.result.content : '';
                    });
                }
            }
        };
    }
]);

