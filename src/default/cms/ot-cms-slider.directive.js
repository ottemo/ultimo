/**
 * Slick slider
 * https://github.com/kenwheeler/slick/blob/master/slick/slick.js
 *
 * Default Config
 * ----------------------------
 * accessibility: true,
 * adaptiveHeight: false,
 * appendArrows: $(element),
 * appendDots: $(element),
 * arrows: true,
 * asNavFor: null,
 * prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
 * nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
 * autoplay: false,
 * autoplaySpeed: 3000,
 * centerMode: false,
 * centerPadding: '50px',
 * cssEase: 'ease',
 * customPaging: function(slider, i) {
 * return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
 * },
 * dots: false,
 * dotsClass: 'slick-dots',
 * draggable: true,
 * easing: 'linear',
 * edgeFriction: 0.35,
 * fade: false,
 * focusOnSelect: false,
 * infinite: true,
 * initialSlide: 0,
 * lazyLoad: 'ondemand',
 * mobileFirst: false,
 * pauseOnHover: true,
 * pauseOnDotsHover: false,
 * respondTo: 'window',
 * responsive: null,
 * rows: 1,
 * rtl: false,
 * slide: '',
 * slidesPerRow: 1,
 * slidesToShow: 1,
 * slidesToScroll: 1,
 * speed: 500,
 * swipe: true,
 * swipeToSlide: false,
 * touchMove: true,
 * touchThreshold: 5,
 * useCSS: true,
 * useTransform: false,
 * variableWidth: false,
 * vertical: false,
 * verticalSwiping: false,
 * waitForAnimate: true,
 * zIndex: 1000
 */
angular.module('cmsModule')

    .directive('otCmsSlider', [
        '$sce',
        '$timeout',
        'cmsApiService',
        function($sce, $timeout, cmsApiService) {
            return {
                restrict: 'EA',
                scope: {
                    'id': '@',
                    'name': '@',
                    'config': '='
                },
                template: '<div class="custom-block" ng-bind-html="content"></div>',
                controller: function($scope, $element) {
                    // id
                    // name
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

                        var sliderContainer = $element.children().eq(0);
                        $timeout(function() {
                            sliderContainer.slick($scope.config);
                        });
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

                        return cmsApiService.getBlocks(params).$promise.then(function(response) {
                            var content = '';
                            if (response.error === null && response.result !== null) {
                                content = response.result[0].Extra.content;
                            }

                            return content;
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

                        return cmsApiService.getBlock(params).$promise.then(function(response) {
                            return (response.error === null) ? response.result.content : '';
                        });
                    }
                }
            };
        }
    ]);